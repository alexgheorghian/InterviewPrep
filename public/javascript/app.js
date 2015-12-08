(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
      		controller: 'HomeController as vm'
		})
		.state('Register', {
			url: '/Register',
			templateUrl: '/templates/register.html'
		})
		$urlRouterProvider.otherwise('/');
		
	}
})();
