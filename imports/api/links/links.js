// Definition of the Accounts collection
//also of the ComboLock collection

import { Mongo } from 'meteor/mongo';

export var TestNames = new Mongo.Collection('testnames');
export var ComboLock = new Mongo.Collection('combolock');
export var GuessScores = new Mongo.Collection('guessscores');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('combolock', function combolockPublication() {
        return ComboLock.find();
    });
    Meteor.publish('testnames', function testnamesPublication() {
        return TestNames.find();
    });
    Meteor.publish('guessscores', function guessscoresPublication() {
        return GuessScores.find();
    });
}
