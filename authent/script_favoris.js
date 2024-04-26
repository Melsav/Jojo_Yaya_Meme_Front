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


function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json' 
    };
    return fetch(url, { ...options, headers });
}


// Afficher les favoris de l'utilisateur lorsqu'il clique sur le bouton "Mes favoris"
document.getElementById('view-favorites-btn').addEventListener('click', function() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        displayUserFavorites();
        document.getElementById('favorites-section').style.display = 'block';
        document.getElementById('favorite-country').style.display = 'block';
        document.getElementById('login-message').style.display = 'none';
    } else {
        document.getElementById('favorite-country').style.display = 'none';
        document.getElementById('favorites-section').style.display = 'none';
        document.getElementById('login-message').style.display = 'block';
    }
});

function displayUserFavorites() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return; 
    }

    fetch(`${apiUrl}/favoris`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('backend nok');
        }
        return response.json();
    })
    .then(data => {
        const userFavoritesList = document.getElementById('user-favorites-list');
        userFavoritesList.innerHTML = '';
        data.forEach(favorite => {
            const listItem = document.createElement('li');
            listItem.textContent = `${favorite.city}, ${favorite.country}`; 
            const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.addEventListener('click', function() {
                    deleteFavorite(favorite);
                });
                listItem.appendChild(deleteButton);
            userFavoritesList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des favoris de l\'utilisateur:', error);
        
    });
}

displayUserFavorites();

// Ajouter un favori lorsque l'utilisateur soumet le formulaire
document.getElementById('add-favorites-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const city = document.getElementById('favorite-city').value;
    const country = document.getElementById('favorite-country').value;
    addFavorite(city,country);
});

function addFavorite(city, country) {
    const body = JSON.stringify({ city: city, country: country });

    fetchWithAuth(`${apiUrl}/addFavorite`, {
        method: 'POST',
        body: body
    })
    .then(response => {
        if (!response.ok) {
           
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); 
    })
    .then(text => {
        try {
            const data = JSON.parse(text); 
            console.log('Favori ajouté avec succès', data);
            displayUserFavorites(); 
        } catch (e) {
            console.error('Erreur lors du parsing de la réponse:', text);
            throw e; 
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du favori:', error);
    });
}

function deleteFavorite(favorite) {
    fetchWithAuth(`${apiUrl}/removeFavorite`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            city: favorite.city,
            country: favorite.country
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`ERREUR SUPPRESSION: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data.message); 
        displayUserFavorites(); // mettre à jour
    })
    .catch(error => {
        console.error('Erreur lors de la suppression :', error);
    });
}