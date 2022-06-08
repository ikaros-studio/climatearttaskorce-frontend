<template>
  <div class="container">
    <CBox
      id="artworkarch-container"
      class="bg-gradient"
      v-bind="mainStyles[colorMode]"
      font-size="5xl"
      font-weight="bold"
    >
      <CGrid template-columns="repeat(6, 1fr)" gap="4">
        <CGridItem col-span="4">
          <ArtworkArch />
        </CGridItem>
        <CGridItem
          bg="transparent"
          border-left="1px"
          border-color="gray-300"
          col-span="2"
          d="flex"
          align-items="center"
          p="5"
          h="100vh"
        >
          <CText mb="5" font-size="sm" font-weight="light">
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
        </CGridItem>
      </CGrid>

      <!-- <ArtworkGlobe /> -->
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CGrid,
  CGridItem
} from '@chakra-ui/vue'
import ArtworkArch from '~/components/ArtworkArch.vue'

export default {
  name: 'App',
  components: {
    CBox,
    ArtworkArch,
    CGrid,
    CGridItem
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
