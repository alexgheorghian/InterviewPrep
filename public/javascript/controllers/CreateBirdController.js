(function() {
    'use strict';
    angular.module('app')
    .controller('CreateBirdController', CreateBirdController);

    function CreateBirdController(BirdFactory, $state) {
        var vm = this;

        vm.createBird = function() {
            BirdFactory.createBird(vm.bird).then(function(res) {
                $state.go('Home');
            });
        };
    }
})();
