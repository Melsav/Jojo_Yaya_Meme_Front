const apiUrl = "http://localhost:3000"; // Remplacez par l'URL de votre backend
// Fonction pour récupérer et afficher les pays les plus cliqués
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

// Fonction pour récupérer et afficher les villes les plus cliquées
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

// Appel des fonctions pour afficher les pays et villes les plus cliqués
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
                listItem.textContent = favorite.name; // Supposons que le nom du favori soit stocké dans une propriété "name"
                userFavoritesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des favoris de l\'utilisateur:', error);
        });
}

// Appel de la fonction pour afficher les favoris de l'utilisateur
displayUserFavorites();