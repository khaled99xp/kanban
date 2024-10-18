import { login } from './modules/login.mjs'; // Importerar login-funktionen från login-modulen
import { setupAddButton, loadBoardData } from './modules/setupAddButton.mjs'; // Importerar funktioner för att lägga till kort och ladda bräddata
import { setupDragBox } from './modules/setupDragBox.mjs'; // Importerar funktionen för att konfigurera drag- och släpp för boxar
import { setupDragCard } from './modules/setupDragCard.mjs'; // Importerar funktionen för att konfigurera drag- och släpp för kort

// Kör login-funktionen och efter att inloggningen lyckats
login().then(() => {
    const boxes = document.querySelectorAll('.box'); // Hämtar alla boxar på brädet

    // Loopar genom varje box för att ställa in nödvändiga funktioner
    boxes.forEach(box => {
        
        setupAddButton(box); // Konfigurerar knappen för att lägga till nya kort i varje box
        
        setupDragBox(box, boxes); // Ställer in drag- och släpp-funktionalitet för boxarna

        // Loopar genom alla kort i boxen och aktiverar drag- och släpp-funktionalitet för varje kort
        const cards = box.querySelectorAll('.card');
        cards.forEach(card => {
            setupDragCard(card); // Ställer in drag- och släpp för varje kort
        });
    });

    // Laddar och återställer Kanban-bräddet från localStorage
    loadBoardData();
});
