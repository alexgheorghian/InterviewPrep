(function() {
    'use strict';
    angular.module('app')
    .controller('UpdateQuestionController', UpdateQuestionController);

    function UpdateQuestionController(QuestionFactory, $state, $stateParams) {
        var vm = this;

        if(!$stateParams.id) $state.go('Home');
        QuestionFactory.getQuestionById($stateParams.id).then(function(res) {
            vm.question = res;
        });

        vm.updateQuestion = function() {
            QuestionFactory.updateQuestion(vm.question).then(function(res) {
                $state.go('Question', { id: vm.question._id });
            });
        };
    }
})();
