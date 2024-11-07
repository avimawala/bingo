document.addEventListener("DOMContentLoaded", function () {
    const bingoBoard = document.getElementById('bingo-board');
    const bingoStatus = document.getElementById('bingo-status');
    const bingoLetters = document.querySelectorAll('.bingo-letter');

    // Define your bingo items.
    const bingoItems = [
        "Shitty US Healthcare", "Capitalism Bad", "AI", "Something about Pavel's background", "'Persnickety'",
        "Mocking British accents", "Pushups", "Lil Vim Snarkle", "Derek shares 'funny story'", "Jared/Derek mixup",
        "Complaining about other teams", "Amazon shame list", "Simon complains about something", "'Egregious'", "Simon Vaping",
        "Tome gets deleted", "Dog or baby interruption", "Jeremy drops a euphemism", "Someone caught not listening", "'Is that a sex thing'",
        "Nathan says 'ya'll'", "Discover something polarizing", "'Well yes, and no'", "Client books over BT", "Pushups"
    ];

    // Shuffle and create a random board for each participant.
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(bingoItems);
    const boardItems = bingoItems.slice(0, 25);

    // Generate the bingo board.
    boardItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('bingo-item');

        // Make the middle square the "PT Freebie"
        if (index === 12) {
            div.textContent = "PT Freebie";
            div.classList.add('pt-freebie', 'selected'); // Automatically mark the middle square as selected
        } else {
            div.textContent = item;
        }

        div.addEventListener('click', function () {
            if (!div.classList.contains('pt-freebie')) {
                div.classList.toggle('selected');
                checkBingo();
            }
        });
        bingoBoard.appendChild(div);
    });

    // Check for Bingo and display status.
    function checkBingo() {
        const items = document.querySelectorAll('.bingo-item');
        const grid = Array.from(items).map(item => item.classList.contains('selected'));
        let bingo = false;
        let winningLine = [];

        // Check rows, columns, and diagonals.
        const lines = [
            [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
        ];

        lines.forEach(line => {
            // Check if at least 4 squares in the line are selected, accounting for the middle freebie
            const selectedCount = line.filter(index => grid[index]).length;
            if (selectedCount >= 5) {
                bingo = true;
                winningLine = line;
            }
        });

        if (bingo) {
            
            animateWinningLine(winningLine);
        } else {
            
        }
    }

    // Animate each selected card in the winning line to fade out and be replaced with a checkmark
    function animateWinningLine(winningLine) {
        winningLine.forEach((index, i) => {
            setTimeout(() => {
                const item = document.querySelectorAll('.bingo-item')[index];
                if (item.classList.contains('selected')) {
                    item.style.transition = 'opacity 1s';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.innerHTML = '&#10004;'; // Checkmark symbol
                        item.style.fontSize = '2rem';

                        // Update the color of the letter on top of the corresponding column
                        const columnIndex = index % 5;
                        bingoLetters[columnIndex].style.color = '#ffffff';
                    }, 1000);
                }
            }, i * 500); // Stagger each animation by 500ms
        });
    }
});
