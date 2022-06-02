<template>
  <CBox
    border-top="1px"
    border-color="gray.300"
    w="100%"
    v-bind="mainStyles[colorMode]"
    p="5"
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
      p="5"
      direction="row"
      spacing="12"
      w="100%"
    >
      <CImage max-w="150px" h="auto" :src="require('~/static/img/logos/zkm.svg')" />
      <CImage max-w="150px" h="auto" :src="require('~/static/img/logos/gi.svg')" />
      <CImage max-w="150px" h="auto" object-fit="contain" :src="require('~/static/img/logos/ikaros.png')" />
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
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  }
}
</script>
