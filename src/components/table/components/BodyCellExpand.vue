<template>
  <td class="shapla-data-table__cell is-expand-toggle-cell">
    <button
      type="button"
      class="data-table-toggle-button"
      aria-label="Show more details"
      @click="toggleExpandRow($event)"
    >
      <DataTableIcon icon="expand-less" class="expand-triangle-up" />
      <DataTableIcon icon="expand-more" class="expand-triangle-down" />
    </button>
  </td>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
import DataTableIcon from "./DataTableIcon.vue";

const emit = defineEmits(["click:expand"]);
const toggleExpandRow = (event: Event) => emit("click:expand", event);
</script>
