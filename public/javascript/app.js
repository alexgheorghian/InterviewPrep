(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('Home',{
				url: '/',
				templateUrl: '/templates/home.html',
      			controller: 'HomeController as vm'
			})
			.state('Login', {
				url: '/login',
				templateUrl: '/templates/login.html'
			})
			.state('Register', {
				url: '/register',
				templateUrl: '/templates/register.html'
			})
			.state('Profile', {
				url: '/profile',
				templateUrl: '/templates/profile.html',
				controller: 'ProfileController as vm'
			})
			.state('CreateQuestion', {
			    url: '/question/create',
			    templateUrl: '/templates/createQuestion.html',
			    controller: 'CreateQuestionController as vm'
			})
			.state('Question', {
			    url: '/questions/:id',
			    templateUrl: '/templates/question.html',
			    controller: 'QuestionController as vm'
			})
			.state('UpdateQuestion', {
			    url: '/questions/update/:id',
			    templateUrl: '/templates/updateQuestion.html',
			    controller: 'UpdateQuestionController as vm'
			})
			.state('CreateAnAnswer', {
			    url: '/questions/:id/answer/create',
			    templateUrl: '/templates/createAnAnswer.html',
			    controller: 'CreateAnAnswerController as vm'
			})
			.state('UpdateAnAnswer', {
			    url: '/questions/answer/update/:questionId/:answerId',
			    templateUrl: '/templates/updateAnAnswer.html',
			    controller: 'UpdateAnAnswerController as vm'
			});
		$urlRouterProvider.otherwise('/');

	}
})();
