<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main">
          <CReset />
          <NavBarPublic />
          <c-grid w="100%" template-columns="repeat(6, 1fr)" gap="0">
            <c-grid-item col-span="4" min-h="100vh">
              <Nuxt />
            </c-grid-item>
            <c-grid-item
              col-span="2"
              h="100%"
              bg="blue.200"
            >
              <Description />
            </c-grid-item>
          </c-grid>
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
  CGrid,
  CGridItem
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
    NavBarPublic,
    CGrid,
    CGridItem,
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
