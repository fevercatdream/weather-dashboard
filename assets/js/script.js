var apiKey = "476f09e92adbe33631b7bae5be7a38cc";

var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var searchList = document.querySelector("#search-list");

var forecastSection = document.querySelector("#forecast-section");

var responseCity = document.querySelector("#response-city");

// Current Day
var responseDate = document.querySelector("#response-date");
var responseWeatherIcon = document.querySelector("#response-weather-icon");
var responseWeatherDesc = document.querySelector("#response-weather-description");
var responseTemp = document.querySelector("#response-temp");
var responseWind = document.querySelector("#response-wind");
var responseHumidity = document.querySelector("#response-humidity");

// Forecast Day 1
var responseDateForecast1 = document.querySelector("#response-forecast-date-1");
var responseWeatherIconForecast1 = document.querySelector("#response-weather-icon-forecast-1");
var responseWeatherDescForecast1 = document.querySelector("#response-weather-desc-forecast-1");
var responseTempForecast1 = document.querySelector("#response-temp-forecast-1");
var responseWindForecast1 = document.querySelector("#response-wind-forecast-1");
var responseHumidityForecast1 = document.querySelector("#response-humidity-forecast-1");

// Forecast Day 2
var responseDateForecast2 = document.querySelector("#response-forecast-date-2");
var responseWeatherIconForecast2 = document.querySelector("#response-weather-icon-forecast-2");
var responseWeatherDescForecast2 = document.querySelector("#response-weather-desc-forecast-2");
var responseTempForecast2 = document.querySelector("#response-temp-forecast-2");
var responseWindForecast2 = document.querySelector("#response-wind-forecast-2");
var responseHumidityForecast2 = document.querySelector("#response-humidity-forecast-2");

// Forecast Day 3
var responseDateForecast3 = document.querySelector("#response-forecast-date-3");
var responseWeatherIconForecast3 = document.querySelector("#response-weather-icon-forecast-3");
var responseWeatherDescForecast3 = document.querySelector("#response-weather-desc-forecast-3");
var responseTempForecast3 = document.querySelector("#response-temp-forecast-3");
var responseWindForecast3 = document.querySelector("#response-wind-forecast-3");
var responseHumidityForecast3 = document.querySelector("#response-humidity-forecast-3");

// Forecast Day 4
var responseDateForecast4 = document.querySelector("#response-forecast-date-4");
var responseWeatherIconForecast4 = document.querySelector("#response-weather-icon-forecast-4");
var responseWeatherDescForecast4 = document.querySelector("#response-weather-desc-forecast-4");
var responseTempForecast4 = document.querySelector("#response-temp-forecast-4");
var responseWindForecast4 = document.querySelector("#response-wind-forecast-4");
var responseHumidityForecast4 = document.querySelector("#response-humidity-forecast-4");

// Forecast Day 5
var responseDateForecast5 = document.querySelector("#response-forecast-date-5");
var responseWeatherIconForecast5 = document.querySelector("#response-weather-icon-forecast-5");
var responseWeatherDescForecast5 = document.querySelector("#response-weather-desc-forecast-5");
var responseTempForecast5 = document.querySelector("#response-temp-forecast-5");
var responseWindForecast5 = document.querySelector("#response-wind-forecast-5");
var responseHumidityForecast5 = document.querySelector("#response-humidity-forecast-5");

var historyArr;

// localStorage
var savedHistoryStr = localStorage.getItem("saved-history");
if(savedHistoryStr === null){
    historyArr = [];
}else{
    historyArr = JSON.parse(savedHistoryStr);
}

function hideWeather(){
    forecastSection.classList.add("hidden");
}

hideWeather();
renderHistoryToBtn(historyArr);

function renderHistoryToBtn(history){
    searchList.innerHTML = "";

    for (let i = 0; i < history.length; i++) {
        var listBtn = document.createElement("button");
        listBtn.classList.add("list-btn");
        listBtn.textContent = history[i];
        var listItem = document.createElement("li");
        listItem.append(listBtn);
        searchList.append(listItem);
        listBtn.addEventListener("click", function(){
            fetchWeather(history[i]);
            forecastSection.classList.remove("hidden");
        });
    }
}

function fetchWeather(cityInput){
    
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;

    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=imperial`;

    fetch(weatherUrl)
        .then(function(response){
            if(response.status >= 200 && response.status < 300){
                response.json().then(function(json){
                    console.log("weather", json);
                    // Current Day
                    responseCity.textContent = `${json.name}`;
                    var currentDate = new Date();
                    var dateFormat = new Intl.DateTimeFormat("en-us", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        });
                    var formattedDate = dateFormat.format(currentDate);
                    responseDate.textContent = formattedDate;
                    var weatherIconUrl = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
                    responseWeatherIcon.src = weatherIconUrl;
                    var weatherIconDesc = `${json.weather[0].description}`;
                    responseWeatherDesc.textContent = weatherIconDesc;
                    var temp = `Temp: ${json.main.temp} ℉`;
                    responseTemp.textContent = temp;
                    var wind = `Wind: ${json.wind.speed} MPH`;
                    responseWind.textContent = wind;
                    var humidity = `Humidity: ${json.main.humidity} %`;
                    responseHumidity.textContent = humidity;
                })
            }
        })
        
    fetch(forecastUrl)
    .then(function(response){
        if(response.status >= 200 && response.status < 300){
            response.json().then(function(json){
                console.log("forecast", json);

                // Forecast Day 1
                var forecastDate1 = new Date();
                forecastDate1.setDate(forecastDate1.getDate() + 1);
                var dateFormatForecastDate1 = new Intl.DateTimeFormat("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var formattedForecastDate1 = dateFormatForecastDate1.format(forecastDate1);
                responseDateForecast1.textContent = formattedForecastDate1;
                var weatherIconUrlForecast1 = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`;
                responseWeatherIconForecast1.src = weatherIconUrlForecast1;
                var weatherIconDescForecast1 = `${json.list[0].weather[0].description}`;
                responseWeatherDescForecast1.textContent = weatherIconDescForecast1;
                var tempForecast1 = `Temp: ${json.list[0].main.temp} ℉`;
                responseTempForecast1.textContent = tempForecast1;
                var windForecast1 = `Wind: ${json.list[0].wind.speed} MPH`;
                responseWindForecast1.textContent = windForecast1;
                var humidityForecast1 = `Humidity: ${json.list[0].main.humidity} %`;
                responseHumidityForecast1.textContent = humidityForecast1;
            
        
                // Forecast Day 2
                var forecastDate2 = new Date();
                forecastDate2.setDate(forecastDate2.getDate() + 2);
                var dateFormatForecastDate2 = new Intl.DateTimeFormat("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var formattedForecastDate2 = dateFormatForecastDate2.format(forecastDate2);
                responseDateForecast2.textContent = formattedForecastDate2;
                var weatherIconUrlForecast2 = `https://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png`;
                responseWeatherIconForecast2.src = weatherIconUrlForecast2;
                var weatherIconDescForecast2 = `${json.list[1].weather[0].description}`;
                responseWeatherDescForecast2.textContent = weatherIconDescForecast2;
                var tempForecast2 = `Temp: ${json.list[1].main.temp} ℉`;
                responseTempForecast2.textContent = tempForecast2;
                var windForecast2 = `Wind: ${json.list[1].wind.speed} MPH`;
                responseWindForecast2.textContent = windForecast2;
                var humidityForecast2 = `Humidity: ${json.list[1].main.humidity} %`;
                responseHumidityForecast2.textContent = humidityForecast2;

                // Forecast Day 3
                var forecastDate3 = new Date();
                forecastDate3.setDate(forecastDate3.getDate() + 3);
                var dateFormatForecastDate3 = new Intl.DateTimeFormat("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var formattedForecastDate3 = dateFormatForecastDate3.format(forecastDate3);
                responseDateForecast3.textContent = formattedForecastDate3;
                var weatherIconUrlForecast3 = `https://openweathermap.org/img/wn/${json.list[2].weather[0].icon}@2x.png`;
                responseWeatherIconForecast3.src = weatherIconUrlForecast3;
                var weatherIconDescForecast3 = `${json.list[2].weather[0].description}`;
                responseWeatherDescForecast3.textContent = weatherIconDescForecast3;
                var tempForecast3 = `Temp: ${json.list[2].main.temp} ℉`;
                responseTempForecast3.textContent = tempForecast3;
                var windForecast3 = `Wind: ${json.list[2].wind.speed} MPH`;
                responseWindForecast3.textContent = windForecast3;
                var humidityForecast3 = `Humidity: ${json.list[2].main.humidity} %`;
                responseHumidityForecast3.textContent = humidityForecast3;

                // Forecast Day 4
                var forecastDate4 = new Date();
                forecastDate4.setDate(forecastDate4.getDate() + 4);
                var dateFormatForecastDate4 = new Intl.DateTimeFormat("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var formattedForecastDate4 = dateFormatForecastDate4.format(forecastDate4);
                responseDateForecast4.textContent = formattedForecastDate4;
                var weatherIconUrlForecast4 = `https://openweathermap.org/img/wn/${json.list[3].weather[0].icon}@2x.png`;
                responseWeatherIconForecast4.src = weatherIconUrlForecast4;
                var weatherIconDescForecast4 = `${json.list[3].weather[0].description}`;
                responseWeatherDescForecast4.textContent = weatherIconDescForecast4;
                var tempForecast4 = `Temp: ${json.list[3].main.temp} ℉`;
                responseTempForecast4.textContent = tempForecast4;
                var windForecast4 = `Wind: ${json.list[3].wind.speed} MPH`;
                responseWindForecast4.textContent = windForecast4;
                var humidityForecast4 = `Humidity: ${json.list[3].main.humidity} %`;
                responseHumidityForecast4.textContent = humidityForecast4;

                // Forecast Day 5
                var forecastDate5 = new Date();
                forecastDate5.setDate(forecastDate5.getDate() + 5);
                var dateFormatForecastDate5 = new Intl.DateTimeFormat("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var formattedForecastDate5 = dateFormatForecastDate5.format(forecastDate5);
                responseDateForecast5.textContent = formattedForecastDate5;
                var weatherIconUrlForecast5 = `https://openweathermap.org/img/wn/${json.list[4].weather[0].icon}@2x.png`;
                responseWeatherIconForecast5.src = weatherIconUrlForecast5;
                var weatherIconDescForecast5 = `${json.list[4].weather[0].description}`;
                responseWeatherDescForecast5.textContent = weatherIconDescForecast5;
                var tempForecast5 = `Temp: ${json.list[4].main.temp} ℉`;
                responseTempForecast5.textContent = tempForecast5;
                var windForecast5 = `Wind: ${json.list[4].wind.speed} MPH`;
                responseWindForecast5.textContent = windForecast5;
                var humidityForecast5 = `Humidity: ${json.list[4].main.humidity} %`;
                responseHumidityForecast5.textContent = humidityForecast5;

            })
        }
    })
}

searchBtn.addEventListener("click", function(event){
    var city = searchInput.value.toLowerCase().trim();
    event.preventDefault();
    if(city === ""){
        return;
    }
    if(!historyArr.includes(city)){
        historyArr.push(city);
        renderHistoryToBtn(historyArr);
        // localStorage
        localStorage.setItem("saved-history", JSON.stringify(historyArr));
    }
    
    fetchWeather(city);
    forecastSection.classList.remove("hidden");

})
