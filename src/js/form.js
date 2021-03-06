export function checkFormValidation() {
  const form = document.getElementById("phone-identification-form");
  const submitButton = document.getElementById("submit-btn");
  // 폼 유효성 검사에 따른 제출 버튼 활성화
  submitButton.disabled = !form.checkValidity();
}

export function submitForm(e) {
  e.preventDefault();
  alert("인증 번호 요청 성공");
  const formData = new FormData(e.target);

  const result = {
    name: formData.get("name"),
    registerNumber: formData.get("registerNumber").substr(0, 6),
    carrierCode: formData.get("carrierCode"),
    phoneNumber: formData.get("phone").replace(/ /gi, ""),
    tersmCode: formData.getAll("terms"),
  };
  console.log(result);
}
