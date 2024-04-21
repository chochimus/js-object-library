const myLibrary = [];
const bookShelf = document.querySelector(".bookshelf");
function Book(title, author, pages, haveRead){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  let displayed = false;
}
let id = 0;

function addBookToLibrary(book){
  myLibrary.push(book);
}

function displayBooks(myLibrary){
  for(let i = 0; i < myLibrary.length; i++){
    let currentBook = myLibrary[i];
    if(!currentBook.displayed) {
      const containerContainer = document.createElement("div");
      containerContainer.classList.add("book-container");
      containerContainer.setAttribute('data-index', id);
      const domContainer = document.createElement("div");
      domContainer.classList.add("book");
      domContainer.setAttribute('data-index', id);
      addBookElements(domContainer, currentBook, 'title', 'h1', currentBook.title);
      addBookElements(domContainer, currentBook, 'author', 'p', currentBook.author);
      addBookElements(domContainer, currentBook, 'pages', 'p', currentBook.pages);
      addBookElements(domContainer, currentBook, 'haveRead', 'p', currentBook.haveRead);
      addBookButton(domContainer, currentBook, 'read', 'button', id);
      addBookButton(domContainer, currentBook, 'remove', 'button', id);
      id++;
      containerContainer.appendChild(domContainer);
      bookShelf.appendChild(containerContainer);
    }
    currentBook.displayed = true;
  }
}

function addBookElements(domContainer, currentBook, className, htmlTag, content){
  let currentElement = document.createElement(`${htmlTag}`);
  currentElement.classList.add(`${className}`);
  if(className === 'haveRead') {
    currentElement.textContent = content ? 'Have read' : 'Not read yet';
  } else {
    currentElement.textContent = `${content}`;
  }
  domContainer.appendChild(currentElement);
}

function addBookButton(domContainer, currentBook, className, htmlTag, index){
  let currentElement = document.createElement(`${htmlTag}`);
  currentElement.classList.add(`${className}`);
  currentElement.textContent = `${className}`;
  domContainer.appendChild(currentElement);
  if(className == 'remove'){
    currentElement.addEventListener('click', () => {
      console.log(index);
      console.log(myLibrary);
      myLibrary.splice(index, 1);
      const bookToRemove = bookShelf.querySelector(`.book-container[data-index="${index}"]`);
      bookToRemove.remove();
      id--;
    })
  } else {
    currentElement.addEventListener('click', () => {
      const bookToUpdate = bookShelf.querySelector(`.book[data-index="${index}"] .haveRead`);
      const bookTitle = bookShelf.querySelector(`.book[data-index="${index}"] .title`).textContent;
      const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);
      myLibrary[bookIndex].haveRead = !myLibrary[bookIndex].haveRead;
      bookToUpdate.textContent = myLibrary[bookIndex].haveRead ? 'Have read' : 'Not read yet';
    })
  }
}

const newBookButton = document.querySelector('.js-newBook');
const theForm = document.querySelector('form');
const closeButton = document.querySelector('.cancel');
const dialog = document.querySelector('dialog');
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
  addBookToLibrary(new Book(title, author, pages, haveRead));
  displayBooks(myLibrary);
});
closeButton.addEventListener('click', () => {
  dialog.close();
});

const defaultBook = new Book("The Hobbit", "J.R.R Tolkein", "300", true);
addBookToLibrary(defaultBook);
displayBooks(myLibrary);