let dragCard = null; // Variabel för att hålla koll på det kort som dras

// Funktion för att konfigurera drag- och släpp-funktionalitet för ett kort
export function setupDragCard(card) {
    // Händelsehanterare för när kortet börjar dras
    card.addEventListener('dragstart', function() {
        dragCard = card; // Spara referens till det dragna kortet
        card.style.opacity = '0.5'; // Sänk opaciteten för kortet medan det dras
    });

    // Händelsehanterare för när kortet slutar dras
    card.addEventListener('dragend', function() {
        dragCard = null; // Återställ dragCard-referensen
        card.style.opacity = '1'; // Återställ kortets opacitet
    });

    // Klickhändelse för att redigera kortets innehåll
    card.addEventListener('click', function() {
        const currentText = card.querySelector('p').textContent; // Hämtar nuvarande text på kortet
        const input = document.createElement('input'); // Skapar ett input-element för att redigera texten
        input.type = 'text'; // Definierar input-typen
        input.value = currentText; // Sätter nuvarande text som input-värde
        card.innerHTML = ''; // Töm kortet
        card.appendChild(input); // Lägger till input-elementet i kortet
        input.focus(); // Ger fokus till input-fältet

        // Spara ändringar när input-fältet tappar fokus
        input.addEventListener('blur', saveChanges);

        // Spara ändringar när användaren trycker på "Enter"
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                saveChanges(); // Anropar funktionen för att spara ändringar
            }
        });

        // Funktion för att spara de nya ändringarna
        function saveChanges() {
            const newText = input.value; // Hämtar den nya texten från input-fältet
            card.innerHTML = ''; // Tömmer kortet igen
            const p = document.createElement('p'); // Skapar ett p-element för den nya texten
            p.textContent = newText; // Sätter den nya texten
            card.appendChild(p); // Lägger till texten i kortet
            
            // Skapar och lägger till "Delete"-knappen igen
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            card.appendChild(deleteButton);

            // Återaktiverar "Delete"-knappen och drag- och släpp-funktionalitet
            setupDeleteButton(card, deleteButton);
            setupDragCard(card);

            saveToLocalStorage(); // Sparar uppdaterat bräde i localStorage
        }
    });
}

// Funktion för att hämta det kort som dras
export function getDragCard() {
    return dragCard; // Returnerar det dragna kortet
}

// Funktion för att konfigurera "Delete"-knappen för ett kort
export function setupDeleteButton(card, deleteButton) {
    // När "Delete"-knappen klickas
    deleteButton.onclick = function() {
        card.remove(); // Tar bort kortet från DOM
        saveToLocalStorage(); // Sparar uppdaterat bräde i localStorage
    };
}

// Funktion för att spara Kanban-brädet i localStorage
function saveToLocalStorage() {
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar på brädet
    const boardData = {}; // Skapar ett objekt för att lagra brädets data

    // Loopar igenom varje box och sparar dess kort
    boxes.forEach(box => {
        const boxTitle = box.querySelector('h2').textContent; // Hämtar boxens titel
        const cards = Array.from(box.querySelectorAll('.card')).map(card => card.querySelector('p').textContent); // Hämtar alla kortens texter
        boardData[boxTitle] = cards; // Lagrar kortens texter under respektive box-titel
    });

    // Sparar brädets data i localStorage i JSON-format
    localStorage.setItem('kanbanBoard', JSON.stringify(boardData)); 
}
