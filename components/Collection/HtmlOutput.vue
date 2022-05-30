<template>
  <CBox my="5" border-color="gray.300" min-h="250px" border="1px" border-radius="sm">
    <client-only>
      <span v-append.sync="passedHtml" />
    </client-only>
  </CBox>
</template>
<script>
import { CBox }
  from '@chakra-ui/vue'
export default {
  components: {
    CBox
  },
  props: {
    passedHtml: {
      type: String,
      required: true
    }
  }

}

</script>
