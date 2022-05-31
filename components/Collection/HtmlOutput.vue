<template>
  <CBox
    my="5"
    d="flex"
    border-color="gray.300"
    min-h="250px"
    border="1px"
    border-radius="sm"
    flex-direction="column"
  >
    <client-only>
      <iframe :srcdoc="passedHtml" />
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
<style>
iframe{
  height: 100%;
  width: 100%;
  flex-grow: 1;
  border: none;
  margin: 0; padding: 0;
}
</style>
