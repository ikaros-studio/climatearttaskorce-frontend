<template>
  <CBox
    class="transparent-card"
    rounded="1rem"
    w="100%"
    h="100%"
  >
    <CImage
      v-if="type === 'image' || (type === 'video')"
      :src="link"
      rounded="1rem"
      border-bottom="1px"
      h="80vh"
      w="100%"
      object-fit="contain"
    />
    <CBox
      v-if="type === 'code' || type === 'publication'"
      as="iframe"
      m="0"
      display="block"
      h="100%"
      rounded="1rem"
      w="100%"
      border-bottom="1px"
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
