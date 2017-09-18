var stringLookup = require("./availability-phrase-resources"),
dayOfWeekLookup = require("./day-of-week"),
_ = require("underscore"),
moment = require("moment");

function daysAreConsecutive(dayScheduleA, dayScheduleB){
  return dayScheduleB.DayOfWeek - dayScheduleA.DayOfWeek === 1;
}

function timeRangesAreEqual(dayScheduleA, dayScheduleB){
  return  dayScheduleA.length === dayScheduleB.length && _.isEqual(dayScheduleA.Schedule, dayScheduleB.Schedule);
}

function groupDays(daySortedArray){
  var groupedSchedules = [];
  var previousDay = daySortedArray[0];

  var currentScheduleGroup = [];
  currentScheduleGroup.push(daySortedArray[0]);

  for (var i = 1; i < daySortedArray.length; i++){
    var currentDay = daySortedArray[i];
    if (daysAreConsecutive(previousDay, currentDay) && timeRangesAreEqual(previousDay, currentDay)){
      currentScheduleGroup.push(currentDay);
    }
    else{
      groupedSchedules.push(currentScheduleGroup);
      currentScheduleGroup = [];
      currentScheduleGroup.push(currentDay);
    }

    previousDay = currentDay;
  }

  groupedSchedules.push(currentScheduleGroup);
  return groupedSchedules;
}

function getPhraseForDayScheduleGroup(locale, dayScheduleGroup){

  locale = locale || "en";
  var dashIndex = locale.indexOf("-");

  var parentLanguage = locale;

  if (dashIndex > -1) {
    parentLanguage = locale.substring(0, dashIndex);
  }

  var dayIndication;

  if (dayScheduleGroup.length === 7){
    dayIndication = stringLookup.getLocalisedAvailabiltyText(parentLanguage, "EveryDay");
  }
  else if (dayScheduleGroup.length === 1){
    dayIndication = dayOfWeekLookup.getDayOfWeekLocalisedText(parentLanguage, dayScheduleGroup[0].DayOfWeek);
  }
  else {
    dayIndication = dayOfWeekLookup.getDayOfWeekLocalisedText(parentLanguage, dayScheduleGroup[0].DayOfWeek) + "-" +
    dayOfWeekLookup.getDayOfWeekLocalisedText(parentLanguage, dayScheduleGroup[dayScheduleGroup.length -1].DayOfWeek);
  }

  var timeIndication = "";

  for (var i = 0; i < dayScheduleGroup[0].Schedule.length; i++) {
    if (i !== 0) {
      timeIndication += " ";
    }

    var firstDate = moment(dayScheduleGroup[0].Schedule[i].First, "HH:mm:ss");
    var lastDate = moment(dayScheduleGroup[0].Schedule[i].Last, "HH:mm:ss");

    var displayTimeFormat = "HH:mm";

    if(locale === "en-US" || locale === "en") {
      displayTimeFormat = "h:mmA";
    }

    timeIndication += firstDate.format(displayTimeFormat) + "-" + lastDate.format(displayTimeFormat);
  }
  return dayIndication + " " + timeIndication;
}

function buildIETF(language){
    if(!language){
        return null;
    }
    return language.region ?
        (language.code + "-" + language.region) : language.code;
}

var getAvailabilityPhrases = function(locale, dayScheduleArray){
  if(Array.isArray(locale)){
      locale = buildIETF(locale[0]) || "en";
  }

  if (!_.isArray(dayScheduleArray) || dayScheduleArray.length === 0) {
    return [];
  }

  var timeSortedArray = _.map(dayScheduleArray, function (element) {
      element.Schedule = _.sortBy(element.Schedule, 'First');
      return element;
  });

  var daySortedArray = _.sortBy(timeSortedArray, "DayOfWeek");
  var groupedArray = groupDays(daySortedArray);

  var availabilityPhrases = [];

  for(var i = 0; i < groupedArray.length; i++){
    availabilityPhrases.push(getPhraseForDayScheduleGroup(locale, groupedArray[i]));
  }

  return availabilityPhrases;
};

module.exports = {
  getAvailabilityPhrases: getAvailabilityPhrases
};
