const myLibrary = [];
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
    document.querySelector("#add-book-modal").close();
    displayBookList();
  }
});

const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  document.querySelector("#add-book-modal").close();
});

function checkForm(title, author, pageCount) {
  if (title != "" && author != "" && pageCount != "") {
    return true;
  }
  return false;
}

/* Book constructor */
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

for (let i = 0; i < 3; i++) {
  myLibrary.push(new Book(i, i, 200 + i * 100));
}

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
displayBookList();
