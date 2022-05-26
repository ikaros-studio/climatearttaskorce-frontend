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
          </CStack>
          <CStack ml="auto" d="flex" align-items="center" direction="row" spacing="3">
            <CIconButton
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
              to="/login"
              font-size="sm"
              as="router-link"
              ml="auto"
              font-weight="normal"
              size="sm"
              border="1px"
              border-color="gray.300"
            >
              <!-- Use the `size` prop to change the icon size -->
              Log In<CIcon ml="1" name="arrow-right-to-bracket" size="24px" />
            </CButton>
            <CMenu v-else-if="currentUser" mr="3">
              <CMenuButton
                size="sm"
                border-radius="100%"
                border="1px"
                border-color="gray.300"
                p="0"
              >
                <CIcon name="user" />
              </CMenuButton>
              <CMenuList>
                <CMenuItem>Artworks</CMenuItem>
                <CMenuItem>Upload an artwork</CMenuItem>
                <CMenuDivider />
                <CMenuItem @click="logout()">
                  Log out
                </CMenuItem>
                <Cbox>
                  <CText>{{ userAddress }}</CText>
                  <CText font-weight="bold" font-size="2xl">
                    Total Balance
                  </CText>
                  <CText>
                    {{ currentUser }}
                    {{ balance }} {{ currency }}
                  </CText>
                  <CButton justify-content="start" w="100%">
                    Sign Out
                  </CButton>
                </Cbox>
              </CMenuList>
            </CMenu>
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
  // CImage,
  CButton,
  CStack,
  CIconButton,
  CFlex,
  CIcon
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
    // CImage,
    CLink,
    CButton,
    CStack,
    CIconButton,
    CFlex,
    CIcon
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      currentUser: this.$Moralis.User.current(),
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
        { name: 'About', to: '/login' }, { name: 'Publications', to: '/' },
        { name: 'Artworks', to: '/' }
      ]
    }
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
      await this.authenticate()
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
    async logout () {
      await this.$Moralis.User.logOut()
      this.currentUser = null
    },
    async authenticate () {
      try {
        if (!this.currentUser) {
          this.currentUser = await this.$Moralis.authenticate()
        }
        this.updateUserInfo()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }

  }

}
</script>

<style>

#navbar {
  position: relative;
  z-index: 100 !important;
}

</style>
