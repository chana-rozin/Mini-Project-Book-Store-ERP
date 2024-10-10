console.log('controller');

const renderBooks = (books) =>{
    const booksEl = books.map(getHtmlBookInListElement).join('');
    document.getElementsByClassName('books-list')[0].innerHTML = booksEl;
}

const getHtmlBookInListElement = (book) =>{
    return `<div class="book-in-list">
    <p class="book-id">${book.id}</p>
    <p class="book-title" onclick="showBookDetails(${book.id})">${book.title}</p>
    <p class="book-price">${book.price}$</p>
    <div class="actions-container">
    <p class="read-btn" onclick="showBookDetails(${book.id})">Read</p>
    <p class="update-btn">Update</p>
    <p class="delete-btn" onclick="deleteBook(${book.id})">Delete</p>
    </div>
    </div>`;
}

const getHtmlBookElement = (book) =>{
    return `<div class="book-title">${book.title}</div>
    <div class="book-view">
    <img src=${book.imgUrl} alt="Book cover">
    <div class="book-details">
    <p class="book-price">Price: ${book.price}$</p>
    <p class="book-rate">Rate: 
    <input type="number" max="5" min="0" step="1" value='${book.rate}' onchange="updateBookRate(event,${book.id})"/></p>
    </div>`;

}

const renderBookDetails = (id)=>{
    const book = GdynamicBooks.find(book => book.id === id);
    document.getElementsByClassName('book-area')[0].innerHTML = book?getHtmlBookElement(book):"";
}