const main = () => {
    console.log('App started...');
    initDynamicBooks();
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
    runnerId = parseInt(localStorage.getItem('runnerId') || '11');
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
    saveBook(book);
    closeNewBookPopup();
}

const saveBook = (book) => {
    GdynamicBooks.push(book);
    console.log('New book added:', book);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(getCurrentPageEl());
    renderPaging(getNumOfPages(), GCurrentPage);
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