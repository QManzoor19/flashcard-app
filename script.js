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
    switchPage('home');
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
    // Move decks out of folder
    appData.decks.forEach(d => { if (d.folderId === folderId) d.folderId = null; });
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

    const del = document.createElement('div');
    del.className = 'context-menu-item danger';
    del.textContent = 'Delete deck';
    del.onclick = () => {
        if (confirm(`Delete "${deck.name}"?`)) {
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
        }
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
        if (confirm(`Delete folder "${folder.name}"? Decks inside will be moved out.`)) {
            deleteFolder(folder.id);
        }
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
        card.className = 'grid-card';
        let coverHTML = folder.cover ? `<div class="grid-card-cover" style="background-image:url(${folder.cover});background-position:${folder.coverPos || 'center'}"></div>` : '';
        let iconHTML = folder.icon
            ? `<span class="grid-card-emoji">${folder.icon}</span>`
            : `<svg class="grid-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
        card.innerHTML = `
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

    decksToShow.forEach(d => {
        const card = document.createElement('div');
        card.className = 'grid-card' + (d.id === appData.currentDeck ? ' active-deck' : '');
        const folderName = d.folderId ? (appData.folders.find(f => f.id === d.folderId)?.name || '') : '';
        let coverHTML = d.cover ? `<div class="grid-card-cover" style="background-image:url(${d.cover});background-position:${d.coverPos || 'center'}"></div>` : '';
        let iconHTML = d.icon
            ? `<span class="grid-card-emoji">${d.icon}</span>`
            : `<svg class="grid-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg>`;
        card.innerHTML = `
            ${coverHTML}
            <div class="grid-card-body">
                ${iconHTML}
                <span class="grid-card-name">${d.name}</span>
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
    document.getElementById('opt-tts').checked = studySettings.tts;
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
    fsCard.addEventListener('click', () => fsCard.classList.toggle('flipped'));
    document.getElementById('fs-close').addEventListener('click', exitFullscreen);
    document.getElementById('fs-prev').addEventListener('click', () => { previousCard(); updateFullscreenCard(); });
    document.getElementById('fs-next').addEventListener('click', () => { nextCard(); updateFullscreenCard(); });
    document.getElementById('fs-shuffle').addEventListener('click', () => { shuffleDeck(); updateFullscreenCard(); });
    document.getElementById('fs-star-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStar();
        updateFullscreenCard();
    });

    // Keyboard in fullscreen
    overlay._keyHandler = (e) => {
        if (e.key === 'Escape') exitFullscreen();
        if (e.key === ' ') { e.preventDefault(); fsCard.classList.toggle('flipped'); }
        if (e.key === 'ArrowRight') { nextCard(); updateFullscreenCard(); }
        if (e.key === 'ArrowLeft') { previousCard(); updateFullscreenCard(); }
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

    const format = document.getElementById('import-format').value;
    const errors = [];
    const validCards = [];

    if (format === 'multiline' || (format === 'auto' && text.includes('\n---\n'))) {
        // Multi-line mode: blank lines between cards, --- between front/back
        const blocks = text.split(/\n\s*\n/).filter(b => b.trim());
        blocks.forEach((block, i) => {
            const parts = block.split(/\n---\n/);
            if (parts.length >= 2) {
                const front = parts[0].trim();
                const back = parts.slice(1).join('\n---\n').trim();
                if (front && back) validCards.push({ front, back });
                else errors.push(`Block ${i + 1}: Empty front or back`);
            } else {
                // Try splitting on first newline
                const nl = block.indexOf('\n');
                if (nl > 0) {
                    const front = block.substring(0, nl).trim();
                    const back = block.substring(nl + 1).trim();
                    if (front && back) validCards.push({ front, back });
                    else errors.push(`Block ${i + 1}: Could not split front/back`);
                } else {
                    errors.push(`Block ${i + 1}: No separator found (use --- between front and back)`);
                }
            }
        });
    } else {
        // Single-line modes
        const lines = text.split('\n');
        let lineNumber = 0;

        for (const line of lines) {
            lineNumber++;
            if (!line.trim()) continue;

            let front = null, back = null;

            if (format === 'tab' || (format === 'auto' && line.includes('\t'))) {
                const parts = line.split('\t');
                if (parts.length >= 2) { front = parts[0]; back = parts.slice(1).join('\t'); }
            } else if (format === 'pipe' || (format === 'auto' && line.includes('|'))) {
                const parts = line.split('|');
                if (parts.length >= 2) { front = parts[0]; back = parts.slice(1).join('|'); }
            } else if (format === 'semicolon' || (format === 'auto' && line.includes(';'))) {
                const parts = line.split(';');
                if (parts.length >= 2) { front = parts[0]; back = parts.slice(1).join(';'); }
            } else if (format === '4space' || format === 'auto') {
                const m = line.match(/^(.+?)    (.+)$/);
                if (m) { front = m[1]; back = m[2]; }
            }

            if (front !== null) {
                front = front.trim();
                back = back.trim();
                if (front && back) { validCards.push({ front, back }); continue; }
            }

            errors.push(`Line ${lineNumber}: Could not parse — check separator`);
        }
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
    document.getElementById('study-settings-btn').addEventListener('click', toggleStudySettings);
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
    document.getElementById('opt-tts').addEventListener('change', (e) => {
        studySettings.tts = e.target.checked;
        saveStudySettings();
    });
    document.getElementById('opt-shortcuts-toggle').addEventListener('click', () => {
        const list = document.getElementById('shortcuts-list');
        const btn = document.getElementById('opt-shortcuts-toggle');
        if (list.style.display === 'none') {
            list.style.display = '';
            btn.textContent = 'Hide';
        } else {
            list.style.display = 'none';
            btn.textContent = 'View';
        }
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

// Start the app
init();
