import Moralis from 'moralis'

Moralis.start({
  serverUrl: process.env.MoralisServerUrl,
  appId: process.env.MoralisAppId
})

export default (_, inject) => {
  inject('Moralis', Moralis)
}
