const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('pointsEarned');
const gridSize = 40;
let snake = [{ x: 1, y: 20 }]; // Initial position of the snake
let direction = { x: 1, y: 0 }; // Moving right
let food = {};
let score = 0;
let speed = 100; // Initial speed

// Initialize the game grid
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.id = `pixel${i}`;
        gameContainer.appendChild(pixel);
    }
}

// Place food randomly
function placeFood() {
    let foodPixel;
    do {
        foodPixel = Math.floor(Math.random() * (gridSize * gridSize));
        food = { x: foodPixel % gridSize, y: Math.floor(foodPixel / gridSize) };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y)); // Avoid placing food on the snake
    const foodElement = document.getElementById(`pixel${foodPixel}`);
    foodElement.classList.add('food');
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for wall collisions
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over! Your score: ' + score);
        document.location.reload(); // Restart the game
        return;
    }

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = score;
        snake.unshift(head);
        placeFood();
    } else {
        snake.unshift(head);
        snake.pop(); // Remove the last segment
    }

    render();
}

// Render the snake and food
function render() {
    const allPixels = document.querySelectorAll('#gameContainer div');
    allPixels.forEach(pixel => pixel.className = ''); // Clear the grid

    // Draw the snake
    snake.forEach(segment => {
        const pixelId = segment.y * gridSize + segment.x;
        document.getElementById(`pixel${pixelId}`).classList.add('snakeBodyPixel');
    });

    // Draw the food
    const foodId = food.y * gridSize + food.x;
    document.getElementById(`pixel${foodId}`).classList.add('food');
}

// Change direction based on keypress
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start the game
function startGame() {
    createGrid();
    placeFood();
    setInterval(moveSnake, speed);
}

startGame();

