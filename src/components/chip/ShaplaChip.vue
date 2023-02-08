<template>
  <div class="shapla-chip" :class="chipClasses" :style="chipStyle">
    <img v-if="imageSrc" class="shapla-chip__contact" :src="imageSrc" />
    <span class="shapla-chip__text">
      <slot>{{ text }}</slot>
    </span>
    <ShaplaCross
      v-if="deletable"
      :small="small"
      class="shapla-chip__action"
      @click="deleteChip"
    />
  </div>
</template>

<script lang="ts" setup>
import ShaplaCross from "../cross/ShaplaCross.vue";
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  text: { type: String, default: null, required: false },
  imageSrc: { type: String, default: null, required: false },
  deletable: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  height: { type: String, default: "32px" },
});
const emit = defineEmits(["delete"]);

const deleteChip = () => emit("delete");

const chipClasses = computed(() => {
  const classes = [];
  if (props.deletable) {
    classes.push("shapla-chip--deletable");
  }
  if (props.imageSrc) {
    classes.push("shapla-chip--contact");
  }

  return classes;
});

const chipStyle = computed(() => {
  const style: { [key: string]: string } = {};
  if (props.small) {
    style["--shapla-chip-height"] = "24px";
  }
  if (props.height !== "32px") {
    style["--shapla-chip-height"] = props.height;
  }
  return style;
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.delete-icon;
@include shapla.chip;
</style>
