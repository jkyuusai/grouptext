Template.contactEdit.events({
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
        alert(error.reason);
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this contact?")) {
      var currentContactId = this._id;
      Contacts.remove(currentContactId);
      Router.go('contactList');
    }
  }
});