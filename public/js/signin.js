let status = false; //validation status
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/; ///6+ atleast 1 number , 1 special character
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
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
function validateField(regex, input) {
  return regex.test(input);
}
function validator(event, regex) {
  switch (event.target.id) {
    case "inputEmail":
      if (validateField(emailRegex, event.target.value)) {
        successMessage(event.target);
      } else {
        insertMessage(event.target, "please enter a valid Email");
      }
      break;
    case "inputPassword":
      if (validateField(passwordRegex, event.target.value)) {
        successMessage(event.target);
      } else {
        insertMessage(
          event.target,
          "please enter a valid Password( 6 or greater,atleast 1 number and special character)"
        );
      }
      break;
    default:
  }
}

function validateEveryField() {
  let emailStatus, passwordStatus;
  [emailStatus, passwordStatus] = [false, false];

  if (isEmpty(inputPassword)) {
    cantBeEmptyMessage(inputPassword);
    inputPassword.focus();
  } else if (!validateField(passwordRegex, inputPassword.value)) {
    insertMessage(inputPassword, "please enter a valid password");
  } else {
    passwordStatus = true;
  }
  if (isEmpty(inputEmail)) {
    cantBeEmptyMessage(inputEmail);
    inputEmail.focus();
  } else if (!validateField(emailRegex, inputEmail.value)) {
    insertMessage(inputEmail, "please enter a valid email");
  } else {
    emailStatus = true;
  }
  status = emailStatus && passwordStatus;
  console.log(status);
}
inputPassword.addEventListener("input", (e) => validator(e, passwordRegex));
inputEmail.addEventListener("input", (e) => validator(e, emailRegex));
document.querySelector(".submit-btn").addEventListener("click", () => {
    validateEveryField();
  });
function validate() {
  return status;
}
