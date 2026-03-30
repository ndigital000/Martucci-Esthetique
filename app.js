// 1. Diciamo al browser: "Aspetta che la pagina sia pronta prima di lavorare"
document.addEventListener('DOMContentLoaded', () => {
    console.log("Progetto Martucci caricato. Inizio a leggere i servizi e le recensioni...");

    // 2. Caricamento SERVIZI
    fetch('services.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore: Non riesco a trovare il file services.json");
            }
            return response.json();
        })
        .then(data => {
            console.log("Servizi ricevuti con successo!", data);
            creaGrigliaServizi(data.categorie);
        })
        .catch(error => {
            console.error("C'è stato un problema con i servizi:", error);
        });

    // 3. Caricamento RECENSIONI
    fetch('recensioni.json')
        .then(response => {
            if (!response.ok) throw new Error("File reviews.json non trovato");
            return response.json();
        })
        .then(data => {
            console.log("Recensioni ricevute con successo!", data);
            renderReviews(data.recensioni);
        })
        .catch(err => console.error("Errore recensioni:", err));
}); // <-- Questa chiude correttamente il DOMContentLoaded

// --- FUNZIONI (Vanno fuori dalle parentesi del DOMContentLoaded) ---

function creaGrigliaServizi(categorie) {
    const contenitore = document.getElementById('services-container');
    if (!contenitore) return;

    const divGriglia = document.createElement('div');
    divGriglia.className = 'services-grid';

    categorie.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'service-card';

        const titolo = document.createElement('h3');
        titolo.textContent = cat.nome;
        card.appendChild(titolo);

        const lista = document.createElement('ul');
        lista.className = 'treatment-list';

        cat.trattamenti.forEach(tratt => {
            const riga = document.createElement('li');
            riga.innerHTML = `
                <span class="treatment-title">${tratt.titolo}</span>
                <span class="treatment-price">${tratt.prezzo}</span>
            `;
            lista.appendChild(riga);
        });

        card.appendChild(lista);
        divGriglia.appendChild(card);
    });

    contenitore.innerHTML = '';
    contenitore.appendChild(divGriglia);
}

function renderReviews(recensioni) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const grid = document.createElement('div');
    grid.className = 'reviews-grid';

    recensioni.forEach(r => {
        const card = document.createElement('div');
        card.className = 'review-card';

        let stelleHTML = '★'.repeat(r.stelle) + '☆'.repeat(5 - r.stelle);

        card.innerHTML = `
            <p class="review-text">"${r.messaggio}"</p>
            <p class="client-name">${r.nome}</p>
            <div class="stars">${stelleHTML}</div>
        `;
        grid.appendChild(card);
    });

    container.innerHTML = ''; // Pulisce prima di aggiungere
    container.appendChild(grid);
}