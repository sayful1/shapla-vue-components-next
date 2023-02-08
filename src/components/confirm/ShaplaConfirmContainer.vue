<template>
  <ShaplaModalConfirm
    :active="showConfirm"
    :icon="params.icon"
    :title="params.title"
    :message="params.message"
    :confirm-button="params.confirmButton"
    :cancel-button="params.cancelButton"
    @click="handleClick"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { default as ShaplaModalConfirm } from "../modal/components/ModalConfirm.vue";
import Dialog, { ConfirmDataInterface } from "./Dialog";

const defaultParamsData = {
  icon: "primary",
  title: "",
  message: "Are you sure?",
  confirmButton: "OK",
  cancelButton: "Cancel",
};
const params = ref<ConfirmDataInterface>(defaultParamsData);
const showConfirm = ref<boolean>(false);

const handleClick = (confirmed: boolean) => {
  showConfirm.value = false;
  Dialog.dispatch("click.ShaplaVueConfirmModal", confirmed);
};

onMounted(() => {
  Dialog.on("show.ShaplaVueConfirmModal", (newParams: ConfirmDataInterface) => {
    params.value = Object.assign(defaultParamsData, newParams);
    showConfirm.value = true;
  });
});
</script>
