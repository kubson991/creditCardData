const formatter = (number) => {
  let formattedValue = "";
  const spacesNeeded = number.split(/\d{4,4}/);
  for (let index = 0; index < spacesNeeded.length - 1; index++) {
    formattedValue =
      formattedValue + number.slice(index * 4, (index + 1) * 4) + " ";
    if (number.length % 4 != 0 && index === spacesNeeded.length - 2) {
      formattedValue = formattedValue + spacesNeeded[spacesNeeded.length - 1];
    }
  }

  if (number.length < 5) {
    formattedValue = number;
  }
  return formattedValue.trim()
};

export default formatter;
