import "./combolock.html";
import "/imports/startup/both/accounts-config.js";
import { ComboLock } from '/imports/api/links/links.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

//This file is used for the bulk of the number guessing game

Template.combolockInput.onCreated(function () {
    Meteor.subscribe('combolock');
    this.newComboAllowed = new ReactiveVar(true);
    this.timerDisplay = new ReactiveVar(60);
    //this.lockConfirmation = new ReactiveVar("some text here");
})
//Allow page to show/hide the combination form, countdown, show a lock-set confirmation, etc.
Template.combolockInput.helpers({
    displayComboAllowed() {
        return Template.instance().newComboAllowed.get();
    },
    combinationTimerDisplay() {
        return Template.instance().timerDisplay.get();
    },
    lockConfirmationDisplay() {
        return Template.instance().lockConfirmation.get();
    },
    
});

Template.combolockInput.events({
    //when user submits a new lock
    'submit .setlock'(event) {
        event.preventDefault();
        Template.instance().newComboAllowed.set(false);
        //console.log("after: " + event.target.setlockinput.value);
        //log username and timer boolean
        console.log("User is: " + Meteor.userId() + "new combo: " + Template.instance().newComboAllowed.get());
        const localInstance = Template.instance();
        //start cooldown timer, and allow form display after 60 seconds
        setTimeout(() => { localInstance.newComboAllowed.set(true); }, 60000);
        //call method to store user's number
        const lockInputAsNum = Number(event.target.setlockinput.value);
        Meteor.call('combolock.insert', event.target.setlockinput.value, lockInputAsNum, (error) => {
            if (error) {
                alert(error.error);
            };
        });
        //show cooldown timer as an object on the page
        let theInterval = setInterval(function () {
            let localTimer = localInstance.timerDisplay.get();
            localInstance.timerDisplay.set(localTimer - 1);
            if (localTimer == 0) {
                clearInterval(theInterval);
                localInstance.timerDisplay.set(60);
            }
        }, 1000);
        var loggableLock = ComboLock.find({}, { sort: {createdAt: -1} });
        // loggableLock.forEach((combinationIn) => {
        //     console.log(combinationIn);
        // });
        console.log(typeof(loggableLock));

        //post the last added lock to display
        //Template.instance().lockConfirmation.set();
    },
    //when player enters a guess
    'submit .guesslock'(event) {
        /*this is what it should compare against, for score, I think
        ComboLock.find({}, { sort: { createdAt: -1 } })
        */
        let userGuess = event.target.playerGuess.value;
        let retrievedLock = ComboLock.find({}, { sort: { createdAt: -1 } });
        //compare inputs, and calculate score. this function returns the score as a number
        function scoreCalc(lock, input) {
            let scoreNum = 0;
            for(let iter = 0; iter <= 5; iter++) {
                scoreNum += Math.pow(2, 
                    (9 - Math.abs(Number(correctCombo[iter]) - Number(guess[iter])))
                );
            }
            return scoreNum;
        } 
    },
});