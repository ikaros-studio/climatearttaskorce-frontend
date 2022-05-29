import moralis from 'moralis'
import { abi as NFTAbi } from '../contractsData/NFT.json'
import { address as NFTAddress } from '../contractsData/NFT-address.json'
import { NETWORKS } from './constants'

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
