//validate username simple just check if feild is not empty
//validate email using regex
//age should be filled with something
//country should be filled etc..
let status = false; //validation status
// only space and alphabets allowed
const nameRegex = /^[a-zA-Z ]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/; ///6+ atleast 1 number , 1 special character
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const DOB = document.querySelector("#birthDate");
const gender = document.querySelector("#gender");
const country = document.querySelector("#country");
const terms = document.querySelector("#terms");

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

function validator(event, regex) {
  console.log(event.target.id);

  switch (event.target.id) {
    case "name":
      if (validateField(nameRegex, event.target.value)) {
        successMessage(event.target);
      } else {
        insertMessage(
          event.target,
          "please enter a valid username(only alphabet and space allowed)"
        );
      }
      break;
    case "email":
      if (validateField(emailRegex, event.target.value)) {
        successMessage(event.target);
      } else {
        insertMessage(event.target, "please enter a valid Email");
      }
      break;
    case "password":
      if (validateField(passwordRegex, event.target.value)) {
        successMessage(event.target);
      } else {
        insertMessage(
          event.target,
          "please enter a valid Password( 6 or greater,atleast 1 number and special character)"
        );
      }
      break;
    case "gender":
      if (isRadioChecked()) {
        successMessage(gender);
      }
      break;
    case "birthDate":
      if (!isEmpty(DOB)) {
        successMessage(event.target);
      }
      break;
    case "country":
      successMessage(event.target);
      break;
    case "terms":
      if (event.target.checked) {
        successMessage(event.target.parentNode);
      } else {
        insertMessage(event.target.parentNode, "please agree to our terms");
      }
      break;
    default:
  }
}
/*event listeners */
inputName.addEventListener("input", (e) => validator(e, nameRegex));
inputEmail.addEventListener("input", (e) => validator(e, emailRegex));
inputPassword.addEventListener("input", (e) => validator(e, passwordRegex));
gender.addEventListener("change", (e) => validator(e, ""));
DOB.addEventListener("input", (e) => validator(e, ""));
country.addEventListener("change", (e) => validator(e, ""));
terms.addEventListener("change", (e) => validator(e, ""));
// function validateName(input){
//   if(input.value===""){
//      cantBeEmptyMessage(inputName);
//   }KKKKKKC
//   else{
//     if(validateField(nameRegex,input.value)){
//       successMessage(inputName);
//     }
//   }
//   return false;
// }

function validateField(regex, input) {
  return regex.test(input);
}
function isEmpty(element) {
  return !element.value.length;
}
/*function to get radiobtnvalue*/
function isRadioChecked() {
  // get list of radio buttons with specified name
  var radios = document.querySelectorAll('input[type="radio"]');
  // loop through list of radio buttons
  for (var i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      // radio checked?
      // if so, hold its value in val
      return true; // and break out of for loop
    }
  }
  return false; // return value of checked radio or undefined if none checked
}

function validateEveryField() {
  let nameStatus,
    emailStatus,
    passwordStatus,
    DOBStatus,
    genderStatus,
    termsStatus;
  [
    nameStatus,
    emailStatus,
    passwordStatus,
    DOBStatus,
    genderStatus,
    termsStatus,
  ] = [false, false, false, false, false, false];

  if (!terms.checked) {
    insertMessage(terms.parentNode, "Please agree to our terms");
    terms.focus();
  } else {
    termsStatus = true;
  }
  if (!isRadioChecked()) {
    insertMessage(gender, "Please select any");
    gender.focus();
  } else {
    genderStatus = true;
  }
  if (isEmpty(DOB)) {
    cantBeEmptyMessage(DOB);
    DOB.focus();
  } else {
    DOBStatus = true;
  }
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
  if (isEmpty(inputName)) {
    cantBeEmptyMessage(inputName);
    inputName.focus();
  } else if (!validateField(nameRegex, inputName.value)) {
    insertMessage(inputName, "please enter a valid Name");
  } else {
    nameStatus = true;
  }

  status =
    nameStatus &&
    emailStatus &&
    passwordStatus &&
    DOBStatus &&
    genderStatus &&
    termsStatus;
  console.log(status);
}
document.querySelector(".submit-btn").addEventListener("click", () => {
  validateEveryField();
});

function validate() {
  return status;
}
