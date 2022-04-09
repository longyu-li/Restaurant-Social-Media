export const REQUIRED = "This field is required."

function capitalize(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function mergeErrors(fieldErrors: string[]) {

  return fieldErrors.map(fieldError => capitalize(fieldError)).join("\n");

}