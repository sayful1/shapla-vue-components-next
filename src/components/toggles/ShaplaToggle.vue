<template>
  <div class="shapla-toggle-panel" :class="panelClass">
    <div
        class="shapla-toggle-panel__heading"
        :class="headingClasses"
        @click.prevent="toggleActive"
    >
      <div class="shapla-toggle-panel__title">
        <h4 class="shapla-toggle-panel__title-text">
          <slot name="title">
            {{ name }}
          </slot>
        </h4>
        <div
            v-if="subtext"
            class="shapla-toggle-panel__title-subtext"
            v-html="subtext"
        />
      </div>
      <div
          class="shapla-toggle-panel__icon"
          :class="`is-icon-${toggleIconPosition}`"
      >
        <template v-if="isSelected">
          <slot name="icon-close">
            <toggle-icon icon="minus"/>
          </slot>
        </template>
        <template v-if="!isSelected">
          <slot name="icon-open">
            <toggle-icon icon="plus"/>
          </slot>
        </template>
      </div>
    </div>
    <div class="shapla-toggle-panel__body" :class="panelBodyClass">
      <div class="shapla-toggle-panel__content">
        <slot :active="isSelected"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ToggleIcon from "./toggleIcon.vue";
import {ToggleEvent, createUUID, TogglesPropsInterface} from "./Helper";
import {inject, ref, onMounted, reactive, computed, toRefs, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaToggle",
  components: {ToggleIcon},
  props: {
    name: {type: String, default: null, required: true},
    subtext: {type: String, default: null, required: false},
    selected: {type: Boolean, default: false},
    iconPosition: {
      type: String,
      default: undefined,
      validator: (value: string) => -1 !== ["left", "right"].indexOf(value),
    },
    boxedMode: {type: Boolean, default: undefined},
    showDivider: {type: Boolean, default: undefined},
    titleColor: {
      type: String,
      default: undefined,
      validator: (value: string) =>
          -1 !== ["default", "primary", "secondary"].indexOf(value),
    },
  },
  setup(props) {
    const state = reactive({
      isSelected: false,
      isOverflowVisible: false,
      toggleIconPosition: "left",
      toggleShowDivider: true,
      toggleBoxedMode: true,
      toggleTitleColor: "default",
    });

    const parentId = ref<string>('');
    const toggleId = createUUID();
    const toggles = inject<TogglesPropsInterface>("ShaplaTogglesProvider");

    const panelClass = computed(() => {
      const classes = ["shapla-toggle-panel--default"];
      if (!state.toggleShowDivider && !state.toggleBoxedMode)
        classes.push("shapla-toggle-panel--no-divider");
      if (state.toggleBoxedMode)
        classes.push("shapla-toggle-panel--boxed-mode");

      return classes;
    });

    const headingClasses = computed(() => {
      const classes = [];
      if (state.toggleIconPosition !== "left")
        classes.push(`has-icon-${state.toggleIconPosition}`);
      if (state.toggleTitleColor !== "default")
        classes.push(`is-color-${state.toggleTitleColor}`);
      return classes;
    });
    const panelBodyClass = computed(() => {
      return {
        "is-active": state.isSelected,
        "is-overflow-visible": state.isOverflowVisible,
      };
    });

    const toggleActive = () => {
      ToggleEvent.dispatch("change:ShaplaToggle", {
        parent: parentId.value,
        item: toggleId,
      });
      state.isSelected = !state.isSelected;
      state.isOverflowVisible = !state.isOverflowVisible;
    };

    onMounted(() => {
      if (toggles) {
        parentId.value = toggles.uuid;
        state.toggleIconPosition = (toggles.iconPosition || props.iconPosition) as string;
        state.toggleBoxedMode = (toggles.boxedMode || props.boxedMode) as boolean;
        state.toggleShowDivider = (toggles.showDivider || props.showDivider) as boolean;
        state.toggleTitleColor = (toggles.titleColor || props.titleColor) as string;
      }

      state.isSelected = props.selected;
      if (props.selected) {
        state.isOverflowVisible = props.selected;
      }

      ToggleEvent.on("change:ShaplaToggle", (element: { parent: string, item: string }) => {
        if (
            toggleId !== element.item &&
            element.parent === parentId.value &&
            state.isSelected &&
            toggles?.accordion
        ) {
          state.isSelected = false;
          state.isOverflowVisible = false;
        }
      });
    });

    return {
      ...toRefs(state),
      parentId,
      toggleId,
      panelClass,
      headingClasses,
      panelBodyClass,
      toggleActive,
    };
  },
})
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.toggles;
</style>
