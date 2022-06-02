<template>
  <CFlex
    v-bind="mainStyles[colorMode]"
    h="100%"
    border-left="1px"
    border-left-color="gray.200"
    p="5"
  >
    <CBox d="flex" align-items="center" h="100%">
      <CBox>
        <CImage
          v-if="colorMode == 'light'"
          width="100%"
          my="3"
          p="3"
          :src="require('~/static/img/logos/layer_logo_light.svg')"
        />
        <CImage
          v-else-if="colorMode == 'dark'"
          width="100%"
          my="3"
          p="3"
          :src="require('~/static/img/logos/layer_logo_dark.svg')"
        />
        <CText mb="5" font-size="sm" font-weight="200">
          The climate art taskforce (<i>CAT</i>) is a global alliance of
          interdisciplinary digital artists against climate change. Based on an
          open source platform, <i>CAT</i> curates and publishes digital
          artworks & publications making climate change accessible and
          approachable for a non-expert audience. <i>CAT</i> invites digital
          practitioners to contribute with their own relating digital works.

          <br><br>
          With it’s open source approach, <i>CAT</i> aims to be inclusive
          towards all kinds of artists and art formats relating to climate
          change, everyone is welcome to contribute. Selected artworks and the
          platform itself are constantly curated for external projects and
          campaigns.
        </CText>
        <CButton
          as="router-link"
          to="/login"
          variant-color="catblue"
          shadow="sm"
        >
          SIGN IN AND CREATE
        </CButton>
      </CBox>
    </CBox>
  </CFlex>
</template>
<script>
import {
  CBox,
  CText,
  CButton,
  CFlex,
  CImage
}
  from '@chakra-ui/vue'
export default {

  components: {
    CBox,
    CText,
    CButton,
    CFlex,
    CImage
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
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
