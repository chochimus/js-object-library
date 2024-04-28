class Library {
  constructor(){
    this.library = [];
  }
  addBookToLibrary(book){
    this.library.push(book);
  }
}

class Book{
  constructor(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.displayed = false;
  }
  getReadStatus = () => this.haveRead ? "Have read" : "Not read yet";
}

let screenController = function(){
  const bookShelf = document.querySelector(".bookshelf");
  const newBookButton = document.querySelector('.js-newBook');
  const theForm = document.querySelector('form');
  const closeButton = document.querySelector('.cancel');
  const dialog = document.querySelector('dialog');
  const myLibrary = new Library();

  let id = 0;
  const displayBooks = (myLibrary) => {
    for(let book of myLibrary.library){
      if(!book.displayed) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.setAttribute('data-index', id);
        const bookContent = document.createElement("div");
        bookContent.classList.add("book");
        bookContent.setAttribute('data-index', id);
        addBookElements(bookContent, 'title', 'h1', book.title);
        addBookElements(bookContent, 'author', 'p', book.author);
        addBookElements(bookContent, 'pages', 'p', book.pages);
        addBookElements(bookContent, 'haveRead', 'p', book.getReadStatus());
        addBookButton(bookContent, 'read', 'button', id);
        addBookButton(bookContent, 'remove', 'button', id);
        id++;
        bookContainer.appendChild(bookContent);
        bookShelf.appendChild(bookContainer);
      }
      book.displayed = true;
    }
  }

  const addBookElements = (bookContent, className, htmlTag, content) => {
    const currentElement = document.createElement(`${htmlTag}`);
    currentElement.classList.add(`${className}`);
    currentElement.textContent = `${content}`;
    bookContent.appendChild(currentElement);
  }

  const addBookButton = (bookContent, className, htmlTag, index) => {
    const currentElement = document.createElement(`${htmlTag}`);
    currentElement.classList.add(`${className}`);
    currentElement.textContent = `${className}`;
    bookContent.appendChild(currentElement);
    if(className == 'remove'){
      currentElement.addEventListener('click', () => {
        myLibrary.library.splice(index, 1);
        const bookToRemove = bookShelf.querySelector(`.book-container[data-index="${index}"]`);
        bookToRemove.remove();
        id--;
      });
    } else {
      currentElement.addEventListener('click', () => {
        const bookToUpdate = bookShelf.querySelector(`.book[data-index="${index}"] .haveRead`);
        const bookTitle = bookShelf.querySelector(`.book[data-index="${index}"] .title`).textContent;
        const bookIndex = myLibrary.library.findIndex(book => book.title === bookTitle);
        myLibrary.library[bookIndex].haveRead = !myLibrary.library[bookIndex].haveRead;
        bookToUpdate.textContent = myLibrary.library[bookIndex].getReadStatus();
      });
    }
  }
  newBookButton.addEventListener('click', () =>{
    dialog.showModal();
  });

  theForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title") == '' ? 'no title' : formData.get("title");
    const author = formData.get("author") == '' ? 'no author' : formData.get("author");
    const pages = formData.get("pages") == '' ? '0' : formData.get("pages");
    const haveRead = formData.get("haveRead") ? true : false;
    myLibrary.addBookToLibrary(new Book(title, author, pages, haveRead));
    displayBooks(myLibrary);
  });
  closeButton.addEventListener('click', () => {
    dialog.close();
  });
  const defaultBook = new Book("The Hobbit", "J.R.R Tolkein", "300", true);
  myLibrary.addBookToLibrary(defaultBook);
  displayBooks(myLibrary);
}
screenController();