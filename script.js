document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('audio-list');
    const grammarBtn = document.querySelector('.grammar-btn');
    const vocabBtn = document.querySelector('.vocab-btn');

    // Function to render audio list
    function renderList(type) {
        listContainer.innerHTML = '';
        const files = audioData[type] || [];

        if (files.length === 0) {
            listContainer.innerHTML = `<div style="text-align:center; color: var(--text-muted); padding: 2rem;">Папка пуста или аудио не найдены.</div>`;
            return;
        }

        files.forEach((file, index) => {
            let displayName = file.replace('.mp3', '');
            const item = document.createElement('div');
            item.className = 'audio-item';
            item.style.animationDelay = `${Math.min(index * 0.05, 2)}s`;

            const folder = type === 'grammar' ? 'аудио' : 'аудио вакаб';

            item.innerHTML = `
                <div class="audio-title">${displayName}</div>
                <audio controls preload="metadata">
                    <source src="${folder}/${file}" type="audio/mpeg">
                </audio>
            `;
            listContainer.appendChild(item);
        });
    }

    // Tabs functionality
    grammarBtn.addEventListener('click', () => {
        grammarBtn.classList.add('active');
        vocabBtn.classList.remove('active');
        renderList('grammar');
    });

    vocabBtn.addEventListener('click', () => {
        vocabBtn.classList.add('active');
        grammarBtn.classList.remove('active');
        renderList('vocab');
    });

    // Initial render
    renderList('grammar');


    // Modal logic
    const modal = document.getElementById('proposal-modal');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const modalText = document.getElementById('modal-text');
    const modalButtons = document.getElementById('modal-buttons');
    const initialText = 'Ты выйдешь замуж за Айтуара? 💍';
    const congratsText = 'АААА, ПОЗДРАВЛЯЮ! <br>💍❤️<br>Вы теперь официально будущая семья 😂<br><br>Желаю вам счастья, любви и много счастливых моментов вместе ❤️';

    function showModal() {
        modal.classList.add('show');
        modalText.innerHTML = initialText;
        btnNo.style.position = 'static';
        btnNo.style.transform = 'none';
        modalButtons.style.display = 'flex';
    }

    // Show modal on entry (delay slightly for suspense)
    setTimeout(showModal, 1500);

    // Show modal every 10 minutes (600,000 ms)
    setInterval(showModal, 600000);

    // Escape logic for No button
    function escapeBtn() {
        // Only trigger if we are showing the question
        if (modalText.innerHTML !== initialText) return;

        // Calculate random movement
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 150;

        btnNo.style.position = 'absolute';
        btnNo.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    btnNo.addEventListener('mouseenter', escapeBtn);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        escapeBtn();
    });
    // Just in case they somehow click it
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        escapeBtn();
    });

    // Yes logic
    btnYes.addEventListener('click', () => {
        modalText.innerHTML = congratsText;
        modalButtons.style.display = 'none';

        // Fireworks logic using canvas-confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            if (window.confetti) {
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }
        }, 250);

        // Hide modal after fireworks complete
        setTimeout(() => {
            modal.classList.remove('show');
        }, duration + 1500);
    });
});
