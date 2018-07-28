import '/imports/startup/both/accounts-config.js';
import './info.html';
import { Template } from 'meteor/templating';
import { TestNames } from '/imports/api/links/links.js';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//this file is used mainly for the leaderboard

Template.info.onCreated(function () {
  Meteor.subscribe('testnames');
});

Template.info.helpers({
  //display highscores sorted by highest
  nameAndScores() {
    return TestNames.find({}, { sort: {score: -1} });
  },
});

Template.info.events({
  'submit .addname'(event) {
    event.preventDefault();
    
    console.log(event.target.title.value + " " + event.target.score.value);

    Meteor.call('testnames.insert', event.target.title.value, Number(event.target.score.value), (error) => {
      if (error) {
        alert(error.error);
      } else {
        event.target.title.value = '';
      }
    });
    event.target.reset();
  },
});
//scoreboard master delete button
Template.databaseRemove.events({
  'click button'(event) {
    console.log('leaderboard cleared');
    Meteor.call('deletion');
  }
});
/*
Template.serverPrint.events({
  'click button'() {
    Meteor.call('actualTestPrint');
  }
})
*/