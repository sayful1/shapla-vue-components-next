<template>
  <div class="shapla-media-modal">
    <ShaplaModal
      :active="active"
      :title="title"
      content-size="large"
      type="card"
      @close="closeModal"
    >
      <div class="shapla-media-modal__inside">
        <ShaplaTabs alignment="center">
          <ShaplaTab name="Upload Images" :selected="true">
            <ShaplaFileUploader
              :url="url"
              @success="finishedEvent"
              @fail="failedEvent"
            />
          </ShaplaTab>
          <ShaplaTab name="Media Library">
            <div v-if="images.length" class="shapla-media-modal__items">
              <div
                v-for="_image in images"
                :key="_image[primaryKey]"
                :class="itemClasses(_image)"
                @click="selectImage(_image)"
              >
                <div class="shapla-media-modal__image">
                  <ShaplaImage container-width="100px" container-height="100px">
                    <img :src="_image[srcKey]" :alt="_image[altKey]" />
                  </ShaplaImage>
                </div>
              </div>
            </div>
            <div v-else class="no-item-found" v-html="notFoundText" />
          </ShaplaTab>
        </ShaplaTabs>
      </div>
      <template #foot>
        <ShaplaButton
          theme="primary"
          :disabled="!state.selectedImages.length"
          @click="chooseImage"
        >
          {{ modalButtonText }}
        </ShaplaButton>
      </template>
    </ShaplaModal>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType, reactive } from "vue";
import { ShaplaButton, ShaplaImage, ShaplaModal, ShaplaTab, ShaplaTabs } from "../../../index";
import ShaplaFileUploader from "../ShaplaFileUploader.vue";
import { FileObjectInterfaces, ImageDataInterface } from "../helpers/interfaces";

const props = defineProps({
  active: { type: Boolean, default: false },
  title: { type: String, default: "Media Images" },
  modalButtonText: { type: String, default: "Set Image" },
  notFoundText: { type: String, default: "No images found." },
  images: {
    type: Array as PropType<ImageDataInterface[]>,
    default: () => []
  },
  multiple: { type: Boolean, default: false },
  primaryKey: { type: String, default: "id" },
  srcKey: { type: String, default: "src" },
  altKey: { type: String, default: "alt" },
  // File Uploader
  url: { type: String, default: null, required: true }
});
const emit = defineEmits(["close", "select:image", "success", "fail"]);
const state = reactive<{ selectedImages: ImageDataInterface[] }>({
  selectedImages: []
});

const closeModal = () => {
  state.selectedImages = [];
  emit("close");
};

const itemClasses = (image: ImageDataInterface) => {
  const classes = ["shapla-media-modal__item"];

  if (state.selectedImages.length) {
    state.selectedImages.forEach((_image: ImageDataInterface) => {
      if (_image[props.primaryKey] === image[props.primaryKey]) {
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

const finishedEvent = (
  fileObject: FileObjectInterfaces,
  response: undefined
) => {
  return emit("success", fileObject, response);
};
const failedEvent = (fileObject: FileObjectInterfaces, response: undefined) => {
  emit("fail", fileObject, response);
};
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
