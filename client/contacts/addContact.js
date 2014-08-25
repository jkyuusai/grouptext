Template.addContact.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var contact = {
      number: $(e.target).find('[name=phone]').val(),
      carrier:  $(e.target).find('[name=carrier]').val(),
    }

    Meteor.call('addContact', contact, function (error, id) {
       if (error) {                  
        alert(error.reason);
      } else {
        Meteor.call('sendEmail', Contacts.findOne(id));
        //TODO: Go to newly created contact's edit page        
      }
    });     
  }
});