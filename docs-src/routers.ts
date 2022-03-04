import { createRouter, createWebHashHistory } from "vue-router";
import { default as Home } from "./pages/Home.vue";
import ExampleCross from "./pages/ExampleCross.vue";
import ExampleButton from "./pages/ExampleButton.vue";
import ExampleCheckbox from "./pages/ExampleCheckbox.vue";
import ExampleColumns from "./pages/ExampleColumns.vue";
import ExampleConfirmDialog from "./pages/ExampleConfirmDialog.vue";
import ExampleModal from "./pages/ExampleModal.vue";
import ExampleDashboard from "./pages/ExampleDashboard.vue";
import ExampleChip from "./pages/ExampleChip.vue";
import ExampleDropdown from "./pages/ExampleDropdown.vue";
import ExampleFileUploader from "./pages/ExampleFileUploader.vue";
import ExampleIcon from "./pages/ExampleIcon.vue";
import ExampleImage from "./pages/ExampleImage.vue";
import ExampleTextField from "./pages/ExampleTextField.vue";
import ExampleNotification from "./pages/ExampleNotification.vue";
import ExampleProgress from "./pages/ExampleProgress.vue";
import ExampleRadio from "./pages/ExampleRadio.vue";
import ExampleRadioButton from "./pages/ExampleRadioButton.vue";
import ExampleSearchForm from "./pages/ExampleSearchForm.vue";
import ExampleSelectField from "./pages/ExampleSelectField.vue";
import ExampleSidenav from "./pages/ExampleSidenav.vue";
import ExampleSpinner from "./pages/ExampleSpinner.vue";
import ExampleStarRating from "./pages/ExampleStarRating.vue";
import ExampleSwitch from "./pages/ExampleSwitch.vue";
import ExampleTable from "./pages/ExampleTable.vue";
import ExampleTabs from "./pages/ExampleTabs.vue";
import ExampleToggles from "./pages/ExampleToggles.vue";
import ExampleSlider from "./pages/ExampleSlider.vue";
import ExampleStepper from "./pages/ExampleStepper.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/button", name: "Button", component: ExampleButton },
  { path: "/chip", name: "Chip", component: ExampleChip },
  { path: "/columns", name: "Columns", component: ExampleColumns },
  { path: "/confirm", name: "Confirm", component: ExampleConfirmDialog },
  { path: "/cross", name: "Cross", component: ExampleCross },
  { path: "/dashboard", name: "Dashboard", component: ExampleDashboard },
  { path: "/dropdown", name: "Dropdown", component: ExampleDropdown },
  { path: "/icon", name: "Icon Container", component: ExampleIcon },
  { path: "/image", name: "Image Container", component: ExampleImage },
  { path: "/checkbox", name: "Input: Checkbox", component: ExampleCheckbox },
  { path: "/input", name: "Input: Text Field", component: ExampleTextField },
  {
    path: "/file-uploader",
    name: "Input: File Uploader",
    component: ExampleFileUploader,
  },
  { path: "/radio", name: "Input: Radio", component: ExampleRadio },
  {
    path: "/radio-button",
    name: "Input: Radio Button",
    component: ExampleRadioButton,
  },
  { path: "/slider", name: "Input: Range Slider", component: ExampleSlider },
  {
    path: "/search-form",
    name: "Input: Search Form",
    component: ExampleSearchForm,
  },
  { path: "/select", name: "Input: Select", component: ExampleSelectField },
  { path: "/switch", name: "Input: Switch", component: ExampleSwitch },
  { path: "/modal", name: "Modal", component: ExampleModal },
  {
    path: "/notification",
    name: "Notification",
    component: ExampleNotification,
  },
  { path: "/progress", name: "Progress", component: ExampleProgress },
  { path: "/sidenav", name: "Sidenav", component: ExampleSidenav },
  { path: "/spinner", name: "Spinner", component: ExampleSpinner },
  { path: "/star-rating", name: "StarRating", component: ExampleStarRating },
  { path: "/table", name: "Data Table", component: ExampleTable },
  { path: "/tabs", name: "Tabs", component: ExampleTabs },
  { path: "/toggles", name: "Toggles", component: ExampleToggles },
  { path: "/stepper", name: "Stepper", component: ExampleStepper },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export { routes };
export default router;
