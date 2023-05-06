const language = navigator.language;

const configObject = {
  dateStyle: "full",
};
const dateFormatter = new Intl.DateTimeFormat(language, configObject);

function convertToDate(dateString) {
  const date = new Date(dateString);
  return date;
}
export default function formatDate(dateString) {
  const date = convertToDate(dateString);
  const formattedDate = dateFormatter.format(date);
  return formattedDate;
}
