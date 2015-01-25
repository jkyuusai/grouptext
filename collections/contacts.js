Contacts = new Mongo.Collection('contacts');
Contacts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Contacts.deny({
  update: function(userId, contact, fieldNames) {
    return (_.without(fieldNames, 'name', 'number', 'carrier').length > 0);
  }
});

Meteor.methods({
  addContact: function(contactAttributes) {
    var user = Meteor.user(),
        contactWithSameNumber = Contacts.findOne({userId: Meteor.userId(), number: contactAttributes.number});
   
    if (!user) {
      throw new Meteor.Error(401, "You need to log in first!");
    }

    if (!contactAttributes.name) {
      throw new Meteor.Error(422, 'Please provide a name for the contact!');
    }

    if (!contactAttributes.number) {
      throw new Meteor.Error(422, 'Please provide a phone number!');
    }
    
    if (!contactAttributes.carrier) {
      throw new Meteor.Error(422, 'Please provide the carrier for the phone number!');
    }

    // check that there are no previous phones with the same number
    if (contactAttributes.number && contactWithSameNumber) {
      throw new Meteor.Error(302,'Phone number is already registered to ' + contactWithSameNumber.name + '.');
    }

    // pick out the whitelisted keys
    var contact = _.extend(_.pick(contactAttributes, 'name', 'number', 'carrier'), {
      userId: user._id,
      submitted: new Date().getTime()
    });

    var contactId = Contacts.insert(contact);

    return contactId;
  }
});

Contacts.initEasySearch('name');