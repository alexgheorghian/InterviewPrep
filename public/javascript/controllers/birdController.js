(function() {
	'use strict';
	angular.module('app')
	.controller('BirdController', BirdController);

	// This function is used to display detail on a bird.
	// It returns a bird object to the calling function.
	// This needs to be called from an html file using: ui-sref="BirdDetails({id: c._id})
	function BirdController(BirdFactory, $state, $stateParams, $mdDialog) {
		var vm = this;

		if(!$stateParams.id) $state.go('Home');
		BirdFactory.getBirdById($stateParams.id).then(function(res) {
			vm.bird = res;
		});


		vm.confirmDelete = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
			.title('Cofirm deletion')
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

		vm.deleteBird = function() {
			BirdFactory.deleteBird($stateParams.id).then(function() {
				$state.go('Home');
			});
		};

		/*

		vm.createBirdSighting = function() {
		HomeFactory.createBirdSighting(vm.birdSighting).then(function(res) {
		vm.bird.birdSightings.push(res);
	});
};

vm.deleteBirdSighting = function(birdSighting) {
BirdFactory.deleteBirdSighting(birdSighting._id) then(function() {
vm.bird.birdSightings.splice(vm.bird.birdSightings.indexOf(birdSighting), 1);
});
}
*/
}
})();
