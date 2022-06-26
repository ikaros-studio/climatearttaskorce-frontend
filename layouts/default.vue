<template>
  <div>
    <CThemeProvider>
      <CColorModeProvider>
        <CBox
          id="main-grid"
          font-family="body"
          as="main"
        >
          <CReset />
          <CAlert
            px="5"
            font-size="xs"
            justify-content="center"
            bg="gray.300"
            z-index="modal"
          >
            ⚙️ The climate art taskforce platform is currently in beta and still under development.
          </CAlert>
          <NavBar z-index="dropdown" />
          <Nuxt id="container" />
          <!-- <CFlex id="bodycontainer" w="100%">
            <CBox min-w="70vw">

            </CBox>
            <CBox
              id="description-container"
              w="30vw"
            />
          </CFlex> -->
          <Footer />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
  CAlert

} from '@chakra-ui/vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import Footer from '@/components/Navigation/Footer.vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    NavBar,
    Footer,
    CAlert
  },
  data () {
    return {
      // TODO: Add event listener
      hidedescription: true,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  created () {
    this.$nuxt.$on('hidedescription', () => {
      this.hidedescription = true
    })
  },
  methods: {
    getDescription (value) {
      this.description = value
    }
  }
}
</script>

<style>

#main-grid {
  /* overflow:hidden; */
  min-height: 100vh !important;
}

</style>
