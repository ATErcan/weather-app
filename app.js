const cityName = document.querySelector(".city-input");
const searchCity = document.querySelector(".search");

const fetchCountryWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fc495c975dc5f64690d2cfebc1b548e`;

  const res = await fetch(url);

  if (!res.ok) {
    // throw new Error();
    alert("City could not found");
  }
  const data = await res.json();

  renderCountryWeather(data);
};

const renderCountryWeather = (data) => {
  const {
    main: { humidity, temp },
    name,
    sys: { country },
    visibility,
    weather,
    wind: { speed },
  } = data;
  const { id, main, description, icon } = weather[0];

  let weatherStatu;
  let colorIcon;

  if (id >= 500 && id <= 800) {
    weatherStatu = "rainy";
    colorIcon = "secondary";
    document.querySelector("body").className = "rainy-weather";
  } else if (id > 800) {
    weatherStatu = "sunny";
    colorIcon = "warning";
    document.querySelector("body").className = "sunny-weather";
  }

  const rowDiv = document.querySelector(".row");

  const cities = rowDiv.querySelectorAll(".card h5 span");
  const citiesArray = Array.from(cities);
  if (citiesArray.length > 0) {
    const filteredArray = citiesArray.filter((span) => span.innerText == name);
    console.log("asdas");
    if (filteredArray.length > 0) {
      cityName.placeholder = `You already know the weather for ${name}, Please search for another city 😉`;
      setTimeout(() => {
        cityName.placeholder = "Search for a city";
      }, 5000);
      cityName.value = "";
      return;
    }
  }

  rowDiv.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title d-inline-block position-relative">                
              <span>${name}</span>
                <sup class="bg-success ps-2 pe-2 text-white rounded-3">${country}</sup></h5>
              <p class="celcius">${Math.round(
                temp - 273.15
              )}<sup class="sup">°C</sup></p>
              <p><span class="material-symbols-rounded display-4 text-${colorIcon}">${weatherStatu}</span></p>
              <p class="card-text">
              <span class="me-2">Humidity: ${humidity}%</span> <span class="">Visibility: ${(
    visibility / 1000
  ).toFixed(1)}km</span>
              </p>
              <h6 class="card-subtitle mb-2">${description}</h6>
            </div>
          </div>
        </div>
  `;
};

searchCity.addEventListener("click", () => {
  fetchCountryWeather(cityName.value);
  cityName.value = "";
});

cityName.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    searchCity.click();
  }
});
