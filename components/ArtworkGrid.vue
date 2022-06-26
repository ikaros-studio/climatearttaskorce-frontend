<template>
  <CBox id="artworkgrid" overflow="hidden" min-h="100vh" class="marquee">
    <masonry :cols="20" :gutter="0">
      <CLink
        v-for="(item, index) in griddata.slice()"
        id="griditem"
        :key="index"
        as="router-link"
        :to="'/artworks/' + item.hash"
        bg="gray.300"
      >
        <img :src="item.link">
      </CLink>
    </masonry>
  </CBox>
</template>

<script>
import {
  CBox

} from '@chakra-ui/vue'

import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import { getAllNFTs } from '~/common/object'

Vue.use(VueMasonry)

export default {
  components: {
    CBox
  },
  data () {
    return {
      griddata: []
    }
  },
  async fetch () {
    const artworks = await getAllNFTs()

    const griddata = []
    const count = 1000

    if (griddata.length < count) {
      const repeat = count / artworks.length
      // console.log(repeat)
      for (let i = 0; i < repeat; i++) {
        artworks.forEach((el) => { griddata.push(el) })
      }
    }

    this.griddata = griddata
  },
  methods: {

  }

}

</script>

<style>
#griditem {
  opacity: 0.2;
  transition: transform .2s; /* Animation */

}

#griditem:hover {
  opacity: 1;
  transform: scale(1.4); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */

}

/* #artworkgrid{
   -webkit-animation-name: move;
   -webkit-animation-duration: 100s;
   -webkit-animation-iteration-count: infinite;
   -webkit-animation-direction: up;
   -webkit-animation-timing-function:linear;
}

@-webkit-keyframes move {
   0% {
      transform:translateY(0);
   }
   100% {
      transform:translateY(-100%);
   }
} */

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
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
