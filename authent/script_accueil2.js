

// Gestion du formulaire de feedback (assume existence of form and textarea)
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = this.querySelector('textarea').value;
    fetch('/sendFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedback })
    }).then(response => {
        if (response.ok) {
            alert('Merci pour votre commentaire!');
            console.log("ee");
            this.reset();
        } else {
            console.log("ee");
            alert('Erreur lors de l\'envoi du commentaire.');
        }
    }).catch(() => alert('Erreur lors de l\'envoi du commentaire.'));
});
