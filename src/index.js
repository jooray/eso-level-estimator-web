import { SimplePool } from 'nostr-tools/pool';
import { generateSecretKey, getPublicKey, finalizeEvent, validateEvent } from 'nostr-tools';
import { encrypt, decrypt } from 'nostr-tools/nip04';

// Constants
const RECIPIENT_PUBLIC_KEY = '14b7f1bda4e64f93136145e26229c406fd1b60f0f0158e74a36f40c1ff5d7171';

const EMOJIS = ['🧠', '🌌', '🕺🏼', '💡', '⚛', '🍵', '🍄', '☀️', '🌗']; // Emojis to randomly add

let emojiInterval;

let receivedEventIds = [];

function generateKeyPair() {
    const secretKey = generateSecretKey();
    const publicKey = getPublicKey(secretKey);
    return { pub: publicKey, priv: secretKey };
}

function addEmojis() {
  const responseArea = document.getElementById('responseArea');
  responseArea.innerHTML += ` ${EMOJIS[Math.floor(Math.random() * EMOJIS.length)]}`;
}

const keyPair = generateKeyPair();
const pool = new SimplePool();
const relays = [
    'wss://nos.lol',
    'wss://nostr.bitcoiner.social',
    'wss://relay.nostr.band',
    'wss://relay.damus.io'
];

document.addEventListener('DOMContentLoaded', () => {
    console.log('Generated KeyPair:', keyPair);
});

async function sendMessage(content) {
    // Encrypt the content with the recipient's public key
    const encryptedContent = await encrypt(keyPair.priv, RECIPIENT_PUBLIC_KEY, content);

    console.log(keyPair.pub)
    const event = {
        pubkey: keyPair.pub,
        created_at: Math.floor(Date.now() / 1000),
        kind: 4, // Kind 4 is a direct message
        tags: [['p', RECIPIENT_PUBLIC_KEY]], // 'p' tag for direct messages
        content: encryptedContent
    };

    // Serialize and sign the event
    const signedEvent = finalizeEvent(event, keyPair.priv);

    // Validate the event
    if (!validateEvent(signedEvent)) {
        console.error('Invalid event');
        return;
    }
    document.getElementById('messageInput').disabled = true;
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true;
    sendButton.style.backgroundColor = 'grey';
    sendButton.innerText = 'Telepathic (Nostr) communication initiated';

    // Publish the event
    try {
        await Promise.any(pool.publish(relays, signedEvent));
        console.log('Published to at least one relay!');
    } catch (error) {
        console.error('Failed to publish:', error);
    }

    // Display connecting message
    const responseArea = document.getElementById('responseArea');
    responseArea.innerHTML = "Connecting to higher intelligence...";
    if (emojiInterval) {
      clearInterval(emojiInterval); // Clear any existing interval
    }
    emojiInterval = setInterval(addEmojis, 1000); // Add an emoji every second

    // Listen for replies
    pool.subscribeMany(relays, [{
        authors: [RECIPIENT_PUBLIC_KEY], kinds: [4]
    }], {
        onevent: async (event) => {
            if (event.tags.some(tag => tag[0] === 'p' && tag[1] === keyPair.pub) && !receivedEventIds.includes(event.id)) {
                // Check if it's a reply to our message
                const decryptedMessage = await decrypt(keyPair.priv, RECIPIENT_PUBLIC_KEY, event.content);
                receivedEventIds.push(event.id);
                clearInterval(emojiInterval);
                responseArea.innerHTML = `Reply: ${decryptedMessage.replace(/\n/g, '<br/>')}`;
                document.getElementById('messageInput').disabled = false;
                sendButton.disabled = false;
                sendButton.style.backgroundColor = '#2aa198'; // Solarized cyan
                sendButton.innerText = 'Estimate eso level!';

            }
        },
        onclose: () => {
            console.log('Subscription closed');
        }
    });
}

window.sendMessage = sendMessage;
