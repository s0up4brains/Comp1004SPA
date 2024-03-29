//Define API KEY
apiKey = '01094cef1967b9113eadf4f6efd0139d';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var x = document.getElementById("Geolocation");
function defaultWeather(){ //Define Function
    //Recieve user location from Geolocation
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
        //Geo Location Error Handling
        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                x.innerHTML = "Please allow Location Access to see the stargazing conditions in your area."
                break;
                case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            }}

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
                        fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&cnt=3&appid=" + apiKey) //Fetch API from OpenWeathermap.org
                        .then((response) => response.json())
                        .then((data) => {
                            //Recieve Data From the JSON file in the API and assign to variables
                            // const {sunset, clouds, rain,pop,speed} = data.list[0];
                            
                            const {description} = data.list[0].weather[0];
                            const {min, max, eve, night} = data.list[0].temp;
                            const {dt, sunset, clouds, pop, rain} = data.list[0];
                            
                            const unixTimestamp = dt; 
                            const myDate = new Date(unixTimestamp * 1000); 
                            
                            
                            
                            //Writes variables to HTML Class
                            document.querySelector(".myDate").innerText = (`${myDate.toDateString()}`);
                            document.querySelector(".description").innerText = (`${description}`);
                            //Temps
                            document.querySelector(".min").innerText = (`Low: ${min} °C`);
                            document.querySelector(".max").innerText = (`High: ${max} °C`);
                            // document.querySelector(".eve").innerText = (`18:00 ${eve}`);
                            // document.querySelector(".night").innerText = (`00:00: ${night} °C`);
                            
                            document.querySelector(".sunset").innerText = (`${sunset}`);
                            document.querySelector(".clouds").innerText = (`${clouds}`);
                            document.querySelector(".pop").innerText = (`${pop}`);
                            document.querySelector(".rain").innerText = (`${rain}`);
                            
  
                        
                        });
                        
                        //Tonight Forecast

                        
                    });
                });
            }
        }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// //Search Weather
// function fetchWeather(){ //Define Function
//     var city = document.getElementById("search-input").value; //Get Location from user input in search bar


//     // CURRENT WEATHER FROM SEARCH
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey) //Fetch API from OpenWeathermap.org
//     .then((response) => response.json())
//     .then((data) => {
//         //Recieve Data From the JSON file in the API and assign to variables
//         const {description, icon} = data.weather[0];
//         const {temp, temp_min, temp_max, pressure, humidity} = data.main;
//         const {speed} = data.wind;
//         const {all} = data.clouds;
//         const {country} = data.sys;


//         //Writes variables to HTML Class
//         document.querySelector(".writeIcon").src="https://openweathermap.org/img/wn/"+ icon + ".png",
//         document.querySelector(".city").innerText = (`${city.toUpperCase()}, ${country}`),
//         document.querySelector(".description").innerText = (`${description}`),
//         document.querySelector(".temp").innerText = (`${temp}°C`),
//         document.querySelector(".temp_range").innerText = (`High of ${temp_max} °C  and low of ${temp_min}°C`)
//         document.querySelector(".speed").innerText = (`Wind Speed: ${speed} (m/s)`),
//         document.querySelector(".clouds").innerText = (`Cloud Coverage: ${all} %`)

//         ; 
//     });

// }
