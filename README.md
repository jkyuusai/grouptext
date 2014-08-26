groupText
===============

See the app in production at: dailycompliment.meteor.com

Future Plans
- If a carrier is entered that is not supported by the app, inform the user the carrier is not supported, but let them know to check back later. Send a notification to developer with the unsupported carrier so that it can be implemented.

- Handle the unsubscribe path differently. I don't like that it is dependent on an error being thrown. 

- App takes advantage of carrier's email to SMS/MMS gateway addresses per phone number. Some carriers automatically convert the message from an SMS to an MMS if the original message exceeds the 160 character limit on SMSes. Some just split the message apart to keep within the limit. Some just truncate anything past the limit. Need to do more in depth testing with different carriers, or find someone that already has. Or, move to a paid service (Twilio probably), get a number, and let the service handle it for me.