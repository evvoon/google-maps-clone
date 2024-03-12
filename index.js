/// <reference types="vite/client" />
import { pwaAssetsHead } from "virtual:pwa-assets/head";
import { pwaInfo } from "virtual:pwa-info";
import { registerSW } from "virtual:pwa-register";

if (pwaInfo && import.meta.env.PROD) {
  registerSW({
    immediate: true,
    onRegistered(r) {
      // uncomment following code if you want check for updates
      // r && setInterval(() => {
      //    console.log('Checking for sw update')
      //    r.update()
      // }, 20000 /* 20s for testing purposes */)
      console.log(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
}); // browser can get location with this API call

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: center, // starting position [lng, lat]
    zoom: 15, // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );
}

function errorLocation() {
  setupMap([13.193, 55.7035]);
}
