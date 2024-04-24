const field_name = document.querySelector("#name");
const prenom = document.querySelector("#prenom");
const submit = document.querySelector("#submit");
const mail = document.querySelector("#mail");
const check = document.querySelector("#check");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log({ g: field_name.value });
  const field_name_value = field_name.value;
  const field_name_length = field_name_value.length;
  const error_name = document.querySelector("#name+span");
  if (field_name_length < 2 || field_name_length > 13) {
    error_name.innerHTML =
      "Votre nom doit étre compris entre 2 et 13 caractéres";
    field_name.classList.add("error");
  } else {
    error_name.innerHTML = "";
    field_name.classList.remove("error");
  }
  verifymail();
  verifycheck();
  verifypass();
});
mail.addEventListener("keyup", () => {
  verifymail();
});
const pass1 = document.querySelector("#confirm_pass");
pass1.addEventListener("keyup", () => {
  verifypass();
});

function verifymail() {
  const error_mail = document.querySelector("#mail+span");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mail.value.trim() === "") {
    error_mail.innerHTML = "Veuillez indiquer une adresse mail ";
    mail.classList.add("error");
    return;
  }
  if (!emailRegex.test(mail.value)) {
    error_mail.innerHTML = "Veuillez respecter le format mail ";
    mail.classList.add("error");
  } else {
    error_mail.innerHTML = "";
    mail.classList.remove("error");
  }
}
function verifycheck() {
  const error_check = document.querySelector(".form-group-inline span");
  if (!check.checked) {
    error_check.innerHTML = "Veuillez accepter les termes et conditions";
    return;
  }
  error_check.innerHTML = "";
}

function verifypass() {
  const pass = document.querySelector("#pass");
  const pass1 = document.querySelector("#confirm_pass");
  const error_pass = document.querySelector("#confirm_pass+span");
  if (pass.value.trim() == "") {
    error_pass.innerHTML = "Veuillez insérer un mot de passe";
    pass.classList.add("error");
    return;
  }
  if (pass.value !== pass1.value) {
    error_pass.innerHTML = "les mots de passe ne sont pas identiques";
    pass.classList.add("error");
    pass1.classList.add("error");
    return;
  }
  error_pass.innerHTML = "";
  pass.classList.remove("error");
  pass1.classList.remove("error");
}


