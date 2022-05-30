<template>
  <c-alert status="status">
    <c-alert-icon />
    <c-alert-description>{{ description }}</c-alert-description>
    <c-close-button position="absolute" right="8px" top="8px" />
  </c-alert>
</template>
<script>
import { CAlert } from '@chakra-ui/vue'
export default {
  components: {
    CAlert
  }
}
</script>
