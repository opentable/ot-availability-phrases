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

Supported languages:

- en
- en-US (returns 12 hour time format)
- de
- fr
- es
- ja

__Running tests__
```
npm install
npm test
```
