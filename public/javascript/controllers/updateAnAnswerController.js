(function() {
    'use strict';
    angular.module('app')
    .controller('UpdateAnAnswerController', UpdateAnAnswerController);

    function UpdateAnAnswerController(AnAnswerFactory, $state, $stateParams) {
        var vm = this;

        if(!$stateParams.answerId) $state.go('Home');
        AnAnswerFactory.getAnAnswerById($stateParams.answerId).then(function(res) {
            vm.answer = res;
        });

        vm.updateAnAnswer = function() {
            AnAnswerFactory.updateAnAnswer(vm.answer).then(function(res) {
                $state.go('Question', { id: $stateParams.questionId });
            });
        };

    }
})();
