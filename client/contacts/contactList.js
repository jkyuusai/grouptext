Template.contactList.helpers({ 
  contacts: function() {
    return Contacts.find({userId: Meteor.userId()}, {sort: {name: 1}});
  }
});