const apiUrl = "http://127.0.0.1:3000"; // Remplacez par l'URL de votre backend

function displaySearchHistory() {
    fetch(`${apiUrl}/weather/history`) // Endpoint backend pour l'historique des recherches
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

/* au cas où
fetch(`${apiUrl}/weather/history`)
    .then(response => response.json())
    .then(data => {
        console.log("Données météorologiques reçues:", data);
        // Appel de la fonction avec les données météorologiques
        // Remplacez afficherResultat par la fonction que vous utilisez pour afficher les résultats
       // afficherResultat(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
    });
*/
// Appel de la fonction pour afficher l'historique lors du chargement de la page
displaySearchHistory();
