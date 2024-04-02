const myLibrary = [];

function Book(title, author, noPages) {
    
    if(!(this instanceof Book) ) {
        throw Error("Error: Incorrect invocation");
    }

    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.read = false;

    this.markRead = () => {
        this.read = true;
    }

    this.info = () => {
        return this.title + " by " + this.author + ", " + this.noPages + " pages, " 
        + (this.read ? "read" : "not read yet");
    }
}

