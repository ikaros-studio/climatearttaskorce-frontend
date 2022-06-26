<template>
  <CBox v-bind="mainStyles[colorMode]">
    <CGrid v-bind="mainStyles[colorMode]" px="5" template-columns="repeat(6, 1fr)" gap="6">
      <CGridItem col-span="4">
        <CLink as="router-link" to="/" font-size="">
          ← Back to artworks
        </CLink>
        <CBox border="1px" border-color="gray.300" mt="5" border-radius="1rem">
          <FileDisplay :type="artwork.file_type" :link="artwork.link" />
        </CBox>
      </CGridItem>
      <CGridItem float="bottom" col-span="2" w="100%" d="flex" align-items="center">
        <CStack spacing="4">
          <CText w="100%" font-weight="bold" font-size="2xl">
            {{ artwork.name }}
          </CText>
          <CBox align-items="center">
            <CText v-if="!artwork.artistarr" font-size="sm" mr="1" font-weight="light">
              Artist(s): <CTag variant-color="catpink" size="sm" bg="gray.500" mr="1">
                {{ artwork.artist_name }}
              </CTag>
            </CText>
            <CText v-else>
              Artist(s): <CTag
                v-for="artist, index in artwork.artists"
                :key="index"
                variant-color="catpink"
                size="sm"
                bg="gray.500"
                mr="1"
              >
                {{ artist }}
              </CTag>
            </CText>
          </CBox>
          <CText v-if="artwork.material" font-size="sm" mr="1" font-weight="light">
            {{ artwork.material }}
          </CText>
          <CText mb="5" font-size="xs" font-weight="200">
            <span v-if="artworks.description">{{ artwork.description }}</span>
            <span v-else>No description available</span>
          </CText>
          <CText font-size="xs">
            <CLink>
              Artist Instagram 🔗
            </CLink> | <CLink>Artist Website 🔗</CLink>
          </CText>

          <CStack direction="row" spacing="1">
            <CButton disabled v-if="artworks.find(el => el.hash === artwork.hash)" size="sm">
              ✅ In your collection
            </CButton>
            <CButton v-else size="sm" variant-color="gray">
              + Add to collection
            </CButton>

          </CStack>
        </CStack>
      </CGridItem>
    </CGrid>
  </CBox>
</template>

<script>
import {
  CBox,
  CTag,
  CGrid,
  CGridItem,
  CStack,
  CLink
} from '@chakra-ui/vue'
import { getNFTsForCurrentUser, getNFTMetadataFromHash } from '~/common/object'

import FileDisplay from '@/components/Artwork/FileDisplay'
// // import { getNFTsForCurrentUser } from '~/common/object'

export default {
  components: {
    CBox,
    CTag,
    CGrid,
    CGridItem,
    CStack,
    CLink,
    FileDisplay
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  // TODO: Fetch artwork object
  async asyncData ({ params }) {
    const hash = params.hash // When calling /abc the hash will be "abc"
    const artwork = await getNFTMetadataFromHash(hash)
    return { artwork }
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
  },
  async fetch () {
    this.artworks = await getNFTsForCurrentUser()
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  }
}
</script>

<style>
.rounded {
  border-radius: 0.25rem
}
</style>
