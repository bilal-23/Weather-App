

/////////////////////////////////
const KEY = `cb7fa1df4f862242c79d99d4e50959e6`;



async function getJSON(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === `404` ||
            data.cod === `401` ||
            data.cod === `429`
        ) {
            throw new Error();
            return;
        }



        return data;

    }
    catch (err) {
        console.error(err);
        throw err;
    }

}

async function getWeather(e) {

    try {
        parentElement.style.visibility = 'hidden';
        parentElement.style.opacity = '0';
        e.preventDefault()
        const cityName = input.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEY}`

        const data = await getJSON(url);
        console.log(data)

        renderData(data);
    }
    catch (err) {
        console.error(err);
    }
}

function renderData(data) {
    const markup = generateMarkup(data);
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML('afterbegin', markup)
    parentElement.style.visibility = 'visible';
    parentElement.style.opacity = '1';

}

function generateMarkup(data) {
    console.log(data.weather[0].main)
    return `
    <div class="row-1">
    <div class="weather-icon">
      <img src="src/img/${data.weather[0].main}.svg" alt="" class="weather-img">
    </div>
    <h2 class="temp"> <span class="temp-data">${(data.main.temp - 273.15).toFixed(0)}</span> °C</h2>
    <h3 class="weather-desc">${data.weather[0].main}</h3>
    <h1 class="city">${data.name}</h1>
  </div>
  <div class="row-2">
    <div class="max-temp extra-data">
      
        <!-- <img src="https://img.icons8.com/plasticine/100/000000/long-arrow-up.png"
        class="max-temp-icon extra-data-icon"
        /> -->
        <h4 class="max-temp">Max Temp : </h4>
        <p class="max-temp-text">${(data.main.temp_max - 273.15).toFixed(0)} °C</p>
    </div>
    <div class="min-temp extra-data">

      <h4 class="min-temp">Min Temp : </h4>
      <p class="min-temp-text">${(data.main.temp_min - 273.15).toFixed(0)} °C</p>

    </div>
    <div class="pressure extra-data">

      <h4 class="pressure">Pressure : </h4>
      <p class="pressure-text">${data.main.pressure} hPA</p>
<!--//hPA -->
    </div>
    <div class="humidity extra-data">

      <h4 class="humidity-temp">Humidity : </h4>
      <p class="humidity-text">${data.main.humidity} %</p>
      <!-- % -->
    </div>
    <div class="wind extra-data">

      <h4 class="wind-temp">Wind Speed : </h4>
      <p class="wind-text">${data.wind.speed} m/s</p>
<!--m/s -->
    </div>
  </div>
    `
}


searchBtn.addEventListener('click', getWeather)


// async function weather() {
//     const city = `delhi`
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data)

//     // renderresult(data);

// }
// weather();

// function renderresult(data) {
//     city.textContent = data.name;
//     country.textContent = data.sys.country;
//     wind.textContent = `${data.wind.speed} m/s`;
//     temp.textContent = `${data.main.temp - 273.15}  °C`
// }
