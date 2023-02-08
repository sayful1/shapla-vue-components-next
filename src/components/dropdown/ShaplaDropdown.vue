<template>
  <div
    ref="root"
    class="shapla-dropdown"
    :class="{ 'is-hoverable': hoverable }"
  >
    <div
      class="shapla-dropdown-trigger"
      aria-haspopup="true"
      :aria-expanded="state.isActive ? 'true' : 'false'"
      @click="state.isActive = !state.isActive"
    >
      <slot name="trigger" />
    </div>
    <ShaplaDropdownMenu
      :active="state.isActive"
      :role="role"
      :right="right"
      :up="up"
      :direction="direction"
      :max-items="maxItems"
    >
      <template #before-content>
        <slot name="before-content" />
      </template>
      <slot />
      <template #after-content>
        <slot name="after-content" />
      </template>
    </ShaplaDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import ShaplaDropdownMenu from "./ShaplaDropdownMenu.vue";
import { defineProps, reactive, ref, watch } from "vue";

defineProps({
  hoverable: { type: Boolean, default: true },
  role: { type: String, default: "menu" },
  right: { type: Boolean, default: false },
  up: { type: Boolean, default: false },
  maxItems: { type: Number, default: null },
  direction: {
    type: String,
    default: "auto",
    validator: (value: string) => ["auto", "up", "down"].includes(value),
  },
});

const root = ref<HTMLElement | null>(null);
const state = reactive<{ isActive: boolean }>({ isActive: false });

watch(
  () => state.isActive,
  (isActive) => {
    if (isActive) {
      document.addEventListener("click", (event: Event) => {
        if (!root.value?.contains(event.target as HTMLElement)) {
          state.isActive = false;
        }
      });
    }
  }
);
</script>
