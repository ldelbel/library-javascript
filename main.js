const myLibrary = [];
const libraryDisplay = document.querySelector('#library-display');
const modal = document.getElementById('form-modal');
const btn = document.querySelector('#book-modal');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function displayModal() {
  modal.style.display = 'block';
};

span.onclick = function closeModal() {
  modal.style.display = 'none';
};

window.onclick = function closeWindow(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function Book(title, author, pageNumber) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = false;
}

Book.prototype.toggleStatus = function toggle() {
  if (this.readStatus === true) {
    this.readStatus = false;
  } else {
    this.readStatus = true;
  }
};

function displayBook(myLibrary) {
  while (libraryDisplay.firstChild) {
    libraryDisplay.removeChild(libraryDisplay.firstChild);
  }

  myLibrary.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pageNumber}</td>
                    <td><button id="${book.title}" data-id="${myLibrary.indexOf(book)}">${book.readStatus}</button></td>
                    <td><button id="${myLibrary.indexOf(book)}">Delete</button></td>`;
    libraryDisplay.appendChild(row);
    document.getElementById(`${myLibrary.indexOf(book)}`).addEventListener('click', (e) => {
      const bookIndex = e.target.id;
      myLibrary.splice(bookIndex, 1);
      if (bookIndex) {
        displayBook(myLibrary);
      }
    });
    document.querySelector(`[data-id~="${myLibrary.indexOf(book)}"`).addEventListener('click', (e) => {
      const bookIndex = e.target.dataset.id;
      const book = myLibrary[bookIndex];
      book.toggleStatus();
      if (bookIndex) {
        displayBook(myLibrary);
      }
    });
  });
}

function addBookToLibrary(title, author, pageNumber) {
  const book = new Book(title, author, pageNumber);
  myLibrary.push(book);
  displayBook(myLibrary);
}

function cleaFields() {
  document.getElementById('title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#page-num').value = '';
}


document.getElementById('form').addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const author = document.querySelector('#author').value;
  const pageNumber = document.querySelector('#page-num').value;
  addBookToLibrary(title, author, pageNumber);
  cleaFields();
  e.preventDefault();
});
