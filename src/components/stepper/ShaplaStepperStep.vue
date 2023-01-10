<template>
  <div class="shapla-stepper-step" :class="stepClasses">
    <div class="shapla-stepper-step__line">
      <hr v-show="!isFirstItem" class="shapla-stepper-step__line-left"/>
      <hr v-show="!isLastItem" class="shapla-stepper-step__line-right"/>
    </div>
    <div class="shapla-stepper-step__icon-container">
      <div class="shapla-stepper-step__icon">
        <slot name="step">{{ step }}</slot>
      </div>
    </div>
    <slot name="label">
      <div class="shapla-stepper-step__label">
        <div class="shapla-stepper-step__title">{{ label }}</div>
        <div v-if="altLabel" class="shapla-stepper-step__subtitle">{{ altLabel }}</div>
      </div>
    </slot>
  </div>
  <div v-if="isVertical" class="shapla-stepper-content">
    <div class="shapla-stepper-content__wrapper" :style="contentStyle">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onBeforeMount, reactive, toRefs} from "vue";

export default defineComponent({
  name: "ShaplaStepperStep",
  props: {
    active: {type: Boolean, default: false},
    complete: {type: Boolean, default: false},
    editable: {type: Boolean, default: false},
    error: {type: Boolean, default: false},
    firstItem: {type: Boolean, default: false},
    lastItem: {type: Boolean, default: false},
    step: {type: String, default: ''},
    label: {type: String, default: ''},
    altLabel: {type: String, default: ''},
  },
  setup(props) {
    const state = reactive<{ index: number, }>({
      index: -1,
    });
    const stepperProps = inject<{ count: number, props: { type: string, labelPlacement: string } }>("ShaplaStepperProvider");
    const isVertical = computed<boolean>(() => 'vertical' === stepperProps?.props.type)
    const isFirstItem = computed<boolean>(() => 0 === state.index);
    const isLastItem = computed<boolean>(() => stepperProps.count === state.index + 1);

    const stepClasses = computed(() => {
      const classes = [];
      if (props.active) classes.push('is-active');
      if (props.complete) classes.push('is-complete');
      if (props.editable) classes.push('is-editable');
      if (props.error) classes.push('has-error');
      if (stepperProps?.props.type) classes.push(`type-${stepperProps?.props.type}`);
      if (stepperProps?.props.labelPlacement) classes.push(`lp-${stepperProps?.props.labelPlacement}`);

      return classes;
    })

    const contentStyle = computed(() => {
      const styles = [];
      if (props.active) {
        styles.push({height: 'auto'});
      } else {
        styles.push({height: '0'});
      }
      return styles;
    });

    onBeforeMount(() => {
      state.index = stepperProps.count;
      ++stepperProps.count;
    });

    return {...toRefs(state), stepClasses, contentStyle, isVertical, isFirstItem, isLastItem}
  }
})
</script>

<style lang="scss">
@import "shapla-css/src/colors";

.shapla-stepper-step {
  display: flex;
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;

  &__line {
    //width: 100%;
  }

  &__line-left,
  &__line-right {
    border-color: rgba(#000, .12);
    position: absolute;
    top: calc(var(--shapla-stepper-icon-size, 24px) / 2);
    width: 50%;
    z-index: -1;
  }

  &__line-left {
    left: 0;
  }

  &__line-right {
    right: 0;
  }

  &__icon-container {
    background-color: white;
  }

  &__icon {
    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    font-size: .75rem;
    justify-content: center;
    height: var(--shapla-stepper-icon-size, 24px);
    min-width: var(--shapla-stepper-icon-size, 24px);
    width: var(--shapla-stepper-icon-size, 24px);
    transition: .3s cubic-bezier(.25, .8, .25, 1);

    margin-right: .5rem;
    background-color: rgba(#000, .38);
    color: #fff;
  }

  &__label {
    background-color: white;
    padding-left: .5rem;
  }

  &__title {
  }

  &__subtitle {
  }

  &.is-active {
    .shapla-stepper-step__icon {
      background-color: $primary;
      color: $on-primary;
    }
  }
}

.has-lp-default {
  .shapla-stepper-step__icon {
  }
}

.has-lp-alternative {
  .shapla-stepper-step {
  }

  .shapla-stepper-step__icon {
    margin-right: 0;
    margin-bottom: .5rem;
  }
}

.is-horizontal {
  .shapla-stepper-step__icon {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .shapla-stepper-content {
    display: none;
  }
}

.is-vertical {
  .shapla-stepper-step__icon {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .shapla-stepper-step__line {
    display: none;
  }
}

.has-lp-alternative.is-horizontal {
  .shapla-stepper-step {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>