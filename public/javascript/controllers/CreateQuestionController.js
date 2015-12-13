(function() {
    'use strict';
    angular.module('app')
    .controller('CreateQuestionController', CreateQuestionController);

    function CreateQuestionController(QuestionFactory, $state, $mdToast) {
        var vm = this;

        vm.createQuestion = function() {
            QuestionFactory.createQuestion(vm.question).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Question created succesfully!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Home');
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to create a question. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };
    }
})();
