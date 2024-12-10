console.log("Script carregado com sucesso!");


// Seus outros códigos JavaScript aqui...

const timerElement = document.getElementById('timer');  // Elemento para exibir o tempo

const gameBoard = document.getElementById('game-board');

// Imagens ou números para as cartas
const cardValues = ['🍎', '🍌', '🍓', '🍒', '🍍', '🍉', '🍊', '🍋'];

let cards = [];
let flippedCards = [];
let matchedCards = [];
let timer;
let seconds = 61;  
let gameOver = false; // Flag para verificar se o jogo acabou
let timerStarted = false;  // Flag para controlar quando o timer começa

// Função para criar a carta
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    return card;
}

// Embaralhamento das cartas
function shuffleCards() {
    const shuffledValues = [...cardValues, ...cardValues]; // Duplicando as cartas para fazer 32 no total
    shuffledValues.sort(() => Math.random() - 0.5); // Embaralhando as cartas

    shuffledValues.forEach(value => {
        const card = createCard(value);
        cards.push(card);
    });

    // Adiciona as cartas ao tabuleiro
    cards.forEach(card => {
        gameBoard.appendChild(card);
    });
}

// Virar a carta
function flipCard() {
    if (gameOver || flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return; // Se o jogo acabou, ou se já houver 2 cartas viradas, ou se a carta já está virada/match, não faz nada
    }

    // Inicia o cronômetro quando a primeira carta for virada
    if (!timerStarted) {
        startTimer();
        timerStarted = true;  // Evitar reiniciar o timer
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    // Se duas cartas forem viradas, verifica se são iguais
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Verificar se as duas cartas são iguais
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    flippedCards = [];

    // Verificar se o jogo acabou
    if (matchedCards.length === cards.length) {
        clearInterval(timer); // Parar o timer
        gameOver = true; // Finalizar o jogo
        setTimeout(() => alert(`Você venceu! Tempo: ${seconds}s`), 500); // Exibir tempo
    }
}

// Função para iniciar o timer
function startTimer() {
    timer = setInterval(() => {
        seconds--;  // Decrementa o tempo a cada segundo
        timerElement.textContent = `Tempo: ${seconds}s`;  // Atualiza o conteúdo do timer

        if (seconds <= 0) {
            clearInterval(timer);  // Para o cronômetro
            gameOver = true; // Finaliza o jogo
            alert("Tempo acabou! Você perdeu!"); // Exibe alerta de derrota
        }
    }, 1000);  // A cada 1000 milissegundos (1 segundo)
}

// Inicializar o jogo
shuffleCards();
