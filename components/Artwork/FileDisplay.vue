<template>
  <CBox
    min-h="80vh"
  >
    <img v-if="type === 'image' || (type === 'video')" width="100%" height="100%" class="rounded" :src="link">
    <iframe v-if="type === 'code' || type === 'text'" border-radius="sm" :src="link" />
  </CBox>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>
