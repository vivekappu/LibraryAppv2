let status = false;
const bookname = document.getElementById("bookname");
const author = document.getElementById("author");
const imageurl = document.getElementById("imageurl");
const genre = document.getElementById("genre");
const description = document.getElementById("description");
function insertValidClass(element) {
  element.classList.add("is-valid");
}
function removeValidClass(element) {
  element.classList.remove("is-valid");
}
function insertInValidClass(element) {
  element.classList.add("is-invalid");
}
function removeInValidClass(element) {
  element.classList.remove("is-invalid");
}
function cantBeEmptyMessage(element) {
  var feedback = document.querySelector(`#${element.id} ~ .invalid-feedback`);
  insertInValidClass(element);
  removeValidClass(element);
  feedback.innerText = "This can't be empty";
}
function insertMessage(element, message) {
  var feedback = document.querySelector(`#${element.id} ~ .invalid-feedback`);
  insertInValidClass(element);
  removeValidClass(element);
  feedback.innerText = message;
}
function successMessage(element) {
  var feedback = document.querySelector(`#${element.id} ~ .valid-feedback`);
  insertValidClass(element);
  removeInValidClass(element);
  feedback.innerText = "That's good!";
}
function isEmpty(element) {
  return !element.value.length;
}

function validateEveryField() {
  let booknamestatus,
    authorstatus,
    genrestatus,
    descriptionstatus,
    imageurlstatus;
  [
    booknamestatus,
    authorstatus,
    genrestatus,
    descriptionstatus,
    imageurlstatus,
  ] = [false, false, false, false, false];

  if (isEmpty(bookname)) {
    cantBeEmptyMessage(bookname);
    bookname.focus();
  } else {
    successMessage(bookname);
    booknamestatus = true;
  }
  if (isEmpty(author)) {
    cantBeEmptyMessage(author);
    author.focus();
  } else {
    successMessage(author);
    authorstatus = true;
  }
  if (isEmpty(genre)) {
    cantBeEmptyMessage(genre);
    genre.focus();
  } else {
    successMessage(genre);
    genrestatus = true;
  }
  if (isEmpty(description)) {
    cantBeEmptyMessage(description);
    description.focus();
  } else {
    successMessage(description);
    descriptionstatus = true;
  }
  if (isEmpty(imageurl)) {
    cantBeEmptyMessage(imageurl);
    imageurl.focus();
  } else {
    successMessage(imageurl);
    imageurlstatus = true;
  }
  console.log(
    booknamestatus,
    authorstatus,
    genrestatus,
    descriptionstatus,
    imageurlstatus
  );
  status =
    booknamestatus &&
    authorstatus &&
    genrestatus &&
    descriptionstatus &&
    imageurlstatus;
}

document.querySelector(".submit-btn").addEventListener("click", () => {
  validateEveryField();
});
function validate() {
  return status;
}

/*  post request*/

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(form);
  let posturl = document.getElementById("updatebtn").getAttribute("postto");
  let geturl = document.getElementById("deletebtn").getAttribute("getto");
  console.log(geturl);
  console.log(formData);
  console.log(e.submitter.id);

  if (e.submitter.id === "updatebtn") {
    if (validate()) {
      fetch(posturl, {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          alert(data.message);
          if (data.redirect) {
            window.location.href = "/books";
          }
        });
    }
  }
  if ((e.submitter.id === "deletebtn")) {
    console.log("here");
    fetch(geturl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.message);
        if (data.redirect) {
          window.location.href = "/books";
        }
      });
  }
});

/* image shown when selecting*/
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#imagefile").css("display", "block");
      $("#imagefile").attr("src", e.target.result).width(250).height(250);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
