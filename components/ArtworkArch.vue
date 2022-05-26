<template>
  <CBox v-bind="mainStyles[colorMode]" font-size="5xl" font-weight="bold" h="100%">
    <div v-bind="mainStyles[colorMode]" id="canvas" />
  </CBox>
</template>

<script>
import {
  CBox
} from '@chakra-ui/vue'

// import * as topojson from 'topojson-client'
// // import * as d3 from 'd3'
// import world from '~/static/js/globe'

const d3 = {
  ...require('d3'),
  ...require('d3-geo'),
  ...require('d3-geo-projection'),
  ...require('d3-scale')
}

export default {
  components: {
    CBox
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data () {
    return {
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
  },
  mounted () {
    // TEXT ARC
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const width = window.innerWidth
    const height = window.innerHeight

    const svg = d3.select('#canvas').append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
    const newdata = [
      'FWIWHEFOIHOEIFHOWIFH',
      '02 T',
      '03 F',
      '04 S',
      '05 S',
      '06 M',
      '07 T',
      '08 W',
      '09 T',
      '10 F',
      '11 S',
      '12 S',
      '13 M',
      '14 T',
      '15 W',
      '16 T',
      '17 F',
      '18 S',
      '19 S',
      '20 M',
      '21 T',
      '22 W',
      '23 T',
      '24 F',
      '25 S',
      '26 S',
      '27 M',
      '28 T',
      '29 W',
      '30 T',
      '31 F',
      '01 S',
      '02 S',
      '03 M',
      '04 T'
    ]

    svg.attr('transform', 'translate(100,' + window.innerHeight / 2 + ')')

    svg.append('g').attr('id', 'textarc').selectAll('text')
      .data(newdata).enter()
      .append('a').attr('href', '/login').attr('as', 'router-link').append('text').attr('class', 'artworklink')
      .attr('transform', function (d, i) {
        return 'translate(' + (290 * Math.cos(i * 2 * Math.PI / 30)) + ',' + (290 * Math.sin(i * 2 * Math.PI / 30)) + ')rotate(' + (i * 360 / 30) + ')'
      })
      .text(function (d, i) { return 'Artwork' + i })

    // GLOBE

    svg.append('a').attr('href', 'https://ikaros.studio')
      .append('image')
      .attr('xlink:href', require('~/static/img/globe_logo.png'))
      .attr('width', 450)

      .attr('height', 450)
      .attr('transform', 'translate(-230,-230)')

    const arc = document.getElementById('textarc')
    let angle = 0
    document.onwheel = function (e) {
      if (e.deltaY) { // we have a wheel for vertical (common) direction
        e.preventDefault()
        angle += e.deltaY < 0 ? 2 : -2 // what direction?
        arc.setAttribute('transform', 'rotate(' + angle + ')')
        // arc.style.transform = 'rotate(' + angle + 'deg)' // do something
      }
    }
    // const projection = d3.geo.orthographic()
    //   .scale(200)
    //   .translate([width / 2, height / 2])
    //   .clipAngle(90)

    // const path = d3.geo.path()
    //   .projection(projection)

    // const λ = d3.scale.linear()
    //   .domain([0, width])
    //   .range([-180, 180])

    // // const φ = d3.scale.linear()
    // //   .domain([0, height])
    // //   .range([90, -90])

    // svg.append('path')
    //   .datum(topojson.feature(world, world.objects.land))
    //   .attr('class', 'land')
    //   .attr('d', path)

    // const scrollSpeed = 50; let current = 0
    // function bgscroll () {
    //   current += 1
    //   projection.rotate([λ(current), 0])
    //   svg.selectAll('path').attr('d', path)
    // }

    // setInterval(bgscroll, scrollSpeed)
  }

}

</script>

<style>
.artworklink {
  color: red !important;
}

#textarc1 {
    animation: rotation 100s infinite linear;
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
