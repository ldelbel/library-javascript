let myLibrary = [{title: 'The great war', author:' John Doe', pageNumber: 100, readStatus:false}];
let title = document.querySelector('#title').value;
let author = document.querySelector('#author').value;
let pageNumber = document.querySelector('#page-num').value;
let addBookBtn = document.querySelector('#add-book-btn');
let libraryDisplay = document.querySelector('#library-display');


function Book(title, author, pageNumber, readStatus){
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pageNumber, readStatus){
  let book = new Book(title, author, pageNumber, readStatus);
   myLibrary.push(book);
 }

addBookBtn.addEventListener('click', addBookToLibrary(title,author, pageNumber, readStatus = false ))


function displayBooks(library){
  library.forEach(book =>{
     let row = document.createElement('tr');
     let column1 = document.createElement('th');
     column1.innerText = book.title
     
     
  })
  
}




console.log(myLibrary);

