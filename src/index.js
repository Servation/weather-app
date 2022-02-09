import "./style.css";

const findCityElement = document.getElementById("find-city");
const APPKEY = "45e48b44264dc2c0695de8fadbb25f1f";
const DEFAULTCITY = "Los Angeles";
let currentCity = DEFAULTCITY;
let currentUnit = "imperial";
let theWeather;

class Weather {
    constructor(
        temp,
        unit,
        humidity,
        windSpeed,
        windDir,
        location,
        time,
        condition
    ) {
        this.temp = temp;
        this.unit = unit;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.location = location;
        this.time = time;
        this.condition = condition;
    }
}

const getweather = async () => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${currentUnit}&appid=${APPKEY}`
        );
        const weatherData = await response.json();
        return weatherData;
    } catch (err) {
        console.log(err);
    }
};
const getCity = () => {
    let city = findCityElement.value;

    if (city !== "") {
        currentCity = city;
    } else {
        currentCity = DEFAULTCITY;
    }
    setDom();
};

const setCurrentWeatherData = async () => {
    let weatherData = await getweather();
    let { humidity, temp } = weatherData.main;
    let units = currentUnit;
    let { deg, speed } = weatherData.wind;
    let location = `${weatherData.name}, ${weatherData.sys.country}`;
    let time = weatherData.dt;
    let condition = weatherData.weather[0].main;
    return new Weather(
        temp,
        units,
        humidity,
        speed,
        deg,
        location,
        time,
        condition
    );
};

findCityElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getCity();
    }
});

const setDom = async () => {
    theWeather = await setCurrentWeatherData();
    const weatherEL = document.getElementById("current-temp");
    const tempUnitEl = document.getElementById("temp-unit");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind");
    const locationEl = document.getElementById("location");
    const timeEl = document.getElementById("current-time-weather");
    const conditionEl = document.getElementById("current-condition");
    const time = new Date(theWeather.time * 1000);
    const hour = time.getHours();
    const mins = "0" + time.getMinutes();
    weatherEL.textContent = theWeather.temp;
    tempUnitEl.textContent = theWeather.unit;
    humidityEl.textContent = theWeather.humidity;
    windEl.textContent = `${theWeather.windSpeed} mph ${theWeather.windDir}`;
    locationEl.textContent = theWeather.location;
    timeEl.textContent = `${hour}:${mins.substr(-2)}`;
    conditionEl.textContent = theWeather.condition;
    console.log("working");
};

setDom();
