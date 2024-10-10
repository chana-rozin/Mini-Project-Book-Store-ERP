function main() {
    console.log('App started...');
    const books = getBooks();
    renderBooks(books);
}

function getBooks() {
    const localStorageData = JSON.parse(localStorage.getItem('books'));
    GdynamicBooks = localStorageData ? localStorageData :GdynamicBooks.length? GdynamicBooks : Gbooks;
    return GdynamicBooks;
}

function addNewBook(){

}

function loadInitialData(){
    GdynamicBooks = Gbooks;
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(GdynamicBooks);
}

function viewBook(id){
    const book = GdynamicBooks.find(book => book.id === id);
    document.getElementsByClassName('book-area')[0].innerHTML = renderBook(book);
}

function updateBookRate(ev,id){
    GdynamicBooks = GdynamicBooks.map(b => b.id === id? {...b,rate: ev.target.value} : b);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
}


main();