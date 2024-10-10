function main() {
    console.log('App started...');
    const books = getBooks();
    renderBooks(books);
}

function getBooks() {
    GdynamicBooks = localStorage.getItem('books') || GdynamicBooks.length? GdynamicBooks : Gbooks;
    return GdynamicBooks;
}

function addNewBook(){

}

function loadInitialData(){
    GdynamicBooks = Gbooks;
    renderBooks(GdynamicBooks);
}

main();