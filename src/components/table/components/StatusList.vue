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
import { PropType } from "vue";
import { ShaplaTableStatusInterface } from "../TableInterfaces";

defineProps({
  statuses: { type: Array as PropType<ShaplaTableStatusInterface[]>, default: () => [] },
  type: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "horizontal",
    validator: (value: string) =>
      -1 !== ["vertical", "horizontal"].indexOf(value),
  },
});
const emit = defineEmits<{
  change: [status: ShaplaTableStatusInterface];
}>();

const handleClickEvent = (status: ShaplaTableStatusInterface) => emit("change", status);
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.data-table-status-list;
</style>
