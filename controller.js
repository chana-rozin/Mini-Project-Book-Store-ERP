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

function updateBookRate(ev,id){
    GdynamicBooks = GdynamicBooks.map(b => b.id === id? {...b,rate: ev.target.value} : b);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
}


function deleteBook(id){
    GdynamicBooks = GdynamicBooks.filter(book => book.id!== id);
    localStorage.setItem('books', JSON.stringify(GdynamicBooks));
    renderBooks(GdynamicBooks);
}



main();