<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    min-h="100vh"
  >
    <CGrid p="5" template-columns="repeat(3, 4fr)" gap="4">
      <CGridItem
        border-radius="sm"
        p="5"
        h="500"
        w="100%"
        d="flex"
        align-items="center"
        justify-content="center"
        border="1px"
        border-color="gray.300"
      >
        <CIcon
          mr="2"
          name="arrow-up-from-bracket"
        />Upload an artwork
      </CGridItem>
      <CGridItem w="100%" bg="blue.500" />
      <CGridItem w="100%" bg="blue.500" />
    </CGrid>
  </CBox>
</template>

<script>
import {
  CGrid,
  CGridItem
} from '@chakra-ui/vue'

export default {
  components: {
    CGrid,
    CGridItem
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
