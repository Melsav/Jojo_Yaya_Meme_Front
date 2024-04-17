// Récupérer le bouton de connexion anonyme
const btnConnexionAnonyme = document.getElementById('btnConnexionAnonyme');

// Ajouter un écouteur d'événements au clic sur le bouton
btnConnexionAnonyme.addEventListener('click', () => {
    // Envoi d'une requête au backend pour enregistrer la connexion anonyme
    fetch('http://127.0.0.1:3000/login/anon', {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion anonyme');
        }
        // Redirection de l'utilisateur vers la page des prévisions météorologiques
        window.location.href = '../weather/prevision_meteo.html';
    })
    .catch(error => {
        console.error('Erreur lors de la connexion anonyme', error);
    });
});
