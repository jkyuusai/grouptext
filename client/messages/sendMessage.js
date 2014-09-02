Template.sendMessage.events({
	'submit form': function(e, template) {
	    e.preventDefault();	    
	    
	    var message = template.$('[name=message]').val(),
	    	contactsList = template.$('.contacts').esAutosuggestData(),
	    	groupsList = template.$('.groups').esAutosuggestData(),
        	recipients = [];

        _.each(contactsList, function(contact) {
        	recipients.push(Contacts.findOne({_id:contact.id}));
        });

        _.each(groupsList, function(group) {
        	var group = Groups.findOne({_id:group.id});
        	if(group && group.members && group.members.length) {
        		_.each(group.members, function(id) {
        			recipients.push(Contacts.findOne({_id:id}));
        		});
        	}
        });        
        	
        recipients = _.uniq(recipients, false, function(e) {
        	return e._id;
        });

	    Meteor.call('sendEmail', recipients,'subject', message, function(error, result) {
	    	if(error) {
	    		Toast.error(error.reason,'Error', sticky)
	    	} else {
	    		Toast.success('Message sent!');
	    		Router.go('addressBook');
	    		    			    		
	    	}
	    });
	}
});