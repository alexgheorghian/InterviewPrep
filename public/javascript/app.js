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
			.state('Register', {
				url: '/register',
				templateUrl: '/templates/register.html'
			})
			.state('CreateBird', {
			    url: '/birds/create',
			    templateUrl: '/templates/createBird.html',
			    controller: 'CreateBirdController as vm'
			})
			.state('Bird', {
			    url: '/birds/:id',
			    templateUrl: '/templates/bird.html',
			    controller: 'BirdController as vm'
			})
			.state('UpdateBird', {
			    url: '/birds/update/:id',
			    templateUrl: '/templates/updateBird.html',
			    controller: 'UpdateBirdController as vm'
			});
		$urlRouterProvider.otherwise('/');

	}
})();
