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
var uvEl = $(".uv");
var savedCitiesEl = $(".saved-cities-list");

// Forecast DOM Elements
// Day 1
var day1El = $(".daily-day-1");
var dailyTemps1El = $(".daily-temps-1")
var min1El = $(".daily-min-1");
var max1El = $(".daily-max-1");
var weather1El = $(".daily-weather-1");
var dailyIcon1El = $(".daily-icon-1");
var dailyUv1El = $(".daily-uv-1");

// Day 2
var day2El = $(".daily-day-2");
var dailyTemps2El = $(".daily-temps-2")
var min2El = $(".daily-min-2");
var max2El = $(".daily-max-2");
var weather2El = $(".daily-weather-2");
var dailyIcon2El = $(".daily-icon-2");
var dailyUv2El = $(".daily-uv-2");

// Day 3
var day3El = $(".daily-day-3");
var dailyTemps3El = $(".daily-temps-3")
var min3El = $(".daily-min-3");
var max3El = $(".daily-max-3");
var weather3El = $(".daily-weather-3");
var dailyIcon3El = $(".daily-icon-3");
var dailyUv3El = $(".daily-uv-3");

// Day 4
var day4El = $(".daily-day-4");
var dailyTemps4El = $(".daily-temps-4")
var min4El = $(".daily-min-4");
var max4El = $(".daily-max-4");
var weather4El = $(".daily-weather-4");
var dailyIcon4El = $(".daily-icon-4");
var dailyUv4El = $(".daily-uv-4");

// Day 5
var day5El = $(".daily-day-5");
var dailyTemps5El = $(".daily-temps-5")
var min5El = $(".daily-min-5");
var max5El = $(".daily-max-5");
var weather5El = $(".daily-weather-5");
var dailyIcon5El = $(".daily-icon-5");
var dailyUv5El = $(".daily-uv-5");

// Forecast cards
var card1El = $(".card-1");
var card2El = $(".card-2");
var card3El = $(".card-3");
var card4El = $(".card-4");
var card5El = $(".card-5");

var currentCount = 0;
var localStorageCount = 0;

pageLoad();
function pageLoad() {
    if (localStorage.getItem("count") != null){
   currentCount = localStorage.getItem("count")
   console.log(currentCount);
   var currentCity = localStorage.getItem(currentCount);
   console.log(currentCity);

//Setting the page to load the last searched city using the current Count
var weatherURLOnLoad = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
var cityLat;
var cityLon;
fetch(weatherURLOnLoad)
.then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }

}).then(function (data) {
    cityLat = data.coord.lat;
    cityLon = data.coord.lon;
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=bad5978aa0a3219541f59dde7ea1608a&units=imperial")
})
.then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (response) {
    cityEl.empty();
    forecastEl.empty();
    otherEl.empty();
    iconEl.empty();
    tempTodayEl.empty();
    windEl.empty();
    humidityEl.empty();
    // Appending Cities with the search button
    cityEl.append("<h3>" + currentCity + "</h3>").addClass("city-title")
    cityEl.append(moment().format("MMM Do, YYYY"));
    tempTodayEl.append(response.current.temp + "°F")
    cityEl.append(tempTodayEl);
    iconEl.append("<img src =https://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png >");
    otherEl.append("Conditions: " + response.current.weather[0].description);
    iconEl.append(otherEl)
    cityEl.append(iconEl);
    humidityEl.append("Humidity: " + response.current.humidity);
    cityEl.append(humidityEl);
    windEl.append("Wind speed: " + response.current.wind_speed + "mph ");
    uvEl.append("UV Index: " + response.current.uvi)
    cityEl.append(windEl);
    cityEl.append(uvEl);

    // Appending forecast cards to the DOM
    // Day 1
    day1El.append(moment().add(1, 'days').format("dddd"));
    card1El.append(day1El);
    dailyIcon1El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + ".png>");
    day1El.append(dailyIcon1El);
    min1El.append("Low " + response.daily[1].temp.min);
    dailyTemps1El.append(min1El);
    max1El.append("High " + response.daily[1].temp.max);
    dailyTemps1El.append(max1El);
    dailyIcon1El.append(dailyTemps1El);
    weather1El.append(response.daily[1].weather[0].main);
    card1El.append(weather1El);
    dailyUv1El.append("UVI: " + response.daily[1].uvi);
    weather1El.append(dailyUv1El);
    forecastEl.append(card1El);

    // Day 2
    day2El.append(moment().add(2, 'days').format("dddd"));
    card2El.append(day2El);
    dailyIcon2El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + ".png>");
    day2El.append(dailyIcon2El);
    min2El.append("Low " + response.daily[2].temp.min);
    dailyTemps2El.append(min2El);
    max2El.append("High " + response.daily[2].temp.max);
    dailyTemps2El.append(max2El);
    dailyIcon2El.append(dailyTemps2El);
    weather2El.append(response.daily[2].weather[0].main);
    card2El.append(weather2El);
    dailyUv2El.append("UVI: " + response.daily[2].uvi);
    weather2El.append(dailyUv2El);
    forecastEl.append(card2El);

    // Day 3
    day3El.append(moment().add(3, 'days').format("dddd"));
    card3El.append(day3El);
    dailyIcon3El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + ".png>");
    day3El.append(dailyIcon3El);
    min3El.append("Low " + response.daily[3].temp.min);
    dailyTemps3El.append(min3El);
    max3El.append("High " + response.daily[3].temp.max);
    dailyTemps3El.append(max3El);
    dailyIcon3El.append(dailyTemps3El);
    weather3El.append(response.daily[3].weather[0].main);
    card3El.append(weather3El);
    dailyUv3El.append("UVI: " + response.daily[3].uvi);
    weather3El.append(dailyUv3El);
    forecastEl.append(card3El);


    // Day 4
    day4El.append(moment().add(4, 'days').format("dddd"));
    card4El.append(day4El);
    dailyIcon4El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + ".png>");
    day4El.append(dailyIcon4El);
    min4El.append("Low " + response.daily[4].temp.min);
    dailyTemps4El.append(min4El);
    max4El.append("High " + response.daily[4].temp.max);
    dailyTemps4El.append(max4El);
    dailyIcon4El.append(dailyTemps4El);
    weather4El.append(response.daily[4].weather[0].main);
    card4El.append(weather4El);
    dailyUv4El.append("UVI: " + response.daily[4].uvi);
    weather4El.append(dailyUv4El);
    forecastEl.append(card4El);

    // Day 5
    day5El.append(moment().add(5, 'days').format("dddd"));
    card5El.append(day5El);
    dailyIcon5El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + ".png>");
    day5El.append(dailyIcon5El);
    min5El.append("Low " + response.daily[5].temp.min);
    dailyTemps5El.append(min5El);
    max5El.append("High " + response.daily[5].temp.max);
    dailyTemps5El.append(max5El);
    dailyIcon5El.append(dailyTemps5El);
    weather5El.append(response.daily[5].weather[0].main);
    card5El.append(weather5El);
    dailyUv5El.append("UVI: " + response.daily[5].uvi);
    weather5El.append(dailyUv5El);
    forecastEl.append(card5El);
})
}
}


// Clear Placeholder text on click
searchBarEl.on('click', function () {
    searchBarEl.attr('placeholder', '')
})

//SAVED CITY LIST
localStorageCount = localStorage.getItem("count")
for (i = 0; i < localStorageCount; i++) {
    var savedCity = localStorage.getItem(i + 1);
    var listItem = $(".list-group").addClass("list-group-item");
    listItem.append("<li>" + savedCity + "</li>");
    savedCitiesEl.append(listItem);
}

// SEARCH BUTTON
searchButtonEl.on('click', function () {
    cityEl.empty();
    forecastEl.empty();
    otherEl.empty();
    iconEl.empty();
    tempTodayEl.empty();
    windEl.empty();
    humidityEl.empty();
    uvEl.empty();

    // ForeCast Clears
    // Day 1
    day1El.empty();
    dailyIcon1El.empty();
    min1El.empty();
    max1El.empty();
    weather1El.empty();
    dailyUv1El.empty();

    // Day 2
    day2El.empty();
    dailyIcon2El.empty();
    min2El.empty();
    max2El.empty();
    weather2El.empty();
    dailyUv2El.empty();

    // Day 3
    day3El.empty();
    dailyIcon3El.empty();
    min3El.empty();
    max3El.empty();
    weather3El.empty();
    dailyUv3El.empty();

    // Day 4
    day4El.empty();
    dailyIcon4El.empty();
    min4El.empty();
    max4El.empty();
    weather4El.empty();
    dailyUv4El.empty();

    // Day 5
    day5El.empty();
    dailyIcon5El.empty();
    min5El.empty();
    max5El.empty();
    weather5El.empty();
    dailyUv5El.empty();

    var cityLat;
    var cityLon;
    var searchItem = searchBarEl.val();
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchItem + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }

        }).then(function (data) {
            cityLat = data.coord.lat;
            cityLon = data.coord.lon;
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=bad5978aa0a3219541f59dde7ea1608a&units=imperial")
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (response) {
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
            cityEl.append("<h3>" + searchItem + "</h3>").addClass("city-title")
            cityEl.append(moment().format("MMM Do, YYYY"));
            tempTodayEl.append(response.current.temp + "°F")
            cityEl.append(tempTodayEl);
            iconEl.append("<img src =https://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png >");
            otherEl.append("Conditions: " + response.current.weather[0].description);
            iconEl.append(otherEl)
            cityEl.append(iconEl);
            humidityEl.append("Humidity: " + response.current.humidity);
            cityEl.append(humidityEl);
            windEl.append("Wind speed: " + response.current.wind_speed + "mph ");
            uvEl.append("UV Index: " + response.current.uvi)
            cityEl.append(windEl);
            cityEl.append(uvEl);

            // Appending forecast cards to the DOM
            // Day 1
            day1El.append(moment().add(1, 'days').format("dddd"));
            card1El.append(day1El);
            dailyIcon1El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + ".png>");
            day1El.append(dailyIcon1El);
            min1El.append("Low " + response.daily[1].temp.min);
            dailyTemps1El.append(min1El);
            max1El.append("High " + response.daily[1].temp.max);
            dailyTemps1El.append(max1El);
            dailyIcon1El.append(dailyTemps1El);
            weather1El.append(response.daily[1].weather[0].main);
            card1El.append(weather1El);
            dailyUv1El.append("UVI: " + response.daily[1].uvi);
            weather1El.append(dailyUv1El);
            forecastEl.append(card1El);

            // Day 2
            day2El.append(moment().add(2, 'days').format("dddd"));
            card2El.append(day2El);
            dailyIcon2El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + ".png>");
            day2El.append(dailyIcon2El);
            min2El.append("Low " + response.daily[2].temp.min);
            dailyTemps2El.append(min2El);
            max2El.append("High " + response.daily[2].temp.max);
            dailyTemps2El.append(max2El);
            dailyIcon2El.append(dailyTemps2El);
            weather2El.append(response.daily[2].weather[0].main);
            card2El.append(weather2El);
            dailyUv2El.append("UVI: " + response.daily[2].uvi);
            weather2El.append(dailyUv2El);
            forecastEl.append(card2El);

            // Day 3
            day3El.append(moment().add(3, 'days').format("dddd"));
            card3El.append(day3El);
            dailyIcon3El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + ".png>");
            day3El.append(dailyIcon3El);
            min3El.append("Low " + response.daily[3].temp.min);
            dailyTemps3El.append(min3El);
            max3El.append("High " + response.daily[3].temp.max);
            dailyTemps3El.append(max3El);
            dailyIcon3El.append(dailyTemps3El);
            weather3El.append(response.daily[3].weather[0].main);
            card3El.append(weather3El);
            dailyUv3El.append("UVI: " + response.daily[3].uvi);
            weather3El.append(dailyUv3El);
            forecastEl.append(card3El);


            // Day 4
            day4El.append(moment().add(4, 'days').format("dddd"));
            card4El.append(day4El);
            dailyIcon4El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + ".png>");
            day4El.append(dailyIcon4El);
            min4El.append("Low " + response.daily[4].temp.min);
            dailyTemps4El.append(min4El);
            max4El.append("High " + response.daily[4].temp.max);
            dailyTemps4El.append(max4El);
            dailyIcon4El.append(dailyTemps4El);
            weather4El.append(response.daily[4].weather[0].main);
            card4El.append(weather4El);
            dailyUv4El.append("UVI: " + response.daily[4].uvi);
            weather4El.append(dailyUv4El);
            forecastEl.append(card4El);

            // Day 5
            day5El.append(moment().add(5, 'days').format("dddd"));
            card5El.append(day5El);
            dailyIcon5El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + ".png>");
            day5El.append(dailyIcon5El);
            min5El.append("Low " + response.daily[5].temp.min);
            dailyTemps5El.append(min5El);
            max5El.append("High " + response.daily[5].temp.max);
            dailyTemps5El.append(max5El);
            dailyIcon5El.append(dailyTemps5El);
            weather5El.append(response.daily[5].weather[0].main);
            card5El.append(weather5El);
            dailyUv5El.append("UVI: " + response.daily[5].uvi);
            weather5El.append(dailyUv5El);
            forecastEl.append(card5El);
        })
})

// REDISPLAY SELECTED CITY WHEN CLICKED 
// event delegation to make sure dynamically added list items are clickable
$(savedCitiesEl).on("click", "li", function () {
    cityEl.empty();
    forecastEl.empty();
    otherEl.empty();
    iconEl.empty();
    tempTodayEl.empty();
    windEl.empty();
    humidityEl.empty();
    uvEl.empty();
    var cityLat;
    var cityLon;
    var clickedCity;
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + this.textContent + "&APPID=bad5978aa0a3219541f59dde7ea1608a&units=imperial";
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }

        }).then(function (data) {
            cityLat = data.coord.lat;
            cityLon = data.coord.lon;
            clickedCity = data.name
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=bad5978aa0a3219541f59dde7ea1608a&units=imperial")
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (response) {

            // ForeCast Clears
            // Day 1
            day1El.empty();
            dailyIcon1El.empty();
            min1El.empty();
            max1El.empty();
            weather1El.empty();
            dailyUv1El.empty();

            // Day 2
            day2El.empty();
            dailyIcon2El.empty();
            min2El.empty();
            max2El.empty();
            weather2El.empty();
            dailyUv2El.empty();

            // Day 3
            day3El.empty();
            dailyIcon3El.empty();
            min3El.empty();
            max3El.empty();
            weather3El.empty();
            dailyUv3El.empty();

            // Day 4
            day4El.empty();
            dailyIcon4El.empty();
            min4El.empty();
            max4El.empty();
            weather4El.empty();
            dailyUv4El.empty();

            // Day 5
            day5El.empty();
            dailyIcon5El.empty();
            min5El.empty();
            max5El.empty();
            weather5El.empty();
            dailyUv5El.empty();



            // Appending Cities with the search button
            cityEl.append("<h3>" + clickedCity + "</h3>").addClass("city-title")
            cityEl.append(moment().format("MMM Do, YYYY"));
            tempTodayEl.append(response.current.temp + "°F")
            cityEl.append(tempTodayEl);
            iconEl.append("<img src =https://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png >");
            otherEl.append("Conditions: " + response.current.weather[0].description);
            iconEl.append(otherEl)
            cityEl.append(iconEl);
            humidityEl.append("Humidity: " + response.current.humidity);
            cityEl.append(humidityEl);
            windEl.append("Wind speed: " + response.current.wind_speed + "mph ");
            uvEl.append("UV Index: " + response.current.uvi)
            cityEl.append(windEl);
            cityEl.append(uvEl);


            // Appending forecast cards to the DOM
            // Day 1
            day1El.append(moment().add(1, 'days').format("dddd"));
            card1El.append(day1El);
            dailyIcon1El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + ".png>");
            day1El.append(dailyIcon1El);
            min1El.append("Low " + response.daily[1].temp.min);
            dailyTemps1El.append(min1El);
            max1El.append("High " + response.daily[1].temp.max);
            dailyTemps1El.append(max1El);
            dailyIcon1El.append(dailyTemps1El);
            weather1El.append(response.daily[1].weather[0].main);
            card1El.append(weather1El);
            dailyUv1El.append("UVI: " + response.daily[1].uvi);
            weather1El.append(dailyUv1El);
            forecastEl.append(card1El);

            // Day 2
            day2El.append(moment().add(2, 'days').format("dddd"));
            card2El.append(day2El);
            dailyIcon2El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + ".png>");
            day2El.append(dailyIcon2El);
            min2El.append("Low " + response.daily[2].temp.min);
            dailyTemps2El.append(min2El);
            max2El.append("High " + response.daily[2].temp.max);
            dailyTemps2El.append(max2El);
            dailyIcon2El.append(dailyTemps2El);
            weather2El.append(response.daily[2].weather[0].main);
            card2El.append(weather2El);
            dailyUv2El.append("UVI: " + response.daily[2].uvi);
            weather2El.append(dailyUv2El);
            forecastEl.append(card2El);

            // Day 3
            day3El.append(moment().add(3, 'days').format("dddd"));
            card3El.append(day3El);
            dailyIcon3El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + ".png>");
            day3El.append(dailyIcon3El);
            min3El.append("Low " + response.daily[3].temp.min);
            dailyTemps3El.append(min3El);
            max3El.append("High " + response.daily[3].temp.max);
            dailyTemps3El.append(max3El);
            dailyIcon3El.append(dailyTemps3El);
            weather3El.append(response.daily[3].weather[0].main);
            card3El.append(weather3El);
            dailyUv3El.append("UVI: " + response.daily[3].uvi);
            weather3El.append(dailyUv3El);
            forecastEl.append(card3El);


            // Day 4
            day4El.append(moment().add(4, 'days').format("dddd"));
            card4El.append(day4El);
            dailyIcon4El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + ".png>");
            day4El.append(dailyIcon4El);
            min4El.append("Low " + response.daily[4].temp.min);
            dailyTemps4El.append(min4El);
            max4El.append("High " + response.daily[4].temp.max);
            dailyTemps4El.append(max4El);
            dailyIcon4El.append(dailyTemps4El);
            weather4El.append(response.daily[4].weather[0].main);
            card4El.append(weather4El);
            dailyUv4El.append("UVI: " + response.daily[4].uvi);
            weather4El.append(dailyUv4El);
            forecastEl.append(card4El);

            // Day 5
            day5El.append(moment().add(5, 'days').format("dddd"));
            card5El.append(day5El);
            dailyIcon5El.append("<img src =https://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + ".png>");
            day5El.append(dailyIcon5El);
            min5El.append("Low " + response.daily[5].temp.min);
            dailyTemps5El.append(min5El);
            max5El.append("High " + response.daily[5].temp.max);
            dailyTemps5El.append(max5El);
            dailyIcon5El.append(dailyTemps5El);
            weather5El.append(response.daily[5].weather[0].main);
            card5El.append(weather5El);
            dailyUv5El.append("UVI: " + response.daily[5].uvi);
            weather5El.append(dailyUv5El);
            forecastEl.append(card5El);
        })


})