export const removeHtmlTags = (text) => {
  return text.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
};
