(function() {
    'use strict';
    angular.module('app').factory('ProfileFactory', ProfileFactory);
    function ProfileFactory($http, $q, $window) {
        var o = this;


        o.getProfileBirds = function() {
            var q = $q.defer();
            $http.get("/api/v1/birds/profile", {
                headers: {
                authorization: "Bearer " + $window.localStorage.getItem("token")}
                }).then(function(res) {
                q.resolve(res.data);
                });
            return q.promise;
        };
        return o;
    }
})();