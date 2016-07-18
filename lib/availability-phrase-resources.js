var otherLocalisedStrings = {
  en: {
    EveryDay: "Daily"
  },
  de:{
    EveryDay: "Täglich"
  },
  fr:{
    EveryDay: "Quotidiennement"
  },
  es: {
    EveryDay: "Diario"
  },
  ja: {
    EveryDay: "月〜日（毎日）"
  }
};

var getLocalisedAvailabiltyText = function(language, textIdentifer){
  var languageObject = otherLocalisedStrings[language.toLowerCase()];

  if (!languageObject) {
    languageObject = otherLocalisedStrings["en"];
  }

  return languageObject[textIdentifer];
};


module.exports = {
  getLocalisedAvailabiltyText: getLocalisedAvailabiltyText
};
