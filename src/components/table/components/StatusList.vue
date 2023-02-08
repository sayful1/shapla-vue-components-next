<template>
  <ul class="shapla-status-list" :class="`shapla-status-list--${type}`">
    <li
      v-for="status in statuses"
      :key="status.key"
      class="shapla-status-list__item"
      :class="{ 'is-active': status.active }"
    >
      <a
        href="#"
        class="shapla-status-list__item-link"
        @click.prevent="handleClickEvent(status)"
      >
        <span class="shapla-status-list__item-label">{{ status.label }}</span>
        <span class="shapla-status-list__item-count">{{ status.count }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from "vue";

interface StatusInterface {
  key: string;
  label: string;
  count: number;
  active: boolean;
}

defineProps({
  statuses: { type: Array as PropType<StatusInterface[]>, default: () => [] },
  type: {
    type: String,
    default: "horizontal",
    validator: (value: string) =>
      -1 !== ["vertical", "horizontal"].indexOf(value),
  },
});
const emit = defineEmits(["change"]);

const handleClickEvent = (event: Event) => emit("change", event);
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.data-table-status-list;
</style>
