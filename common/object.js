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

export const getNFTsForCurrentUser = async () => {
  const user = Moralis.User.current()
  const relation = user.relation('NFTs')
  return await relation.query().find()
}

// TODO: Add Singe NFT call

// TODO: Add Call for all NFTs

Moralis.Object.registerSubclass('NFT', NFT)
