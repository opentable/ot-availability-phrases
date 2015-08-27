ot-availability-phrases
======================

[![Build Status](https://travis-ci.org/opentable/ot-availability-phrases.png?branch=master)](https://travis-ci.org/opentable/ot-availability-phrases) [![NPM version](https://badge.fury.io/js/ot-availability-phrases.png)](http://badge.fury.io/js/ot-availability-phrases) ![Dependencies](https://david-dm.org/opentable/ot-availability-phrases.png)

Generate availability phrases from a day-schedule:

e.g.

"Mon-Fri 11:00-22:00"

installation:

```
npm install ot-availability-phrases
```

usage:

```
var builder = require('ot-availability-phrases');

var phrases = builder.getAvailabilityPhrases('en-GB', [
  {
    DayOfWeek: 0,
    Schedule: [{
      First: '09:35:00',
      Last: '14:15:00'
    }] 
  },
  {
    DayOfWeek: 1,
    Schedule: [{
      First: '09:35:00',
      Last: '14:15:00'
    }] 
  }
]);

console.log(phrases[0]);
// "Sun-Mon 09:35-14:15"

```

__getAvailabilityPhrases(locale, schedule)__

- locale: can either be a string (e.g. `en-GB`, `en`) or an array of languages (sorted by quality) `[{ code: 'en', region: 'GB', quality: 1.0}, ... ]` (as given by [accept-language-parser](https://www.npmjs.com/package/accept-language-parser)

- schedule: array of days with an array of time-ranges for each

__Running tests__
```
npm install
npm test
```
