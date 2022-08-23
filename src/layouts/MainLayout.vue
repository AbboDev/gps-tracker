<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <q-item
          v-for="(item, index) in getCurrentHistoryFormatted()"
          :key="`history-${index}`"
        >
          <q-item-section>
            <q-item-label>{{ index }} {{ item }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('map');

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters(['getCurrentHistoryFormatted']),
  },

  methods: {
    toggleLeftDrawer() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
