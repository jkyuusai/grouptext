Template.editGroup.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var currentGroupId = this._id;

    var groupProperties = {
      name: template.$('[name=name]').val(),
      members: template.$('[name=members]').val()
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