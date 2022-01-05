class BookManager {
    constructor() {

        this.bookCollection = LocalStorageManager.retrieve() || [];

    }
    saveToLocalStorage=(bookCollection)=> {
        const storageManager = new LocalStorageManager(bookCollection);
        storageManager.save();

    }
    getFromLocalStorage=()=>   LocalStorageManager.retrieve();

  


    rerender=()=> {
        const displayBooks = new DisplayBooks(bookManager.bookCollection);
        displayBooks.display();

    }
    add=(book) =>{
      let bookCollectionGot =  this.getFromLocalStorage();
        book.index = (bookCollectionGot.length === 0) ? 0
            : bookCollectionGot[bookCollectionGot.length - 1].index + 1;


        bookCollectionGot.push(book);
        this.bookCollection = bookCollectionGot;
        this.rerender();
        this.saveToLocalStorage(this.bookCollection);
    }


}

class LocalStorageManager {
    constructor(bookCollection) {
        this.bookCollection = bookCollection;
    }
    save=()=> {
        const stringObject = JSON.stringify(this.bookCollection);
        window.localStorage.setItem('books', stringObject);
    }
   static retrieve=()=> {
        const serializedObject = window.localStorage.getItem('books');
        const array = JSON.parse(serializedObject) || [];
        return array;
    }
}

class ListHtml {
    constructor(book){
       this.html =  ` 
    <h3>${book.title}</h3>
    <h3>${book.author}</h3>
  <button id="${`button${book.index}`}">Remove</button>
`

    }
}

class DisplayBooks {

    constructor(bookCollection) {
        this.bookCollection = bookCollection;
        const ulNode= document.querySelector('.book-list');
        this.bookListHtml  = ulNode;
    }
    clear=()=> {
        this.bookListHtml.innerHTML = '';
    }
    

    displayBook=(book) =>{
        
        let listInnerHtml =(new ListHtml(book)).html;
        console.log(listInnerHtml)
        const listNode = document.createElement('li');

        listNode.id = `book${book.index}`;
        listNode.innerHTML = listInnerHtml;
        listNode.appendChild(document.createElement('hr'));
        this.bookListHtml.appendChild(listNode);
    }
    hideListItem=(book) =>{
        const li = document.querySelector(`#book${book.index}`);
        li.classList.add('hidden');
    }
    attachRemoveMethod=(book) =>{
        const button = document.querySelector(`#${`button${book.index}`}`);
        button.addEventListener('click', () => {
            this.bookCollection = this.bookCollection.filter((bookGot) => bookGot.index !== book.index);
            this.saveToLocalStorage(this.bookCollection);
            this.hideListItem(book);
        });
    }
    saveToLocalStorage=(bookCollection)=> {
        let storageManager = new LocalStorageManager(bookCollection)
        storageManager.save();
    }
    display=()=> {
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
