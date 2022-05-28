<template>
  <div
    id="navbar"
    class="container"
  >
    <CBox
      w="100%"
      v-bind="mainStyles[colorMode]"
      border-bottom="1px"
      border-bottom-color="gray.200"
      px="4"
    >
      <!-- <ArtworkGlobe /> -->
      <CFlex
        h="16"
        align-items="center"
      >
        <NuxtLink
          font-size="lg"
          class="catfont"
          to="/"
          w="100%"
        >
          CLIMATE ART TASKFORCE
          <!-- <CImage mr="3" max-w="300px" :src="require('~/static/img/logo_full.svg')" /> -->
        </NuxtLink>
        <CFlex w="100%" spacing="3">
          <CStack
            d="flex"
            align-items="center"
            direction="row"
            spacing="3"
          >
            <CLink
              v-for="el, index in publicmenu"
              :key="index"
              as="router-link"
              :to="el.to"
              font-size="sm"
              mr="5"
              font-weight="light"
            >
              {{ el.name }}
            </CLink>
            <!-- <CText>
              {{ boolean }}
              <CButton @click="boolean = false">
                False
              </CButton>
              <CButton @click="boolean = true">
                True
              </CButton>
            </CText> -->
          </CStack>
          <CStack ml="auto" d="flex" align-items="center" direction="row" spacing="3">
            <CIconButton
              v-if="!currentUser"
              size="sm"
              mr="3"
              border-radius="100%"
              border="1px"
              border-color="gray.300"
              :icon="colorMode === 'light' ? 'moon' : 'sun'"
              :aria-label="`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`"
              @click="toggleColorMode"
            />
            <CButton
              v-if="!currentUser"
              font-size="sm"
              ml="auto"
              font-weight="normal"
              size="sm"
              border="1px"
              border-color="gray.300"
              @click="open"
            >
              <c-modal
                id="authmodal"
                :is-open="isOpen"
                :on-close="close"
                :is-centered="true"
                z-index="modal"
              >
                <c-modal-content ref="content" border-radius="sm">
                  <c-modal-close-button />
                  <c-modal-body m="5">
                    <CBox v-if="!currentUser" m="3" align="center">
                      <CText font-weight="bold" font-size="2xl" mb="5">
                        Sign in with the wallet of your choice
                      </CText>
                      <CStack w="80%" spacing="2">
                        <CButton justify-content="start" w="100%">
                          <CImage mr="3" h="50%" :src="require('~/static/img/wallets/phantom.svg')" /> Phantom
                          <CTag variant-color="blue" size="sm" bg="gray.500" ml="auto">
                            soon
                          </CTag>
                        </CButton>
                        <CButton justify-content="start" w="100%" @click="authenticate()">
                          <CImage mr="3" h="50%" :src="require('~/static/img/wallets/metamask-alternative.webp')" /> MetaMask<CTag variant-color="blue" size="sm" bg="gray.500" ml="auto">
                            soon
                          </CTag>
                        </CButton>
                        <CButton justify-content="start" w="100%">
                          <CIcon mr="3" name="at" size="24px" /> Email<CTag variant-color="blue" size="sm" bg="gray.500" ml="auto">
                            soon
                          </CTag>
                        </CButton>
                      </CStack>
                      <CText mt="4">
                        Don't have an account yet?
                        <CLink>
                          Sign up.
                        </CLink>
                      </CText>
                    </CBox>
                  </c-modal-body>
                </c-modal-content>
                <c-modal-overlay />
              </c-modal>
              <!-- Use the `size` prop to change the icon size -->
              Log In<CIcon ml="1" name="arrow-right-to-bracket" size="24px" />
            </CButton>
            <CBox v-else>
              <CMenu mr="3">
                <CMenuButton
                  border-radius="100%"
                  border="1px"
                  border-color="gray.300"
                  p="0"
                >
                  <CIcon name="user" />
                </CMenuButton>
                <CMenuList>
                  <CMenuDivider />
                  <CMenuItem as="router-link" to="collection" py="2">
                    <CIcon
                      mr="2"
                      name="layer-group"
                    />My collection
                  </CMenuItem>
                  <CMenuItem py="2">
                    <CIcon
                      mr="2"
                      name="arrow-up-from-bracket"
                    />Upload an artwork
                  </CMenuItem>
                  <CMenuItem py="2" @click="toggleColorMode">
                    <CIcon
                      mr="2"
                      :name="colorMode === 'light' ? 'moon' : 'sun'"
                    />{{ `Switch to ${
                      colorMode === 'light' ? 'dark' : 'light'
                    } mode` }}
                  </CMenuItem>

                  <CMenuDivider />
                  <CMenuItem py="2" @click="logout()">
                    <CIcon mr="2" name="arrow-right-from-bracket" size="24px" /> Log out
                  </CMenuItem>
                </CMenuList>
              </CMenu>
            </CBox>
          </CStack>
        </CFlex>
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CMenu,
  CMenuButton,
  CMenuList,
  CMenuItem,
  CMenuDivider,
  CLink,
  CButton,
  CStack,
  CIconButton,
  CFlex,
  CText,
  CIcon,
  CImage,
  CTag
} from '@chakra-ui/vue'
// import ArtworkGlobe from '~/components/ArtworkGlobe.vue'
import { monitorAccount, monitorChain, getChainID, getChainCurrency } from '@/common/helpers'

export default {
  name: 'App',
  components: {
    CBox,
    CMenu,
    CMenuButton,
    CMenuList,
    CMenuItem,
    CMenuDivider,
    CLink,
    CButton,
    CImage,
    CStack,
    CText,
    CIconButton,
    CFlex,
    CIcon,
    CTag

  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      isOpen: false,
      boolean: false,
      currentUser: null,
      balance: 0,
      chainID: null,
      currency: 'ETH',
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      },
      publicmenu: [
        { name: 'About', to: '' }, { name: 'Publications', to: '/' },
        { name: 'Artworks', to: '/' }
      ]
    }
  },
  async fetch () {
    this.currentUser = await this.$Moralis.User.current()
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    },
    userAddress () {
      return this.currentUser.get('ethAddress')
    }
  },
  async created () {
    if (this.currentUser) {
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
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
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
      })
    },
    async authenticate () {
      try {
        window.web3 = await this.$Moralis.enableWeb3()
        if (!this.currentUser) {
          this.currentUser = await this.$Moralis.authenticate()
        }
        this.updateUserInfo()
        this.isOpen = false
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }

  }

}
</script>

<style>
span#modal-portal-authmodal {
    position: relative !important;
    z-index: 200;
}
</style>