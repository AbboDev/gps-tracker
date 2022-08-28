<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="column no-wrap" style="height: 100%">
        <q-item-label header> Menù di navigazione </q-item-label>

        <q-item clickable v-ripple @click="showHistoryPath">
          <q-item-section avatar>
            <q-icon name="route" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="$store.state.app.showHistoryPath">Nascondi percorso fatto</q-item-label>
            <q-item-label v-else>Mostra percorso fatto</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="addUser">
          <q-item-section avatar>
            <q-icon name="group_add" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Aggiungi dispositivo</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-scroll-area style="height: 100%">
          <q-item v-for="(item, index) in getCurrentHistoryFormatted()" :key="`history-${index}`" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-scroll-area>
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
    showHistoryPath() {
      void this.$store.dispatch('app/toggleHistoryPath');
    },
    addUser() {
      this.$q
        .dialog({
          title: 'Prompt',
          message: 'Inserisci il codice del dispositivo',
          prompt: {
            model: '',
            type: 'text', // optional
          },
          cancel: true,
          persistent: false,
        })
        .onOk((id: string) => {
          void this.$store.dispatch('app/addNewUser', id);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
});
</script>
