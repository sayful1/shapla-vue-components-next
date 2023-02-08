<template>
  <div class="shapla-notification" :class="itemClass">
    <ShaplaCross v-if="showDismisses" @click="requestClose" />
    <div v-if="title" class="shapla-notification__title">
      {{ title }}
    </div>
    <div v-if="message" class="shapla-notification__message" v-html="message" />
  </div>
</template>

<script lang="ts" setup>
import ShaplaCross from "../cross/ShaplaCross.vue";
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
    validator: (value: string) =>
      ["primary", "success", "info", "warning", "error"].indexOf(value) !== -1,
  },
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  showDismisses: { type: Boolean, default: true },
  timeout: { type: Number, default: 3000 },
});
const emit = defineEmits(["close"]);

let timer: null | number = null;

const itemClass = computed(() => {
  return [`has-${props.type}`];
});

const requestClose = () => {
  emit("close");
};

onMounted(() => {
  if (props.timeout !== 0) {
    timer = window.setTimeout(requestClose, props.timeout);
  }
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>
