import Moralis from 'moralis'

Moralis.start({
  serverUrl: process.env.MoralisServerUrl,
  appId: process.env.MoralisAppId
})

export default async (_, inject) => {
  window.web3 = await Moralis.enableWeb3()
  inject('Moralis', Moralis)
}
