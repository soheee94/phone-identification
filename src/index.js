import "@babel/polyfill";
import "normalize.css";
import "./index.scss";
import carriers from "./data/carriers";
import termslist from "./data/termslist";

class Input {
  constructor(inputNode, validityCheck, format, nextInputNode) {
    this.inputNode = inputNode;
    this.validityCheck = validityCheck;
    this.format = format;
    this.nextInputNode = nextInputNode;
  }

  registerListener() {
    const input = this;
    this.inputNode.addEventListener("blur", function () {
      isAllValid();
      const value = this.value;
      const inputGroup = this.parentElement;
      // 유효성 검사
      if (input.validityCheck) {
        if (!input.validityCheck(value)) {
          validationError(inputGroup);
          this.setCustomValidity("다시 입력해주세요.");
        } else {
          validationSuccess(inputGroup);
          this.setCustomValidity("");
        }
      }
    });

    this.inputNode.addEventListener("keyup", function () {
      isAllValid();
      const value = this.value;

      // format
      if (input.format) {
        this.value = input.format(value);
      }
      // 다음 input 으로 포커스
      const maxlength = this.getAttribute("maxlength");
      if (value.length >= maxlength) {
        // event.target.value = value.substr(0, maxlength);
        if (input.nextInputNode) input.nextInputNode.focus();
      }
    });
  }
}

window.onload = function () {
  // --------- input
  const phoneInput = document.getElementById("phone");
  const registerNumberInput = document.getElementById("registerNumber");
  const nameInput = document.getElementById("name");

  // --------- 유효성 검사
  const nameValidation = function (value) {
    const check_num = /[0-9]/; // 숫자
    const check_eng = /[a-zA-Z]/; // 문자
    const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    return (
      value === "" ||
      (check_kor.test(value) &&
        !check_num.test(value) &&
        !check_eng.test(value) &&
        !check_spc.test(value))
    );
  };

  const phoneValidation = function (value) {
    const pattern = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return value === "" || pattern.test(value.replace(/ /gi, ""));
  };

  // --------- 포맷 형식
  const registerNumberFormat = function (value) {
    // 숫자만 입력 가능
    value = value.replace(/[^0-9]/g, "");
    // format 적용 (생년월일6자리-뒷자리1자리)
    if (value.length < 7) {
      return value;
    } else {
      return `${value.substr(0, 6)}-${value.substr(6)}`;
    }
  };

  const phoneFormat = function (value) {
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
  };

  const name = new Input(nameInput, nameValidation);
  name.registerListener();
  const registerNumber = new Input(registerNumberInput, null, registerNumberFormat, nameInput);
  registerNumber.registerListener();
  const phone = new Input(phoneInput, phoneValidation, phoneFormat, registerNumberInput);
  phone.registerListener();

  // --------- 통신사
  const carrierCodeSelect = this.document.getElementById("carrierCode");
  // 통신사 데이터 옵션 추가
  for (let carrier of carriers) {
    let option = document.createElement("option");
    option.text = carrier.description;
    option.value = carrier.code;
    carrierCodeSelect.add(option);
  }
  // 통신사 선택 이벤트
  carrierCodeSelect.onchange = function () {
    const selectedValue = carrierCodeSelect.options[carrierCodeSelect.selectedIndex].value;
    isAllValid();
    // 통신사 선택 후, 휴대폰 번호로 이동
    if (selectedValue !== "") {
      phoneInput.focus();
    }
  };

  // ------- 약관 목록
  // 전체 동의
  const allTermsCheckbox = document.getElementById("terms-all");
  allTermsCheckbox.onclick = function () {
    const checkboxes = document.querySelectorAll('input[name="terms"]');
    for (let checkbox of checkboxes) {
      checkbox.checked = this.checked;
    }
    isAllValid();
  };

  const termsList = document.querySelector("#terms-list");
  // 약관 목록 데이터 불러오기
  for (let terms of termslist) {
    const { termsId, title, required } = terms;
    const item = `
      <div class="item-check">
        <input type="checkbox" id="terms-${termsId}" name="terms" class="${
      required && "required-terms"
    }" ${required && `required`} />
        <label for="terms-${termsId}">
            ${title}
        </label>
      </div>`;
    let html = new DOMParser().parseFromString(item, "text/html");
    termsList.append(html.body.firstChild);
  }
  termsList.onclick = function () {
    const checkBoxes = document.querySelectorAll('input[name="terms"]');
    const checkBoxesArray = Array.prototype.slice.call(checkBoxes);
    isAllValid();
    // 전체 동의 확인
    if (checkBoxesArray.every(isChecked)) {
      allTermsCheckbox.checked = true;
    } else {
      allTermsCheckbox.checked = false;
    }
  };
};

function validationError(inputGroup) {
  inputGroup.classList.add("invalid");
}

function validationSuccess(inputGroup) {
  inputGroup.classList.remove("invalid");
}

function isAllValid() {
  const form = document.getElementById("phone-identification-form");

  if (form.checkValidity()) {
    document.getElementById("submit-btn").classList.remove("disabled");
    form.onsubmit = function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const result = {
        name: formData.get("name"),
        registerNumber: formData.get("registerNumber"),
        carrierCode: formData.get("carrierCode"),
        phoneNumber: formData.get("phone"),
        tersmCode: formData.get("terms"),
      };
      console.log(result);
    };
  } else {
    document.getElementById("submit-btn").classList.add("disabled");
  }
}

// 체크 확인
function isChecked(checkbox) {
  return checkbox.checked;
}
