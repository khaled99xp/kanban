import { getDragCard } from './setupDragCard.mjs';

let dragBox = null; // Variabel för att hålla koll på vilken box som dras

// Funktion för att konfigurera drag och släpp-funktionalitet för en box
export function setupDragBox(box, boxes) {
    box.setAttribute('draggable', 'true'); // Gör boxen dragbar

    // Händelsehanterare för när en box börjar dras
    box.addEventListener('dragstart', function() {
        dragBox = box; // Spara referens till den box som dras
        box.style.opacity = '0.5'; // Sänker boxens opacitet under dragningen
    });

    // Händelsehanterare för när en box slutar dras
    box.addEventListener('dragend', function() {
        dragBox = null; // Återställer dragBox-referensen
        box.style.opacity = '1'; // Återställer boxens opacitet
    });

    // Tillåter att en box släpps på denna box genom att förhindra standardhändelsen
    box.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    // Händelsehanterare för när en box släpps på denna box
    box.addEventListener('drop', function(e) {
        e.preventDefault(); // Förhindrar standardhändelsen

        let dragCard = getDragCard(); // Hämtar kortet som dras, om något

        // Om ett kort dras, lägg till det i denna box
        if (dragCard) {
            this.querySelector('.cards').appendChild(dragCard); // Lägg kortet i denna box
            dragCard = null; // Återställ dragCard-referensen
        } 
        // Om en hel box dras och det inte är samma box, byt plats med den andra boxen
        else if (dragBox && this !== dragBox) {
            const parent = this.parentNode; // Hämtar förälderelementet (containern för boxarna)
            const boxesArray = Array.from(parent.children); // Skapar en array av alla boxar
            const currentIndex = boxesArray.indexOf(this); // Hitta denna boxens index
            const dragIndex = boxesArray.indexOf(dragBox); // Hitta den dragna boxens index

            // Flytta den dragna boxen till rätt position beroende på index
            if (currentIndex < dragIndex) {
                parent.insertBefore(dragBox, this); // Flytta före denna box
            } else {
                parent.insertBefore(dragBox, this.nextSibling); // Flytta efter denna box
            }
            dragBox = null; // Återställ dragBox-referensen
        }

        // Återställ opaciteten för alla boxar efter dragningen
        boxes.forEach(b => {
            b.style.opacity = '1';
        });

        saveToLocalStorage(); // Spara det uppdaterade brädet i localStorage
    });
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

// Funktion för att ladda Kanban-brädet från localStorage
export function loadFromLocalStorage() {
    const boardData = JSON.parse(localStorage.getItem('kanbanBoard')) || {}; // Hämtar och tolkar brädets data från localStorage
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar

    // Loopar igenom varje box och fyller den med sparade kort
    boxes.forEach(box => {
        const boxTitle = box.querySelector('h2').textContent; // Hämtar boxens titel
        if (boardData[boxTitle]) {
            const cardsContainer = box.querySelector('.cards'); // Hämtar kortcontainern

            // Loopar igenom korten för varje box och skapar nya kortelement
            boardData[boxTitle].forEach(cardText => {
                const newCard = document.createElement('div'); // Skapar ett nytt div-element för kortet
                newCard.classList.add('card'); // Lägger till CSS-klassen 'card'
                newCard.setAttribute('draggable', 'true'); // Gör kortet dragbart

                // Skapar ett p-element för kortets innehåll
                let cardContent = document.createElement('p');
                cardContent.textContent = cardText; // Sätter kortets text till den sparade texten
                newCard.appendChild(cardContent); // Lägger till texten i kortet

                // Skapar och konfigurerar "Delete"-knappen för kortet
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete'; // Sätter texten på knappen
                deleteButton.classList.add('delete-btn'); // Lägger till CSS-klassen 'delete-btn'
                newCard.appendChild(deleteButton); // Lägger till knappen i kortet

                cardsContainer.appendChild(newCard); // Lägger till det nya kortet i kortcontainern

                // Konfigurerar drag- och släpp-funktionalitet samt "Delete"-knappen för kortet
                setupDragCard(newCard);
                setupDeleteButton(newCard, deleteButton);
            });
        }
    });
}
