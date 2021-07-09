const apiKey = "0bd2de9b41aedcd7a31cc3a04fa4e9aa";

const getCurrentWeather = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);

        //create a template html in string format
        const  template = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${data.name} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h5>
                    <h6 class="card-subtitle mb-2 text-muted">${new Date().toLocaleDateString()}</h6>
                    <p class="card-text">Temp: ${data.main.temp} F</p>
                    <p class="card-text">Wind Speed:${data.wind.speed} mph</p>
                    <p class="card-text">Humidity: ${data.main.humidity} %</p>
                </div>
            </div>
        `;

        //convert the string into html and add it to the page
        document.querySelector("#current-weather").innerHTML = template;
    })
    .catch((err) => {
        if (err) throw err;
    })
    .finally(() => console.log("API call complete."));
}

const getForecast = (cityName) => {
    //get the data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {

        //console.log(data);

        const filteredData = data.list.filter(info => info.dt_txt.charAt(12) == '5');

        //create a template html in string format
        let  template = ``;

        filteredData.forEach(data => {
            template += `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.dt_txt.replaceAll(":00:00",":00")} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h5>
                        <h6 class="card-subtitle mb-2 text-muted">${new Date().toLocaleDateString()}</h6>
                        <p class="card-text">Temp: ${data.main.temp} F</p>
                        <p class="card-text">Wind Speed:${data.wind.speed} mph</p>
                        <p class="card-text">Humidity: ${data.main.humidity} %</p>
                    </div>
                </div>
            `;
        });

        document.querySelector("#forecast").innerHTML = template;

        //convert the string into html and add it to the page
        //document.querySelector("#current-weather").innerHTML = template;
    })
    .catch((err) => {
        if (err) throw err;
    })
    .finally(() => console.log("API call complete."));
}

document.querySelector("#city-form").addEventListener("submit", (event) => {
    event.preventDefault();

    //get user input
    const userInput = document.querySelector("#city-input").value;

    getCurrentWeather(userInput);

    //get 5 day forecast data
    getForecast(userInput);
});