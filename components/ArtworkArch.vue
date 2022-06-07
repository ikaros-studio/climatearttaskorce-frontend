<template>
  <CBox>
    <div v-bind="mainStyles[colorMode]" id="canvas" />
    <div
      id="globeViz"
    />
  </CBox>
</template>

<script>
import {
  CBox
} from '@chakra-ui/vue'

import Globe from 'globe.gl'
import * as THREE from 'three'
import * as topojson from 'topojson-client'
import * as d3 from 'd3'
import artworks from '~/static/js/artworks'

export default {
  components: {
    CBox
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      },
      globe: Globe(),
      globeVisId: 'globeViz',
      globeElem: null
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  mounted () {
    const width = window.innerWidth * 0.7
    const height = window.innerHeight

    // TEXT ARC
    // Fill up artworks if length < 40
    let arcdata = []
    if (arcdata.length < 40) {
      const repeat = 40 / artworks.length
      // console.log(repeat)
      for (let i = 0; i < repeat; i++) {
        artworks.forEach((el) => { arcdata.push(el) })
      }
    } else {
      arcdata = artworks
    }

    const svg = d3.select('#canvas').append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'artwworkarchsvg')
      .append('g')

    svg.attr('transform', 'translate(100,' + height / 2 + ')')

    const diameter = height / 3
    svg.append('g').attr('id', 'textarc').selectAll('text')
      .data(arcdata).enter()
      // .attr('href', '/login').attr('as', 'router-link')
      .append('a').attr('href', '/artwork').append('text').attr('class', 'artworklink')
      // .style('fill', 'transparent')

      .attr('transform', function (d, i) {
        // 45 REPRESENT array.lenght
        return 'translate(' + (diameter * Math.cos(i * 2 * Math.PI / arcdata.length)) + ',' + (diameter * Math.sin(i * 2 * Math.PI / arcdata.length)) + ')rotate(' + (i * 360 / arcdata.length) + ')'
      })
      .text(function (d, i) { return d.title })
    // GLOBE
    this.globeElem = document.getElementById(this.globeVisId)
    this.renderGlobe(width, height)
  },
  methods: {
    repeat (func, times) {
      func()
      times && --times && this.repeat(func, times)
    },
    randomColor () {
      const colors = ['#005F99 ', '#00EAD3', '#FF449F']
      return colors[Math.floor(Math.random() * colors.length)]
    },
    renderGlobe (width, height) {
      this.globe(this.globeElem)
        .backgroundColor('rgba(0,0,0,0)')
        .showGlobe(false)
        .showAtmosphere(false)
        .width(width)
        .height(height)

      fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
        .then((landTopo) => {
          this.globe
            .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
            .polygonCapMaterial(new THREE.MeshMatcapMaterial({ color: '#005F99' }))
            // .polygonAltitude(0.001)
            .polygonSideColor(() => '#ffffff00')
        })
      // custom globe material
      this.globe.controls().autoRotate = true
      this.globe.controls().enablePointerInteraction = false
      this.globe.controls().enabled = false
      this.globe.controls().autoRotateSpeed = -0.6

      document.getElementById(this.globeVisId).style.transform = 'translate(-' + ((width / 2) - 100) + 'px , 4rem)'
    }
  }

}

</script>

<style>
/* .artworklink {
  color: #ff9380 !important;
  text-transform: uppercase !important;
} */

.artworklink {
  fill: #ffffff;
  opacity: 0.3;
}

.artworklink:hover {
  fill: #ffffff;
  opacity: 1;

}

#artwworkarchsvg {
  position: relative !important;
  z-index: 2 !important;
}

#textarc   {
  position: relative !important;
  z-index: 2 !important;
  animation: rotation 200s infinite linear;
}

#globeViz{
  position: absolute !important;
  z-index: 0;
  top: 0;
  width: 70vw !important;
  /* margin-top: 100px; */
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

</style>
