document.addEventListener("DOMContentLoaded", function () {
    const startContainer = document.getElementById("start-container");
    const gameContainer = document.getElementById("game-container");
    const gameBoard = document.getElementById("game-board");
    const scoreElement = document.getElementById("score");
    let score = 0;
    let gameInterval;

    function createHole() {
        const hole = document.createElement("div");
        hole.classList.add("hole");

        const caterpillar = document.createElement("div");
        caterpillar.classList.add("caterpillar");
        caterpillar.addEventListener("click", whackCaterpillar);

        hole.appendChild(caterpillar);
        gameBoard.appendChild(hole);
    }

    function whackCaterpillar() {
        score++;
        scoreElement.textContent = "Score: " + score;
        this.style.display = "none";
    }

    function startGame() {
        score = 0;
        scoreElement.textContent = "Score: 0";
        
        // Clear existing holes
        gameBoard.innerHTML = "";

        // Create new holes
        for (let i = 0; i < 9; i++) {
            createHole();
        }

        // Show the game container and hide the start container
        startContainer.style.display = "none";
        gameContainer.style.display = "block";

        // Start the game interval
        gameInterval = setInterval(() => {
            const caterpillars = document.querySelectorAll(".caterpillar");
            caterpillars.forEach(caterpillar => caterpillar.style.display = "none");

            const randomIndex = Math.floor(Math.random() * caterpillars.length);
            caterpillars[randomIndex].style.display = "block";
        }, 1000);
    }

    function exitGame() {
        // Stop the game interval
        clearInterval(gameInterval);

        // Hide the game container and show the start container
        startContainer.style.display = "block";
        gameContainer.style.display = "none";
    }

    // Attach the startGame function to the button click event
    document.getElementById("start-button").addEventListener("click", startGame);

    // Attach the exitGame function to the button click event
    document.getElementById("exit-button").addEventListener("click", exitGame);

    // Initial setup - create holes but don't start the game immediately
    for (let i = 0; i < 9; i++) {
        createHole();
    }
});

