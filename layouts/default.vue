<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox
          id="main-grid"
          font-family="body"
          as="main"
        >
          <CReset />
          <NavBar />
          <CFlex id="bodycontainer" w="100%">
            <CBox min-w="70vw">
              <Nuxt />
            </CBox>
            <CBox
              id="description-container"
              w="30vw"
            >
              <Description />
            </CBox>
          </CFlex>
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
  CFlex

} from '@chakra-ui/vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import Description from '~/components/Navigation/Description.vue'
import Footer from '@/components/Navigation/Footer.vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    CFlex,
    NavBar,
    Description,
    Footer
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
  height: 100vh !important;
}

#description-container {
  position: relative !important;
  z-index: 0.5;
}

</style>
