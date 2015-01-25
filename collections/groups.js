Groups = new Mongo.Collection('groups');

Meteor.methods({
	addGroup: function(groupAttributes) {
		var user = Meteor.user(),
        	groupWithSameName = Groups.findOne({userId: Meteor.userId(), name: groupAttributes.name});

    	if (!user) {
  			throw new Meteor.Error(401, "You need to log in first!");
  		}

  		if (!groupAttributes.name) {
	      throw new Meteor.Error(422, 'Please provide a name for the group!');
	    }

	    // pick out the whitelisted keys
	    var group = _.extend(_.pick(groupAttributes, 'name', 'members'), {
	      userId: user._id,
	      submitted: new Date().getTime()
	    });	    	

	    var groupId = Groups.insert(group);	    	

    	return groupId;   
	},

	addToGroup: function(contactId, groupId) {
		var user = Meteor.user(),
			contact = Contact.findOne( {userId: Meteor.userId(), _id: contactId }),
			group = Groups.findOne( {userId: Meteor.userId(), _id: groupId} );

		if (!user) {
	      throw new Meteor.Error(401, "You need to log in first!");
	    }

		if(!group) {
			throw new Meteor.Error(422, "Can't add contact to group that doesn't exist!");
		}

		if(!group.members) {
			group.members = [];
		}

		//TODO: change to each
		for (var l = group.members.length; l >= 0; l--) {
			var e = group.members[l];
			if(e.name === contact.name) {
				throw new Meteor.Error(422, "Contact is already in group!");
			}
		}
		
		group.members.push(contact);
		//TODO: Don't know if this is done correctly
		Groups.update(group._id, {$set: group}, function(error) {
	      if (error) {
	        Toast.error(error.reason,'Error', sticky);
	      } else {
	        Toast.success('Group updated!');
	      }
	    });
	}
});

Groups.initEasySearch('name');