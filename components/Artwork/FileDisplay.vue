<template>
  <CBox w="100%" h="100%">
    <img v-if="type === 'image' || (type === 'video')" class="rounded" :src="link">
    <iframe v-if="type === 'code' || type === 'publication'" border-radius="1rem" :src="link" />
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
