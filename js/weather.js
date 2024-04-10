//Define API KEY
apiKey = '01094cef1967b9113eadf4f6efd0139d';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GEOLOCATION ENABLED FORECAST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var geoErr = document.getElementById("Geolocation");
function defaultWeather(){ //Define Function
    //Recieve user location from Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        geoErr.innerHTML = "Geolocation is not supported by this browser.";
    } 
    //Geo Location Error Handling
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
            geoErr.innerHTML = "Please allow Location Access to see the stargazing conditions in your area or search for a location."
            break;
            case error.POSITION_UNAVAILABLE:
            geoErr.innerHTML = "Location information is unavailable."
            break;
        }
    }
     
    //Display User Position
    function showPosition(position) {
        //Get Geolocation
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=2&appid=" + apiKey) //Fetch API from OpenWeathermap.org
            .then((response) => response.json())
            .then((data) => {

                const {name,country} = data[0];
                var city = document.querySelector(".city").innerText = (`${name}`) + ", " + (`${country}`);

                //Tonight Daily Summary
                fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&cnt=4&appid=" + apiKey) //Fetch API from OpenWeathermap.org
                .then((response) => response.json())
                .then((data) => {       
                    data.list.forEach((summary, index) => {

                        const { clouds, dt, sunset, weather, rain, humidity} = summary;
                        const { description } = weather[0];
                        const unixTimestampSunset = sunset; 
                        const sunsetDate = new Date(unixTimestampSunset * 1000); 

                        const unixTimestamp = dt; 
                        const myDate = new Date(unixTimestamp * 1000); 
                        const options = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        };

                        const mainSummary = document.querySelectorAll(".main-summary")[index]; 

                        const timeElement = mainSummary.querySelector(".myDate");
                        const descriptionElement = mainSummary.querySelector(".description");
                        const cloudsElement = mainSummary.querySelector(".clouds");
                        const sunsetElement = mainSummary.querySelector(".sunset");
                        timeElement.innerHTML = `${myDate.toLocaleDateString( "en-US" ,options )}`; 
                        descriptionElement.innerText = `${description}`;
                        cloudsElement.innerText = `Cloud Coverage: ${clouds}%`;
                        sunsetElement.innerText = `Sunset: ${sunsetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

                        //Stargazing Quality Calculation
                        const cloudFactor = (100 - clouds) / 100; 
                        const humidityFactor = humidity / 100;
                        const rainFactor = 1 - (rain / 100);
                        
                        const quality = Math.max(0, cloudFactor * humidityFactor * rainFactor * 10); 
                        const qualityOut = Math.round(quality);
                        document.querySelector(".rating").innerText = (`Rating: ${qualityOut}/10`);

                        if (qualityOut == 0 || qualityOut == 1 || qualityOut == 2 || qualityOut == 3){
                            document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: POOR`);
                        } else if (qualityOut == 4 || qualityOut == 4 || qualityOut == 5 || qualityOut == 6){
                            document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: FAIR`);
                        }  else if (qualityOut == 7 || qualityOut == 8 || qualityOut == 9 || qualityOut == 10) {
                            document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: GOOD`);
                        } else {                        
                            document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: Error`);
                            document.querySelector(".rating").innerText = (`Rating: Error`);
                        };
                    });
                });
                //Forecast Data
                fetch("https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "&units=metric&cnt=120&appid=" + apiKey) //Fetch API from OpenWeathermap.org
                .then((response) => response.json())
                .then((data) => {
                    data.list.forEach((forecast, index) => {

                        const { dt, weather, clouds, sys } = forecast;
                        const { icon } = weather[0];
                        const { all } = clouds;
                        const { pod } = sys;

                        if (pod === 'd') {
                            return; // Skip to hours after sunset
                        }

                        const unixTimestamp = dt;
                        const myForecastDate = new Date(unixTimestamp * 1000);

                        const forecastContainer = document.querySelectorAll(".tonight-forecast > div")[index];

                        const timeElement = forecastContainer.querySelector(".forecast-time");
                        const iconElement = forecastContainer.querySelector(".forecast-icon");
                        const cloudsElement = forecastContainer.querySelector(".forecast-clouds");

                        timeElement.innerText = `${myForecastDate.toLocaleTimeString()}`;
                        iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
                        cloudsElement.innerText = `Cloud Coverage: ${all}%`;

                        

                    });
                });
            })})

            $(document).ready(function () {
                $(".forecast-weather-btn0").toggle();
            });
            $(document).ready(function () {
                $(".forecast-weather-btn1").toggle();
            });
            $(document).ready(function () {
                $(".forecast-weather-btn2").toggle();
            });
            $(document).ready(function () {
                $(".forecast-weather-btn3").toggle();
            });

        
    }

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SEARCH INPUT ENABLED FORECAST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchWeather(selectedBookmark, bookmarkSelected){ //Define Function
    var city = document.getElementById("search-input").value; //Get Location from user input in search bar
    if (bookmarkSelected == true){
    city = selectedBookmark;
    }

    //Tonight Daily Summary
    fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&cnt=4&appid=" + apiKey) //Fetch API from OpenWeathermap.org
    .then((response) => response.json())
    .then((data) => {       

        const { country }= data.city;

        data.list.forEach((summary, index) => {

            const { clouds, dt, sunset, weather, rain, humidity} = summary;
            const { description } = weather[0];

            const unixTimestampSunset = sunset; 
            const sunsetDate = new Date(unixTimestampSunset * 1000); 

            const unixTimestamp = dt; 
            const myDate = new Date(unixTimestamp * 1000); 
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            const mainSummary = document.querySelectorAll(".main-summary")[index];
            const timeElement = mainSummary.querySelector(".myDate");
            const descriptionElement = mainSummary.querySelector(".description");
            const cloudsElement = mainSummary.querySelector(".clouds");
            const sunsetElement = mainSummary.querySelector(".sunset");


            timeElement.innerHTML = `${myDate.toLocaleDateString( "en-US" ,options )}`; 
            descriptionElement.innerText = `${description}`;
            cloudsElement.innerText = `Cloud Coverage: ${clouds}%`;
            sunsetElement.innerText = `Sunset: ${sunsetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

            //Stargazing Quality Calculation
            const cloudFactor = (100 - clouds) / 100; 
            const humidityFactor = humidity / 100;
            const rainFactor = 1 - (rain / 100);
            
            const quality = Math.max(0, cloudFactor * humidityFactor * rainFactor * 10); 
            const qualityOut = Math.round(quality);
            if (qualityOut == 0 || qualityOut == 1 || qualityOut == 2 || qualityOut == 3){
                document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: POOR`);
            } else if (qualityOut == 4 || qualityOut == 4 || qualityOut == 5 || qualityOut == 6){
                document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: FAIR`);
            }  else if (qualityOut == 7 || qualityOut == 8 || qualityOut == 9 || qualityOut == 10) {
                document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: GOOD`);
            } else {                        
                document.querySelector(".quality").innerText = (`OVERALL CONDITIONS: Error`);
                document.querySelector(".rating").innerText = (`Rating: Error`);            };


        });

        document.querySelector(".city").innerText = (`${city}`) + ", " + (`${country}`);
    });

    //Forecast Data
    fetch("https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "&units=metric&cnt=120&appid=" + apiKey) //Fetch API from OpenWeathermap.org
    .then((response) => response.json())
    .then((data) => {


        data.list.forEach((forecast, index) => {
        
            const { dt, weather, clouds, sys } = forecast;
            const { icon } = weather[0];
            const { all } = clouds;
            const { pod } = sys;


            if (pod === 'd') {
                return; // Skip to hours after sunset
            }

            const unixTimestamp = dt;
            const myForecastDate = new Date(unixTimestamp * 1000);

            const forecastContainer = document.querySelectorAll(".tonight-forecast > div")[index];
            const timeElement = forecastContainer.querySelector(".forecast-time");
            const iconElement = forecastContainer.querySelector(".forecast-icon");
            const cloudsElement = forecastContainer.querySelector(".forecast-clouds");

            timeElement.innerText = `${myForecastDate.toLocaleTimeString()}`;
            iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            cloudsElement.innerText = `Cloud Coverage: ${all}%`;

        });
    });
    
    $(document).ready(function () {
        $(".forecast-weather-btn0").show();
    });
    $(document).ready(function () {
        $(".forecast-weather-btn1").show();
    });
    $(document).ready(function () {
        $(".forecast-weather-btn2").show();
    });
    $(document).ready(function () {
        $(".forecast-weather-btn3").show();
    });
    //Remove error when search input filled
    $(document).ready(function () {
        $(".popup").remove();
    });
    
} 
                

            
            


