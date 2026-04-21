const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", addBook);

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  if (title === "" || author === "" || !Number.isInteger(pages) || pages < 1) {
    alert("Please fill all fields!");
    return;
  }
  const book = new Book(title, author, pages, readCheckbox.checked);
  myLibrary.push(book);
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;
  render();
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function render() {
  const table = document.getElementById("display");
  // let tbody = table.tBodies[0] || table.createTBody();
  // console.log(tbody);
  //delete old table
  // tbody.replaceChildren();
  const rowsNumber = table.rows.length;
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeButton = document.createElement("button");
    changeButton.id = i;
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    const readStatus = myLibrary[i].isRead ? "Yes" : "No";
    changeButton.textContent = readStatus;

    changeButton.addEventListener("click", function () {
      myLibrary[i].isRead = !myLibrary[i].isRead;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");
    delButton.id = i;
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", function () {
      const deletedBook = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      confirm(`You've deleted title: ${deletedBook}`);
    });
  }
}
