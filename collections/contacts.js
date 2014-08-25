Contacts = new Meteor.Collection('contacts');

Meteor.methods({
  addContact: function(contactAttributes) {
   // var user = Meteor.user(),
      var contactWithSameNumber = Contacts.findOne({number: contactAttributes.number});

    // ensure the user is logged in
    // if (!user)
    //   throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure a number was entered
    if (!contactAttributes.number)
      throw new Meteor.Error(422, 'Please fill in a number!');

    // check that there are no previous phones with the same number
    if (contactAttributes.number && contactWithSameNumber) {
      throw new Meteor.Error(302,'' ,contactWithSameNumber._id);
    }

    // pick out the whitelisted keys
    var contact = _.extend(_.pick(contactAttributes, 'number', 'carrier'), {
      //userId: user._id,
      submitted: new Date().getTime()
    });

    var contactId = Contacts.insert(contact);

    return contactId;
  }
});