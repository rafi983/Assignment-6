const booksContainer = document.getElementById("books-container");
const spinner = document.getElementById("spinner");
const errorDiv = document.getElementById("error-message");
const resultsFound = document.getElementById("results-found");

const searchBook = async () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;

  if (searchFieldText === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }

  booksContainer.innerHTML = "";

  const url = `http://openlibrary.org/search.json?q=${searchFieldText}`;

  spinner.classList.remove("d-none");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.classList.add("d-none");
      loadBook(data);
    })
    .finally(() => {
      searchField.value = "";
    });
};

const loadBook = (books) => {
  if (books.numFound === 0) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  }

  const allBooks = books.docs;

  allBooks.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("col");

    bookDiv.innerHTML = `
      <div class="card h-100 rounded-2 p-3 shadow-lg" id="card">   
            <div>
            <img src = "https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-M.jpg">
                
              <h5>Book: ${book.subject ? book.subject[0] : "A book"}</h5>   
              <h5>Author Name: ${
                book.author_name ? book.author_name[0] : "A well Known writer"
              }</h5>   
              <h5>Publisher: ${
                book.publisher ? book.publisher[0] : "No publisher found"
              }</h5>
              <h5>First Published Year: ${
                book.first_publish_year
                  ? book.first_publish_year
                  : "Unknown Year"
              }</h5>
            </div>
       </div>
    `;

    booksContainer.appendChild(bookDiv);
  });
};
