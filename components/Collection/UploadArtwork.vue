<template>
  <CBox w="100%">
    <Spinner :loading="loading" />
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
      size="3xl"
    >
      <c-modal-content
        ref="content"
        border-radius="sm"
      >
        <c-modal-header>{{ cta }}</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <CTabs variant="soft-rounded">
            <CTabList>
              <CTab mr="2">
                <CIcon mr="1" name="photo-film" /> Media file
              </CTab>
              <CTab><CIcon mr="1" name="code" />Code</CTab>
            </CTabList>
            <CDivider my="5" />
            <CTabPanels>
              <CTabPanel>
                <CStack spacing="4">
                  <CFormControl v-for="el, index in uploadform" :key="index">
                    <CFormLabel>{{ el.label }}</CFormLabel>
                    <CInput v-if="el.type != 'select'" :id="el.id" :type="el.type" :placeholder="el.placeholder" @change="onChange" />
                    <CSelect v-else :id="el.id" v-model="work_type" placeholder="Select category">
                      <option v-for="opt in el.options" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </CSelect>
                    <CFormHelperText>{{ el.description }}</CFormHelperText>
                    <CFormErrorMessage />
                  </CFormControl>
                </CStack>
              </CTabPanel>
              <CTabPanel>
                <CAlert v-if="showInfo" font-size="sm" border-radius="sm" status="info">
                  <CAlertIcon />
                  When uploading code-based artworks make sure to include every code in one HTML file. For extensive files, we recommend editiing in your favourite code editor and inserting the code in here once ready.
                  <CCloseButton position="absolute" right="8px" top="8px" @click="showInfo = false" />
                </CAlert>                <!-- <span v-html-js="{html: rawHtml, script:'jquery'}" /> -->
                <HtmlOutput
                  :key="compcount"
                  :passed-html="passedHtml"
                />
                <CButton mb="3" w="100%" @click="compcount++, passedHtml = rawHtml">
                  <CIcon mr="1" name="arrows-rotate" />Compile
                </CButton>
                <client-only>
                  <CodeEditor
                    v-model="rawHtml"
                    :display_language="false"
                    height="300px"
                    width="100%"
                    class="github_dark"
                    :value="rawHtml"
                  />
                </client-only>
              </CTabPanel>
            </CTabPanels>
          </CTabs>
        </c-modal-body>
        <c-modal-footer>
          <c-button variant-color="blue" mr="3" @click="onSubmit">
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
  CCloseButton,
  CAlert,
  CAlertIcon,
  CTabs,
  CTab,
  CTabPanels,
  CTabPanel,
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
  CStack,
  CDivider,
  CIcon
} from '@chakra-ui/vue'

import { uploadToIPFS, mintToken } from '../../common/helpers'
import Spinner from '../Loggers/Spinner.vue'
import HtmlOutput from './HtmlOutput.vue'

export default {
  components: {
    CCloseButton,
    CAlert,
    CAlertIcon,
    CButton,
    CInput,
    CModal,
    CTabs,
    CTab,
    CTabPanels,
    CTabPanel,
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
    CStack,
    Spinner,
    CDivider,
    HtmlOutput,
    CIcon
  },
  props: {
    cta: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      showInfo: true,
      compcount: 0,
      rawHtml: '<p style="margin: 10px">Code something!</p>',
      passedHtml: '<p style="margin: 10px">Code something!</p>',
      isOpen: false,
      art_file: null,
      work_type: null,
      art_name: null,
      artist_name: null,
      description: null,
      loading: false,
      uploadform: [
        // TODO: CUSTOM STYLE FOR FILE
        {
          id: 'art_file',
          name: 'Upload your artwork',
          label: 'Upload your artwork',
          type: 'file',
          description: 'Please upload a file containing your work.'
        },
        {
          id: 'work_type',
          name: 'Type',
          label: 'Type of work',
          type: 'select',
          options: ['publication', '3D visualization'],
          description: 'Please indicate the category youre work can be seen as'
        },
        {
          id: 'art_name',
          name: 'Name',
          label: 'Artwork name',
          type: 'text',
          description: 'Please indicate the artworks name'
        },
        {
          id: 'artist_name',
          name: 'Name',
          label: 'Artist',
          type: 'text',
          description: 'Please indicate the name of the Artist(s)'
        },
        {
          id: 'description',
          name: 'Name',
          label: 'Description',
          type: 'text',
          description: 'Please provide a short description or abstracht regarding your artwork'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    onChange (event) {
      const id = event.target.id
      if (event.target.type === 'file') {
        this[id] = event.target.files[0]
      } else {
        this[id] = event.target.value
      }
    },
    async onSubmit () {
      try {
        this.isOpen = false
        this.loading = true
        const artFileURL = await uploadToIPFS(this.art_file)
        const metaData = {
          name: this.art_name,
          description: this.description,
          artist_name: this.artist_name,
          artwork: artFileURL,
          work_type: this.work_type
        }
        const metadataURL = await uploadToIPFS(metaData, true)
        console.log(await mintToken(metadataURL))
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
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
