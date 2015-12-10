(function() {
    'use strict';
    angular.module('app')
    .controller('CreateBirdSightingController', CreateBirdSightingController);

    function CreateBirdSightingController(BirdSightingFactory, $state, $stateParams, $mdToast) {
        var vm = this;

        vm.createBirdSighting = function() {
            BirdSightingFactory.createBirdSighting(vm.sighting, $stateParams.id).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Bird sighting created succesfully!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Bird', { id: $stateParams.id });
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to create bird sighting. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };
    }
})();
