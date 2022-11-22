// GLOBAL VARIABLES
var campLongitude = null
var campLatitude = null

// an event listener for the click of the button that generates a fetch-query for campsite data at the "ridb.recreation.gov" website.
//document.querySelector(".btn-show").addEventListener("click", function() {
//  campInfo();
//  window.scrollTo(#campsiteFetchResponseDataDisplayArea);
//)};

// Query/Fetch to the "ridb.recreation.gov" website API to gather Colorado campsite information records for  viewing by the user.
// Display the results response of the current campsite information query/fetch in a display section that is at the bottom of the webpage.
campInfo();
//
function campInfo() {  // CAMPSITE INFORMATION QUERY-FETCH FUNCTION
//
// var requestUrl = 'https://ridb.recreation.gov/api/v1/campsites?&apikey=0805c920-ab89-46c8-b485-9b22b9515693';
var apiKey = "0805c920-ab89-46c8-b485-9b22b9515693";  // 0805c920-ab89-46c8-b485-9b22b9515693
var requestUrlBase = "https://ridb.recreation.gov/api/v1/facilities";  // the Recreation.gov website
var requestRecordLimit = 500;  // to be set by user specification/selection
var requestQueryString = "?query=camp&limit=" + requestRecordLimit + "&offset=0&state=CO&apikey=" + apiKey;  // &radius=9.75 ???
var requestUrlApi = requestUrlBase + requestQueryString;
var data = null;
//
// the variables that represent the webpage main content areas (divs) that will contain the searched-for campsite information
var campsiteFetchResponseDataDisplayArea = document.getElementById("campsiteFetchResponseDataDisplayArea");
var campsiteRecordsList = document.getElementById("campsiteRecordsList");
//
//fetch api for weather, lat being latitude, lon being longitude and cnt being the number of days for forcasting MAXIMUM OF 16 DAYS
var requestWeatherUrl = "api.openweathermap.org/data/2.5/forecast/daily?lat="+campLatitude+"&lon="+campLongitude+"&cnt="+10+"&appid="+weatherApiKey
var requestWeatherUrlTest = "api.openweathermap.org/data/2.5/forecast/daily?lat=-104.99&lon=39.74&cnt=10&appid="+weatherApiKey
var weatherApiKey = "4010f19181a054df4e43fad094631122"
//
// the API fetch-transmit function ahd the API response-process functions
function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
        if (response.status === 400) {
          campsiteRecordsList.textContent = "FETCH ERROR: " + response.status;
          console.log(response);
        }
      return response.json();
  }) .then(function(data){
    console.log(data);
    var campsiteFetchResponseData = data.RECDATA;  // the campsite data component of the response data object
    var newCampsiteRecord = null;
    var newCampsiteRecordContent = null;
    var newCampsiteRecordSeparator = null;
    var campsiteRecordObjectFieldProcessing = null;
    //
    // the title of the display area that is for the listing of all of the searched-for campsite records
    newDisplayAreaTitleSection = document.createElement("div");
    newDisplayAreaTitleSection.id = "campsiteDisplayAreaTitleSection";
    newDisplayAreaTitleSection.innerHTML = "<p>" + "Detail Information About Searched-For Colorado Campsites" + "</p>";
    newDisplayAreaTitleSection.innerHTML = newDisplayAreaTitleSection.innerHTML + "<p>" + "<span style='font-size: 15px'>" + 
     "( CURRENT SEARCH QUERY CRITERIA: ** ALL ON-RECORD COLORADO CAMPSITES ** )" + "</span>" + "</p>";
    campsiteFetchResponseDataDisplayArea.appendChild(newDisplayAreaTitleSection);
    $("#campsiteDisplayAreaTitleSection").insertBefore("#campsiteRecordsList");
    // the main navigation bar area of the records list display area
    newMainRecordsListNavigationBarArea = document.createElement("div");
    newMainRecordsListNavigationBarArea.id = "recordsListNavigationBarSection";
    newMainRecordsListNavigationBarArea.innerHTML = "<p>" + "-- Main Records List Navigation Bar Area --" + "</p>";
    newMainRecordsListNavigationBarArea.innerHTML = newMainRecordsListNavigationBarArea.innerHTML + 
     "[ \"RECORD SEARCH CRITERIA SPECIFICATION\" FIELD ] &nbsp&nbsp&nbsp " + 
     "[ \"CAMPSITE RECORD SEARCH\" BUTTON ] &nbsp&nbsp&nbsp " + 
     "[ \"CAMPSITE DETAIL SEARCH ON PAGE\" BUTTON ]";
    campsiteRecordsList.appendChild(newMainRecordsListNavigationBarArea);
    //
    // Process through the campsite record information of the response data object that was returned from the fetch query
    // and then...for each record...dynamically build the display area of the campsite information display area (div).
    for (fetchDataLoopIndex = 0; fetchDataLoopIndex < data.RECDATA.length ; fetchDataLoopIndex++) {  // 
      // a new campsite record overall container div for border and possible linking and event tracking (per a querySelectorAll array)
      newCampsiteRecord = document.createElement("div");
      newCampsiteRecord.className = "campsiteRecord";
      campsiteRecordsList.appendChild(newCampsiteRecord);
      // the campsite name
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordName";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityName;
      newCampsiteRecordContent.innerHTML = "<p>" + campsiteRecordObjectFieldProcessing + "</p>";
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // a section for the main detail about the campsite record
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordContent";
      newCampsiteRecordContent.innerHTML = "<p>" + "&nbsp" + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityDescription;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + campsiteRecordObjectFieldProcessing;
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // a section for the additional directions information (if any) about the campsite record
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordContent";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityDirections;
      newCampsiteRecordContent.innerHTML = "<p>" + "Other Direction Information (if any): " + campsiteRecordObjectFieldProcessing + "</p>";
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // a section for the other miscellaneous information (if any) about the campsite record
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordContent";
      newCampsiteRecordContent.innerHTML = "<p>" + "&nbsp" + "</p>";
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Miscellaneous Information (if known; if any):" + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityPhone;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Phone Number: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityEmail;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Email Address: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityUseFeeDescription;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Usage Fee: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).Reservable;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Reservation Option: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).StayLimit;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Stay Limit: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).Keywords;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Additional Descriptive Keywords: " + 
        campsiteRecordObjectFieldProcessing + "</p>";
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // possible available campsite pictures
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordPictures";
      newCampsiteRecordContent.innerHTML = "<p>" + "Available Pictures: " + "</p>";
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + 
       "( PICTURE LINKS THAT CAN BE JUMPED TO OR PERHAPS THE PICTURES CAN EXPAND IN THIS DISPLAY BOX (TBD) )" + "</p>";
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // the campsite map location information (for linking to a Map API system/process if possible for automatic button functionality)
      newCampsiteRecordContent = document.createElement("div");
      newCampsiteRecordContent.className = "campsiteRecordLocation";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLatitude;
      newCampsiteRecordContent.innerHTML = "MAP COORDINATES: &nbsp&nbsp&nbsp&nbsp&nbsp Latitude: " + 
        campsiteRecordObjectFieldProcessing;
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLongitude;
        // Also add code to save the campsite location longitude value in the script global variable for eventual possible map display
        // VARIABLE/FIELD: "campLongitude"
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp Longitude: " + 
        campsiteRecordObjectFieldProcessing;
        // Also add code to save the campsite location latitude value in the script global variable for eventual possible map display
        // VARIABLE/FIELD: "campLatitude"
      campsiteRecordObjectFieldProcessing = newCampsiteRecordContent.innerHTML;
      newCampsiteRecordContent.innerHTML = "<p>" + campsiteRecordObjectFieldProcessing + "</p>";
      campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityMapURL;
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Map URL (if any): " +  
        campsiteRecordObjectFieldProcessing +  "</p>";
      newCampsiteRecord.appendChild(newCampsiteRecordContent);
      // record separator section; probably also to be used for a record-section navigation panel (such as to link to map/weather details)
      newCampsiteRecordSeparator = document.createElement("div");
      newCampsiteRecordSeparator.className = "campsiteRecordSeparator";
      newCampsiteRecordSeparator.innerHTML = "<p>" + "Individual-Record Navigation Bar Area" + "</p>";
      newCampsiteRecordSeparator.innerHTML = newCampsiteRecordSeparator.innerHTML + 
      "[ \"DISPLAY CAMPSITE LOCATION ON MAP\" BUTTON ] &nbsp&nbsp&nbsp " + 
      "[ \"NEW CAMPSITE RECORD SEARCH\" BUTTON (JUMP TO TOP OF LIST SECTION) ]";
      newCampsiteRecord.appendChild(newCampsiteRecordSeparator);      
    }
  });
}
//
getApi(requestUrlApi);
//
// NOTE: CAMPSITE API FIELDS THAT ARE USED:
//
// Enabled  (boolean; only 'true' are sent/displayed)
//
// FacilityName
//
// FacilityLatitude
// FacilityLongitude
// FacilityMapURL
//
// FacilityPhone
// FacilityEmail
// FacilityUseFeeDescription
// Reservable  (boolean)
// StayLimit
// Keywords
//
}
// END: CAMPSITE INFORMATION QUERY-FETCH FUNCTION

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
// var startDate = []
// var endDate = []
// var daysBetweenDates = []
// //datepicker function, does not work with event listener but can be called with normal function
// $( function() {
//   $( ".firstdatepicker" ).datepicker({
//     minDate: new Date(),
//     autoSize: true,
//     onClose: function (selectedDate){
//       //document.getElementsByClassName("seconddatepicker").setAttribute("disabled", false),
//       $(".seconddatepicker").datepicker("option", "minDate", selectedDate);
//       startDate.pop(selectedDate);
//       startDate.push(selectedDate);
      
//     } 
//   });
// } );
// $( function() {
//   $( ".seconddatepicker" ).datepicker({
//     autoSize: true,
//     onClose: function(selectedDate){
//       endDate.pop(selectedDate)
//       endDate.push(selectedDate)
//     }
    
//   });
// } );

// function printDatePicker(){
//   var tester = document.getElementById("unique")//where you want the dates to appear
//   var start = document.createElement("input")
//   var end = document.createElement("input")
//   console.log(start)
//   start.setAttribute("type","text")
//   start.setAttribute("placeholder", "Start Date")
//   start.setAttribute("readonly", true)
//   start.classList.add("firstdatepicker")
//   tester.appendChild(start) //where you want the dates to appear
//   end.setAttribute("type","text")
//   end.setAttribute("placeholder", "End Date")
//   end.setAttribute("readonly", true)
//   end.classList.add("seconddatepicker")
//   tester.appendChild(end) //where you want the dates to appear
// }

// printDatePicker()

// //set this function to an event listener button after dates are confirmed to return days between
// function returnDateDiffInDays(){
// console.log(startDate)
// console.log(endDate)
// var date1 = new Date (startDate[0])
// var date2 = new Date (endDate[0])
// var miliseconds = date2.getTime() - date1.getTime()
// var days = miliseconds/ (1000 * 3600 * 24)
// daysBetweenDates.pop(days)
// daysBetweenDates.push(days)
// }

//document.getElementById("tester2").addEventListener("click", returnDateDiffInDays) //click the good button and it will populate the days between array

//api.  fetch(requestUrl)
// weather API test function
//  function getWeatherApi(requestWeatherUrlTest) {
//    fetch(requestWeatherUrlTest)
//      .then(function (response) {
//          if (response.status === 400) {
//            campsiteRecordsList.textContent = "FETCH ERROR: " + response.status;
//            console.log(response);
//         }
//       return response.json();
//   }) .then(function(data){
//     console.log(data)});
//   }
