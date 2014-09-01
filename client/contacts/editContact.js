Template.editContact.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentContactId = this._id;

    var contactProperties = {
      name: $(e.target).find('[name=name]').val(),
      number: $(e.target).find('[name=phone]').val(),
      carrier:  $(e.target).find('[name=carrier]').val()
    }

    Contacts.update(currentContactId, {$set: contactProperties}, function(error) {
      if (error) {
        Toast.error(error.reason,'Error', sticky);
      } else {
        Toast.success('Contact updated!');
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this contact?")) {
      var currentContactId = this._id;
      
      Contacts.remove(currentContactId, function(error) {
        if (error) {
          Toast.error(error.reason,'Error', sticky);
        } else {
          Router.go('addressBook');
        }
      });     
    }
  }
});