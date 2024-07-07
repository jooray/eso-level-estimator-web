# eso-level-estimator-web

Use it [online](https://juraj.bednar.io/esolevel)

## Build

```bash
npm install
npx webpack
```

Then serve over http(s), if you use [my dotfiles](https://github.com/jooray/dotfiles), you can just run "server 8000" in this directory.

## How it works

The web creates a random Nostr identity and sends a DM to a backend bot powered by [nostr-ai-bot](https://github.com/jooray/nostr-ai-bot).
Then it displays the reply.

## Goal

The goal of this project is to see if Nostr can be a backend to a simple text based web app.

Also, we need to make this universe way more intelligent than it is 👽

## Not satisfied with the resulting eso level?

Unfortunately, the eso level estimator is always right. You need to look into the mirror and
meditate on why you are mistaken.

Have fun!
