<template>
  <shapla-stepper v-model="activeStep">
    <shapla-stepper-step
        step="1"
        label="Select a campaign"
        :active="activeStep === 1"
        :complete="activeStep > 1"
    >
      Stepper Content goes here.
    </shapla-stepper-step>
    <shapla-stepper-step
        step="2"
        label="Select an add group"
        alt-label="Optional"
        :active="activeStep === 2"
        :complete="activeStep > 2"
    >
      Second step content
    </shapla-stepper-step>
    <shapla-stepper-step
        step="3"
        label="Select an add"
        :active="activeStep === 3"
        :complete="activeStep > 3"
    >
      3rd step content
    </shapla-stepper-step>
  </shapla-stepper>


  <shapla-stepper v-model="activeStep" label-placement="alternative">
    <shapla-stepper-step
        step="1"
        label="Select a campaign"
        :active="activeStep === 1"
        :complete="activeStep > 1"
    >
      Stepper Content goes here.
    </shapla-stepper-step>
    <shapla-stepper-step
        step="2"
        label="Select an add group"
        alt-label="Optional"
        :active="activeStep === 2"
        :complete="activeStep > 2"
    >
      Second step content
    </shapla-stepper-step>
    <shapla-stepper-step
        step="3"
        label="Select an add"
        :active="activeStep === 3"
        :complete="activeStep > 3"
    >
      3rd step content
    </shapla-stepper-step>
  </shapla-stepper>


  <shapla-stepper v-model="activeStep" type="vertical">
    <shapla-stepper-step
        step="1"
        label="Select a campaign"
        :active="activeStep === 1"
        :complete="activeStep > 1"
    >
      Stepper Content goes here.
    </shapla-stepper-step>
    <shapla-stepper-step
        step="2"
        label="Select an add group"
        alt-label="Optional"
        :active="activeStep === 2"
        :complete="activeStep > 2"
    >
      Second step content
    </shapla-stepper-step>
    <shapla-stepper-step
        step="3"
        label="Select an add"
        :active="activeStep === 3"
        :complete="activeStep > 3"
    >
      3rd step content
    </shapla-stepper-step>
  </shapla-stepper>

  <shapla-stepper v-model="activeStep" type="vertical" label-placement="alternative">
    <shapla-stepper-step
        step="1"
        label="Select a campaign"
        :active="activeStep === 1"
        :complete="activeStep > 1"
    >
      Stepper Content goes here.
    </shapla-stepper-step>
    <shapla-stepper-step
        step="2"
        label="Select an add group"
        alt-label="Optional"
        :active="activeStep === 2"
        :complete="activeStep > 2"
    >
      Second step content
    </shapla-stepper-step>
    <shapla-stepper-step
        step="3"
        label="Select an add"
        :active="activeStep === 3"
        :complete="activeStep > 3"
    >
      3rd step content
    </shapla-stepper-step>
  </shapla-stepper>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import {ShaplaStepper, ShaplaStepperStep} from "../../src";

export default defineComponent({
  name: "ExampleStepper",
  components: {ShaplaStepper, ShaplaStepperStep},
  setup() {
    const state = reactive({
      activeStep: 2,
    })
    const steps = ref([
      {key: 'one', label: 'One', number_text: '1', completed: false, current: true},
      {key: 'two', label: 'two', number_text: '2', completed: false, current: false},
      {key: 'three', label: 'three', number_text: '3', completed: false, current: false},
    ]);
    return {...toRefs(state), steps}
  }
})
</script>

<style scoped>

</style>