const apiUrl = "http://localhost:3000"; 

function displayMostClickedCountries() {
    fetch(`${apiUrl}/weather/most_clicked_countries`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide du backend');
            }
            return response.json();
        })
        .then(data => {
            const mostClickedCountriesList = document.getElementById('most-clicked-countries');
            mostClickedCountriesList.innerHTML = '';
            data.forEach(country => {
                const listItem = document.createElement('li');
                listItem.textContent = country[0] + ' - ' + country[1] + ' clics';
                mostClickedCountriesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des pays les plus cliqués:', error);
        });
}


function displayMostClickedCities() {
    fetch(`${apiUrl}/weather/most_clicked_cities`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide du backend');
            }
            return response.json();
        })
        .then(data => {
            const mostClickedCitiesList = document.getElementById('most-clicked-cities');
            mostClickedCitiesList.innerHTML = '';
            data.forEach(city => {
                const listItem = document.createElement('li');
                listItem.textContent = city[0] + ' - ' + city[1] + ' clics';
                mostClickedCitiesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des villes les plus cliquées:', error);
        });
}


displayMostClickedCountries();
displayMostClickedCities();
function displayUserFavorites() {
    fetch(`${apiUrl}/favoris`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide du backend');
            }
            return response.json();
        })
        .then(data => {
            const userFavoritesList = document.getElementById('user-favorites-list');
            userFavoritesList.innerHTML = '';
            data.forEach(favorite => {
                const listItem = document.createElement('li');
                listItem.textContent = favorite.name; 
                userFavoritesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des favoris de l\'utilisateur:', error);
        });
}


displayUserFavorites();