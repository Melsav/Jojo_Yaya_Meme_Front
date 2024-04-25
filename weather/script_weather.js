const apiUrl = "http://localhost:3000";

function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'  // Adding this to ensure JSON is handled correctly
    };
    return fetch(url, { ...options, headers });
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();  // This ensures the function returns a promise that resolves with the JSON data
}

function displaySearchHistory() {
    fetchWithAuth(`${apiUrl}/weather/history`)
        .then(handleResponse)
        .then(data => {
            const searchHistory = document.getElementById('search-history');
            searchHistory.innerHTML = ''; 
            console.log("Données météorologiques reçues:", data);
            data.forEach(item => {
                const listItem = document.createElement('li');
                const text = `Ville: ${item.city}, Température: ${item.temperature}°C, Date: ${item.created_at}, Utilisateur: ${item.userType}`;
                listItem.textContent = text;
                searchHistory.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'historique des recherches:', error);
            displayError(error);  
        });
}

function displayError(error) {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = `<li>Error: ${error.message}</li>`; }

displaySearchHistory();
