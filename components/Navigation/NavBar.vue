<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    z-index="docked"
    p="5"
    w="100%"
  >
    <CBox
      w="100%"
      border-radius="1rem"
      class="transparent-card"
      v-bind="mainStyles[colorMode]"
      border-bottom="1px"
      border-bottom-color="gray.200"
      px="4"
      d="flex"
      h="16"
      align-items="center"
      justify-content="space-between"
    >
      <!-- <ArtworkGlobe /> -->
      <CFlex>
        <CLink
          as="router-link"
          to="/"
          d="flex"
          align-items="center"
        >
          <CImage
            v-if="colorMode == 'light'"
            height="2.5rem"
            my="auto"
            mr="3"
            :src="require('~/static/img/logos/layer_logo_light.svg')"
          />
          <CImage
            v-else-if="colorMode == 'dark'"
            my="auto"
            height="2.5rem"
            mr="3"
            :src="require('~/static/img/logos/layer_logo_dark.svg')"
          />
        </CLink>
        <CStack
          ml="5"
          d="flex"
          align-items="center"
          direction="row"
          spacing="4"
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
      </CFlex>

      <CStack
        ml="auto"
        mr="0"
        d="flex"
        align-items="center"
        direction="row"
        spacing="3"
      >
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
          <CModal
            id="authmodal"
            :is-open="isOpen"
            :on-close="close"
            :is-centered="true"
            z-index="modal"
          >
            <CModalContent ref="content" border-radius="1rem">
              <CModalCloseButton />
              <CModalBody m="5">
                <CBox v-if="!currentUser" m="3" align="center">
                  <CText font-weight="bold" font-size="2xl" mb="5">
                    Sign in with the wallet of your choice
                  </CText>
                  <CStack w="80%" spacing="2">
                    <CButton justify-content="start" w="100%" @click="() => authenticate('metamask')">
                      <CImage mr="3" h="50%" :src="require('~/static/img/wallets/metamask-alternative.webp')" /> MetaMask
                    </CButton>
                    <CButton justify-content="start" w="100%" @click="() => authenticate('coinbase')">
                      <CImage mr="3" h="50%" :src="require('~/static/img/wallets/Coinbase.svg')" /> CoinBase
                    </CButton>
                    <CButton disabled justify-content="start" w="100%">
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
              </CModalBody>
            </CModalContent>
            <CModalOverlay />
          </CModal>
          <!-- Use the `size` prop to change the icon size -->
          Log In<CIcon ml="1" name="arrow-right-to-bracket" size="24px" />
        </CButton>
        <CBox v-else>
          <CPopover
            placement="bottom"
            trigger="hover"
          >
            <CPopoverTrigger>
              <CButton
                border-radius="100%"
                border="1px"
                border-color="gray.300"
                p="0"
                trigger="hover"
              >
                <CIcon name="user" />
              </CButton>
            </CPopoverTrigger>
            <CPopoverContent
              z-index="dropdown"
              box-shadow="lg"
              border="1px"
              border-color="gray.100"
              p="3"
              border-radius="1rem"
            >
              <CStack font-weight="300">
                <CLink as="router-link" to="/collection">
                  <CIcon
                    mr="2"
                    name="layer-group"
                  />My collection
                </CLink>
                <CLink as="router-link" to="/collection">
                  <CIcon
                    mr="2"
                    name="arrow-up-from-bracket"
                  />Upload an artwork
                </CLink>
                <CLink @click="toggleColorMode">
                  <CIcon
                    mr="2"
                    :name="colorMode === 'light' ? 'moon' : 'sun'"
                  />{{ `Switch to ${
                    colorMode === 'light' ? 'dark' : 'light'
                  } mode` }}
                </CLink>
                <CDivider my="2" />
                <CLink @click="logout()">
                  <CIcon mr="2" name="arrow-right-from-bracket" size="24px" /> Log out
                </CLink>
              </CStack>
            <!-- <CMenuList>
                <CMenuItem as="router-link" to="/collection" py="2">
                  <CIcon
                    mr="2"
                    name="layer-group"
                  />My collection
                </CMenuItem>
                <CMenuItem as="router-link" to="/collection" py="2">

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
              </CMenuList> -->
            </CPopoverContent>
          </CPopover>
        </CBox>
      </CStack>
    </CBox>
  </CBox>
</template>

<script lang="js">
import {
  CPopover,
  CPopoverContent,
  CPopoverTrigger,
  CBox,
  // CMenu,
  // // CMenuButton,
  // CMenuList,
  // CMenuItem,
  // CMenuDivider,
  CDivider,
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
import AuthMixin from '../Mixins/Auth.vue'

export default {
  name: 'App',
  components: {
    CPopover,
    CPopoverContent,
    CPopoverTrigger,
    CBox,
    CDivider,
    // CMenu,
    // // CMenuButton,
    // CMenuList,
    // CMenuItem,
    // CMenuDivider,
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
  mixins: [AuthMixin],
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      isOpen: false,
      boolean: false,
      isMenuOpen: false,
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
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  },
  created () {
    // Set intial color mode to dark
    this.$toggleColorMode()
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
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
