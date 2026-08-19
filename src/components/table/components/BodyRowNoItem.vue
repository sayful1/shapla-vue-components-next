<template>
  <tr class="shapla-data-table__row no-items">
    <td :colspan="colspan" class="shapla-data-table__cell has-no-item">
      <slot />
    </td>
  </tr>
</template>

<script lang="ts" setup>
defineProps({
  colspan: { type: [String, Number], default: null },
});
</script>
