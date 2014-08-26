Template.contactItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});