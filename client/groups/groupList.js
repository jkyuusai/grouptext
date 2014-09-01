Template.groupList.helpers({ 
  groups: function() {
    return Groups.find({userId: Meteor.userId()}, {sort: {name: 1}});
  }
});