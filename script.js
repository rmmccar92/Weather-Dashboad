/* https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} */
var searchButtonEl = $("#search-button");
var searchBarEl = $(".search-bar");
var forecastEl = $(".forecast");
var cityEl = $(".city");
var nameEl = $(".city-name");
var tempTodayEl = $(".temp-today");
var otherEl = $(".other-info");
var iconEl = $(".icon");
var humidityEl = $(".humidity");
var windEl = $(".wind");
var localStorageCount = 0;
var savedCitiesEl = $(".saved-cities-list");
var currentCount = 0


// Clear Placeholder text on click
searchBarEl.on('click', function () {
    searchBarEl.attr('placeholder', '')
})
// API CALL


//SAVED CITY LIST
localStorageCount = localStorage.getItem("count")
for (i = 0; i < localStorageCount; i++) {
    var savedCity = localStorage.getItem(i + 1);
    var listItem = $(".list-group").addClass("list-group-item");
    listItem.append("<li>" + savedCity + "</li>");
    savedCitiesEl.append(listItem);
}


// REDISPLAY SELECTED CITY WHEN CLICKED 
$("li").on('click', function () {
    cityEl.empty();
    forecastEl.empty();
    otherEl.empty();
    iconEl.empty();
    tempTodayEl.empty();
    windEl.empty();
    humidityEl.empty();
    var clickWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + this.textContent + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    var clickForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + this.textContent + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    // console.log(clickForecastUrl);
    // console.log(clickWeatherUrl);
    fetch(clickWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            cityEl.append("<h3>" + response.name + "</h3>").addClass("city-title")
            cityEl.append(moment().format("MMM Do, YYYY"));
            tempTodayEl.append(response.main.temp + "°F")
            cityEl.append(tempTodayEl);
            iconEl.append("<img src =https://openweathermap.org/img/wn/"+response.weather[0].icon+".png >");
            // Appending current weather conditions
            otherEl.append("Conditions: " +response.weather[0].description);
            iconEl.append(otherEl)
            cityEl.append(iconEl);
            humidityEl.append("Humidity: " +response.main.humidity);
            cityEl.append(humidityEl);
            windEl.append("Wind speed: " +response.wind.speed + "mph ");
            windEl.append("Gusts: " +response.wind.gust + "mph");
            cityEl.append(windEl);

        })


    fetch(clickForecastUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            for (i = 0; i <= data.list.length; i++)
                var forecast = data.list[i]
            forecastEl.append(forecast)
            // console.log(data);
        })
})

function displayWeather() {
    cityEl.empty();
    cityEl.append(data.name)
    forecastEl.empty();

}

// SEARCH BUTTON
searchButtonEl.on('click', function () {
    var searchItem = searchBarEl.val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchItem + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    fetch(weatherUrl)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
        })
        .then(function (response) {
            cityEl.empty();
            forecastEl.empty();
            otherEl.empty();
            iconEl.empty();
            tempTodayEl.empty();
            windEl.empty();
            humidityEl.empty();
            localStorageCount++
            localStorage.setItem(localStorageCount, searchItem);
            localStorage.setItem('count', localStorageCount)
            var listItem = $(".list-group").addClass("list-group-item");
            listItem.append("<li>" + searchItem + "</li>");
            savedCitiesEl.append(listItem);
            // Appending Cities with the search button
            cityEl.append("<h3>" + response.name + "</h3>").addClass("city-title")
            cityEl.append(moment().format("MMM Do, YYYY"));
            tempTodayEl.append(response.main.temp + "°F")
            cityEl.append(tempTodayEl);
            iconEl.append("<img src =https://openweathermap.org/img/wn/"+response.weather[0].icon+".png >");
            otherEl.append("Conditions: " +response.weather[0].description);
            iconEl.append(otherEl)
            cityEl.append(iconEl);
            humidityEl.append("Humidity: " +response.main.humidity);
            cityEl.append(humidityEl);
            windEl.append("Wind speed: " +response.wind.speed + "mph ");
            windEl.append("Gusts: " +response.wind.gust + "mph");
            cityEl.append(windEl);

        })

})