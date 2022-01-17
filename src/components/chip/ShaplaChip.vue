<template>
  <div class="shapla-chip" :class="chipClasses" :style="chipStyle">
    <img v-if="imageSrc" class="shapla-chip__contact" :src="imageSrc">
    <span class="shapla-chip__text"><slot>{{ text }}</slot></span>
    <shapla-cross v-if="deletable" :small="small" class="shapla-chip__action" @click="deleteChip"/>
  </div>
</template>

<script lang="ts">
import ShaplaCross from "../cross/ShaplaCross.vue";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaChip",
  components: {ShaplaCross},
  props: {
    text: {type: String, default: null, required: false},
    imageSrc: {type: String, default: null, required: false},
    deletable: {type: Boolean, default: false},
    small: {type: Boolean, default: false},
    height: {type: String, default: "32px"},
  },
  emits: ["delete"],
  setup(props, {emit}) {
    const deleteChip = () => emit("delete");

    const chipClasses = computed(() => {
      let classes = [];
      if (props.deletable) {
        classes.push("shapla-chip--deletable");
      }
      if (props.imageSrc) {
        classes.push("shapla-chip--contact");
      }

      return classes;
    });

    const chipStyle = computed(() => {
      let style: { [key: string]: string } = {};
      if (props.small) {
        style["--shapla-chip-height"] = "24px";
      }
      if (props.height !== "32px") {
        style["--shapla-chip-height"] = props.height;
      }
      return style;
    });

    return {deleteChip, chipClasses, chipStyle};
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.delete-icon;
@include shapla.chip;
</style>
