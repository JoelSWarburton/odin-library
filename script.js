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
  output.textContent = "";
  let index = 0;
  myLibrary.forEach((book) => {
    //card for the book info
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", index);
    const titleLabel = document.createElement("p");
    titleLabel.textContent = "Title: " + book.title;
    const authorLabel = document.createElement("p");
    authorLabel.textContent = "Author: " + book.author;
    const pagesLabel = document.createElement("p");
    pagesLabel.textContent = "Pages: " + book.noPages;

    const readStatus = document.createElement("p");
    readStatus.textContent = book.read;

    const readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Mark Unread" : "Mark Read";

    readBtn.addEventListener("click", () => {
      let index = card.getAttribute("data-index");
      myLibrary[index].toggleRead();
      displayBookList();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      if (confirm("You are about to delete a book!\nAre you sure?") == true) {
        let index = card.getAttribute("data-index");
        myLibrary.splice(index, 1);
        displayBookList();
      }
    });

    card.appendChild(titleLabel);
    card.appendChild(authorLabel);
    card.appendChild(pagesLabel);
    card.appendChild(readStatus);
    card.appendChild(readBtn);
    card.appendChild(deleteBtn);
    output.appendChild(card);

    index++;
  });
}

displayBookList();
