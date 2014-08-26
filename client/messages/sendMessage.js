Template.sendMessage.events({
	'submit form': function(e) {
	    e.preventDefault();
	    
	    var message = {
	      message: $(e.target).find('[name=message]').val()     
	    }

	    //TODO: implement contact selector
	    var subscription = {
	    	number:  '',
	    	carrier: ''
	    }

	    console.log('about to send message', message.message);
	    Meteor.call('sendEmail', subscription,'subject', message.message);
	}
});