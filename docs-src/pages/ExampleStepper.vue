<template>
  <shapla-stepper layout="outline" :steps="steps"/>
  <shapla-stepper layout="square" :steps="steps"/>
  <shapla-stepper layout="arrow" :steps="steps"/>
  <shapla-stepper layout="progress-bar" :steps="steps"/>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {ShaplaStepper} from "../../src";

export default defineComponent({
  name: "ExampleStepper",
  components: {ShaplaStepper},
  setup() {
    const steps = ref([
      {key: 'one', label: 'One', number_text: '1', completed: false, current: true},
      {key: 'two', label: 'two', number_text: '2', completed: false, current: false},
      {key: 'three', label: 'three', number_text: '3', completed: false, current: false},
    ]);
    return {steps}
  }
})
</script>

<style scoped>

</style>