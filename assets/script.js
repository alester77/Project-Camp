// var requestUrl = 'https://ridb.recreation.gov/api/v1/campsites?&apikey=0805c920-ab89-46c8-b485-9b22b9515693';
var key = "apikey=0805c920-ab89-46c8-b485-9b22b9515693"
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





















