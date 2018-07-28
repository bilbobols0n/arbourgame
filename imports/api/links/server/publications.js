// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Accounts } from '../links.js';

Meteor.publish('accounts.all', function () {
  return Accounts.find();
});
