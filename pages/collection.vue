<template>
  <CBox
    v-bind="
      mainStyles[colorMode]"
    min-h="100vh"
    class="bg-continents"
  >
    <CBox
      w="100%"
      px="5"
      d="flex"
      justify-content="space-between"
      align-items="center"
    >
      <CText font-weight="bold" font-size="2xl">
        Your collection
      </CText>
      <UploadArtwork v-if="artworks.length > 0" :cta="'Upload another artwork'" @onupload="$fetch" />
    </CBox>
    <CBox
      v-if="(artworks.length < 1) && !$fetchState.pending"
      p="5"
      h="100%"
      w="100%"
    >
      <CAlert
        font-size="sm"
        border-radius="1rem"
        status="info"
        mb="5"
      >
        <CAlertIcon />
        You don't have any artworks in your collection yet. Create one or explore existing ones.
      </CAlert>
      <UploadArtwork w="100%" :cta="'Upload your first artwork'" />
    </CBox>
    <c-simple-grid p="5" :columns="4" :spacing="5">
      <DisplayThumbnail
        v-for="artwork, index in artworks"
        :key="index"
        :artwork="artwork"
      />
      <!-- <CPseudoBox
        v-for="artwork, index in artworks"
        :key="index"
        border-radius="1rem"
        class="transparent-card"
        :_hover="{ shadow: 'xl', border: '2px' }"
      >
        <CPseudoBox
          h="300px"
          border-top-right-radius="1rem"
          border-top-left-radius="1rem"
          bg="white"
        />
        <CFlex p="4" align-items="center" justify-content="space-between">
          <CFlex>
            <CText align-items="center" d="flex" font-weight="bold" font-size="xl" my="2">
              <span v-if="artwork.name"> {{ artwork.name }}</span>
              <span v-else>Unnamed artwork</span>
              <CTag
                ml="2"
                variant-color="catpink"
                font-size="xs"
                size="sm"
                bg="gray.500"
                mr="1"
              >
                <span v-if="artwork.artist_name">  {{ artwork.artist_name }}</span>
                <span v-else>Unnown artist</span>
              </CTag>
            </CText>
          </CFlex>

        </CFlex>
      </CPseudoBox> -->
    </c-simple-grid>
  </CBox>
</template>

<script>
import {
  CAlert,
  // CFlex,
  CAlertIcon,
  CText,
  CSimpleGrid
  // CPseudoBox
} from '@chakra-ui/vue'
import UploadArtwork from '~/components/Collection/UploadArtwork.vue'
import { getNFTsForCurrentUser } from '~/common/object'
import DisplayThumbnail from '@/components/Artwork/DisplayThumbnail'

export default {
  components: {
    CAlert,
    // CFlex,
    DisplayThumbnail,
    CAlertIcon,
    UploadArtwork,
    CText,
    CSimpleGrid
    // CPseudoBox
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      // IMPLEMENT USER ARTWORKS
      artworks: [],
      items: [1, 23, 23],
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
