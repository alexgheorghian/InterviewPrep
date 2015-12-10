(function() {
    'use strict';
    angular.module('app')
    .factory('BirdFactory', BirdFactory);

    function BirdFactory($http, $q, $window) {
        var o = {};

        o.getAllBirds = function() {
            var q = $q.defer();
            $http.get('/api/v1/birds').then(function(res) {
                q.resolve(res.data);
            }, function(err) {
                q.reject();
            });
            return q.promise;
        };

        o.createBird = function(bird) {
			var q = $q.defer();
			$http.post('/api/v1/birds', bird, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
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

		o.deleteBird = function(id) {console.log('after confirm, before ajax call');
			var q = $q.defer();
			$http.delete('/api/v1/birds/' + id, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateBird = function(bird) {
			var q = $q.defer();
			$http.put('/api/v1/birds/' + bird._id, bird, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

        return o;
    }
})();
