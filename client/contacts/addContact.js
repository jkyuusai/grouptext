Template.addContact.events({
  'submit form': function(e, template) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var contact = {
      name: template.$('[name=name]').val(),
      number: template.$('[name=phone]').val(),
      carrier:  template.$('[name=carrier]').val()
    }

    Meteor.call('addContact', contact, function (error, id) {
       if (error) {                  
        alert(error.reason);
      } else {                  
          //Meteor.call('sendEmail', Contacts.findOne(id));
          Router.go('contactList');       
      }
    });     
  }
});