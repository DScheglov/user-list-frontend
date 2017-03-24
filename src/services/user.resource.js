// userResource

(function (apiConfig) {
  'use strict';

  var apiUrl = apiConfig.host + ':' + apiConfig.port + apiConfig.path;

  function User( ) { }

  User.state = { list: [], obj: null };
  User.subscribers = [];

  User.setState = setState;
  User.errorHandler = errorHandler.bind( User );
  User.subscribe = subscribe;
  User.emit = emit;

  function get($http, apiUrl) {
    var self = this;
    return $http.get(apiUrl).then(
      function (response) { self.setState( { list: response.data } ) },
      self.errorHandler
    )
  }

  function create($http, apiUrl, obj) {
    var self = this;
    return $http.post(apiUrl, obj).then(
      function(response) { self.setState( { obj: response.data } ) },
      self.errorHandler
    )
  }

  function getById($http, apiUrl, id) {
    var self = this;
    return $http.get(apiUrl + '/' + id).then(
      function(response) { self.setState( { obj: response.data } ) },
      self.errorHandler
    )
  }

  function update($http, apiUrl, obj) {
    var self = this;
    return $http.put(apiUrl + '/' + obj.id, obj).then(
      function(response) { self.setState ( { obj: response.data } ) },
      self.errorHandler
    );
  }

  function delById($http, apiUrl, id) {
    var self = this;
    return $http.delete(apiUrl + '/' + id).then(
      function(response) { self.setState ( { removeId: id } ) },
      self.errorHandler
    );
  }

  function errorHandler(response) {
    this.errorCode = response.status;
    this.error = response.data;
  }

  function subscribe(handler) {
    var h = this.subscribers.find(
      function (h) { return ( h === handler ) }
    );
    if (!h) {
      this.subscribers.push(handler);
      handler.call( null, this.state );
    }
    return unsubscribe.bind(this, handler);
  }

  function emit() {
    var state = this.state;
    this.subscribers.forEach(
      function (handler) { handler.call( null, state ) }
    );
  }

  function unsubscribe(handler) {
    var index = this.subscribers.findIndex(
      function (h) { h === handler }
    );
    if (index < 0) return;
    this.subscribers.splice(index, 1);
  }

  function setState( newState ) {
    if (newState.list) {
      this.state.list = newState.list;
      return this.emit()
    }

    this.state.obj = newState.obj || null;

    var id = newState.obj && newState.obj.id || newState.removeId;
    var index = this.state.list.findIndex(
      function (obj) { return obj.id === id }
    );
    if (index < 0) {
      newState.obj && this.state.list.push( newState.obj ) && this.emit()
    } else {
      ( newState.obj && (this.state.list[index] = newState.obj) ||
        this.state.list.splice(index, 1)
      ) && this.emit()
    }

  }

  angular
    .module('userResource', [ ])
    .factory('User', ['$http', function ( $http ) {

      User.get = get.bind( User, $http, apiUrl);
      User.create = create.bind( User, $http, apiUrl);
      User.getById = getById.bind( User, $http, apiUrl);
      User.update = update.bind( User, $http, apiUrl);
      User.delById = delById.bind( User, $http, apiUrl);

      return User;

    }]);

})(window.userRestApiConfig);
