(function (angular, apiConfig) {
  'use strict';

  var apiUrl = apiConfig.host + ':' + apiConfig.port + apiConfig.path + '/:id';

  var apiActions = {
    'get':    { method: 'GET' },
    'save':   { method: 'POST' },
    'update': { method: 'PUT' },
    'query':  { method:'GET', isArray:true },
    'delete': { method:'DELETE' }
  };

  angular
    .module('userResourse', [ 'ngResource' ])
    .factory('User', ['$resource', ( $resource ) => {
      var User = $resource(apiUrl, { id: '@id' }, apiActions);
      User.list = [];
      User.onUpdate = function ( user, id ) {
        id = id || user.id;
        var index = User.list.findIndex( function (u) { return u.id === id });
        if (index < 0) {
          return user && User.list.push(user);
        }
        if (user) {
          return User.list[index] = user;
        }
        User.list.splice(index, 1);
      }

      return User;
    }]);

})(window.angular, window.userRestApiConfig);
