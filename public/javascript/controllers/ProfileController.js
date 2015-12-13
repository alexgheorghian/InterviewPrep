(function() {
  "use strict";
  angular.module('app').controller('ProfileController', ProfileController);
  function ProfileController(AnAnswerFactory, QuestionFactory, $state, UserFactory, $stateParams, $mdDialog) {
      var vm = this;
      if(!UserFactory.status._id) $state.go('Home');

      // if(!$stateParams.id) $state.go('Home');
      UserFactory.getProfileQuestions().then(function(res) {

            	vm.questions = res;
        	});

  //     AnAnswerFactory.getAllAnswers($stateParams.id).then(function(res) {
		// 	vm.answers = res;
		// }, function(err) {

		// });

      // vm.updateQuestion = function() {
      //       QuestionFactory.updateQuestion(vm.question).then(function(res) {
      //           $state.go('Question', { id: vm.question._id });
      //       });
      //   };

      vm.deleteQuestion = function(ev, questionId) {
      		console.log('before confirm');
			var confirm = $mdDialog.confirm()
			.title('Confirm deletion')
			.content('Would you like to delete the question?')
			.ariaLabel('Delete the question')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
			$mdDialog.show(confirm).then(function() {console.log('after confirmation');
				QuestionFactory.deleteQuestion(questionId).then(function() {
					console.log("question factory returned");
					$state.go('Profile');
				});
			}, function() {
				//
			});
		};
  }
})();
