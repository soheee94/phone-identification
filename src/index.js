import "@babel/polyfill";
import "normalize.css";
import "./index.scss";

window.onload = function () {
  const inputName = document.getElementById("input-name");
  inputName.addEventListener("keyup", checkInputName);
};

const check_num = /[0-9]/; // 숫자
const check_eng = /[a-zA-Z]/; // 문자
const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

function checkInputName() {
  const value = event.target.value;
  const input = event.target;
  const inputGroup = event.target.parentElement;

  // 글자수 제한
  if (value.length > input.getAttribute("maxlength")) {
    event.target.value = value.substr(0, input.getAttribute("maxlength"));
  }

  // 유효성검사
  if (
    value === "" ||
    (check_kor.test(value) &&
      !check_num.test(value) &&
      !check_eng.test(value) &&
      !check_spc.test(value))
  ) {
    validationSuccess(inputGroup);
    return true;
  } else {
    validationError(inputGroup);
    return false;
  }
}

function validationError(inputGroup) {
  inputGroup.classList.add("validation-error");
}

function validationSuccess(inputGroup) {
  inputGroup.classList.remove("validation-error");
}
