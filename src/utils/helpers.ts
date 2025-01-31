export function toNormalCase(text: string) {
  if (text) {
    const lowerCaseText = text.toLowerCase();
    const normalText =
      lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);

    return normalText;
  } else {
    return "";
  }
}

export function toTitleCase(text: string) {
  if (text) {
    return text
      .toLowerCase() // Convert the entire text to lowercase
      .split(" ") // Split the text into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a single string
  } else {
    return "";
  }
}

export function convertSankCaseToNormalCase(str) {
  if (str) {
    return str
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } else {
    return "";
  }
}
