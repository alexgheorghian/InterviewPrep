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
				}, function(err) {
						q.reject();
				});
				return q.promise;
		};

		o.getAllBirdSightings = function() {
				var q = $q.defer();
				$http.get('/api/v1/birdsighting/').then(function(res) {
						q.resolve(res.data);
				}, function(err) {
						q.reject();
				});
				return q.promise;
		};

		o.createBird = function(bird) {
				var q = $q.defer();
				$http.post('/api/v1/birds/', bird).then(function(res) {
						q.resolve(res.data);
				}, function(err) {
						q.reject();
				});
				return q.promise;
	  };

		o.createBirdSighting = function(birdSighting) {
				var q = $q.defer();
				$http.post('/api/v1/birdSighting/', birdSighting).then(function(res) {
						q.resolve(res.data);
				}, function(err) {
						q.reject();
				});
				return q.promise;
	  };

		o.getBirdSightingById = function(id) {
			var q = $q.defer();
			$http.get('/api/v1/birdSighting/', + id}).then(function(res) {
			});
			return q.promise;
		};

	 o.deleteBirdSighting = function(id) {
			var q = $q.defer();
			$http.delete('/api/v1/birdSighting/' + id).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateBirdSighting = function(birdSighting) {
			var q = $q.defer();
			$http.put('/api/v1/birdSighting/' + birdSighting._id, birdSighting).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();
