import "./style.css";

const findCityElement = document.getElementById("find-city");
const APPKEY = "45e48b44264dc2c0695de8fadbb25f1f";
const DEFAULTCITY = "Los Angeles";
let currentCity = DEFAULTCITY;
let currentUnit = "imperial";

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
        console.log(weatherData);
        return weatherData;
    } catch (err) {
        console.log(err);
    }
};
const getCity = () => {
    let city = findCityElement.value;
    console.log(city);

    if (city !== "") {
        currentCity = city;
    } else {
        currentCity = DEFAULTCITY;
    }
    getweather();
};

const setCurrentWeatherData = () => {
    let weatherData = getweather();
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
        console.log(e.key);
        getCity();
    }
});
getweather();
