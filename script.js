const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');

// Game constants
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;
const nokiaDark = '#3a423a'; // Color for the pixels

// Game state variables
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('nokiaSnakeHighScore') || 0;
let gameLoop;
let isPlaying = false;
let changingDirection = false; // Prevent multiple key presses in one frame

// Initialize high score display
highScoreElement.textContent = `HI:${highScore.toString().padStart(4, '0')}`;

function initGame() {
    // Starting position in the middle
    snake = [
        { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) },
        { x: Math.floor(tileCountX / 2) - 1, y: Math.floor(tileCountY / 2) },
        { x: Math.floor(tileCountX / 2) - 2, y: Math.floor(tileCountY / 2) }
    ];
    
    // Initial velocity (moving right)
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = score.toString().padStart(4, '0');
    changingDirection = false;
    
    placeFood();
}

function startGame() {
    if (isPlaying) return;
    initGame();
    isPlaying = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    // ~10 frames per second for classic feel
    gameLoop = setInterval(update, 100);
}

function gameOver() {
    clearInterval(gameLoop);
    isPlaying = false;
    gameOverScreen.classList.remove('hidden');
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('nokiaSnakeHighScore', highScore);
        highScoreElement.textContent = `HI:${highScore.toString().padStart(4, '0')}`;
    }
}

function placeFood() {
    let newFoodPosition;
    let isOccupied = true;
    
    while (isOccupied) {
        newFoodPosition = {
            x: Math.floor(Math.random() * tileCountX),
            y: Math.floor(Math.random() * tileCountY)
        };
        
        // Ensure food doesn't spawn on the snake
        isOccupied = snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y);
    }
    food = newFoodPosition;
}

function update() {
    changingDirection = false; // Reset direction lock every frame
    
    // Calculate new head position
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check wall collisions
    if (newHead.x < 0 || newHead.x >= tileCountX || newHead.y < 0 || newHead.y >= tileCountY) {
        gameOver();
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return;
    }
    
    // Move snake by unshifting new head
    snake.unshift(newHead);
    
    // Check if food eaten
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreElement.textContent = score.toString().padStart(4, '0');
        placeFood();
    } else {
        // If not eaten, remove tail
        snake.pop();
    }
    
    draw();
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Food (a simple square with a smaller square inside)
    ctx.fillStyle = nokiaDark;
    ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
    ctx.clearRect(food.x * gridSize + 6, food.y * gridSize + 6, gridSize - 12, gridSize - 12);

    // Draw Snake
    ctx.fillStyle = nokiaDark;
    snake.forEach((segment, index) => {
        // Draw the main block with a 1px gap between segments for that pixelated look
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
}

// Input handling
document.addEventListener('keydown', (e) => {
    // Handle game start/restart
    if (e.code === 'Space') {
        if (!isPlaying) {
            startGame();
        }
        e.preventDefault(); // Prevent scrolling
        return;
    }

    if (changingDirection || !isPlaying) return;
    
    const key = e.key;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;
    
    if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && !goingRight) {
        dx = -1;
        dy = 0;
        changingDirection = true;
        e.preventDefault();
    }
    if ((key === 'ArrowUp' || key === 'w' || key === 'W') && !goingDown) {
        dx = 0;
        dy = -1;
        changingDirection = true;
        e.preventDefault();
    }
    if ((key === 'ArrowRight' || key === 'd' || key === 'D') && !goingLeft) {
        dx = 1;
        dy = 0;
        changingDirection = true;
        e.preventDefault();
    }
    if ((key === 'ArrowDown' || key === 's' || key === 'S') && !goingUp) {
        dx = 0;
        dy = 1;
        changingDirection = true;
        e.preventDefault();
    }
});

// Initial draw
draw();
