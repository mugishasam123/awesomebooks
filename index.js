const getStorage = () => {
  const serializedObject = window.localStorage.getItem('books');
  const array = JSON.parse(serializedObject) || [];

  return array;
};
let bookCollection = getStorage() || [];
const bookListHtml = document.querySelector('.book-list');
const clear = () => {
  bookListHtml.innerHTML = '';
};
const listHtml = (book) => ` 
    <h3>${book.title}</h3>
    <h3>${book.author}</h3>
  <button id="${`button${book.index}`}">Remove</button>
`;
function displayBook(book) {
  const listInnerHtml = listHtml(book);

  const listNode = document.createElement('li');

  listNode.id = `book${book.index}`;
  listNode.innerHTML = listInnerHtml;
  listNode.appendChild(document.createElement('hr'));
  bookListHtml.appendChild(listNode);
}

const saveToLocalStorage = (bookCollection) => {
  const stringObject = JSON.stringify(bookCollection);
  window.localStorage.setItem('books', stringObject);
};
const hideListItem = (book) => {
  const li = document.querySelector(`#book${book.index}`);
  li.classList.add('hidden');
};
function attachRemoveMethod(book) {
  const button = document.querySelector(`#${`button${book.index}`}`);

  button.addEventListener('click', () => {
   
    bookCollection = bookCollection.filter((bookGot) => bookGot.index !== book.index);
    saveToLocalStorage(bookCollection);
    hideListItem(book);
  });
}
const rerender = () => {
  clear();
  bookCollection.forEach(displayBook);
  bookCollection.forEach(attachRemoveMethod);
};

const add = (book) => {
  book.index = (bookCollection.length === 0) ? 0
    : bookCollection[bookCollection.length - 1].index + 1;

  bookCollection.push(book);
  rerender();
  saveToLocalStorage(bookCollection);
};

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  const formData = new FormData(form);
  event.preventDefault();
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });

  add(object);
});

rerender();
