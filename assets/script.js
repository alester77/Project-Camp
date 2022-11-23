

///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: GLOBAL VARIABLES
//
//

var campLongitude = null;
var campLatitude = null;
//
var apiKey = "0805c920-ab89-46c8-b485-9b22b9515693";  // 0805c920-ab89-46c8-b485-9b22b9515693
var requestUrlBase = "https://ridb.recreation.gov/api/v1/facilities";  // the Recreation.gov website
var queryCriteria = "";  // The search criteria can be partial words but the criteria seems to be case-sensitive.
var requestRecordListLimit = 5;  // to be set by user specification/selection
var requestPreviousRecordListLimit = "NONE";
//
// Additional Variables for Campsite Record Processing:
var campsiteIDNumber = "";  // from API information data element "FacilityID"
var campsiteName = "";  // from API information data element "FacilityName"
var campsiteIDHTML = "";  // from API information data element "[FacilityID]"+"FacilityName" (without spaces)
var campsitePhoneNumber = "";  // from API information data element "FacilityPhone"
var campsiteEmailAddress = "";  // from API information data element "FACILITYADDRESS"
var campsiteZIPCode = "";  // from API information data element  "FACILITYADDRESS"
var campsiteAddress = "";  // from API information data element "FacilityEmail"
var campsiteLatitude = "";  // from API information data element "FacilityLatitude"
var campsiteLongitude = "";  // from API information data element "FacilityLatitude"
var campsiteMediaURLs = "";  // from API information data element "Media.URL"
//
var campsitesPrimaryInformation = [];  // an array of the entire list of current-query campsite records
  // FIELDS/ELEMENTS FOR EACH RECORD:
  // [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, 
  // campsiteLatitude, campsiteLongitude];
var newCampsiteRecordListIsGenerated = false;
var campsiteSelectedPrimaryInformation = []; // saved in the local storage location (as "Previous-Last Viewed")
  // FIELDS/ELEMENTS:
  // [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, 
  // campsiteLatitude, campsiteLongitude];
var theCurrentSelectedCampsiteRecordInformation = ["", "", "", "", "", "", "", ""];
var newCampsiteRecordIsSelected = false;
var applicationCampsiteRecordStatus = "NEW SESSION";  // for a possible future processing/display feature option
var applicationCampsiteRecordStatusDisplay = document.getElementById("applicationCampsiteRecordStatusDisplay"); 
  // a hidden field that is in the footer section of the main webpage
//
var campsiteRecordsNameQuerySearchInputField = "";
var campsiteRecordsNameQuerySearchInputFieldInput = "";
var campsiteRecordsNameQueryButton = null;
var campsiteRecordsListSearchButton = null;


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: Initialization/Starting page-onload function calls and processes:
//
//


// the main starting button that is at the top of the entire campsite list display area upon application start
var generateCampsiteRecordListButton = document.getElementById("generateCampsiteInformationRecordListButton");
// the title of the display area that is for the listing of all of the searched-for campsite records
var campsiteListTitleSection = document.getElementById("campsiteDisplayAreaTitleSection");
campsiteListTitleSection.style.height = "1px";
var campsiteListTitle = document.getElementById("campsiteDisplayAreaTitle");
campsiteListTitle.innerHTML = "Detail Information About Searched-For Colorado Campsites";
campsiteListTitle.style.visibility = "hidden";
var campsiteRecordQuerySearchCriteria = document.getElementById("campsiteRecordListQueryCriteriaStatusField");
campsiteRecordQuerySearchCriteria.innerHTML = "( CURRENT SEARCH QUERY CRITERIA: ** Only Some Example Campsite Information Records **  )";
campsiteRecordQuerySearchCriteria.style.visibility = "hidden";
generateCampsiteRecordListButton.style.display = "inline";
// the campsite list display area upon application start; initially hidden
// the area for the record list that is generated
var campsiteRecordListDisplayArea = document.getElementById("campsiteRecordsList");
campsiteRecordListDisplayArea.style.display = "none";
//campsiteRecordListDisplayArea.style.height = "1px";
var hideCampsiteRecordListAreaButton = document.getElementById("hideCampsiteRecordListDisplayAreaButton");
// Initially hide the campsite record list display area so it can be displayed only when the user wants to
// generate a campsite record list.
hideCampsiteRecordListAreaButton.style.display = "none";


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: Event Listener functions and Event-Listener-related functions:
//
//


// an event listener for the click of the button that generates a fetch-query for campsite data at the "ridb.recreation.gov" website.
//document.querySelector(".btn-show").addEventListener("click", function() {
//  campInfo();
//  window.scrollTo(#campsiteFetchResponseDataDisplayArea);
//)};
// Query/Fetch to the "ridb.recreation.gov" website API to gather Colorado campsite information records for  viewing by the user.
// Display the results response of the current campsite information query/fetch in a display section that is at the bottom of the webpage.
// campInfo();
//
// function campInfo() {  // CAMPSITE INFORMATION QUERY-FETCH FUNCTION
  //goFetchAndProcessAPIResponseCampsiteInformation();
// }


generateCampsiteRecordListButton.addEventListener("click", function() {
  // the section title; displayed only when the list is displayed
  campsiteListTitleSection.style.height = "auto";
  campsiteListTitle.style.visibility = "visible";
  campsiteRecordQuerySearchCriteria.style.visibility = "visible";
  // the main starting button that is at the top of the entire campsite list display area upon application start
  generateCampsiteRecordListButton.style.display = "none";
  // the campsite list display area upon application start
  campsiteRecordListDisplayArea.style.display = "inline";
  campsiteRecordListDisplayArea.height = "auto";
  // to replace the GenerateCampsiteRecordListButton when it is hidden
  hideCampsiteRecordListAreaButton.style.display = "inline";
  hideCampsiteRecordListAreaButton.height = "auto";
  //
  if (newCampsiteRecordListIsGenerated == false) {
    goFetchAndProcessAPIResponseCampsiteInformation();
  }
});


hideCampsiteRecordListAreaButton.addEventListener("click", function() {
  // the section title; displayed only when the list is displayed
  campsiteListTitleSection.style.height = "auto";
  campsiteListTitle.style.visibility = "hidden";
  campsiteRecordQuerySearchCriteria.style.visibility = "hidden";
  generateCampsiteRecordListButton.style.display = "inline";
  generateCampsiteRecordListButton.height = "auto";
  // the campsite list display area upon application start
  campsiteRecordListDisplayArea.style.display = "none";
  //campsiteRecordListDisplayArea.style.height = "1px";
  campsiteListTitleSection.style.height = "1px";
  //
  hideCampsiteRecordListAreaButton.style.display = "none";
});


function toggleDisplayOfCampsiteRecordListDisplayArea ()  {
  if (campsiteRecordListDisplayArea.style.display == "inline") {
    campsiteRecordListDisplayArea.style.display = "none";
    //campsiteRecordListDisplayArea.style.height = "1px";
    campsiteListTitleSection.style.height = "1px";
    campsiteListTitle.style.visibility = "hidden";
    campsiteRecordQuerySearchCriteria.style.visibility = "hidden";
  }
  else {
    campsiteRecordListDisplayArea.style.display = "inline";
    campsiteListTitleSection.style.height = "auto";
    campsiteListTitle.style.visibility = "visible";
    campsiteRecordQuerySearchCriteria.style.visibility = "visible";
  }
}


// a supplemental service function for the "Generate a New Campsite List" Button
function GenerateNewCampsiteListProcessing() {
  //
  // FROM THE RECORD NAVIGATION PANEL:
  //
  // newCampsiteRecordListIsGenerated = false;
  // an event listener that is for the "Generate a New Campsite List" button
  // Set the visibility attribute of the list area section.
  // newCampsiteRecordIsSelected = false;
  // newCampsiteRecordListIsGenerated = true;
  // <span style='font-size: 15px' id='currentSearchQueryCriteria'>" + 
  //  "( CURRENT SEARCH QUERY CRITERIA: ** NONE **  )" + "</span>" + "</p>";
  //  copy the query text to the span
  // the fields and buttons of the main navigation area
  goFetchAndProcessAPIResponseCampsiteInformation();
}


// a supplemental service function for the "Display This Campsite Location On The Map" Button
function setIdOfCurrentCampsiteRecordSelection(passedCampsiteRecordIDNumber) {
  // a global-available service function that is for the "Display This Campsite Location On The Map" button
  // of the campsite record navigation area;
  // Copy/Save/Post the information of the current user-selected retrieved campsite information record and save it
  // to the global-available status/access campsite information array:
  // theCurrentSelectedCampsiteRecordInformation = [campsiteIDNumber, campsiteName, campsiteIDHTML, 
  // campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, campsiteLatitude, campsiteLongitude, campsiteZIPCode];
  newCampsiteRecordIsSelected = true;
  newCampsiteRecordListIsGenerated = false;
  // Locate/Copy/Post the selected campsite record in the global-available record information array.
  theCurrentSelectedCampsiteRecordInformation = campsitesPrimaryInformation[passedCampsiteRecordIDNumber];
  // Save a copy of the selected record to a global variable and to local storage for later viewing.
  localStorage.setItem("ProjectCampLastSelectedCampsiteRecord", 
    JSON.stringify(theCurrentSelectedCampsiteRecordInformation));
  // test record content:
  // window.alert("Current Selected Record: " + theCurrentSelectedCampsiteRecordInformation.toString());
  // window.alert("Current Selected Record: " + campsitesPrimaryInformation[passedCampsiteRecordIDNumber]);
  // window.alert(
  //   "Last Listed Record:" + "\n" + 
  //   "campsiteIDNumber: " + campsiteIDNumber + "\n" + 
  //   "campsiteName: " + campsiteName + "\n" + 
  //   "campsiteIDHTML: " + campsiteIDHTML + "\n" + 
  //   "campsitePhoneNumber: " + campsitePhoneNumber + "\n" + 
  //   "campsiteAddress: " + campsiteAddress + "\n" + 
  //   "campsiteEmailAddress: " + campsiteEmailAddress + "\n" + 
  //   "campsiteLatitude: " + campsiteLatitude + "\n" + 
  //   "campsiteLongitude: " + campsiteLongitude + "\n" + 
  //   "campsiteZIPCode: " + campsiteZIPCode);
  //////////////////////////////
  //Alexa map process
  location.replace("./map.html");
}


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: General Functions:
//
//


//
function goFetchAndProcessAPIResponseCampsiteInformation() {
  // the API fetch-transmit function and the API response-process functions that are for the gathering of the main overall campsite
  // information and the building/displaying of the webpage area that is for that information
  // EXAMPLE URL: https://ridb.recreation.gov/api/v1/facilities?query=camp&limit=250&offset=0&full=true&state=CO&sort=Name
  // &apikey=0805c920-ab89-46c8-b485-9b22b9515693
  var requestQueryStringCampsiteInformation = "?query=" + queryCriteria + "&limit=" + requestRecordListLimit + "&offset=0&full=true&state=CO&sort=Name&apikey=" + apiKey;
  var requestUrlApi = requestUrlBase + requestQueryStringCampsiteInformation;
  var campsiteFetchResponseData = getApi(requestUrlApi);  // the campsite data component of the response data object
  // the variables that represent the webpage main content areas (divs) that will contain the searched-for campsite information
  var campsiteFetchResponseDataDisplayArea = document.getElementById("campsiteFetchResponseDataDisplayArea");
  var campsiteRecordsList = document.getElementById("campsiteRecordsList");
  var newCampsiteRecord = null;
  var newCampsiteRecordContent = null;
  var newCampsiteRecordSeparatorSection = null;
  var campsiteRecordObjectFieldProcessing = null;
  newCampsiteRecordListIsGenerated = true;
  //
  //
  // NOTE: CAMPSITE API FIELDS THAT ARE USED:
  //
  // Enabled  (boolean; only 'true' are sent/displayed)
  //
  // FacilityName
  // FacilityIDNumber
  //
  // FacilityLatitude
  // FacilityLongitude
  // FacilityMapURL
  //
  // FacilityPhone
  // FacilityEmail
  // FacilityAddress
  // FacilityUseFeeDescription
  // Reservable  (boolean)
  // StayLimit
  // Keywords
  //
  // /Media pictures/videos (secondary database)
  //
  //
  // the main navigation bar area of the records list display area
  newMainRecordsListNavigationBarArea = document.createElement("div");
  newMainRecordsListNavigationBarArea.id = "recordsListNavigationBarSection";
  newMainRecordsListNavigationBarArea.innerHTML = "<h2>" + "Main Records List Navigation Bar Area" + "</h2>";
  campsiteRecordsList.appendChild(newMainRecordsListNavigationBarArea);
  // the fields and buttons of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("input");
  newMainRecordsListNavigationBarAreaField.id = "recordSearchCriteriaSpecificationField";
  //newMainRecordsListNavigationBarAreaField.value = "Type some search text for the next campsite list.";
  newMainRecordsListNavigationBarAreaField.setAttribute ("placeholder", "Search for sites...")
  newMainRecordsListNavigationBarAreaField.style.width = "30%";
  newMainRecordsListNavigationBarAreaField.style.paddingLeft = "5px";
  newMainRecordsListNavigationBarAreaField.style.paddingRight = "5px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  // the fields and buttons of the main navigation area
  newMainRecordsListNavigationBarAreaButton = document.createElement("button");
  newMainRecordsListNavigationBarAreaButton.id = "campsiteRecordSearchButton";
  newMainRecordsListNavigationBarAreaButton.innerHTML = "Generate a New Campsite List";
  newMainRecordsListNavigationBarAreaButton.style.width = "auto";
  newMainRecordsListNavigationBarAreaButton.style.height = "30px";
  newMainRecordsListNavigationBarAreaButton.style.marginLeft = "30px";
  newMainRecordsListNavigationBarAreaButton.style.paddingLeft = "5px";
  newMainRecordsListNavigationBarAreaButton.style.paddingRight = "5px";
  newMainRecordsListNavigationBarAreaButton.style.verticalAlign = "middle";
  newMainRecordsListNavigationBarAreaButton.style.color = "white";
  newMainRecordsListNavigationBarAreaButton.style.backgroundColor = "darkgray";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaButton);
  newMainRecordsListNavigationBarAreaButton.addEventListener("click", function() {
    GenerateNewCampsiteListProcessing();
  });
  // the fields and buttons of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("input");
  newMainRecordsListNavigationBarAreaField.id = "recordRetrievedAmountDisplayField";
  newMainRecordsListNavigationBarAreaField.value = requestRecordListLimit;
  newMainRecordsListNavigationBarAreaField.style.width = "10%";
  newMainRecordsListNavigationBarAreaField.style.marginLeft = "30px";
  newMainRecordsListNavigationBarAreaField.style.paddingLeft = "5px";
  newMainRecordsListNavigationBarAreaField.style.paddingRight = "5px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  // the fields and buttons of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("input");
  newMainRecordsListNavigationBarAreaField.id = "recordPreviousRetrievedAmountDisplayField";
  newMainRecordsListNavigationBarAreaField.value = requestPreviousRecordListLimit;
  newMainRecordsListNavigationBarAreaField.type = "hidden";
  newMainRecordsListNavigationBarAreaField.style.width = "10%";
  newMainRecordsListNavigationBarAreaField.style.marginLeft = "30px";
  newMainRecordsListNavigationBarAreaField.style.paddingLeft = "5px";
  newMainRecordsListNavigationBarAreaField.style.paddingRight = "5px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  //
  // Process through the campsite record information of the response data object that was returned from the fetch query
  // and then...for each record...dynamically build the display area of the campsite information display area (div).
  for (fetchDataLoopIndex = 0; fetchDataLoopIndex < campsiteFetchResponseData.length ; fetchDataLoopIndex++) {  // 
    // a new campsite record overall container div for border and possible linking and event tracking (per a querySelectorAll array)
    newCampsiteRecord = document.createElement("div");
    newCampsiteRecord.className = "campsiteRecord";
    campsiteRecordsList.appendChild(newCampsiteRecord);
    // the campsite name
    newCampsiteRecordContent = document.createElement("div");
    newCampsiteRecordContent.className = "campsiteRecordName";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityName;
    campsiteName = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityName;
    newCampsiteRecordContent.id = "[" + fetchDataLoopIndex + "]" + "_" + ((campsiteName.trim()).replace(" ", "_"));
    campsiteIDHTML = newCampsiteRecordContent.id;
    newCampsiteRecordContent.innerHTML = "<p>" + campsiteRecordObjectFieldProcessing + "</p>";
    newCampsiteRecord.appendChild(newCampsiteRecordContent);
    // the campsite ID; to be used to do a supplemental query that is for obtaining any media data (pictures or/and videos) that are
    // for each campsite (loop/record)
    if (((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityID == null) || 
      ((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityID == "")) {
      campsiteIDNumber = "No Campsite ID Record";  // ID number that is from/in the API database
    }
    else {
    campsiteIDNumber = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityID;
    }
    //window.alert("fetchDataLoopIndex: " + fetchDataLoopIndex);
    //window.alert("campsiteIDNumber: " + campsiteIDNumber);
    //window.alert("campsiteIDHTML: " + campsiteIDHTML)
    //
    // a section for the main detail about the campsite record
    newCampsiteRecordContent = document.createElement("div");
    newCampsiteRecordContent.className = "campsiteRecordContent";
    newCampsiteRecordContent.innerHTML = "<p>" + "&nbsp" + "</p>";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityDescription;
    //console.log("Image Error: " + campsiteRecordObjectFieldProcessing);
    // MINOR CORRECTION TO IMPORT-DATA ERROR (BROKEN/404 <IMG> ELEMENTS IN THE DESCRIPTION FIELD):
    // Step 1: Start_index = getIndex "<img";
    var processing_campsiteRecordObjectFieldProcessing = campsiteRecordObjectFieldProcessing.toUpperCase();
    startIndex = 0;
    while (processing_campsiteRecordObjectFieldProcessing.indexOf("<IMG", startIndex) != -1 ) { 
      // Step 2: End_index = getIndex "/>" after Step 1 Start_index;
      endIndex =  campsiteRecordObjectFieldProcessing.indexOf("/>", (startIndex + 4));
      //console.log("startIndex: " + startIndex + "; endIndex: " + endIndex);
      //console.log("remove: " + campsiteRecordObjectFieldProcessing.substring(startIndex, (endIndex + 2)));
      remove_string = campsiteRecordObjectFieldProcessing.substring(startIndex, (endIndex + 2));
      campsiteRecordObjectFieldProcessing = campsiteRecordObjectFieldProcessing.replace(remove_string, "");
      // Step 3: Remove from Start_index to End_index;
      // string.indexOf(searchvalue, start)    (string.indexOf("/>", indexOf("<img>"))
      // IndexOf()	Returns the index (position) of the first occurrence of a value in a string
      startIndex = endIndex +3;     
    }
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + campsiteRecordObjectFieldProcessing;
    newCampsiteRecord.appendChild(newCampsiteRecordContent);
    // a section for the campsite street/physical address information (if any)
    newCampsiteRecordContent = document.createElement("div");
    newCampsiteRecordContent.className = "campsiteRecordContent";
    newCampsiteRecordContent.innerHTML = "<p>" + "&nbsp" + "</p>";
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "Street/Physical Address (if any): ";
    if ((campsiteFetchResponseData[fetchDataLoopIndex].FACILITYADDRESS == null) || 
      (campsiteFetchResponseData[fetchDataLoopIndex].FACILITYADDRESS == 0)) {
      //window.alert("NULL ADDRESS");
      campsiteAddress = "No Address Record";
    }
    else {
      var basePath = campsiteFetchResponseData[fetchDataLoopIndex].FACILITYADDRESS[0];
      // FacilityStreetAddress1, FacilityStreetAddress2, FacilityStreetAddress3, City, AddressStateCode, PostalCode
      if ((basePath.FacilityStreetAddress1 == "") && (basePath.FacilityStreetAddress2 == "") && (basePath.FacilityStreetAddress3 == "") && 
      (basePath.City == "") && (basePath.AddressStateCode == "") && (basePath.PostalCode == "")) {
      campsiteAddress = "No Address Record";
      campsiteZIPCode = "";
      }
      else {
        campsiteRecordObjectFieldProcessing = basePath.FacilityStreetAddress1 + " " + basePath.FacilityStreetAddress2 + " " + 
        basePath.FacilityStreetAddress3 + " " + basePath.City + " " + basePath.AddressStateCode + " " + basePath.PostalCode;
        campsiteAddress = campsiteRecordObjectFieldProcessing;
        newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + campsiteRecordObjectFieldProcessing;
        campsiteZIPCode = basePath.PostalCode;
      }
    }
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
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Miscellaneous Information (if any):" + "</p>";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityPhone;
    if ((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityPhone == "") {
      campsitePhoneNumber = "No Phone Number Record";
    }
    else {
      campsitePhoneNumber = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityPhone;
    }
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Phone Number: " + 
      campsiteRecordObjectFieldProcessing + "</p>";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityEmail;
    if ((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityEmail == "") {
      campsiteEmailAddress = "No Email Address Record";
    }
    else {
      campsiteEmailAddress = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityEmail;
    }
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
    newCampsiteRecordContent.innerHTML = "<p>" + "Available Picture (if any): " + "</p>";
    if ((campsiteFetchResponseData[fetchDataLoopIndex].MEDIA == null) || 
      (campsiteFetchResponseData[fetchDataLoopIndex].MEDIA == 0)) {
      //window.alert("NULL MEDIA");
    }
    else {
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + campsiteFetchResponseData[fetchDataLoopIndex].
        MEDIA[0].URL;
    }
    newCampsiteRecord.appendChild(newCampsiteRecordContent);
    // the campsite map location information (for linking to a Map API system/process if possible for automatic button functionality)
    newCampsiteRecordContent = document.createElement("div");
    newCampsiteRecordContent.className = "campsiteRecordLocation";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLatitude;
    // Save the campsite location latitude value in the script global variable for eventual possible map display
    // VARIABLE/FIELD: "campsiteLatitude" for this API function; the map API might use a different name
    campsiteLatitude = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLatitude;
    newCampsiteRecordContent.innerHTML = "MAP COORDINATES: &nbsp&nbsp&nbsp&nbsp&nbsp Latitude: " + 
      campsiteRecordObjectFieldProcessing;
    if ((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLatitude == 0) {
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + " (no on-record coordinates)"
      }
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLongitude;
    // Save the campsite location longitude value in the script global variable for eventual possible map display
    // VARIABLE/FIELD: "campsiteLongitude" for this API function; the map API might use a different name
    campsiteLongitude = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLongitude;
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "&nbsp&nbsp&nbsp&nbsp&nbsp Longitude: " + 
      campsiteRecordObjectFieldProcessing;
    if ((campsiteFetchResponseData[fetchDataLoopIndex]).FacilityLongitude == 0) {
      newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + " (no on-record coordinates)"
      }
    campsiteRecordObjectFieldProcessing = newCampsiteRecordContent.innerHTML;
    newCampsiteRecordContent.innerHTML = "<p>" + campsiteRecordObjectFieldProcessing + "</p>";
    campsiteRecordObjectFieldProcessing = (campsiteFetchResponseData[fetchDataLoopIndex]).FacilityMapURL;
    newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + "<p>" + "Map URL (if any): " +  
      campsiteRecordObjectFieldProcessing +  "</p>";
    newCampsiteRecord.appendChild(newCampsiteRecordContent);
    // record separator section; probably also to be used for a record-section navigation panel (such as to link to map/weather details)
    newCampsiteRecordSeparatorSection = document.createElement("div");
    newCampsiteRecordSeparatorSection.className = "campsiteRecordSeparator";
    newCampsiteRecordSeparatorSection.innerHTML = "<h2>" + "Individual-Record Navigation Bar Area" + "</h2>";
    newCampsiteRecord.appendChild(newCampsiteRecordSeparatorSection);
    // the buttons of the main navigation area
    newCampsiteRecordSeparatorSectionButton = document.createElement("button");
    newCampsiteRecordSeparatorSectionButton.id = fetchDataLoopIndex;  // displayCampsiteLocationOnMapButton
    newCampsiteRecordSeparatorSectionButton.innerHTML = "Display This Campsite Location On The Map";
    newCampsiteRecordSeparatorSectionButton.style.width = "auto";
    newCampsiteRecordSeparatorSectionButton.style.height = "30px";
    newCampsiteRecordSeparatorSectionButton.style.marginLeft = "0px";
    newCampsiteRecordSeparatorSectionButton.style.paddingLeft = "5px";
    newCampsiteRecordSeparatorSectionButton.style.paddingRight = "5px";
    newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
    newCampsiteRecordSeparatorSectionButton.style.color = "white";
    newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
    newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
    // Event Listener/Handler for the "displayCampsiteLocationOnMapButton" Button of the selected campsite.
    newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
      // console.log("selected campsite record index: " + this.id);  // the record array ID; not campsite ID
      // console.log(campsitesPrimaryInformation[this.id][6]); // "campsiteLatitude"
      // console.log(campsitesPrimaryInformation[this.id][7]); // "campsiteLongitude"
      setIdOfCurrentCampsiteRecordSelection(this.id);
    });
    // the buttons of the main navigation area
    newCampsiteRecordSeparatorSectionButton = document.createElement("button");
    newCampsiteRecordSeparatorSectionButton.id = "generateADifferentCampsiteListButton";
    newCampsiteRecordSeparatorSectionButton.innerHTML = 
      "<a href=#campsiteDisplayAreaTitleSection>Generate A Different Campsite List</a>";
    newCampsiteRecordSeparatorSectionButton.style.width = "auto";
    newCampsiteRecordSeparatorSectionButton.style.height = "30px";
    newCampsiteRecordSeparatorSectionButton.style.marginLeft = "150px";
    newCampsiteRecordSeparatorSectionButton.style.paddingLeft = "5px";
    newCampsiteRecordSeparatorSectionButton.style.paddingRight = "5px";
    newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
    newCampsiteRecordSeparatorSectionButton.style.color = "white";
    newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
    newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
    // Construct the display record of the current being-processed retrieved campsite information and save it to the processing/displaying array.
    campsitesPrimaryInformation[fetchDataLoopIndex] = 
      [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, campsiteLatitude, 
      campsiteLongitude, campsiteZIPCode];
    // test record content:
    // window.alert(
    //   "campsiteIDNumber: " + campsiteIDNumber + "\n" + 
    //   "campsiteName: " + campsiteName + "\n" + 
    //   "campsiteIDHTML: " + campsiteIDHTML + "\n" + 
    //   "campsitePhoneNumber: " + campsitePhoneNumber + "\n" + 
    //   "campsiteAddress: " + campsiteAddress + "\n" + 
    //   "campsiteEmailAddress: " + campsiteEmailAddress + "\n" + 
    //   "campsiteLatitude: " + campsiteLatitude + "\n" + 
    //   "campsiteLongitude: " + campsiteLongitude + "\n" + 
    //   "campsiteZIPCode: " + campsiteZIPCode); + "\n" + 
    //
  }  // END: "fetchDataLoopIndex" response for-loop
  //
}


// the basic API fetch-transmit function and data response-return function
//fetch api for weather, lat being latitude, lon being longitude and cnt being the number of days for forcasting MAXIMUM OF 16 DAYS
var requestWeatherUrl = "api.openweathermap.org/data/2.5/forecast/daily?lat="+campLatitude+"&lon="+campLongitude+"&cnt="+10+"&appid="+weatherApiKey
var requestWeatherUrlTest = "api.openweathermap.org/data/2.5/forecast/daily?lat=-104.99&lon=39.74&cnt=10&appid="+weatherApiKey
var weatherApiKey = "4010f19181a054df4e43fad094631122"
//
// the API fetch-transmit function ahd the API response-process functions
function getApi(requestUrl) {
  var data = null;
  fetch(requestUrl)
    .then(function (response) {
        if (response.status === 400) {
          campsiteRecordsList.textContent = "FETCH ERROR: " + response.status;
          console.log(response);
        }
      return response.json();
  }) .then(function(data){
    console.log(data);
    var campsiteFetchResponseDataRawObject = data.RECDATA;  // the campsite data component of the response data object
    localStorage.setItem("campsiteFetchResponseDataRawObject", JSON.stringify(campsiteFetchResponseDataRawObject));
  });
  return JSON.parse(localStorage.getItem("campsiteFetchResponseDataRawObject"));
}


//
//
// END: CAMPSITE RECORD PROCESS
//
///////////////////////////////////////////////

