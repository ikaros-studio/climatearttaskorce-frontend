import Moralis from 'moralis'
import { getURLFromHash, mintToken } from './helpers'

export class NFT extends Moralis.Object {
  constructor () {
    super('NFT')
  }

  async mint () {
    try {
      const tokenURI = await mintToken(getURLFromHash(this.get('metadataHash')))
      this.set('isMinted', true)
      await this.save()
      return tokenURI
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  static create (hash) {
    const nft = new NFT()
    nft.set('metadataHash', hash)
    nft.set('isMinted', false)
    return nft
  }
}

export const addNFTToCurrentUser = async (NFT) => {
  const user = Moralis.User.current()
  const relation = user.relation('NFTs')
  relation.add(NFT)
  await user.save()
}

export const getNFTMetadataFromHash = async (hash) => {
  const data = await (await fetch(getURLFromHash(hash))).json()
  return {
    ...data,
    hash,
    link: getURLFromHash(data.artwork)
  }
}

const getMetadataFromObjectArray = async (NFTs) => {
  return await Promise.all(NFTs.map(async (NFT) => {
    const hash = NFT.get('metadataHash')
    return await getNFTMetadataFromHash(hash)
  }))
}

export const getNFTsForCurrentUser = async () => {
  const user = Moralis.User.current()
  const relation = user.relation('NFTs')
  const NFTs = await relation.query().find()
  return getMetadataFromObjectArray(NFTs)
}

export const getAllNFTs = async () => {
  const NFTs = await (new Moralis.Query(NFT)).find()
  return getMetadataFromObjectArray(NFTs)
}

Moralis.Object.registerSubclass('NFT', NFT)
