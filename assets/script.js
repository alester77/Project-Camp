

///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: GLOBAL VARIABLES
//
//


//var campLongitude = null;  // a previous interface idea
//var campLatitude = null;  // a previous interface idea
//
var apiKey = "0805c920-ab89-46c8-b485-9b22b9515693";  // 0805c920-ab89-46c8-b485-9b22b9515693
var requestUrlBase = "https://ridb.recreation.gov/api/v1/facilities";  // the Recreation.gov website
var queryCriteria = "";  // the search criteria component of the next campsite information record search
var requestRecordListLimit = 5;  // default display value; but to be custom-set by user specification/selection
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
var campsiteMediaURL = "";  // from API information data element "Media.URL"
//
var campsitesPrimaryInformation = [];
  // an array of the entire list of current-query campsite records
  // FIELDS/ELEMENTS FOR EACH RECORD:
  // [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, 
  // campsiteLatitude, campsiteLongitude, campsiteZIPCode, campsiteMediaURL];
var newCampsiteRecordListIsGenerated = false;
var theCurrentSelectedCampsiteRecordInformation = ["", "", "", "", "", "", "", ""];
  // an array of the information fields of the selected campsite record
  // saved in the local storage location (as "ProjectCampLastSelectedCampsiteRecord") for later access/processing 
  // and viewing 
  // FIELDS/ELEMENTS FOR EACH RECORD: REFER TO ABOVE.
var thePreviousSelectedCampsiteRecordInformation = ["", "", "", "", "", "", "", ""];
  // an array for loading from local storage and then storing the previous saved campsite information record
//
var newCampsiteRecordIsSelected = false;
var applicationProcessStatus = "";
// Set/Display a status to indicate about a possible processing delay during the initial record load.
applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
//"STATUS: NEW SESSION START";  // for various status messages
//
var campsiteRecordsNameQuerySearchInputField = null;
var campsiteRecordsNameQueryButton = null;
var campsiteRecordsNameQuerySearchRecordAmountField = null;
var campsiteRecordsNameQuerySearchRecordAmountPreviousField = null;
//
// MORE GLOBAL VARIABLES: FOR THE FETCH/RESPONSE DATA PROCESS FOR CAMPSITE RECORDS
//
var campsiteFetchResponseData = null;  
  // the campsite data component of the response data object
// the variables that represent the webpage main content areas (divs) that will contain the searched-for campsite 
// information
//var campsiteFetchResponseDataDisplayArea = document.getElementById("campsiteFetchResponseDataDisplayArea");
var campsiteRecordsListContainer = document.getElementById("campsiteRecordsListContainer");
//var campsiteRecordsListMainNavigationBar = document.getElementById("campsiteRecordsListMainNavigationBar");
//var mainRecordsListNavigationBarSpan = null;
//var mainRecordsListNavigationBarArea = null;
//var mainRecordsListNavigationBarAreaField = null;
//var mainRecordsListNavigationBarAreaButton = null;
var campsiteRecordsList = null;
// var newCampsiteRecord = null;
// var newCampsiteRecordContent = null;
// var newCampsiteRecordSeparatorSection = null;
// var campsiteRecordObjectFieldProcessing = null;


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: Initialization/Starting page-onload function calls and processes and settings:
//
//


// the main starting button that is at the top of the entire campsite list display area upon application start
var generateCampsiteRecordListButton = document.getElementById("generateCampsiteInformationRecordListButton");
// the title of the display area that is for the listing of all of the searched-for campsite records
var campsiteListTitleSection = document.getElementById("campsiteDisplayAreaTitleSection");
campsiteListTitleSection.style.height = "1px";
var campsiteListTitle = document.getElementById("campsiteDisplayAreaTitle");
campsiteListTitle.innerHTML = "Search At Below For Information About Colorado Campsites!";
campsiteListTitle.style.visibility = "hidden";
var campsiteRecordQuerySearchCriteria = document.getElementById("campsiteRecordListQueryCriteriaStatusField");
campsiteRecordQuerySearchCriteria.innerHTML = "( CURRENT SEARCH QUERY CRITERIA: ** Only Some Example Campsite Information Records **  )";
campsiteRecordQuerySearchCriteria.innerHTML = campsiteRecordQuerySearchCriteria.innerHTML + "<br>" + "<br>" + "(Note: Use the search Criteria field and the Generate button to search in and retrieve from the API system database.)";
campsiteRecordQuerySearchCriteria.innerHTML = campsiteRecordQuerySearchCriteria.innerHTML + "<br>" + "(Note: Use Ctrl+F to search in the retrieved database records when they are listed on the screen.)";
campsiteRecordQuerySearchCriteria.innerHTML = campsiteRecordQuerySearchCriteria.innerHTML + "<br>" + "(Note: If a desired search does not work then you can try it again because the API connection is occasionally busy/choppy.)";
campsiteRecordQuerySearchCriteria.style.visibility = "hidden";
generateCampsiteRecordListButton.style.display = "inline";
// the campsite list display area upon application start; initially hidden
// the area for the record list that is generated
var campsiteRecordListDisplayArea = document.getElementById("campsiteRecordsListContainer");
campsiteRecordListDisplayArea.style.display = "none";
//campsiteRecordListDisplayArea.style.height = "1px";
var hideCampsiteRecordListAreaButton = document.getElementById("hideCampsiteRecordListDisplayAreaButton");
// Initially hide the campsite record list display area so it can be displayed only when the user wants to
// generate a campsite record list.
hideCampsiteRecordListAreaButton.style.display = "none";
// Load from local storage the previously-saved variable (if any) that holds the length amount of the entire
// list of campsite records that were retrieved during the previous campsite search.
if (JSON.parse(localStorage.getItem("ProjectCampCampsitePreviousSearchRecordListAmount") != null)) {
  requestPreviousRecordListLimit = JSON.parse(localStorage.getItem("ProjectCampCampsitePreviousSearchRecordListAmount"));
}
// Load from local storage for later viewing the previously-saved array variable that holds the record of the
// previous selected campsite record that was retrieved during the previous campsite search.
if (JSON.parse(localStorage.getItem("ProjectCampLastSelectedCampsiteRecord") != null)) {
  thePreviousSelectedCampsiteRecordInformation = 
    JSON.parse(localStorage.getItem("ProjectCampLastSelectedCampsiteRecord"));
}
//
// <-- Enhancement: Load and optionally search in (for quicker speed) the last-saved all-record array instead of
//     fetching from the API system. Set routine refreshes from the API system.
//
// <-- Enhancement: Insert code for a display of the previously selected campsite record in the normal template.
//


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: Event Listener functions and Event-Listener-related functions:
//
//


generateCampsiteRecordListButton.addEventListener("click", function() {
  // on the section title; displayed only when the list is displayed; not the button that is on the campsite records
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
    displayMainCampsiteRecordsDisplayAreaNavigationBar();
    // Set/Display a status to indicate about a possible processing delay during the initial record load.
    applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
    document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
    GenerateNewCampsiteListProcessing();
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
  // Set/Display a status to indicate about a possible processing delay.
  applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
  document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
  //
  if (newCampsiteRecordListIsGenerated == true) {
    // The current generation process was initiated from the button that is in the header section navigation bar 
    // on top of a generated record list in which case some extra validation processing is necessary before when a 
    // new list can be generated; In the other/false case...the application is being started and a record list is 
    // not yet generated and therefore a default search can be used to generate an short example record list.
    //
    // Disable the generate-query button so it cannot be clicked at more than 1 time.
    campsiteRecordsNameQueryButton.disabled = true;
    // Clear/Initialize new storage arrays for the new retrieved/responded campsite data.
    campsitesPrimaryInformation = [];
    theCurrentSelectedCampsiteRecordInformation = ["", "", "", "", "", "", "", ""];
    campsiteFetchResponseData = [];
    //
    // validation of criteria
    // POSSIBLE ADDITIONAL VALIDATION TBD PER PENDING EMAIL RESPONSE FROM RIDB.RECREATION.ORG IT DEPARTMENT.
    //
    // validation of record amount
    //window.alert(requestRecordListLimit);
    if ((requestRecordListLimit <= 0) || (requestRecordListLimit > 300) || (isNaN(requestRecordListLimit))) {
      requestRecordListLimit = 1;
      document.getElementById("recordRetrievedAmountDisplayField").value = "1";
      applicationProcessStatus = "-- ERROR WITH NUMERICAL INPUT; RE-TRY IF NECESSARY --";
      document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
      //window.alert(requestRecordListLimit);
    }
    if (queryCriteria == "Type criteria text for the next search.") {
      //window.alert(queryCriteria);
      queryCriteria = "";
    }
    //  Copy the query criteria text to the span line that displays that text for reference/reminder purposes.
    if (queryCriteria == "") {
      campsiteRecordQuerySearchCriteria.innerHTML = "( CURRENT SEARCH QUERY CRITERIA: NO CRITERIA -- RETRIEVE ALL RECORDS UNTIL LIMIT )";
    }
    else {
      campsiteRecordQuerySearchCriteria.innerHTML = "( CURRENT SEARCH QUERY CRITERIA: ONLY RECORDS THAT CONTAIN \"" + queryCriteria + "\" UNTIL LIMIT )";
    }
    //window.alert(queryCriteria);
  }
  // Prepare to call/fetch to the API fetch-transmit function and the API response-process functions that are for
  // the gathering of the main overall campsite information and the building/displaying of the webpage area that is
  // for that information.
  //
  // gather the components of the query string text:
  // for variable "requestQueryStringCampsiteInformation" 
  //   = "?query=" + queryCriteria + "&limit=" + requestRecordListLimit + 
  //     "&offset=0&full=true&state=CO&sort=Name&apikey=" + apiKey;
  // then variable "requestUrlApi" = requestUrlBase + requestQueryStringCampsiteInformation
  // which is sent "getApi(requestUrlApi)" function to store campsite record data in the variable
  // EXAMPLE URL: https://ridb.recreation.gov/api/v1/facilities?query=camp&limit=250&offset=0&full=true&state=CO
  // &sort=Name&apikey=0805c920-ab89-46c8-b485-9b22b9515693
  // This API process works with the search options that are described on the RIDB.RECREATION.GOV 
  // website: "https://ridb.recreation.gov/docs".
  var requestQueryStringCampsiteInformation = "?query=" + queryCriteria + "&limit=" + requestRecordListLimit + 
  "&offset=0&full=true&state=CO&sort=Name&apikey=" + apiKey;
  var requestUrlApi = requestUrlBase + requestQueryStringCampsiteInformation;
  //
  // Generate/Fetch the new campsite information query by using the API database system.
  //
  // <-- Enhancement: Insert a "Cancel Query" toggle display button functionality.
  //
  goFetchAndProcessAPIResponseCampsiteInformation(requestUrlApi);
  //
  // Update previous record/search information on the screen after the generation of the new list.
  document.getElementById("previousSelectedCampsiteRecordDisplayField").value = 
  getAndFormatSummaryPreviousListRecordSelection();
  document.getElementById("recordPreviousRetrievedAmountDisplayField").innerHTML = "PREVIOUS SEARCH RECORD AMOUNT: " + 
    "&nbsp&nbsp&nbsp" + requestPreviousRecordListLimit;
  //
}


// a supplemental service function for the "Display This Campsite Location On The Map" Button
function setIdOfCurrentCampsiteRecordSelection(passedCampsiteRecordIDNumber, passedProcessMode) {
  // a global-available service function that is for the "Display This Campsite Location On The Map" button
  // of the campsite record navigation area;
  newCampsiteRecordIsSelected = true;
  newCampsiteRecordListIsGenerated = false;
  // Copy/Save/Post the information of the current user-selected retrieved campsite information record and save it
  // to the global-available campsite information array:
  // theCurrentSelectedCampsiteRecordInformation = [campsiteIDNumber, campsiteName, campsiteIDHTML, 
  // campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, campsiteLatitude, campsiteLongitude, campsiteZIPCode, 
  // campsiteMediaURL];
  theCurrentSelectedCampsiteRecordInformation = campsitesPrimaryInformation[passedCampsiteRecordIDNumber];
  // test record content:
  //window.alert("Current Selected Record: " + theCurrentSelectedCampsiteRecordInformation.toString());
  //window.alert("Current Selected Record: " + campsitesPrimaryInformation[passedCampsiteRecordIDNumber]);
  // Save a copy of the selected record to a global variable and to local storage for later viewing.
  localStorage.setItem("ProjectCampLastSelectedCampsiteRecord", 
    JSON.stringify(theCurrentSelectedCampsiteRecordInformation));
  // Update previous record selection information.
  thePreviousSelectedCampsiteRecordInformation = theCurrentSelectedCampsiteRecordInformation;
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
  //   "campsiteZIPCode: " + campsiteZIPCode + "\n" + 
  //   "campsiteMediaURL: " + campsiteMediaURL);
  ///////////////////////////////////////////////
  // for Alexa's map process
  if (passedProcessMode == "Map") {
    location.replace("./map.html");  //  the URL of the Campsite Map feature sub-webpage
  }
  ///////////////////////////////////////////////
  // for Max's reservation-/date-picker-related process
  if (passedProcessMode == "Reservation") {
    location.replace("./reservation.html");  //  the URL of the Campsite Reservation feature sub-webpage
  }
  ///////////////////////////////////////////////
  // for Todd's weather forecast feature
  if (passedProcessMode == "Weather") {
    location.replace("./weather.html");  //  the URL of the Campsite Weather feature sub-webpage
  ///////////////////////////////////////////////
  // for Scott's or Logan's notes planning page enhancement feature process
  // ...
  ///////////////////////////////////////////////
  // for a button for Scott's or Logan's notes-save enhancement feature process   
  // ...
  // for the desired/applicable description information of the current campsite information
  // <campsite array reference statements>
  // <localStorage statements>
  ///////////////////////////////////////////////
  }
}


///////////////////////////////////////////////
//
// CAMPSITE RECORD PROCESS: General Functions:
//
//


function getAndFormatSummaryPreviousListRecordSelection() {
  var parseProcessingField = "\n" + "\n" + "LAST SELECTED CAMPSITE RECORD:" + "\n" + 
    "(Scroll Down)" + "\n" + "\n";
  var elementLabel = "";
  var elementValue = "";
  for (parseLoop = 0; parseLoop < thePreviousSelectedCampsiteRecordInformation.length; parseLoop++) {
    switch (parseLoop) {
      // FIELDS/ELEMENTS FOR EACH RECORD: REFER TO ABOVE.
      // [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, 
      // campsiteLatitude, campsiteLongitude, campsiteZIPCode];
      case 0: elementLabel = "ID: "; 
        break;
      case 1: elementLabel = "Name: "; 
        break;
      case 2: elementLabel = "";  // HTML ID (not necessary for the user to see)
        break;
      case 3: elementLabel = "Phone Number: "; 
        break;
      case 4: elementLabel = "Address: "; 
        break;
      case 5: elementLabel = "Email Address: "; 
        break;
      case 6: elementLabel = "Latitude Coordinate: "; 
        break;
      case 7: elementLabel = "Longitude Coordinate: "; 
        break;
      case 8: elementLabel = "ZIP Code: "; 
        break;
      case 9: elementLabel = "";  // Media URL (not necessary for including in this display section)
        break;
      }
    elementValue = thePreviousSelectedCampsiteRecordInformation[parseLoop] + "\n";
    if ((parseLoop == 2) || (parseLoop == 9)){
      elementValue = "";
    }
  parseProcessingField = parseProcessingField + elementLabel + elementValue;
  }
  return parseProcessingField;
}
  

// build and display the main campsite records display area navigation bar when the application is started.
function displayMainCampsiteRecordsDisplayAreaNavigationBar() {
  // Parse-Process the display field value that is for displaying the previous selected campsite record (if any).
  //window.alert(thePreviousSelectedCampsiteRecordInformation);
  //
  var thePreviousSelectedCampsiteRecordInformationParsed = getAndFormatSummaryPreviousListRecordSelection();
  //
  campsiteRecordsListMainNavigationBar = document.createElement("div");
  campsiteRecordsListMainNavigationBar.id = "campsiteRecordsListMainNavigationBar";
  campsiteRecordsListContainer.appendChild(campsiteRecordsListMainNavigationBar);
  // the upper part of the main navigation area
  newMainRecordsListNavigationBarArea = document.createElement("div");
  newMainRecordsListNavigationBarArea.id = "recordsListNavigationBarSection";
  newMainRecordsListNavigationBarArea.innerHTML = "<h2>" + "Campsite List Navigation Bar" + "</h2>";
  campsiteRecordsListMainNavigationBar.appendChild(newMainRecordsListNavigationBarArea);
  // a field of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("input");
  newMainRecordsListNavigationBarAreaField.id = "recordSearchCriteriaSpecificationField";
  newMainRecordsListNavigationBarAreaField.value = "Type criteria text for the next search.";
  newMainRecordsListNavigationBarAreaField.style.width = "35%";
  newMainRecordsListNavigationBarAreaField.style.padding = "5px";
  newMainRecordsListNavigationBarAreaField.setAttribute ("placeholder", "Search for sites...")
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  newMainRecordsListNavigationBarAreaField.addEventListener("click", function() {
    this.value = "";
  });
  // a button of the main navigation area
  newMainRecordsListNavigationBarAreaButton = document.createElement("button");
  newMainRecordsListNavigationBarAreaButton.id = "campsiteRecordSearchButton";
  newMainRecordsListNavigationBarAreaButton.innerHTML = "Generate a New Campsite List";
  newMainRecordsListNavigationBarAreaButton.style.width = "auto";
  newMainRecordsListNavigationBarAreaButton.style.height = "auto";
  newMainRecordsListNavigationBarAreaButton.style.marginLeft = "30px";
  newMainRecordsListNavigationBarAreaButton.style.marginRight = "30px";
  newMainRecordsListNavigationBarAreaButton.style.padding = "10px";
  newMainRecordsListNavigationBarAreaButton.style.verticalAlign = "middle";
  newMainRecordsListNavigationBarAreaButton.style.color = "white";
  newMainRecordsListNavigationBarAreaButton.style.backgroundColor = "darkgray";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaButton);
  campsiteRecordsNameQueryButton = document.getElementById("campsiteRecordSearchButton");
  newMainRecordsListNavigationBarAreaButton.addEventListener("click", function() {
    queryCriteria = document.getElementById("recordSearchCriteriaSpecificationField").value;
    //window.alert(queryCriteria);
    requestRecordListLimit = document.getElementById("recordRetrievedAmountDisplayField").value;
    //window.alert(requestRecordListLimit);
    GenerateNewCampsiteListProcessing();
  });
  // the middle part of the main navigation area
  newMainRecordsListNavigationBarArea = document.createElement("div");
  newMainRecordsListNavigationBarArea.id = "recordsListNavigationBarSection";
  newMainRecordsListNavigationBarArea.style.justifyItems = "center";
  campsiteRecordsListMainNavigationBar.appendChild(newMainRecordsListNavigationBarArea);
  // a field label of the main navigation area
  newMainRecordsListNavigationBarSpan = document.createElement("span");
  newMainRecordsListNavigationBarSpan.id = "recordRetrievedAmountDisplayFieldLabel";
  newMainRecordsListNavigationBarSpan.innerHTML = "Maximum Amount of Records:";
  newMainRecordsListNavigationBarSpan.style.color = "white";
  newMainRecordsListNavigationBarSpan.style.width = "50%";
  newMainRecordsListNavigationBarSpan.style.fontSize = "15px";
  newMainRecordsListNavigationBarSpan.style.textAlign = "right";
  newMainRecordsListNavigationBarSpan.style.margin = "0px";
  newMainRecordsListNavigationBarSpan.style.padding = "15px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarSpan);
  // a field of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("input");
  newMainRecordsListNavigationBarAreaField.id = "recordRetrievedAmountDisplayField";
  newMainRecordsListNavigationBarAreaField.value = requestRecordListLimit;
  newMainRecordsListNavigationBarAreaField.style.width = "10%";
  newMainRecordsListNavigationBarAreaField.style.marginLeft = "0px";
  newMainRecordsListNavigationBarAreaField.style.padding = "5px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  newMainRecordsListNavigationBarAreaField.addEventListener("click", function() {
    this.value = "";
  });
  // a field label of the main navigation area
  newMainRecordsListNavigationBarSpan = document.createElement("span");
  newMainRecordsListNavigationBarSpan.id = "recordRetrievedAmountDisplayFieldLabel";
  newMainRecordsListNavigationBarSpan.innerHTML = " ( valid amounts: 1 to 300 )";
  newMainRecordsListNavigationBarSpan.style.color = "white";
  newMainRecordsListNavigationBarSpan.style.width = "40%";
  newMainRecordsListNavigationBarSpan.style.fontSize = "15px";
  newMainRecordsListNavigationBarSpan.style.textAlign = "left";
  newMainRecordsListNavigationBarSpan.style.margin = "0px";
  newMainRecordsListNavigationBarSpan.style.padding = "15px";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarSpan);
  // the lower part of the main navigation area
  newMainRecordsListNavigationBarArea = document.createElement("div");
  newMainRecordsListNavigationBarArea.id = "recordsListNavigationBarSection";
  campsiteRecordsListMainNavigationBar.appendChild(newMainRecordsListNavigationBarArea);
  // a display area of the lower part of the main navigation area
  newMainRecordsListNavigationBarAreaField = document.createElement("div");
  newMainRecordsListNavigationBarAreaField.id = "recordPreviousRetrievedAmountDisplayField";
  newMainRecordsListNavigationBarAreaField.innerHTML = "PREVIOUS SEARCH RECORD AMOUNT: " + "&nbsp&nbsp&nbsp" + 
    requestPreviousRecordListLimit;
  newMainRecordsListNavigationBarAreaField.style.color = "white";
  newMainRecordsListNavigationBarAreaField.style.width = "100%";
  newMainRecordsListNavigationBarAreaField.style.textAlign = "center";
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  // the lower part of the display area that is for displaying the previous selected campsite record (if any)
  newMainRecordsListNavigationBarAreaField = document.createElement("textarea");
  newMainRecordsListNavigationBarAreaField.id = "previousSelectedCampsiteRecordDisplayField";
  newMainRecordsListNavigationBarAreaField.value = thePreviousSelectedCampsiteRecordInformationParsed;
  newMainRecordsListNavigationBarAreaField.setAttribute("readonly", "readonly");
  newMainRecordsListNavigationBarAreaField.style.width = "80%";
  newMainRecordsListNavigationBarAreaField.style.height = "80px";
  newMainRecordsListNavigationBarAreaField.style.textAlign = "center";
  newMainRecordsListNavigationBarAreaField.style.paddingLeft = "5px";
  newMainRecordsListNavigationBarAreaField.style.paddingRight = "5px";
  newMainRecordsListNavigationBarAreaField.style.backgroundColor = "white";
  newMainRecordsListNavigationBarAreaField.setAttribute("overflow", "auto");
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  // the application status bar
  newMainRecordsListNavigationBarAreaField = document.createElement("textarea");
  newMainRecordsListNavigationBarAreaField.id = "campsiteRecordListProcessStatusDisplay";
  newMainRecordsListNavigationBarAreaField.value = applicationProcessStatus;
  newMainRecordsListNavigationBarAreaField.setAttribute("readonly", "readonly");
  newMainRecordsListNavigationBarAreaField.style.width = "80%";
  newMainRecordsListNavigationBarAreaField.style.height = "30px";
  newMainRecordsListNavigationBarAreaField.style.color = "orange";
  newMainRecordsListNavigationBarAreaField.style.fontWeight = "bold";
  newMainRecordsListNavigationBarAreaField.style.textAlign = "center";
  newMainRecordsListNavigationBarAreaField.style.padding = "5px";
  newMainRecordsListNavigationBarAreaField.style.backgroundColor = "white";
  newMainRecordsListNavigationBarAreaField.setAttribute("overflow", "auto");
  newMainRecordsListNavigationBarArea.appendChild(newMainRecordsListNavigationBarAreaField);
  // Add an empty "campsiteRecordsList" display area/div to prime that dynamic record-list build process...which 
  // starts with a removing of the current display area to start a new display process.
  campsiteRecordsList = document.createElement("div");
  campsiteRecordsList.id = "campsiteRecordsList";
  campsiteRecordsListContainer.appendChild(campsiteRecordsList); 
}


// the API fetch-transmit function and data response-return process function
function goFetchAndProcessAPIResponseCampsiteInformation(passedRequestUrlApi) {
  // sub-functional purpose: buildAndDisplayCampsiteRecordsDisplayList 
  //
  // This function does a call/fetch to the API fetch-transmit function and the API response-process functions that 
  // are for the gathering of the main overall campsite information and the building/displaying of the webpage area 
  // that is for that information; at website: "https://ridb.recreation.gov/".
  //
  // Get/Fetch to the API system to obtain new data for the new campsite records list. If the fetch process is 
  // successful...then parse-process the data and display it in the new list area.
  var data = null;
  fetch(passedRequestUrlApi)
    .then(function (response) {
        if (response.status === 400) {
          campsiteRecordsList.textContent = "API FETCH ERROR:" + "<br>" + response.status;
          console.log("Campsite API fetch process error: " + response);
        }
      return response.json();
  }) .then(function(data){
    // Set/Display a status to indicate about a possible processing delay.
    applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
    document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
    //
    console.log(data);
    // Set the campsite data component of the response data object.
    var campsiteFetchResponseData = data.RECDATA;
    // Remove the previous campsite records list.
    campsiteRecordsList.remove();
    // Create a new blank campsite records list area.
    campsiteRecordsList = document.createElement("div");
    campsiteRecordsList.id = "campsiteRecordsList";
    campsiteRecordsListContainer.appendChild(campsiteRecordsList);
    // Process through the campsite record information of the response data object that was returned from the fetch
    // query and then...for each record...dynamically build the display area of the campsite information display 
    // area (div).
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
    for (fetchDataLoopIndex = 0; fetchDataLoopIndex < campsiteFetchResponseData.length ; fetchDataLoopIndex++) { 
      //
      // Set/Display a status to indicate about a possible processing delay.
      applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
      document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
      //
      // a new campsite record overall container div for border and possible linking and event tracking 
      // (per a querySelectorAll array)
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
      var startIndex = 0;
      while (processing_campsiteRecordObjectFieldProcessing.indexOf("<IMG", startIndex) != -1 ) { 
        // Step 2: End_index = getIndex "/>" after Step 1 Start_index;
        var endIndex =  campsiteRecordObjectFieldProcessing.indexOf("/>", (startIndex + 4));
        //console.log("startIndex: " + startIndex + "; endIndex: " + endIndex);
        //console.log("remove: " + campsiteRecordObjectFieldProcessing.substring(startIndex, (endIndex + 2)));
        remove_string = campsiteRecordObjectFieldProcessing.substring(startIndex, (endIndex + 2));
        campsiteRecordObjectFieldProcessing = campsiteRecordObjectFieldProcessing.replace(remove_string, "");
        // Step 3: Remove from Start_index to End_index;
        // string.indexOf(searchvalue, start)    (string.indexOf("/>", indexOf("<img>"))
        // IndexOf()	Returns the index (position) of the first occurrence of a value in a string
        startIndex = endIndex + 3;     
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
        newCampsiteRecordContent.innerHTML = newCampsiteRecordContent.innerHTML + 
          campsiteFetchResponseData[fetchDataLoopIndex].MEDIA[0].URL;
          campsiteMediaURL = campsiteFetchResponseData[fetchDataLoopIndex].MEDIA[0].URL;
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
      newCampsiteRecordSeparatorSection.innerHTML = "<h2>" + "Navigation For The Above Campsite Record" + "</h2>";
      newCampsiteRecordSeparatorSection.style.backgroundColor = "rgb(94, 93, 109)";
        // a dark-gray color for the panel; an override from CSS for special record highlight/orientation separation
      newCampsiteRecord.appendChild(newCampsiteRecordSeparatorSection);
      // the buttons of the record navigation area
      newCampsiteRecordSeparatorSectionButton = document.createElement("button");
      //////////////////////////////////////////////////////
      // for a button for Alexa's Map feature process
      newCampsiteRecordSeparatorSectionButton.id = fetchDataLoopIndex;  // displayCampsiteLocationOnMapButton
      newCampsiteRecordSeparatorSectionButton.innerHTML = "Display This Campsite Location On The Map";
      newCampsiteRecordSeparatorSectionButton.style.width = "auto";
      newCampsiteRecordSeparatorSectionButton.style.height = "auto";
      newCampsiteRecordSeparatorSectionButton.style.marginLeft = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginRight = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginBottom = "10px";
      newCampsiteRecordSeparatorSectionButton.style.padding = "10px";
      newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
      newCampsiteRecordSeparatorSectionButton.style.color = "white";
      newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
      newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
      // Event Listener/Handler for the "displayCampsiteLocationOnMapButton" button of the selected campsite.
      newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
        // console.log("selected campsite record index: " + this.id);  // the record array ID; not campsite ID
        // console.log(campsitesPrimaryInformation[this.id][6]); // "campsiteLatitude"
        // console.log(campsitesPrimaryInformation[this.id][7]); // "campsiteLongitude"
        //window.alert(this.id);
        setIdOfCurrentCampsiteRecordSelection(this.id, "Map");
      });
      //////////////////////////////////////////////////////
      // for the buttons of the record navigation area
      newCampsiteRecordSeparatorSectionButton = document.createElement("button");
      newCampsiteRecordSeparatorSectionButton.id = fetchDataLoopIndex;  // displayCampsiteWeatherForecastButton
      newCampsiteRecordSeparatorSectionButton.innerHTML = "View Campsite Location Weather Forecast";
      newCampsiteRecordSeparatorSectionButton.style.width = "auto";
      newCampsiteRecordSeparatorSectionButton.style.height = "auto";
      newCampsiteRecordSeparatorSectionButton.style.marginLeft = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginRight = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginBottom = "10px";
      newCampsiteRecordSeparatorSectionButton.style.padding = "10px";
      newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
      newCampsiteRecordSeparatorSectionButton.style.color = "white";
      newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
      newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
      // Event Listener/Handler for the "displayCampsiteWeatherForecastButton" button of the selected campsite.
      newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
        setIdOfCurrentCampsiteRecordSelection(this.id, "Weather");
      });
      //////////////////////////////////////////////////////
      // for a button for Max's Reservation feature process for the buttons of the record navigation area
      newCampsiteRecordSeparatorSectionButton = document.createElement("button");
      newCampsiteRecordSeparatorSectionButton.id = fetchDataLoopIndex;  // displayCampsiteReservationButton
      newCampsiteRecordSeparatorSectionButton.innerHTML = "Make a Reservation for this Campsite";
      newCampsiteRecordSeparatorSectionButton.style.width = "auto";
      newCampsiteRecordSeparatorSectionButton.style.height = "auto";
      newCampsiteRecordSeparatorSectionButton.style.marginLeft = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginRight = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginBottom = "10px";
      newCampsiteRecordSeparatorSectionButton.style.padding = "10px";
      newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
      newCampsiteRecordSeparatorSectionButton.style.color = "white";
      newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
      newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
      // Event Listener/Handler for the "displayCampsiteReservationButton" button of the selected campsite.
      newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
        setIdOfCurrentCampsiteRecordSelection(this.id, "Reservation");
      });
      //////////////////////////////////////////////////////
      // for a button for Scott's or Logan's "Notes -- Planning Page" enhancement feature process for the buttons of 
      // of the record navigation area
      // <code (based on the other button sections)>
      // ...
      //newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
      //  possible extra eventServiceFunction(this.id, "Notes") for extra processing;
      //  or simply a window.replace("<URL>\<path>") screen change
      //});
      //////////////////////////////////////////////////////
      // for a button for Scott's or Logan's "Notes -- Record Save" enhancement feature process for the buttons of the  
      // record navigation area
      // <code (based on the other button sections)>
      // ...
      //newCampsiteRecordSeparatorSectionButton.addEventListener("click", function() {
      //  possible extra eventServiceFunction(this.id, "Notes") for extra processing;
      //  or simply a window.replace("<URL>\<path>") screen change
      //}); 
      //////////////////////////////////////////////////////
      // the buttons of the record navigation area
      newCampsiteRecordSeparatorSectionButton = document.createElement("button");
      newCampsiteRecordSeparatorSectionButton.id = "generateADifferentCampsiteListButton";
      newCampsiteRecordSeparatorSectionButton.innerHTML = 
        "<a href=#campsiteDisplayAreaTitleSection>Go Up To Generate A New Campsite List</a>";
      newCampsiteRecordSeparatorSectionButton.style.width = "auto";
      newCampsiteRecordSeparatorSectionButton.style.height = "auto";
      newCampsiteRecordSeparatorSectionButton.style.marginLeft = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginRight = "50px";
      newCampsiteRecordSeparatorSectionButton.style.marginBottom = "10px";
      newCampsiteRecordSeparatorSectionButton.style.padding = "10px";
      newCampsiteRecordSeparatorSectionButton.style.verticalAlign = "middle";
      newCampsiteRecordSeparatorSectionButton.style.color = "white";
      newCampsiteRecordSeparatorSectionButton.style.backgroundColor = "darkgray";
      newCampsiteRecordSeparatorSection.appendChild(newCampsiteRecordSeparatorSectionButton);
      // Construct the display record of the current being-processed retrieved campsite information and save it to
      // the processing/displaying array. The ongoing processing of this loop builds and stores the 2-dimensional 
      // array variable that holds the entire list of campsite records that were retrieved during the current 
      // campsite search. Then that array variable is globally-available in the main part of the program for 
      // additional processing.
      campsitesPrimaryInformation[fetchDataLoopIndex] = 
        [campsiteIDNumber, campsiteName, campsiteIDHTML, campsitePhoneNumber, campsiteAddress, campsiteEmailAddress, 
        campsiteLatitude, campsiteLongitude, campsiteZIPCode, campsiteMediaURL];
      // Set/Display a status to indicate about a possible processing delay.
      applicationProcessStatus = "STATUS: **...API DATABASE RECORD QUERY PROCESSING IN-PROGRESS...**";
      document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
      //
      // test record content:
      // window.alert("Array Element Content/Layout: " + "\n" + 
      //   "campsiteIDNumber: " + campsiteIDNumber + "\n" + 
      //   "campsiteName: " + campsiteName + "\n" + 
      //   "campsiteIDHTML: " + campsiteIDHTML + "\n" + 
      //   "campsitePhoneNumber: " + campsitePhoneNumber + "\n" + 
      //   "campsiteAddress: " + campsiteAddress + "\n" + 
      //   "campsiteEmailAddress: " + campsiteEmailAddress + "\n" + 
      //   "campsiteLatitude: " + campsiteLatitude + "\n" + 
      //   "campsiteLongitude: " + campsiteLongitude + "\n" + 
      //   "campsiteZIPCode: " + campsiteZIPCode + "\n" + 
      //   "campsiteMediaURL: " + campsiteMediaURL);
      //
    }  // END: "fetchDataLoopIndex" response for-loop
    //
    newCampsiteRecordListIsGenerated = true;
    newCampsiteRecordIsSelected = false;
    // Test about if 0 records were retrieved from the attempted search criteria.
    if (campsitesPrimaryInformation.length == 0) {
      applicationProcessStatus = "STATUS: -- APPARENTLY NO RECORDS MATCH THAT CRITERIA; " + "\n" + 
        "YOU CAN TRY AGAIN TO MAKE SURE -- ";
      document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
    }
    else {
      applicationProcessStatus = "STATUS: ** RECORD PROCESSING COMPLETED ** ";
      document.getElementById("campsiteRecordListProcessStatusDisplay").value = applicationProcessStatus;
    }
    // Re-enable the generate-query button because the new requested query has been completed.
    campsiteRecordsNameQueryButton.disabled = false;
    // Save to local storage for later retrieval and accessing the array variable that holds the entire list of
    // campsite records that were retrieved during the current campsite search.
    localStorage.setItem("ProjectCampCampsitesPrimaryInformation", JSON.stringify(campsitesPrimaryInformation));
    // Save to local storage for later retrieval and viewing the record amount of the current (then previous) 
    // record search.
    requestPreviousRecordListLimit = campsitesPrimaryInformation.length;
    localStorage.setItem("ProjectCampCampsitePreviousSearchRecordListAmount", 
      JSON.stringify(requestPreviousRecordListLimit));
  });
  //
  return; 
}


//
//
// END: CAMPSITE RECORD PROCESS
//
///////////////////////////////////////////////

//////////////////////
// Code for displaying reservation
if(localStorage.getItem("reservation") === null){
  document.getElementById("reservation").innerHTML = "You have no reservations booked at this time."
} else { document.getElementById("reservation").innerHTML = localStorage.getItem("reservation")}