<template>
  <CFlex
    v-bind="mainStyles[colorMode]"
    justify-content="center"
    h="100vh"
    w="100%"
    align-items="center"
  >
    <CBox v-if="!currentUser" align="center">
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
        Don't have an account yet? <CLink to="/signup">
          Sign up.
        </CLink>
      </CText>
      <!-- <CList
        border-color="gray.300"
        spacing="4"
        bg="gray.100"
        border="1px"
        border-radius="md"
        p="5"
      >
        <CLink>
          <CListItem size="lg" />
        </CLink>
        <CDivider border-color="gray.300" />
        <CListItem size="lg">
          <CListIcon icon="check-circle" color="green.500" />Lorem ipsum dolor sit amet<CTag>soon</CTag>
        </CListItem>
      </CList> -->
    </CBox>
  </CFlex>
</template>
<script>

import { CButton, CStack, CImage, CText, CFlex, CBox, CTag } from '@chakra-ui/vue'

export default {

  components: {
    CButton, CStack, CImage, CText, CFlex, CBox, CTag
  },
  inject: ['$chakraColorMode'],
  data () {
    return {
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

      currentUser: this.$Moralis.User.current(),
      balance: 0,
      chainID: null,
      currency: 'ETH'
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    userAddress () {
      return this.currentUser.get('ethAddress')
    }
  },
  async created () {

  },
  methods: {

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
