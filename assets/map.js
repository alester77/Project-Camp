// Map box 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlc3Rlcjc3IiwiYSI6ImNsYWtpcHBqcTBoMXAzb281MjFlbnh1MTgifQ.CrtkBGN16fbxAobQEpAXdQ';

// this gives a map of the current users location.
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enabledHighAccuracy: true
})

// HEY TODD, LOOK AT ME :)
function successLocation(position) {
console.log(position);
setUpMap([position.coords.longitude, position.coords.latitude]);
}

// default location Denver in case of error finding current location
function errorLocation() {
  setUpMap([-104.99, 39.74])
}

function setUpMap (center) {
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: center,
    zoom: 10
  })

    // this adds little nav buttons to the top
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
   
  });

  map.addControl(directions, "top-left");
}