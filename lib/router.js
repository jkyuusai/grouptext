Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [Meteor.subscribe('contacts'), Meteor.subscribe('groups') ]; }
});

Router.map(function() {
  this.route('contactList', { path: '/' })
  this.route('addContact', { path: '/addContact' });
  this.route('contactEdit', { 
    path:'/contacts/:_id/edit',
    data: function() { return Contacts.findOne(this.params._id); }
  });
  this.route('sendMessage',{ path: '/sendMessage'});
  this.route('removeContact', {
    path:'/removeContact/:_id',
    data: function() { return Contacts.findOne(this.params._id) }
  });
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction(requireLogin, {only: 'addContact'});
Router.onBeforeAction(function() { clearErrors() });