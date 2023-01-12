<template>
  <tr class="shapla-data-table__row">
    <slot />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BodyRow",
});
</script>
