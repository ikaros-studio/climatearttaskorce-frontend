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
          <NavBarPublic />
          <CFlex id="bodycontainer" w="100%">
            <CBox w="70vw">
              <Nuxt />
            </CBox>
            <CBox
              id="description-container"
              w="30vw"
              bg="blue.200"
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
import NavBarPublic from '@/components/Navigation/NavBarPublic.vue'
import Description from '~/components/Navigation/Description.vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    CFlex,
    NavBarPublic,
    Description
  },
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
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
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
