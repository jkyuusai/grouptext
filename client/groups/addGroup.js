Template.addGroup.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var membersList = template.$('.members').esAutosuggestData(),
        members = [];

    _.each(membersList, function(member) {
      members.push(member.id);        
    });
    
    var group = {
      name: template.$('[name=name]').val(),
      members: members
    }      

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