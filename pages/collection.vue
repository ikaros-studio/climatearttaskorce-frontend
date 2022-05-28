<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    min-h="100vh"
  >
    <CBox
      v-if="artworks.length < 1"
      p="5"
      h="100%"
      w="100%"
    >
      <UploadArtwork :cta="'Upload your first artwork'" />
    </CBox>
    <CGrid v-else p="5" template-columns="repeat(3, 4fr)" gap="4">
      <CGridItem>
        <CBox
          border="1px"
          border-color="gray.300"
          border-radius="sm"
          h="300px"
          w="100%"
        />
      </CGridItem>
      <CGridItem>
        <CBox
          border="1px"
          border-radius="sm"
          border-color="gray.300"
          h="300px"
          w="100%"
        />
      </CGridItem>
      <CGridItem w="100%">
        <UploadArtwork />
      </CGridItem>
    </CGrid>
  </CBox>
</template>

<script>
import {
  CGrid,
  CGridItem
} from '@chakra-ui/vue'
import UploadArtwork from '~/components/Collection/UploadArtwork.vue'

export default {
  components: {
    CGrid,
    CGridItem,
    UploadArtwork
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      // IMPLEMENT USER ARTWORKS
      artworks: [],
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
