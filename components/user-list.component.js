(function (angular) {

  UserList.$inject = [];
  function UserList() { }

  UserList.controller = UserList;

  UserList.bindings = {
    users: '<',
    onDelete: '<'
  }

  UserList.templateUrl = '/templates/user-list.html';

  angular
    .module('UserListComponent', [])
    .component('userList', UserList);

})(window.angular);
