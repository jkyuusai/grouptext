Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [Meteor.subscribe('contacts'), Meteor.subscribe('groups') ]; }
});

Router.map(function() {
  this.route('addContact', { path: '/' });  
  this.route('removeContact', {
    path:'/removeContact/:_id',
    data: function() { return Contacts.findOne(this.params._id) }
  });
});