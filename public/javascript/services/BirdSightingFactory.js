(function() {
    'use strict';
    angular.module('app')
    .factory('BirdSightingFactory', BirdSightingFactory);

    function BirdSightingFactory($http, $q, $window) {
        var o = {};

        o.getAllBirdSightings = function(birdId) {
            var q = $q.defer();
            $http.get('/api/v1/birds/sightings/' + birdId).then(function(res) {
                q.resolve(res.data);
            }, function(err) {
                q.reject();
            });
            return q.promise;
        };

        o.createBirdSighting = function(birdSighting, birdId) {
			var q = $q.defer();
			$http.post('/api/v1/birds/sightings/' + birdId, birdSighting, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

        o.getBirdSightingById = function(sightingId) {
			var q = $q.defer();
			$http.get('/api/v1/birds/sightings/update/' + sightingId).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteBirdSighting = function(birdId, sightingId) {
			var q = $q.defer();
			$http.delete('/api/v1/birds/sightings/' + birdId + '/' + sightingId, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateBirdSighting = function(sighting) {
			var q = $q.defer();
			$http.put('/api/v1/birds/sightings/update/' + sighting._id, sighting, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

        return o;
    }
})();
