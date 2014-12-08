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
    EveryDay: "毎日の"
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
