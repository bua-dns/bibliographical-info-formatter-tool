# Formatter Tool for K10plus Data (Work in Progress)

## What this tool does

This tool produces formatted bibliographical information for publications that are listed in the [K10plus](https://opac.k10plus.de/) catalogue. The data is fetched using the Search and Retrieve via URL (SRU) interface of K10plus.

The frontend (see below) asks for a Pica Production Number (PPN), a 9- or 10-digit identifier that is available for all entries in K10plus.

The output is a formatted reference in plain text and html format that can be copied into the user's clipboard.

## Configuration

(Coming soon ...)

## Frontend (GitHub Pages)

The tool's frontend is programmed in vue.js and is by default hosted on github pages:

[https://bua-dns.github.io/bibliographical-info-formatter-tool/](https://bua-dns.github.io/bibliographical-info-formatter-tool/)

## Working With Vue.js

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.