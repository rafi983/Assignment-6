// selecting dom elements

const booksContainer = document.getElementById("books-container");
const spinner = document.getElementById("spinner");
const errorDiv = document.getElementById("error-message");
const resultsFound = document.getElementById("results-found");
const bookImage = document.getElementById("book-image");

// Searching books

const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;

  if (searchFieldText === "") {
    errorDiv.innerText = "Search field cannot be empty.";

    booksContainer.innerHTML = "";
    resultsFound.innerText = "";

    return;
  }

  booksContainer.innerHTML = "";
  resultsFound.innerText = "";
  errorDiv.innerText = "";

  const url = `https://openlibrary.org/search.json?q=${searchFieldText}`;

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

// load and display all matched books in UI

const loadBook = (books) => {
  if (books.numFound === 0) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  }

  const allBooks = books.docs;

  if (books.numFound > 0) {
    resultsFound.innerText = `Total results found: ${books.numFound}`;
  }

  allBooks.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("col");

    if (!book.cover_i) {
      return;
    }

    bookDiv.innerHTML = `
      <div class="card h-100 rounded-2 p-3 shadow-lg" id="card">   
            <div>
            <img id="book-image" src = "https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-M.jpg" >  

              <h4><span class="fw-bolder">Book:</span> ${
                book.subject ? book.subject[0] : book.title
              }</h4>   

              <h5><span class="fw-bolder">Author Name:</span> ${
                book.author_name ? book.author_name[0] : "A well Known writer"
              }</h5>   

              <h5><span class="fw-bolder">Publisher:</span> ${
                book.publisher ? book.publisher[0] : "No publisher found"
              }</h5>

              <h5><span class="fw-bolder">First Published Year:</span> ${
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

//================================ End of Js=============================== //
