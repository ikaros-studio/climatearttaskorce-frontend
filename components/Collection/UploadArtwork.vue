<template>
  <CBox>
    <CButton
      z-index="base"
      loading-text="Uploading"
      :is-loading="loading"
      size="sm"
      w="100%"
      variant-color="catblue"
      border-radius="1rem"
      @click="open"
    >
      <CText>
        <CIcon
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
        border-radius="1rem"
      >
        <c-modal-header>{{ cta }}</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <CTabs variant="soft-rounded" @change="onTabChange">
            <CTabList>
              <CTab mr="2">
                <CIcon mr="1" name="photo-film" /> Media file
              </CTab>
              <CTab><CIcon mr="1" name="code" />Code</CTab>
            </CTabList>
            <CDivider my="5" />
            <CAlert v-if="missingfields" color-variant="catpink" font-size="sm" border-radius="1rem" status="info">
              <CAlertIcon />
              Please provide all information.
              <CCloseButton position="absolute" right="8px" top="8px" @click="showInfo = false" />
            </CAlert>
            <CTabPanels>
              <CTabPanel>
                <CStack spacing="4">
                  <CFormControl v-for="el, index in mediauploadform" :key="index">
                    <CFormLabel>{{ el.label }}</CFormLabel>
                    <CInput
                      v-if="el.type != 'select'"
                      :id="el.id"
                      required
                      :type="el.type"
                      :placeholder="el.placeholder"
                      @change="onChange"
                    />
                    <CSelect v-else :id="el.id" v-model="work_type" required placeholder="Select category">
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
                <CAlert v-if="showInfo" font-size="sm" border-radius="1rem" status="info">
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
                <CStack mt="5" spacing="4">
                  <CFormControl v-for="el, index in codeuploadform" :key="index">
                    <CFormLabel>{{ el.label }}</CFormLabel>
                    <CInput
                      v-if="el.type != 'select'"
                      :id="el.id"
                      required
                      :type="el.type"
                      :placeholder="el.placeholder"
                      @change="onChange"
                    />
                    <CSelect v-else :id="el.id" v-model="work_type" required placeholder="Select category">
                      <option v-for="opt in el.options" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </CSelect>
                    <CFormHelperText>{{ el.description }}</CFormHelperText>
                    <CFormErrorMessage />
                  </CFormControl>
                </CStack>
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

import HtmlOutput from './HtmlOutput.vue'
import { NFT, addNFTToCurrentUser } from '~/common/object'
import { getFileType, uploadToIPFS } from '~/common/helpers'

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
      activeTab: 'media',
      codeuploadform: [
        // TODO: CUSTOM STYLE FOR FILE
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
          label: 'Artist(s)',
          type: 'text',
          description: 'Please indicate the name of the Artist(s) through a comma'
        },
        {
          id: 'description',
          name: 'Name',
          label: 'Description',
          type: 'text',
          description: 'Please provide a short description or abstracht regarding your artwork'
        }
      ],
      mediauploadform: [
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
          label: 'Artist(s)',
          type: 'text',
          description: 'Please indicate the name of the Artist(s) through a comma'
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
    onTabChange (tab) {
      switch (tab) {
        case 0 : this.activeTab = 'media'
          break
        case 1 : this.activeTab = 'code'
          break
      }
    },
    async onSubmit () {
      try {
        this.isOpen = false
        this.loading = true
        const artFileURL = this.activeTab === 'media'
          ? await uploadToIPFS(this.art_file)
          : await uploadToIPFS(this.rawHtml, 'html')
        const metaData = {
          name: this.art_name,
          description: this.description,
          artist_name: this.artist_name,
          artwork: artFileURL,
          work_type: this.work_type,
          file_type: this.activeTab === 'media' ? getFileType(this.art_file) : 'code'
        }
        const metadataHash = await uploadToIPFS(metaData, 'json')
        const nft = NFT.create(metadataHash)
        await nft.save()
        addNFTToCurrentUser(nft)
        this.$emit('onupload')
        this.loading = false
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
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
