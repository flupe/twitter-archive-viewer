A web app to view your own twitter archive in the browser. Still WIP.

## Features

Currently, this web app allows you to read all your past conversations in full, starting from the very beginning.

Supported content:
- Images
- Stickers
- Videos

Unsupported:
- Gif reactions
- Linked tweets

## Instructions

The first step is to clone this repository on your computer.

```bash
git clone https://github.com/flupe/twitter-archive-viewer.git
cd twitter-archive-viewer
```

Then request and download your very own twitter archive by [following the guidelines](https://help.twitter.com/managing-your-account/how-to-download-your-twitter-archive). You should end up with a ZIP file that you can now unzip as `archive` in the `public` folder of this project.

```bash
# our own twitter archive is twitter-archive.zip
unzip -d public/archive twitter-archive.zip
```

Install the dependencies and build the app.

```bash
npm i
npm run build
```

Finally, open the `public/index.html` file in your browser and voilà.

## Why Svelte?

No other reason than I wanted to try it.
Why go vanilla when you can use the latest trendy shit.
