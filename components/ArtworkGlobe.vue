<template>
  <CBox
    w="100%"
    h="100%"
  >
    <div
      id="textwheel"
      class="border"
      font-size="sm"
      style="border-radius:50%;border:3px solid #09f;width:150px;height:150px;"
      m="3"
      p="3"
    >
      Test
    </div>

    <!-- <div
      id="globeViz"
    /> -->
  </CBox>
</template>

<script>

import {
  CBox
} from '@chakra-ui/vue'
import Globe from 'globe.gl'
// import * as THREE from 'three'

export default {
  components: { CBox },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      globe: Globe(),
      componentKey: 0,
      // globeImageUrl: '//unpkg.com/three-globe/example/img/earth-dark.jpg',
      globeVisId: 'globeViz',
      tilesData: [],
      TILE_MARGIN: 0.2,
      tileWidth: null,
      tileHeight: null,
      N: 199,
      gData: null,
      globeElem: null,
      color: (() => {
        if (this.$chakraColorMode() === 'dark') {
          return '#2D3748'
        } else {
          return 'white'
        }
      })()
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    }
  },
  // TODO: Add dark mode
  watch: {
    colorMode () {
      // console.log('colormode changed')
      // this.globe(this.globeElem).animate()
    }
  },
  created () {

  },
  mounted () {
    const div = document.getElementById('textwheel')
    let angle = 2
    document.onwheel = function (e) {
      if (e.deltaY) { // we have a wheel for vertical (common) direction
        e.preventDefault()
        angle += e.deltaY < 0 ? 5 : -5 // what direction?
        div.style.transform = 'rotate(' + angle + 'deg)' // do something
      }
    }

    // this.globeElem = document.getElementById(this.globeVisId)
    // // Gen random data
    // this.gData = [...Array(this.N).keys()].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   alt: Math.random() * 0.8 + 0.1,
    //   radius: Math.random() * 5,
    //   color: ['#00ead3', '#ff449f', '#ffeac1', '#005f99'][Math.round(Math.random() * 3)]
    // }))

    // this.renderGlobe()
    // const bgColor = (() => {
    //   if (this.$chakraColorMode() === 'dark') {
    //     return 'black'
    //   } else {
    //     return 'white'
    //   }
    // })()

    // (function moveSpheres () {
    //   gData.forEach((d) => { d.lat += 0.2 })
    //   this.globe(globeElem).customLayerData(this.globe(globeElem).customLayerData())
    //   window.requestAnimationFrame(moveSpheres)
    // })()
  },
  methods: {
    // renderGlobe () {
    //   this.globe(this.globeElem)

    //   // .showGraticules(true)
    //   // .tilesData(this.tilesData)
    //   // .tileWidth(this.tileWidth - this.TILE_MARGIN)
    //   // .tileHeight(this.tileHeight - this.TILE_MARGIN)
    //   // .tileMaterial('material')(document.getElementById('globeViz'))
    //     .width(window.innerWidth / 6 * 4 - 20)
    //     .globeImageUrl(require('@/static/img/globe.jpg'))
    //   // .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    //     .pointOfView({ altitude: 3.5 })
    //     // .customLayerData(this.gData)
    //     // .customThreeObject(d => new THREE.Mesh(
    //     //   new THREE.SphereBufferGeometry(d.radius),
    //     //   new THREE.MeshLambertMaterial({ color: d.color })
    //     // ))
    //     // .customThreeObjectUpdate((obj, d) => {
    //     //   Object.assign(obj.position, this.globe.getCoords(d.lat, d.lng, d.alt))
    //     // })
    //     .polygonsData([34, 234234, 234, 234, 234, 34])

    //     .backgroundColor((() => {
    //       if (this.$chakraColorMode() === 'dark') {
    //         return '#2D3748'
    //       } else if (this.$chakraColorMode() === 'light') {
    //         return '#ffffff'
    //       }
    //     })())

    //   this.globe
    //     .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: 'darkslategrey', side: THREE.DoubleSide }))
    //     .polygonSideColor(() => 'rgba(0,0,0,0)')

    //   // Add auto-rotation
    //   this.globe.controls().autoRotate = true
    //   this.globe.controls().autoRotateSpeed = -0.6
    // }
  }
}
</script>
