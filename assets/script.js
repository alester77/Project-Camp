// var requestUrl = 'https://ridb.recreation.gov/api/v1/campsites?&apikey=0805c920-ab89-46c8-b485-9b22b9515693';
var requestUrl = 'https://ridb.recreation.gov/api/v1/facilities?query=camp&limit=50&offset=0&state=CO&radius=9.75&apikey=0805c920-ab89-46c8-b485-9b22b9515693';

// var responseText = document.getElementById('response-text');

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
        // if (response.status === 200) {
        //     // responseText.textContent = response.status;
        //     console.log(response);
        // }
      return response.json();
  }) .then(function(data){
    console.log(data);
  });
}

getApi(requestUrl);



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