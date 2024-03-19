<script setup lang="ts">
import { computed, ref } from "vue";
import { routes } from "./routers";
import invert from "./invert";
import {
  ShaplaDashboard,
  ShaplaButton,
  ShaplaDropdown,
  ShaplaCross,
} from "../src";

const hexToRgb = (hex, alpha) => {
  hex = hex.replace("#", "");
  const r = parseInt(
    hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16
  );
  const g = parseInt(
    hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16
  );
  const b = parseInt(
    hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16
  );
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

const showUnderDevelopmentNote = ref(true);
const activeSidenav = ref(false);
const isMobile = ref(false);
const calculateDeviceScreenSize = () => {
  if (document.querySelector("body").offsetWidth < 1024) {
    isMobile.value = true;
    activeSidenav.value = false;
  } else {
    isMobile.value = false;
    activeSidenav.value = true;
  }
};
window.addEventListener("load", calculateDeviceScreenSize);
window.addEventListener("resize", calculateDeviceScreenSize);

const dashboardClass = computed(() => {
  return {
    "is-mobile": isMobile.value,
    "is-desktop": !isMobile.value,
  };
});

const closeSidenav = () => {
  if (isMobile.value) {
    activeSidenav.value = false;
  }
};
const primary = ref("#00d1b2");
const secondary = ref("#9c27b0");
const success = ref("#48c774");
const error = ref("#f14668");
const warning = ref("#ffdd57");

const colorThemeStyles = computed(() => {
  const styles = [];

  if (primary.value && "#00d1b2" !== primary.value) {
    styles.push({ "--shapla-primary": `${primary.value}` });
    styles.push({ "--shapla-primary-variant": `${primary.value}` });
    styles.push({
      "--shapla-primary-alpha": `${hexToRgb(primary.value, 0.25)}`,
    });
    styles.push({ "--shapla-on-primary": `${invert(primary.value, true)}` });
  }

  if (secondary.value && "#9c27b0" !== secondary.value) {
    styles.push({ "--shapla-secondary": `${secondary.value}` });
    styles.push({ "--shapla-secondary-variant": `${secondary.value}` });
    styles.push({
      "--shapla-secondary-alpha": `${hexToRgb(secondary.value, 0.25)}`,
    });
    styles.push({
      "--shapla-on-secondary": `${invert(secondary.value, true)}`,
    });
  }

  if (success.value && "#48c774" !== success.value) {
    styles.push({ "--shapla-success": `${success.value}` });
    styles.push({ "--shapla-success-variant": `${success.value}` });
    styles.push({
      "--shapla-success-alpha": `${hexToRgb(success.value, 0.25)}`,
    });
    styles.push({ "--shapla-on-success": `${invert(success.value, true)}` });
  }

  if (warning.value && "#ffdd57" !== warning.value) {
    styles.push({ "--shapla-warning": `${warning.value}` });
    styles.push({ "--shapla-warning-variant": `${warning.value}` });
    styles.push({
      "--shapla-warning-alpha": `${hexToRgb(warning.value, 0.25)}`,
    });
    styles.push({ "--shapla-on-warning": `${invert(warning.value, true)}` });
  }

  if (error.value && "#f14668" !== error.value) {
    styles.push({ "--shapla-error": `${error.value}` });
    styles.push({ "--shapla-error-variant": `${error.value}` });
    styles.push({ "--shapla-error-alpha": `${hexToRgb(error.value, 0.25)}` });
    styles.push({ "--shapla-on-error": `${invert(error.value, true)}` });
  }

  return styles;
});

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <shapla-dashboard
    class="shapla-vue-components-demo"
    :class="dashboardClass"
    :sidenav-class="['app-docs-sidenav', dashboardClass]"
    :activate-side-nav="activeSidenav"
    title="Shapla Vue Components"
    :show-sidenav-profile="false"
    :show-overlay="isMobile"
    :style="colorThemeStyles"
    :show-burger-icon="isMobile"
    header-theme="default"
    @open:sidenav="activeSidenav = true"
    @close:sidenav="closeSidenav"
  >
    <template #navbar-end>
      <div class="space-x-4">
        <shapla-dropdown v-show="!isMobile" :hoverable="false" right>
          <template #trigger>
            <shapla-button class="button--color-theme"
              >Change Color Theme</shapla-button
            >
          </template>
          <div class="shapla-dropdown-item color-theme-field">
            <div class="color-theme-field__label">Primary</div>
            <div class="color-theme-field__value">
              <input v-model="primary" type="color" />
            </div>
          </div>
          <div class="shapla-dropdown-item color-theme-field">
            <div class="color-theme-field__label">Secondary</div>
            <div class="color-theme-field__value">
              <input v-model="secondary" type="color" />
            </div>
          </div>
          <div class="shapla-dropdown-item color-theme-field">
            <div class="color-theme-field__label">Success</div>
            <div class="color-theme-field__value">
              <input v-model="success" type="color" />
            </div>
          </div>
          <div class="shapla-dropdown-item color-theme-field">
            <div class="color-theme-field__label">Warning</div>
            <div class="color-theme-field__value">
              <input v-model="warning" type="color" />
            </div>
          </div>
          <div class="shapla-dropdown-item color-theme-field">
            <div class="color-theme-field__label">Error</div>
            <div class="color-theme-field__value">
              <input v-model="error" type="color" />
            </div>
          </div>
        </shapla-dropdown>
        <shapla-button theme="primary"><shapla-theme-switcher-menu></shapla-theme-switcher-menu></shapla-button>
        <shapla-button
          class="button--buy-coffee"
          href="https://buymeacoffee.com/sayful1"
          target="_blank"
        >
          BUY ME A COFFEE
        </shapla-button>
      </div>
    </template>
    <template #sidenav-menu>
      <ul class="sidenav-list">
        <li
          v-for="route in routes"
          :key="route.name"
          class="sidenav-list__item"
        >
          <router-link
            class="sidenav-list__link"
            active-class="is-active"
            :to="route.path"
            @click="closeSidenav"
          >
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </template>
    <div
      class="shapla-vue-components-demo__content"
      style="padding-bottom: 8rem"
    >
      <div v-if="showUnderDevelopmentNote" class="note--incomplete-info">
        <shapla-cross
          medium
          class="note--incomplete-info__cross"
          @click="showUnderDevelopmentNote = false"
        ></shapla-cross>
        This document is still under development.
      </div>
      <router-view />
    </div>
  </shapla-dashboard>
</template>

<style lang="scss">
@import "style.scss";

.shapla-vue-components-demo {
  &.shapla-dashboard {
    // For Desktop
    &:not(.is-mobile) {
      .shapla-dashboard-content {
        width: calc(100% - var(--shapla-dashboard-sidenav-width));
        margin-left: var(--shapla-dashboard-sidenav-width);
      }
    }

    .shapla-dashboard-content__inner {
      overflow-x: hidden;
    }
  }
}

.app-docs-sidenav {
  .shapla-sidenav__background,
  .shapla-sidenav__body {
    top: var(--shapla-dashboard-header-height);
  }

  &:not(.is-mobile) {
    .shapla-sidenav__body {
      z-index: 0;
    }
  }

  .shapla-sidenav__content {
    height: calc(100% - var(--shapla-dashboard-header-height));
  }
}
</style>
