<template>
  <CBox v-bind="mainStyles[colorMode]" font-size="4xl" font-weight="bold" h="100%">
    <div id="canvas" />
  </CBox>
</template>

<script>
import {
  CBox
} from '@chakra-ui/vue'

// import * as topojson from 'topojson-client'
import * as d3 from 'd3'
// import world from '~/static/js/globe'

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
  mounted () {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const width = window.innerWidth
    const height = window.innerHeight

    const svg = d3.select('#canvas').append('svg')
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
      '04 T',
      '05 W',
      '06 T',
      '07 F',
      '08 S',
      '09 S',
      '10 M',
      '11 T',
      '12 W',
      '13 T',
      '14 F'

    ]

    svg.attr('transform', 'translate(100,' + window.innerHeight / 2 + ')')

    svg.selectAll('text').data(newdata).enter()
      .append('text')
      .attr('transform', function (d, i) {
        return 'translate(' + (300 * Math.cos(i * 2 * Math.PI / 50)) + ',' + (300 * Math.sin(i * 2 * Math.PI / 50)) + ')rotate(' + (i * 360 / 50) + ')'
      })
      .text(function (d, i) { return 'Artwork' + i })

    // GLOBE

    // const projection = d3.geo.orthographic()
    //   .scale(200)
    //   .translate([width / 2, height / 2])
    //   .clipAngle(90)

    // const path = d3.geo.path()
    //   .projection(projection)

    // const λ = d3.scale.linear()
    //   .domain([0, width])
    //   .range([-180, 180])

    // const φ = d3.scale.linear()
    //   .domain([0, height])
    //   .range([90, -90])

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
#cafenvas {
    animation: rotation 2s infinite linear;
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
