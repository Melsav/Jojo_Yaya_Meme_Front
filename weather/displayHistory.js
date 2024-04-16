const apiUrl = "http://localhost:3000";

fetch(`${apiUrl}/weather/history`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Réponse non valide du backend');
        }
        return response.json();
    })
    .then(data => {
        // Sélection de l'élément HTML où vous voulez afficher les données météo
        const searchHistory = document.getElementById('search-history');

        // Itération sur chaque objet météo dans le tableau
        data.forEach(item => {
            // Création d'un élément <li> pour afficher les informations météo
            const listItem = document.createElement('li');
            // Construction du texte à afficher pour chaque entrée météo
            const text = `${item.city} : Température ${item.temperature}°C, ${item.description}`;
            // Attribution du texte à l'élément <li>
            listItem.textContent = text;
            // Ajout de l'élément <li> à l'élément où vous voulez afficher les données
            searchHistory.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données météo:', error);
    });

document.getElementById('btn_home').addEventListener('click', function() {
    window.location.href = '../authent/register.html'; 
});

function displaySearchHistory() {
    fetch(`${apiUrl}/weather/history`)
        .then(response => response.json())
        .then(history => {
            const historyContainer = document.getElementById('search-history');
            historyContainer.innerHTML = ''; // Effacez le contenu précédent

            history.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `Ville: ${entry.city}, Température: ${entry.details.temp}, Description: ${entry.details.description}`;
                historyContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'historique des recherches:', error);
        });
}
