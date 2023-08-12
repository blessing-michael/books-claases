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