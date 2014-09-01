Template.addGroup.events({
  'submit form': function(e, template) {
    e.preventDefault();
    
    var group = {
      name: template.$('[name=name]').val(),
      members: template.$('[name=members]').val()
    }

      console.log('getting ready to add group',group);
      

    Meteor.call('addGroup', group, function (error, id) {
       if (error) {                  
        Toast.error(error.reason,'Error', sticky);
      } else {                  
          Toast.success('Group added!');
          Router.go('addressBook');       
      }
    });     
  }
});