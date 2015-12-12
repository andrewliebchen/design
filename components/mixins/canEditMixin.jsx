CanEditMixin = {
  _canEdit(currentUserId, projectCreatedBy) {
    return currentUserId === projectCreatedBy;
  }
}
