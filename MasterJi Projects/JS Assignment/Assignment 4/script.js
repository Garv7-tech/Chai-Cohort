// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    gridViewBtn: document.getElementById('gridViewBtn'),
    listViewBtn: document.getElementById('listViewBtn'),
    sortSelect: document.getElementById('sortSelect'),
    booksContainer: document.getElementById('booksContainer'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    noResultsMessage: document.getElementById('noResultsMessage'),
    paginationContainer: document.getElementById('paginationContainer'),
    currentPageEl: document.getElementById('currentPage'),
    totalPagesEl: document.getElementById('totalPages'),
    firstPageBtn: document.getElementById('firstPageBtn'),
    prevPageBtn: document.getElementById('prevPageBtn'),
    nextPageBtn: document.getElementById('nextPageBtn'),
    lastPageBtn: document.getElementById('lastPageBtn')
};

// App State
const state = {
    books: [],
    filteredBooks: [],
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
    searchTerm: '',
    sortBy: '',
    viewMode: 'grid'
};

// API Configuration
const API_BASE_URL = 'https://api.freeapi.app/api/v1/public/books';

// Initialize the application
async function init() {
    setupEventListeners();
    await fetchBooks();
    renderBooks();
}

// Fetch books from API
async function fetchBooks() {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE_URL}?page=${state.currentPage}&limit=${state.itemsPerPage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.data && data.data.data) {
            state.books = data.data.data;
            state.totalPages = Math.ceil(data.data.totalItems / state.itemsPerPage) || 1;
            updatePagination();
        } else {
            throw new Error('Invalid data structure from API');
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        showError('Failed to load books. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Render books based on current state
function renderBooks() {
    // Filter books based on search term
    state.filteredBooks = state.books.filter(book => {
        const title = book.volumeInfo?.title?.toLowerCase() || '';
        const authors = book.volumeInfo?.authors?.join(' ')?.toLowerCase() || '';
        return title.includes(state.searchTerm) || authors.includes(state.searchTerm);
    });
    
    // Sort books if sort option is selected
    if (state.sortBy) {
        sortBooks();
    }
    
    // Update UI
    updateBooksDisplay();
    updatePagination();
}

// Sort books based on selected criteria
function sortBooks() {
    state.filteredBooks.sort((a, b) => {
        const volumeInfoA = a.volumeInfo || {};
        const volumeInfoB = b.volumeInfo || {};
        
        switch (state.sortBy) {
            case 'title-asc':
                return (volumeInfoA.title || '').localeCompare(volumeInfoB.title || '');
            case 'title-desc':
                return (volumeInfoB.title || '').localeCompare(volumeInfoA.title || '');
            case 'date-asc':
                return new Date(volumeInfoA.publishedDate || 0) - new Date(volumeInfoB.publishedDate || 0);
            case 'date-desc':
                return new Date(volumeInfoB.publishedDate || 0) - new Date(volumeInfoA.publishedDate || 0);
            default:
                return 0;
        }
    });
}

// Update books display in the UI
function updateBooksDisplay() {
    elements.booksContainer.innerHTML = '';
    
    if (state.filteredBooks.length === 0) {
        elements.noResultsMessage.classList.add('active');
        elements.paginationContainer.style.display = 'none';
        return;
    }
    
    elements.noResultsMessage.classList.remove('active');
    elements.paginationContainer.style.display = 'flex';
    
    state.filteredBooks.forEach(book => {
        const bookCard = createBookCard(book);
        elements.booksContainer.appendChild(bookCard);
    });
}

// Create a book card element
function createBookCard(book) {
    const volumeInfo = book.volumeInfo || {};
    const title = volumeInfo.title || 'No Title';
    const authors = volumeInfo.authors?.join(', ') || 'Unknown Author';
    const publisher = volumeInfo.publisher || 'Unknown Publisher';
    const publishedDate = formatDate(volumeInfo.publishedDate) || 'Unknown Date';
    const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x196?text=No+Cover';
    const infoLink = volumeInfo.infoLink || '#';
    
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${thumbnail}" alt="${title}">
            <div class="book-cover-overlay">
                <button class="view-details-btn" data-infoLink="${infoLink}">
                    <span class="material-symbols-outlined">visibility</span>
                    View Details
                </button>
            </div>
        </div>
        <div class="book-details">
            <h3 class="book-title">${title}</h3>
            <p class="book-author">${authors}</p>
            <div class="book-meta">
                <span>${publisher}</span>
                <span>${publishedDate}</span>
            </div>
        </div>
    `;
    
    // Add click event to the view details button
    const viewBtn = bookCard.querySelector('.view-details-btn');
    viewBtn.addEventListener('click', () => openBookDetails(infoLink));
    
    return bookCard;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        return isNaN(date) ? dateString : date.toLocaleDateString();
    } catch {
        return dateString;
    }
}

// Open book details in new tab
function openBookDetails(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

// Update pagination UI
function updatePagination() {
    elements.currentPageEl.textContent = state.currentPage;
    elements.totalPagesEl.textContent = state.totalPages;
    
    elements.firstPageBtn.disabled = state.currentPage <= 1;
    elements.prevPageBtn.disabled = state.currentPage <= 1;
    elements.nextPageBtn.disabled = state.currentPage >= state.totalPages;
    elements.lastPageBtn.disabled = state.currentPage >= state.totalPages;
}

// Change page
async function changePage(page) {
    if (page < 1 || page > state.totalPages) return;
    
    state.currentPage = page;
    await fetchBooks();
    renderBooks();
}

// Set view mode (grid or list)
function setViewMode(mode) {
    state.viewMode = mode;
    elements.booksContainer.classList.remove('grid-view', 'list-view');
    elements.booksContainer.classList.add(`${mode}-view`);
    
    // Update active button state
    if (mode === 'grid') {
        elements.gridViewBtn.classList.add('active');
        elements.listViewBtn.classList.remove('active');
    } else {
        elements.gridViewBtn.classList.remove('active');
        elements.listViewBtn.classList.add('active');
    }
}

// Show loading state
function showLoading() {
    elements.loadingIndicator.classList.add('active');
}

// Hide loading state
function hideLoading() {
    elements.loadingIndicator.classList.remove('active');
}

// Show error message
function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    elements.booksContainer.appendChild(errorEl);
}

// Setup event listeners
function setupEventListeners() {
    // Search input with debounce
    elements.searchInput.addEventListener('input', debounce(() => {
        state.searchTerm = elements.searchInput.value.trim().toLowerCase();
        state.currentPage = 1;
        renderBooks();
    }, 300));
    
    // Clear search
    elements.clearSearch.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchTerm = '';
        renderBooks();
        elements.clearSearch.classList.remove('visible');
    });
    
    // Show/hide clear search button
    elements.searchInput.addEventListener('input', () => {
        if (elements.searchInput.value.trim()) {
            elements.clearSearch.classList.add('visible');
        } else {
            elements.clearSearch.classList.remove('visible');
        }
    });
    
    // View mode toggle
    elements.gridViewBtn.addEventListener('click', () => setViewMode('grid'));
    elements.listViewBtn.addEventListener('click', () => setViewMode('list'));
    
    // Sort select
    elements.sortSelect.addEventListener('change', () => {
        state.sortBy = elements.sortSelect.value;
        renderBooks();
    });
    
    // Pagination buttons
    elements.firstPageBtn.addEventListener('click', () => changePage(1));
    elements.prevPageBtn.addEventListener('click', () => changePage(state.currentPage - 1));
    elements.nextPageBtn.addEventListener('click', () => changePage(state.currentPage + 1));
    elements.lastPageBtn.addEventListener('click', () => changePage(state.totalPages));
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);