/*const myLibrary = [];
const addBtn = document.querySelector("#add-book");
addBtn.addEventListener("click", () => {
  document.querySelector("#add-book-modal").showModal();
});

const submitBook = document.querySelector("#submit-book");
submitBook.addEventListener("click", () => {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const pageCount = document.querySelector("#page-count").value;
  const readStatus = document.querySelector("#read-status").checked;

  console.log("read status");
  console.log(readStatus);
  if (checkForm(title, author, pageCount)) {
    const aBook = new Book(title, author, pageCount);
    if (readStatus) {
      aBook.toggleRead();
    }
    myLibrary.push(aBook);
    clearFields();
    document.querySelector("#add-book-modal").close();
    displayBookList();
  }
});

const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  clearFields();
  document.querySelector("#add-book-modal").close();
});

function checkForm(title, author, pageCount) {
  if (title != "" && author != "" && pageCount != "") {
    return true;
  }
  return false;
}

/* Book constructor */
/*
function Book(title, author, noPages) {
  if (!(this instanceof Book)) {
    throw Error("Error: Incorrect invocation");
  }

  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.read = false;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function displayBookList() {
  const output = document.querySelector(".book-display");
  const titleCard = createHeader();
  output.textContent = "";
  let index = 0;

  output.appendChild(titleCard);
  myLibrary.forEach((book) => {
    //card for the book info
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", index);
    const titleLabel = document.createElement("p");
    titleLabel.textContent = book.title;
    const authorLabel = document.createElement("p");
    authorLabel.textContent = book.author;
    const pagesLabel = document.createElement("p");
    pagesLabel.textContent = book.noPages;

    const readStatus = document.createElement("p");
    readStatus.textContent = book.read === true ? "Read" : "Not Read";

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-button");
    readBtn.textContent = book.read ? "Mark Unread" : "Mark Read";

    readBtn.addEventListener("click", () => {
      let index = card.getAttribute("data-index");
      myLibrary[index].toggleRead();
      displayBookList();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      if (confirm("You are about to delete a book!\nAre you sure?") == true) {
        let index = card.getAttribute("data-index");
        myLibrary.splice(index, 1);
        displayBookList();
      }
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("card-buttons");

    card.appendChild(titleLabel);
    card.appendChild(authorLabel);
    card.appendChild(pagesLabel);
    card.appendChild(readStatus);
    buttonDiv.appendChild(readBtn);
    buttonDiv.appendChild(deleteBtn);
    card.appendChild(buttonDiv);
    output.appendChild(card);

    index++;
  });
}

function createHeader() {
  let aCard = document.createElement("div");
  aCard.classList.add("card");
  aCard.classList.add("title-header");

  const titleLabel = document.createElement("p");
  titleLabel.textContent = "Title";
  const authorLabel = document.createElement("p");
  authorLabel.textContent = "Author";
  const pagesLabel = document.createElement("p");
  pagesLabel.textContent = "Number of Pages";
  const readLabel = document.createElement("p");
  readLabel.textContent = "Read Status";

  const readBtn = document.createElement("button");
  readBtn.textContent = "Mark Read";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  aCard.appendChild(titleLabel);
  aCard.appendChild(authorLabel);
  aCard.appendChild(pagesLabel);
  aCard.appendChild(readLabel);

  return aCard;
}

function clearFields() {
  document.querySelector("#book-title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#page-count").value = "";
  document.querySelector("#read-status").checked = false;
}

myLibrary.push(new Book("Harry Potter", "J.K Rowling", 150));
displayBookList();

function outer() {
  let thing = 5;

  return function (number = thing) {
    thing = number;
    console.log("Thing is " + thing);
  };
}

const tester = outer();

(function () {
  let thingy = {
    init: function () {
      this.db = document.querySelector("#dumb-button");
      this.bindEvent();
    },
    showAlert: function () {
      alert("I still live");
    },

    bindEvent: function () {
      this.db.addEventListener("click", this.showAlert.bind(this));
    },
  };

  thingy.init();
})();
*/

//class refactor code

/*
  Library - stores books, handles book admin: adding, removing, etc. Draw elements to the page


  Book - stores data related to the book. 


  UI - handles all the UI related code. communicates with the other classes.
*/

class UI {
  #library;

  //ui elements
  #output;
  #addBookButton;
  #bookModal;
  #cancelButton;
  #submitButton;

  constructor() {
    this.#library = new Library();
    this.#output = document.querySelector(".book-display");
    this.#addBookButton = document.querySelector("#add-book");
    this.#bookModal = document.querySelector("#add-book-modal");
    this.#cancelButton = document.querySelector("#cancel");
    this.#submitButton = document.querySelector("#submit-book");
    this.displayBookList();
    this.initListeners();
  }

  initListeners() {
    this.#addBookButton.addEventListener("click", () => {
      console.log("working...");
      this.#bookModal.showModal();
    });

    this.#cancelButton.addEventListener("click", () => {
      this.#bookModal.close();
    });

    this.#submitButton.addEventListener("click", () => this.addBook());
  }

  addBook() {
    console.log("adding...");
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#author");
    let pageCount = document.querySelector("#page-count");
    let readStatus = document.querySelector("#read-status");
    this.#library.addBook(title, author, pageCount, readStatus);

    this.#bookModal.close();
    this.displayBookList();
  }

  //generate UI for books in list. Pass every book to a helper function
  //to make 'cards' to be displayed.
  displayBookList() {
    let books = this.#library.getBooks();
    console.log(books);
    books.forEach((element) => {
      this.#output.appendChild(element.title);
    });
  }
}

/*
class bookModal {

  //modal fields
  #titleInput
  #authorInput
  #pageInput 
  #readStatus

  constructor() {

  }
}*/

class Library {
  #books;

  constructor() {
    this.#books = [];
  }

  addBook(title, author, pageCount, readStatus) {
    this.#books.push(new Book(title, author, pageCount, readStatus));
  }

  getBooks() {
    return this.#books;
  }
}

class Book {
  #title;
  #author;
  #numPages;
  #read;

  constructor(title, author, numPages, read = false) {
    this.#title = title;
    this.#author = author;
    this.#numPages = numPages;
    this.#read = read;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get numPages() {
    return this.#numPages;
  }

  get read() {
    return this.#read;
  }

  toggleRead() {
    this.#read = !this.#read;
  }

  printVals() {
    console.log(this.name);
    console.log(this.author);
    console.log(this.numPages);
    console.log(this.read);
  }
}

let ui = new UI();
