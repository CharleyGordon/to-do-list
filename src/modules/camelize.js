function handleHyphens(item, index, array) {
  if (item !== "-") return;
  array.splice(index, 1);
  array[index] = array[index].toUpperCase();
}

export function camelize(string) {
  const stringArray = string.split("");
  stringArray.forEach(handleHyphens);
  return stringArray.join("");
}
