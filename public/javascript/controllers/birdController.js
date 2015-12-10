(function() {
	'use strict';
	angular.module('app')
	.controller('BirdController', BirdController);

	function BirdController(BirdFactory, BirdSightingFactory, $state, $stateParams, $mdDialog) {
		var vm = this;

		if(!$stateParams.id) $state.go('Home');
		BirdFactory.getBirdById($stateParams.id).then(function(res) {
			vm.bird = res;
		});

		BirdSightingFactory.getAllBirdSightings($stateParams.id).then(function(res) {
			vm.sightings = res;
		}, function(err) {
			// mdToast here
		});

		vm.deleteBird = function(ev) {
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the bird?')
			.ariaLabel('Delete the bird')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {
				BirdFactory.deleteBird($stateParams.id).then(function() {
					$state.go('Home');
				});
			}, function() {
				//
			});
		};

		vm.deleteBirdSighting = function(ev, sightingId) {
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the bird sighting?')
			.ariaLabel('Delete the bird sighting')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {
				BirdSightingFactory.deleteBirdSighting($stateParams.id, sightingId).then(function() {
					$state.go('Bird', { id: $stateParams.id }, {reload: true});
				});
			}, function() {
				//
			});
		};
}
})();
