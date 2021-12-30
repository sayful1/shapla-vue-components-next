<template>
  <modal-core
    :active="active"
    :show-close-icon="false"
    content-class="shapla-modal-card"
    :content-size="contentSize"
    :close-on-background-click="closeOnBackgroundClick"
    :background-theme="backgroundTheme"
    @close="close"
  >
    <div class="shapla-modal-card__header">
      <p class="shapla-modal-card__title">
        {{ title }}
      </p>
      <shapla-cross v-if="showCloseIcon" size="medium" @click="$emit('close')" />
    </div>
    <div class="shapla-modal-card__body">
      <slot />
    </div>
    <div class="shapla-modal-card__footer is-pulled-right">
      <slot name="foot">
        <button class="shapla-button" @click.prevent="$emit('close')">
          Cancel
        </button>
      </slot>
    </div>
  </modal-core>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ModalCore from "./ModalCore.vue";
import ShaplaCross from "../../cross/ShaplaCross.vue";

export default defineComponent({
  name: "ModalCard",
  components: {ModalCore, ShaplaCross},
  props: {
    active: {type: Boolean, required: true},
    showCloseIcon: {type: Boolean, default: true},
    closeOnBackgroundClick: {type: Boolean, default: true},
    backgroundTheme: {
      type: String, default: "dark", validator: (value: string) =>
          ["dark", "light"].indexOf(value) !== -1,
    },
    contentSize: {
      type: String, default: "medium", validator: (value: string) =>
          ["small", "medium", "large", "full"].indexOf(value) !== -1,
    },
    title: {type: String, default: "Untitled"},
  },
  emits: ["close"],
  setup(props, {emit}) {
    const close = () => emit("close");

    return {close};
  },
})
</script>
