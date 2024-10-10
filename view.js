console.log('controller');

function renderBooks(books) {
    const booksEl = books.map(renderBookInList).join('');
    document.getElementsByClassName('books-list')[0].innerHTML = booksEl;
}

function renderBookInList(book) {
    return `<div class="book-in-list">
    <p class="book-id">${book.id}</p>
    <p class="book-title">${book.title}</p>
    <p class="book-price">${book.price}</p>
    <div class="actions-container">
    <p class="read-btn">Read</p>
    <p class="update-btn">Update</p>
    <p class="delete-btn">Delete</p>
    </div>
    </div>`;
}

function renderBook(bookId) {
    return `<div class="book-title id=${bookId}">
    <div class="book-view">
    <img src=\`${book.imgUrl}\` alt="Book cover">
    <div class="book-details">
    <p class="book-price">Price: ${book.price}</p>
    <p class="book-rate">Rate: 
    <input type="number" max="5" min="0" step="1" value=${book.rate}/></p>
    </div>
    </div>`;

}