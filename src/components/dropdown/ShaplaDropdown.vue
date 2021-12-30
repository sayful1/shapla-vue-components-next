<template>
  <div ref="root" class="shapla-dropdown" :class="{ 'is-hoverable': hoverable }">
    <div
      class="shapla-dropdown-trigger" aria-haspopup="true" :aria-expanded="isActive ? 'true' : 'false'"
      @click="isActive = !isActive"
    >
      <slot name="trigger" />
    </div>
    <shapla-dropdown-menu
      :active="isActive"
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
    </shapla-dropdown-menu>
  </div>
</template>

<script lang="ts">
import ShaplaDropdownMenu from "./ShaplaDropdownMenu.vue";
import {watch, reactive, ref, toRefs, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaDropdown",
  components: {ShaplaDropdownMenu},
  props: {
    hoverable: {type: Boolean, default: true},
    role: {type: String, default: "menu"},
    right: {type: Boolean, default: false},
    up: {type: Boolean, default: false},
    maxItems: {type: Number, default: null},
    direction: {
      type: String, default: "auto",
      validator: (value: string) => ["auto", "up", "down"].indexOf(value) !== -1,
    },
  },
  setup() {
    const root = ref(null);
    const state = reactive<{ isActive: boolean }>({isActive: false});

    watch(
        () => state.isActive,
        (isActive) => {
          if (isActive) {
            document.addEventListener("click", (event) => {
              if (!root.value.contains(event.target)) {
                state.isActive = false;
              }
            });
          }
        }
    );

    return {...toRefs(state), root};
  },
})
</script>
