<template>
  <tr class="shapla-data-table__row" style="display: none">
    <td class="shapla-data-table__cell is-expand-cell" :colspan="colspan">
      <div class="expand-cell-content">
        <slot />
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
defineProps({
  colspan: { type: [String, Number], default: null },
});
</script>
