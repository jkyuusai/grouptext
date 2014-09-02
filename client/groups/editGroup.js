Template.editGroup.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var currentGroupId = this._id,
        membersList = template.$('.members').esAutosuggestData(),
        members = [];

    _.each(membersList, function(member) {
      members.push(member.id);        
    });

    var groupProperties = {
      name: template.$('[name=name]').val(),
      members: members
    }

    Groups.update(currentGroupId, {$set: groupProperties}, function(error) {
      if (error) {
        Toast.error(error.reason,'Error', sticky);
      } else {
        Toast.success('Group updated!');
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this group?")) {
      var currentGroupId = this._id;
      
      Groups.remove(currentGroupId, function(error) {
        if (error) {
          Toast.error(error.reason,'Error', sticky);
        } else {
          Router.go('addressBook');
        }
      });     
    }
  }
});