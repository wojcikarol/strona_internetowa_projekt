const apiKey = '77cfc5bf970232b0c4a30f7bff2e9c70';
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");
const suggestionsContainer = document.getElementById("city-suggestions");
const topCitiesList = document.getElementById("top-cities-list");
let cityNames = [];


fetch('/cities.xml')
    .then(response => response.text())
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const rows = xmlDoc.getElementsByTagName('row');
        for (let i = 0; i < rows.length; i++) {
            const NAZWA = rows[i].getElementsByTagName('NAZWA')[0].textContent;
            cityNames.push(NAZWA);
        }
    })
    .catch(error => console.error('Error loading XML:', error));

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Tarnów');
    loadTopCities();
});

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        saveCityToLocalStorage(city);
        inputElement.value = "";
        suggestionsContainer.innerHTML = ""; 
    }
});

inputElement.addEventListener("input", function () {
    const query = inputElement.value.toLowerCase();
    if (query) {
        showCitySuggestions(query);
    } else {
        suggestionsContainer.innerHTML = "";
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych pogodowych");
        }
        const data = await response.json();
        updateWeatherUI(data);
        fetchForecastData(data.coord.lat, data.coord.lon);
    } catch (error) {
        console.error(error);
    }
}

async function fetchForecastData(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych prognozy");
        }
        const data = await response.json();
        showWeatherForecast(data.list);
        showHourlyForecast(data.list);
    } catch (error) {
        console.error(error);
    }
}

function showWeatherForecast(dailyData) {
    const weatherForecastEl = document.getElementById('weather-forecast');
    let forecastHTML = '';
    const forecastDays = dailyData.filter((item, index) => index % 8 === 0).slice(0, 5);

    forecastDays.forEach(day => {
        const dayName = new Date(day.dt * 1000).toLocaleDateString('pl-PL', { weekday: 'long' });
        const icon = day.weather[0].icon;
        const temp = day.main.temp.toFixed(1);

        forecastHTML += `
            <div class="weather-forecast-item">
                <div class="day">${dayName}</div>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="ikona pogodowa" class="w-icon">
                <div class="temp">${temp}&#176;C</div>
            </div>
        `;
    });
    weatherForecastEl.innerHTML = forecastHTML;
}

function showHourlyForecast(hourlyData) {
    const hourlyForecastEl = document.getElementById('hourly-forecast');
    let hourlyHTML = '';

    const nextHours = hourlyData.slice(0, 12);

    nextHours.forEach(hour => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
        const icon = hour.weather[0].icon;
        const temp = hour.main.temp.toFixed(1);

        hourlyHTML += `
            <div class="hourly-forecast-item">
                <div class="hour">${time}</div>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="ikona pogodowa" class="w-icon">
                <div class="temp">${temp}&#176;C</div>
            </div>
        `;
    });
    hourlyForecastEl.innerHTML = hourlyHTML;
}

function updateWeatherUI(data) {
    const cityElement = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const windSpeed = document.querySelector(".wind-speed");
    const humidity = document.querySelector(".humidity");
    const visibility = document.querySelector(".visibility-distance");
    const descriptionText = document.querySelector(".description-text");
    const date = document.querySelector(".date");
    const descriptionIcon = document.querySelector(".description i");

    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        "Clear": "wb_sunny",
        "Clouds": "wb_cloudy",
        "Rain": "umbrella",
        "Thunderstorm": "flash_on",
        "Drizzle": "grain",
        "Snow": "ac_unit",
        "Mist": "cloud",
        "Smoke": "cloud",
        "Haze": "cloud",
        "Fog": "cloud",
    };
    return iconMap[weatherCondition] || "help";
}

function saveCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    const cityIndex = cities.findIndex(item => item.name === city);

    if (cityIndex !== -1) {
        cities[cityIndex].count += 1;
    } else {
        cities.push({ name: city, count: 1 });
    }

    cities.sort((a, b) => b.count - a.count);

    if (cities.length > 15) {
        cities = cities.slice(0, 15);
    }

    localStorage.setItem('cities', JSON.stringify(cities));
    loadTopCities();
}

function loadTopCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const topCities = cities.slice(0, 15);  
    
    topCitiesList.innerHTML = topCities.map(city => `<li>${city.name}</li>`).join('');

    topCitiesList.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            fetchWeatherData(li.textContent);
        });
    });
}

function showCitySuggestions(query) {
    const matchingCities = cityNames.filter(city => city.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    suggestionsContainer.innerHTML = matchingCities.map(city => `<div>${city}</div>`).join('');

    suggestionsContainer.querySelectorAll('div').forEach(div => {
        div.addEventListener('click', () => {
            inputElement.value = div.textContent;
            suggestionsContainer.innerHTML = "";
            fetchWeatherData(div.textContent);
        });
    });
}
