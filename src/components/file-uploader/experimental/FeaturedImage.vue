<template>
  <div class="shapla-featured-image">
    <div v-if="has_image" class="shapla-featured-image__thumbnail">
      <ShaplaImage container-width="150px" container-height="150px">
        <img :src="imageUrl" :alt="imageAltText" />
      </ShaplaImage>
      <ShaplaCross :title="removeButtonText" @click="clearImages" />
    </div>
    <div v-if="!has_image" class="shapla-featured-image__placeholder">
      {{ placeholderText }}
      <ShaplaButton size="small" @click.prevent="addImages">
        {{ buttonText }}
      </ShaplaButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from "vue";
import ShaplaCross from "../../cross/ShaplaCross.vue";
import ShaplaButton from "../../button/ShaplaButton.vue";
import ShaplaImage from "../../image/ShaplaImage.vue";

const props = defineProps({
  placeholderText: { type: String, default: "No Image Selected" },
  buttonText: { type: String, default: "Add Image" },
  removeButtonText: { type: String, default: "Remove" },
  imageUrl: { type: String, default: "" },
  imageAltText: { type: String, default: "" },
});
const emit = defineEmits(["click:add", "click:clear"]);
const has_image = computed<boolean>(
  () => !!(props.imageUrl && props.imageUrl.length)
);
const addImages = () => emit("click:add");
const clearImages = () => emit("click:clear");
</script>

<style lang="scss">
@import "shapla-css/src/colors";

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
