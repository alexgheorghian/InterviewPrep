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
		.state('Bird',{
			url: '/Bird/:id',
			templateUrl: '/templates/bird.html',
			controller: 'BirdController as vm'
		})
		.state('UpdateBirdSightings',{
			url: '/BirdSighting/:id',
			templateUrl: '/templates/updateBirdSightings.html',
      controller: 'UpdateBirdSightings as vm'
		})

		$urlRouterProvider.otherwise('/');

	}
})();
