(function() {
	'use strict';
	angular.module('app')
	.factory('BirdFactory', BirdFactory);

	function BirdFactory($http, $q, $window) {
		var o = {};

		o.getAllBirds = function() {
			var q = $q.defer();
			$http.get('/api/v1/birds/').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createBird = function(bird) {
			var q = $q.defer();
			$http.post('/api/v1/birds/', bird).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getBirdById = function(id) {
			var q = $q.defer();
			$http.get('/api/v1/birds/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteBird = function(id) {
			var q = $q.defer();
			$http.delete('/api/v1/birds/' + id).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateBird = function(bird) {
			var q = $q.defer();
			$http.put('/api/v1/birds/' + bird._id, bird).then(function() {
				q.resolve();
			});
			return q.promise;
		};












		o.getAllBirdSightings = function() {
			var q = $q.defer();
			$http.get('/api/v1/birds/').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		/*o.getBirdSightingById = function(id) {
			var q = $q.defer();
			$http.get('/api/v1/birds/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};*/

		o.createBirdSighting = function(birdSighting) {
			var q = $q.defer();
			$http.post('/api/v1/birds/', birdSighting).then(function() {
				q.resolve();
			});
			return q.promise;
		};

	o.deleteBirdSighting = function(id) {
			var q = $q.defer();
			$http.delete('/api/v1/birds/' + id).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();
