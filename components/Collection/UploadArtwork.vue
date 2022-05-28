<template>
  <CBox w="100%">
    <CButton
      border="1px"
      border-color="gray.300"
      h="300px"
      w="100%"
      @click="open"
    >
      <CText>
        <CIcon
          z-index="base"
          mr="2"
          name="arrow-up-from-bracket"
        />{{ cta }}
      </CText>
    </CButton>
    <c-modal
      :is-open="isOpen"
      :on-close="close"
      size="xl"
    >
      <c-modal-content
        ref="content"
        border-radius="sm"
      >
        <c-modal-header>{{ cta }}</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <CStack spacing="4">
            <CFormControl v-for="el, index in uploadform" :key="index">
              <CFormLabel>{{ el.label }}</CFormLabel>
              <CInput v-if="el.type != 'select'" :type="el.type" :placeholder="el.placeholder" />
              <CSelect v-else id="country" placeholder="Select category">
                <option v-for="opt in el.options" :key="opt" value="option1">
                  {{ opt }}
                </option>
              </CSelect>
              <CFormHelperText>{{ el.description }}</CFormHelperText>
              <CFormErrorMessage />
            </CFormControl>
          </CStack>
        </c-modal-body>
        <c-modal-footer>
          <c-button variant-color="blue" mr="3">
            Upload
          </c-button>
          <c-button @click="close">
            Cancel
          </c-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </CBox>
</template>

<script>

import {
  CButton,
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CInput,
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
  CModalCloseButton,
  CStack
} from '@chakra-ui/vue'

export default {
  components: {
    CButton,
    CInput,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
    CModalBody,
    CModalCloseButton,
    CStack
  },
  props: {
    cta: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      isOpen: false,
      uploadform: [
        // TODO: CUSTOM STYLE FOR FILE
        {
          name: 'Upload your artwork',
          label: 'Upload your artwork',
          type: 'file',
          description: 'Please upload a file containing your work.'
        },
        {
          name: 'Type',
          label: 'Type of work',
          type: 'select',
          options: ['publication', '3D visualization'],
          description: 'Please indicate the category youre work can be seen as'
        },
        {
          name: 'Name',
          label: 'Artwork name',
          type: 'text',
          description: 'Please indicate the artworks name'
        },
        {
          name: 'Name',
          label: 'Artist',
          type: 'text',
          description: 'Please indicate the name of the Artist(s)'
        },
        {
          name: 'Name',
          label: 'Description',
          type: 'text',
          description: 'Please provide a short description or abstracht regarding your artwork'
        }
      ]
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style>
input[type="file"] button {
  color: transparent !important;
    /* display: none; */
}
</style>
