(function() {
    'use strict';
    angular.module('app')
    .controller('CreateAnAnswerController', CreateAnAnswerController);

    function CreateAnAnswerController(AnAnswerFactory, $state, $stateParams, $mdToast) {
        var vm = this;

        vm.createAnAnswer = function() {
            AnAnswerFactory.createAnAnswer(vm.answer, $stateParams.id).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('An answer created succesfully!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Question', { id: $stateParams.id });
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to create an answer. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };
    }
})();
