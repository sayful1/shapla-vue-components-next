<template>
  <div
    class="shapla-dashboard"
    :class="dashboardClasses"
    :style="dashboardStyles"
  >
    <div class="shapla-dashboard-header" :class="headerClasses">
      <div
        v-if="showBurgerIcon"
        class="shapla-dashboard-header__burger"
        @click="toggleSideNavigation"
      >
        <ShaplaIcon :hoverable="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="currentColor"
            />
          </svg>
        </ShaplaIcon>
      </div>

      <slot name="navbar-brand">
        <div v-if="title" class="shapla-dashboard-header__title">
          {{ title }}
        </div>
      </slot>

      <slot name="navbar-start" />

      <div class="shapla-dashboard-header__spacer" />

      <slot name="navbar-end" />
    </div>

    <ShaplaSidenav
      :active="activateSideNav"
      :nav-width="navWidth"
      :show-overlay="showOverlay"
      position="left"
      :class="sidenavClass"
      @close="closeSideNavigation"
    >
      <div
        v-if="showSidenavProfile"
        class="shapla-dashboard-sidenav-profile"
        :class="sidenavProfileClass"
      >
        <div v-if="avatarUrl" class="shapla-dashboard-sidenav-profile__avatar">
          <img :src="avatarUrl" :alt="userDisplayName" />
        </div>
        <div
          v-if="userDisplayName"
          class="shapla-dashboard-sidenav-profile__name"
        >
          <span v-if="greeting">{{ greeting }}</span>
          <b v-if="userDisplayName">{{ userDisplayName }}</b>
        </div>
      </div>

      <div class="shapla-dashboard-sidenav-menu" :style="sidenavMenuStyle">
        <slot name="sidenav-menu" />
      </div>
    </ShaplaSidenav>

    <div class="shapla-dashboard-content">
      <div class="shapla-dashboard-content__inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShaplaSidenav from "../sidenav/ShaplaSidenav.vue";
import ShaplaIcon from "../icon/ShaplaIcon.vue";
import { computed, onMounted } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  userDisplayName: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },
  greeting: { type: String, default: "Hello," },
  headerHeight: { type: String, default: "56px" },
  headerTheme: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["default", "primary", "secondary"].includes(value),
  },
  sideNavType: {
    type: String,
    default: "overlay",
    validator: (value: string) => ["overlay", "off-canvas"].includes(value),
  },
  // Side navigation props
  showBurgerIcon: { type: Boolean, default: true },
  activateSideNav: { type: Boolean, default: false },
  showSidenavProfile: { type: Boolean, default: true },
  showOverlay: { type: Boolean, default: true },
  navWidth: { type: String, default: "300px" },
  sidenavClass: { type: [String, Array, Object], default: "" },
});
const emit = defineEmits(["open:sidenav", "close:sidenav"]);
const openSideNavigation = () => emit("open:sidenav");
const closeSideNavigation = () => emit("close:sidenav");
const toggleSideNavigation = () =>
  props.activateSideNav ? closeSideNavigation() : openSideNavigation();

const headerClasses = computed(() => [`theme-${props.headerTheme}`]);
const sidenavProfileClass = computed(() => [`theme-${props.headerTheme}`]);
const dashboardStyles = computed(() => {
  const styles: { [key: string]: string } = {};
  styles["--shapla-dashboard-header-height"] = props.headerHeight;
  styles["--shapla-dashboard-sidenav-width"] = props.navWidth;
  return styles;
});

const dashboardClasses = computed(() => {
  const classes = [];
  classes.push(`sidenav-type--${props.sideNavType}`);
  if (props.activateSideNav) {
    classes.push("is-sidenav-active");
  }
  return classes;
});

const sidenavMenuStyle = computed(() => {
  const styles = [];
  if (!props.showSidenavProfile) {
    styles.push({ "--shapla-dashboard-header-height": "0" });
  }
  return styles;
});

onMounted(() => {
  document.querySelector("body")?.classList.add("has-shapla-dashboard");
});
</script>

<style lang="scss">
@use "shapla-css/src/index.scss" as shapla;

@include shapla.dashboard;
</style>
