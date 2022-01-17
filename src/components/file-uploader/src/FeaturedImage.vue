<template>
  <div class="shapla-featured-image">
    <div v-if="has_image" class="shapla-featured-image__thumbnail">
      <shapla-image container-width="150px" container-height="150px">
        <img :src="imageUrl" :alt="imageAltText"/>
      </shapla-image>
      <shapla-cross :title="removeButtonText" @click="clearImages"/>
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
import {defineComponent, computed} from "vue";
import ShaplaCross from "../../cross/ShaplaCross.vue";
import ShaplaButton from "../../button/ShaplaButton.vue";
import ShaplaImage from "../../image/ShaplaImage.vue";

export default defineComponent({
  name: "FeaturedImage",
  components: {ShaplaCross, ShaplaButton, ShaplaImage},
  props: {
    placeholderText: {type: String, default: "No Image Selected"},
    buttonText: {type: String, default: "Add Image"},
    removeButtonText: {type: String, default: "Remove"},
    imageUrl: {type: String, default: ""},
    imageAltText: {type: String, default: ""},
  },
  emits: ["click:add", "click:clear"],
  setup(props, {emit}) {
    const has_image = computed<boolean>(
        () => !!(props.imageUrl && props.imageUrl.length)
    );
    const addImages = () => emit("click:add");
    const clearImages = () => emit("click:clear");

    return {has_image, addImages, clearImages};
  },
});
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
