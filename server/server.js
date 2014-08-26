Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://postmaster%40***REMOVED***:***REMOVED***@smtp.mailgun.org:587';
});

//TODO: Change this to a collection
var carrierList = {
			'AT&T': 'mms.att.net',
			'Verizon': 'vtext.com',
			'TMobile': 'tmomail.net',
			'Sprint': 'messaging.sprintpcs.com'
}

Meteor.methods({
	sendEmail: function(subscription, subject, body) {	
		var number = subscription.number;
		var carrier = subscription.carrier;
		Email.send({
			to:number +'@' + carrierList[carrier], 
			from:'grouptext@***REMOVED***', 
			subject: subject, text: body
		});
	},
	removeContact: function(subscription) {			
		Contacts.remove(subscription._id);
	}
});