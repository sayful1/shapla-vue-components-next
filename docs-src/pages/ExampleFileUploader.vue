<template>
  <doc-tab
    heading="File Uploader"
    slug="shapla-file-uploader"
    name="ShaplaFileUploader"
    scss-mixin="file-uploader"
    :properties="properties"
    :desc="descriptions"
  >
    <file-uploader url="https://wordpress.test" />
  </doc-tab>
</template>

<script>
import {ShaplaFileUploader} from "../../src";
import {computed} from "vue";
import DocTab from "../components/DocTab.vue";

export default {
  name: "ExampleFileUploader",
  components: {DocTab, "file-uploader": ShaplaFileUploader },
  setup() {
    const properties = computed(() => ShaplaFileUploader.props);
    const descriptions = {}
    return {properties, descriptions}
  },
};
</script>
