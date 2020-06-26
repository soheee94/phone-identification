import "@babel/polyfill";
import "normalize.css";
import "./index.scss";

window.onload = function () {
  const inputName = document.getElementById("input-name");
  inputName.addEventListener("keyup", checkInputName);

  const inputIdNumber = document.getElementById("input-id-number");
  inputIdNumber.onkeyup = function () {
    this.value = checkInputIdNumber(this.value);
  };
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

// 주민등록번호
function checkInputIdNumber(value) {
  // 숫자만 입력 가능
  value = value.replace(/[^0-9]/g, "");

  // format 적용 (생년월일6자리-뒷자리1자리)
  if (value.length < 7) {
    return value;
  } else {
    return `${value.substr(0, 6)}-${value.substr(6)}`;
  }
}

function validationError(inputGroup) {
  inputGroup.classList.add("validation-error");
}

function validationSuccess(inputGroup) {
  inputGroup.classList.remove("validation-error");
}
