let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
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
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    pagesInput.value === ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.checked
    );
    myLibrary.push(book);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readCheckbox.checked = false;
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeButton = document.createElement("button");
    changeButton.id = i;
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    let readStatus = myLibrary[i].check ? "Yes" : "No";
    changeButton.textContent = readStatus;

    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    delButton.id = i;
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
