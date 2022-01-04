
function Book(title,author,index){
    this.index = index;
    this.title = title;
    this.author = author;
    this.remove = ()=>{
        console.log(bookCollection)
       bookCollection = bookCollection.filter((book)=>book.index!==this.index)
       console.log(bookCollection)
       saveToLocalStorage(bookCollection);
       const bookHtml = document.querySelector(`#book${this.index}`)
       bookHtml.className = 'hidden'
    }
   
}

const bookFromObject = (object)=>{
    let book = new Book(object.title,object.author,object.index)
    return book;

}
const saveToLocalStorage = (array)=>{
    const serializedObject = JSON.stringify(array);
    window.localStorage.setItem('books',serializedObject)
}
const BookFromStorage = (object)=> Book(object.title,object.author,object.index);
const getStorage = ()=>{
    const serializedObject =  window.localStorage.getItem('books');
    let array =  JSON.parse(serializedObject) || [];
    
   return array.map(bookFromObject)
 }

let bookCollection = getStorage()|| []





const createButton = (book)=>{
    let button = document.createElement('button');
    button.addEventListener('click',()=>{
        book.remove()
    })
    button.textContent = 'Remove';
   
    return button;
}


function displayBook(book) {
    console.log(book)
    let listInnerHtml = listHtml(book);
    const listNode = document.createElement('li');
    
    listNode.id = `book${book.index}`
    listNode.innerHTML = listInnerHtml;
    listNode.appendChild(createButton(book))
    listNode.appendChild(document.createElement('hr'))

    bookListHtml.appendChild(listNode);
}

const add = (object)=>{ 
    object.index =(bookCollection.length===0)?0: bookCollection[bookCollection.length-1].index+1;
    const book = bookFromObject(object);
    
    bookCollection.push(book);
     displayBook(book);
    saveToLocalStorage(bookCollection);
}

const form = document.querySelector('.form');
let formData = new FormData(form)

form.addEventListener('submit',(event)=>{
    let formData = new FormData(form);
    event.preventDefault();
    const object = {};
   formData.forEach((value,key)=>{
       object[key] = value; 
   })   
   
   add(object);
   


})


const listHtml = (book = new Book(),index)=>{
    return ` 
    <h3>${book.title}</h3>
    <h3>${book.author}</h3>
`
}

const bookListHtml = document.querySelector('.book-list');

bookCollection.forEach(book=>{
    displayBook(book);
})




