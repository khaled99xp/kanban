export function login() {
    return new Promise((resolve) => {
        // Hämtar HTML-element för inloggningsformuläret och olika inmatningsfält
        const loginForm = document.getElementById('login-form');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const loginError = document.getElementById('login-error');
        const container = document.getElementById('container');
        const loginContainer = document.getElementById('login-container');
        const navbar = document.getElementById('navbar');
        const usernameDisplay = document.getElementById('username-display');
        const logoutButton = document.getElementById('logout-button');

        // Funktion som laddar användaruppgifter från en JSON-fil
        function loadUsers() {
            return fetch('./json-files/users.json')
                .then(response => response.json()) // Omvandlar svar till JSON-format
                .catch(error => {
                    // Visar felmeddelande i konsolen om användarna inte kan laddas
                    console.error("Error loading users:", error);
                    return [];
                });
        }

        // Lyssnare för inloggningsformulärets "submit"-händelse
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Förhindrar att sidan laddas om

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Laddar användare från JSON-filen och verifierar inloggning
            loadUsers()
                .then(users => {
                    const user = users.find(user => user.username === username && user.password === password);

                    if (user) {
                        // Om användaren hittas, spara användarnamn i localStorage och visa Kanban-tavlan
                        localStorage.setItem('username', user.username); 
                        loginContainer.style.display = 'none';
                        container.style.display = 'block';
                        navbar.style.display = 'block';
                        usernameDisplay.textContent = `Welcome, ${user.username}`; // Visar välkomstmeddelande
                        resolve(); // Fullbordar promiset
                    } else {
                        // Visar felmeddelande om användarnamn eller lösenord är fel
                        loginError.style.display = 'block';
                    }
                })
                .catch(error => {
                    // Visar felmeddelande i konsolen om något går fel vid inloggning
                    console.error("Error during login:", error);
                });
        });

        // Lyssnare för utloggningsknappen
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username'); // Tar bort användarnamnet från localStorage
            loginContainer.style.display = 'block'; // Visar inloggningsformuläret igen
            container.style.display = 'none'; // Dölj Kanban-tavlan
            navbar.style.display = 'none'; // Dölj navigationsfältet
            usernameInput.value = ''; // Återställer inmatningsfält för användarnamn
            passwordInput.value = ''; // Återställer inmatningsfält för lösenord
        });

        // Kontrollerar om användarnamn redan finns i localStorage och loggar in automatiskt
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            usernameDisplay.textContent = `Welcome back, ${storedUsername}`; // Visar välkomstmeddelande för återvändande användare
            loginContainer.style.display = 'none'; // Dölj inloggningsformuläret
            container.style.display = 'block'; // Visa Kanban-tavlan
            navbar.style.display = 'block'; // Visa navigationsfältet
            resolve(); // Fullbordar promiset
        }
    });
}
