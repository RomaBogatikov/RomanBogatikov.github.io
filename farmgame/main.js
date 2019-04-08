console.log('heyyy!');

// const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
// const apiKEY = "APPID=9cb8c52c107e169c583442deeb0a7c0d";
// const cityID = "id=" + 2172797;
// let cityName;
// let queryURL;
// let weather;
// let tempKelvin;
// let tempFahrenheit;

let chickenFactory;
let cowFactory;
let goatFactory;
let sheepFactory;
let farmer;


// class Farmer (loanAmount needs to be passed)

class Farmer {
  constructor (loanAmount, loanPaymentYearly, weatherCoef) {
    this.barn = [];
    this.field = [];
    this.loanAmount = loanAmount;
    this.loanPaymentYearly = loanPaymentYearly;
    this.weatherCoef = weatherCoef;
    this.farmerAccount = 0;
    this.earnedThisYear = 0;
    this.tempFahrenheit = tempFahrenheit;
  }
  // function to buy animals from the store (when the animal is clicked)
  buyAnimal = (event) => {
    console.log('this=', this);
    console.log('farmer=', farmer);
    // get class of clicked element
    const clickedClass = $(event.currentTarget).attr('class');
    // console.log('costtobuy=', chickenFactory.costToBuy);
    console.log('clicked', clickedClass);
    // check the class of clicked picture and generate a corresponding animal + append corresponding picture to the barn
    if (clickedClass === 'chicken') {
      if (chickenFactory.costToBuy <= (this).farmerAccount) {
        chickenFactory.generateAnimal(farmer);
        appendPicture(event);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'cow') {
      if (cowFactory.costToBuy <= this.farmerAccount) {
        cowFactory.generateAnimal(farmer);
        appendPicture(event);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'goat') {
      if (goatFactory.costToBuy <= this.farmerAccount) {
        goatFactory.generateAnimal(farmer);
        appendPicture(event);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'sheep') {
      if (sheepFactory.costToBuy <= this.farmerAccount) {
        sheepFactory.generateAnimal(farmer);
        appendPicture(event);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    }

    console.log('event.currentTarget=', $(event.currentTarget).attr('class'));
    // const clickedImgSrc = $(event.currentTarget).attr('src');
    // const $newImg = $('<img>').attr('src', clickedImgSrc);
    // $('.barn > .barn_field_contents').append($newImg);
    // console.log('farmer=', this);
    // chickenFactory.generateAnimal(farmer)
    console.log('farmer=', this);
  }


  // function to buy a barn from the borrowed money
  buyBarn () {
    alert('You bought a barn for $45000, now you can buy chikens, cows, goats or sheep and earn income each year');
    this.farmerAccount = this.loanAmount - 45000;
  }

  // function to perform calculations when button 'Next year' is clicked
  nextYear = () => {
    // set earnedThisYear to 0 before the function runs
    this.earnedThisYear = 0;
    // calculate earnedThisYear
    for (let animal of this.barn) {
      console.log('this.barn=', this.barn);
      console.log('animal.profitYearly=', animal);
      this.earnedThisYear += animal.profitYearly * this.weatherCoef;
    }
    // subtract payment for the loan (loanPaymentYearly) from loanAmount
    this.loanAmount -= this.loanPaymentYearly;
    // add (earnedThisYear - loanPaymentYearly) to farmerAccount
    this.farmerAccount += this.earnedThisYear - this.loanPaymentYearly;
    console.log(this);
  }

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
  constructor(animal, costToBuy, profitYearly) {
    super(costToBuy, profitYearly);
    this.animal = animal
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

// create a factory to generate new animals
class Factory {
  constructor(animal, costToBuy, profitYearly, farmer) {
    this.animal = animal;
    this.costToBuy = costToBuy;
    this.profitYearly = profitYearly;
    this.animals = farmer.barn;
  }
  generateAnimal (farmer) {
    const newAnimal = new BarnFarmAsset(this.animal, this.costToBuy, this.profitYearly);
    this.animals.push(newAnimal);
    // when a new animal is generated, that means farmer bought it
    farmer.farmerAccount -= this.costToBuy;
  }
  findCAnimal (index) {
    return this.animals[index];
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

// function to append picture to barn when it is clicked in store
const appendPicture = (event) => {
  const clickedImgSrc = $(event.currentTarget).attr('src');
  const $newImg = $('<img>').attr('src', clickedImgSrc);
  $('.barn > .barn_field_contents').append($newImg);
}

console.log(calculateLoanPayment(100000));

// function to set weather_coef
const setWeatherCoef = (tempFahrenheit) => {
  if (tempFahrenheit >= 60) {
    alert('The temperatures in the region your farm is located are too high. You will only be able to earn 80% of maximum income');
    return 0.8;
  } else if (tempFahrenheit <= 50) {
    alert('The temperatures in the region your farm is located are too low. You will only be able to earn 70% of maximum income');
    return 0.7;
  } else {
    alert('Your farm is located in a nice climate. You will earn maximum possible income.')
    return 1;
  }
}

// build query to send API request
const buildQueryForWeather = () => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
  const apiKEY = "APPID=9cb8c52c107e169c583442deeb0a7c0d";
  const cityName = prompt('Please enter your city:');
  console.log('cityname=', cityName);
  const queryURL = baseURL + 'q=' + cityName + '&' + apiKEY;
  return queryURL;
};

// get data from API (weather)
const getDataFromWeather = (queryURL) => {
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
    console.log('tempFahrenheit=', tempFahrenheit);
    let weatherCoef = setWeatherCoef(tempFahrenheit);

    // get user input (loan amount)
    let loanAmount = getLoanAmount();
    let loanPaymentYearly = calculateLoanPayment(loanAmount);

    // create a farmer
    farmer = new Farmer(loanAmount, loanPaymentYearly, weatherCoef);
    // console.log('farmer=', farmer);

    // notify that the user has enough money to purchase a barn for $45000
    farmer.buyBarn();

    // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
    chickenFactory = new Factory('chicken',4000, 14000, farmer);
    cowFactory = new Factory('cow', 7000, 17000, farmer);
    goatFactory = new Factory('goat', 6000, 16000, farmer);
    sheepFactory = new Factory('sheep', 5000, 15000, farmer);

    console.log(chickenFactory);

    $('.img_container > .chicken').on('click', farmer.buyAnimal);
    $('.img_container > .cow').on('click', farmer.buyAnimal);
    $('.img_container > .goat').on('click', farmer.buyAnimal);
    $('.img_container > .sheep').on('click', farmer.buyAnimal);

    $('.btn_next_year').on('click', farmer.nextYear)

    console.log('farmer=', farmer);
    // return farmer;

  });
}


// get user input (city name)
const queryURL = buildQueryForWeather();
// get weather data from the API
getDataFromWeather(queryURL);




    // // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
    // const chickenFactory = new Factory('chicken',4000, 14000, farmer);
    // const cowFactory = new Factory('cow', 7000, 17000, farmer);
    // const goatFactory = new Factory('goat', 6000, 16000, farmer);
    // const sheepFactory = new Factory('sheep', 5000, 15000, farmer);

    // console.log(chickenFactory);

// // get user input (loan amount)
// let loanAmount = getLoanAmount();
// let loanPaymentYearly = calculateLoanPayment(loanAmount);

// // create a farmer
// const farmer = new Farmer(loanAmount, loanPaymentYearly);
// // console.log('farmer=', farmer);

// // notify that the user has enough money to purchase a barn for $45000
// farmer.buyBarn();
// console.log('farmer=', farmer);

// // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
// const chickenFactory = new Factory('chicken',4000, 14000, farmer);
// const cowFactory = new Factory('cow', 7000, 17000, farmer);
// const goatFactory = new Factory('goat', 6000, 16000, farmer);
// const sheepFactory = new Factory('sheep', 5000, 15000, farmer);

// console.log(chickenFactory);



// document onready function
$( () => {



  // console.log($('.barn').css('line-height'));

  // $('.img_container > .chicken').on('click', farmer.buyAnimal);
  // $('.img_container > .cow').on('click', farmer.buyAnimal);
  // $('.img_container > .goat').on('click', farmer.buyAnimal);
  // $('.img_container > .sheep').on('click', farmer.buyAnimal);

  // $('.btn_next_year').on('click', farmer.nextYear)




  // chickenFactory.generateAnimal();
  // chickenFactory.generateAnimal();
  // console.log('farmer=', farmer);
  // console.log(chickenFactory);


  // (event) => {
  //   // get clicked image src attribute
  //   const clickedImgSrc = $(event.currentTarget).attr('src');
  //   // console.log(clickedImgSrc);
  //   // create new img tag with clicked image source attribute
  //   const $newImg = $('<img>').attr('src', clickedImgSrc);
  //   // console.log($newImg);
  //   // append newImg to barn
  //   $('.barn > .barn_field_contents').append($newImg);
  //   // generate a new chicken belonging to the farmer
  //   chickenFactory.generateAnimal(farmer);
  //   console.log('farmer=', farmer);
  // }




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
