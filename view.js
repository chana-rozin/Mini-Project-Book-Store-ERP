console.log('controller');

const renderBooks = (books) => {
    const booksEl = books.map(getHtmlBookInListElement).join('');
    document.getElementsByClassName('books-list')[0].innerHTML = booksEl;
}

const renderPaging = (numOfPages, currentPage) => {
    console.log('render paging', numOfPages, currentPage);
    let pageBtnsEl = '';
    for (let i = 1; i <= numOfPages; i++)
    {
        pageBtnsEl += getPageBtnHtmlEl(i, currentPage===i);
        console.log('btnPage', getPageBtnHtmlEl(i, currentPage===i));
    }
    console.log('pageBtnsEl:', pageBtnsEl);
    document.getElementsByClassName('pagination-controller')[0].innerHTML = pageBtnsEl;
}

const getPageBtnHtmlEl = (page, emphasis) => {
    return `<div class="page-btn ${emphasis? 'currentPage':''}" onclick="changePage(${page})">${page}</div>`;
}

const getHtmlBookInListElement = (book) => {
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

const getHtmlBookElement = (book) => {
    return `<div class="book-title">${book.title}</div>
    <div class="book-view">
    <img src=${book.imgUrl || 'https://img.icons8.com/?size=100&id=11561&format=png&color=000000'} alt="Book cover">
    <div class="book-details">
    <p class="book-price">Price: ${book.price}$</p>
    <p class="book-rate">Rate: 
    <input type="number" max="5" min="0" step="1" value='${book.rate}' onchange="updateBookRate(event,${book.id})"/></p>
    </div>`;

}

const renderBookDetails = (id) => {
    const book = GdynamicBooks.find(book => book.id === id);
    document.getElementsByClassName('book-area')[0].innerHTML = book ? getHtmlBookElement(book) : "";
}

const renderNewBookForm = (visible) => {
    console.log('renderNewBookForm', visible);
    document.getElementsByClassName('new-book-popup')[0].classList.remove(visible ? 'hidden' : 'visible-flex');
    document.getElementsByClassName('new-book-popup')[0].classList.add(visible ? 'visible-flex' : 'hidden');
}

