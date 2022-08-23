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
      >
        >
        <l-popup>
          {{ (item.lat, item.lng) }}
        </l-popup>
      </l-marker>

      <l-polyline
        :lat-lngs="getCurrentHistoryFormatted()"
        color="red"
        v-if="$store.state.app.showHistoryPath"
      />
    </l-map>
  </q-page>
</template>

<script lang="ts">
import { uid, useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('map');

import { Point, UniquePoint } from 'src/store/map/state';

import {
  LMap,
  LPopup,
  LMarker,
  LTileLayer,
  LPolyline,
} from '@vue-leaflet/vue-leaflet';

export default defineComponent({
  components: {
    LMap,
    LPopup,
    LMarker,
    LTileLayer,
    LPolyline,
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
  computed: {
    ...mapGetters(['getCurrentHistoryFormatted']),
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
    addMarker(event: GeolocationPosition): string {
      const id = uid();
      const marker: UniquePoint = {
        id,
        lat: parseFloat(event.coords.latitude.toFixed(8)),
        lng: parseFloat(event.coords.longitude.toFixed(8)),
        history: [],
      };

      void this.$store.dispatch('map/push', marker);

      return id;
    },
    updateMarker(id: string, event: GeolocationPosition): void {
      const position: Point = {
        lat: parseFloat(event.coords.latitude.toFixed(8)),
        lng: parseFloat(event.coords.longitude.toFixed(8)),
      };

      void this.$store.dispatch('map/update', {
        id,
        position,
      });
    },
    showError(error: GeolocationPositionError): void {
      this.$q.notify(error.message);
    },
    changeCenter(center: Point | Event) {
      let newCenter: Point = this.center;

      if (center instanceof Event) {
        console.debug(center);
        // const center = Object.values(event.target.getCenter())
        //   .map((coordinate) => {
        //     return parseFloat(coordinate.toFixed(8));
        //   });
      } else {
        newCenter = center;
      }

      this.center = newCenter;

      void this.$store.dispatch('map/updateCenter', newCenter);
    },
  },
  created() {
    const $q = useQuasar();

    if (!('geolocation' in navigator)) {
      $q.notify('Geolocation is not available.');
      return;
    }

    $q.notify('Fetching geolocation...');

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        $q.notify('Current position fetched!');

        this.changeCenter({
          lat: parseFloat(position.coords.latitude.toFixed(8)),
          lng: parseFloat(position.coords.longitude.toFixed(8)),
        });

        let current = this.$store.state.map.current;
        if (!current) {
          current = this.addMarker(position);
        }

        this.$store
          .dispatch('map/setCurrent', current)
          .then(() => {
            navigator.geolocation.watchPosition(
              (position: GeolocationPosition) => {
                if (this.$store.state.map.current) {
                  this.updateMarker(this.$store.state.map.current, position);
                }
              },
              this.showError.bind(this)
            );
          })
          .catch((error) => {
            console.error(error);
            $q.notify(JSON.stringify(error));
          });
      },
      this.showError.bind(this)
    );
  },
});
</script>
