export const REQUIRED = "This field is required."

export const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;
export const PRICE_REGEX = /^\d{6}\.\d{2}$/;

function capitalize(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function mergeErrors(fieldErrors: string[]) {

  return fieldErrors.map(fieldError => capitalize(fieldError)).join("\n");

}