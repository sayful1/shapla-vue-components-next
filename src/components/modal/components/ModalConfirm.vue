<template>
  <ModalCore
    :active="active"
    :background-theme="backgroundTheme"
    :content-size="contentSize"
    content-class="shapla-modal-confirm"
    :show-close-icon="false"
    :close-on-background-click="false"
  >
    <div class="shapla-modal-confirm__content">
      <div v-if="icon" class="shapla-modal-confirm__icon" :class="`is-${icon}`">
        <div class="shapla-modal-confirm__icon-content">!</div>
      </div>
      <h3 v-if="title" class="shapla-modal-confirm__title" v-html="title" />
      <div class="shapla-modal-confirm__message" v-html="message" />
    </div>
    <div class="shapla-modal-confirm__actions">
      <slot name="actions">
        <button
          v-if="cancelButton"
          class="shapla-button"
          @click.prevent="handleClick(false)"
        >
          {{ cancelButton }}
        </button>
        <button
          v-if="confirmButton"
          class="shapla-button is-primary"
          @click.prevent="handleClick(true)"
        >
          {{ confirmButton }}
        </button>
      </slot>
    </div>
  </ModalCore>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import ModalCore from "./ModalCore.vue";

defineProps({
  active: { type: Boolean, required: true },
  backgroundTheme: {
    type: String,
    default: "light",
    validator: (value: string) => ["dark", "light"].indexOf(value) !== -1,
  },
  contentSize: {
    type: String,
    default: "small",
    validator: (value: string) =>
      ["small", "medium", "large", "full"].indexOf(value) !== -1,
  },
  type: { type: String, default: "" },
  icon: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "success", "error"].indexOf(value) !== -1,
  },
  title: { type: String, default: "" },
  message: { type: String, default: "Are you sure?" },
  confirmButton: { type: [String, Boolean], default: "Ok" },
  cancelButton: { type: [String, Boolean], default: "Cancel" },
});
const emit = defineEmits(["click"]);
const handleClick = (confirmed: boolean) => {
  emit("click", confirmed);
};
</script>
