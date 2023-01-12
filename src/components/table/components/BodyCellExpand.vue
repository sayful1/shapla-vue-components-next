<template>
  <td class="shapla-data-table__cell is-expand-toggle-cell">
    <button
      type="button"
      class="data-table-toggle-button"
      aria-label="Show more details"
      @click="toggleExpandRow($event)"
    >
      <data-table-icon icon="expand-less" class="expand-triangle-up" />
      <data-table-icon icon="expand-more" class="expand-triangle-down" />
    </button>
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataTableIcon from "./DataTableIcon.vue";

export default defineComponent({
  name: "BodyCellExpand",
  components: { DataTableIcon },
  emits: ["click:expand"],
  setup(props, { emit }) {
    const toggleExpandRow = (event: Event) => emit("click:expand", event);

    return { toggleExpandRow };
  },
});
</script>
