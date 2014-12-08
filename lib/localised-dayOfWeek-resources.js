var enums = require("./enums");

var dayOfWeekNames = {
  en: {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun"
  },
  de: {
    Monday: "Mo",
    Tuesday: "Di",
    Wednesday: "Mi",
    Thursday: "Do",
    Friday: "Fr",
    Saturday: "Sa",
    Sunday: "So"
  },
  fr: {
    Monday: "Lun",
    Tuesday: "Mar",
    Wednesday: "Mer",
    Thursday: "Jeu",
    Friday: "Ven",
    Saturday: "Sam",
    Sunday: "Dim"
  },
  es: {
    Monday: "Dom",
    Tuesday: "Lun",
    Wednesday: "Mar",
    Thursday: "Mié",
    Friday: "Jue",
    Saturday: "Vie",
    Sunday: "Sáb"
  },
  ja: {
    Monday: "月曜日",
    Tuesday: "火曜日",
    Wednesday: "水曜日",
    Thursday: "木曜日",
    Friday: "金曜日",
    Saturday: "土曜日",
    Sunday: "日曜日"
  }
};

var getDayOfWeekLocalisedText = function(language, dayOfWeek) {
  var languageObject = dayOfWeekNames[language.toLowerCase()];
  if (!languageObject) {
    languageObject = dayOfWeekNames["en"];
  }

  return languageObject[enums.dayNumberToDayEnum[dayOfWeek]];
};



module.exports = {
  getDayOfWeekLocalisedText: getDayOfWeekLocalisedText
};
