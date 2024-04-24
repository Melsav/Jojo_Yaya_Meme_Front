
 const apiUrl = "http://localhost:3000";
function displaySearchHistory() {
    fetch(`${apiUrl}/weather/history`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide du backend');
            }
            console.log("Réponse du backend reçue avec succès");
            return response.json();
        })
        .then(data => {
            const searchHistory = document.getElementById('search-history');
            searchHistory.innerHTML = '';
            console.log("Données météorologiques reçues:", data);
            data.forEach(item => {
                const listItem = document.createElement('li');
                const text = `
                    Ville: ${item.city}
                    Température: ${item.temperature}°C
                    Date : ${item.created_at}
                    Utilisateur : ${item.userType}
                `;
                listItem.textContent = text;
                searchHistory.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'historique des recherches:', error);
        });
}


displaySearchHistory();
