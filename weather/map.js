
function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json' 
    };
    return fetch(url, { ...options, headers });
}
var mymap = L.map('map').setView([0, 0], 2);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);


var snowflakesContainer = document.createElement('div');
snowflakesContainer.id = 'snowflakes-container';
document.body.appendChild(snowflakesContainer);


mymap.on('click', function (e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    fetch(nominatimUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide de l\'API Nominatim');
            }
            return response.json();
        })
        .then(data => {
            const locationName = data.address && data.address.city ? data.address.city :
                                 (data.address.country || 'Localisation inconnue');
            getWeatherData(lat, lon, locationName);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations de localisation:', error);
            alert('Erreur lors de la récupération des informations de localisation. Voir la console pour les détails.');
        });
});

function getWeatherData(lat, lon, locationName) {
    const apiKey = 'ae389c751139d10e6c783635a12a3b6e';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherInfo(data, locationName);
            const postData = {
                latitude: lat,
                longitude: lon,
                locationName: locationName,
                weather: data.weather[0].description,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            };
            return fetchWithAuth('http://localhost:3000/weather/data_map', {
                method: 'POST',
                body: JSON.stringify(postData)
            });
        })
        .then(response => response.json())
        .then(result => console.log('Data successfully sent to the server:', result))
        .catch(error => {
            console.error('Error:', error);
            
        });
}

function displayWeatherInfo(data, locationName) {
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <strong>Pays :</strong> ${locationName}<br>
        <strong>Météo :</strong> ${data.weather[0].description}<br>
        <strong>Température :</strong> ${data.main.temp} °C<br>
        <strong>Humidité :</strong> ${data.main.humidity}%<br>
        <strong>Vitesse du vent :</strong> ${data.wind.speed} m/s
    `;
    weatherInfo.style.display = 'block';

    if (data.main.temp < 10) {
        createSnowfall();
    }
}

function createSnowfall() {
    for (let i = 0; i < 50; i++) {
        createSnowflake();
    }
    setTimeout(() => snowflakesContainer.innerHTML = '', 5000);
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 2 + 1}s`;
    snowflakesContainer.appendChild(snowflake);
}
