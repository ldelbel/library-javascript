let myLibrary = [];

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

addBookToLibrary('Any', 'Anyone', 100, true);

console.log(myLibrary);

