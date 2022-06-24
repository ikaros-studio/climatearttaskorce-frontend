<template>
  <CBox d="flex" w="100%" align-items="center">
    <CFlex p="{50}" w="full" align-items="center" justify-content="center">
      <CBox
        class="transparent-card"
        bg=""
        w="100%"
        border-width="1px"
        border-radius="1rem"
        shadow="lg"
        position="relative"
      >
        <CImage
          v-if="artwork.file_type === 'image' || (artwork.file_type === 'video')"
          bg="gray.100"
          :src="artwork.link"
          rounded-top="1rem"
          border-bottom="1px"
          h="300px"
          w="100%"
          object-fit="cover"
        />
        <CBox
          v-if="artwork.file_type === 'code' || artwork.file_type === 'publication'"
          as="iframe"
          m="0"
          display="block"
          h="300px"
          rounded-top="1rem"
          w="100%"
          border-bottom="1px"
          scrolling="no"
          :src="artwork.link"
        />

        <CBox p="6">
          <CBox d="flex" align-items="baseline">
            <CTag font-weigt="light" font-size="xs" px="5px" py="2px" rounded="lg">
              <span v-if="artwork.artist_name">{{ artwork.artist_name }}</span>
              <span v-else>Unknown artist</span>
            </CTag>
          </CBox>
          <CFlex mt="1" justify-content="space-between" align-items="center">
            <CBox
              font-size="2xl"
              font-weight="semibold"
              as="h4"
              line-height="tight"
              is-truncated
            >
              {{ artwork.name }}
            </CBox>
            <CButton
              as="router-link"
              :to="'/artworks/' + artwork.hash"
              variant-color="catblue"
              rounded="full"
              size="sm"
              border="1px"
              color="white"
              border-color="white"
              bg="transparent"
            >
              View
            </CButton>
          </Cflex>
        </Cbox>
      </Cbox>
    </CFlex>
  </CBox>

  <!-- <img
    v-if="type === 'image' || (type === 'video')"
    height="10"
    width="100%"
    :src="link"
  >
  <iframe
    v-if="type === 'code' || type === 'publication'"
    frameborder="0"
    allowfullscreen
    scrolling="no"
    :src="link"
  /> -->
</template>

<script>

export default {
  props: {
    artwork: {
      type: Object,
      required: true
    }

  }
}
</script>

<style>

body {
  margin:0px !important
  }

iframe{margin:0 !important}

</style>
