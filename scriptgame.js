// Função que redireciona o jogador para a página correspondente
document.getElementById('start-game').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value.trim();
    const difficulty = document.getElementById('difficulty').value;

    if (!playerName) {
        alert("Por favor, insira seu nome!");
        return;
    }

    // Salvar nome do jogador no localStorage
    localStorage.setItem('playerName', playerName);

    // Redireciona para a página de jogo de acordo com a dificuldade
    if (difficulty === 'facil') {
        window.location.href = 'easy/easy.html'; // Página Fácil (4x4)
    } else if (difficulty === 'medio') {
        window.location.href = 'medium/medium.html'; // Página Médio (4x6)
    } else if (difficulty === 'dificil') {
        window.location.href = 'hard/hard.html'; // Página Difícil (4x8)
    }
});
