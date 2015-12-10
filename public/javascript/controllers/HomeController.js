(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(BirdFactory, $mdToast) {
		var vm = this;

		BirdFactory.getAllBirds().then(function(res) {
			vm.birds = res;
		}, function(err) {
			// mdToast here
		});

	}
})();
