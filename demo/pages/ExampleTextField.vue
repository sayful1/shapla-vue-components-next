<template>
  <doc-tab
    heading="Input: Text"
    slug="shapla-input"
    name="ShaplaInput"
    scss-mixin="text-field"
    :properties="properties"
    :desc="descriptions"
  >
    <div class="test-text-field">
      <div class="shapla-columns is-multiline">
        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="default size"
            size="default"
            name="text_field[one]"
          />
        </div>

        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="small size"
            size="small"
          />
        </div>

        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="medium size"
            size="medium"
          />
        </div>

        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="large size"
            size="large"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="Some help text"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="field_two"
            placeholder="Placeholder text"
            help-text="No label"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="field_one"
            label="Full Name *"
            help-text="This field has success status."
            :has-success="true"
            validation-text="Please enter a valid full name"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            label="Full Name *"
            help-text="This field has validation error status"
            validation-text="Please enter a valid full name"
            :has-error="true"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="email"
            label="Email *"
            :has-error="hasEmailError"
            :has-success="hasEmailSuccess"
            help-text="Write a valid email address."
            validation-text="Please enter a valid email"
            @blur="handleBlurEvent"
            @input="handleInputEvent"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="field_two" label="Search field" type="search" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="field_two"
            label="Password field"
            type="password"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="field_two" label="Number field" type="number" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="field_two" label="Telephone field" type="tel" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="field_two" label="Url field" type="url" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="date_field" label="Date field" type="date" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field v-model="time_field" label="Time field" type="time" />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="datetime_field"
            label="Date & Time field"
            type="datetime-local"
          />
        </div>

        <div class="shapla-column is-4-tablet">
          <text-field
            v-model="field_one"
            type="textarea"
            label="Textarea Field"
            help-text="Some help text."
            validation-text="Please enter full address"
          />
        </div>
      </div>
      <div class="shapla-columns is-multiline">
        <div class="shapla-column is-12-tablet">
          <h2>RTL support</h2>
        </div>
        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            label="Text field"
            help-text="default size"
            size="default"
            dir="rtl"
          />
        </div>
        <div class="shapla-column is-3-tablet">
          <text-field
            v-model="field_two"
            type="textarea"
            label="Text field"
            help-text="default size"
            size="default"
            dir="rtl"
          />
        </div>
      </div>
    </div>
  </doc-tab>
</template>

<script>
import {ShaplaInput} from "../../src";
import DocTab from "../components/DocTab.vue";
import {computed} from "vue";

export default {
  name: "ExampleTextField",
  components: {
    DocTab,
    "text-field": ShaplaInput,
  },
  setup() {
    const properties = computed(() => ShaplaInput.props);
    const descriptions = {}
    return {properties, descriptions}
  },
  data() {
    return {
      field_one: "default text",
      field_two: "",
      email: "",
      datetime_field: "",
      date_field: "",
      time_field: "",
      hasEmailError: false,
      hasEmailSuccess: false,
      emailValidationText: "write some text",
    };
  },
  methods: {
    handleBlurEvent(value) {
      if (!this.validateEmail(value)) {
        this.hasEmailError = true;
      } else {
        this.hasEmailSuccess = true;
      }
    },
    handleInputEvent() {
      this.hasEmailError = false;
    },
    validateEmail(value) {
      return (
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(
              value
          ) !== false
      );
    },
  },
};
</script>

<style lang="scss">
@import url("https://unpkg.com/@shapla/vue-columns/dist/style.css");

.test-text-field {
  padding: 1rem;
  box-sizing: border-box;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
}
</style>
