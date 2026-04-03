// Data Model
let appData = {
    decks: [],
    folders: [],
    currentDeck: null,
    currentCardIndex: 0
};

let editingCardId = null;
let currentFrontImage = '';
let currentBackImage = '';
let importImageMap = {};
let reviewQueue = [];
let currentReviewIndex = 0;
let showingAnswer = false;
let leitnerFilter = null;

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

// Recent study tracking
let lastStudy = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDeckName = document.getElementById('mobile-deck-name');
const deckList = document.getElementById('deck-list');
const deckTitle = document.getElementById('deck-title');
const deckAuthor = document.getElementById('deck-author');
const deckHeader = document.getElementById('deck-header');
const modeGrid = document.getElementById('mode-grid');
const newDeckBtn = document.getElementById('new-deck-btn');
const studyModeBtn = document.getElementById('study-mode-btn');
const reviewModeBtn = document.getElementById('review-mode-btn');
const matchModeBtn = document.getElementById('match-mode-btn');
const writeModeBtn = document.getElementById('write-mode-btn');
const survivalModeBtn = document.getElementById('survival-mode-btn');
const manageModeBtn = document.getElementById('manage-mode-btn');

// Page elements
const pageHomeBtn = document.getElementById('page-home-btn');
const pageFoldersBtn = document.getElementById('page-folders-btn');
const pageDecksBtn = document.getElementById('page-decks-btn');
const pageExercisesBtn = document.getElementById('page-exercises-btn');
const homePage = document.getElementById('home-page');
const homeContent = document.getElementById('home-content');
const foldersPage = document.getElementById('folders-page');
const decksPage = document.getElementById('decks-page');
const exercisesPage = document.getElementById('exercises-page');
const foldersGrid = document.getElementById('folders-grid');
const exercisesDeckName = document.getElementById('exercises-deck-name');
const deckPickerBtn = document.getElementById('deck-picker-btn');
const deckPickerDropdown = document.getElementById('deck-picker-dropdown');
const decksPageTitle = document.getElementById('decks-page-title');
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
const saveCardBtn = document.getElementById('save-card-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const cardsContainer = document.getElementById('cards-container');
const deckModal = document.getElementById('deck-modal');
const deckNameInput = document.getElementById('deck-name-input');
const createDeckBtn = document.getElementById('create-deck-btn');
const cancelDeckBtn = document.getElementById('cancel-deck-btn');
const newFolderBtn = document.getElementById('new-folder-btn');
const folderModal = document.getElementById('folder-modal');
const folderNameInput = document.getElementById('folder-name-input');
const createFolderBtn = document.getElementById('create-folder-btn');
const cancelFolderBtn = document.getElementById('cancel-folder-btn');
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
    loadLastStudy();
    loadExpandedFolders();
    loadStudySettings();
    setupEventListeners();

    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
    if (typeof applyDeckColor === 'function') applyDeckColor();
    switchPage('home');
    checkShareImport();
}

// LocalStorage Functions
const APP_VERSION = '2';

function loadData() {
    const savedVersion = localStorage.getItem('flashcardAppVersion');
    if (savedVersion !== APP_VERSION) {
        // New version — clear old data and start fresh
        localStorage.removeItem('flashcardApp');
        localStorage.setItem('flashcardAppVersion', APP_VERSION);
        appData = { decks: [], folders: [], currentDeck: null, currentCardIndex: 0 };
        createExampleDeck();
        return;
    }

    const savedData = localStorage.getItem('flashcardApp');
    if (savedData) {
        appData = JSON.parse(savedData);

        // Migrate old cards
        appData.decks.forEach(deck => {
            deck.cards.forEach(card => {
                if (card.easeFactor === undefined) {
                    card.easeFactor = 2.5;
                    card.interval = 0;
                    card.repetitions = 0;
                    card.nextReview = Date.now();
                    card.lastReviewed = null;
                }
                // Migrate single image to front/back images
                if (card.image !== undefined && card.frontImage === undefined) {
                    card.frontImage = card.image || '';
                    card.backImage = card.image || '';
                    delete card.image;
                }
                if (card.frontImage === undefined) card.frontImage = '';
                if (card.backImage === undefined) card.backImage = '';
                if (card.starred === undefined) card.starred = false;
                if (card.trackStatus === undefined) card.trackStatus = 'unseen'; // 'unseen', 'learning', 'know'
                if (card.leitnerBox === undefined) card.leitnerBox = 1;
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

        // Migrate: ensure folders array exists
        if (!appData.folders) appData.folders = [];
        // Migrate: ensure each deck has folderId, icon, cover, coverPos
        appData.decks.forEach(d => {
            if (d.folderId === undefined) d.folderId = null;
            if (d.icon === undefined) d.icon = '';
            if (d.cover === undefined) d.cover = '';
            if (d.coverPos === undefined) d.coverPos = 'center';
            if (d.color === undefined) d.color = '';
        });
        // Migrate: ensure each folder has icon, cover, coverPos
        appData.folders.forEach(f => {
            if (f.icon === undefined) f.icon = '';
            if (f.cover === undefined) f.cover = '';
            if (f.coverPos === undefined) f.coverPos = 'center';
        });

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
            folders: [],
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
function createDeck(name, folderId = null) {
    const newDeck = {
        id: 'deck_' + Date.now(),
        name: name,
        folderId: folderId || viewingFolderId,
        icon: '',
        cover: '',
        coverPos: 'center',
        color: '',
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
    // Track last studied timestamp on the deck
    const deckObj = appData.decks.find(d => d.id === deckId);
    if (deckObj) deckObj.lastStudied = Date.now();
    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
    if (typeof applyDeckColor === 'function') applyDeckColor();
}

function updateDeckSelector(filterText) {
    const deck = getCurrentDeck();

    // Update deck header
    deckTitle.textContent = deck ? deck.name : 'No Deck Selected';
    deckAuthor.textContent = deck ? `${deck.cards.length} cards` : '';
    mobileDeckName.textContent = deck ? deck.name : 'FlashDeck';
    exercisesDeckName.textContent = deck ? deck.name : 'No deck selected';

    // Update decks page if visible
    if (currentPage === 'decks') renderDecksPage();
    if (currentPage === 'folders') renderFoldersPage();
}

// Folder Management
let expandedFolders = new Set();

function loadExpandedFolders() {
    const saved = localStorage.getItem('flashcardExpandedFolders');
    if (saved) expandedFolders = new Set(JSON.parse(saved));
}

function saveExpandedFolders() {
    localStorage.setItem('flashcardExpandedFolders', JSON.stringify([...expandedFolders]));
}

function toggleFolder(folderId) {
    if (expandedFolders.has(folderId)) expandedFolders.delete(folderId);
    else expandedFolders.add(folderId);
    saveExpandedFolders();
    renderDeckList();
}

function createFolder(name) {
    const folder = { id: 'folder_' + Date.now(), name: name, icon: '', cover: '', coverPos: 'center' };
    appData.folders.push(folder);
    saveData();
    if (currentPage === 'folders') renderFoldersPage();
}

function deleteFolder(folderId) {
    // Delete all decks inside the folder
    const deletedDeckIds = appData.decks.filter(d => d.folderId === folderId).map(d => d.id);
    appData.decks = appData.decks.filter(d => d.folderId !== folderId);
    if (deletedDeckIds.includes(appData.currentDeck)) {
        appData.currentDeck = appData.decks.length > 0 ? appData.decks[0].id : null;
        appData.currentCardIndex = 0;
    }
    appData.folders = appData.folders.filter(f => f.id !== folderId);
    saveData();
    if (currentPage === 'folders') renderFoldersPage();
    if (currentPage === 'decks' && viewingFolderId === folderId) {
        viewingFolderId = null;
        switchPage('folders');
    }
}

function showMoveDeckPicker(deck) {
    const modal = document.getElementById('move-folder-modal');
    const list = document.getElementById('move-folder-list');
    const title = document.getElementById('move-folder-title');
    title.textContent = `Move "${deck.name}" to...`;
    list.innerHTML = '';

    appData.folders.forEach(f => {
        if (f.id === deck.folderId) return;
        const item = document.createElement('div');
        item.className = 'move-folder-item';
        const icon = f.icon || '';
        item.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            ${icon ? `<span style="font-size:18px">${icon}</span>` : ''}
            <span>${f.name}</span>
        `;
        item.onclick = () => {
            moveDeckToFolder(deck.id, f.id);
            modal.classList.remove('active');
        };
        list.appendChild(item);
    });

    if (list.children.length === 0) {
        list.innerHTML = '<div style="padding:16px;color:var(--text-3);text-align:center;font-size:13px">No folders yet. Create one first.</div>';
    }

    modal.classList.add('active');
}

function moveDeckToFolder(deckId, folderId) {
    const deck = appData.decks.find(d => d.id === deckId);
    if (deck) {
        deck.folderId = folderId;
        saveData();
        if (currentPage === 'decks') renderDecksPage();
        if (currentPage === 'folders') renderFoldersPage();
    }
}

function renderDeckList() {
    renderDecksPage();
    renderFoldersPage();
}

// Context menus
function showIconPicker(item, type) {
    const emoji = prompt('Enter an emoji icon (or leave blank to remove):', item.icon || '');
    if (emoji !== null) {
        item.icon = emoji.trim();
        saveData();
        if (currentPage === 'folders') renderFoldersPage();
        if (currentPage === 'decks') renderDecksPage();
        if (currentPage === 'home') renderHomePage();
    }
}

let coverTarget = null;
let coverImageData = null;

function showCoverPicker(item) {
    coverTarget = item;
    coverImageData = item.cover || null;
    const modal = document.getElementById('cover-modal');
    const preview = document.getElementById('cover-preview');
    const prompt = document.getElementById('cover-drop-prompt');
    const urlInput = document.getElementById('cover-url-input');
    urlInput.value = '';

    if (coverImageData) {
        preview.innerHTML = `<img src="${coverImageData}" alt="Cover"><button class="remove-image" onclick="clearCoverPreview()">×</button>`;
        prompt.style.display = 'none';
    } else {
        preview.innerHTML = '';
        prompt.style.display = '';
    }
    modal.classList.add('active');
}

function clearCoverPreview() {
    coverImageData = null;
    document.getElementById('cover-preview').innerHTML = '';
    document.getElementById('cover-drop-prompt').style.display = '';
}

function setCoverFromFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        coverImageData = e.target.result;
        const preview = document.getElementById('cover-preview');
        const prompt = document.getElementById('cover-drop-prompt');
        preview.innerHTML = `<img src="${coverImageData}" alt="Cover"><button class="remove-image" onclick="clearCoverPreview()">×</button>`;
        prompt.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function saveCover() {
    if (!coverTarget) return;
    const urlInput = document.getElementById('cover-url-input');
    const url = urlInput.value.trim();
    coverTarget.cover = url || coverImageData || '';
    saveData();
    document.getElementById('cover-modal').classList.remove('active');
    if (currentPage === 'folders') renderFoldersPage();
    if (currentPage === 'decks') renderDecksPage();
    if (currentPage === 'home') renderHomePage();
}

function removeCover() {
    if (!coverTarget) return;
    coverTarget.cover = '';
    saveData();
    document.getElementById('cover-modal').classList.remove('active');
    if (currentPage === 'folders') renderFoldersPage();
    if (currentPage === 'decks') renderDecksPage();
    if (currentPage === 'home') renderHomePage();
}

// Shared: read image file to data URL
function readImageToPreview(file, previewEl, promptEl, callback) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        previewEl.innerHTML = `<img src="${dataUrl}" alt="Preview"><button class="remove-image" onclick="this.parentElement.innerHTML='';document.getElementById('${promptEl.id}').style.display=''">×</button>`;
        promptEl.style.display = 'none';
        if (callback) callback(dataUrl);
    };
    reader.readAsDataURL(file);
}

function showDeckContextMenu(e, deck, folderOptions) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.id = 'context-menu';

    // Icon option
    const iconOpt = document.createElement('div');
    iconOpt.className = 'context-menu-item';
    iconOpt.textContent = deck.icon ? 'Change icon' : 'Add icon';
    iconOpt.onclick = () => { closeContextMenu(); showIconPicker(deck); };
    menu.appendChild(iconOpt);

    // Color option
    const colorOpt = document.createElement('div');
    colorOpt.className = 'context-menu-item';
    colorOpt.textContent = deck.color ? 'Change color' : 'Set color';
    colorOpt.onclick = () => { closeContextMenu(); showColorPicker(deck); };
    menu.appendChild(colorOpt);

    // Cover option
    const coverOpt = document.createElement('div');
    coverOpt.className = 'context-menu-item';
    coverOpt.textContent = deck.cover ? 'Change cover' : 'Add cover';
    coverOpt.onclick = () => { closeContextMenu(); showCoverPicker(deck); };
    menu.appendChild(coverOpt);

    if (deck.cover) {
        const reposOpt = document.createElement('div');
        reposOpt.className = 'context-menu-item';
        reposOpt.textContent = 'Reposition cover';
        reposOpt.onclick = () => { closeContextMenu(); showCoverRepositioner(deck); };
        menu.appendChild(reposOpt);
    }

    // Rename deck
    const renameOpt = document.createElement('div');
    renameOpt.className = 'context-menu-item';
    renameOpt.textContent = 'Rename deck';
    renameOpt.onclick = () => {
        closeContextMenu();
        const newName = prompt('Rename deck:', deck.name);
        if (newName && newName.trim()) {
            deck.name = newName.trim();
            saveData();
            updateDeckSelector();
            if (currentPage === 'decks') renderDecksPage();
            if (currentPage === 'folders') renderFoldersPage();
            if (currentPage === 'home') renderHomePage();
        }
    };
    menu.appendChild(renameOpt);

    // Share deck
    const shareOpt = document.createElement('div');
    shareOpt.className = 'context-menu-item';
    shareOpt.textContent = 'Share deck';
    shareOpt.onclick = () => { closeContextMenu(); shareDeck(deck); };
    menu.appendChild(shareOpt);

    // Edit cards
    const editCardsOpt = document.createElement('div');
    editCardsOpt.className = 'context-menu-item';
    editCardsOpt.textContent = 'Edit cards';
    editCardsOpt.onclick = () => {
        closeContextMenu();
        switchDeck(deck.id);
        switchMode('manage');
    };
    menu.appendChild(editCardsOpt);

    const moveOpt = document.createElement('div');
    moveOpt.className = 'context-menu-item';
    moveOpt.textContent = 'Move to folder';
    moveOpt.onclick = () => { closeContextMenu(); showMoveDeckPicker(deck); };
    menu.appendChild(moveOpt);

    if (deck.folderId) {
        const opt = document.createElement('div');
        opt.className = 'context-menu-item';
        opt.textContent = 'Remove from folder';
        opt.onclick = () => { moveDeckToFolder(deck.id, null); closeContextMenu(); };
        menu.appendChild(opt);
    }

    // Merge option
    const mergeOpt = document.createElement('div');
    mergeOpt.className = 'context-menu-item';
    mergeOpt.textContent = 'Merge with...';
    mergeOpt.onclick = () => { closeContextMenu(); showMergePicker(deck); };
    menu.appendChild(mergeOpt);

    const del = document.createElement('div');
    del.className = 'context-menu-item danger';
    del.textContent = 'Delete deck';
    del.onclick = () => {
        const backup = JSON.parse(JSON.stringify(deck));
        const prevCurrentDeck = appData.currentDeck;
        const prevCardIndex = appData.currentCardIndex;
        appData.decks = appData.decks.filter(d => d.id !== deck.id);
        if (appData.currentDeck === deck.id) {
            appData.currentDeck = appData.decks.length > 0 ? appData.decks[0].id : null;
            appData.currentCardIndex = 0;
        }
        saveData();
        updateDeckSelector();
        renderManageView();
        updateStudyView();
        updateDueCount();
        if (currentPage === 'decks') renderDecksPage();
        if (currentPage === 'folders') renderFoldersPage();
        if (currentPage === 'home') renderHomePage();
        showUndoToast(`Deck "${backup.name}" deleted`, () => {
            appData.decks.push(backup);
            appData.currentDeck = prevCurrentDeck;
            appData.currentCardIndex = prevCardIndex;
            saveData();
            updateDeckSelector();
            renderManageView();
            updateStudyView();
            updateDueCount();
            if (currentPage === 'decks') renderDecksPage();
            if (currentPage === 'folders') renderFoldersPage();
            if (currentPage === 'home') renderHomePage();
        });
        closeContextMenu();
    };
    menu.appendChild(del);

    positionContextMenu(menu, e);
}

function showFolderContextMenu(e, folder) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.id = 'context-menu';

    const iconOpt = document.createElement('div');
    iconOpt.className = 'context-menu-item';
    iconOpt.textContent = folder.icon ? 'Change icon' : 'Add icon';
    iconOpt.onclick = () => { closeContextMenu(); showIconPicker(folder); };
    menu.appendChild(iconOpt);

    const coverOpt = document.createElement('div');
    coverOpt.className = 'context-menu-item';
    coverOpt.textContent = folder.cover ? 'Change cover' : 'Add cover';
    coverOpt.onclick = () => { closeContextMenu(); showCoverPicker(folder); };
    menu.appendChild(coverOpt);

    if (folder.cover) {
        const reposOpt = document.createElement('div');
        reposOpt.className = 'context-menu-item';
        reposOpt.textContent = 'Reposition cover';
        reposOpt.onclick = () => { closeContextMenu(); showCoverRepositioner(folder); };
        menu.appendChild(reposOpt);
    }

    // Add decks to folder
    const addDecksOpt = document.createElement('div');
    addDecksOpt.className = 'context-menu-item';
    addDecksOpt.textContent = 'Add decks to folder';
    addDecksOpt.onclick = () => { closeContextMenu(); showAddDecksToFolder(folder); };
    menu.appendChild(addDecksOpt);

    const rename = document.createElement('div');
    rename.className = 'context-menu-item';
    rename.textContent = 'Rename folder';
    rename.onclick = () => {
        const newName = prompt('Rename folder:', folder.name);
        if (newName && newName.trim()) {
            folder.name = newName.trim();
            saveData();
            if (currentPage === 'folders') renderFoldersPage();
        }
        closeContextMenu();
    };
    menu.appendChild(rename);

    const del = document.createElement('div');
    del.className = 'context-menu-item danger';
    del.textContent = 'Delete folder';
    del.onclick = () => {
        const folderBackup = JSON.parse(JSON.stringify(folder));
        const decksBackup = JSON.parse(JSON.stringify(appData.decks.filter(d => d.folderId === folder.id)));
        const prevCurrentDeck = appData.currentDeck;
        const prevCardIndex = appData.currentCardIndex;
        deleteFolder(folder.id);
        showUndoToast(`Folder "${folderBackup.name}" deleted`, () => {
            appData.folders.push(folderBackup);
            decksBackup.forEach(d => appData.decks.push(d));
            appData.currentDeck = prevCurrentDeck;
            appData.currentCardIndex = prevCardIndex;
            saveData();
            updateDeckSelector();
            renderManageView();
            updateStudyView();
            updateDueCount();
            if (currentPage === 'folders') renderFoldersPage();
            if (currentPage === 'decks') renderDecksPage();
            if (currentPage === 'home') renderHomePage();
        });
        closeContextMenu();
    };
    menu.appendChild(del);

    positionContextMenu(menu, e);
}

// Cover repositioner
function showCoverRepositioner(item) {
    // Remove any existing repositioner
    const existing = document.getElementById('cover-repositioner');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'cover-repositioner';
    overlay.className = 'cover-repos-overlay';
    overlay.innerHTML = `
        <div class="cover-repos-banner" style="background-image:url(${item.cover});background-position:${item.coverPos || 'center'}">
        </div>
        <div class="cover-repos-hint">Drag image up or down to reposition</div>
        <div class="cover-repos-actions">
            <button class="btn btn-primary" id="cover-repos-save">Save position</button>
            <button class="btn btn-outline" id="cover-repos-cancel">Cancel</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const banner = overlay.querySelector('.cover-repos-banner');
    let dragging = false;
    let startY = 0;
    let startPos = parseFloat(item.coverPos) || 50;
    // Parse current position - extract the Y percentage
    const posMatch = (item.coverPos || 'center').match(/(\d+)%/);
    if (posMatch) startPos = parseFloat(posMatch[1]);
    else startPos = 50;
    let currentPos = startPos;

    function onStart(e) {
        dragging = true;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        banner.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function onMove(e) {
        if (!dragging) return;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dy = clientY - startY;
        const bannerH = banner.offsetHeight;
        // Convert pixel drag to percentage shift
        const pctChange = (dy / bannerH) * 100;
        currentPos = Math.max(0, Math.min(100, startPos - pctChange));
        banner.style.backgroundPosition = `center ${currentPos}%`;
    }

    function onEnd() {
        if (!dragging) return;
        dragging = false;
        startPos = currentPos;
        banner.style.cursor = 'grab';
    }

    banner.addEventListener('mousedown', onStart);
    banner.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    overlay.querySelector('#cover-repos-save').onclick = () => {
        item.coverPos = `center ${Math.round(currentPos)}%`;
        saveData();
        cleanup();
        if (currentPage === 'folders') renderFoldersPage();
        if (currentPage === 'decks') renderDecksPage();
        if (currentPage === 'home') renderHomePage();
    };

    overlay.querySelector('#cover-repos-cancel').onclick = () => {
        cleanup();
    };

    function cleanup() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchend', onEnd);
        overlay.remove();
    }
}

function positionContextMenu(menu, e) {
    document.body.appendChild(menu);
    const x = Math.min(e.clientX, window.innerWidth - 180);
    const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight - 10);
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    setTimeout(() => document.addEventListener('click', closeContextMenu, { once: true }), 0);
}

// Global Search
function openSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('global-search-input');
    const results = document.getElementById('search-results');
    modal.classList.add('active');
    input.value = '';
    results.innerHTML = '';
    setTimeout(() => input.focus(), 50);
}

function closeSearch() {
    document.getElementById('search-modal').classList.remove('active');
}

function performSearch(query) {
    const results = document.getElementById('search-results');
    results.innerHTML = '';
    if (!query.trim()) return;

    const q = query.toLowerCase();
    const matches = { folders: [], decks: [], cards: [] };

    // Search folders
    appData.folders.forEach(f => {
        if (f.name.toLowerCase().includes(q)) {
            matches.folders.push(f);
        }
    });

    // Search decks
    appData.decks.forEach(d => {
        if (d.name.toLowerCase().includes(q)) {
            matches.decks.push({ deck: d, matchType: 'name' });
        }
    });

    // Search cards
    appData.decks.forEach(d => {
        d.cards.forEach(c => {
            if (c.question.toLowerCase().includes(q) || c.answer.toLowerCase().includes(q)) {
                matches.cards.push({ card: c, deck: d });
            }
        });
    });

    const total = matches.folders.length + matches.decks.length + matches.cards.length;
    if (total === 0) {
        results.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    function highlight(text, query) {
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return text.substring(0, idx) + '<mark>' + text.substring(idx, idx + query.length) + '</mark>' + text.substring(idx + query.length);
    }

    if (matches.folders.length > 0) {
        const label = document.createElement('div');
        label.className = 'search-section-label';
        label.textContent = 'Folders';
        results.appendChild(label);
        matches.folders.forEach(f => {
            const item = document.createElement('div');
            item.className = 'search-item';
            const icon = f.icon || '';
            item.innerHTML = `
                ${icon ? `<span class="search-item-emoji">${icon}</span>` : `<svg class="search-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`}
                <div class="search-item-text">
                    <div class="search-item-name">${highlight(f.name, q)}</div>
                    <div class="search-item-meta">${appData.decks.filter(d => d.folderId === f.id).length} decks</div>
                </div>
            `;
            item.onclick = () => {
                closeSearch();
                viewingFolderId = f.id;
                decksPageTitle.textContent = f.name;
                switchPage('decks');
                renderDecksPage();
            };
            results.appendChild(item);
        });
    }

    if (matches.decks.length > 0) {
        const label = document.createElement('div');
        label.className = 'search-section-label';
        label.textContent = 'Decks';
        results.appendChild(label);
        matches.decks.forEach(({ deck: d }) => {
            const item = document.createElement('div');
            item.className = 'search-item';
            const icon = d.icon || '';
            const folderName = d.folderId ? (appData.folders.find(f => f.id === d.folderId)?.name || '') : '';
            item.innerHTML = `
                ${icon ? `<span class="search-item-emoji">${icon}</span>` : `<svg class="search-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg>`}
                <div class="search-item-text">
                    <div class="search-item-name">${highlight(d.name, q)}</div>
                    <div class="search-item-meta">${d.cards.length} cards${folderName ? ' \u00b7 ' + folderName : ''}</div>
                </div>
            `;
            item.onclick = () => {
                closeSearch();
                switchDeck(d.id);
                switchPage('exercises');
            };
            results.appendChild(item);
        });
    }

    if (matches.cards.length > 0) {
        const label = document.createElement('div');
        label.className = 'search-section-label';
        label.textContent = `Cards (${matches.cards.length})`;
        results.appendChild(label);
        const shown = matches.cards.slice(0, 30);
        shown.forEach(({ card: c, deck: d }) => {
            const item = document.createElement('div');
            item.className = 'search-item';
            const qMatch = c.question.toLowerCase().includes(q);
            item.innerHTML = `
                <svg class="search-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <div class="search-item-text">
                    <div class="search-item-name">${highlight(qMatch ? c.question : c.answer, q)}</div>
                    <div class="search-item-meta">${qMatch ? c.answer : c.question} \u00b7 ${d.name}</div>
                </div>
            `;
            item.onclick = () => {
                closeSearch();
                switchDeck(d.id);
                const idx = d.cards.findIndex(card => card.id === c.id);
                if (idx >= 0) appData.currentCardIndex = idx;
                saveData();
                updateStudyView();
                switchPage('home');
            };
            results.appendChild(item);
        });
        if (matches.cards.length > 30) {
            const more = document.createElement('div');
            more.className = 'search-no-results';
            more.textContent = `+ ${matches.cards.length - 30} more results`;
            results.appendChild(more);
        }
    }
}

// ===== SELECT MODE =====
let selectMode = null; // null, 'folders', or 'decks'
let selectedIds = new Set();

function toggleSelectMode(type) {
    if (selectMode === type) {
        selectMode = null;
        selectedIds.clear();
        document.getElementById('select-bar-' + type).style.display = 'none';
        document.getElementById('select-' + type + '-btn').textContent = 'Select';
        if (type === 'folders') renderFoldersPage();
        else renderDecksPage();
    } else {
        selectMode = type;
        selectedIds.clear();
        document.getElementById('select-bar-' + type).style.display = '';
        document.getElementById('select-' + type + '-btn').textContent = 'Cancel';
        updateSelectCount();
        if (type === 'folders') renderFoldersPage();
        else renderDecksPage();
    }
}

function toggleSelect(id) {
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    updateSelectCount();
    // Toggle visual
    const el = document.querySelector(`[data-select-id="${id}"]`);
    if (el) el.classList.toggle('selected', selectedIds.has(id));
}

function selectAll(type) {
    if (type === 'folders') {
        appData.folders.forEach(f => selectedIds.add(f.id));
        renderFoldersPage();
    } else {
        const visible = viewingFolderId
            ? appData.decks.filter(d => d.folderId === viewingFolderId)
            : appData.decks;
        visible.forEach(d => selectedIds.add(d.id));
        renderDecksPage();
    }
    updateSelectCount();
}

function updateSelectCount() {
    const type = selectMode;
    if (!type) return;
    document.getElementById('select-count-' + type).textContent = selectedIds.size + ' selected';
}

function deleteSelected(type) {
    if (selectedIds.size === 0) { alert('Nothing selected'); return; }
    const idsToDelete = new Set(selectedIds);
    const prevDecks = JSON.parse(JSON.stringify(appData.decks));
    const prevFolders = JSON.parse(JSON.stringify(appData.folders));
    const prevCurrentDeck = appData.currentDeck;
    const prevCardIndex = appData.currentCardIndex;
    const count = idsToDelete.size;
    if (type === 'folders') {
        idsToDelete.forEach(id => {
            appData.decks = appData.decks.filter(d => d.folderId !== id);
            appData.folders = appData.folders.filter(f => f.id !== id);
        });
        if (appData.currentDeck && !appData.decks.find(d => d.id === appData.currentDeck)) {
            appData.currentDeck = appData.decks.length > 0 ? appData.decks[0].id : null;
            appData.currentCardIndex = 0;
        }
    } else {
        idsToDelete.forEach(id => {
            appData.decks = appData.decks.filter(d => d.id !== id);
            if (appData.currentDeck === id) {
                appData.currentDeck = appData.decks.length > 0 ? appData.decks[0].id : null;
                appData.currentCardIndex = 0;
            }
        });
    }
    saveData();
    selectedIds.clear();
    toggleSelectMode(type);
    updateDeckSelector();
    const label = type === 'folders' ? 'folder(s)' : 'deck(s)';
    showUndoToast(`${count} ${label} deleted`, () => {
        appData.decks = prevDecks;
        appData.folders = prevFolders;
        appData.currentDeck = prevCurrentDeck;
        appData.currentCardIndex = prevCardIndex;
        saveData();
        updateDeckSelector();
        renderManageView();
        updateStudyView();
        updateDueCount();
        if (currentPage === 'decks') renderDecksPage();
        if (currentPage === 'folders') renderFoldersPage();
        if (currentPage === 'home') renderHomePage();
    });
}

function exportSelected(type) {
    if (selectedIds.size === 0) { alert('Nothing selected'); return; }
    if (type === 'folders') {
        const folders = appData.folders.filter(f => selectedIds.has(f.id));
        const data = {
            type: 'flashdeck-backup',
            exportDate: new Date().toISOString(),
            folders: folders.map(f => ({
                name: f.name, icon: f.icon || '', cover: f.cover || '', coverPos: f.coverPos || 'center',
                decks: appData.decks.filter(d => d.folderId === f.id).map(d => ({
                    name: d.name, icon: d.icon || '', cover: d.cover || '', coverPos: d.coverPos || 'center',
                    cards: d.cards.map(c => ({ question: c.question, answer: c.answer, frontImage: c.frontImage || '', backImage: c.backImage || '', starred: c.starred || false }))
                }))
            })),
            loosDecks: []
        };
        downloadJSON(data, `FlashDeck-${folders.length}-folders.json`);
    } else {
        const decks = appData.decks.filter(d => selectedIds.has(d.id));
        const data = {
            type: 'flashdeck-backup',
            exportDate: new Date().toISOString(),
            folders: [],
            loosDecks: decks.map(d => ({
                name: d.name, icon: d.icon || '', cover: d.cover || '', coverPos: d.coverPos || 'center',
                cards: d.cards.map(c => ({ question: c.question, answer: c.answer, frontImage: c.frontImage || '', backImage: c.backImage || '', starred: c.starred || false }))
            }))
        };
        downloadJSON(data, `FlashDeck-${decks.length}-decks.json`);
    }
}

function moveSelectedToFolder() {
    if (selectedIds.size === 0) { alert('Nothing selected'); return; }
    const modal = document.getElementById('move-folder-modal');
    const list = document.getElementById('move-folder-list');
    const title = document.getElementById('move-folder-title');
    title.textContent = `Move ${selectedIds.size} deck(s) to...`;
    list.innerHTML = '';
    appData.folders.forEach(f => {
        const item = document.createElement('div');
        item.className = 'move-folder-item';
        item.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            ${f.icon ? `<span style="font-size:18px">${f.icon}</span>` : ''}<span>${f.name}</span>`;
        item.onclick = () => {
            selectedIds.forEach(id => moveDeckToFolder(id, f.id));
            modal.classList.remove('active');
            toggleSelectMode('decks');
        };
        list.appendChild(item);
    });
    if (list.children.length === 0) list.innerHTML = '<div style="padding:16px;color:var(--text-3);text-align:center">No folders yet.</div>';
    modal.classList.add('active');
}

// Add decks to folder
let addDecksFolderId = null;

function showAddDecksToFolder(folder) {
    addDecksFolderId = folder.id;
    const modal = document.getElementById('add-decks-modal');
    const list = document.getElementById('add-decks-list');
    document.getElementById('add-decks-title').textContent = `Add decks to "${folder.name}"`;
    list.innerHTML = '';

    const available = appData.decks.filter(d => d.folderId !== folder.id);
    if (available.length === 0) {
        list.innerHTML = '<div style="padding:16px;color:var(--text-3);text-align:center">All decks are already in this folder.</div>';
    } else {
        available.forEach(d => {
            const item = document.createElement('label');
            item.className = 'add-deck-item';
            const folderName = d.folderId ? (appData.folders.find(f => f.id === d.folderId)?.name || '') : 'No folder';
            item.innerHTML = `<input type="checkbox" value="${d.id}"><span class="add-deck-name">${d.icon || ''} ${d.name}</span><span class="add-deck-count">${d.cards.length} cards · ${folderName}</span>`;
            list.appendChild(item);
        });
    }
    modal.classList.add('active');
}

function confirmAddDecks() {
    const checkboxes = document.querySelectorAll('#add-decks-list input[type=checkbox]:checked');
    checkboxes.forEach(cb => moveDeckToFolder(cb.value, addDecksFolderId));
    document.getElementById('add-decks-modal').classList.remove('active');
    if (currentPage === 'folders') renderFoldersPage();
}

function closeContextMenu() {
    const existing = document.getElementById('context-menu');
    if (existing) existing.remove();
}

// Deck picker (exercises page)
function toggleDeckPicker() {
    const isOpen = deckPickerDropdown.classList.contains('open');
    if (isOpen) {
        closeDeckPicker();
    } else {
        renderDeckPicker();
        deckPickerDropdown.classList.add('open');
        setTimeout(() => document.addEventListener('click', closeDeckPickerOnClick, { once: true }), 0);
    }
}

function closeDeckPicker() {
    deckPickerDropdown.classList.remove('open');
}

function closeDeckPickerOnClick(e) {
    if (!deckPickerDropdown.contains(e.target) && e.target !== deckPickerBtn) {
        closeDeckPicker();
    }
}

function renderDeckPicker() {
    deckPickerDropdown.innerHTML = '';

    // Folders with their decks
    appData.folders.forEach(folder => {
        const folderDecks = appData.decks.filter(d => d.folderId === folder.id);
        if (folderDecks.length === 0) return;

        const label = document.createElement('div');
        label.className = 'deck-picker-folder';
        label.textContent = (folder.icon ? folder.icon + ' ' : '') + folder.name;
        deckPickerDropdown.appendChild(label);

        folderDecks.forEach(d => {
            deckPickerDropdown.appendChild(createPickerItem(d));
        });
    });

    // Unfoldered decks
    const loose = appData.decks.filter(d => !d.folderId);
    if (loose.length > 0 && appData.folders.length > 0) {
        const label = document.createElement('div');
        label.className = 'deck-picker-folder';
        label.textContent = 'Other';
        deckPickerDropdown.appendChild(label);
    }
    loose.forEach(d => {
        deckPickerDropdown.appendChild(createPickerItem(d));
    });
}

function createPickerItem(d) {
    const item = document.createElement('div');
    item.className = 'deck-picker-item' + (d.id === appData.currentDeck ? ' active' : '');
    const icon = d.icon || '';
    item.innerHTML = `
        <span class="picker-icon">${icon || '&#128196;'}</span>
        <span>${d.name}</span>
        <span class="picker-count">${d.cards.length}</span>
    `;
    item.onclick = () => {
        switchDeck(d.id);
        exercisesDeckName.textContent = d.name;
        closeDeckPicker();
        updateDueCount();
    };
    return item;
}

// Page rendering
function renderHomePage() {
    homeContent.innerHTML = '';

    if (!lastStudy) {
        homeContent.innerHTML = `
            <div class="home-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <h2>Welcome to FlashDeck</h2>
                <p>Start by creating a deck and studying it. Your most recent deck will show up here.</p>
                <button class="btn btn-primary" onclick="switchPage('decks')">Browse Decks</button>
            </div>
        `;
        return;
    }

    const deck = appData.decks.find(d => d.id === lastStudy.deckId);
    if (!deck) {
        homeContent.innerHTML = `
            <div class="home-empty">
                <h2>Welcome back</h2>
                <p>Your last deck was removed. Pick a new one to study.</p>
                <button class="btn btn-primary" onclick="switchPage('decks')">Browse Decks</button>
            </div>
        `;
        return;
    }

    const modeLabels = { study: 'Flashcards', review: 'Learn', match: 'Match', write: 'Write', survival: 'Survival', mc: 'Multiple Choice' };
    const lastMode = lastStudy.mode || 'study';
    const icon = deck.icon || '';
    const cover = deck.cover || '';

    homeContent.innerHTML = `
        <div class="home-deck-info">
            ${icon ? `<span class="home-hero-icon">${icon}</span>` : ''}
            <h1 class="home-hero-title">${deck.name}</h1>
            <p class="home-hero-meta">${deck.cards.length} cards</p>
        </div>
    `;

    // Select this deck and show the interactive flashcard
    if (appData.currentDeck !== deck.id) {
        appData.currentDeck = deck.id;
        appData.currentCardIndex = 0;
        saveData();
    }
    updateStudyView();
    flashcard.classList.remove('flipped');
    studyView.classList.add('active');
}

function renderFoldersPage() {
    foldersGrid.innerHTML = '';

    appData.folders.forEach(folder => {
        const folderDecks = appData.decks.filter(d => d.folderId === folder.id);
        const card = document.createElement('div');
        const isSelected = selectedIds.has(folder.id);
        card.className = 'grid-card' + (selectMode === 'folders' ? ' selectable' : '') + (isSelected ? ' selected' : '');
        card.dataset.selectId = folder.id;
        let coverHTML = folder.cover ? `<div class="grid-card-cover" style="background-image:url(${folder.cover});background-position:${folder.coverPos || 'center'}"></div>` : '';
        let iconHTML = folder.icon
            ? `<span class="grid-card-emoji">${folder.icon}</span>`
            : `<svg class="grid-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
        const selectCheckHTML = selectMode === 'folders' ? `<div class="select-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : '';
        card.innerHTML = `
            ${selectCheckHTML}
            ${coverHTML}
            <div class="grid-card-body">
                ${iconHTML}
                <span class="grid-card-name">${folder.name}</span>
                <span class="grid-card-meta">${folderDecks.length} deck${folderDecks.length !== 1 ? 's' : ''}</span>
            </div>
            <button class="grid-card-edit-btn" title="Edit folder">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
        `;
        card.querySelector('.grid-card-edit-btn').onclick = (e) => {
            e.stopPropagation();
            showFolderContextMenu(e, folder);
        };
        card.onclick = () => {
            if (selectMode === 'folders') { toggleSelect(folder.id); return; }
            viewingFolderId = folder.id;
            decksPageTitle.textContent = folder.name;
            switchPage('decks');
            renderDecksPage();
        };
        card.oncontextmenu = (e) => {
            e.preventDefault();
            showFolderContextMenu(e, folder);
        };
        foldersGrid.appendChild(card);
    });

    // Add folder card
    const addCard = document.createElement('div');
    addCard.className = 'grid-card add-card';
    addCard.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Folder
    `;
    addCard.onclick = () => {
        folderModal.classList.add('active');
        folderNameInput.value = '';
        folderNameInput.focus();
    };
    foldersGrid.appendChild(addCard);
}

function sortDecksArray(decksArr) {
    const sortEl = document.getElementById('deck-sort');
    const sortBy = sortEl ? sortEl.value : 'name';
    const sorted = [...decksArr];
    sorted.sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'created': return (parseInt((b.id||'').replace('deck_',''))||0) - (parseInt((a.id||'').replace('deck_',''))||0);
            case 'created-asc': return (parseInt((a.id||'').replace('deck_',''))||0) - (parseInt((b.id||'').replace('deck_',''))||0);
            case 'cards': return (b.cards?b.cards.length:0) - (a.cards?a.cards.length:0);
            case 'cards-asc': return (a.cards?a.cards.length:0) - (b.cards?b.cards.length:0);
            case 'studied': return (b.lastStudied||0) - (a.lastStudied||0);
            default: return 0;
        }
    });
    return sorted;
}

function renderDecksPage() {
    deckList.innerHTML = '';
    const query = (deckSearch.value || '').toLowerCase().trim();

    let decksToShow;
    if (viewingFolderId) {
        decksToShow = appData.decks.filter(d => d.folderId === viewingFolderId);
        if (query) decksToShow = decksToShow.filter(d => d.name.toLowerCase().includes(query));
    } else {
        decksToShow = query
            ? appData.decks.filter(d => d.name.toLowerCase().includes(query))
            : appData.decks;
    }

    decksToShow = sortDecksArray(decksToShow);

    decksToShow.forEach(d => {
        const card = document.createElement('div');
        const isSelected = selectedIds.has(d.id);
        card.className = 'grid-card' + (d.id === appData.currentDeck ? ' active-deck' : '') + (selectMode === 'decks' ? ' selectable' : '') + (isSelected ? ' selected' : '');
        card.dataset.selectId = d.id;
        const folderName = d.folderId ? (appData.folders.find(f => f.id === d.folderId)?.name || '') : '';
        let coverHTML = d.cover ? `<div class="grid-card-cover" style="background-image:url(${d.cover});background-position:${d.coverPos || 'center'}"></div>` : '';
        let iconHTML = d.icon
            ? `<span class="grid-card-emoji">${d.icon}</span>`
            : `<svg class="grid-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg>`;
        const selectCheckHTML = selectMode === 'decks' ? `<div class="select-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : '';
        card.innerHTML = `
            ${selectCheckHTML}
            ${coverHTML}
            <div class="grid-card-body">
                ${iconHTML}
                <span class="grid-card-name">${d.color ? `<span class="deck-color-dot" style="background:${d.color}"></span>` : ''}${d.name}</span>
                <span class="grid-card-meta">${d.cards.length} card${d.cards.length !== 1 ? 's' : ''}${folderName ? ' \u00b7 ' + folderName : ''}</span>
            </div>
            <button class="grid-card-edit-btn" title="Edit deck">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
        `;
        card.querySelector('.grid-card-edit-btn').onclick = (e) => {
            e.stopPropagation();
            showDeckContextMenu(e, d, appData.folders);
        };
        card.onclick = () => {
            if (selectMode === 'decks') { toggleSelect(d.id); return; }
            switchDeck(d.id);
            switchPage('exercises');
        };
        card.oncontextmenu = (e) => {
            e.preventDefault();
            showDeckContextMenu(e, d, appData.folders);
        };
        deckList.appendChild(card);
    });

    // Add deck card
    const addCard = document.createElement('div');
    addCard.className = 'grid-card add-card';
    addCard.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Deck
    `;
    addCard.onclick = () => {
        deckModal.classList.add('active');
        deckNameInput.value = '';
        deckNameInput.focus();
    };
    deckList.appendChild(addCard);

    if (decksToShow.length === 0 && !query) {
        const empty = document.createElement('div');
        empty.style.cssText = 'grid-column:1/-1;padding:20px;color:var(--text-3);font-size:14px;text-align:center';
        empty.textContent = viewingFolderId ? 'No decks in this folder yet' : 'No decks yet';
        deckList.insertBefore(empty, deckList.firstChild);
    }
}

// View switching
const tfView = document.getElementById('tf-view');
const speedView = document.getElementById('speed-view');
const blankView = document.getElementById('blank-view');
const views = { study: studyView, review: reviewView, match: matchView, write: writeView, survival: survivalView, mc: mcView, tf: tfView, speed: speedView, blank: blankView, manage: manageView };
const pages = { home: homePage, folders: foldersPage, decks: decksPage, exercises: exercisesPage };
const pageBtns = { home: pageHomeBtn, folders: pageFoldersBtn, decks: pageDecksBtn, exercises: pageExercisesBtn };

let currentPage = 'home';
let viewingFolderId = null;
let navHistory = [];
const backBtn = document.getElementById('back-btn');
const backBtnLabel = document.getElementById('back-btn-label');

function switchPage(page, skipHistory) {
    if (!skipHistory && currentPage) {
        navHistory.push({ type: 'page', page: currentPage, folderId: viewingFolderId });
    }
    currentPage = page;

    // Hide all pages and exercise views
    Object.values(pages).forEach(p => p.classList.remove('active'));
    Object.values(views).forEach(v => v.classList.remove('active'));
    Object.values(pageBtns).forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.exercise-card').forEach(c => c.classList.remove('active'));

    // Hide deck header on pages
    deckHeader.style.display = 'none';

    // Show selected page
    if (pages[page]) pages[page].classList.add('active');
    if (pageBtns[page]) pageBtns[page].classList.add('active');

    // Render page content
    if (page === 'home') {
        navHistory = [];
        renderHomePage();
    }
    if (page === 'folders') renderFoldersPage();
    if (page === 'decks') {
        viewingFolderId = null;
        decksPageTitle.textContent = 'All Decks';
        renderDecksPage();
    }
    if (page === 'exercises') {
        const deck = getCurrentDeck();
        exercisesDeckName.textContent = deck ? deck.name : 'No deck selected';
        closeDeckPicker();
    }

    updateBackBtn();
    closeSidebar();
}

function switchMode(mode, skipHistory) {
    if (!skipHistory && currentPage) {
        navHistory.push({ type: 'page', page: currentPage, folderId: viewingFolderId });
    }
    // Hide all pages
    Object.values(pages).forEach(p => p.classList.remove('active'));
    Object.values(pageBtns).forEach(b => b.classList.remove('active'));

    // Hide all exercise views
    Object.values(views).forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.exercise-card').forEach(c => c.classList.remove('active'));

    // Show deck header + selected view
    deckHeader.style.display = '';
    if (views[mode]) views[mode].classList.add('active');

    // Highlight exercise card
    const exCard = document.querySelector(`.exercise-card[data-mode="${mode}"]`);
    if (exCard) exCard.classList.add('active');

    // Highlight exercises in sidebar
    Object.values(pageBtns).forEach(b => b.classList.remove('active'));
    pageExercisesBtn.classList.add('active');

    // Track last studied deck+mode
    if (mode !== 'manage' && appData.currentDeck) {
        saveLastStudy(appData.currentDeck, mode);
    }

    // Special actions
    if (mode === 'study') flashcard.classList.remove('flipped');
    if (mode === 'review') startReview();
    if (mode === 'manage') cancelEdit();

    updateBackBtn();
    closeSidebar();
}

function goBack() {
    if (navHistory.length === 0) return;
    const prev = navHistory.pop();
    if (prev.type === 'page') {
        if (prev.folderId) viewingFolderId = prev.folderId;
        switchPage(prev.page, true);
        if (prev.page === 'decks' && prev.folderId) {
            const folder = appData.folders.find(f => f.id === prev.folderId);
            if (folder) decksPageTitle.textContent = folder.name;
            renderDecksPage();
        }
    }
    updateBackBtn();
}

function updateBackBtn() {
    if (navHistory.length > 0) {
        backBtn.style.display = '';
    } else {
        backBtn.style.display = 'none';
    }
}

// Card Management (CRUD)
function addCard(question, answer, frontImage = '', backImage = '') {
    const deck = getCurrentDeck();
    if (!deck) return;

    const newCard = {
        id: 'card_' + Date.now(),
        question: question,
        answer: answer,
        frontImage: frontImage || '',
        backImage: backImage || '',
        starred: false,
        trackStatus: 'unseen',
        leitnerBox: 1,
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
    currentFrontImage = '';
    currentBackImage = '';
    clearCardImagePreviews();
}

function editCard(cardId, question, answer, frontImage, backImage) {
    const deck = getCurrentDeck();
    if (!deck) return;

    const card = deck.cards.find(c => c.id === cardId);
    if (card) {
        card.question = question;
        card.answer = answer;
        card.frontImage = frontImage || '';
        card.backImage = backImage || '';
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
    const cardBackup = JSON.parse(JSON.stringify(deck.cards.find(c => c.id === cardId)));
    const prevIndex = appData.currentCardIndex;
    if (!cardBackup) return;
    deck.cards = deck.cards.filter(c => c.id !== cardId);
    if (appData.currentCardIndex >= deck.cards.length) {
        appData.currentCardIndex = Math.max(0, deck.cards.length - 1);
    }
    saveData();
    updateDeckSelector();
    renderManageView();
    updateStudyView();
    updateDueCount();
    showUndoToast('Card deleted', () => {
        const d = getCurrentDeck();
        if (d) {
            d.cards.splice(prevIndex, 0, cardBackup);
            appData.currentCardIndex = prevIndex;
            saveData();
            updateDeckSelector();
            renderManageView();
            updateStudyView();
            updateDueCount();
        }
    });
}

function startEditCard(cardId) {
    const deck = getCurrentDeck();
    if (!deck) return;

    const card = deck.cards.find(c => c.id === cardId);
    if (card) {
        editingCardId = cardId;
        questionInput.value = card.question;
        answerInput.value = card.answer;
        currentFrontImage = card.frontImage || '';
        currentBackImage = card.backImage || '';

        const fp = document.getElementById('front-image-preview');
        const bp = document.getElementById('back-image-preview');
        const fpr = document.getElementById('front-drop-prompt');
        const bpr = document.getElementById('back-drop-prompt');

        if (currentFrontImage) {
            fp.innerHTML = `<img src="${currentFrontImage}" alt="Front"><button class="remove-image" onclick="removeFrontImage()">×</button>`;
            fpr.style.display = 'none';
        }
        if (currentBackImage) {
            bp.innerHTML = `<img src="${currentBackImage}" alt="Back"><button class="remove-image" onclick="removeBackImage()">×</button>`;
            bpr.style.display = 'none';
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
    currentFrontImage = '';
    currentBackImage = '';
    clearCardImagePreviews();
    formTitle.textContent = 'Add New Card';
    saveCardBtn.textContent = 'Add Card';
    cancelEditBtn.style.display = 'none';
}

function clearCardImagePreviews() {
    document.getElementById('front-image-preview').innerHTML = '';
    document.getElementById('back-image-preview').innerHTML = '';
    document.getElementById('front-drop-prompt').style.display = '';
    document.getElementById('back-drop-prompt').style.display = '';
}

function removeFrontImage() {
    currentFrontImage = '';
    document.getElementById('front-image-preview').innerHTML = '';
    document.getElementById('front-drop-prompt').style.display = '';
}

function removeBackImage() {
    currentBackImage = '';
    document.getElementById('back-image-preview').innerHTML = '';
    document.getElementById('back-drop-prompt').style.display = '';
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
function resetFlipInstant() {
    flashcard.style.transition = 'none';
    flashcard.classList.remove('flipped');
    // Force reflow then restore transition
    flashcard.offsetHeight;
    flashcard.style.transition = '';
}

function nextCard() {
    const cards = getStudyCards();
    if (cards.length === 0) return;

    resetFlipInstant();
    const nextIdx = appData.currentCardIndex + 1;
    if (nextIdx >= cards.length) {
        // Completed the deck
        appData.currentCardIndex = 0;
        saveData();
        updateStudyView();
        showCelebration();
        return;
    }
    appData.currentCardIndex = nextIdx;
    saveData();
    updateStudyView();
}

function previousCard() {
    const cards = getStudyCards();
    if (cards.length === 0) return;

    resetFlipInstant();
    appData.currentCardIndex = appData.currentCardIndex - 1;
    if (appData.currentCardIndex < 0) {
        appData.currentCardIndex = cards.length - 1;
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
    resetFlipInstant();
    saveData();
    updateStudyView();
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    if (flashcard.classList.contains('flipped')) {
        showTrackButtons();
        // Auto TTS for back side
        if (studySettings.tts) {
            const cards = getStudyCards();
            if (cards.length > 0) {
                const card = cards[appData.currentCardIndex % cards.length];
                if (card) {
                    const swapped = studySettings.frontSide === 'answer';
                    const text = swapped ? card.question : card.answer;
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = parseFloat(ttsSpeed.value);
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(utterance);
                }
            }
        }
    } else {
        hideTrackButtons();
    }
}

// Study settings
let studySettings = {
    trackProgress: true,
    starredOnly: false,
    spacedRep: false,
    frontSide: 'question',
    tts: false
};

function loadStudySettings() {
    const saved = localStorage.getItem('flashcardStudySettings');
    if (saved) studySettings = { ...studySettings, ...JSON.parse(saved) };
    applyStudySettings();
}

function saveStudySettings() {
    localStorage.setItem('flashcardStudySettings', JSON.stringify(studySettings));
}

function applyStudySettings() {
    document.getElementById('opt-track-progress').checked = studySettings.trackProgress;
    document.getElementById('opt-starred-only').checked = studySettings.starredOnly;
    document.getElementById('opt-spaced-rep').checked = studySettings.spacedRep;
    document.getElementById('opt-front-side').value = studySettings.frontSide;
    const ttsEl = document.getElementById('opt-tts');
    if (ttsEl) ttsEl.checked = studySettings.tts;
    updateStudyView();
}

function toggleStudySettings() {
    const panel = document.getElementById('study-settings');
    panel.style.display = panel.style.display === 'none' ? '' : 'none';
}

// Fullscreen
function toggleFullscreen() {
    const existing = document.getElementById('fullscreen-overlay');
    if (existing) { exitFullscreen(); return; }

    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;

    const overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.className = 'fullscreen-overlay';
    overlay.innerHTML = `
        <button class="fullscreen-close" id="fs-close">×</button>
        <div class="flashcard-wrapper">
            <div class="card-container">
                <div id="fs-flashcard" class="flashcard">
                    <div class="card-front">
                        <div class="card-top-bar">
                            <span></span>
                            <button id="fs-star-btn" class="card-icon-btn" title="Star">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </button>
                        </div>
                        <div id="fs-q-image" class="card-image"></div>
                        <div id="fs-q-text" class="card-text"></div>
                    </div>
                    <div class="card-back">
                        <div id="fs-a-image" class="card-image"></div>
                        <div id="fs-a-text" class="card-text"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="fs-track-buttons" class="track-buttons" style="display:none">
            <button class="track-btn track-btn-no" id="fs-track-learning">Still learning</button>
            <button class="track-btn track-btn-yes" id="fs-track-know">Know it</button>
        </div>
        <div class="card-controls">
            <button class="control-btn" id="fs-prev">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="card-counter" id="fs-progress"></span>
            <button class="control-btn" id="fs-next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button class="control-btn" id="fs-shuffle" title="Shuffle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
            </button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Request browser fullscreen
    if (overlay.requestFullscreen) overlay.requestFullscreen();
    else if (overlay.webkitRequestFullscreen) overlay.webkitRequestFullscreen();

    updateFullscreenCard();

    const fsCard = document.getElementById('fs-flashcard');
    const fsTrackBtns = document.getElementById('fs-track-buttons');
    fsCard.addEventListener('click', () => {
        fsCard.classList.toggle('flipped');
        if (fsCard.classList.contains('flipped') && studySettings.trackProgress) {
            fsTrackBtns.style.display = '';
        } else {
            fsTrackBtns.style.display = 'none';
        }
    });
    document.getElementById('fs-close').addEventListener('click', exitFullscreen);
    document.getElementById('fs-prev').addEventListener('click', () => { previousCard(); updateFullscreenCard(); fsTrackBtns.style.display = 'none'; });
    document.getElementById('fs-next').addEventListener('click', () => { nextCard(); updateFullscreenCard(); fsTrackBtns.style.display = 'none'; });
    document.getElementById('fs-shuffle').addEventListener('click', () => { shuffleDeck(); updateFullscreenCard(); fsTrackBtns.style.display = 'none'; });
    document.getElementById('fs-star-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStar();
        updateFullscreenCard();
    });
    document.getElementById('fs-track-know').addEventListener('click', () => {
        markCard('know');
        updateFullscreenCard();
        fsTrackBtns.style.display = 'none';
    });
    document.getElementById('fs-track-learning').addEventListener('click', () => {
        markCard('learning');
        updateFullscreenCard();
        fsTrackBtns.style.display = 'none';
    });

    // Keyboard in fullscreen
    overlay._keyHandler = (e) => {
        if (e.key === 'Escape') exitFullscreen();
        if (e.key === ' ') {
            e.preventDefault();
            fsCard.classList.toggle('flipped');
            if (fsCard.classList.contains('flipped') && studySettings.trackProgress) fsTrackBtns.style.display = '';
            else fsTrackBtns.style.display = 'none';
        }
        if (e.key === 'ArrowRight') { nextCard(); updateFullscreenCard(); fsTrackBtns.style.display = 'none'; }
        if (e.key === 'ArrowLeft') { previousCard(); updateFullscreenCard(); fsTrackBtns.style.display = 'none'; }
    };
    document.addEventListener('keydown', overlay._keyHandler);

    // Clean up overlay if browser exits fullscreen (e.g. user presses Escape at browser level)
    overlay._fsHandler = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            const o = document.getElementById('fullscreen-overlay');
            if (o) {
                if (o._keyHandler) document.removeEventListener('keydown', o._keyHandler);
                document.removeEventListener('fullscreenchange', o._fsHandler);
                document.removeEventListener('webkitfullscreenchange', o._fsHandler);
                o.remove();
            }
        }
    };
    document.addEventListener('fullscreenchange', overlay._fsHandler);
    document.addEventListener('webkitfullscreenchange', overlay._fsHandler);
}

function updateFullscreenCard() {
    const cards = getStudyCards();
    if (cards.length === 0) return;
    if (appData.currentCardIndex >= cards.length) appData.currentCardIndex = 0;
    const card = cards[appData.currentCardIndex];
    if (!card) return;
    const fsCard = document.getElementById('fs-flashcard');
    if (!fsCard) return;
    fsCard.style.transition = 'none';
    fsCard.classList.remove('flipped');
    fsCard.offsetHeight;
    fsCard.style.transition = '';
    const swapped = studySettings.frontSide === 'answer';
    document.getElementById('fs-q-text').textContent = swapped ? card.answer : card.question;
    document.getElementById('fs-a-text').textContent = swapped ? card.question : card.answer;
    document.getElementById('fs-q-image').innerHTML = (swapped ? card.backImage : card.frontImage) ? `<img src="${swapped ? card.backImage : card.frontImage}">` : '';
    document.getElementById('fs-a-image').innerHTML = (swapped ? card.frontImage : card.backImage) ? `<img src="${swapped ? card.frontImage : card.backImage}">` : '';
    document.getElementById('fs-progress').textContent = `${appData.currentCardIndex + 1} / ${cards.length}`;
    const fsStarBtn = document.getElementById('fs-star-btn');
    if (fsStarBtn) {
        if (card.starred) fsStarBtn.classList.add('starred');
        else fsStarBtn.classList.remove('starred');
    }
}

function exitFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
        overlay.remove();
    }
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
}

// Get filtered card list for study
function getStudyCards() {
    const deck = getCurrentDeck();
    if (!deck) return [];
    let cards = deck.cards;
    if (studySettings.starredOnly) {
        cards = cards.filter(c => c.starred);
    }
    if (studySettings.spacedRep) {
        // Sort by next review time (soonest first), then by lowest ease factor
        cards = [...cards].sort((a, b) => {
            const aTime = a.nextReview || 0;
            const bTime = b.nextReview || 0;
            if (aTime !== bTime) return aTime - bTime;
            return (a.easeFactor || 2.5) - (b.easeFactor || 2.5);
        });
    }
    return cards;
}

function toggleStar() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) return;
    const cards = getStudyCards();
    if (cards.length === 0) return;
    const idx = appData.currentCardIndex % cards.length;
    const card = cards[idx];
    if (!card) return;
    card.starred = !card.starred;
    saveData();
    updateStarButton(card);
}

function updateStarButton(card) {
    const btn = document.getElementById('star-btn');
    if (!btn) return;
    if (card && card.starred) {
        btn.classList.add('starred');
    } else {
        btn.classList.remove('starred');
    }
}

// Track progress
function updateProgressTracker() {
    const tracker = document.getElementById('progress-tracker');
    const trackBtns = document.getElementById('track-buttons');
    if (!studySettings.trackProgress) {
        tracker.style.display = 'none';
        trackBtns.style.display = 'none';
        return;
    }
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) {
        tracker.style.display = 'none';
        return;
    }
    tracker.style.display = '';
    const total = deck.cards.length;
    const know = deck.cards.filter(c => c.trackStatus === 'know').length;
    const learning = deck.cards.filter(c => c.trackStatus === 'learning').length;
    const unseen = total - know - learning;

    document.getElementById('progress-bar-know').style.width = (know / total * 100) + '%';
    document.getElementById('progress-bar-learning').style.width = (learning / total * 100) + '%';
    document.getElementById('progress-know-count').textContent = know;
    document.getElementById('progress-learning-count').textContent = learning;
    document.getElementById('progress-unseen-count').textContent = unseen;
}

function updateLeitnerDisplay() {
    const deck = getCurrentDeck();
    const display = document.getElementById('leitner-display');
    if (!display) return;
    if (!deck || deck.cards.length === 0) {
        for (let i = 1; i <= 5; i++) {
            document.getElementById('leitner-' + i).textContent = '0';
        }
        return;
    }
    for (let i = 1; i <= 5; i++) {
        const count = deck.cards.filter(c => (c.leitnerBox || 1) === i).length;
        document.getElementById('leitner-' + i).textContent = count;
    }
    display.querySelectorAll('.leitner-box').forEach(box => {
        const boxNum = parseInt(box.dataset.box);
        if (leitnerFilter === boxNum) {
            box.classList.add('active');
        } else {
            box.classList.remove('active');
        }
    });
}


function showTrackButtons() {
    if (!studySettings.trackProgress) return;
    document.getElementById('track-buttons').style.display = '';
}

function hideTrackButtons() {
    document.getElementById('track-buttons').style.display = 'none';
}

function markCard(status) {
    const cards = getStudyCards();
    if (cards.length === 0) return;
    const card = cards[appData.currentCardIndex % cards.length];
    if (card) {
        card.trackStatus = status;

        // Update Leitner box
        if (status === 'know') {
            card.leitnerBox = Math.min(5, (card.leitnerBox || 1) + 1);
        } else {
            card.leitnerBox = 1;
        }
        saveData();
        updateProgressTracker();
    
        // If spaced rep is on, update ease factor
        if (studySettings.spacedRep) {
            if (status === 'know') {
                card.easeFactor = Math.min(3.0, (card.easeFactor || 2.5) + 0.15);
                card.repetitions = (card.repetitions || 0) + 1;
                const interval = card.repetitions <= 1 ? 1 : card.repetitions === 2 ? 6 : Math.round((card.interval || 1) * card.easeFactor);
                card.interval = interval;
                card.nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
            } else {
                card.easeFactor = Math.max(1.3, (card.easeFactor || 2.5) - 0.2);
                card.repetitions = 0;
                card.interval = 0;
                card.nextReview = Date.now();
            }
            saveData();
        }
    }
    hideTrackButtons();

    // Check if all cards are known
    if (studySettings.trackProgress) {
        const deck = getCurrentDeck();
        if (deck && deck.cards.length > 0 && deck.cards.every(c => c.trackStatus === 'know')) {
            showCelebration();
            return;
        }
    }
    nextCard();
}

// Celebration
function showCelebration() {
    const existing = document.getElementById('celebration-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'celebration-overlay';
    overlay.className = 'celebration-overlay';

    const deck = getCurrentDeck();
    const deckName = deck ? deck.name : 'the deck';
    const know = deck ? deck.cards.filter(c => c.trackStatus === 'know').length : 0;
    const total = deck ? deck.cards.length : 0;

    overlay.innerHTML = `
        <canvas id="confetti-canvas" class="confetti-canvas"></canvas>
        <div class="celebration-content">
            <div class="celebration-emoji">🎉</div>
            <h2 class="celebration-title">Deck Complete!</h2>
            <p class="celebration-subtitle">You finished all ${total} cards in ${deckName}</p>
            ${studySettings.trackProgress ? `<p class="celebration-stats">${know} / ${total} marked as known</p>` : ''}
            <div class="celebration-actions">
                <button class="btn btn-primary" id="celebration-again">Study Again</button>
                <button class="btn btn-outline" id="celebration-home">Go Home</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Confetti
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff6b6b', '#ffd43b', '#51cf66', '#4255ff', '#cc5de8', '#ff922b', '#22b8cf'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 2,
            rot: Math.random() * 360,
            rv: (Math.random() - 0.5) * 8
        });
    }

    let animId;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            p.rot += p.rv;
            p.vy += 0.05;
            if (p.y < canvas.height + 20) alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (alive) animId = requestAnimationFrame(animateConfetti);
    }
    animateConfetti();

    document.getElementById('celebration-again').addEventListener('click', () => {
        cancelAnimationFrame(animId);
        overlay.remove();
        appData.currentCardIndex = 0;
        if (studySettings.trackProgress && deck) {
            deck.cards.forEach(c => c.trackStatus = 'unseen');
        }
        resetFlipInstant();
        saveData();
        updateStudyView();
    });

    document.getElementById('celebration-home').addEventListener('click', () => {
        cancelAnimationFrame(animId);
        overlay.remove();
        switchPage('home');
    });
}

// Auto TTS
function autoPlayTTS() {
    if (!studySettings.tts) return;
    const cards = getStudyCards();
    if (cards.length === 0) return;
    const card = cards[appData.currentCardIndex % cards.length];
    if (!card) return;
    const swapped = studySettings.frontSide === 'answer';
    const text = swapped ? card.answer : card.question;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(ttsSpeed.value);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
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
        updateStarButton(null);
        renderStudyCardList([]);
        return;
    }

    const cards = getStudyCards();

    if (cards.length === 0) {
        questionText.textContent = studySettings.starredOnly ? 'No starred cards — star some cards first' : 'No cards yet — go to Manage to add some';
        answerText.textContent = '';
        questionImage.innerHTML = '';
        answerImage.innerHTML = '';
        progressText.textContent = '0 / 0';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        shuffleBtn.disabled = true;
        updateStarButton(null);
            renderStudyCardList([]);
        return;
    }

    if (appData.currentCardIndex >= cards.length) {
        appData.currentCardIndex = 0;
    }
    const currentCard = cards[appData.currentCardIndex];
    const swapped = studySettings.frontSide === 'answer';
    questionText.textContent = swapped ? currentCard.answer : currentCard.question;
    answerText.textContent = swapped ? currentCard.question : currentCard.answer;
    questionImage.innerHTML = (swapped ? currentCard.backImage : currentCard.frontImage) ? `<img src="${swapped ? currentCard.backImage : currentCard.frontImage}">` : '';
    answerImage.innerHTML = (swapped ? currentCard.frontImage : currentCard.backImage) ? `<img src="${swapped ? currentCard.frontImage : currentCard.backImage}">` : '';

    progressText.textContent = `${appData.currentCardIndex + 1} / ${cards.length}`;
    updateStarButton(currentCard);
    updateProgressTracker();
    hideTrackButtons();
    autoPlayTTS();
    renderStudyCardList(cards);

    prevBtn.disabled = false;
    nextBtn.disabled = false;
    shuffleBtn.disabled = false;
}

let cardListOpen = false;

function renderStudyCardList(cards) {
    const el = document.getElementById('study-card-list');
    if (!el) return;
    if (!cards || cards.length === 0) { el.innerHTML = ''; return; }
    let html = `<div class="study-card-list-header" onclick="toggleCardList()">
        <span>All cards in deck (${cards.length})</span>
        <span class="study-list-toggle">${cardListOpen ? '▲ Hide' : '▼ Show'}</span>
    </div>`;
    if (cardListOpen) {
        html += '<div class="study-card-list-items">';
        cards.forEach((c, i) => {
            const isCurrent = i === appData.currentCardIndex;
            const starClass = c.starred ? 'starred' : '';
            html += `<div class="study-list-item${isCurrent ? ' current' : ''}" onclick="jumpToCard(${i})">
                <span class="study-list-num">${i + 1}</span>
                <span class="study-list-term">${c.question}</span>
                <span class="study-list-def">${c.answer}</span>
                <span class="study-list-star ${starClass}">${c.starred ? '★' : '☆'}</span>
            </div>`;
        });
        html += '</div>';
    }
    el.innerHTML = html;
}

function toggleCardList() {
    cardListOpen = !cardListOpen;
    updateStudyView();
}

function jumpToCard(index) {
    appData.currentCardIndex = index;
    const el = document.getElementById('flashcard');
    if (el) { el.style.transition = 'none'; el.classList.remove('flipped'); el.offsetHeight; el.style.transition = ''; }
    saveData();
    updateStudyView();
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

        const frontImgHTML = card.frontImage ? `<img src="${card.frontImage}" alt="Front" style="max-height:40px;border-radius:4px;margin-right:4px">` : '';
        const backImgHTML = card.backImage ? `<img src="${card.backImage}" alt="Back" style="max-height:40px;border-radius:4px">` : '';
        const imageHTML = (frontImgHTML || backImgHTML) ? `<div class="card-item-image">${frontImgHTML}${backImgHTML}</div>` : '';

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
function setCardSideImage(file, side) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        const preview = document.getElementById(side + '-image-preview');
        const prompt = document.getElementById(side + '-drop-prompt');
        if (side === 'front') currentFrontImage = dataUrl;
        else currentBackImage = dataUrl;
        preview.innerHTML = `<img src="${dataUrl}" alt="${side}"><button class="remove-image" onclick="remove${side === 'front' ? 'Front' : 'Back'}Image()">×</button>`;
        prompt.style.display = 'none';
    };
    reader.readAsDataURL(file);
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
            currentFrontImage = e.target.result;
            const fp = document.getElementById('front-image-preview');
            const fpr = document.getElementById('front-drop-prompt');
            fp.innerHTML = `<img src="${currentFrontImage}" alt="Front"><button class="remove-image" onclick="removeFrontImage()">×</button>`;
            fpr.style.display = 'none';
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

    reviewQuestionImage.innerHTML = card.frontImage ? `<img src="${card.frontImage}" alt="Front">` : '';
    reviewAnswerImage.innerHTML = card.backImage ? `<img src="${card.backImage}" alt="Back">` : '';

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

// Recent study tracking
function loadLastStudy() {
    const saved = localStorage.getItem('flashcardLastStudy');
    if (saved) lastStudy = JSON.parse(saved);
}

function saveLastStudy(deckId, mode) {
    lastStudy = { deckId, mode, timestamp: Date.now() };
    localStorage.setItem('flashcardLastStudy', JSON.stringify(lastStudy));

    // Also store lastStudied on the deck itself for sorting
    const deck = appData.decks.find(d => d.id === deckId);
    if (deck) {
        deck.lastStudied = Date.now();
        saveData();
    }
}

// Undo system
let undoState = null;
let undoTimer = null;

function showUndoToast(message, undoFn) {
    undoState = undoFn;
    if (undoTimer) clearTimeout(undoTimer);

    const toast = document.getElementById('undo-toast');
    document.getElementById('undo-toast-text').textContent = message;
    toast.style.display = '';

    undoTimer = setTimeout(() => {
        toast.style.display = 'none';
        undoState = null;
    }, 5000);
}

function performUndo() {
    if (undoState) {
        undoState();
        undoState = null;
    }
    if (undoTimer) clearTimeout(undoTimer);
    document.getElementById('undo-toast').style.display = 'none';
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
    if (!deck) { alert('No deck selected!'); return; }
    exportSingleDeck(deck);
}

function exportSingleDeck(deck) {
    if (!deck || deck.cards.length === 0) {
        alert('No cards to export!');
        return;
    }
    const data = {
        type: 'flashdeck-deck',
        name: deck.name,
        icon: deck.icon || '',
        cover: deck.cover || '',
        coverPos: deck.coverPos || 'center',
        cards: deck.cards.map(c => ({
            question: c.question,
            answer: c.answer,
            frontImage: c.frontImage || '',
            backImage: c.backImage || '',
            starred: c.starred || false
        }))
    };
    downloadJSON(data, `${deck.name}.json`);
}

function exportFolder(folder) {
    const folderDecks = appData.decks.filter(d => d.folderId === folder.id);
    if (folderDecks.length === 0) {
        alert('No decks in this folder to export!');
        return;
    }
    const data = {
        type: 'flashdeck-folder',
        name: folder.name,
        icon: folder.icon || '',
        cover: folder.cover || '',
        coverPos: folder.coverPos || 'center',
        decks: folderDecks.map(deck => ({
            name: deck.name,
            icon: deck.icon || '',
            cover: deck.cover || '',
            coverPos: deck.coverPos || 'center',
            cards: deck.cards.map(c => ({
                question: c.question,
                answer: c.answer,
                frontImage: c.frontImage || '',
                backImage: c.backImage || '',
                starred: c.starred || false
            }))
        }))
    };
    downloadJSON(data, `${folder.name}.json`);
}

function importFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.type === 'flashdeck-folder') {
                // Import folder with all its decks
                const now = Date.now();
                const folder = {
                    id: 'folder_' + now,
                    name: data.name || 'Imported Folder',
                    icon: data.icon || '',
                    cover: data.cover || '',
                    coverPos: data.coverPos || 'center'
                };
                appData.folders.push(folder);

                (data.decks || []).forEach((d, i) => {
                    const deck = {
                        id: 'deck_' + (now + i + 1),
                        name: d.name || 'Imported Deck',
                        folderId: folder.id,
                        icon: d.icon || '',
                        cover: d.cover || '',
                        coverPos: d.coverPos || 'center',
                        cards: (d.cards || []).map((c, j) => ({
                            id: 'card_' + (now + i * 1000 + j),
                            question: c.question,
                            answer: c.answer,
                            frontImage: c.frontImage || '',
                            backImage: c.backImage || '',
                            starred: c.starred || false,
                            trackStatus: 'unseen',
                            easeFactor: 2.5,
                            interval: 0,
                            repetitions: 0,
                            nextReview: Date.now(),
                            lastReviewed: null
                        }))
                    };
                    appData.decks.push(deck);
                });

                saveData();
                alert(`Imported folder "${folder.name}" with ${data.decks.length} deck(s).`);
                if (currentPage === 'folders') renderFoldersPage();
                else switchPage('folders');

            } else if (data.type === 'flashdeck-deck') {
                // Import single deck
                const now = Date.now();
                const deck = {
                    id: 'deck_' + now,
                    name: data.name || 'Imported Deck',
                    folderId: null,
                    icon: data.icon || '',
                    cover: data.cover || '',
                    coverPos: data.coverPos || 'center',
                    cards: (data.cards || []).map((c, j) => ({
                        id: 'card_' + (now + j),
                        question: c.question,
                        answer: c.answer,
                        frontImage: c.frontImage || '',
                        backImage: c.backImage || '',
                        starred: c.starred || false,
                        trackStatus: 'unseen',
                        easeFactor: 2.5,
                        interval: 0,
                        repetitions: 0,
                        nextReview: Date.now(),
                        lastReviewed: null
                    }))
                };
                appData.decks.push(deck);
                appData.currentDeck = deck.id;
                appData.currentCardIndex = 0;
                saveData();
                alert(`Imported deck "${deck.name}" with ${deck.cards.length} card(s).`);
                updateDeckSelector();
                renderManageView();
                updateStudyView();
                if (currentPage === 'decks') renderDecksPage();
                else switchPage('decks');

            } else if (data.type === 'flashdeck-backup') {
                // Import full backup
                const now = Date.now();
                let deckCount = 0, cardCount = 0;

                function importDeckData(d, folderId, offset) {
                    const deck = {
                        id: 'deck_' + (now + offset),
                        name: d.name || 'Imported Deck',
                        folderId: folderId,
                        icon: d.icon || '', cover: d.cover || '', coverPos: d.coverPos || 'center',
                        cards: (d.cards || []).map((c, j) => ({
                            id: 'card_' + (now + offset * 1000 + j),
                            question: c.question, answer: c.answer,
                            frontImage: c.frontImage || '', backImage: c.backImage || '',
                            starred: c.starred || false, trackStatus: c.trackStatus || 'unseen',
                            easeFactor: c.easeFactor || 2.5, interval: c.interval || 0,
                            repetitions: c.repetitions || 0, nextReview: c.nextReview || Date.now(),
                            lastReviewed: null
                        }))
                    };
                    appData.decks.push(deck);
                    deckCount++;
                    cardCount += deck.cards.length;
                    return deck;
                }

                let offset = 1;
                (data.folders || []).forEach(f => {
                    const folder = {
                        id: 'folder_' + (now + offset),
                        name: f.name || 'Imported Folder',
                        icon: f.icon || '', cover: f.cover || '', coverPos: f.coverPos || 'center'
                    };
                    appData.folders.push(folder);
                    offset++;
                    (f.decks || []).forEach(d => {
                        importDeckData(d, folder.id, offset);
                        offset++;
                    });
                });
                (data.loosDecks || []).forEach(d => {
                    importDeckData(d, null, offset);
                    offset++;
                });

                saveData();
                alert(`Imported backup: ${data.folders?.length || 0} folder(s), ${deckCount} deck(s), ${cardCount} card(s).`);
                switchPage('folders');

            } else {
                alert('Unrecognized file format. Expected a FlashDeck export file.');
            }
        } catch (err) {
            alert('Could not read file: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function exportAll() {
    const data = {
        type: 'flashdeck-backup',
        exportDate: new Date().toISOString(),
        folders: appData.folders.map(f => ({
            name: f.name,
            icon: f.icon || '',
            cover: f.cover || '',
            coverPos: f.coverPos || 'center',
            decks: appData.decks.filter(d => d.folderId === f.id).map(d => ({
                name: d.name,
                icon: d.icon || '',
                cover: d.cover || '',
                coverPos: d.coverPos || 'center',
                cards: d.cards.map(c => ({
                    question: c.question, answer: c.answer,
                    frontImage: c.frontImage || '', backImage: c.backImage || '',
                    starred: c.starred || false,
                    trackStatus: c.trackStatus || 'unseen',
                    easeFactor: c.easeFactor, interval: c.interval,
                    repetitions: c.repetitions, nextReview: c.nextReview
                }))
            }))
        })),
        loosDecks: appData.decks.filter(d => !d.folderId).map(d => ({
            name: d.name,
            icon: d.icon || '',
            cover: d.cover || '',
            coverPos: d.coverPos || 'center',
            cards: d.cards.map(c => ({
                question: c.question, answer: c.answer,
                frontImage: c.frontImage || '', backImage: c.backImage || '',
                starred: c.starred || false,
                trackStatus: c.trackStatus || 'unseen',
                easeFactor: c.easeFactor, interval: c.interval,
                repetitions: c.repetitions, nextReview: c.nextReview
            }))
        }))
    };
    const totalDecks = appData.decks.length;
    const totalCards = appData.decks.reduce((s, d) => s + d.cards.length, 0);
    downloadJSON(data, `FlashDeck-Backup-${new Date().toISOString().slice(0,10)}.json`);
    alert(`Exported ${appData.folders.length} folder(s), ${totalDecks} deck(s), ${totalCards} card(s).`);
}

function processImportImages(files) {
    const preview = document.getElementById('import-images-preview');
    const prompt = document.getElementById('import-images-prompt');
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            importImageMap[file.name] = e.target.result;
            prompt.style.display = 'none';
            const wrap = document.createElement('div');
            wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;';
            wrap.innerHTML = `<img class="img-thumb" src="${e.target.result}" alt="${file.name}"><div class="img-thumb-label">${file.name}</div>`;
            preview.appendChild(wrap);
        };
        reader.readAsDataURL(file);
    });
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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

// ===== TRUE / FALSE =====
let tfState = { currentIndex: 0, score: 0, total: 0, cards: [], isCorrect: false };

function startTFMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length < 2) { alert('Need at least 2 cards!'); return; }
    tfState = { currentIndex: 0, score: 0, total: deck.cards.length, cards: [...deck.cards].sort(() => Math.random() - 0.5) };
    document.getElementById('tf-result').classList.remove('show');
    document.getElementById('tf-start-btn').textContent = 'Restart';
    showTFCard();
}

function showTFCard() {
    if (tfState.currentIndex >= tfState.cards.length) { endTFMode(); return; }
    const deck = getCurrentDeck();
    const card = tfState.cards[tfState.currentIndex];
    const showCorrect = Math.random() > 0.5;

    let definition;
    if (showCorrect) {
        definition = card.answer;
        tfState.isCorrect = true;
    } else {
        const others = deck.cards.filter(c => c.id !== card.id);
        definition = others[Math.floor(Math.random() * others.length)].answer;
        tfState.isCorrect = false;
    }

    document.getElementById('tf-term').textContent = card.question;
    document.getElementById('tf-definition').textContent = definition;
    document.getElementById('tf-buttons').style.display = '';
    document.getElementById('tf-feedback').innerHTML = '';
    document.getElementById('tf-true-btn').className = 'tf-btn tf-true';
    document.getElementById('tf-false-btn').className = 'tf-btn tf-false';
    document.getElementById('tf-true-btn').onclick = () => checkTF(true);
    document.getElementById('tf-false-btn').onclick = () => checkTF(false);
    document.getElementById('tf-progress').textContent = `${tfState.currentIndex + 1}/${tfState.total}`;
    document.getElementById('tf-score').textContent = tfState.score;
}

function checkTF(userSaidTrue) {
    const correct = userSaidTrue === tfState.isCorrect;
    const card = tfState.cards[tfState.currentIndex];
    document.getElementById('tf-true-btn').onclick = null;
    document.getElementById('tf-false-btn').onclick = null;

    if (correct) {
        tfState.score++;
        (userSaidTrue ? document.getElementById('tf-true-btn') : document.getElementById('tf-false-btn')).classList.add('correct-pick');
        document.getElementById('tf-feedback').innerHTML = '<div class="success-message">Correct!</div>';
    } else {
        (userSaidTrue ? document.getElementById('tf-true-btn') : document.getElementById('tf-false-btn')).classList.add('wrong-pick');
        document.getElementById('tf-feedback').innerHTML = `<div class="error-message">Wrong! The correct answer is: ${card.answer}</div>`;
    }
    document.getElementById('tf-score').textContent = tfState.score;
    setTimeout(() => { tfState.currentIndex++; showTFCard(); }, 1200);
}

function endTFMode() {
    const pct = Math.round((tfState.score / tfState.total) * 100);
    document.getElementById('tf-result').innerHTML = `<h2>True/False Complete!</h2><p>Score: ${tfState.score} / ${tfState.total} (${pct}%)</p>`;
    document.getElementById('tf-result').classList.add('show');
    document.getElementById('tf-term').textContent = 'Click Start to play again';
    document.getElementById('tf-definition').textContent = '';
    document.getElementById('tf-buttons').style.display = 'none';
    document.getElementById('tf-feedback').innerHTML = '';
}

// ===== SPEED ROUND =====
let speedState = { currentIndex: 0, score: 0, total: 0, cards: [], timer: null, timeLeft: 0 };
const SPEED_TIME = 8;

function startSpeedMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length < 4) { alert('Need at least 4 cards!'); return; }
    speedState = { currentIndex: 0, score: 0, total: deck.cards.length, cards: [...deck.cards].sort(() => Math.random() - 0.5), timer: null, timeLeft: SPEED_TIME };
    document.getElementById('speed-result').classList.remove('show');
    document.getElementById('speed-start-btn').textContent = 'Restart';
    showSpeedCard();
}

function showSpeedCard() {
    if (speedState.timer) clearInterval(speedState.timer);
    if (speedState.currentIndex >= speedState.cards.length) { endSpeedMode(); return; }

    const deck = getCurrentDeck();
    const card = speedState.cards[speedState.currentIndex];
    const others = deck.cards.filter(c => c.id !== card.id).sort(() => Math.random() - 0.5);
    const options = [...others.slice(0, 3).map(c => c.answer), card.answer].sort(() => Math.random() - 0.5);

    document.getElementById('speed-question').textContent = card.question;
    const optEl = document.getElementById('speed-options');
    optEl.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'mc-option';
        btn.textContent = opt;
        btn.onclick = () => checkSpeedAnswer(btn, opt, card.answer);
        optEl.appendChild(btn);
    });
    document.getElementById('speed-progress').textContent = `${speedState.currentIndex + 1}/${speedState.total}`;
    document.getElementById('speed-score').textContent = speedState.score;

    // Timer
    speedState.timeLeft = SPEED_TIME;
    updateSpeedTimer();
    speedState.timer = setInterval(() => {
        speedState.timeLeft -= 0.1;
        updateSpeedTimer();
        if (speedState.timeLeft <= 0) {
            clearInterval(speedState.timer);
            // Time's up - show correct answer
            optEl.querySelectorAll('.mc-option').forEach(b => {
                b.onclick = null;
                if (b.textContent === card.answer) b.classList.add('correct');
            });
            setTimeout(() => { speedState.currentIndex++; showSpeedCard(); }, 800);
        }
    }, 100);
}

function updateSpeedTimer() {
    const t = Math.max(0, speedState.timeLeft);
    document.getElementById('speed-timer').textContent = t.toFixed(1);
    const fill = document.getElementById('speed-timer-fill');
    fill.style.width = (t / SPEED_TIME * 100) + '%';
    fill.className = 'speed-timer-fill' + (t < 3 ? ' danger' : t < 5 ? ' warning' : '');
}

function checkSpeedAnswer(btn, selected, correct) {
    clearInterval(speedState.timer);
    document.getElementById('speed-options').querySelectorAll('.mc-option').forEach(b => {
        b.onclick = null;
        if (b.textContent === correct) b.classList.add('correct');
        if (b.textContent === selected && selected !== correct) b.classList.add('incorrect');
    });
    if (selected === correct) speedState.score++;
    document.getElementById('speed-score').textContent = speedState.score;
    setTimeout(() => { speedState.currentIndex++; showSpeedCard(); }, 800);
}

function endSpeedMode() {
    if (speedState.timer) clearInterval(speedState.timer);
    const pct = Math.round((speedState.score / speedState.total) * 100);
    document.getElementById('speed-result').innerHTML = `<h2>Speed Round Complete!</h2><p>Score: ${speedState.score} / ${speedState.total} (${pct}%)</p>`;
    document.getElementById('speed-result').classList.add('show');
    document.getElementById('speed-question').textContent = 'Click Start to play again';
    document.getElementById('speed-options').innerHTML = '';
    document.getElementById('speed-timer-fill').style.width = '0%';
}

// ===== FILL IN THE BLANK =====
let blankState = { currentIndex: 0, score: 0, total: 0, cards: [], missingWord: '', fullAnswer: '' };

function startBlankMode() {
    const deck = getCurrentDeck();
    if (!deck || deck.cards.length === 0) { alert('No cards in this deck!'); return; }
    blankState = { currentIndex: 0, score: 0, total: deck.cards.length, cards: [...deck.cards].sort(() => Math.random() - 0.5) };
    document.getElementById('blank-result').classList.remove('show');
    document.getElementById('blank-start-btn').textContent = 'Restart';
    showBlankCard();
}

function showBlankCard() {
    if (blankState.currentIndex >= blankState.cards.length) { endBlankMode(); return; }
    const card = blankState.cards[blankState.currentIndex];

    // Pick a word to blank out from the answer
    const words = card.answer.split(/\s+/).filter(w => w.length > 2);
    if (words.length === 0) {
        blankState.missingWord = card.answer;
        blankState.fullAnswer = card.answer;
        document.getElementById('blank-display').innerHTML = '<span class="blank-slot">&nbsp;</span>';
    } else {
        const pick = words[Math.floor(Math.random() * words.length)];
        blankState.missingWord = pick.replace(/[^a-zA-Z0-9\u00C0-\u024F\uAC00-\uD7AF]/g, '');
        blankState.fullAnswer = card.answer;
        const blanked = card.answer.replace(pick, '<span class="blank-slot">&nbsp;</span>');
        document.getElementById('blank-display').innerHTML = blanked;
    }

    document.getElementById('blank-clue').textContent = card.question;
    document.getElementById('blank-input').value = '';
    document.getElementById('blank-input').disabled = false;
    document.getElementById('blank-check-btn').disabled = false;
    document.getElementById('blank-feedback').innerHTML = '';
    document.getElementById('blank-input').focus();
    document.getElementById('blank-progress').textContent = `${blankState.currentIndex + 1}/${blankState.total}`;
    document.getElementById('blank-score').textContent = blankState.score;
}

function checkBlankAnswer() {
    const input = document.getElementById('blank-input').value.trim();
    if (!input) return;
    document.getElementById('blank-input').disabled = true;
    document.getElementById('blank-check-btn').disabled = true;

    const correct = input.toLowerCase() === blankState.missingWord.toLowerCase();
    if (correct) {
        blankState.score++;
        document.getElementById('blank-feedback').innerHTML = '<div class="success-message">Correct!</div>';
    } else {
        document.getElementById('blank-feedback').innerHTML = `<div class="error-message">Wrong! The word was: <strong>${blankState.missingWord}</strong></div>`;
    }
    document.getElementById('blank-score').textContent = blankState.score;
    setTimeout(() => { blankState.currentIndex++; showBlankCard(); }, 1500);
}

function endBlankMode() {
    const pct = Math.round((blankState.score / blankState.total) * 100);
    document.getElementById('blank-result').innerHTML = `<h2>Fill in the Blank Complete!</h2><p>Score: ${blankState.score} / ${blankState.total} (${pct}%)</p>`;
    document.getElementById('blank-result').classList.add('show');
    document.getElementById('blank-clue').textContent = 'Click Start to play again';
    document.getElementById('blank-display').innerHTML = '';
    document.getElementById('blank-input').disabled = true;
    document.getElementById('blank-check-btn').disabled = true;
    document.getElementById('blank-feedback').innerHTML = '';
}

// Import Handling
function importFlashcards() {
    const targetVal = document.getElementById('import-deck-target').value;
    let deck;
    if (targetVal === '__new__') {
        const name = prompt('New deck name:');
        if (!name || !name.trim()) return;
        createDeck(name.trim());
        deck = getCurrentDeck();
    } else {
        deck = appData.decks.find(d => d.id === targetVal);
        if (deck) {
            appData.currentDeck = deck.id;
            saveData();
        }
    }
    if (!deck) {
        importErrors.innerHTML = '<div class="error-message">No deck selected.</div>';
        return;
    }

    const text = importInput.value;
    if (!text.trim()) {
        importErrors.innerHTML = '<div class="error-message">Please enter flashcards to import.</div>';
        return;
    }

    const format = document.getElementById('import-format').value;
    const errors = [];
    const validCards = [];

    if (format === 'multiline' || (format === 'auto' && text.includes('\n---\n'))) {
        const blocks = text.split(/\n\s*\n/).filter(b => b.trim());
        blocks.forEach((block, i) => {
            const parts = block.split(/\n---\n/);
            let front, back, img = '';
            if (parts.length >= 2) {
                front = parts[0].trim();
                back = parts.slice(1).join('\n---\n').trim();
            } else {
                const nl = block.indexOf('\n');
                if (nl > 0) { front = block.substring(0, nl).trim(); back = block.substring(nl + 1).trim(); }
                else { errors.push(`Block ${i + 1}: No separator found`); return; }
            }
            // Check for img: line
            const imgMatch = back.match(/\nimg:\s*(.+)$/i);
            if (imgMatch) { img = imgMatch[1].trim(); back = back.replace(/\nimg:\s*.+$/i, '').trim(); }
            if (front && back) validCards.push({ front, back, img });
            else errors.push(`Block ${i + 1}: Empty front or back`);
        });
    } else {
        const lines = text.split('\n');
        let lineNumber = 0;

        for (const line of lines) {
            lineNumber++;
            if (!line.trim()) continue;

            let parts = null, front = null, back = null, img = '';

            if (format === 'tab' || (format === 'auto' && line.includes('\t'))) {
                parts = line.split('\t');
            } else if (format === 'pipe' || (format === 'auto' && line.includes('|'))) {
                parts = line.split('|');
            } else if (format === 'semicolon' || (format === 'auto' && line.includes(';'))) {
                parts = line.split(';');
            } else if (format === '4space' || format === 'auto') {
                const m = line.match(/^(.+?)    (.+)$/);
                if (m) parts = [m[1], m[2]];
            }

            if (parts && parts.length >= 2) {
                front = parts[0].trim();
                back = parts[1].trim();
                // 3rd field = image URL
                if (parts.length >= 3) {
                    const maybeImg = parts[2].trim();
                    if (maybeImg.startsWith('http') || maybeImg.startsWith('data:')) img = maybeImg;
                    else back = parts.slice(1).join(parts.includes('\t') ? '\t' : '|').trim();
                }
                if (front && back) { validCards.push({ front, back, img }); continue; }
            }

            errors.push(`Line ${lineNumber}: Could not parse — check separator`);
        }
    }

    // Match dropped images to cards by filename
    const imageMap = importImageMap || {};
    validCards.forEach(card => {
        if (!card.img) {
            const frontLower = card.front.toLowerCase().replace(/[^a-z0-9]/g, '');
            for (const [name, dataUrl] of Object.entries(imageMap)) {
                const nameLower = name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]/g, '');
                if (nameLower === frontLower || frontLower.includes(nameLower) || nameLower.includes(frontLower)) {
                    card.img = dataUrl;
                    break;
                }
            }
        }
    });

    importErrors.innerHTML = '';

    if (errors.length > 0) {
        errors.forEach(error => {
            importErrors.innerHTML += `<div class="error-message">${error}</div>`;
        });
    }

    if (validCards.length > 0) {
        validCards.forEach(card => {
            addCard(card.front, card.back, card.img || '', card.img || '');
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
    // Undo toast
    document.getElementById('undo-toast-btn').addEventListener('click', performUndo);

    // Theme Toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Mobile sidebar
    mobileMenuBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Global search
    document.getElementById('global-search-btn').addEventListener('click', () => { openSearch(); closeSidebar(); });
    document.getElementById('mobile-search-btn').addEventListener('click', openSearch);
    document.getElementById('global-search-input').addEventListener('input', (e) => performSearch(e.target.value));
    document.getElementById('global-search-input').addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });
    document.getElementById('search-modal').addEventListener('click', (e) => {
        if (e.target.id === 'search-modal') closeSearch();
    });
    // Ctrl+K / Cmd+K shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    // Back button
    backBtn.addEventListener('click', goBack);

    // Page nav
    pageHomeBtn.addEventListener('click', () => switchPage('home'));
    pageFoldersBtn.addEventListener('click', () => switchPage('folders'));
    pageDecksBtn.addEventListener('click', () => { viewingFolderId = null; switchPage('decks'); });
    pageExercisesBtn.addEventListener('click', () => switchPage('exercises'));
    deckPickerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDeckPicker(); });

    // Exercise cards
    document.getElementById('exercises-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.exercise-card');
        if (!card) return;
        const mode = card.dataset.mode;
        if (mode) {
            const deck = getCurrentDeck();
            if (!deck) { alert('Please select a deck first!'); return; }
            switchMode(mode);
        }
    });

    manageModeBtn.addEventListener('click', () => switchMode('manage'));
    importBtn.addEventListener('click', () => {
        importModal.classList.add('active');
        importInput.value = '';
        importErrors.innerHTML = '';
        importImageMap = {};
        // Populate deck target selector
        const targetSel = document.getElementById('import-deck-target');
        targetSel.innerHTML = '<option value="__new__">+ Create new deck</option>' +
            appData.decks.map(d => `<option value="${d.id}"${d.id === appData.currentDeck ? ' selected' : ''}>${d.name}</option>`).join('');
        importInput.focus();
        closeSidebar();
    });

    // Track progress buttons
    document.getElementById('track-know').addEventListener('click', () => markCard('know'));
    document.getElementById('track-still-learning').addEventListener('click', () => markCard('learning'));

    // Star
    document.getElementById('star-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStar();
    });

    // Fullscreen
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

    // Study settings
    document.getElementById('study-settings-btn').addEventListener('click', () => {
        // If not on study view, navigate to home first to show settings there
        if (!studyView.classList.contains('active') && !homePage.classList.contains('active')) {
            switchPage('home');
        }
        toggleStudySettings();
        closeSidebar();
    });
    document.getElementById('opt-track-progress').addEventListener('change', (e) => {
        studySettings.trackProgress = e.target.checked;
        saveStudySettings();
        updateProgressTracker();
        hideTrackButtons();
    });
    document.getElementById('opt-starred-only').addEventListener('change', (e) => {
        studySettings.starredOnly = e.target.checked;
        appData.currentCardIndex = 0;
        saveStudySettings();
        updateStudyView();
    });
    document.getElementById('opt-spaced-rep').addEventListener('change', (e) => {
        studySettings.spacedRep = e.target.checked;
        appData.currentCardIndex = 0;
        saveStudySettings();
        updateStudyView();
    });
    document.getElementById('opt-front-side').addEventListener('change', (e) => {
        studySettings.frontSide = e.target.value;
        saveStudySettings();
        updateStudyView();
    });
    document.getElementById('opt-restart').addEventListener('click', () => {
        const deck = getCurrentDeck();
        if (deck) {
            deck.cards.forEach(c => {
                c.trackStatus = 'unseen';
                c.easeFactor = 2.5;
                c.interval = 0;
                c.repetitions = 0;
                c.nextReview = Date.now();
            });
        }
        appData.currentCardIndex = 0;
        resetFlipInstant();
        saveData();
        updateStudyView();
        document.getElementById('study-settings').style.display = 'none';
    });

    // Keyboard shortcuts for study view
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('fullscreen-overlay')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        if (!studyView.classList.contains('active') && !homePage.classList.contains('active')) return;
        if (e.key === ' ') { e.preventDefault(); flipCard(); }
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') previousCard();
        if (e.key.toLowerCase() === 's') shuffleDeck();
        if (e.key.toLowerCase() === 'f') toggleFullscreen();
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

    // Folder modal
    newFolderBtn.addEventListener('click', () => {
        folderModal.classList.add('active');
        folderNameInput.value = '';
        folderNameInput.focus();
    });

    createFolderBtn.addEventListener('click', () => {
        const name = folderNameInput.value.trim();
        if (name) {
            createFolder(name);
            folderModal.classList.remove('active');
        }
    });

    cancelFolderBtn.addEventListener('click', () => {
        folderModal.classList.remove('active');
    });

    folderNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createFolderBtn.click();
    });

    // Card image drop zones (front & back)
    ['front', 'back'].forEach(side => {
        const zone = document.getElementById(side + '-drop-zone');
        const input = document.getElementById(side + '-image-input');
        zone.addEventListener('click', (e) => {
            if (e.target.closest('.remove-image')) return;
            input.click();
        });
        input.addEventListener('change', (e) => {
            if (e.target.files[0]) setCardSideImage(e.target.files[0], side);
        });
        zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            if (e.dataTransfer.files[0]) setCardSideImage(e.dataTransfer.files[0], side);
        });
    });

    // Cover image modal
    const coverDropZone = document.getElementById('cover-drop-zone');
    const coverFileInput = document.getElementById('cover-file-input');
    coverDropZone.addEventListener('click', (e) => {
        if (e.target.closest('.remove-image')) return;
        coverFileInput.click();
    });
    coverFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) setCoverFromFile(e.target.files[0]);
    });
    coverDropZone.addEventListener('dragover', (e) => { e.preventDefault(); coverDropZone.classList.add('dragover'); });
    coverDropZone.addEventListener('dragleave', () => coverDropZone.classList.remove('dragover'));
    coverDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        coverDropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) setCoverFromFile(file);
    });
    document.getElementById('cancel-move-folder-btn').addEventListener('click', () => {
        document.getElementById('move-folder-modal').classList.remove('active');
    });
    document.getElementById('confirm-add-decks-btn').addEventListener('click', confirmAddDecks);
    document.getElementById('cancel-add-decks-btn').addEventListener('click', () => {
        document.getElementById('add-decks-modal').classList.remove('active');
    });
    document.getElementById('save-cover-btn').addEventListener('click', saveCover);
    document.getElementById('remove-cover-btn').addEventListener('click', removeCover);
    document.getElementById('cancel-cover-btn').addEventListener('click', () => {
        document.getElementById('cover-modal').classList.remove('active');
    });

    // Global paste for images
    document.addEventListener('paste', (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                // Paste into cover modal if open
                if (document.getElementById('cover-modal').classList.contains('active')) {
                    setCoverFromFile(file);
                    e.preventDefault();
                    return;
                }
                // Paste into card image if manage view is active - goes to front by default
                if (manageView.classList.contains('active')) {
                    // If back image area is focused/last clicked, paste there
                    const backZone = document.getElementById('back-drop-zone');
                    if (backZone.matches(':hover') || document.activeElement?.closest('#back-drop-zone')) {
                        setCardSideImage(file, 'back');
                    } else {
                        setCardSideImage(file, 'front');
                    }
                    e.preventDefault();
                    return;
                }
            }
        }
    });

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

    // True/False
    document.getElementById('tf-start-btn').addEventListener('click', startTFMode);

    // Speed Round
    document.getElementById('speed-start-btn').addEventListener('click', startSpeedMode);

    // Fill in the Blank
    document.getElementById('blank-start-btn').addEventListener('click', startBlankMode);
    document.getElementById('blank-check-btn').addEventListener('click', checkBlankAnswer);
    document.getElementById('blank-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkBlankAnswer();
    });

    // Export
    exportBtn.addEventListener('click', exportDeck);
    document.getElementById('export-all-btn').addEventListener('click', () => { exportAll(); closeSidebar(); });

    // Import images toggle and drop zone
    document.getElementById('import-file-btn').addEventListener('click', () => {
        document.getElementById('import-file-input').click();
        closeSidebar();
    });
    document.getElementById('import-file-input').addEventListener('change', (e) => {
        if (e.target.files[0]) importFile(e.target.files[0]);
        e.target.value = '';
    });

    // Deck search filter
    deckSearch.addEventListener('input', () => renderDecksPage());

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
                editCard(editingCardId, question, answer, currentFrontImage, currentBackImage);
                cancelEdit();
            } else {
                addCard(question, answer, currentFrontImage, currentBackImage);
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

// Share deck via link
function shareDeck(deck) {
    const data = { n: deck.name, c: deck.cards.map(c => [c.question, c.answer]) };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const url = window.location.origin + window.location.pathname + '?import=' + encoded;
    document.getElementById('share-url').value = url;
    document.getElementById('share-status').textContent = '';
    document.getElementById('share-modal').classList.add('active');
}

function copyShareUrl() {
    const input = document.getElementById('share-url');
    navigator.clipboard.writeText(input.value).then(() => {
        document.getElementById('share-status').textContent = '\u2713 Copied to clipboard!';
    });
}

function checkShareImport() {
    const params = new URLSearchParams(window.location.search);
    const importData = params.get('import');
    if (!importData) return;
    try {
        const json = JSON.parse(decodeURIComponent(escape(atob(importData))));
        const now = Date.now();
        const deck = {
            id: 'deck_' + now,
            name: json.n || 'Shared Deck',
            folderId: null, icon: '', cover: '', coverPos: 'center',
            cards: (json.c || []).map((c, i) => ({
                id: 'card_' + (now + i),
                question: c[0], answer: c[1],
                frontImage: '', backImage: '',
                starred: false, trackStatus: 'unseen', leitnerBox: 1,
                easeFactor: 2.5, interval: 0, repetitions: 0,
                nextReview: Date.now(), lastReviewed: null
            }))
        };
        appData.decks.push(deck);
        appData.currentDeck = deck.id;
        saveData();
        window.history.replaceState({}, '', window.location.pathname);
        alert(`Imported "${deck.name}" with ${deck.cards.length} cards!`);
        updateDeckSelector();
        switchPage('exercises');
    } catch(e) {
        console.error('Failed to import shared deck:', e);
    }
}

// Start the app
init();
