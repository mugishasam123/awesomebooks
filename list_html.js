export default class ListHtml {
  constructor(book) {
    this.html = ` 
    <h3>${book.title}</h3>
    <h3>${book.author}</h3>
  <button id="${`button${book.index}`}">Remove</button>
`;
  }
}