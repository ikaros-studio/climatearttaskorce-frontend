import Moralis from 'moralis'
import { mintToken } from './helpers'

export class NFT extends Moralis.Object {
  constructor () {
    super('NFT')
  }

  async mint () {
    try {
      const tokenURI = await mintToken(this.get('metadataURI'))
      this.set('isMinted', true)
      await this.save()
      return tokenURI
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  static create (URI) {
    const nft = new NFT()
    nft.set('metadataURI', URI)
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

Moralis.Object.registerSubclass('NFT', NFT)
