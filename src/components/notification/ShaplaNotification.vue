<template>
  <div class="shapla-notification" :class="itemClass">
    <shapla-cross v-if="showDismisses" @click="requestClose" />
    <div v-if="title" class="shapla-notification__title">
      {{ title }}
    </div>
    <div v-if="message" class="shapla-notification__message" v-html="message" />
  </div>
</template>

<script lang="ts">
import ShaplaCross from "../cross/ShaplaCross.vue";
import {computed, onMounted, onUnmounted, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaNotification",
  components: {ShaplaCross},
  props: {
    type: {
      type: String, default: "info", validator: (value: string) =>
          ["primary", "success", "info", "warning", "error"].indexOf(value) !== -1,
    },
    title: {type: String, default: ""},
    message: {type: String, default: ""},
    showDismisses: {type: Boolean, default: true},
    timeout: {type: Number, default: 3000},
  },
  emits: ["close"],
  setup(props, {emit}) {
    let timer = null;

    const itemClass = computed(() => {
      return [`has-${props.type}`];
    });

    const requestClose = () => {
      emit("close");
    };

    onMounted(() => {
      if (props.timeout !== 0) {
        timer = setTimeout(requestClose, props.timeout);
      }
    });

    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer);
      }
    });

    return {
      requestClose,
      itemClass,
    };
  },
})
</script>
