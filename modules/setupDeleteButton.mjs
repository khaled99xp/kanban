// Funktion för att konfigurera "Delete"-knappen för ett specifikt kort
export function setupDeleteButton(card, deleteButton) {
    // När "Delete"-knappen klickas
    deleteButton.onclick = function() {
        // Tar bort kortet från DOM
        card.remove();
        // Sparar det uppdaterade brädet i localStorage
        saveToLocalStorage(); 
    };
}

// Funktion för att spara Kanban-brädet i localStorage
function saveToLocalStorage() {
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar på brädet
    const boardData = {}; // Skapar ett objekt för att lagra brädets data

    // Loopar igenom varje box och sparar dess kort
    boxes.forEach(box => {
        const boxTitle = box.querySelector('h2').textContent; // Hämtar titeln för varje box
        const cards = Array.from(box.querySelectorAll('.card')).map(card => card.querySelector('p').textContent); // Hämtar texten för varje kort
        boardData[boxTitle] = cards; // Lagrar kortens texter under respektive box-titel
    });

    // Sparar brädets data i localStorage i JSON-format
    localStorage.setItem('kanbanBoard', JSON.stringify(boardData));
}
