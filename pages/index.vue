<template>
  <CBox
    v-bind="mainStyles[colorMode]"
  >
    <CBox
      id="artworkarch-container"
      v-bind="mainStyles[colorMode]"
      font-size="5xl"
      font-weight="bold"
    >
      <CGrid template-columns="repeat(6, 1fr)" gap="4">
        <CGridItem col-span="4" ml="5">
          <ArtworkGrid />
          <!-- <ArtworkArch /> -->
        </CGridItem>
        <CGridItem
          v-bind="mainStyles[colorMode]"
          my="auto"
          mr="5"
          col-span="2"
          d="flex"
          border-radius="1rem"
          align-items="center"
          p="5"
          h="70vh"
        >
          <CBox>
            <CLink
              as="router-link"
              to="/"
              d="flex"
              mb="5"
              align-items="center"
            >
              <CImage
                v-if="colorMode == 'light'"
                height="8rem"
                my="auto"
                mr="3"
                :src="require('~/static/img/logos/layer_logo_light.svg')"
              />
              <CImage
                v-else-if="colorMode == 'dark'"
                my="auto"
                height="8rem"
                mr="3"
                :src="require('~/static/img/logos/layer_logo_dark.svg')"
              />
            </CLink>
            <CText font-size="sm" font-weight="light">
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
            <CButton border="1px" size="lg" border-radius="2rem">
              Explore now
            </CButton>
          </CBox>
        </CGridItem>
      </CGrid>

      <!-- <ArtworkGlobe /> -->
    </CBox>
  </CBox>
</template>

<script lang="js">
import {
  CBox,
  CGrid,
  CGridItem
} from '@chakra-ui/vue'
import ArtworkGrid from '~/components/ArtworkGrid.vue'
// import ArtworkArch from '~/components/ArtworkArch.vue'

export default {
  name: 'App',
  components: {
    CBox,
    // ArtworkArch,
    CGrid,
    CGridItem,
    ArtworkGrid
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      showModal: false,
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
