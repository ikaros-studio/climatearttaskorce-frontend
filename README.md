# Climate Art Taskforce
The climate art taskforce (CAT) is a global alliance of interdisciplinary digital artists against climate change. Based on an open source platform, CAT curates and publishes digital artworks & publications making climate change accessible and approachable for a non-expert audience. CAT invites digital practitioners to contribute with their own relating digital works.

With it’s open source approach, CAT aims to be inclusive towards all kinds of artists and art formats relating to climate change, everyone is welcome to contribute. Selected artworks and the platform itself are constantly curated for external projects and campaigns.

You can see the website hosted at https://climatearttaskforce.org/

# Development
CAT frontend is made using nuxtjs. Check out following instructions for development setup on local machine

## Build Setup

Once you have Node.js and npm (npm comes with Node.js), run the following commands:
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```
For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

Download [Metamask](https://metamask.io/download/) or [Coinbase](https://www.coinbase.com/wallet) wallet in order to Login and mint NFTs

## Environment
Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

Deploy `NFT` and `MarketPlace` contracts present in the contracts folder on any local blockchain created using for example [Ganache](https://trufflesuite.com/ganache/) or to any public blockchains for example `Mumbai Testnet` using [Hardhat](https://hardhat.org/) or [Remix IDE](https://remix.ethereum.org/) etc.

Create contractsData folder in the root directory and add following 2 JSON files onto it:

- NFT-address.json / NFT-address.json : Contains address of the deployed contract
```json
  {
    "address": 
  }
```

- NFT.json / NFT.json : Contains the metadata including `abi` for the deployed contract
```json
  {
    "abi": 
  }
```

# Documentation
- [How to Contribute](./CONTRIBUTING.md)
