
const audioFiles = ["01 Title Information.mp3", "02 1a Present Tenses.mp3", "03_Test Practice 1b.mp3", "04 Past Tenses 1.mp3", "05 Present Perfect (Part 1).mp3", "06 Present Perfect (Part 2).mp3", "07 Past Tenses 2.mp3", "08 Future 1.mp3", "09 Future 2.mp3", "10 Countable And Uncountable Nouns.mp3", "11 8a Referring To Nouns.mp3", "12_Test Practice 8b.mp3", "13 Pronouns And Referencing.mp3", "14 ADJectives And Adverbs.mp3", "15 Comparing Things.mp3", "16 The Noun Phrase.mp3", "17 13a Modals 1.mp3", "18_Test Practice 13b.mp3", "19 Modals 2.mp3", "20 15a Reported Speech.mp3", "21 15b Reported Speech.mp3", "22_Test Practice 15c.mp3", "23 Verb + Verb Patterns.mp3", "24 Likelihood Based On Conditions 1.mp3", "25 Likelihood Based On Conditions 2.mp3", "26 19a Prepositions.mp3", "27_Test Practice 19b.mp3", "28 Relative Clauses.mp3", "29 Ways Of Organising Texts.mp3", "30 The Passive.mp3", "31 Linking Ideas.mp3", "32 Showing Your Position In A Text.mp3", "33 Normalisation In Written English.mp3"];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('audio-list');
    
    audioFiles.forEach((file, index) => {
        // Remove .mp3 extension and format name for display
        let displayName = file.replace('.mp3', '');
        // Extract out any leading numbers if desired, or just leave as is. Leaving as is since titles are good.
        
        const item = document.createElement('div');
        item.className = 'audio-item';
        // Add staggered animation delay
        item.style.animationDelay = `${Math.min(index * 0.05, 2)}s`;
        
        item.innerHTML = `
            <div class="audio-title">${displayName}</div>
            <audio controls preload="metadata">
                <source src="аудио/${file}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        
        container.appendChild(item);
    });
});
