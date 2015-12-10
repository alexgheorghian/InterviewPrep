(function() {
	'use strict';
	angular.module('app').controller('GlobalController', GlobalController);
	function GlobalController(UserFactory, $state) {
		var vm = this;
		vm.user = {};
		vm.newUser = {};

		vm.status = UserFactory.status;

		vm.register = function() {
			UserFactory.register(vm.newUser).then(function(res) {
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function(res) {
				$state.go('Home');
			}); 
		};

		vm.logout = function() {UserFactory.removeToken();
		 $state.go('Home');}
		
		
	}
})();