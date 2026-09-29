# eso-level-estimator-web

Use it [online](https://juraj.bednar.io/esolevel)

<!-- jooray-links:start -->
### More from me

**Related projects**

- [nalgorithm](https://github.com/jooray/nalgorithm): rank your Nostr timeline by what matters to you, using an LLM
- [datasetgen-ng](https://github.com/jooray/datasetgen-ng): generate fine-tuning datasets from plain text
- [rag-backend](https://github.com/jooray/rag-backend): a simple backend with a RAG pipeline

**Full project showcase:** [Eso Level Estimator 8000 in my project showcase](https://juraj.bednar.io/showcase/#AI-01), or [all my projects](https://juraj.bednar.io/showcase/).

I write about building things on [my blog](https://juraj.bednar.io/en/blog-en/). I also wrote a cypherpunk novel, [Tamers of Entropy](https://tamersofentropy.net/), and there is a [trailer](https://tamersofentropy.net/#trailer).
<!-- jooray-links:end -->

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
