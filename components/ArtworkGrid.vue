<template>
  <CBox id="artworkgrid" class="marquee">
    <CBox class="track">
      <CLink
        v-for="artwork, index in artworks.slice(0).slice(0)"
        :key="index"
        class=""
        font-weight="light"
        font-size="xs"
        mr="1"
        as="router-link"
        :to="'/artworks/' + artwork.hash"
      >
        {{ artwork.name }}
      </CLink>
    </CBox>
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
    position: absolute !important;
    width: 100vw !important;
    overflow: auto !important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.img-thumbnail {
    max-width: 300px;
}

.marquee {
  width: 100vw;
  overflow-x: hidden;
  margin-right: -100vw
}

.track {
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 200s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

</style>
