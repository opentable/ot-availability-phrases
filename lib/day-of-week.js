var moment = require("moment");

module.exports.getDayOfWeekLocalisedText = function(language, dayOfWeek) {
  var m = moment.localeData(language || "en");
  var languageObject = m._weekdaysShort;
  return languageObject[dayOfWeek];
};
