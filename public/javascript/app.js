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
			.state('CreateBird', {
			    url: '/bird/create',
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
			})
			.state('CreateBirdSighting', {
			    url: '/birds/:id/sighting/create',
			    templateUrl: '/templates/createBirdSighting.html',
			    controller: 'CreateBirdSightingController as vm'
			})
			.state('UpdateBirdSighting', {
			    url: '/birds/sighting/update/:birdId/:sightingId',
			    templateUrl: '/templates/updateBirdSighting.html',
			    controller: 'UpdateBirdSightingController as vm'
			});
		$urlRouterProvider.otherwise('/');

	}
})();
