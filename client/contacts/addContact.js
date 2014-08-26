Template.addContact.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var contact = {
      name: $(e.target).find('[name=name]').val(),
      number: $(e.target).find('[name=phone]').val(),
      carrier:  $(e.target).find('[name=carrier]').val(),
    }

    Meteor.call('addContact', contact, function (error, id) {
       if (error) {                  
        alert(error.reason);
      } else {
          console.log('contact added',Contacts.findOne(id));          
          //Meteor.call('sendEmail', Contacts.findOne(id));
          Router.go('contactList');       
      }
    });     
  }
});