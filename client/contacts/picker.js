Template.picker.helpers({ 
  contacts: function() {
    return Contacts.find({userId: Meteor.userId()}, {sort: {name: 1}});
  },

  groups: function() {
    return Groups.find({userId: Meteor.userId()}, {sort: {name: 1}});
  },

  isContacts: function() {
  	return this.pick === 'contacts';  		
  }
});