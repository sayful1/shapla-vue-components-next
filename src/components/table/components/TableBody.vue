<template>
  <tbody class="shapla-data-table__content">
    <slot />
  </tbody>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "TableBody",
})
</script>
