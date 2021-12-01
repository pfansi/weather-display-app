//let declares these variables 
var searchButton = $(".searchButton");

var apiKey = "594c41602ce2f5ac3b3cdffd7564944d";


// we loop into the storage to check if there is any saved data 
for (var i = 0; i < localStorage.length; i++) {

    var saveCity = localStorage.getItem(i);
    
    var cityEnter = $(".list-group").addClass("list-group-item");

    cityEnter.append("<li>" + saveCity + "</li>");
}

// when the search button is clicked , this function is called 
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // let create variable for the current weather data 
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast working
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlWeather,
            method: "GET"
        }).then(function (response) {

            //This variable will append the list of searched city
            var cityEnter = $(".list-group").addClass("list-group-item");
            cityEnter.append("<li>" + response.name + "</li>")

            // This create a div and append the current weather deta from the API
            var currentWeather = $(".currentWeather").append("<div>").addClass("card-body");
            currentWeather.empty();
            var weatherData = currentWeather.append("<p>");

            // append the time data 
            var timeUTC = new Date(response.dt * 1000);
            weatherData.append("<p>" + response.name + " " + timeUTC.toLocaleDateString("en-US") + "</p>");

            // append the weather image
            weatherData.append("<div>" + `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">` + "</div>");

            //append the temperature data
            weatherData.append("<p>" + "Temperature: " + response.main.temp + "</p>");

            // append the Humidity data
            weatherData.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

            // append the Wind Speed data
            weatherData.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // let declare the variable url for the uvi data
            var urlUvi = `https://api.openweathermap.org/data/2.5/uvi?appid=594c41602ce2f5ac3b3cdffd7564944d&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // this will query the API and return the uvi data
            $.ajax({
                url: urlUvi,
                method: "GET"
            }).then(function (response) {
                
                // let add a class to the uvi data for the style and append its value
                weatherData.append("<div class=UV>" + "UV Index: " + response.value + "</div>");


            });

        });

        // another request is made to the API to return the 5 days forecast data
        $.ajax({
            url: urlForecast,
            method: "GET"
        }).then(function (response) {
            // let declare the variable array for the five days
            var fiveDay = [0, 8, 16, 24, 32];
            var fivedayData = $(".fivedayForecast").addClass("card-text");
            fivedayData.empty();

            //we loop in to the variable fiveDay 
            fiveDay.forEach(function (i) {
                var fivedayTimeUTC1 = new Date(response.list[i].dt * 1000);
                fivedayTimeUTC1 = fivedayTimeUTC1.toLocaleDateString("en-US");

                fivedayData.append("<div class=fivedayStyle>" + "<p>" + fivedayTimeUTC1 + "</p>" 
                + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` 
                + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
}); 

