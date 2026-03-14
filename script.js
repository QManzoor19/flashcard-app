// Data Model
let appData = {
    decks: [],
    currentDeck: null,
    currentCardIndex: 0
};

let editingCardId = null;
let currentImage = null;
let reviewQueue = [];
let currentReviewIndex = 0;
let showingAnswer = false;

// Game state
let matchState = { selected: [], matched: [], timer: 0, timerInterval: null };
let writeState = { currentIndex: 0, score: 0, cards: [] };
let survivalState = { lives: 3, score: 0, currentIndex: 0, cards: [] };
let mcState = { currentIndex: 0, score: 0, total: 0, cards: [] };

// Personal bests
let personalBests = {
    match: null,
    survival: null
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDeckName = document.getElementById('mobile-deck-name');
const deckList = document.getElementById('deck-list');
const deckTitle = document.getElementById('deck-title');
const deckAuthor = document.getElementById('deck-author');
const modeGrid = document.getElementById('mode-grid');
const newDeckBtn = document.getElementById('new-deck-btn');
const studyModeBtn = document.getElementById('study-mode-btn');
const reviewModeBtn = document.getElementById('review-mode-btn');
const matchModeBtn = document.getElementById('match-mode-btn');
const writeModeBtn = document.getElementById('write-mode-btn');
const survivalModeBtn = document.getElementById('survival-mode-btn');
const manageModeBtn = document.getElementById('manage-mode-btn');
const studyView = document.getElementById('study-view');
const reviewView = document.getElementById('review-view');
const matchView = document.getElementById('match-view');
const writeView = document.getElementById('write-view');
const survivalView = document.getElementById('survival-view');
const manageView = document.getElementById('manage-view');
const dueCount = document.getElementById('due-count');
const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const questionImage = document.getElementById('question-image');
const answerImage = document.getElementById('answer-image');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const saveCardBtn = document.getElementById('save-card-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const cardsContainer = document.getElementById('cards-container');
const deckModal = document.getElementById('deck-modal');
const deckNameInput = document.getElementById('deck-name-input');
const createDeckBtn = document.getElementById('create-deck-btn');
const cancelDeckBtn = document.getElementById('cancel-deck-btn');
const importBtn = document.getElementById('import-btn');
const importModal = document.getElementById('import-modal');
const importInput = document.getElementById('import-input');
const importCardsBtn = document.getElementById('import-cards-btn');
const cancelImportBtn = document.getElementById('cancel-import-btn');
const importErrors = document.getElementById('import-errors');
const formTitle = document.getElementById('form-title');
const reviewFlashcard = document.getElementById('review-flashcard');
const reviewQuestionText = document.getElementById('review-question-text');
const reviewAnswerText = document.getElementById('review-answer-text');
const reviewQuestionImage = document.getElementById('review-question-image');
const reviewAnswerImage = document.getElementById('review-answer-image');
const showAnswerBtn = document.getElementById('show-answer-btn');
const againBtn = document.getElementById('again-btn');
const hardBtn = document.getElementById('hard-btn');
const goodBtn = document.getElementById('good-btn');
const easyBtn = document.getElementById('easy-btn');
const cardsRemaining = document.getElementById('cards-remaining');
const againTime = document.getElementById('again-time');
const hardTime = document.getElementById('hard-time');
const goodTime = document.getElementById('good-time');
const easyTime = document.getElementById('easy-time');
const ttsPlayBtn = document.getElementById('tts-play-btn');
const ttsSpeed = document.getElementById('tts-speed');
const matchStartBtn = document.getElementById('match-start-btn');
const matchGame = document.getElementById('match-game');
const matchTimer = document.getElementById('match-timer');
const matchScore = document.getElementById('match-score');
const matchBest = document.getElementById('match-best');
const matchResult = document.getElementById('match-result');
const writeStartBtn = document.getElementById('write-start-btn');
const writeGame = document.getElementById('write-game');
const writeQuestion = document.getElementById('write-question');
const writeAnswerInput = document.getElementById('write-answer-input');
const writeCheckBtn = document.getElementById('write-check-btn');
const writeFeedback = document.getElementById('write-feedback');
const writeProgress = document.getElementById('write-progress');
const writeScore = document.getElementById('write-score');
const writeResult = document.getElementById('write-result');
const survivalStartBtn = document.getElementById('survival-start-btn');
const survivalGame = document.getElementById('survival-game');
const survivalQuestion = document.getElementById('survival-question');
const survivalOptions = document.getElementById('survival-options');
const survivalLives = document.getElementById('survival-lives');
const survivalScore = document.getElementById('survival-score');
const survivalBest = document.getElementById('survival-best');
const survivalResult = document.getElementById('survival-result');
const searchImageBtn = document.getElementById('search-image-btn');
const imageSearchModal = document.getElementById('image-search-modal');
const imageSearchInput = document.getElementById('image-search-input');
const imageSearchSubmitBtn = document.getElementById('image-search-submit-btn');
const imageSearchResults = document.getElementById('image-search-results');
const cancelImageSearchBtn = document.getElementById('cancel-image-search-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const exportBtn = document.getElementById('export-btn');
const deckSearch = document.getElementById('deck-search');
const mcModeBtn = document.getElementById('mc-mode-btn');
const mcView = document.getElementById('mc-view');
const mcStartBtn = document.getElementById('mc-start-btn');
const mcGame = document.getElementById('mc-game');
const mcQuestion = document.getElementById('mc-question');
const mcOptions = document.getElementById('mc-options');
const mcProgress = document.getElementById('mc-progress');
const mcScore = document.getElementById('mc-score');
const mcResult = document.getElementById('mc-result');

// Theme Toggle
function loadTheme() {
    const savedTheme = localStorage.getItem('flashcardTheme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('flashcardTheme', isLight ? 'light' : 'dark');
}

// Mobile sidebar
function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
}

// Initialize App
function init() {
    loadTheme();
    loadData();
    loadPersonalBests();
    setupEventListeners();

    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
}

// LocalStorage Functions
const APP_VERSION = '2';

function loadData() {
    const savedVersion = localStorage.getItem('flashcardAppVersion');
    if (savedVersion !== APP_VERSION) {
        // New version — clear old data and start fresh
        localStorage.removeItem('flashcardApp');
        localStorage.setItem('flashcardAppVersion', APP_VERSION);
        appData = { decks: [], currentDeck: null, currentCardIndex: 0 };
        createExampleDeck();
        return;
    }

    const savedData = localStorage.getItem('flashcardApp');
    if (savedData) {
        appData = JSON.parse(savedData);

        // Migrate old cards to add spaced repetition fields
        appData.decks.forEach(deck => {
            deck.cards.forEach(card => {
                if (card.easeFactor === undefined) {
                    card.easeFactor = 2.5;
                    card.interval = 0;
                    card.repetitions = 0;
                    card.nextReview = Date.now();
                    card.lastReviewed = null;
                }
            });
        });

        // If Korean Animals deck exists but is missing newer cards, add them
        const animalsDeck = appData.decks.find(d => d.name === 'Korean Animals');
        if (animalsDeck) {
            const fullList = getAnimalsList();
            const existingQuestions = new Set(animalsDeck.cards.map(c => c.question));
            const now = Date.now();
            let added = 0;
            fullList.forEach((pair, i) => {
                if (!existingQuestions.has(pair[0])) {
                    animalsDeck.cards.push({
                        id: 'card_' + (now + i),
                        question: pair[0],
                        answer: pair[1],
                        image: null,
                        easeFactor: 2.5,
                        interval: 0,
                        repetitions: 0,
                        nextReview: now,
                        lastReviewed: null
                    });
                    added++;
                }
            });
        }

        // Fix: if currentDeck points to a non-existent deck, reset it
        if (appData.currentDeck && !appData.decks.find(d => d.id === appData.currentDeck)) {
            appData.currentDeck = appData.decks.length > 0 ? appData.decks[0].id : null;
        }
        // If no deck is selected but decks exist, select the first one
        if (!appData.currentDeck && appData.decks.length > 0) {
            appData.currentDeck = appData.decks[0].id;
        }
        saveData();
    } else {
        appData = {
            decks: [],
            currentDeck: null,
            currentCardIndex: 0
        };
        createExampleDeck();
    }
}

function getAnimalsList() {
    return [
        ['Dog', '개 (gae)'],
        ['Cat', '고양이 (goyangi)'],
        ['Bird', '새 (sae)'],
        ['Fish', '물고기 (mulgogi)'],
        ['Rabbit', '토끼 (tokki)'],
        ['Horse', '말 (mal)'],
        ['Cow', '소 (so)'],
        ['Pig', '돼지 (dwaeji)'],
        ['Chicken', '닭 (dak)'],
        ['Duck', '오리 (ori)'],
        ['Tiger', '호랑이 (horangi)'],
        ['Bear', '곰 (gom)'],
        ['Monkey', '원숭이 (wonsungi)'],
        ['Elephant', '코끼리 (kokkiri)'],
        ['Snake', '뱀 (baem)'],
        ['Frog', '개구리 (gaeguri)'],
        ['Deer', '사슴 (saseum)'],
        ['Wolf', '늑대 (neukdae)'],
        ['Fox', '여우 (yeou)'],
        ['Lion', '사자 (saja)'],
        ['Turtle', '거북이 (geobuki)'],
        ['Whale', '고래 (gorae)'],
        ['Dolphin', '돌고래 (dolgorae)'],
        ['Shark', '상어 (sangeo)'],
        ['Eagle', '독수리 (doksuri)'],
        ['Owl', '부엉이 (bueongi)'],
        ['Butterfly', '나비 (nabi)'],
        ['Ant', '개미 (gaemi)'],
        ['Bee', '벌 (beol)'],
        ['Spider', '거미 (geomi)'],
        ['Penguin', '펭귄 (penggwin)'],
        ['Giraffe', '기린 (girin)'],
        ['Zebra', '얼룩말 (eollungmal)'],
        ['Crocodile', '악어 (ageo)'],
        ['Parrot', '앵무새 (aengmusae)'],
        ['Squirrel', '다람쥐 (daramjwi)'],
        ['Sheep', '양 (yang)'],
        ['Goat', '염소 (yeomso)'],
    ];
}

function createExampleDeck() {
    const now = Date.now();
    const animals = getAnimalsList();

    const cards = animals.map((pair, i) => ({
        id: 'card_' + (now + i),
        question: pair[0],
        answer: pair[1],
        image: null,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: now,
        lastReviewed: null
    }));

    const deck = {
        id: 'deck_' + now,
        name: 'Korean Animals',
        cards: cards
    };

    appData.decks.push(deck);
    appData.currentDeck = deck.id;
    saveData();
}

function saveData() {
    localStorage.setItem('flashcardApp', JSON.stringify(appData));
}

// Deck Management
function createDeck(name) {
    const newDeck = {
        id: 'deck_' + Date.now(),
        name: name,
        cards: []
    };
    appData.decks.push(newDeck);
    appData.currentDeck = newDeck.id;
    appData.currentCardIndex = 0;
    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
}

function getCurrentDeck() {
    return appData.decks.find(deck => deck.id === appData.currentDeck);
}

function switchDeck(deckId) {
    appData.currentDeck = deckId;
    appData.currentCardIndex = 0;
    flashcard.classList.remove('flipped');
    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
}

function updateDeckSelector(filterText) {
    const deck = getCurrentDeck();

    // Update deck header
    deckTitle.textContent = deck ? deck.name : 'No Deck Selected';
    deckAuthor.textContent = deck ? `${deck.cards.length} cards` : '';
    mobileDeckName.textContent = deck ? deck.name : 'FlashDeck';

    // Update sidebar deck list
    renderDeckList(filterText);
}

function renderDeckList(filterText) {
    deckList.innerHTML = '';
    const query = (filterText || deckSearch.value || '').toLowerCase().trim();

    const filtered = query
        ? appData.decks.filter(d => d.name.toLowerCase().includes(query))
        : appData.decks;

    if (appData.decks.length === 0) {
        deckList.innerHTML = '<div style="padding:12px 8px;color:var(--text-3);font-size:12px">No decks yet</div>';
        return;
    }

    if (filtered.length === 0) {
        deckList.innerHTML = '<div style="padding:12px 8px;color:var(--text-3);font-size:12px">No matching decks</div>';
        return;
    }

    filtered.forEach(d => {
        const item = document.createElement('div');
        item.className = 'deck-list-item' + (d.id === appData.currentDeck ? ' active' : '');
        item.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>${d.name}</span>
            <span class="deck-card-count">${d.cards.length}</span>
        `;
        item.onclick = () => {
            switchDeck(d.id);
            closeSidebar();
        };
        deckList.appendChild(item);
    });
}

// View switching
const views = { study: studyView, review: reviewView, match: matchView, write: writeView, survival: survivalView, mc: mcView, manage: manageView };
const navBtns = { study: studyModeBtn, review: reviewModeBtn, match: matchModeBtn, write: writeModeBtn, survival: survivalModeBtn, mc: mcModeBtn, manage: manageModeBtn };

function switchMode(mode) {
    // Hide all views
    Object.values(views).forEach(v => v.classList.remove('active'));
    Object.values(navBtns).forEach(b => b.classList.remove('active'));

    // Deactivate mode grid cards
    document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));

    // Show selected
    if (views[mode]) views[mode].classList.add('active');
    if (navBtns[mode]) navBtns[mode].classList.add('active');

    // Highlight mode grid card
    const gridCard = document.querySelector(`.mode-card[data-mode="${mode}"]`);
    if (gridCard) gridCard.classList.add('active');

    // Special actions
    if (mode === 'study') flashcard.classList.remove('flipped');
    if (mode === 'review') startReview();
    if (mode === 'manage') cancelEdit();

    closeSidebar();
}

// Card Management (CRUD)
function addCard(question, answer, image = null) {
    const deck = getCurrentDeck();
    if (!deck) return;

    const newCard = {
        id: 'card_' + Date.now(),
        question: question,
        answer: answer,
        image: image,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: Date.now(),
        lastReviewed: null
    };

    deck.cards.push(newCard);
    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();

    questionInput.value = '';
    answerInput.value = '';
    imageInput.value = '';
    currentImage = null;
    imagePreview.innerHTML = '';
}

function editCard(cardId, question, answer, image = null) {
    const deck = getCurrentDeck();
    if (!deck) return;

    const card = deck.cards.find(c => c.id === cardId);
    if (card) {
        card.question = question;
        card.answer = answer;
        if (image !== null) {
            card.image = image;
        }
        saveData();
        updateDeckSelector();
        renderManageView();
        updateStudyView();
        updateDueCount();
    }
}

function deleteCard(cardId) {
    const deck = getCurrentDeck();
    if (!deck) return;

    deck.cards = deck.cards.filter(c => c.id !== cardId);

    if (appData.currentCardIndex >= deck.cards.length) {
        appData.currentCardIndex = Math.max(0, deck.cards.length - 1);
    }

    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
}

function startEditCard(cardId) {
    const deck = getCurrentDeck();
    if (!deck) return;

    const card = deck.cards.find(c => c.id === cardId);
    if (card) {
        editingCardId = cardId;
        questionInput.value = card.question;
        answerInput.value = card.answer;
        currentImage = card.image || null;

        if (card.image) {
            imagePreview.innerHTML = `
                <img src="${card.image}" alt="Card image">
                <button class="remove-image" onclick="removeImage()">×</button>
            `;
        }

        formTitle.textContent = 'Edit Card';
        saveCardBtn.textContent = 'Update Card';
        cancelEditBtn.style.display = 'inline-block';

        const panel = document.querySelector('.manage-panel');
        if (panel) panel.scrollIntoView({ behavior: 'smooth' });
    }
}

function cancelEdit() {
    editingCardId = null;
    questionInput.value = '';
    answerInput.value = '';
    imageInput.value = '';
    currentImage = null;
    imagePreview.innerHTML = '';
    formTitle.textContent = 'Add New Card';
    saveCardBtn.textContent = 'Add Card';
    cancelEditBtn.style.display = 'none';
}

function moveCard(cardId, targetDeckId) {
    const sourceDeck = getCurrentDeck();
    if (!sourceDeck) return;

    const targetDeck = appData.decks.find(d => d.id === targetDeckId);
    if (!targetDeck) return;

    const cardIndex = sourceDeck.cards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;

    const card = sourceDeck.cards.splice(cardIndex, 1)[0];
    targetDeck.cards.push(card);

    if (appData.currentCardIndex >= sourceDeck.cards.length) {
        appData.currentCardIndex = Math.max(0, sourceDeck.cards.length - 1);
    }

    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
}

// Study Mode Navigation
function nextCard() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    flashcard.classList.remove('flipped');
    appData.currentCardIndex = (appData.currentCardIndex + 1) % deck.cards.length;
    saveData();
    updateStudyView();
}

function previousCard() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    flashcard.classList.remove('flipped');
    appData.currentCardIndex = appData.currentCardIndex - 1;
    if (appData.currentCardIndex < 0) {
        appData.currentCardIndex = deck.cards.length - 1;
    }
    saveData();
    updateStudyView();
}

function shuffleDeck() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    for (let i = deck.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
    }

    appData.currentCardIndex = 0;
    flashcard.classList.remove('flipped');
    saveData();
    updateStudyView();
}

function flipCard() {
    flashcard.classList.toggle('flipped');
}

// UI Updates
function updateStudyView() {
    const deck = getCurrentDeck();

    if (!deck) {
        questionText.textContent = 'Create a deck to get started';
        answerText.textContent = '';
        questionImage.innerHTML = '';
        answerImage.innerHTML = '';
        progressText.textContent = '0 / 0';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        shuffleBtn.disabled = true;
        return;
    }

    if (deck.cards.length === 0) {
        questionText.textContent = 'No cards yet — go to Manage to add some';
        answerText.textContent = '';
        questionImage.innerHTML = '';
        answerImage.innerHTML = '';
        progressText.textContent = '0 / 0';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        shuffleBtn.disabled = true;
        return;
    }

    if (appData.currentCardIndex >= deck.cards.length) {
        appData.currentCardIndex = 0;
    }
    const currentCard = deck.cards[appData.currentCardIndex];
    questionText.textContent = currentCard.question;
    answerText.textContent = currentCard.answer;

    if (currentCard.image) {
        questionImage.innerHTML = `<img src="${currentCard.image}" alt="Card image">`;
        answerImage.innerHTML = `<img src="${currentCard.image}" alt="Card image">`;
    } else {
        questionImage.innerHTML = '';
        answerImage.innerHTML = '';
    }

    progressText.textContent = `${appData.currentCardIndex + 1} / ${deck.cards.length}`;

    prevBtn.disabled = false;
    nextBtn.disabled = false;
    shuffleBtn.disabled = false;
}

function renderManageView() {
    const deck = getCurrentDeck();

    if (!deck) {
        cardsContainer.innerHTML = '<div class="empty-state">No deck selected. Create one first!</div>';
        return;
    }

    if (deck.cards.length === 0) {
        cardsContainer.innerHTML = '<div class="empty-state">No cards yet. Add your first card above!</div>';
        return;
    }

    cardsContainer.innerHTML = '';

    deck.cards.forEach(card => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';

        let moveOptions = '';
        if (appData.decks.length > 1) {
            moveOptions = '<select class="move-deck-select" onchange="moveCard(\'' + card.id + '\', this.value)">';
            moveOptions += '<option value="">Move to...</option>';
            appData.decks.forEach(d => {
                if (d.id !== appData.currentDeck) {
                    moveOptions += `<option value="${d.id}">${d.name}</option>`;
                }
            });
            moveOptions += '</select>';
        }

        const imageHTML = card.image ? `<div class="card-item-image"><img src="${card.image}" alt="Card image"></div>` : '';

        cardItem.innerHTML = `
            <div class="card-item-header">
                <div class="card-item-content">
                    <div class="card-item-question">Q: ${card.question}</div>
                    <div class="card-item-answer">A: ${card.answer}</div>
                    ${imageHTML}
                </div>
                <div class="card-item-actions">
                    <button class="btn-small btn-edit" onclick="startEditCard('${card.id}')">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteCard('${card.id}')">Delete</button>
                    ${moveOptions}
                </div>
            </div>
        `;

        cardsContainer.appendChild(cardItem);
    });
}

// Image Handling
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        currentImage = e.target.result;
        imagePreview.innerHTML = `
            <img src="${currentImage}" alt="Preview">
            <button class="remove-image" onclick="removeImage()">×</button>
        `;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    currentImage = null;
    imageInput.value = '';
    imagePreview.innerHTML = '';
}

// Image Search Functionality
function openImageSearch() {
    const searchTerm = answerInput.value.trim() || questionInput.value.trim();
    imageSearchInput.value = searchTerm;
    imageSearchResults.innerHTML = '';
    imageSearchModal.classList.add('active');
    imageSearchInput.focus();
}

async function searchImages() {
    const query = imageSearchInput.value.trim();
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    imageSearchResults.innerHTML = '<div class="image-search-loading">Searching for images...</div>';

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=your_access_key`, {
            headers: { 'Accept-Version': 'v1' }
        });

        if (!response.ok) {
            const pixabayResponse = await fetch(`https://pixabay.com/api/?key=44495530-6a2db4bece4fd8df5c98533f6&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`);

            if (!pixabayResponse.ok) {
                throw new Error('Failed to fetch images');
            }

            const pixabayData = await pixabayResponse.json();
            displayImageResults(pixabayData.hits.map(img => ({
                url: img.webformatURL,
                thumb: img.previewURL
            })));
            return;
        }

        const data = await response.json();
        displayImageResults(data.results.map(img => ({
            url: img.urls.regular,
            thumb: img.urls.thumb
        })));
    } catch (error) {
        imageSearchResults.innerHTML = '<div class="image-search-empty">Unable to search images. Try uploading an image file instead.</div>';
        console.error('Image search error:', error);
    }
}

function displayImageResults(images) {
    if (images.length === 0) {
        imageSearchResults.innerHTML = '<div class="image-search-empty">No images found. Try a different search term.</div>';
        return;
    }

    imageSearchResults.innerHTML = '';
    images.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = 'image-search-item';
        div.innerHTML = `<img src="${img.thumb}" alt="Search result ${index + 1}">`;
        div.onclick = () => selectSearchImage(img.url);
        imageSearchResults.appendChild(div);
    });
}

async function selectSearchImage(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = function(e) {
            currentImage = e.target.result;
            imagePreview.innerHTML = `
                <img src="${currentImage}" alt="Preview">
                <button class="remove-image" onclick="removeImage()">×</button>
            `;
            imageSearchModal.classList.remove('active');
            imageSearchResults.innerHTML = '';
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        alert('Failed to load image. Please try another one.');
        console.error('Image load error:', error);
    }
}

function closeImageSearch() {
    imageSearchModal.classList.remove('active');
    imageSearchResults.innerHTML = '';
}

// Spaced Repetition - SM-2 Algorithm
function calculateNextReview(card, quality) {
    let easeFactor = card.easeFactor;
    let interval = card.interval;
    let repetitions = card.repetitions;

    if (quality < 2) {
        repetitions = 0;
        interval = 0;
    } else {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
    }

    easeFactor = easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    let nextReview;
    if (quality === 0) {
        nextReview = Date.now() + (1 * 60 * 1000);
    } else if (quality === 1) {
        nextReview = Date.now() + (10 * 60 * 1000);
    } else {
        const daysMultiplier = quality === 3 ? 1.5 : 1;
        nextReview = Date.now() + (interval * daysMultiplier * 24 * 60 * 60 * 1000);
    }

    return {
        easeFactor,
        interval,
        repetitions,
        nextReview,
        lastReviewed: Date.now()
    };
}

function getDueCards() {
    const deck = getCurrentDeck();
    if (!deck) return [];

    const now = Date.now();
    return deck.cards.filter(card => {
        if (card.nextReview === undefined) {
            card.easeFactor = 2.5;
            card.interval = 0;
            card.repetitions = 0;
            card.nextReview = now;
            card.lastReviewed = null;
        }
        return card.nextReview <= now;
    });
}

function updateDueCount() {
    const dueCards = getDueCards();
    dueCount.textContent = dueCards.length;
}

function formatInterval(milliseconds) {
    const minutes = Math.floor(milliseconds / (60 * 1000));
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));

    if (minutes < 60) return minutes + ' min';
    else if (hours < 24) return hours + ' hr';
    else return days + ' day' + (days > 1 ? 's' : '');
}

function updateReviewIntervals(card) {
    const qualities = [
        { quality: 0, time: '1 min' },
        { quality: 1, time: '10 min' },
        { quality: 2, time: null },
        { quality: 3, time: null }
    ];

    let goodInterval = card.interval || 1;
    if (card.repetitions === 0) goodInterval = 1;
    else if (card.repetitions === 1) goodInterval = 6;
    else goodInterval = Math.round(card.interval * card.easeFactor);

    const easyInterval = Math.round(goodInterval * 1.5);

    qualities[2].time = formatInterval(goodInterval * 24 * 60 * 60 * 1000);
    qualities[3].time = formatInterval(easyInterval * 24 * 60 * 60 * 1000);

    againTime.textContent = qualities[0].time;
    hardTime.textContent = qualities[1].time;
    goodTime.textContent = qualities[2].time;
    easyTime.textContent = qualities[3].time;
}

function startReview() {
    reviewQueue = getDueCards();
    currentReviewIndex = 0;
    showingAnswer = false;

    if (reviewQueue.length === 0) {
        reviewQuestionText.textContent = 'No cards due for review!';
        reviewAnswerText.textContent = 'Great job! Check back later.';
        reviewQuestionImage.innerHTML = '';
        reviewAnswerImage.innerHTML = '';
        cardsRemaining.textContent = 'All done for now!';
        showAnswerBtn.style.display = 'none';
        return;
    }

    showNextReviewCard();
}

function showNextReviewCard() {
    if (currentReviewIndex >= reviewQueue.length) {
        reviewQuestionText.textContent = 'Review Complete!';
        reviewAnswerText.textContent = `You reviewed ${reviewQueue.length} card(s).`;
        reviewQuestionImage.innerHTML = '';
        reviewAnswerImage.innerHTML = '';
        cardsRemaining.textContent = 'Session complete!';
        showAnswerBtn.style.display = 'none';
        reviewFlashcard.classList.remove('flipped', 'showing-answer', 'showing-question');
        updateDueCount();
        return;
    }

    const card = reviewQueue[currentReviewIndex];
    reviewQuestionText.textContent = card.question;
    reviewAnswerText.textContent = card.answer;

    if (card.image) {
        reviewQuestionImage.innerHTML = `<img src="${card.image}" alt="Card image">`;
        reviewAnswerImage.innerHTML = `<img src="${card.image}" alt="Card image">`;
    } else {
        reviewQuestionImage.innerHTML = '';
        reviewAnswerImage.innerHTML = '';
    }

    cardsRemaining.textContent = `${reviewQueue.length - currentReviewIndex} card(s) remaining`;
    reviewFlashcard.classList.remove('flipped');
    reviewFlashcard.classList.add('showing-question');
    reviewFlashcard.classList.remove('showing-answer');
    showAnswerBtn.style.display = 'block';
    showingAnswer = false;

    updateReviewIntervals(card);
}

function showReviewAnswer() {
    reviewFlashcard.classList.add('flipped');
    reviewFlashcard.classList.remove('showing-question');
    reviewFlashcard.classList.add('showing-answer');
    showAnswerBtn.style.display = 'none';
    showingAnswer = true;
}

function rateCard(quality) {
    if (!showingAnswer) return;

    const card = reviewQueue[currentReviewIndex];
    const deck = getCurrentDeck();
    const deckCard = deck.cards.find(c => c.id === card.id);

    if (deckCard) {
        const updates = calculateNextReview(card, quality);
        Object.assign(deckCard, updates);
        saveData();
    }

    currentReviewIndex++;
    showNextReviewCard();
}

// Text-to-Speech
function playTTS() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    const currentCard = deck.cards[appData.currentCardIndex];
    const text = flashcard.classList.contains('flipped')
        ? currentCard.answer
        : currentCard.question;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(ttsSpeed.value);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// Load personal bests
function loadPersonalBests() {
    const saved = localStorage.getItem('flashcardPersonalBests');
    if (saved) {
        personalBests = JSON.parse(saved);
        matchBest.textContent = personalBests.match ? formatTime(personalBests.match) : '--';
        survivalBest.textContent = personalBests.survival || '--';
    }
}

function savePersonalBests() {
    localStorage.setItem('flashcardPersonalBests', JSON.stringify(personalBests));
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Levenshtein Distance
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) matrix[i] = [i];
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[len1][len2];
}

function checkAnswerSimilarity(userAnswer, correctAnswer) {
    const user = userAnswer.toLowerCase().trim();
    const correct = correctAnswer.toLowerCase().trim();

    if (user === correct) return 100;

    const distance = levenshteinDistance(user, correct);
    const maxLen = Math.max(user.length, correct.length);
    const similarity = ((maxLen - distance) / maxLen) * 100;

    return Math.round(similarity);
}

// Match Mode
function startMatchMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length < 4) {
        alert('Need at least 4 cards to play Match mode!');
        return;
    }

    const shuffled = [...deck.cards].sort(() => Math.random() - 0.5);
    const selectedCards = shuffled.slice(0, Math.min(6, deck.cards.length));

    matchState = {
        selected: [],
        matched: [],
        timer: 0,
        timerInterval: null,
        cards: selectedCards
    };

    const terms = selectedCards.map((card, idx) => ({
        id: `term-${idx}`, text: card.question, pairId: idx, type: 'term'
    }));

    const definitions = selectedCards.map((card, idx) => ({
        id: `def-${idx}`, text: card.answer, pairId: idx, type: 'definition'
    }));

    const shuffledTerms = terms.sort(() => Math.random() - 0.5);
    const shuffledDefs = definitions.sort(() => Math.random() - 0.5);

    matchGame.innerHTML = `
        <div class="match-column" id="terms-column"></div>
        <div class="match-column" id="definitions-column"></div>
    `;

    const termsCol = document.getElementById('terms-column');
    const defsCol = document.getElementById('definitions-column');

    shuffledTerms.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.textContent = item.text;
        div.dataset.id = item.id;
        div.dataset.pairId = item.pairId;
        div.dataset.type = item.type;
        div.onclick = () => selectMatchItem(div);
        termsCol.appendChild(div);
    });

    shuffledDefs.forEach(item => {
        const div = document.createElement('div');
        div.className = 'match-item';
        div.textContent = item.text;
        div.dataset.id = item.id;
        div.dataset.pairId = item.pairId;
        div.dataset.type = item.type;
        div.onclick = () => selectMatchItem(div);
        defsCol.appendChild(div);
    });

    matchState.timerInterval = setInterval(() => {
        matchState.timer++;
        matchTimer.textContent = formatTime(matchState.timer);
    }, 1000);

    matchScore.textContent = '0';
    matchResult.classList.remove('show');
    matchStartBtn.textContent = 'Restart';
}

function selectMatchItem(element) {
    if (element.classList.contains('matched')) return;

    if (matchState.selected.length === 0) {
        element.classList.add('selected');
        matchState.selected.push(element);
    } else if (matchState.selected.length === 1) {
        const first = matchState.selected[0];

        if (first === element || first.dataset.type === element.dataset.type) return;

        element.classList.add('selected');

        if (first.dataset.pairId === element.dataset.pairId) {
            setTimeout(() => {
                first.classList.remove('selected');
                element.classList.remove('selected');
                first.classList.add('matched');
                element.classList.add('matched');
                matchState.matched.push(first.dataset.pairId);
                matchScore.textContent = matchState.matched.length;

                if (matchState.matched.length === matchState.cards.length) {
                    endMatchMode();
                }
            }, 500);
        } else {
            setTimeout(() => {
                first.classList.remove('selected');
                element.classList.remove('selected');
            }, 1000);
        }

        matchState.selected = [];
    }
}

function endMatchMode() {
    clearInterval(matchState.timerInterval);

    const time = matchState.timer;
    let message = `Completed in ${formatTime(time)}!`;

    if (!personalBests.match || time < personalBests.match) {
        personalBests.match = time;
        savePersonalBests();
        matchBest.textContent = formatTime(time);
        message += ' New Personal Best!';
    }

    matchResult.innerHTML = `<h2>Match Complete!</h2><p>${message}</p>`;
    matchResult.classList.add('show');
}

// Write Mode
function startWriteMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) {
        alert('No cards available!');
        return;
    }

    writeState = {
        currentIndex: 0,
        score: 0,
        cards: [...deck.cards].sort(() => Math.random() - 0.5)
    };

    writeAnswerInput.disabled = false;
    writeCheckBtn.disabled = false;
    writeAnswerInput.value = '';
    writeFeedback.classList.remove('show');
    writeResult.classList.remove('show');
    writeStartBtn.textContent = 'Restart';

    showWriteCard();
}

function showWriteCard() {
    if (writeState.currentIndex >= writeState.cards.length) {
        endWriteMode();
        return;
    }

    const card = writeState.cards[writeState.currentIndex];
    writeQuestion.textContent = card.question;
    writeAnswerInput.value = '';
    writeAnswerInput.focus();
    writeFeedback.classList.remove('show', 'correct', 'partial', 'incorrect');
    writeProgress.textContent = `${writeState.currentIndex + 1}/${writeState.cards.length}`;
    writeScore.textContent = writeState.score;
}

function checkWriteAnswer() {
    const card = writeState.cards[writeState.currentIndex];
    const userAnswer = writeAnswerInput.value.trim();

    if (!userAnswer) return;

    const similarity = checkAnswerSimilarity(userAnswer, card.answer);

    writeFeedback.classList.add('show');

    if (similarity === 100) {
        writeFeedback.className = 'write-feedback show correct';
        writeFeedback.textContent = 'Correct!';
        writeState.score += 100;
    } else if (similarity >= 80) {
        writeFeedback.className = 'write-feedback show partial';
        writeFeedback.textContent = `Almost! (${similarity}% match). Correct: ${card.answer}`;
        writeState.score += 50;
    } else {
        writeFeedback.className = 'write-feedback show incorrect';
        writeFeedback.textContent = `Incorrect. Correct: ${card.answer}`;
    }

    writeScore.textContent = writeState.score;

    setTimeout(() => {
        writeState.currentIndex++;
        showWriteCard();
    }, 2000);
}

function endWriteMode() {
    const totalPossible = writeState.cards.length * 100;
    const percentage = Math.round((writeState.score / totalPossible) * 100);

    writeResult.innerHTML = `
        <h2>Write Mode Complete!</h2>
        <p>Score: ${writeState.score} / ${totalPossible}</p>
        <p>Accuracy: ${percentage}%</p>
    `;
    writeResult.classList.add('show');
    writeAnswerInput.disabled = true;
    writeCheckBtn.disabled = true;
}

// Survival Mode
function startSurvivalMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length < 4) {
        alert('Need at least 4 cards to play Survival mode!');
        return;
    }

    survivalState = {
        lives: 3,
        score: 0,
        currentIndex: 0,
        cards: [...deck.cards].sort(() => Math.random() - 0.5)
    };

    survivalResult.classList.remove('show');
    survivalStartBtn.textContent = 'Restart';
    updateSurvivalLives();
    showSurvivalCard();
}

function updateSurvivalLives() {
    const hearts = '\u2764\uFE0F'.repeat(survivalState.lives);
    survivalLives.textContent = hearts || '\uD83D\uDC80';
}

function showSurvivalCard() {
    if (survivalState.currentIndex >= survivalState.cards.length) {
        endSurvivalMode(true);
        return;
    }

    const deck = getCurrentDeck();
    const card = survivalState.cards[survivalState.currentIndex];

    const otherCards = deck.cards.filter(c => c.id !== card.id);
    const shuffled = otherCards.sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, 3).map(c => c.answer);

    const options = [...wrongAnswers, card.answer].sort(() => Math.random() - 0.5);

    survivalQuestion.textContent = card.question;
    survivalOptions.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'survival-option';
        btn.textContent = option;
        btn.onclick = () => checkSurvivalAnswer(option, card.answer);
        survivalOptions.appendChild(btn);
    });

    survivalScore.textContent = survivalState.score;
}

function checkSurvivalAnswer(selected, correct) {
    const buttons = survivalOptions.querySelectorAll('.survival-option');

    buttons.forEach(btn => {
        btn.onclick = null;
        if (btn.textContent === correct) btn.classList.add('correct');
        if (btn.textContent === selected && selected !== correct) btn.classList.add('incorrect');
    });

    if (selected === correct) {
        survivalState.score++;
        survivalState.currentIndex++;
        setTimeout(() => showSurvivalCard(), 1500);
    } else {
        survivalState.lives--;
        updateSurvivalLives();

        if (survivalState.lives === 0) {
            setTimeout(() => endSurvivalMode(false), 1500);
        } else {
            survivalState.currentIndex++;
            setTimeout(() => showSurvivalCard(), 1500);
        }
    }
}

function endSurvivalMode(completed) {
    const score = survivalState.score;
    let message = completed
        ? `Perfect! You completed all cards!`
        : `Game Over! You scored ${score} points.`;

    if (!personalBests.survival || score > personalBests.survival) {
        personalBests.survival = score;
        savePersonalBests();
        survivalBest.textContent = score;
        message += ' New Personal Best!';
    }

    survivalResult.innerHTML = `<h2>${completed ? 'Victory!' : 'Game Over'}</h2><p>${message}</p>`;
    survivalResult.classList.add('show');
}

// Export
function exportDeck() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) {
        alert('No cards to export!');
        return;
    }

    const lines = deck.cards.map(c => `${c.question}    ${c.answer}`);
    const text = lines.join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deck.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Multiple Choice Mode
function startMCMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length < 4) {
        alert('Need at least 4 cards to play Multiple Choice!');
        return;
    }

    mcState = {
        currentIndex: 0,
        score: 0,
        total: deck.cards.length,
        cards: [...deck.cards].sort(() => Math.random() - 0.5)
    };

    mcResult.classList.remove('show');
    mcStartBtn.textContent = 'Restart';
    showMCCard();
}

function showMCCard() {
    if (mcState.currentIndex >= mcState.cards.length) {
        endMCMode();
        return;
    }

    const deck = getCurrentDeck();
    const card = mcState.cards[mcState.currentIndex];

    const otherCards = deck.cards.filter(c => c.id !== card.id);
    const shuffled = otherCards.sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, 3).map(c => c.answer);

    const options = [...wrongAnswers, card.answer].sort(() => Math.random() - 0.5);

    mcQuestion.textContent = card.question;
    mcOptions.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'mc-option';
        btn.textContent = option;
        btn.onclick = () => checkMCAnswer(btn, option, card.answer);
        mcOptions.appendChild(btn);
    });

    mcProgress.textContent = `${mcState.currentIndex + 1}/${mcState.total}`;
    mcScore.textContent = mcState.score;
}

function checkMCAnswer(clickedBtn, selected, correct) {
    const buttons = mcOptions.querySelectorAll('.mc-option');

    buttons.forEach(btn => {
        btn.onclick = null;
        if (btn.textContent === correct) btn.classList.add('correct');
        if (btn.textContent === selected && selected !== correct) btn.classList.add('incorrect');
    });

    if (selected === correct) {
        mcState.score++;
    }

    mcScore.textContent = mcState.score;

    setTimeout(() => {
        mcState.currentIndex++;
        showMCCard();
    }, 1500);
}

function endMCMode() {
    const percentage = Math.round((mcState.score / mcState.total) * 100);

    mcResult.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Score: ${mcState.score} / ${mcState.total} (${percentage}%)</p>
    `;
    mcResult.classList.add('show');
    mcQuestion.textContent = 'Click Start to play again';
    mcOptions.innerHTML = '';
}

// Import Handling
function importFlashcards() {
    const deck = getCurrentDeck();
    if (!deck) {
        importErrors.innerHTML = '<div class="error-message">Please create a deck first!</div>';
        return;
    }

    const text = importInput.value;
    if (!text.trim()) {
        importErrors.innerHTML = '<div class="error-message">Please enter flashcards to import.</div>';
        return;
    }

    const lines = text.split('\n');
    const errors = [];
    const validCards = [];
    let lineNumber = 0;

    for (const line of lines) {
        lineNumber++;

        if (!line.trim()) continue;

        const fourSpacePattern = /^(.+?)    (.+)$/;
        const match = line.match(fourSpacePattern);

        if (!match) {
            if (line.includes('   ') && !line.includes('    ')) {
                errors.push(`Line ${lineNumber}: Wrong spacing (use exactly 4 spaces, not 3 or other)`);
            } else if (line.includes('     ')) {
                errors.push(`Line ${lineNumber}: Wrong spacing (use exactly 4 spaces, not 5 or more)`);
            } else if (line.includes(' ')) {
                errors.push(`Line ${lineNumber}: Wrong spacing (use exactly 4 spaces)`);
            } else {
                errors.push(`Line ${lineNumber}: Missing separator (use exactly 4 spaces)`);
            }
            continue;
        }

        const front = match[1].trim();
        const back = match[2].trim();

        if (!front || !back) {
            errors.push(`Line ${lineNumber}: Empty FRONT or BACK not allowed`);
            continue;
        }

        validCards.push({ front, back });
    }

    importErrors.innerHTML = '';

    if (errors.length > 0) {
        errors.forEach(error => {
            importErrors.innerHTML += `<div class="error-message">${error}</div>`;
        });
    }

    if (validCards.length > 0) {
        validCards.forEach(card => {
            addCard(card.front, card.back, null);
        });

        importErrors.innerHTML += `<div class="success-message">Successfully imported ${validCards.length} card(s)!</div>`;

        if (errors.length === 0) {
            importInput.value = '';
            setTimeout(() => {
                importModal.classList.remove('active');
                importErrors.innerHTML = '';
            }, 1500);
        }
    } else if (errors.length > 0) {
        importErrors.innerHTML += `<div class="error-message"><strong>No cards imported. Fix errors above.</strong></div>`;
    }
}

// Event Listeners
function setupEventListeners() {
    // Theme Toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Mobile sidebar
    mobileMenuBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Sidebar nav items
    studyModeBtn.addEventListener('click', () => switchMode('study'));
    reviewModeBtn.addEventListener('click', () => switchMode('review'));
    matchModeBtn.addEventListener('click', () => switchMode('match'));
    writeModeBtn.addEventListener('click', () => switchMode('write'));
    survivalModeBtn.addEventListener('click', () => switchMode('survival'));
    manageModeBtn.addEventListener('click', () => switchMode('manage'));
    importBtn.addEventListener('click', () => {
        const deck = getCurrentDeck();
        if (!deck) {
            alert('Please create a deck first!');
            return;
        }
        importModal.classList.add('active');
        importInput.value = '';
        importErrors.innerHTML = '';
        importInput.focus();
        closeSidebar();
    });

    // Mode grid cards
    modeGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.mode-card');
        if (!card) return;
        const mode = card.dataset.mode;
        if (mode) switchMode(mode);
    });

    // Card Flip
    flashcard.addEventListener('click', flipCard);

    // Navigation
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', previousCard);
    shuffleBtn.addEventListener('click', shuffleDeck);

    // New Deck
    newDeckBtn.addEventListener('click', () => {
        deckModal.classList.add('active');
        deckNameInput.value = '';
        deckNameInput.focus();
    });

    createDeckBtn.addEventListener('click', () => {
        const deckName = deckNameInput.value.trim();
        if (deckName) {
            createDeck(deckName);
            deckModal.classList.remove('active');
        }
    });

    cancelDeckBtn.addEventListener('click', () => {
        deckModal.classList.remove('active');
    });

    deckNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createDeckBtn.click();
    });

    // Image Upload
    imageInput.addEventListener('change', handleImageUpload);

    // Image Search
    searchImageBtn.addEventListener('click', openImageSearch);
    imageSearchSubmitBtn.addEventListener('click', searchImages);
    cancelImageSearchBtn.addEventListener('click', closeImageSearch);
    imageSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchImages();
    });

    imageSearchModal.addEventListener('click', (e) => {
        if (e.target === imageSearchModal) closeImageSearch();
    });

    // Review Mode
    showAnswerBtn.addEventListener('click', showReviewAnswer);
    againBtn.addEventListener('click', () => rateCard(0));
    hardBtn.addEventListener('click', () => rateCard(1));
    goodBtn.addEventListener('click', () => rateCard(2));
    easyBtn.addEventListener('click', () => rateCard(3));

    // TTS Controls
    ttsPlayBtn.addEventListener('click', playTTS);

    // Game Modes
    matchStartBtn.addEventListener('click', startMatchMode);
    writeStartBtn.addEventListener('click', startWriteMode);
    writeCheckBtn.addEventListener('click', checkWriteAnswer);
    writeAnswerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkWriteAnswer();
    });
    survivalStartBtn.addEventListener('click', startSurvivalMode);

    // Multiple Choice
    mcModeBtn.addEventListener('click', () => switchMode('mc'));
    mcStartBtn.addEventListener('click', startMCMode);

    // Export
    exportBtn.addEventListener('click', exportDeck);

    // Deck search filter
    deckSearch.addEventListener('input', () => renderDeckList(deckSearch.value));

    // Keyboard shortcuts for review mode
    document.addEventListener('keydown', (e) => {
        if (!reviewView.classList.contains('active')) return;

        if (e.key === ' ' || e.key === 'Enter') {
            if (!showingAnswer) {
                e.preventDefault();
                showReviewAnswer();
            }
        } else if (showingAnswer) {
            if (e.key === '1') { e.preventDefault(); rateCard(0); }
            else if (e.key === '2') { e.preventDefault(); rateCard(1); }
            else if (e.key === '3') { e.preventDefault(); rateCard(2); }
            else if (e.key === '4') { e.preventDefault(); rateCard(3); }
        }
    });

    // Add/Edit Card
    saveCardBtn.addEventListener('click', () => {
        const deck = getCurrentDeck();
        if (!deck) {
            alert('Please create a deck first!');
            return;
        }

        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            if (editingCardId) {
                editCard(editingCardId, question, answer, currentImage);
                cancelEdit();
            } else {
                addCard(question, answer, currentImage);
            }
        }
    });

    cancelEditBtn.addEventListener('click', cancelEdit);

    // Import
    importCardsBtn.addEventListener('click', importFlashcards);

    cancelImportBtn.addEventListener('click', () => {
        importModal.classList.remove('active');
        importInput.value = '';
        importErrors.innerHTML = '';
    });

    // Close modal on outside click
    deckModal.addEventListener('click', (e) => {
        if (e.target === deckModal) deckModal.classList.remove('active');
    });

    importModal.addEventListener('click', (e) => {
        if (e.target === importModal) {
            importModal.classList.remove('active');
            importInput.value = '';
            importErrors.innerHTML = '';
        }
    });
}

// Start the app
init();
