import "@babel/polyfill";
import "normalize.css";
import "./index.scss";
import telecoms from "./data/telecoms";
import termslist from "./data/termslist";

let isValidTelecom = false;
let isValidPhone = false;
let isValidIdNumber = false;
let isValidName = false;
let isValidTermsAgree = false;

window.onload = function () {
  const inputName = document.getElementById("input-name");
  inputName.addEventListener("keyup", checkInputName);

  const inputIdNumber = document.getElementById("input-id-number");
  inputIdNumber.onkeyup = function () {
    this.value = checkInputIdNumber(this.value);
    isValidIdNumber = false;
    // 주민등록번호 6+1자리 입력 후, 이름으로 이동
    if (this.value.length === 8) {
      isValidIdNumber = true;
      inputName.focus();
    }
  };

  const inputPhone = document.getElementById("input-phone");
  inputPhone.onkeyup = function () {
    this.value = checkInputPhone(this.value);

    // 휴대폰 번호 11자리 입력 후, 주민등록번호로 이동
    if (this.value.length === 13) {
      inputIdNumber.focus();
    }
  };

  inputPhone.onblur = function () {
    const pattern = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!pattern.test(this.value)) {
      isValidPhone = false;
      validationError(this.parentElement);
    }
    isValidPhone = true;
  };

  const selectTelecom = this.document.getElementById("select-telecom");
  for (let telecom of telecoms) {
    let option = document.createElement("option");
    option.text = telecom.description;
    option.value = telecom.code;
    selectTelecom.add(option);
  }
  selectTelecom.onchange = function () {
    const selectedValue = selectTelecom.options[selectTelecom.selectedIndex].value;

    // 통신사 선택 후, 휴대폰 번호로 이동
    if (selectedValue !== "") {
      isValidTelecom = true;
      inputPhone.focus();
    }
    isValidTelecom = false;
  };

  // 약관 목록
  // 전체 동의
  const allAgreeCheckbox = document.getElementById("agree-all");
  allAgreeCheckbox.onclick = function () {
    var checkboxes = document.querySelectorAll('input[name="agree"]');
    for (var checkbox of checkboxes) {
      checkbox.checked = this.checked;
    }
  };

  // 체크 확인
  function isChecked(checkbox) {
    return checkbox.checked;
  }
  const termsList = document.querySelector("#terms-list");
  for (let terms of termslist) {
    const { termsId, title, required } = terms;
    const item = `
      <div class="item-check">
        <input type="checkbox" id="agree-${termsId}" name="agree" ${required && `required`} />
        <label for="agree-${termsId}">
            ${title}
        </label>
      </div>`;
    let html = new DOMParser().parseFromString(item, "text/html");
    termsList.append(html.body.firstChild);
  }
  termsList.onclick = function (ev) {
    // 전체 동의 확인
    const checkBoxes = document.querySelectorAll('input[name="agree"]');
    const checkBoxesArray = Array.prototype.slice.call(checkBoxes);
    if (checkBoxesArray.every(isChecked)) {
      allAgreeCheckbox.checked = true;
    } else {
      allAgreeCheckbox.checked = false;
    }
  };

  const form = document.getElementById("phone-identification-form");
  form.onsubmit = function () {};
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
    isValidName = true;
    validationSuccess(inputGroup);
    return true;
  } else {
    isValidName = false;
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

// 휴대폰 번호
function checkInputPhone(value) {
  // 숫자만 입력 가능
  value = value.replace(/[^0-9]/g, "");

  // format 적용
  if (value.length < 4) {
    return value;
  } else if (value.length < 7) {
    return `${value.substr(0, 3)} ${value.substr(3)}`;
  } else if (value.length < 11) {
    return `${value.substr(0, 3)} ${value.substr(3, 3)} ${value.substr(6)}`;
  } else {
    return `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
  }
}

function validationError(inputGroup) {
  inputGroup.classList.add("validation-error");
}

function validationSuccess(inputGroup) {
  inputGroup.classList.remove("validation-error");
}
