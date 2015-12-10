(function() {
	'use strict';
	angular.module('app').controller('ProfileController', ProfileController);

		function ProfileController(ProfileFactory, $state, UserFactory) {
			var vm = this;
			if(!UserFactory.status._id) $state.go('Home');


			ProfileFactory.getProfileBirds().then(function(res) {
            	
            	vm.birds = res;
        	});
		

		}
})();

	