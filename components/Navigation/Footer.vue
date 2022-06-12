<template>
  <CBox
    z-index="docked"
    position="absolute"
    v-bind="mainStyles[colorMode]"
    p="5"
    w="100%"
  >
    <CBox
      w="100%"
      border-radius="1rem"
      class="transparent-card"
      v-bind="mainStyles[colorMode]"
      border-bottom="1px"
      border-bottom-color="gray.200"
      px="4"
    >
      <CFlex />

      <CFlex
        p="5"
        align-items="center"
        justify-content="space-between"
        direction="row"
        spacing=""
      >
        <CText font-size="xs" font-weight="light">
          The climate art taskforce was initiated by <CLink>IKAROS STUDIO BERLIN</CLink> and <CLink>Bhuvesh Gautam</CLink>.
        </CText>
        <CStack
          direction="row"
        >
          <CIconButton
            as="link"
            bg="transparent"
            target="blank"
            href="https://instagram.com/user/climatearttaskforce"
            size="md"
            icon="discord"
          />
          <CIconButton size="md" bg="transparent" icon="instagram" />
          <CIconButton size="md" bg="transparent" icon="telegram" />
        </CStack>
      </CFlex>
      <CDivider my="0" border-color="gray.300" />
      <CStack
        px="5"
        direction="row"
        spacing="12"
        w="100%"
      >
        <a
          v-for="image, index in footerimages"
          :key="index"
          :href="image.link"
          target="_blank"
        >
          <CImage
            size="180px"
            object-fit="contain"
            :src="require('~/static/img/logos/' + image.src)"
            @click="image.link"
          />
        </a>
      </CStack>
      <CDivider my="0" border-color="gray.300" />
      <CStack
        p="5"
        direction="row"
        spacing="5"
        font-size="xs"
      >
        <CLink>Imprint</CLink>
        <CLink>Contact</CLink>
        <CLink>T&Cs</CLink>
      </CStack>
    </CBox>
  </CBox>
</template>

<script>
import {
  CFlex,
  CText,
  CLink,
  CBox,
  CDivider,
  CIconButton,
  CImage
}
  from '@chakra-ui/vue'
export default {
  components: {
    CFlex,
    CText,
    CBox,
    CDivider,
    CLink,
    CImage,
    CIconButton

  },
  inject: ['$chakraColorMode'],
  setup () {

  },

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
      footerimages: [
        {
          src: 'zkm.svg',
          link: 'https://zkm.de/de'
        },
        {
          src: 'gi.svg',
          link: 'https://www.goethe.de/ins/in/de/sta/mum/ueb/c3.html'
        },
        {
          src: 'be_fantastic.png',
          link: ''
        },
        {
          src: 'C3.png',
          link: 'https://www.goethe.de/ins/in/en/sta/mum/ueb/c3.html'
        },
        {
          src: 'ikaros.png',
          link: 'https://ikaros.studio/'
        }
      ]
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  }
}
</script>
