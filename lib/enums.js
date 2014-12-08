function swapJsonKeyValues(input) {
  var one, output = {};
  for (one in input) {
    if (input.hasOwnProperty(one)) {
      output[input[one]] = one;
    }
  }
  return output;
}

var dayToDayNumberEnum = Object.freeze({
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
});

module.exports.dayToDayNumberEnum = dayToDayNumberEnum;

module.exports.dayNumberToDayEnum = Object.freeze(
  swapJsonKeyValues(dayToDayNumberEnum));

module.exports.dayNumberToInvariantDayNameEnum = Object.freeze({
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
});
