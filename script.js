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


});
