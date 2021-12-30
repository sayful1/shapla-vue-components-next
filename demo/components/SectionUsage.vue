<template>
  <section class="section section-usage">
    <h2 class="title">Usage</h2>

    <p>
      To use this component, you need to register it first. You can register
      component <strong>globally</strong> and <strong>locally</strong>
    </p>
    <h3>Global registration:</h3>
    <code-highlight v-if="name2">
      <pre><code>// file main.js|ts
import {<template v-text="name" />,<template v-text="name2" />} from '@shapla/vue-components';

const app = Vue.createApp({})
app.component('<template v-text="slug" />', <template v-text="name" />)
app.component('<template v-text="slug2" />', <template v-text="name2" />)
</code></pre>
    </code-highlight>
    <code-highlight v-if="!name2">
      <pre><code>// file main.js|ts
import {<template v-text="name" />} from '@shapla/vue-components';

const app = Vue.createApp({})
app.component('<template v-text="slug" />', <template v-text="name" />)
</code></pre>
    </code-highlight>
    <h3>Local registration:</h3>
    <code-highlight v-if="!name2">
      <pre><code>// file Hello.vue|ts|tsx|js
import {<template v-text="name" />} from '@shapla/vue-components';
export default {
    name: 'Hello',
    components: { '<template v-text="slug" />' : <template v-text="name" /> }
}</code></pre>
    </code-highlight>
    <code-highlight v-if="name2">
      <pre><code>// file Hello.vue|ts|tsx|js
import {<template v-text="name" />,<template v-text="name2" />} from '@shapla/vue-components';
export default {
    name: 'Hello',
    components: {
        '<template v-text="slug" />' : <template v-text="name" />,
        '<template v-text="slug2" />' : <template v-text="name2" />
    }
}</code></pre>
    </code-highlight>

    <template v-if="scssMixin">
      <h3>Load component style.</h3>
      <code-highlight>
        <pre><code>// file style.scss
@use "@shapla/vue-components/src/index.scss" as shapla;
@include shapla.<template v-text="scssMixin" />;</code></pre>
      </code-highlight>
    </template>
  </section>
</template>

<script>
import CodeHighlight from "../components/CodeHighlight.vue";

export default {
  name: "SectionUsage",
  components: {CodeHighlight},
  props: {
    slug: {type: String, default: ""},
    name: {type: String, default: ""},
    slug2: {type: String, default: ""},
    name2: {type: String, default: ""},
    scssMixin: {type: String, default: ""},
  },
};
</script>
