<template>
  <shapla-modal-confirm
    :active="showConfirm"
    :icon="params.icon"
    :title="params.title"
    :message="params.message"
    :confirm-button="params.confirmButton"
    :cancel-button="params.cancelButton"
    @click="handleClick"
  />
</template>

<script lang="ts">
import {ref, onMounted, defineComponent} from "vue";
import {default as ShaplaModalConfirm} from "../modal/components/ModalConfirm.vue";
import Dialog, {ConfirmDataInterface} from "./Dialog";

export default defineComponent({
  name: "ShaplaConfirmContainer",
  components: {ShaplaModalConfirm},
  setup() {
    const defaultParamsData = {
      icon: "primary",
      title: "",
      message: "Are you sure?",
      confirmButton: "OK",
      cancelButton: "Cancel",
    };
    const params = ref<ConfirmDataInterface>(defaultParamsData);
    const showConfirm = ref<boolean>(false);

    const handleClick = (confirmed) => {
      showConfirm.value = false;
      Dialog.dispatch("click.ShaplaVueConfirmModal", confirmed);
    };

    onMounted(() => {
      Dialog.on("show.ShaplaVueConfirmModal", (newParams) => {
        params.value = Object.assign(defaultParamsData, newParams);
        showConfirm.value = true;
      });
    });

    return {
      showConfirm,
      params,
      handleClick,
    };
  },
})
</script>
