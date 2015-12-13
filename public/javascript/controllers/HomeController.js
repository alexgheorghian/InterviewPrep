(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(QuestionFactory, $mdToast) {
		var vm = this;

		QuestionFactory.getAllQuestions().then(function(res) {
			vm.questions = res;
		}, function(err) {
			// mdToast here
		});

	}
})();
