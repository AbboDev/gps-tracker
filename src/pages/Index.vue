<template>
  <q-page class="row items-stretch justify-evenly">
    <l-map> </l-map>
  </q-page>
</template>

<script lang="ts">
import { LMap } from '@vue-leaflet/vue-leaflet';

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LMap,
  },
  name: 'PageIndex',
});
</script>
