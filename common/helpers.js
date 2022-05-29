import moralis from 'moralis'
import { NETWORKS } from './constants'

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
  const moralisFile = isJSON ? new moralis.File('metadata.json', { base64: btoa(JSON.stringify(file)) }) : new moralis.File(file.name, file)
  await moralisFile.saveIPFS()
  return moralisFile.ipfs()
}
