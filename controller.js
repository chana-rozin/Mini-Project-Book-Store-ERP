const main = () => {
    console.log('App started...');
    const books = getBooks();
    renderBooks(books);
    runnerId = parseInt(localStorage.getItem('runnerId') || '11');
}

const getBooks = () => {
    const localStorageData = JSON.parse(localStorage.getItem('books'));
    GdynamicBooks = localStorageData ? localStorageData : GdynamicBooks.length ? GdynamicBooks : Gbooks;
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    return GdynamicBooks;
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
    renderBooks(GdynamicBooks);
}

const loadInitialData = () => {
    GdynamicBooks = Gbooks;
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(GdynamicBooks);
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

    renderBooks(GdynamicBooks);
}



main();