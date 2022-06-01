import moralis from 'moralis'
import { abi as NFTAbi } from '../contractsData/NFT.json'
import { address as NFTAddress } from '../contractsData/NFT-address.json'
import { NETWORKS, WALLETS } from './constants'

const ethers = moralis.web3Library

export const getChainID = async () => {
  try {
    return await moralis.getChainId()
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
  moralis.onChainChanged(onChange)
}

export const monitorAccount = (onChange) => {
  moralis.onAccountChanged(onChange)
}

export const uploadToIPFS = async (file, isJSON = false) => {
  try {
    const moralisFile = isJSON ? new moralis.File('metadata.json', { base64: btoa(JSON.stringify(file)) }) : new moralis.File(file.name, file)
    await moralisFile.saveIPFS()
    return moralisFile.ipfs()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const mintToken = async (uri) => {
  try {
    const provider = await moralis.enableWeb3()
    const nft = new ethers.Contract(NFTAddress, NFTAbi, provider.getSigner())
    return await (await nft.mint(uri)).wait()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

function fromDecimalToHex (number) {
  if (typeof number !== 'number') { throw new TypeError('The input provided should be a number') }
  return `0x${number.toString(16)}`
}

export class NoEthereumProviderError extends Error {
  constructor () {
    super()
    this.message = 'Non ethereum enabled browser'
  }
}

export class NoWalletError extends Error {
  constructor (wallet) {
    super()
    this.message = `${wallet} wallet not found. Please install ${wallet}`
  }
}

function verifyChainId (chainId) {
  if (typeof chainId === 'number') { chainId = fromDecimalToHex(chainId) }
  return chainId
}

class MetamaskConnector extends moralis.AbstractWeb3Connector {
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
        if (p.isMetaMask) { provider = p }
      })
    }

    if (!provider.isMetaMask) { throw new NoWalletError('Metamask') }

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
    if (currentNetwork === chainId) { return }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
  }

  async addNetwork (chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl) {
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

class CoinBaseConnector extends moralis.AbstractWeb3Connector {
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
        if (p.isCoinbaseWallet) { provider = p }
      })
    }

    if (!provider.isCoinbaseWallet) { throw new NoWalletError('CoinBase') }

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
    if (currentNetwork === chainId) { return }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
  }

  async addNetwork (chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl) {
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
    case 'metamask': return MetamaskConnector
    case 'coinbase': return CoinBaseConnector
  }
}

export const getDownloadUrlFromWallet = (wallet) => {
  return WALLETS[wallet].URL
}
