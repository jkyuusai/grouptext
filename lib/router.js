Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
     if(!Meteor.user()) {
      return;
    } else {
      return [Meteor.subscribe('contacts', Meteor.user()._id), Meteor.subscribe('groups', Meteor.user()._id)]; } 
    }    
});

Router.route('/', {name: 'addressBook'});
Router.route('/addContact', {name: 'addContact'});
Router.route('/contacts/:_id/edit', {
  name: 'editContact',
  data: function() { 
    return Contacts.findOne(this.params._id); 
  }
});
Router.route('/addGroup', {name: 'addGroup'});
Router.route('/group/:_id/edit', {
  name: 'editGroup',
  data: function() { 
    return Groups.findOne(this.params._id);
  }
});
Router.route('/sendMessage', {name: 'sendMessage'});
Router.route('/removeContact/:_id', {
  name: 'removeContact',
  data: function() { 
    return Contacts.findOne(this.params._id);
  }
});  

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('accessDenied');    
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {except: 'addressBook'});
Router.onBeforeAction( function() { 
  clearErrors(); 
  this.next() 
});