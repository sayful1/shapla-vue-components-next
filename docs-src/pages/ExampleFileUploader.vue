<template>
  <doc-tab
    heading="File Uploader"
    slug="shapla-file-uploader"
    name="ShaplaFileUploader"
    scss-mixin="file-uploader"
    :properties="properties"
    :desc="descriptions"
  >
    <ShaplaFileUploader url="https://wordpress.test" />
    <div style="margin-top: 100px">
      <ShaplaFeaturedImage @click:add="state.showUploadModal = true" />
    </div>
    <ShaplaMediaModal
      :active="state.showUploadModal"
      url="https://wordpress.test"
      @close="state.showUploadModal = false"
    />
  </doc-tab>
</template>

<script lang="ts" setup>
import { ShaplaFeaturedImage, ShaplaFileUploader, ShaplaMediaModal } from "../../src";
import { computed, reactive } from "vue";
import DocTab from "../components/DocTab.vue";

const properties = computed(() => ShaplaFileUploader.props);
const descriptions = {};
const state = reactive({
  showUploadModal: false
});
</script>
