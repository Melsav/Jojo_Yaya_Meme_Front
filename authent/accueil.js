const btnConnexionAnonyme = document.getElementById('btnConnexionAnonyme');


btnConnexionAnonyme.addEventListener('click', () => {
    /* Envoi d'une requête au backend pour enregistrer la connexion anonyme
    fetch('http://192.168.1.36:3000/login/anon', {
        method: 'POST',
    })*/
    fetch('http://127.0.0.1:3000/login/anon', {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion anonyme');
        }
        
        window.location.href = '../weather/prevision_meteo.html';
    })
    .catch(error => {
        console.error('Erreur lors de la connexion anonyme', error);
    });
});
