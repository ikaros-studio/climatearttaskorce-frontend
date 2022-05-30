<template>
  <c-box d="flex" justify-content="center" w="100%" padding="20px">
    <c-spinner v-if="loading" />
    <Alert />
  </c-box>
</template>

<script>
import { CBox, CSpinner } from '@chakra-ui/vue'

export default {
  components: {
    CBox,
    CSpinner
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
