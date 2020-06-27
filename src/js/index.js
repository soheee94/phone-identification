import "@babel/polyfill";
import "normalize.css";
import "../style/index.scss";
import Input from "./input";
import { nameValidation, phoneValidation } from "./inputValidation";
import { registerNumberFormat, phoneFormat } from "./inputFormat";
import { getCarriersData, getTermsListData } from "./getData";
import { checkFormValidation, submitForm } from "./form";

window.onload = function () {
  // --------- input
  const phoneInput = document.getElementById("phone");
  const registerNumberInput = document.getElementById("registerNumber");
  const nameInput = document.getElementById("name");

  const phone = new Input(phoneInput, phoneValidation, phoneFormat, registerNumberInput);
  phone.registerListener();

  const registerNumber = new Input(registerNumberInput, null, registerNumberFormat, nameInput);
  registerNumber.registerListener();

  const name = new Input(nameInput, nameValidation);
  name.registerListener();

  // --------- 통신사
  const carrierCodeSelect = document.getElementById("carrierCode");
  // 통신사 데이터 불러오기
  getCarriersData(carrierCodeSelect);
  // 통신사 선택 이벤트
  carrierCodeSelect.onchange = function () {
    const selectedValue = carrierCodeSelect.options[carrierCodeSelect.selectedIndex].value;
    checkFormValidation();
    // 통신사 선택 후, 휴대폰 번호로 이동
    if (selectedValue !== "") {
      phoneInput.focus();
    }
  };

  // ------- 약관 목록
  const termsList = document.querySelector("#terms-list");
  // 약관 목록 데이터 불러오기
  getTermsListData(termsList);

  // 전체 동의
  const allTermsCheckbox = document.getElementById("terms-all");
  allTermsCheckbox.onclick = function () {
    const checkboxes = document.querySelectorAll('input[name="terms"]');
    for (let checkbox of checkboxes) {
      checkbox.checked = this.checked;
    }
    checkFormValidation();
  };

  // 약관 동의 선택
  termsList.onclick = function () {
    const checkBoxes = document.querySelectorAll('input[name="terms"]');
    const checkBoxesArray = Array.prototype.slice.call(checkBoxes);
    checkFormValidation();
    // 전체 동의 자동 선택
    allTermsCheckbox.checked = checkBoxesArray.every(isChecked);
  };

  // form
  const form = document.getElementById("phone-identification-form");
  form.onsubmit = e => submitForm(e);
};

// 체크 확인
function isChecked(checkbox) {
  return checkbox.checked;
}
