(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(BirdFactory) {
		var vm = this;

		BirdFactory.getAllBirds().then(function(res) {
			vm.birds = res;
		});
	}
})();
