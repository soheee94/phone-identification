// --------- 포맷 형식
export const registerNumberFormat = function (value) {
  // 숫자만 입력 가능
  value = value.replace(/[^0-9]/g, "");
  // format 적용 (생년월일6자리-뒷자리1자리)
  if (value.length < 7) {
    return value;
  } else {
    return `${value.substr(0, 6)}-${value.substr(6)}`;
  }
};

export const phoneFormat = function (value) {
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
    return `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7, 4)}`;
  }
};
