<template>
  <CBox v-bind="mainStyles[colorMode]">
    <CGrid p="5" template-columns="repeat(6, 1fr)" gap="6">
      <CGridItem
        col-span="4"
        w="100%"
        h="100%"
      >
        <FileDisplay :type="artwork.file_type" :link="artwork.metadata" />
      </CGridItem>
      <CGridItem
        float="bottom"
        col-span="2"
        w="100%"
        d="flex"
        align-items="center"
      >
        <CStack spacing="4">
          <CLink as="router-link" to="/" font-size="xs">
            ← Back to artworks
          </CLink>
          <CText w="100%" font-size="2xl">
            {{ artwork.name }}
          </CText>
          <CFlex align-items="center">
            <CText font-size="sm" mr="1" font-weight="light">
              Artist(s):
            </CText>
            <CTag
              v-for="artist, index in artwork.artists"
              :key="index"
              variant-color="catpink"
              size="sm"
              bg="gray.500"
              mr="1"
            >
              {{ artist }}
            </CTag>
          </CFlex>
          <CText font-size="sm" mr="1" font-weight="light">
            {{ artwork.material }}
          </CText>
          <CText mb="5" font-size="xs" font-weight="200">
            {{ artwork.description }}
          </CText>
          <CText font-size="xs">
            <CLink>
              Artist Instagram
            </CLink> | <CLink>Artist Website</CLink>
          </CText>

          <CStack
            direction="row"
            spacing="1"
          >
            <CButton size="sm" variant-color="gray">
              + Add to collection
            </CButton>
            <CButton size="sm">
              Request artwork
            </CButton>
          </CStack>
        </CStack>
      </CGridItem>
    </CGrid>
  </CBox>
</template>

<script>
import {
  CBox
  // CTag,
  // CGrid,
  // CGridItem,
  // CStack,
  // CFlex,
  // CLink
} from '@chakra-ui/vue'
// import FileDisplay from '@/components/Artwork/FileDisplay'
import { getURLFromHash } from '~/common/helpers'
// // import { getNFTsForCurrentUser } from '~/common/object'

export default {
  components: {
    CBox
    // CTag,
    // CGrid,
    // CGridItem,
    // CStack,
    // CFlex,
    // CLink,
    // FileDisplay
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  // TODO: Fetch artwork object
  async asyncData ({ params }) {
    const hash = params.hash // When calling /abc the slug will be "abc"
    const metadata = await getURLFromHash(hash)
    return { metadata }
  },
  data () {
    return {
      showInfo: true,
      artworks: [],
      artwork: {
        file_type: 'image'
      },
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
  }
}
</script>

<style>
.rounded {
  border-radius:0.25rem
}

</style>
