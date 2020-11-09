let myLibrary = [];
let form = document.getElementById('form');
let addBookBtn = document.querySelector('#add-book-btn');
let libraryDisplay = document.querySelector('#library-display');


function Book(title, author, pageNumber, readStatus){
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pageNumber, readStatus = false){
  let book = new Book(title, author, pageNumber, readStatus);
  displayBook(book);
 }

form.addEventListener('submit', (e)=> {
  let title = document.getElementById('title').value;
  let author = document.querySelector('#author').value;
  let pageNumber = document.querySelector('#page-num').value;
  addBookToLibrary(title, author, pageNumber);
  e.preventDefault();
  console.log(myLibrary);

});

function displayBook(book){
     myLibrary.push(book);
     let parent = document.createElement('tr');
     Object.values(book).forEach( value => {
        let child = document.createElement('th');
        child.innerHTML = value;
        parent.appendChild(child);
     } )    
     libraryDisplay.appendChild(parent);
}


