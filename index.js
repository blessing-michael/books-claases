
const listIcon = document.getElementById('list-button');
const bookForm = document.getElementById('form');
const contactIcon = document.querySelector('#contact-details');

const showbooklist = document.getElementById('list-allbooks');
const contacts = document.querySelector('#contact-box');
const addIcon = document.querySelector('#add-book');
const dateContainer = document.querySelector('#dates');
const currentDate = new Date(2023, 7, 10, 16, 55);


class BookObj {
  constructor() {
    this.books = this.getBooksFromLocalStorage();
  }

  saveBooksTolocalStorage = () => {
    localStorage.setItem('Books', JSON.stringify(this.books));
  };

  getBooksFromLocalStorage = () => {
    const books = localStorage.getItem('Books');
    return books ? JSON.parse(books) : [];
  };

  showBooks = () => {
    const bookBody = document.getElementById('table');
    bookBody.innerHTML = '';

    this.books.forEach((book, index) => {
      const showRow = `
      <tr>
        <td>${book.title} by ${book.author}</td>
        <td  class="text-end">
          <button class="button" onclick="bookManager.deleteBook(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
      bookBody.insertAdjacentHTML('beforeend', showRow);
    });
  };

  addBooks = (event) => {
    event.preventDefault();
    const bookname = document.getElementById('title').value.trim();
    const bookAuth = document.getElementById('author').value.trim();

    if (bookname && bookAuth) {
      const newBook = { title: bookname, author: bookAuth };
      this.books.unshift(newBook);
      this.saveBooksTolocalStorage();
      this.showBooks();

      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    }
  };

  deleteBook = (index) => {
    this.books.splice(index, 1);

    this.saveBooksTolocalStorage();
    this.showBooks();
  };

  handleFormSubmit = () => {
    document.getElementById('form').addEventListener('submit', this.addBooks);
  };

  handleAddButtonClick = () => {
    document
      .getElementById('add-button')
      .addEventListener('click', this.addBooks);
  };
}

const bookManager = new BookObj();

bookManager.handleFormSubmit();
bookManager.handleAddButtonClick();
bookManager.showBooks();


dateContainer.innerHTML = `
  <p>${currentDate}</p>
`;

function showBooklist() {
 
  bookForm.style.display = 'none';
  contacts.style.display = 'none';
  showbooklist.style.display = 'block';

}
function contactUs() {
 
  bookForm.style.display = 'none';
  contacts.style.display = 'block';
  showbooklist.style.display = 'none';
}

function showForm() {
  bookForm.style.display = 'block';
  contacts.style.display = 'none';
  showbooklist.style.display = 'none';
  
}

listIcon.addEventListener('click', showBooklist);
contactIcon .addEventListener('click', contactUs);
addIcon.addEventListener('click', showForm);