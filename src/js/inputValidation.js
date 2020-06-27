// --------- 유효성 검사
export const nameValidation = function (value) {
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

export const phoneValidation = function (value) {
  const pattern = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  return value === "" || pattern.test(value.replace(/ /gi, ""));
};

export const registerNumberValidation = function (value) {
  const pattern = /\b(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4]{1}\b/;
  return value === "" || pattern.test(value);
};

export function validationError(inputGroup) {
  inputGroup.classList.add("invalid");
}

export function validationSuccess(inputGroup) {
  inputGroup.classList.remove("invalid");
}
