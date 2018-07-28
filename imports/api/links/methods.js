// Methods related to accounts and info.js
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TestNames, ComboLock } from './links.js';

Meteor.methods({
  'testnames.insert'(title, score, scoreAsNum) {
    check(score, String);
    check(title, String);

    return TestNames.insert({
      score,
      title,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'combolock.insert'(newCombination, newCombAsNum) {
    check(newCombination, String)
    check(newCombAsNum, Number);
    //check that user is logged in 
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
    return ComboLock.insert({
      newCombination,
      createdAt: new Date(),
    });
  },
  'deletion'() {
    TestNames.remove({});
  },
  //stores the user's score in a mongodb
  'guessscores.insert'() {
    return GuessScores.insert({
      lockScore,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  //this is the real test print, it doesn't delete anything
  'actualTestPrint'() {
    console.log('server test print');
  }
  
});
