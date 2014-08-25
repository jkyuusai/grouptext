Template.removeContact.helpers({
	unsubscribed: function () {
		return Session.equals('unsubscribed', true);
	}
});

Template.removeContact.events({
  'click .submit': function(e) {  			
  		Meteor.call('removeContact', Contacts.findOne(this._id));
  		Session.set('unsubscribed', true);
  },
  'click .cancel': function(e) {
  		//TODO: Go to contact list
      //Router.go('addContact');
  }
});
  		