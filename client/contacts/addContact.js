Template.addContact.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var contact = {
      name: template.$('[name=name]').val(),
      number: template.$('[name=phone]').val(),
      carrier:  template.$('[name=carrier]').val()
    }

    Meteor.call('addContact', contact, function (error, id) {
       if (error) {                  
        Toast.error(error.reason,'Error', sticky);
      } else {                  
          Toast.success('Contact added!');
          Router.go('addressBook');       
      }
    });     
  }
});