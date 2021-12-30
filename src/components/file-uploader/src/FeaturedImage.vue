<template>
  <div class="shapla-featured-image">
    <div v-if="has_image" class="shapla-featured-image__thumbnail">
      <image-container container-width="150px" container-height="150px">
        <img :src="imageUrl" :alt="imageAltText">
      </image-container>
      <delete-icon :title="removeButtonText" @click="clearImages" />
    </div>
    <div v-if="!has_image" class="shapla-featured-image__placeholder">
      {{ placeholderText }}
      <shapla-button size="small" @click.prevent="addImages">
        {{ buttonText }}
      </shapla-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ShaplaCross as deleteIcon, ShaplaButton, ShaplaImage as imageContainer} from "../../../index";

export default defineComponent({
  name: "FeaturedImage",
  components: {deleteIcon, ShaplaButton, imageContainer},
  props: {
    placeholderText: {type: String, default: "No Image Selected"},
    buttonText: {type: String, default: "Add Image"},
    removeButtonText: {type: String, default: "Remove"},
    imageUrl: {type: String, default: ""},
    imageAltText: {type: String, default: ""},
  },
  emits: ["click:add", "click:clear"],
  computed: {
    has_image() {
      return !!(this.imageUrl && this.imageUrl.length);
    },
  },
  methods: {
    addImages() {
      this.$emit("click:add");
    },
    clearImages() {
      this.$emit("click:clear");
    },
  },
})
</script>

<style lang="scss">
@import "~shapla-color-system/src/variables";

.shapla-featured-image {
  &__placeholder {
    align-items: center;
    border: 1px dashed #b4b9be;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
  }

  &__thumbnail {
    display: inline-flex;
    max-width: 150px;
    position: relative;
    border: 1px solid rgba(#000, 0.12);

    .shapla-delete-icon {
      position: absolute;
      right: 5px;
      top: 5px;
      background-color: $error;
    }
  }
}
</style>
