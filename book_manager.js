class BookManager {
    constructor() {
        let storageManager = new StrorageManager();

        this.bookCollection = storageManager.retrieve() || [];

    }
    saveToLocalStorage(bookCollection) {
        const storageManager = new StorageManager(bookCollection);
        storageManager.save();

    }


    rerender() {
        const displayBooks = new DisplayBooks(bookManager.bookCollection);
        displayBooks.display();

    }
    add(book) {
        book.index = (this.bookCollection.length === 0) ? 0
            : this.bookCollection[this.bookCollection.length - 1].index + 1;

        this.bookCollection.push(book);
        this.rerender();
        this.saveToLocalStorage(this.bookCollection);
    }


}

class StrorageManager {
    constructor(bookCollection) {
        this.bookCollection = bookCollection;
    }
    save() {
        const stringObject = JSON.stringify(this.bookCollection);
        window.localStorage.setItem('books', stringObject);
    }
    retrieve() {
        const serializedObject = window.localStorage.getItem('books');
        const array = JSON.parse(serializedObject) || [];
        return array;
    }
}

class DisplayBooks {

    constructor(bookCollection) {
        this.bookCollection = bookCollection
        this.bookListHtml = document.querySelector('.book-list');
    }
    clear() {
        this.bookListHtml.innerHTML = '';
    }
    listHtml=(book) => ` 
    <h3>${book.title}</h3>
    <h3>${book.author}</h3>
  <button id="${`button${book.index}`}">Remove</button>
`;

    displayBook(book) {
        let listInnerHtml = this.listHtml(book);

        const listNode = document.createElement('li');

        listNode.id = `book${book.index}`;
        listNode.innerHTML = listInnerHtml;
        listNode.appendChild(document.createElement('hr'));
        bookListHtml.appendChild(listNode);
    }
    hideListItem(book) {
        const li = document.querySelector(`#book${book.index}`);
        li.classList.add('hidden');
    };
    attachRemoveMethod(book) {
        const button = document.querySelector(`#${`button${book.index}`}`);
        button.addEventListener('click', () => {
            this.bookCollection = this.bookCollection.filter((bookGot) => bookGot.index !== book.index);
            this.saveToLocalStorage(this.bookCollection);
            this.hideListItem(book);
        });
    }
    saveToLocalStorage(bookCollection) {
        let storageManager = new StrorageManager(bookCollection)
        storageManager.save();
    }
    display() {
        this.clear();
        this.bookCollection.forEach(this.displayBook);
        this.bookCollection.forEach(this.attachRemoveMethod);
    }
}

const bookManager = new BookManager();
const displayBooks = new DisplayBooks(bookManager.bookCollection)
displayBooks.display()

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    const formData = new FormData(form);
    event.preventDefault();
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    bookManager.add(object)
});
