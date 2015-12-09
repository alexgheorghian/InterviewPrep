(function() {
	'use strict';
	angular.module('app')
	.factory('BirdSightingFactory', BirdSightingFactory);

	function BirdSightingFactory($http, $q, $window) {
		var o = {};

		o.getAllBirdSightings = function() {
				var q = $q.defer();
				$http.get('/api/v1/birdsightings/').then(function(res) {
						q.resolve(res.data);
				}, function(err) {
						q.reject();
				});
				return q.promise;
		};

		o.createBirdSighting = function(birdSighting) {
				var q = $q.defer();
				$http.post('/api/v1/birdSightings/', birdSighting).then(function(res) {
						q.resolve(res.data);
				}, function(err) {
						q.reject();
				});
				return q.promise;
	  };

		o.getBirdSightingById = function(id) {
			var q = $q.defer();
			$http.get('/api/v1/birdSightings/', + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

	 o.deleteBirdSighting = function(id) {
			var q = $q.defer();
			$http.delete('/api/v1/birdSightings/' + id).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateBirdSighting = function(birdSighting) {
			var q = $q.defer();
			$http.put('/api/v1/birdSightings/' + birdSighting._id, birdSighting).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();
