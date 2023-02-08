<template>
  <ModalCore
    :active="active"
    :content-size="contentSize"
    :show-close-icon="showCloseIcon"
    :background-theme="backgroundTheme"
    :close-on-background-click="closeOnBackgroundClick"
    content-class="shapla-modal-box"
    @close="close"
  >
    <slot />
  </ModalCore>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import ModalCore from "./ModalCore.vue";

defineProps({
  active: { type: Boolean, required: true },
  showCloseIcon: { type: Boolean, default: true },
  closeOnBackgroundClick: { type: Boolean, default: true },
  backgroundTheme: {
    type: String,
    default: "dark",
    validator: (value: string) => ["dark", "light"].indexOf(value) !== -1,
  },
  contentSize: {
    type: String,
    default: "medium",
    validator: (value: string) =>
      ["small", "medium", "large", "full"].indexOf(value) !== -1,
  },
});

const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>
