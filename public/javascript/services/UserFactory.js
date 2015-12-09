(function() {
	'use strict'
	angular.module('app').factory('UserFactory', UserFactory);
	function UserFactory($http, $q, $window) {
		var o = {};
		o.status = {};

		o.register = function(user) {
			var q = $q.defer();
			//here we stuff the {user} that we populated in the ui into a req and post it to the server
			$http.post('/api/v1/users/register', user).then(function(res) {
				console.log(res.data.token);
				o.setToken(res.data.token);
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.login = function(user) {
			var q = $q.defer();
			$http.post('/api/v1/users/login', user).then(function(res) {
				o.setToken(res.data.token);
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getToken = function() {
			return $window.localStorage.getItem('token');
		};

		o.setToken = function(token) {
			$window.localStorage.setItem('token', token);
			o.setUser();

		};

		o.removeToken = function() {
			$window.localStorage.removeItem('token');
			o.status._id = null;
			o.status.email = null;
		};

		o.setUser = function() {
			var token = JSON.parse(atob(o.getToken().split('.')[1]));
			o.status._id = token._id;
			o.status.email = token.email;
		};

		if(o.getToken()) o.setUser();
	

		return o;

	}
})()