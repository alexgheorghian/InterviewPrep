(function() {
    'use strict';
    angular.module('app')
    .controller('UpdateBirdSightingController', UpdateBirdSightingController);

    function UpdateBirdSightingController(BirdSightingFactory, $state, $stateParams) {
        var vm = this;

        if(!$stateParams.sightingId) $state.go('Home');
        BirdSightingFactory.getBirdSightingById($stateParams.sightingId).then(function(res) {
            vm.sighting = res;
        });

        vm.updateBirdSighting = function() {
            BirdSightingFactory.updateBirdSighting(vm.sighting).then(function(res) {
                $state.go('Bird', { id: $stateParams.birdId });
            });
        };

    }
})();
