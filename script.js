const apiKey = "91c088e6e24cf4c60759a8d8ec065cdc"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector('#searchBar');
const searchBtn = document.querySelector('.search-container button')
const searhImg = document.querySelector('.search-container button img')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    var data = await response.json()

    if (data.cod === '404') {
        // alert('Enter correct Cityname!')
        document.querySelector('.city').innerHTML = 'Enter a valid City!'
        return
    } else if (data.cod === '400') {
        // alert('Enter a Cityname First!')
        document.querySelector('.city').innerHTML = 'Enter a Cityname first!'
        return
    } else {
        console.log(data)
        function convertUnixTimestampToTimeString(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12 || 12;               // Convert hours to 12-hour format
            return `${hours}:${minutes} ${ampm}`;
        }
        const sunriseTime = convertUnixTimestampToTimeString(data.sys.sunrise);
        const sunsetTime = convertUnixTimestampToTimeString(data.sys.sunset);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
        document.querySelector('.description').innerHTML = (data.weather[0].description).replace(/\b\w/g, (match) => match.toUpperCase());
        document.querySelector('.feels-like').innerHTML = Math.round(data.main.feels_like) + '°c';
        document.querySelector('.pressure').innerHTML = data.main.pressure + ' mb';
        document.querySelector('.max').innerHTML = Math.round(data.main.temp_max) + '°c';
        document.querySelector('.min').innerHTML = Math.round(data.main.temp_min) + '°c';
        document.querySelector('.rise').innerHTML = sunriseTime;
        document.querySelector('.set').innerHTML = sunsetTime;



        const dateOne = new Date(data.dt * 1000);
        const hours = dateOne.getHours();
        console.log(hours)
        if (hours >= 6 && hours <= 18) {
            // Day Case 
            if (data.weather[0].main == 'Clouds' || data.weather[0].main == 'Haze') {
                weatherIcon.src = 'images/clouds.png'
            }
            else if (data.weather[0].main == 'Smoke') {
                weatherIcon.src = 'images/carbon-dioxide.png'
            }
            else if (data.weather[0].main == 'Clear') {
                weatherIcon.src = 'images/clear.png'
            }
            else if (data.weather[0].main == 'Rain') {
                weatherIcon.src = 'images/rain (1).png'
            }
            else if (data.weather[0].main == 'Drizzle') {
                weatherIcon.src = 'images/drizzle.png'
            }
            else if (data.weather[0].main == 'Mist') {
                weatherIcon.src = 'images/mist.png'
            }
        } else {
            // Night Case 
            if (data.weather[0].main == 'Clouds') {
                weatherIcon.src = 'images/cloudy-night.png'
            }
            else if (data.weather[0].main == 'Smoke') {
                weatherIcon.src = 'images/carbon-dioxide.png'
            }
            else if (data.weather[0].main == 'Clear') {
                weatherIcon.src = 'images/clear-moon.png'
            }
            else if (data.weather[0].main == 'Rain') {
                weatherIcon.src = 'images/rain (1).png'
            }
            else if (data.weather[0].main == 'Drizzle') {
                weatherIcon.src = 'images/drizzle-moon.png'
            }
            else if (data.weather[0].main == 'Mist') {
                weatherIcon.src = 'images/cloudy-night.png'
            }
        }
    }
}
// To Display Default Data on first load
checkWeather('kolkata')

// 
searchBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
})