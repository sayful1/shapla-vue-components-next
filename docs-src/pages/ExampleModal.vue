<template>
  <doc-tab
    heading="Modal"
    slug="shapla-modal"
    name="ShaplaModal"
    scss-mixin="modal"
    :properties="properties"
    :desc="descriptions"
  >
    <div>
      <p>
        <button @click="openCoreModal = true">Open Core Modal</button>
      </p>
      <p>
        <button @click="openConfirmModal = true">Open Confirm Modal</button>
      </p>
      <p>
        <button @click="openBoxModal = true">Open Box Modal</button>
      </p>
      <p>
        <button @click="openCardModal = true">
          Open Card Modal (Default / Medium)
        </button>
        <button @click="openSmallCardModal = true">
          Open Card Modal (Small)
        </button>
        <button @click="openLargeCardModal = true">
          Open Card Modal (Large)
        </button>
        <button @click="openFullCardModal = true">Open Card Modal (Full)</button>
        <button @click="openNoFooterCardModal = true">
          Open Card Modal (No Footer)
        </button>
      </p>
      <p>
        <button @click="openFullCardModal2 = true">Open All-in-One modal</button>
      </p>

      <shapla-modal-core :active="openCoreModal" @close="openCoreModal = false">
        <img
          src="https://via.placeholder.com/600x600.png?text=1280x960"
          alt="Placeholder image (600x600)"
        >
      </shapla-modal-core>

      <shapla-modal-box
        v-if="openBoxModal"
        :active="openBoxModal"
        @close="openBoxModal = false"
      >
        Box modal
      </shapla-modal-box>

      <shapla-modal-confirm
        v-if="openConfirmModal"
        :active="openConfirmModal"
        @click="openConfirmModal = false"
      >
        Confirm
      </shapla-modal-confirm>

      <shapla-modal-card
        v-if="openCardModal"
        :active="openCardModal"
        @close="openCardModal = false"
      >
        Add some content
      </shapla-modal-card>
      <shapla-modal-card
        v-if="openSmallCardModal"
        :active="openSmallCardModal"
        content-size="small"
        title="Modal Demo 1"
        @close="openSmallCardModal = false"
      >
        Small width modal.
      </shapla-modal-card>
      <shapla-modal-card
        v-if="openLargeCardModal"
        :active="openLargeCardModal"
        content-size="large"
        title="Modal Demo 1"
        @close="openLargeCardModal = false"
      >
        Large width modal.
      </shapla-modal-card>
      <shapla-modal-card
        v-if="openFullCardModal"
        :active="openFullCardModal"
        content-size="full"
        title="Modal Demo 1"
        @close="openFullCardModal = false"
      >
        Full width modal.
      </shapla-modal-card>
      <shapla-modal
        :active="openFullCardModal2"
        content-size="full"
        title="Modal Demo 1"
        @close="openFullCardModal2 = false"
      >
        Full width modal.
      </shapla-modal>
      <shapla-modal
        :active="openNoFooterCardModal"
        title="No Footer Card Modal"
        :show-card-footer="false"
        @close="openNoFooterCardModal = false"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, officia!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium
        ad adipisci aliquid asperiores aut autem blanditiis corporis cumque
        debitis deleniti ducimus eius, error est excepturi expedita fuga fugit hic
        illo impedit incidunt inventore iusto labore laudantium maxime nemo nobis
        nulla numquam quae quo quos ratione suscipit temporibus, totam velit
        veritatis voluptates! Aliquam amet doloribus, ducimus, esse harum ipsam
        molestiae nam nemo nesciunt pariatur quas quibusdam quidem reiciendis,
        similique velit! Consequatur debitis, dignissimos error facere id ipsum
        iure iusto labore libero molestiae, nobis provident quis repellat saepe
        totam vel veniam. Architecto assumenda beatae cum maxime officia ratione
        reprehenderit sapiente veritatis.
      </shapla-modal>
    </div>
  </doc-tab>
</template>

<script>
import {
  ShaplaModal,
  ShaplaModalBox,
  ShaplaModalCard,
  ShaplaModalConfirm,
  ShaplaModalCore,
} from "../../src/index.ts";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleModal",
  components: {
    DocTab,
    ShaplaModal,
    ShaplaModalConfirm,
    ShaplaModalBox,
    ShaplaModalCore,
    ShaplaModalCard,
  },
  setup() {
    const properties = computed(() => ShaplaModal.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  data() {
    return {
      openBoxModal: false,
      openCoreModal: false,
      openConfirmModal: false,
      openCardModal: false,
      openSmallCardModal: false,
      openLargeCardModal: false,
      openFullCardModal: false,
      openFullCardModal2: false,
      openNoFooterCardModal: false,
    };
  },
};
</script>
