var should = require('should'),
    builder = require('../index');

describe('day-schedule tests', function(){
  it('should merge consecutive schedules', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('en-GB', [
      {
        DayOfWeek: 0,
        Schedule: sched
      },
      {
        DayOfWeek: 1,
        Schedule: sched
      }
    ])
    phrases[0].should.eql('Sun-Mon 09:35-14:15');
  });

  it('should merge consecutive schedules with multiple time ranges', function(){
    var sched = [
      {
        First: '09:35:00',
        Last: '14:15:00'
      },
      {
        First: '15:40:00',
        Last: '22:30:00'
      }
    ];
    var phrases = builder.getAvailabilityPhrases('en-GB', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    }
    ])
    phrases[0].should.eql('Sun-Mon 09:35-14:15 15:40-22:30');
  });


  it('should merge multiple groups of consecutive schedules', function(){
    var sched1 = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var sched2 = [{
      First: '15:40:00',
      Last: '22:30:00'
    }];

    var phrases = builder.getAvailabilityPhrases('en-GB', [
      {
        DayOfWeek: 0,
        Schedule: sched1
      },
      {
        DayOfWeek: 1,
        Schedule: sched1
      },
      {
        DayOfWeek: 2,
        Schedule: sched1
      },
      {
        DayOfWeek: 3,
        Schedule: sched2
      },
      {
        DayOfWeek: 4,
        Schedule: sched2
      },
      {
        DayOfWeek: 5,
        Schedule: sched2
      },
    ])
    phrases[0].should.eql('Sun-Tue 09:35-14:15');
    phrases[1].should.eql('Wed-Fri 15:40-22:30');
  });

  it('should return \'daily\' if the same schedule is applied to every day', function(){
    var sched1 = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];

    var phrases = builder.getAvailabilityPhrases('en-GB', [
      {
        DayOfWeek: 0,
        Schedule: sched1
      },
      {
        DayOfWeek: 1,
        Schedule: sched1
      },
      {
        DayOfWeek: 2,
        Schedule: sched1
      },
      {
        DayOfWeek: 3,
        Schedule: sched1
      },
      {
        DayOfWeek: 4,
        Schedule: sched1
      },
      {
        DayOfWeek: 5,
        Schedule: sched1
      },
      {
        DayOfWeek: 6,
        Schedule: sched1
      }
    ])
    phrases[0].should.eql('Daily 09:35-14:15');
  });
});

describe('languages tests', function(){
  it('should return 12-hour time format for en-US', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('en-US', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('Sun-Tue 9:35AM-2:15PM');
  });

  it('should return German day abbreviations when given de-DE', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('de-DE', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('So.-Di. 09:35-14:15');
  });

  it('should return French day abbreviations when given fr-CA', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('fr-CA', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('dim.-mar. 09:35-14:15');
  });

  it('should return Spanish day abbreviations when given es-MX', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('es-MX', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('Dom.-Mar. 09:35-14:15');
  });

  it('should return Japanese day abbreviations when given ja-JP', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('ja-JP', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('日-火 09:35-14:15');
  });

  it('should cope with a partial language code (as opposed to IETF)', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases('de', [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('So.-Di. 09:35-14:15');
  });

  it('should build the IETF code when given a language array', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases([
        { code: 'en', region: 'GB', quality: 1.0 }
    ], [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('Sun-Tue 09:35-14:15');
  });

  it('should pick the first language when given an array', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases([
        { code: 'de', region:'DE', quality: 1.0 },
        { code: 'de', region:'', quality: 0.8 },
        { code: 'en', region:'', quality: 0.6 }
    ], [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('So.-Di. 09:35-14:15');
  });

  it('should default to en-US when given an empty array', function(){
    var sched = [{
      First: '09:35:00',
      Last: '14:15:00'
    }];
    var phrases = builder.getAvailabilityPhrases([], [
    {
      DayOfWeek: 0,
      Schedule: sched
    },
    {
      DayOfWeek: 1,
      Schedule: sched
    },
    {
      DayOfWeek: 2,
      Schedule: sched
    },
    ])
    phrases[0].should.eql('Sun-Tue 9:35AM-2:15PM');
  });
});
