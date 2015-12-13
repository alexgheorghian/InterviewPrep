(function() {
    'use strict';
    angular.module('app')
    .factory('QuestionFactory', QuestionFactory);

    function QuestionFactory($http, $q, $window) {
        var o = {};

        o.getAllQuestions = function() {
            var q = $q.defer();
            $http.get('/api/v1/questions').then(function(res) {
                q.resolve(res.data);
            }, function(err) {
                q.reject();
            });
            return q.promise;
        };

        o.createQuestion = function(question) {
			var q = $q.defer();
			$http.post('/api/v1/questions', question, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

        o.getQuestionById = function(id) {
			var q = $q.defer();
			$http.get('/api/v1/questions/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteQuestion = function(id) {console.log('after confirm, before ajax call');
			var q = $q.defer();
			$http.delete('/api/v1/questions/' + id, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

		o.updateQuestion = function(question) {
			var q = $q.defer();
			$http.put('/api/v1/questions/' + question._id, question, {
                headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
            }).then(function() {
				q.resolve();
			});
			return q.promise;
		};

        return o;
    }
})();
