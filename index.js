import BookManager from './book_manager.js';
import DisplayBooks from './display_books.js';
import FormListener from './form_listener.js';
import Navigation from './navigation.js';

const bookManager = new BookManager();
const displayBooks = new DisplayBooks(bookManager.bookCollection);
displayBooks.display();
const formListener = new FormListener(bookManager);
formListener.addEventListener();
const navigation = new Navigation();
navigation.attachListeners();