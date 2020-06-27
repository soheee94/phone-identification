import carriers from "../data/carriers";
import termslist from "../data/termslist";

export function getCarriersData(select) {
  for (let carrier of carriers) {
    let option = document.createElement("option");
    option.text = carrier.description;
    option.value = carrier.code;
    select.add(option);
  }
}

export function getTermsListData(div) {
  for (let terms of termslist) {
    const { termsId, title, required } = terms;
    const item = `
          <div class="item-check">
            <input type="checkbox" id="terms-${termsId}" name="terms" value="${termsId}"  class="${
      required && "required-terms"
    }" ${required && `required`} />
            <label for="terms-${termsId}">
                ${title}
            </label>
          </div>`;
    let html = new DOMParser().parseFromString(item, "text/html");
    div.append(html.body.firstChild);
  }
}
