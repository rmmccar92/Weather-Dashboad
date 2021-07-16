/* https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} */
var searchButtonEl = $("#search-button");
var searchBarEl = $(".search-bar");
var forecastEl = $(".forecast");
var cityEl = $(".city");
var localStorageCount = 0;
var savedCitiesEl = $(".saved-cities-list");
var currentCount = 0




// Clear Placeholder text on click
searchBarEl.on('click', function () {
    searchBarEl.attr('placeholder', '')
})
// API CALL


//SAVED CITY LIST
localStorageCount=localStorage.getItem("count")
for (i = 0; i < localStorageCount; i++) {
        var savedCity = localStorage.getItem(i+1);
        var listItem = $(".list-group").addClass("list-group-item");
        listItem.append("<li>" + savedCity + "</li>");
        savedCitiesEl.append(listItem);
    }


// REDISPLAY SELECTED CITY
$("li").on('click' , function(){
    cityEl.empty();
    forecastEl.empty();
var clickWeatherUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + this.textContent + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
var clickForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + this.textContent + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
// console.log(clickForecastUrl);
// console.log(clickWeatherUrl);
fetch(clickWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityName = response.name
            cityEl.append(cityName);
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

// Button event that saves our chosen city(ies) and displays content
searchButtonEl.on('click', function () {
    var searchItem = searchBarEl.val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchItem + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchItem + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    localStorageCount++
    localStorage.setItem(localStorageCount, searchItem);
    localStorage.setItem('count' , localStorageCount)
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityName = response.name
            cityEl.append(cityName);
            console.log(response.weather);
        })

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            for (i = 0; i <= data.list.length; i++)
                var forecast = data.list[i]
            forecastEl.append(forecast)
            console.log(data);
        })


})