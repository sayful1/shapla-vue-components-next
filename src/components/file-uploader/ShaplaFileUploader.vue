<template>
  <div class="shapla-file-uploader-container">
    <div
      class="shapla-file-uploader"
      :class="{ 'shapla-file-uploader--dragged': state.isDraggedOver }"
      @dragover.prevent="enter"
      @dragenter.prevent="enter"
      @dragleave.prevent="leave"
      @dragend.prevent="leave"
      @drop.prevent="drop"
    >
      <input
        :id="inputId"
        ref="input"
        type="file"
        name="files[]"
        class="shapla-file-uploader__input"
        multiple
        @change="select"
      />

      <div class="shapla-file-uploader-message">
        <div class="shapla-file-uploader-message__icon">
          <svg
            class="icon-plus"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
            />
          </svg>
        </div>
        <div class="shapla-file-uploader-message__drag" v-html="textLineOne" />
        <div
          class="shapla-file-uploader-message__browse"
          v-html="textLineTwo"
        />
        <label
          :for="inputId"
          class="shapla-file-uploader-message__select-files shapla-button is-primary"
          >{{ textButton }}</label
        >
        <div
          class="shapla-file-uploader-message__maxsize"
          v-html="textMaxUploadLimit"
        />
      </div>

      <ShaplaFilesUploadStatus
        v-if="showFileUploadStatus"
        :files="state.files"
      />
    </div>
    <div v-if="showFilesUploadStatus" class="shapla-file-uploader-files">
      <ShaplaFileUploadStatus
        v-for="(file, index) in state.files"
        :key="index"
        :file="file"
        @cancel="onCancelUpload"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, reactive, ref } from "vue";
import ShaplaFilesUploadStatus from "./components/ShaplaFilesUploadStatus.vue";
import ShaplaFileUploadStatus from "./components/ShaplaFileUploadStatus.vue";
import {
  generateFileObject as __generateFileObject,
  upload,
  uploadChunk,
} from "./helpers/utils";
import { FileObjectInterfaces } from "./helpers/interfaces";

const props = defineProps({
  url: { type: String, default: null, required: true },
  method: { type: String, default: "POST" },
  paramName: { type: String, default: "file" },
  textLineOne: { type: String, default: "Drag &amp; drop files" },
  textLineTwo: { type: String, default: "or" },
  textButton: { type: String, default: "Select files to upload" },
  textMaxUploadLimit: {
    type: String,
    default: "Maximum upload file size: 2MB",
  },
  params: { type: Object, required: false, default: () => ({}) },
  headers: { type: Object, required: false, default: () => ({}) },
  showFileUploadStatus: { type: Boolean, default: true },
  showFilesUploadStatus: { type: Boolean, default: true },
  chunking: { type: Boolean, default: false },
  forceChunking: { type: Boolean, default: false },
  chunkSize: { type: Number, default: 2000000 },
});
const emit = defineEmits(["success", "fail"]);
const input = ref<null | HTMLInputElement>(null);
const inputId = "shapla-file-uploader__input" + Date.now();
const state = reactive<{
  files: FileObjectInterfaces[];
  isDraggedOver: boolean;
}>({
  files: [],
  isDraggedOver: false,
});
const enter = () => (state.isDraggedOver = true);
const leave = () => (state.isDraggedOver = false);

const generateFileObject = (file: File) => {
  const fileObject = __generateFileObject(
    file,
    props.chunking ? props.chunkSize : null
  );
  const totalFiles = state.files.push(fileObject);

  return state.files[totalFiles - 1];
};

const addFiles = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i] as File;

    const args = {
      url: props.url,
      method: props.method,
      paramName: props.paramName,
      params: props.params,
      headers: props.headers,
    };

    if (props.chunking) {
      uploadChunk(generateFileObject(file), 0, args)
        .then((response) => {
          emit("success", response.fileObject, response.data);
        })
        .catch((response) => {
          emit("fail", response.fileObject, response.error);
        });
    } else {
      upload(generateFileObject(file), args)
        .then((response) => {
          emit("success", response.fileObject, response.data);
        })
        .catch((response) => {
          emit("fail", response.fileObject, response.error);
        });
    }
  }
};

const drop = (event: DragEvent) => {
  leave();
  const list = event.dataTransfer?.files;
  if (list instanceof FileList) {
    addFiles(list);
  }
};

const select = () => {
  const list = input.value?.files;
  if (list instanceof FileList) {
    addFiles(list);
  }
};

const onCancelUpload = (file: FileObjectInterfaces) => {
  file.xhr?.abort();
  file.cancelled = true;
};
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.file-uploader;
</style>
