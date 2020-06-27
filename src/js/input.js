import { validationError, validationSuccess } from "./inputValidation";
import { checkFormValidation } from "./form";

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
      checkFormValidation();
    });

    this.inputNode.addEventListener("keyup", function () {
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
      checkFormValidation();
    });
  }
}

export default Input;
