CanEditMixin = {
  _canEdit(currentUserId, projectCreatedBy) {
    let isAdmin = Roles.userIsInRole(currentUserId, ['admin']);
    let isProjectCreator = currentUserId === projectCreatedBy;
    return isAdmin || isProjectCreator;
  }
}
