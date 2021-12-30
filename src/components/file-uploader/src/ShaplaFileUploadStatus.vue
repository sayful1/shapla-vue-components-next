<template>
  <div class="shapla-file-uploader-file">
    <div :class="fillClass" :style="{ width: file.progress + '%' }" />

    <div class="shapla-file-uploader-file__content">
      <div class="shapla-file-uploader-file__title">
        {{ file.file.name }}
      </div>

      <div v-if="isInProgress" class="shapla-file-uploader-file__progress">
        <div class="shapla-file-uploader-file__percentage">
          {{ file.progress }}%
        </div>
        <div class="shapla-file-uploader-file__separator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M7.8 10c0 1.215 0.986 2.2 2.201 2.2s2.199-0.986 2.199-2.2c0-1.215-0.984-2.199-2.199-2.199s-2.201 0.984-2.201 2.199z" />
          </svg>
        </div>
        <div class="shapla-file-uploader-file__time-remaining">
          Time remaining: {{ timeRemaining }}
        </div>
      </div>
    </div>

    <div class="shapla-file-uploader-file__spacer" />

    <div class="shapla-file-uploader-file__status">
      <span v-if="file.failed">Failed</span>
      <span v-if="file.finished">Complete</span>
      <span v-if="file.cancelled">Cancelled</span>
      <span v-if="isProcessing">Processing</span>
    </div>

    <div class="shapla-file-uploader-file__actions">
      <slot name="actions">
        <a
          v-if="canCancel && showCancel"
          class="shapla-file-uploader-file__action-cancel"
          href="#"
          @click.prevent="cancel"
        >Cancel</a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import pad from "./helpers/pad";
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ShaplaFileUploadStatus",
  props: {
    file: {type: Object, required: true},
    showCancel: {type: Boolean, default: true},
  },
  setup(props) {
    const isInProgress = computed(
        () => !props.file.finished && !props.file.failed && !props.file.cancelled
    );
    const isProcessing = computed(
        () =>
            !!(
                props.file.progress &&
                props.file.progress === 100 &&
                !props.file.finished
            )
    );
    const canCancel = computed(
        () => !props.file.finished && !props.file.cancelled && !isProcessing.value
    );
    const fillClass = computed(() => {
      let classes = ["shapla-file-uploader-file__progress-line"];
      if (props.file.finished) classes.push("is-finished");
      if (props.file.failed || props.file.cancelled) classes.push("is-failed");
      return classes;
    });

    const timeRemaining = computed(() => {
      let minutes = Math.floor(props.file.secondsRemaining / 60),
          seconds = props.file.secondsRemaining - minutes * 60;

      return pad.left("00", minutes) + ":" + pad.left("00", seconds);
    });

    const cancel = () => {
      props.file.xhr.abort();
      // eslint-disable-next-line vue/no-mutating-props
      props.file.cancelled = true;
    };

    return {
      isInProgress,
      isProcessing,
      canCancel,
      fillClass,
      timeRemaining,
      cancel,
    };
  },
});
</script>

<style lang="scss">
@import "shapla-css/src/colors.scss";

.shapla-file-uploader-file {
  display: flex;
  margin: 20px 0;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(#000, 0.12);
  border-radius: 3px;
  background-color: #f5f5f5;
  border: 1px solid rgba(#000, 0.04);
  padding: 8px;

  &__title {
    color: $text-primary;
  }

  &__progress {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $text-secondary;
  }

  &__separator {
    margin: 0 5px;
    height: 1em;
    width: 1em;

    svg {
      fill: currentColor;
      height: 1em;
      width: 1em;
    }
  }

  &__progress-line {
    border-radius: 3px;
    background-color: $success-alpha;
    height: 100%;
    transition: width 500ms ease;
    position: absolute;
    left: 0;
    top: 0;

    &.is-failed {
      transition: none;
      width: 100% !important;
      background-color: $error-alpha;
    }

    &.is-finished {
      width: 100% !important;
    }
  }

  &__spacer {
    flex-grow: 1;
  }

  &__status,
  &__actions {
    display: flex;
    align-items: center;

    > * {
      margin-left: 10px;
    }
  }

  &__content,
  &__status,
  &__actions {
    z-index: 2;
  }
}
</style>
