
// Hämtar data från API + Error hantering 
let weather = {
    "apiKey": "03e0f9136587b9593a00f173e28e685c",
    fetchWeather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
          )
        .then((response) => {
            if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          } 
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    
        displayWeather: function(data) {
        
        // Hanterar datan från API
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        const { country, sunrise, sunset } = data.sys;
        
        // Komverterar unix timestamp (tid som bara dator kan läsa av) till vår tid som vi kan läsa av
        let unix_timestamp = sunset;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);

        let unix_timestamp2 = sunrise;
        var date = new Date(unix_timestamp2 * 1000);
        var hours2 = date.getHours();
        var minutes2 = "0" + date.getMinutes();

        var formattedTime2 = hours2 + ':' + minutes2.substr(-2);
        
        // Presenterar datan från väder API
        document.querySelector(".city").innerText = "Weather in " + name + ", " + country;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + Math.round(speed) + " km/h";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hpA";
        document.querySelector(".sunrise").innerText = "Sunrise: " + formattedTime2;
        document.querySelector(".sunset").innerText = "Sunset: " + formattedTime;
        document.querySelector(".weather").classList.remove("loading");
    }, 
    // Sökfunktionen 
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Malmo")