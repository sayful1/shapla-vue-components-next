<template>
  <tr class="shapla-data-table__row no-items">
    <td :colspan="colspan" class="shapla-data-table__cell has-no-item">
      <slot />
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "BodyRowNoItem",
  props: {
    colspan: {type: [String, Number], default: null},
  },
})
</script>
