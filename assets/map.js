
// getting Lat+Long from the array
var campsiteRecordArray = JSON.parse(localStorage.getItem("ProjectCampLastSelectedCampsiteRecord"));
var coorLong = campsiteRecordArray[7];
var coorLat = campsiteRecordArray[6];
console.log(coorLat + "," + coorLong);




// 6 and 7 are lat and long for Todd's js array


// found through mapBox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlc3Rlcjc3IiwiYSI6ImNsYWtpcHBqcTBoMXAzb281MjFlbnh1MTgifQ.CrtkBGN16fbxAobQEpAXdQ';
const map = new mapboxgl.Map({
container: 'map',
// Default is set to Denver
style: 'mapbox://styles/mapbox/streets-v12',
center: [coorLong, coorLat],
zoom: 10
});

// Given a query in the form "lng, lat" or "lat, lng"

const coordinatesGeocoder = function (query) {
// Match anything which looks like
// decimal degrees coordinate pair.
const matches = query.match(
/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
);
if (!matches) {
return null;
}

function coordinateFeature(lng, lat) {
return {
center: [lng, lat],
geometry: {
type: 'Point',
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ' Lng: ' + lng,
place_type: ['coordinate'],
properties: {},
type: 'Feature'
};
}

const coord1 = Number(matches[1]);
const coord2 = Number(matches[2]);
const geocodes = [];

if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}

if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}

if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}

return geocodes;
};

// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 12,
placeholder: 'Enter Coordinates',
mapboxgl: mapboxgl,
reverseGeocode: true


})


);