(function() {
	'use strict';
	angular.module('app')
	.controller('QuestionController', QuestionController);

	function QuestionController(QuestionFactory, AnAnswerFactory, $state, $stateParams, $mdDialog) {
		var vm = this;

		if(!$stateParams.id) $state.go('Home');
		QuestionFactory.getQuestionById($stateParams.id).then(function(res) {
			vm.question = res;
		});

		AnAnswerFactory.getAllAnswers($stateParams.id).then(function(res) {
			vm.answers = res;
		}, function(err) {
			// mdToast here
		});

		vm.deleteQuestion = function(ev) {
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the question?')
			.ariaLabel('Delete the question')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {
				QuestionFactory.deleteQuestion($stateParams.id).then(function() {
					$state.go('Home');
				});
			}, function() {
				//
			});
		};

			vm.playAudio = function() {
				document.getElementById("song").play();
			};

		vm.deleteAnAnswer = function(ev, answerId) {
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the answer?')
			.ariaLabel('Delete the answer')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {
				AnAnswerFactory.deleteAnAnswer($stateParams.id, answerId).then(function() {
					$state.go('Question', { id: $stateParams.id }, {reload: true});
				});
			}, function() {
				//
			});
		};
}
})();
