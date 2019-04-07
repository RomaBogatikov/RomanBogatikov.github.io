console.log('heyyy!');

const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const apiKEY = "APPID=9cb8c52c107e169c583442deeb0a7c0d";
// const cityID = "id=" + 2172797;
let cityName;
let queryURL;
let weather;
let tempKelvin;
let tempFahrenheit;


// class Farmer (loanAmount needs to be passed)

class Farmer {
  constructor (loanAmount, loanPaymentYearly) {
    this.barn = [];
    this.field = [];
    this.loanAmount = loanAmount;
    this.loanPaymentYearly = loanPaymentYearly;
    this.farmerAccount = 0;
    this.earnedThisYear = 0;
  }
  // sell assets method can later on go here
}

// class FarmAsset to later construct: chicken, sheep, goat
class FarmAsset {
  constructor (costToBuy, profitYearly) {
    this.costToBuy = costToBuy;
    this.profitYearly = profitYearly;
  }
}

// specify that the user doesn't need to buy new farm animals each year, they just produce income
class BarnFarmAsset extends FarmAsset {
  constructor(costToBuy, profitYearly) {
    super(costToBuy, profitYearly);
    this.needToBuyEachYear = false;
  }
}

// specify that the user needs to buy new seeds to grow plants yearly.
class FieldFarmAsset extends FarmAsset {
  constructor(costToBuy, profitYearly) {
    super(costToBuy, profitYearly);
    this.needToBuyEachYear = true;
  }
}

// create a factory to generate new chickens
class Factory {
  constructor(animal, farmer) {
    this.animal = animal;
    this.costToBuy = 5000;
    this.profitYearly = 15000;
    this.chickens = farmer.barn;
  }
  generateChicken (farmer) {
    const newChicken = new BarnFarmAsset(this.costToBuy, this.profitYearly);
    this.chickens.push(newChicken);
    // when a new chichen is generated, that means farmer bought it
    farmer.farmerAccount -= this.costToBuy;
  }
  findChicken (index) {
    return this.chickens[index];
  }

}





// get user input: loan amount
const getLoanAmount = () => {
  const loanAmount = prompt('To start a farming business you can borrow up to $100,000 at 4% for 30 years. How much do you want to borrow?');
  calculateLoanPayment(loanAmount);
  return parseInt(loanAmount);
}

// calculate yearly payment for your 30-year loan (4%) based on user input
const calculateLoanPayment = (loanAmount) => {
  let loanPaymentYearly = loanAmount * 0.04 * Math.pow( (1 + 0.04), 30 ) / ( Math.pow((1 + 0.04), 30) - 1 );
  console.log(Math.ceil(loanPaymentYearly));
  return Math.ceil(loanPaymentYearly);
}

// function to buy a barn
const buyBarn = (farmer) => {
  alert('You bought a barn for $45000, now you can buy chikens, cows, goats or sheep and earn income each year');
  farmer.farmerAccount = farmer.loanAmount - 45000;

}

console.log(calculateLoanPayment(100000));

// build query to send API request
const buildQueryForWeather = () => {
  cityName = prompt('Please enter your city:');
  console.log('cityname=', cityName);
  queryURL = baseURL + 'q=' + cityName + '&' + apiKEY;
};

// get data from API (weather)
const getDataFromWeather = () => {
  $.ajax({
      url: queryURL,
      type: "GET",
      data: {
      }
  }).then((data) => {
    alert("Retrieved " + data.length + " records from the dataset!");
    // console.log(data);
    weather = data;
    console.log('data from API =', weather);
    tempKelvin = parseInt(weather.main.temp);
    tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;

    console.log('tempKelvin=', tempKelvin);
    console.log('tempFahrenheit=', tempFahrenheit)
  });
}



// document onready function
$( () => {

  // console.log($('.barn').css('line-height'));

  // get user input (city name)
  // buildQueryForWeather();
  // get weather data from the API
  // getDataFromWeather();


  // get user input (loan amount)
  let loanAmount = getLoanAmount();
  let loanPaymentYearly = calculateLoanPayment(loanAmount);

  // create a farmer
  const farmer = new Farmer(loanAmount, loanPaymentYearly);
  console.log('farmer=', farmer);

  // notify that the user has enough money to purchase a barn for $45000
  buyBarn(farmer);
  console.log('farmer=', farmer);

  // create a chicken factory (to be able to click on chiken from the store and it will add to barn)
  const chickenFactory = new Factory('chicken', farmer);
  console.log(chickenFactory);





  // chickenFactory.generateChicken();
  // chickenFactory.generateChicken();
  // console.log('farmer=', farmer);
  // console.log(chickenFactory);

  $('.img_container > .chicken').on('click', (event) => {
    // get clicked image src attribute
    const clickedImgSrc = $(event.currentTarget).attr('src');
    // console.log(clickedImgSrc);
    // create new img tag with clicked image source attribute
    const $newImg = $('<img>').attr('src', clickedImgSrc);;
    // console.log($newImg);
    // append newImg to barn
    $('.barn > .barn_field_contents').append($newImg);
    // generate a new chicken belonging to the farmer
    chickenFactory.generateChicken(farmer);
    console.log('farmer=', farmer);
  }

  )


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
