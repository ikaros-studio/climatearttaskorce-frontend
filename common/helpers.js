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
