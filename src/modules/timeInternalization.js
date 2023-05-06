const language = navigator.language;

const dateFormatter = new Intl.DateTimeFormat(language);

function convertToDate(dateString) {
  const date = new Date(dateString);
  return date;
}
export default function formatDate(dateString) {
  const date = convertToDate(dateString);
  const formattedDate = dateFormatter.format(date);
  return date;
}
