import ListHtml from "./list_html.js";
import LocalStorageManager from "./local_storage.js";

export default class DisplayBooks {

    constructor(bookCollection) {
        this.bookCollection = bookCollection;
        const ulNode= document.querySelector('.book-list');
        this.bookListHtml  = ulNode;
        
    }
    #clear=()=> {
        this.bookListHtml.innerHTML = '';
    }
    

    #displayBook=(book) =>{
        
        let listInnerHtml =(new ListHtml(book)).html;
        console.log(listInnerHtml)
        const listNode = document.createElement('li');

        listNode.id = `book${book.index}`;
        listNode.innerHTML = listInnerHtml;
        listNode.appendChild(document.createElement('hr'));
        this.bookListHtml.appendChild(listNode);
    }
    #hideListItem=(book) =>{
        const li = document.querySelector(`#book${book.index}`);
        li.classList.add('hidden');
    }
    #attachRemoveMethod=(book) =>{
        const button = document.querySelector(`#${`button${book.index}`}`);
        button.addEventListener('click', () => {
            this.bookCollection = this.bookCollection.filter((bookGot) => bookGot.index !== book.index);
            this.#saveToLocalStorage(this.bookCollection);
            this.#hideListItem(book);
        });
    }
    #saveToLocalStorage=(bookCollection)=> {
        let storageManager = new LocalStorageManager(bookCollection)
        storageManager.save();
    }
    display=()=> {
        this.#clear();
        this.bookCollection.forEach(this.#displayBook);
        this.bookCollection.forEach(this.#attachRemoveMethod);
    }
}
