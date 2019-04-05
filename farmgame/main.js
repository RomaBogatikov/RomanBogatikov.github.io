console.log('heyyy!');

const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const apiKEY = "APPID=9cb8c52c107e169c583442deeb0a7c0d";
// const cityID = "id=" + 2172797;
const cityName = "Bridgeport";
const queryURL = baseURL + 'q=' + cityName + '&' + apiKEY;
let weather;
let tempKelvin;
let tempFahrenheit;


// get data from API (weather)
const getData = () => {
  $.ajax({
      url: queryURL,
      type: "GET",
      data: {
      }
  }).then((data) => {
    alert("Retrieved " + data.length + " records from the dataset!");
    // console.log(data);
    weather = data;
    console.log(weather);
    console.log(weather.main.temp);
    tempKelvin = parseInt(weather.main.temp);
    tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;
    console.log(tempFahrenheit)

  });
}


// document onready function
$( () => {

  getData();

}) // end of document onready function







// Example of API response:

// {"coord":
// {"lon":145.77,"lat":-16.92},
// "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
// "base":"cmc stations",
// "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
// "wind":{"speed":5.1,"deg":150},
// "clouds":{"all":75},
// "rain":{"3h":3},
// "dt":1435658272,
// "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
// "id":2172797,
// "name":"Cairns",
// "cod":200}



// Pseudocode
// when the game loads, ask what city do you want to start your farm in
