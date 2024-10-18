import { setupDragCard } from './setupDragCard.mjs';
import { setupDeleteButton } from './setupDeleteButton.mjs';

// Funktion för att konfigurera "Add"-knappen i en specifik box
export function setupAddButton(box) {
    const input = box.querySelector('.inp'); // Hämtar inmatningsfältet för att lägga till nya kort
    const addButton = box.querySelector('.btn'); // Hämtar "Add"-knappen

    // Lyssnare för klickhändelse på "Add"-knappen
    addButton.addEventListener('click', () => {
        const cardText = input.value.trim(); // Hämtar och trimmar texten från inmatningsfältet
        if (cardText) { // Kontroll om texten inte är tom
            const newCard = createCardElement(cardText); // Skapar ett nytt kort
            box.querySelector('.cards').appendChild(newCard); // Lägger till det nya kortet i boxen
            input.value = ''; // Återställer inmatningsfältet

            saveToLocalStorage(); // Sparar det uppdaterade brädet i localStorage
        }
    });
}

// Funktion som skapar ett nytt kortelement
function createCardElement(text) {
    const newCard = document.createElement('div'); // Skapar en ny div för kortet
    newCard.classList.add('card'); // Lägger till CSS-klassen 'card'
    newCard.setAttribute('draggable', 'true'); // Gör kortet flyttbart med drag och släpp

    const cardText = document.createElement('p'); // Skapar en p-tagg för korttexten
    cardText.textContent = text; // Sätter textinnehållet till det som användaren skrev
    newCard.appendChild(cardText); // Lägger till texten i kortet

    const deleteButton = document.createElement('button'); // Skapar en "Delete"-knapp
    deleteButton.textContent = 'Delete'; // Sätter texten på knappen till 'Delete'
    deleteButton.classList.add('delete-btn'); // Lägger till CSS-klassen 'delete-btn'
    newCard.appendChild(deleteButton); // Lägger till "Delete"-knappen i kortet

    // Konfigurerar "Delete"-knappen så att den kan radera kortet
    setupDeleteButton(newCard, deleteButton);

    // Händelsehanterare för klick på "Delete"-knappen
    deleteButton.onclick = function() {
        newCard.remove(); // Tar bort kortet från DOM
        saveToLocalStorage(); // Sparar ändringen i localStorage
    };

    // Konfigurerar så att kortet kan dras och flyttas
    setupDragCard(newCard);

    return newCard; // Returnerar det nya kortet
}

// Funktion för att spara Kanban-brädet i localStorage
function saveToLocalStorage() {
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar på brädet
    const boardData = {}; // Skapar ett objekt för att lagra brädets data

    // Loopar igenom varje box och sparar dess kort
    boxes.forEach(box => {
        const boxTitle = box.querySelector('h2').textContent; // Hämtar boxens titel
        const cards = Array.from(box.querySelectorAll('.card')).map(card => card.querySelector('p').textContent); // Hämtar alla kortens texter
        boardData[boxTitle] = cards; // Lagrar kortens texter under boxens titel
    });

    // Sparar brädets data i localStorage i JSON-format
    localStorage.setItem('kanbanBoard', JSON.stringify(boardData));
}

// Funktion för att ladda Kanban-brädet från localStorage
export function loadBoardData() {
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar
    const boardData = JSON.parse(localStorage.getItem('kanbanBoard')); // Hämtar och tolkar brädets data från localStorage

    // Kontroll om det finns data lagrat i localStorage
    if (boardData) {
        // Loopar igenom varje box och fyller den med sparade kort
        boxes.forEach(box => {
            const boxTitle = box.querySelector('h2').textContent; // Hämtar boxens titel
            const cardsContainer = box.querySelector('.cards'); // Hämtar boxens kortcontainer

            // Kontroll om det finns sparade kort för just denna box
            if (boardData[boxTitle]) {
                // Loopar igenom korten och skapar nya kortelement
                boardData[boxTitle].forEach(cardText => {
                    const newCard = createCardElement(cardText);
                    cardsContainer.appendChild(newCard); // Lägger till de sparade korten i boxen
                });
            }
        });
    }
}
