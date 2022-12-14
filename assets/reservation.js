var startDate = []
var endDate = []
var daysBetweenDates = []
var confirmTrip= document.getElementById("confirmTrip")
var parseData = JSON.parse(localStorage.getItem("ProjectCampLastSelectedCampsiteRecord"))
var campsiteName= parseData[1]
document.getElementById("campsiteName").innerHTML= " "+campsiteName
//datepicker function, does not work with event listener but can be called with normal function
//2 date piickers, one start date and one end date
$( function() {
  $( ".firstdatepicker" ).datepicker({
    minDate: new Date(),
    autoSize: true,
    onSelect: function (selectedDate){
      //document.getElementsByClassName("seconddatepicker").setAttribute("disabled", false),
      $(".seconddatepicker").datepicker("option", "minDate", selectedDate);
      document.querySelector(".seconddatepicker").removeAttribute("disabled", false)
      startDate.pop(selectedDate);
      startDate.push(selectedDate);
      
    } 
  });
} );
$( function() {
  $( ".seconddatepicker" ).datepicker({
    autoSize: true,
    onSelect: function(selectedDate){
        confirmTrip.classList.remove("invisible")
        endDate.pop(selectedDate)
        endDate.push(selectedDate)
    }
    
  });
} );
// dynamically printing the date pickers to the page
function printDatePicker(){
  var date1 = document.getElementById("date1")//where you want the dates to appear
  var date2 = document.getElementById("date2")
  var start = document.createElement("input")
  var end = document.createElement("input")
  console.log(start)
  start.setAttribute("type","text")
  start.setAttribute("placeholder", "Start Date")
  start.setAttribute("readonly", true)
  start.classList.add("firstdatepicker")
  date1.appendChild(start) //where you want the dates to appear
  end.setAttribute("type","text")
  end.setAttribute("placeholder", "End Date")
  end.setAttribute("disabled", false)
  end.setAttribute("readonly", true)
  end.classList.add("seconddatepicker")
  date2.appendChild(end) //where you want the dates to appear
}

printDatePicker()

//set this function to an event listener button after dates are confirmed to return days between
function returnDateDiffInDays(){
console.log(startDate)
console.log(endDate)
var date1 = new Date (startDate)
var date2 = new Date (endDate[0])
var miliseconds = date2.getTime() - date1.getTime()
var days = miliseconds/ (1000 * 3600 * 24)
daysBetweenDates.pop(days)
daysBetweenDates.push(days)
document.querySelector(".firstdatepicker").setAttribute("disabled", true)
document.querySelector(".seconddatepicker").setAttribute("disabled", true)
document.getElementById("confirmTrip").classList.add("invisible")
document.getElementById("bookedtrip").classList.remove("invisible")
localStorage.setItem("startdate", startDate)
localStorage.setItem("enddate", endDate)
document.getElementById("home").classList.remove("invisible")
document.getElementById("veiwtrip").classList.remove("invisible")
localStorage.setItem("reservation", "You have one reservation to " + campsiteName + " from " + startDate + " to " + endDate + ".")
}

document.getElementById("confirmTrip").addEventListener("click", returnDateDiffInDays)