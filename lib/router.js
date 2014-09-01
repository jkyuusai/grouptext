Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
     if(!Meteor.user()) {
      return;
    } else {
      return Meteor.subscribe('contacts', Meteor.user()._id); } 
    }    
});

Router.map(function() {
  this.route('contactList', { path: '/' })
  this.route('addContact', { path: '/addContact' });
  this.route('editContact', { 
    path:'/contacts/:_id/edit',
    data: function() { return Contacts.findOne(this.params._id); }
  });
  this.route('sendMessage',{ path: '/sendMessage'});
  this.route('removeContact', {
    path:'/removeContact/:_id',
    data: function() { return Contacts.findOne(this.params._id) }
  });
});

var mustBeSignedIn = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction(mustBeSignedIn, {except: 'contactList'});
Router.onBeforeAction(function() { clearErrors() });