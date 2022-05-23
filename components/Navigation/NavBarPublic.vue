<template>
  <div class="container">
    <CBox
      w="100%"
      v-bind="mainStyles[colorMode]"
      border-bottom="1px"
      border-bottom-color="gray.200"
      px="4"
    >
      <!-- <ArtworkGlobe /> -->
      <CFlex h="16" justify-content="space-between" align-items="center">
        <CLink
          to="/"
          as="router-link"
          font-size="lg"
          class="catfont"
        >
          <CImage mr="3" max-w="300px" :src="require('~/static/img/logo_full.svg')" />
        </CLink>
        <CFlex spacing="3" align-items="center">
          <CStack d="flex" align-items="center" direction="row" spacing="3">
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
            <CIconButton
              size="sm"
              mr="3"
              border="1px"
              border-color="gray.300"
              :icon="colorMode === 'light' ? 'moon' : 'sun'"
              :aria-label="`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`"
              @click="toggleColorMode"
            />

            <CMenu
              v-if="authenticated"
            >
              <CMenuButton
                size="sm"
                mr="3"
                border="1px"
                border-color="gray.300"
              >
                Nice
              </CMenuButton>
              <CMenuList />
            </CMenu>
            <CButton
              v-else
              to="/login"
              font-size="sm"
              as="router-link"
              mr="3"
              font-weight="normal"
              size="sm"
              border="1px"
              border-color="gray.300"
            >
              <!-- Use the `size` prop to change the icon size -->
              Log In<CIcon ml="1" name="arrow-right-to-bracket" size="24px" />
            </CButton>
          </CStack>
        </CFlex>
        </ctext>
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
  CLink,
  CImage,
  CButton,
  CStack,
  CIconButton,
  CFlex,
  CIcon
} from '@chakra-ui/vue'
// import ArtworkGlobe from '~/components/ArtworkGlobe.vue'

export default {
  name: 'App',
  components: {
    CBox,
    CMenu,
    CMenuButton,
    CMenuList,
    CImage,
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
      authenticated: false,
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
    }
  },
  methods: {

  }
}
</script>
