(function() {
    "use strict";
    angular.module('app').controller('GlobalController', GlobalController);
    function GlobalController(UserFactory, $state, $mdToast) {
        var vm = this;
        vm.user = {};
        vm.status = UserFactory.status;

        vm.register = function() {
          // console.log("GlobalController.js:10 global.user.userName = ", global.user.userName);
            UserFactory.register(vm.user).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Successful registration!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Home');
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to register. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };

        vm.login = function() {
            UserFactory.login(vm.user).then(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Logged in!')
                        .position('bottom right')
                        .hideDelay(2000)
                );
                $state.go('Home');
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Unable to login. Please try again.')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        };

        vm.logout = function() {
            $mdToast.show(
                $mdToast.simple()
                    .content('Logged out.')
                    .position('bottom right')
                    .hideDelay(2000)
            );
            UserFactory.removeToken();
            $state.go('Home');
        };
    }
})();
