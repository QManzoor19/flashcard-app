// ===== Custom Accent Color per Deck =====
const deckColors = [
    { name: 'Default', value: '' },
    { name: 'Blue', value: '#4255ff' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Cyan', value: '#06b6d4' },
];

function showColorPicker(deck) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'color-picker-modal';
    modal.innerHTML = `<div class="modal">
        <h3>Deck Color</h3>
        <div class="color-grid">${deckColors.map(c =>
            `<button class="color-swatch${deck.color === c.value ? ' active' : ''}"
                style="background:${c.value || 'var(--bg-card)'};${!c.value ? 'border:2px dashed var(--border)' : ''}"
                onclick="setDeckColor('${deck.id}','${c.value}')" title="${c.name}">
                ${deck.color === c.value ? '\u2713' : ''}
            </button>`
        ).join('')}</div>
        <div class="btn-row" style="margin-top:12px">
            <button class="btn btn-outline" onclick="document.getElementById('color-picker-modal').remove()">Close</button>
        </div>
    </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function setDeckColor(deckId, color) {
    const deck = appData.decks.find(d => d.id === deckId);
    if (deck) { deck.color = color; saveData(); }
    const modal = document.getElementById('color-picker-modal');
    if (modal) modal.remove();
    applyDeckColor();
    if (currentPage === 'decks') renderDecksPage();
}

function applyDeckColor() {
    const deck = getCurrentDeck ? getCurrentDeck() : null;
    if (deck && deck.color) {
        document.documentElement.style.setProperty('--accent', deck.color);
        document.documentElement.style.setProperty('--accent-hover', deck.color);
        document.documentElement.style.setProperty('--accent-soft', deck.color + '1a');
    } else {
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--accent-hover');
        document.documentElement.style.removeProperty('--accent-soft');
    }
}

// ===== Merge Decks =====
let mergeTargetId = null;

function showMergePicker(deck) {
    mergeTargetId = deck.id;
    const modal = document.getElementById('merge-modal');
    const list = document.getElementById('merge-list');
    document.getElementById('merge-title').textContent = `Merge into "${deck.name}"`;
    list.innerHTML = '';

    appData.decks.filter(d => d.id !== deck.id).forEach(d => {
        const item = document.createElement('label');
        item.className = 'add-deck-item';
        item.innerHTML = `<input type="checkbox" value="${d.id}">
            <span class="add-deck-name">${d.icon || ''} ${d.name}</span>
            <span class="add-deck-count">${d.cards.length} cards</span>`;
        list.appendChild(item);
    });

    if (list.children.length === 0) {
        list.innerHTML = '<div style="padding:16px;color:var(--text-3);text-align:center">No other decks to merge.</div>';
    }
    modal.classList.add('active');
}

function confirmMerge() {
    const target = appData.decks.find(d => d.id === mergeTargetId);
    if (!target) return;

    const checkboxes = document.querySelectorAll('#merge-list input[type=checkbox]:checked');
    let added = 0;

    checkboxes.forEach(cb => {
        const source = appData.decks.find(d => d.id === cb.value);
        if (!source) return;

        source.cards.forEach(card => {
            if (!target.cards.find(c => c.question === card.question)) {
                target.cards.push({...card, id: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2,5)});
                added++;
            }
        });

        appData.decks = appData.decks.filter(d => d.id !== source.id);
    });

    saveData();
    document.getElementById('merge-modal').classList.remove('active');
    alert(`Merged ${added} cards into "${target.name}".`);
    updateDeckSelector();
    if (currentPage === 'decks') renderDecksPage();
}

// Merge confirm listener
const mergeBtn = document.getElementById('merge-confirm-btn');
if (mergeBtn) mergeBtn.addEventListener('click', confirmMerge);
