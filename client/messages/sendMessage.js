Template.sendMessage.events({
	'submit form': function(e, template) {
	    e.preventDefault();	    
	    
	    var message = template.$('[name=message]').val();
	    var selected = template.findAll("input[type=checkbox]:checked");

	    var recipients = _.map(selected, function(e) {
	    	return Contacts.findOne({_id:e.value});
	    });    	

	    Meteor.call('sendEmail', recipients,'subject', message, function(error, result) {
	    	if(error) {
	    		Toast.error(error.reason)
	    	} else {
	    		template.find('form').reset();	    		
	    		Toast.success('Message sent!');
	    	}
	    });
	}
});