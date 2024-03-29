<template>
  <div v-if="files.length" class="shapla-file-uploader-status">
    <ul class="shapla-file-uploader-status__items">
      <li class="shapla-file-uploader-status__item">
        Files: {{ files.length }}
      </li>
      <li class="shapla-file-uploader-status__item">
        Percentage: {{ overallProgress }}%
      </li>
      <li class="shapla-file-uploader-status__item">
        Time remaining: {{ timeRemaining }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue";
import { pad } from "../helpers/utils";
import { FileObjectInterfaces } from "../helpers/interfaces";

const props = defineProps({
  files: { type: Array as PropType<FileObjectInterfaces[]>, default: () => [] },
});
const unfinishedFiles = computed(() => {
  let i;
  const files = [];
  for (i = 0; i < props.files.length; i++) {
    if (!(props.files[i].finished || props.files[i].cancelled)) {
      files.push(props.files[i]);
    }
  }
  return files;
});

const overallProgress = computed(() => {
  const _unfinishedFiles = unfinishedFiles.value;
  let totalProgress = 0;

  if (_unfinishedFiles.length === 0) {
    return 0;
  }

  _unfinishedFiles.forEach((file) => {
    totalProgress += file.progress;
  });

  return Math.round(totalProgress / _unfinishedFiles.length) || 0;
});

const secondsRemaining = computed(() => {
  let secondsRemaining = 0;
  unfinishedFiles.value.forEach(
    (file) => (secondsRemaining += file.secondsRemaining)
  );

  return secondsRemaining;
});

const timeRemaining = computed(() => {
  const minutes = Math.floor(secondsRemaining.value / 60),
    seconds = secondsRemaining.value - minutes * 60;

  return pad.left("00", minutes) + ":" + pad.left("00", seconds);
});
</script>
