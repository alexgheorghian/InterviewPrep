(function() {
    'use strict';
    angular.module('app')
    .controller('CreateBirdController', CreateBirdController);

    function CreateBirdController(BirdFactory, $state, $mdToast) {
        var vm = this;

        vm.createBird = function() {
            BirdFactory.createBird(vm.bird).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Bird created succesfully!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Home');
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to create bird. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };
    }
})();
