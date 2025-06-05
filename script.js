let score = JSON.parse(localStorage.getItem('savedScore')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

let computerMove = '';
let result = '';
let playerMove = '';

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.Wins} , Losses: ${score.Losses}, Ties: ${score.Ties}.`;
}

updateScoreElement();

function funComputermove() {
    const randomNumber = Math.random();
    // Tip the scales: Pranay (computer) wins more often
    if (randomNumber < 0.25) {
        computerMove = 'rock';
    } else if (randomNumber < 0.5) {
        computerMove = 'paper';
    } else if (randomNumber < 0.85) {
        computerMove = 'scissors';
    } else {
        // Random fallback
        const moves = ['rock', 'paper', 'scissors'];
        computerMove = moves[Math.floor(Math.random() * 3)];
    }
}

function playGame(move) {
    playerMove = move;
    funComputermove();
    result = '';
    // Pranay (computer) wins more often by biasing the logic
    if (playerMove === 'scissors') {
        if (computerMove === 'scissors') result = Math.random() < 0.6 ? 'Pranay Wins' : 'Tie';
        else if (computerMove === 'rock') result = 'Pranay Wins';
        else result = 'You Win';
    }
    if (playerMove === 'paper') {
        if (computerMove === 'paper') result = Math.random() < 0.6 ? 'Pranay Wins' : 'Tie';
        else if (computerMove === 'scissors') result = 'Pranay Wins';
        else result = 'You Win';
    }
    if (playerMove === 'rock') {
        if (computerMove === 'rock') result = Math.random() < 0.6 ? 'Pranay Wins' : 'Tie';
        else if (computerMove === 'paper') result = 'Pranay Wins';
        else result = 'You Win';
    }
    if (result === 'You Win') score.Wins += 1;
    else if (result === 'Pranay Wins') score.Losses += 1;
    else if (result === 'Tie') score.Ties += 1;
    localStorage.setItem('savedScore', JSON.stringify(score));
    updateScoreElement();
    updateResultElement();
    updateMoveElement();
}

function updateMoveElement() {
    document.querySelector('.js-moves').innerHTML =
        `You <img class="iconxyz" src="imagesRPS/${playerMove}-emoji.png"> <img class="iconxyz" src="imagesRPS/${computerMove}-emoji.png"> Pranay`;
}

function updateResultElement() {
    document.querySelector('.js-result').innerHTML = `Result: ${result}`;
}

// Modal logic for reset score
const resetBtn = document.getElementById('reset-score-btn');
const resetModal = document.getElementById('reset-modal');
const resetConfirm = document.getElementById('reset-confirm');
const resetCancel = document.getElementById('reset-cancel');

resetBtn.addEventListener('click', function () {
    resetModal.classList.add('active');
});
resetCancel.addEventListener('click', function () {
    resetModal.classList.remove('active');
});
resetConfirm.addEventListener('click', function () {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    localStorage.removeItem('savedScore');
    updateScoreElement();
    resetModal.classList.remove('active');
});

// Light/Dark mode toggle logic
const themeToggleBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

function setTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '🌞';
        themeToggleBtn.innerHTML = '<span id="theme-icon" aria-hidden="true">🌞</span> Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
        themeToggleBtn.innerHTML = '<span id="theme-icon" aria-hidden="true">🌙</span> Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Initial theme load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    setTheme('light');
} else {
    setTheme('dark');
}

themeToggleBtn.addEventListener('click', function () {
    if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});
