<template>
  <CBox id="artworkgrid" class="transparent-card" border-radius="1rem" height="100vh">
    <CLink
      v-for="artwork, index in artworks"
      :key="index"
      border="1px"
      m="3"
      as="router-link"
      :to="'/artworks/' + artwork.hash"
    >
      {{ artwork.name }}
    </CLink>
  </CBox>
</template>

<script>
import {
  CBox

} from '@chakra-ui/vue'

import { getAllNFTs } from '~/common/object'

export default {
  components: {
    CBox
  },
  data () {
    return {
      artworks: []
    }
  },
  async fetch () {
    const artworks = await getAllNFTs()
    this.artworks = artworks
  },
  methods: {

  }

}

</script>

<style>

#artworkgrid {
    overflow: auto !important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.img-thumbnail {
    max-width: 300px;
}

</style>
