<template>
  <div class="container">
    <CBox
      h="100vh"
      v-bind="mainStyles[colorMode]"
    >
      <ArtworkArch />
      <!-- <ArtworkGlobe /> -->
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox
} from '@chakra-ui/vue'
import ArtworkArch from '~/components/ArtworkArch.vue'

export default {
  name: 'App',
  components: {
    CBox,
    ArtworkArch
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
