(function() {
  "use strict";
  angular.module('app')
  .controller('UpdateBirdSightingController', UpdateBirdSightingController);

// Edit is the only CRUD function which makes use of $stateParams
  function UpdateBirdSightingController($state, $stateParams, BirdFactory) {
      var vm = this;

      if(!$stateParams.id) $state.go('Bird');
      BirdFactory.getBirdSightingById($stateParams.id).then(function(res) {
        vm.birdSighting = res;
      }, function() {
        $state.go('Bird');
      });

      vm.updateBirdSighting = function() {
        BirdFactory.updateBirdSighting(vm.birdSighting).then(function() {
          $state.go('Bird');
        });
      };
    }
})();
