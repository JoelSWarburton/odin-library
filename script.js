

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
      this.clearModalFields();
    });

    this.#submitButton.addEventListener("click", () => this.addBook());
  }

  addBook() {
    console.log("adding...");
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#author").value;
    let pageCount = document.querySelector("#page-count").value;
    let readStatus = document.querySelector("#read-status").checked;
    
    //only allow if name, author and page count is entered.
    if(title != "" && author != "" && pageCount != "") {
      this.#library.addBook(title, author, pageCount, readStatus);
      this.#bookModal.close();
      this.clearModalFields();
      this.displayBookList();
    }
  }

  //generate UI for books in list. Pass every book to a helper function
  //to make 'cards' to be displayed.
  displayBookList() {
    //clear list
    this.#output.textContent = "";

    let books = this.#library.getBooks();
    console.log(books);
    let index = 0;

    books.forEach((element) => {
      const bookCard = this.makeBookCard(element, index);
      
      this.#output.appendChild(bookCard);
      index++;
    });
  }

  makeBookCard(book, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", index);
    const titleLabel = document.createElement("p");
    titleLabel.textContent = book.title;
    const authorLabel = document.createElement("p");
    authorLabel.textContent = book.author;
    const pagesLabel = document.createElement("p");
    pagesLabel.textContent = book.numPages;

    const readLabel = document.createElement("p");
    readLabel.textContent = book.read;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";


    deleteBtn.addEventListener("click", (e) => {
      if (confirm("You are about to delete a book!\nAre you sure?") == true) {
        let index = card.getAttribute("data-index");
        this.#library.removeBook(index);
        this.displayBookList();
      }
    });

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-button");
    readBtn.textContent = book.read ? "Mark Unread" : "Mark Read";

    readBtn.addEventListener("click", () => {
      let index = card.getAttribute("data-index");
      this.#library.toggleRead(index);
      this.displayBookList();
    });




    card.appendChild(titleLabel);
    card.appendChild(authorLabel);
    card.appendChild(pagesLabel);
    card.appendChild(readLabel);
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("card-buttons");

    buttonDiv.appendChild(readBtn);
    buttonDiv.appendChild(deleteBtn);
    card.appendChild(buttonDiv);

    return card;
  }

  clearModalFields() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#page-count").value = "";
    document.querySelector("#read-status").checked =false;
  }
}

/*
 //implement a class for the modal so the logic is all contained
 //TODO

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

  toggleRead(index) {
    this.#books[index].toggleRead();
  }

  removeBook(index) {
    this.#books.splice(index, 1);
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
