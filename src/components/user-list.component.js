// userListComponent

UserList.$inject = [];
function UserList() { }

UserList.controller = UserList;

UserList.bindings = {
  users: '<',
  onDelete: '<'
}

UserList.template = '#include("./build/user-list.html")';

angular
  .module('userListComponent', [])
  .component('userList', UserList);
