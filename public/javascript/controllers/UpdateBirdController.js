(function() {
    'use strict';
    angular.module('app')
    .controller('UpdateBirdController', UpdateBirdController);

    function UpdateBirdController(BirdFactory, $state, $stateParams) {
        var vm = this;

        if(!$stateParams.id) $state.go('Home');
        BirdFactory.getBirdById($stateParams.id).then(function(res) {
            vm.bird = res;
        });

        vm.updateBird = function() {
            BirdFactory.updateBird(vm.bird).then(function(res) {
                $state.go('Bird', { id: vm.bird._id });
            });
        };
    }
})();
