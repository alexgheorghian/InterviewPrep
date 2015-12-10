(function() {
  "use strict";
  angular.module('app').controller('ProfileController', ProfileController);
  function ProfileController(BirdSightingFactory, BirdFactory, $state, UserFactory, $stateParams, $mdDialog) {
      var vm = this;
      if(!UserFactory.status._id) $state.go('Home');

      // if(!$stateParams.id) $state.go('Home');
      UserFactory.getProfileBirds().then(function(res) {
            	
            	vm.birds = res;
        	});

  //     BirdSightingFactory.getAllBirdSightings($stateParams.id).then(function(res) {
		// 	vm.sightings = res;
		// }, function(err) {

		// });

      // vm.updateBird = function() {
      //       BirdFactory.updateBird(vm.bird).then(function(res) {
      //           $state.go('Bird', { id: vm.bird._id });
      //       });
      //   };

      vm.deleteBird = function(ev, birdId) {
      		console.log('before confirm');
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the bird?')
			.ariaLabel('Delete the bird')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {console.log('after confirmation');
				BirdFactory.deleteBird(birdId).then(function() {
					console.log("bird factory returned");
					$state.go('Profile');
				});
			}, function() {
				//
			});
		};
  }
})();
