Meteor.startup(function () {		
	process.env.MAIL_URL = 'smtp://' + smtpKey + '@smtp.mailgun.org:587';
});

Meteor.publish('contacts', function(userId) {
	return Contacts.find( {userId:userId} );
});

Meteor.publish('groups', function(userId) {
	return Groups.find( {userId:userId} );
});

//TODO: Change this to a collection? Unsure if there's a benefit to doing so.
var carrierList = {
	'AT&T': 'mms.att.net',
	'Boost': 'myboostmobile.com',
	'MetroPCS': 'mymetropcs.com',
	'Sprint': 'messaging.sprintpcs.com',
	'Straight Talk (AT&T)': 'mms.att.net',			
	'Straight Talk (VZW)': 'vtext.com',			
	'TMobile': 'tmomail.net',			
	'Ting': 'message.ting.com',
	'Verizon': 'vtext.com',
	'Virgin Mobile': 'vmpix.com'
}

Meteor.methods({
	sendEmail: function(contacts, subject, body) {
		
		var recipients = _.map(contacts, function(e) {
			return e.number +'@' + carrierList[e.carrier];
		});													
		
		Email.send({
			bcc: recipients,
			from:'grouptext@sparklecow.io',
			text: body
		});
	},
	removeContact: function(subscription) {			
		Contacts.remove(subscription._id);
	}
});
