const main = () => {
    console.log('App started...');
    initDynamicBooks();
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
    runnerId = parseInt(localStorage.getItem('runnerId') || '11');
}

function setLanguage(lang) {
    GCurrentLanguage = lang;
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-translate");
        el.textContent = translations[lang][key];
    });
    document.documentElement.classList.add(lang);
    document.documentElement.classList.remove(lang=='en' ? 'he' : 'en');

}

const initDynamicBooks = () => {
    const localStorageData = JSON.parse(localStorage.getItem('books'));
    GdynamicBooks = localStorageData ? localStorageData : GdynamicBooks.length ? GdynamicBooks : Gbooks;
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
}

const newBookPopup = () => {
    renderNewBookForm(true);
}

const closeNewBookPopup = () => {
    renderNewBookForm(false)
}

const addNewBook = (ev) => {
    ev.preventDefault();
    const values = new FormData(ev.target);
    const book = { id: runnerId++, ...Object.fromEntries(values.entries()) };
    localStorage.setItem('runnerId', runnerId);
    GdynamicBooks.push(book);
    console.log('New book added:', book);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
    ev.target.reset();
    closeNewBookPopup();
}

const saveBook = (ev, id) => {
    ev.preventDefault();
    renderEditBookToEmpty();
    const values = new FormData(ev.target);
    const book = {id,...Object.fromEntries(values.entries()) };
    console.log('Book updated:', book);
    GdynamicBooks = GdynamicBooks.map(b => b.id === id? book : b);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(getCurrentPageEl());
    if(GcurrentBookId === id){
        renderBookDetails(id);
    }
}

const editBook =(id) => {
    console.log('Edit book:', id);
    renderEditBookForm(GdynamicBooks.find(b => b.id === id));
}

const loadInitialData = () => {
    GdynamicBooks = Gbooks;
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
}

const showBookDetails = (id) => {
    renderBookDetails(id);
    GcurrentBookId = id;
}


const updateBookRate = (ev, id) => {
    GdynamicBooks = GdynamicBooks.map(b => b.id === id ? { ...b, rate: ev.target.value } : b);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
}


const deleteBook = (id) => {
    GdynamicBooks = GdynamicBooks.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    if (GcurrentBookId === id) {
        GcurrentBookId = 0;
        renderBookDetails(GcurrentBookId);
    }
    if(getCurrentPageEl().length === 0)
        GCurrentPage = 1;
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
}

function sortBy(filter, reverse = false) {
    switch (filter) {
        case 'title': {
            GdynamicBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        }
        case 'price': {
            GdynamicBooks.sort((a, b) => b.price - a.price);
            break;
        }
        default:
            break;
    }
    if (reverse) GdynamicBooks.reverse();
    renderBooks(getCurrentPageEl());

}

const changePage = (pageNumber) => {
    GCurrentPage = pageNumber;
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
}

const getCurrentPageEl = () => {
    return GdynamicBooks.slice((GCurrentPage - 1) * GElPerPage, GCurrentPage * GElPerPage)
}

const getNumOfPages = () => Math.ceil(GdynamicBooks.length / GElPerPage);

main();