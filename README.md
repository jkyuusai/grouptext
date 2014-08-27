groupText
===============

Add contacts to your address book and send them texts for free.

See the app in production at: http://cfpb-frontend-dev-grouptext.meteor.com/

Future Plans
- Add more carriers

- Implement contact search

- Implement groups (add contacts to groups and send messages to groups)

- Implement message history

- Improve contact selection process when sending messages

- Validate number and carrier before inserting

- Fix logged out message flashing when app is reloading

- If a carrier is entered that is not supported by the app, inform the user the carrier is not supported, but let them know to check back later. Send a notification to developer with the unsupported carrier so that it can be implemented.

- App takes advantage of carrier's email to SMS/MMS gateway addresses per phone number. Some carriers automatically convert the message from an SMS to an MMS if the original message exceeds the 160 character limit on SMSes. Some just split the message apart to keep within the limit. Some just truncate anything past the limit. Need to do more in depth testing with different carriers, or find someone that already has. Or, move to a paid service (Twilio probably), get a number, and let the service handle it for me.

NOTE:
Sometimes during peak usage times, Meteor's hosting can be a little unresponive. When visiting the app, if Meteor reports that the site is unavailable, try refreshing the page a few times.
