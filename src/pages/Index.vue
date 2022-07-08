<template>
  <q-page class="row items-stretch justify-evenly">
    <l-map style="height: auto" :tap="false" :zoom="zoom" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />

      <l-marker
        v-for="(item, index) in $store.state.map.points"
        :key="`marker-${index}`"
        :lat-lng="[item.lat, item.lng]"
        draggable
      >
        >
        <l-popup>
          {{ (item.lat, item.lng) }}
        </l-popup>
      </l-marker>

      <l-control-zoom position="bottomright" />
    </l-map>
  </q-page>
</template>

<script lang="ts">
import { uid } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { UniquePoint } from 'src/store/map/state';

import {
  LMap,
  LPopup,
  LMarker,
  LTileLayer,
  LControlZoom,
} from '@vue-leaflet/vue-leaflet';

export default defineComponent({
  components: {
    LMap,
    LPopup,
    LMarker,
    LTileLayer,
    LControlZoom,
  },
  name: 'PageIndex',
  data() {
    const zoom = ref(15);
    return {
      zoom,
      isMoved: false,
      center: this.$store.state.map.center,
      changeZoom(value: number) {
        zoom.value = value;
      },
    };
  },
  watch: {
    '$store.state.map.center'() {
      const newCenter = this.$store.state.map.center;
      console.debug(newCenter);
      // const isEqual = newCenter.length === this.center.length
      //   && newCenter[0] === this.center[0]
      //   && newCenter[1] === this.center[1];

      // if (!isEqual) {
      //   this.center = this.$store.state.map.center;
      // }
    },
  },
  methods: {
    addMarker(event: GeolocationPosition) {
      const id = uid();
      const marker: UniquePoint = {
        id,
        lat: parseFloat(event.coords.latitude.toFixed(8)),
        lng: parseFloat(event.coords.longitude.toFixed(8)),
      };

      this.$q.notify(JSON.stringify(marker));
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.$store.dispatch('map/push', marker);
    },
  },
  created() {
    const $q = useQuasar();

    //do we support geolocation
    if (!('geolocation' in navigator)) {
      $q.notify('Geolocation is not available.');
      return;
    }

    // this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        console.debug(pos);
        // this.gettingLocation = false;
        // this.location = pos;
        $q.notify(`${pos.coords.latitude} ${pos.coords.longitude}`);
        this.addMarker(pos);
      },
      (err) => {
        // this.gettingLocation = false;
        // this.errorStr = err.message;
        $q.notify(err.message);
      }
    );
  },
});
</script>
