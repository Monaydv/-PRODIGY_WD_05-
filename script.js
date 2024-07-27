document.addEventListener('DOMContentLoaded', () => {
    const weatherInfo = document.getElementById('weather-info');
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const locationInput = document.getElementById('location-input');
    const fetchWeatherBtn = document.getElementById('fetch-weather-btn');


    const apiKey = 'bd4c062b6d5380a6f95199b08e432bc4';

    const fetchWeatherData = (url) => {

        fetch(url)
            .then(response => response.json())
            .then(report => {
                const { name, weather, main, wind, clouds, sys } = report;
                const weatherDescription = weather[0].description;
                const temperature = main.temp;
                const feelsLike = main.feels_like;
                const humidity = main.humidity;
                const pressure = main.pressure;
                const windSpeed = wind.speed;
                const cloudiness = clouds.all;
                const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
                const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

                const weatherHTML = `
                <div class="weather-item">
                    
                    <p>${weatherDescription}</p>
                    <p>Temperature: ${temperature} °C</p>
                    <p>Feels Like: ${feelsLike} °C</p>
                    <p>Humidity: ${humidity} %</p>
                    <p>Pressure: ${pressure} hPa</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Cloudiness: ${cloudiness} %</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                </div>
                        `;
                weatherInfo.innerHTML = weatherHTML;

                updateBackgroundImage(weatherDescription);
            })
            .catch(error => {
                weatherInfo.innerHTML = '<p>Unable to fetch data ...</p>';
                console.error('Error fetching weather data', error);
            });

    };

    const fetchWeatherByLocation = (location) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        fetchWeatherData(url);
    };

    const updateBackgroundImage = (weatherDescription) => {

        switch (weatherDescription.toLowerCase()) {
            case 'clear sky':
                document.body.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMgjkI_jKQ0gs6lDBwSAYAY7Or5w1Wv_LXQ&s)';
                break;
            case 'few clouds':
                document.body.style.backgroundImage = 'url(https://www.shutterstock.com/image-photo/little-white-clouds-blue-skies-260nw-1496834999.jpg)';
                break;
            case 'scattered clouds':
                document.body.style.backgroundImage = 'url(https://media.istockphoto.com/id/1056114514/photo/background-clouds-with-a-blue-sky.jpg?s=612x612&w=0&k=20&c=yykZhpC9PAUGJJ-HrwK63xrivABYjuvWxtJtNV75vd0=)';
                break;
            case 'broken clouds':
                document.body.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nM92xiO3DuNM-chZVneyc8zZlZhiKyHmSijR-v1lf5cYUZd_XF2Yn1NLqg&s)';
                break;
            case 'shower rain':
                document.body.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuMArjtMdo0vWo58cKE-TeV18vkZEJM66Tg&s)';
                break;
            case 'rain':
                document.body.style.backgroundImage = 'url(https://images.pexels.com/photos/304875/pexels-photo-304875.jpeg?cs=srgb&dl=pexels-veeterzy-304875.jpg&fm=jpg)';
                break;
            case 'thunderstorm':
                document.body.style.backgroundImage = 'url(https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1162251.jpg&fm=jpg)';
                break;
            case 'snow':
                document.body.style.backgroundImage = 'url(https://images7.alphacoders.com/134/1343531.png)';
                break;
            case 'mist':
                document.body.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLl3VAYx8_AG_flGJ-HTavh0sF5-2NtmLtMQ&s)';
                break;
            default:
                document.body.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwkjekDs6CGm6Xe8UCSScvscpLzy7GVVPDFA&s)';
        }
    };

    const updateDateTime = () => {
        const now = new Date();
        dateElement.textContent = `Date: ${now.toLocaleDateString()}`;
        timeElement.textContent = `Time: ${now.toLocaleTimeString()}`;
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

                fetchWeatherData(latitude, longitude);
            },
            error => {

                weatherInfo.innerHTML = '<p>Unable to retrieve your location.</p>';
                console.error('Error retrieving location:', error);
            }
        );
    } else {
        weatherInfo.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }

    fetchWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherByLocation(location);
        }
    });

    setInterval(updateDateTime, 1000);
    updateDateTime();

});
