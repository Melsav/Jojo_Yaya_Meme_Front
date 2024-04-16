var mymap = L.map('map').setView([0, 0], 2);
var snowflakesContainer = document.createElement('div'); 
snowflakesContainer.id = 'snowflakes-container';
document.body.appendChild(snowflakesContainer); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

mymap.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide de l\'API Nominatim');
            }
            return response.json();
        })
        .then(data => {
            var locationName = data.address.city || data.address.country; // Choisissez la propriété appropriée
            getWeatherData(lat, lon, locationName);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations de localisation', error);
        });
});

function getWeatherData(lat, lon, locationName) {
    const apiKey = 'ae389c751139d10e6c783635a12a3b6e'; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide de l\'API OpenWeatherMap');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherInfo(data, locationName);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météorologiques', error);
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

    // Vérifie si la température est inférieure à 10 degrés Celsius
    if (data.main.temp < 10) {
        createSnowfall(); // Lance l'effet de neige
    }
}

function createSnowfall() {
    for (let i = 0; i < 50; i++) {
        createSnowflake();
    }

    // Arrête la chute de neige après 5 secondes
    setTimeout(() => {
        while (snowflakesContainer.firstChild) {
            snowflakesContainer.removeChild(snowflakesContainer.firstChild);
        }
    }, 5000); // 5000 millisecondes = 5 secondes
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 2 + 1}s`; // Durée de l'animation entre 1s et 3s
    snowflakesContainer.appendChild(snowflake);
}
