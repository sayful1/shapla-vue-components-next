<template>
  <div class="shapla-media-modal">
    <modal
        :active="active"
        :title="title"
        content-size="large"
        type="card"
        @close="closeModal"
    >
      <div class="shapla-media-modal__inside">
        <tabs alignment="center">
          <tab name="Upload Images" :selected="true">
            <file-uploader
                :url="url"
                @init="initEvent"
                @success="finishedEvent"
                @before:send="beforeSendEvent"
            />
          </tab>
          <tab name="Media Library">
            <div v-if="images.length" class="shapla-media-modal__items">
              <div
                  v-for="_image in images"
                  :key="_image.image_id"
                  :class="itemClasses(_image)"
                  @click="selectImage(_image)"
              >
                <div class="shapla-media-modal__image">
                  <image-container
                      container-width="100px"
                      container-height="100px"
                  >
                    <img :src="_image.attachment_url" :alt="_image.title"/>
                  </image-container>
                </div>
              </div>
            </div>
            <div v-else class="no-item-found" v-html="notFoundText"/>
          </tab>
        </tabs>
      </div>
      <template #foot>
        <shapla-button
            theme="primary"
            :disabled="!selectedImages.length"
            @click="chooseImage"
        >
          {{ modalButtonText }}
        </shapla-button>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive, toRefs} from "vue";
import {
  ShaplaModal as modal,
  ShaplaTabs as tabs,
  ShaplaTab as tab,
  ShaplaImage as imageContainer,
  ShaplaButton,
} from "../../../index";
import {default as FileUploader} from "./ShaplaFileUploader.vue";

interface ImageDataInterface {
  image_id: number;
  title: string;
  attachment_url: string;
}

export default defineComponent({
  name: "MediaModal",
  components: {modal, tabs, tab, FileUploader, imageContainer, ShaplaButton},
  props: {
    active: {type: Boolean, default: false},
    title: {type: String, default: "Media Images"},
    modalButtonText: {type: String, default: "Set Image"},
    notFoundText: {type: String, default: "No images found."},
    images: {
      type: Array as PropType<ImageDataInterface[]>,
      default: () => [],
    },
    multiple: {type: Boolean, default: false},
    // File Uploader
    url: {type: String, default: null, required: true},
  },
  emits: [
    "close",
    "select:image",
    "init",
    "progress",
    "success",
    "failed",
    "error",
    "before:send",
  ],
  setup(props, {emit}) {
    const state = reactive<{ selectedImages: ImageDataInterface[] }>({
      selectedImages: [],
    });

    const closeModal = () => {
      state.selectedImages = [];
      emit("close");
    };

    const itemClasses = (image: ImageDataInterface) => {
      let classes = ["shapla-media-modal__item"];

      if (state.selectedImages.length) {
        state.selectedImages.forEach((_image) => {
          if (_image.image_id === image.image_id) {
            classes.push("is-selected");
          }
        });
      }

      return classes;
    };
    const selectImage = (image: ImageDataInterface) => {
      if (props.multiple) {
        state.selectedImages.push(image);
      } else {
        state.selectedImages = [image];
      }
    };
    const chooseImage = () => {
      emit(
          "select:image",
          props.multiple ? state.selectedImages : state.selectedImages[0]
      );
      closeModal();
    };

    const initEvent = (formData: FormData) => emit("init", formData);
    const progressEvent = (fileObject, event) =>
        emit("progress", fileObject, event);
    const finishedEvent = (fileObject, response) =>
        emit("success", fileObject, response);
    const failedEvent = (fileObject, response) =>
        emit("failed", fileObject, response);
    const errorEvent = (fileObject) => emit("error", fileObject);
    const beforeSendEvent = (xhr, formData) =>
        emit("before:send", xhr, formData);

    return {
      ...toRefs(state),
      closeModal,
      itemClasses,
      selectImage,
      chooseImage,
      initEvent,
      progressEvent,
      finishedEvent,
      failedEvent,
      errorEvent,
      beforeSendEvent,
    };
  },
});
</script>

<style lang="scss">
@import "shapla-css/src/colors.scss";

.shapla-media-modal {
  &__inside {
    min-height: 250px;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -8px;
  }

  &__item {
    padding: 8px;

    &.is-selected {
      .shapla-media-modal__image {
        border-color: $primary;
        padding: 3px;
        border-width: 3px;
      }
    }
  }

  &__image {
    padding: 5px;
    border: 1px solid rgba(#000, 0.12);
  }

  .no-item-found {
    text-align: center;
  }
}
</style>
