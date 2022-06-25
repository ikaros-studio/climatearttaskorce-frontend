import Moralis from 'moralis'
import { abi as NFTAbi } from '../contractsData/NFT.json'
import { NETWORKS, WALLETS } from './constants'

const ethers = Moralis.web3Library

export const getChainID = async () => {
  try {
    return await Moralis.getChainId()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const getChainName = (chainID) => {
  return NETWORKS[chainID].name
}

export const getChainCurrency = (chainID) => {
  return NETWORKS[chainID].symbol
}

export const monitorChain = (onChange) => {
  Moralis.onChainChanged(onChange)
}

export const monitorAccount = (onChange) => {
  Moralis.onAccountChanged(onChange)
}

export const uploadToIPFS = async (file, type = 'media') => {
  if (!file) {
    return
  }
  try {
    let MoralisFile
    switch (type) {
      case 'media':
        MoralisFile = new Moralis.File(file.name, file)
        break

      case 'json':
        MoralisFile = new Moralis.File('metadata.json', {
          base64: btoa(JSON.stringify(file))
        })
        break

      case 'html':
        MoralisFile = new Moralis.File(
          'data.html',
          { base64: btoa(file) },
          'text/html'
        )
    }

    await MoralisFile.saveIPFS()
    return MoralisFile.hash()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const getURLFromHash = (hash) => {
  return `https://gateway.moralisipfs.com/ipfs/${hash}`
}

export const getFileType = (file) => {
  if (!file) {
    return
  }
  return file.type.split('/')[0]
}

export const mintToken = async (uri) => {
  try {
    const wallet = localStorage.getItem('wallet')
    const provider = await Moralis.enableWeb3({
      connector: getConnectorFromWallet(wallet)
    })
    const nft = new ethers.Contract(
      process.env.NftContract,
      NFTAbi,
      provider.getSigner()
    )
    return await (await nft.mint(uri)).wait()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

function fromDecimalToHex (number) {
  if (typeof number !== 'number') {
    throw new TypeError('The input provided should be a number')
  }
  return `0x${number.toString(16)}`
}

class NoEthereumProviderError extends Error {
  constructor () {
    super()
    this.message = 'Non ethereum enabled browser'
    this.name = 'NoEthereumProviderError'
  }
}

class NoWalletError extends Error {
  constructor (wallet) {
    super()
    this.message = `${wallet} wallet not found. Please install ${wallet}`
    this.name = 'NoWalletError'
  }
}

function verifyChainId (chainId) {
  if (typeof chainId === 'number') {
    chainId = fromDecimalToHex(chainId)
  }
  return chainId
}

class MetamaskConnector extends Moralis.AbstractWeb3Connector {
  type = 'metamask';

  verifyEthereumBrowser () {
    if (!window?.ethereum) {
      throw new NoEthereumProviderError()
    }
  }

  async activate () {
    this.verifyEthereumBrowser()

    let provider = window.ethereum
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach((p) => {
        if (p.isMetaMask) {
          provider = p
        }
      })
    }

    if (!provider.isMetaMask) {
      throw new NoWalletError('Metamask')
    }

    const [accounts, chainId] = await Promise.all([
      provider.request({
        method: 'eth_requestAccounts'
      }),
      provider.request({ method: 'eth_chainId' })
    ])

    const account = accounts[0] ? accounts[0].toLowerCase() : null

    this.chainId = chainId
    this.account = account
    this.provider = provider

    this.subscribeToEvents(provider)

    return { provider, chainId, account }
  }

  async switchNetwork (chainId) {
    this.verifyEthereumBrowser()
    chainId = verifyChainId(chainId)

    const currentNetwork = this.chainId
    if (currentNetwork === chainId) {
      return
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
  }

  async addNetwork (
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  ) {
    this.verifyEthereumBrowser()

    const newchainId = verifyChainId(chainId)
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: newchainId,
          chainName,
          nativeCurrency: {
            name: currencyName,
            symbol: currencySymbol,
            decimals: 18
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : null
        }
      ]
    })
  }
}

class CoinBaseConnector extends Moralis.AbstractWeb3Connector {
  type = 'metamask';

  verifyEthereumBrowser () {
    if (!window?.ethereum) {
      throw new NoEthereumProviderError()
    }
  }

  async activate () {
    this.verifyEthereumBrowser()

    let provider = window.ethereum
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach((p) => {
        if (p.isCoinbaseWallet) {
          provider = p
        }
      })
    }

    if (!provider.isCoinbaseWallet) {
      throw new NoWalletError('CoinBase')
    }

    const [accounts, chainId] = await Promise.all([
      provider.request({
        method: 'eth_requestAccounts'
      }),
      provider.request({ method: 'eth_chainId' })
    ])

    const account = accounts[0] ? accounts[0].toLowerCase() : null

    this.chainId = chainId
    this.account = account
    this.provider = provider

    this.subscribeToEvents(provider)

    return { provider, chainId, account }
  }

  async switchNetwork (chainId) {
    this.verifyEthereumBrowser()
    chainId = verifyChainId(chainId)

    const currentNetwork = this.chainId
    if (currentNetwork === chainId) {
      return
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
  }

  async addNetwork (
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  ) {
    this.verifyEthereumBrowser()

    const newchainId = verifyChainId(chainId)
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: newchainId,
          chainName,
          nativeCurrency: {
            name: currencyName,
            symbol: currencySymbol,
            decimals: 18
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : null
        }
      ]
    })
  }
}

export const getConnectorFromWallet = (wallet) => {
  switch (wallet) {
    case 'metamask':
      return MetamaskConnector
    case 'coinbase':
      return CoinBaseConnector
  }
}

export const getDownloadUrlFromWallet = (wallet) => {
  return WALLETS[wallet].URL
}
