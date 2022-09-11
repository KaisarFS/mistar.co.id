<template>
  <div :class="!errorStr && 'map-wrapper'">
    <MglMap
      v-if="loadMap"
      :accessToken="accessToken"
      :zoom="14"
      :positionOptions="{ enableHighAccuracy: true }"
      :mapStyle.sync="mapStyle"
      :center="coordinates && coordinates"
      :coordinates="coordinates && coordinates"
      :attributionControl="false"
    >
      <MglMarker
        :coordinates="coordinates && coordinates"
        @dragend="dragMarker"
        :draggable="true"
        color="blue"
      />
      <MglGeocoderControl
        :accessToken="accessToken"
        :input="inputSearch"
        @result="handleSearch"
        :options="mapboxOptions"
        :marker="false"
      />
      <MglGeolocateControl position="top-left" />
      <MglNavigationControl position="top-left" />
    </MglMap>

    <div v-if="errorStr">
      {{ errorStr }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MapBox from "mapbox-gl";
import {
  MglMap,
  MglMarker,
  MglGeolocateControl,
  MglNavigationControl
} from "vue-mapbox";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import MglGeocoderControl from "vue-mapbox-geocoder";

export default {
  components: {
    MglMap,
    MglMarker,
    MglGeocoderControl,
    MglGeolocateControl,
    MglNavigationControl
  },
  props: {
    openMap: {
      type: Boolean
    },
    setData: {
      type: Function
    }
  },
  data() {
    return {
      location: null,
      errorStr: null,
      loadMap: false,
      coordinates: [],
      inputSearch: "",
      mapboxOptions: { mapboxgl: MapBox },
      accessToken:
        "pk.eyJ1IjoiYWd1bmdwcmFib3dvIiwiYSI6ImNrNWFkOXN6cjB6N3QzbnBzNThmeHVxa2wifQ.IRaXPiZuBkPCIE2P3O5N2g",
      mapStyle: "mapbox://styles/mapbox/streets-v11"
    };
  },
  watch: {
    openMap(newVal) {
      if (newVal) this.initMap();
    }
  },
  created() {
    this.mapbox = MapBox;
  },
  methods: {
    initMap() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          setTimeout(() => {
            this.loadMap = true;
          }, 200);
          this.mapbox = MapBox;
          this.location = pos;
          this.coordinates = [pos.coords.longitude, pos.coords.latitude];
          // binding form with map info result
          this.getInfoMap(pos.coords.latitude + "," + pos.coords.longitude);
        },
        err => {
          this.loadMap = false;
          this.errorStr = err.message;
        }
      );
    },
    async getInfoMap(lngLat) {
      const res = await axios.get(
        `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${lngLat}&mode=retrieveAddresses&maxresults=1&gen=9&app_id=BdrutESIfQQBUCsq70ES&app_code=NREmJXPu7Cqhwa59QgWqrQ`
      );

      if (res.data && res.data.Response)
        this.setData(res.data.Response.View[0].Result[0].Location);
    },
    dragMarker(e) {
      this.getInfoMap(e.marker._lngLat.lat + "," + e.marker._lngLat.lng);
    },
    handleSearch(res) {
      if (res && res.result) {
        this.coordinates = [res.result.center[0], res.result.center[1]];
        this.getInfoMap(res.result.center[1] + "," + res.result.center[0]);
      }
    }
  }
};
</script>
