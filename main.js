const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
};

let myLibrary = [];
const libraryDisplay = document.querySelector('#library-display');
const modal = document.getElementById('form-modal');
const btn = document.querySelector('#book-modal');
const span = document.getElementsByClassName('close')[0];

const status = (stat) => {
  if (stat === 'true' || stat === true) return 'Read';
  return 'Unread';
};

const displayBook = (myLibrary) => {
  while (libraryDisplay.firstChild) {
    libraryDisplay.removeChild(libraryDisplay.firstChild);
  }

  myLibrary.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pageNumber}</td>
                    <td><button id="${book.title}" data-id="${myLibrary.indexOf(
  book,
)}">${status(book.readStatus)}</button></td>
                    <td><button id="${myLibrary.indexOf(
    book,
  )}">Delete</button></td>`;
    libraryDisplay.appendChild(row);
    document
      .getElementById(`${myLibrary.indexOf(book)}`)
      .addEventListener('click', (e) => {
        const bookIndex = e.target.id;
        myLibrary.splice(bookIndex, 1);
        if (bookIndex) {
          displayBook(myLibrary);
        }
      });
    document
      .querySelector(`[data-id~="${myLibrary.indexOf(book)}"`)
      .addEventListener('click', (e) => {
        const bookIndex = e.target.dataset.id;
        const book = myLibrary[bookIndex];
        console.log(book);
        book.toggleStatus();
        if (bookIndex) {
          displayBook(myLibrary);
        }
      });
  });

  localStorage.setItem('currentLibrary', JSON.stringify(myLibrary));
};

if (storageAvailable('localStorage')) {
  const current = localStorage.getItem('currentLibrary');
  if (current !== null && current.length > 10) {
    myLibrary = JSON.parse(current);
    displayBook(myLibrary);
  } else {
    myLibrary = [];
  }
} else {
  myLibrary = [];
}

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

let Book = (title, author, pageNumber, readStatus) => {
 
  const toggleStatus = () => {
    if (props.readStatus === true || props.readStatus === "true") {
      props.readStatus = false;
    } else {
      props.readStatus = true;
    }
  }

  const props = { title, author, pageNumber, readStatus, toggleStatus };
  return props;
}


const addBookToLibrary = (title, author, pageNumber, readStatus) => {
  let book = Book(title, author, pageNumber, readStatus);
  myLibrary.push(book);
  displayBook(myLibrary);
};

const cleaFields = () => {
  document.getElementById('title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#page-num').value = '';
};

document.getElementById('form').addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const author = document.querySelector('#author').value;
  const pageNumber = document.querySelector('#page-num').value;
  const readStatus = document.querySelector('input[name="status-def"]:checked')
    .value;
  addBookToLibrary(title, author, pageNumber, readStatus);
  cleaFields();
  e.preventDefault();
});
