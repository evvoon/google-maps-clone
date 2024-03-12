/// <reference types="vite/client" />
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
