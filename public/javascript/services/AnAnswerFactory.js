(function() {
    'use strict';
    angular.module('app')
    .factory('AnAnswerFactory', AnAnswerFactory);

    function AnAnswerFactory($http, $q, $window) {
        var o = {};

        o.getAllAnswers = function(questionId) {
            var q = $q.defer();
            $http.get('/api/v1/questions/answers/' + questionId).then(function(res) {
                q.resolve(res.data);
            }, function(err) {
                q.reject();
            });
            return q.promise;
        };

        o.createAnAnswer = function(anAnswer, questionId) {
			var q = $q.defer();
			$http.post('/api/v1/questions/answers/' + questionId, anAnswer, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

        o.getAnAnswerById = function(answerId) {
			var q = $q.defer();
			$http.get('/api/v1/questions/answers/update/' + answerId).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteAnAnswer = function(questionId, answerId) {
			var q = $q.defer();
			$http.delete('/api/v1/questions/answers/' + questionId + '/' + answerId, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateAnAnswer = function(answer) {
			var q = $q.defer();
			$http.put('/api/v1/questions/answers/update/' + answer._id, answer, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

        return o;
    }
})();
