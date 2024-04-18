const myLibrary = [];
const addBtn = document.querySelector("#add-book");
addBtn.addEventListener("click", () => {
    document.querySelector("#add-book-modal").showModal();
})



const submitBook = document.querySelector("#submit-book");
submitBook.addEventListener("click", () => {

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#author").value;
    const pageCount = document.querySelector("#page-count").value;

    if(/*checkForm()*/ true) {
        const aBook = new Book(title, author, pageCount);
        myLibrary.push(aBook);
        document.querySelector("#add-book-modal").close();
        displayBookList()
    }

})




function Book(title, author, noPages) {
    
    if(!(this instanceof Book) ) {
        throw Error("Error: Incorrect invocation");
    }

    this.title = title;
    this.author = author;
    this.noPages = noPages
    this.markRead = () => {
        this.read = true;
    }


    this.info = () => {
        return this.title + " by " + this.author + ", " + this.noPages + " pages, " 
        + (this.read ? "read" : "not read yet");
    }

    
}




for(let i = 0; i < 3; i++) {
    myLibrary.push(new Book(i, i, 200 + i * 100));

}



function displayBookList() {
    const output = document.querySelector(".book-display");
    output.textContent = ""
    let index = 0;
    myLibrary.forEach((book) => {
        //card for the book info
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index", index)
        const titleLabel = document.createElement("p");
        titleLabel.textContent = book.title;
        const authorLabel = document.createElement("p");
        authorLabel.textContent = "Author"
        const pagesLabel = document.createElement("p");
        pagesLabel.textContent = "400";
        const readStatus = document.createElement("p");

        const readBtn = document.createElement("button");
        readBtn.textContent = "Mark read";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", (e) => {
            let index = card.getAttribute("data-index");
            myLibrary.splice(index, 1);
            displayBookList();
        });
        deleteBtn.value = "Delete";
        card.appendChild(titleLabel);
        card.appendChild(authorLabel);
        card.appendChild(pagesLabel);
        card.appendChild(readBtn);
        card.appendChild(deleteBtn);
        output.appendChild(card);


        index++;
    });

}

displayBookList();