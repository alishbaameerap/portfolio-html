const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const game = document.getElementById("game");

let score = 0;
let playing = true;
let jumping = false;
let cactusPosition = game.clientWidth;
let cactusSpeed = 5;

function jump() {
    if (!playing || jumping) return;

    jumping = true;
    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
        jumping = false;
    }, 600);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});

game.addEventListener("click", jump);
game.addEventListener("touchstart", jump);

function updateGame() {
    if (!playing) return;

    cactusPosition -= cactusSpeed;

    if (cactusPosition < -40) {
        cactusPosition = game.clientWidth;
        score++;
        scoreDisplay.textContent = score;

        if (score % 5 === 0) {
            cactusSpeed += 0.5;
        }
    }

    cactus.style.left = cactusPosition + "px";
    cactus.style.right = "auto";

    const dinoBottom = parseInt(
        getComputedStyle(dino).bottom
    );

    const dinoLeft = dino.offsetLeft;
    const dinoRight = dinoLeft + dino.offsetWidth;

    const cactusLeft = cactus.offsetLeft;
    const cactusRight = cactusLeft + cactus.offsetWidth;

    if (
        dinoRight > cactusLeft + 5 &&
        dinoLeft < cactusRight - 5 &&
        dinoBottom < 45
    ) {
        playing = false;
        message.textContent = "Game Over! 🏁";
    }
}

let gameLoop = setInterval(updateGame, 20);

function restartGame() {
    clearInterval(gameLoop);

    score = 0;
    playing = true;
    jumping = false;
    cactusPosition = game.clientWidth;
    cactusSpeed = 5;

    scoreDisplay.textContent = "0";
    message.textContent = "";
    dino.classList.remove("jump");
    cactus.style.left = cactusPosition + "px";

    gameLoop = setInterval(updateGame, 20);
}
