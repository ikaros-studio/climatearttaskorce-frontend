<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    z-index="docked"
    position="relative"
    p="5"
    w="100%"
  >
    <CBox
      w="100%"
      border-radius="1rem"
      shadow="sm"
      v-bind="mainStyles[colorMode]"
      border="1px"
      class="transparent-card"
      border-color="gray.300"
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
          <CBox :_hover="{ bg: 'rgba(255,255,255,0.2)', borderRadius:'1rem'}" p="2">
            <c-pseudo-box
              v-for="el, index in publicmenu"
              :key="index"
              as="router-link"
              :to="el.to"
              font-size="sm"
              mr="5"
              font-weight="light"
            >
              {{ el.name }}
            </c-pseudo-box>
          </CBox>
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
            z-index="toast"
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
          <CMenu z-index="dropdown">
            <CMenuButton
              shadow="md"
              border-radius="100%"
              border="1px"
              border-color="gray.300"
              p="0"
              trigger="hover"
            >
              <CIcon name="user" />
            </CMenuButton>
            <CMenuList mr="5" font-size="sm" z-index="tooltip">
              <CMenuItem as="router-link" to="/collection" py="2">
                <CIcon
                  mr="2"
                  name="layer-group"
                />My collection
              </CMenuItem>
              <CMenuItem as="router-link" to="/collection" py="2">
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
    </CBox>
  </CBox>
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
import AuthMixin from '../Mixins/Auth.vue'

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

.hoverpill {
  border-radius: 1rem !important;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

}

.hoverpill:hover {
  background: rgba(255,255,255,0.2) !important;
    text-decoration: none !important;
    border: 1px solid rgba(255,255,255)

}

</style>
