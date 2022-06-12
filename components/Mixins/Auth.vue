<script>
import {
  getChainCurrency,
  getChainID,
  getConnectorFromWallet,
  getDownloadUrlFromWallet,
  monitorAccount,
  monitorChain
} from '~/common/helpers'

export default {
  data () {
    return {
      currentUser: this.$Moralis.User.current(),
      balance: 0,
      chainID: null,
      currency: 'ETH'
    }
  },
  computed: {
    userAddress () {
      return this.currentUser.get('ethAddress')
    }
  },
  async created () {
    if (this.currentUser) {
      const wallet = localStorage.getItem('wallet')
      await this.$Moralis.enableWeb3({ connector: getConnectorFromWallet(wallet) })
      await this.updateUserInfo()
    }
    monitorChain(async (chainID) => {
      this.balance = await this.getBalance(chainID)
      this.currency = getChainCurrency(chainID)
    })
    monitorAccount(async (account) => {
      await this.logout()
      // await this.authenticate()
    })
  },
  methods: {
    async updateUserInfo () {
      this.chainID = await getChainID()
      this.balance = await this.getBalance(this.chainID)
      this.currency = getChainCurrency(this.chainID)
    },
    async getBalance (chainID) {
      try {
        const promise = await this.$Moralis.Web3API.account.getNativeBalance({ chain: chainID })
        return parseFloat(promise.balance / 1e18).toFixed(4)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    logout () {
      this.$Moralis.User.logOut().then(() => {
        this.currentUser = null
        if (process.client) {
          localStorage.removeItem('wallet')
        }
        this.$router.push('/')
      })
    },
    async authenticate (wallet) {
      try {
        if (!this.currentUser) {
          const connector = getConnectorFromWallet(wallet)
          this.currentUser = await this.$Moralis.authenticate({ connector })
          if (process.client) {
            localStorage.setItem('wallet', wallet)
          }
        }
        this.updateUserInfo()
        this.isOpen = false
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        if (e.name === 'NoWalletError' || e.name === 'NoEthereumProviderError') {
          window.open(getDownloadUrlFromWallet(wallet), '_blank').focus()
        }
      }
    }
  }
}
</script>
