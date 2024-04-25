const apiUrl = "http://localhost:3000";

function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json' 
    };
    return fetch(url, { ...options, headers });
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('  vous devez vous connecter ok');
    }
    return response.json();  
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
                const text = `Ville: ${item.city}, Température: ${item.temperature}°C, Date: ${item.created_at}`;
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
