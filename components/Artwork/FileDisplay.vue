<template>
  <CBox
    w="100%"
    h="100%"
  >
    <CImage
      v-if="type === 'image' || (type === 'video')"
      :src="link"
      rounded="1rem"
      h="80vh"
      w="100%"
      object-fit="contain"
    />
    <CBox
      v-if="type === 'code' || type === 'publication'"
      as="iframe"
      m="0"
      display="block"
      h="80vh"
      rounded="1rem"
      w="100%"
      scrolling="no"
      :src="link"
    />
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
