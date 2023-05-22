import "../pages/conclusion.css";
import hamburger from "../scripts/hamburger-menu.js";

hamburger();

const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = formArr.filter((el) => el.hasAttribute("data-reg"));

validFormArr.forEach((el) => {
  el.setAttribute("is-valid", "0");
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  const isValid = reg.test(inputValue);
  el.setAttribute("is-valid", isValid ? "1" : "0");
  el.style.border = isValid
    ? "2px solid rgb(0, 196, 0)"
    : "2px solid rgb(255, 0, 0)";
}

function formCheck(e) {
  e.preventDefault();
  const allValid = validFormArr.map((el) => el.getAttribute("is-valid"));
  const isAllValid = allValid.every((isValid) => Boolean(Number(isValid)));
  if (!isAllValid) {
    alert("Заполните поля правильно!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    });

    if (response) {
      alert("Письмо отправлено");
      formReset();
    } else {
      throw new Error("Ошибка при отправке формы");
    }
  } catch (error) {
    alert("Произошла ошибка при отправке формы");
  }
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-valid", "0");
    el.style.border = "none";
  });
}
