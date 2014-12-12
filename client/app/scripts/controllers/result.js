/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

prep.controller('ResultCtrl', function($scope, $rootScope, $location, $filter, Auth, socket) {


  $rootScope.resultsAvailable = false;

  $scope.signedIn = Auth.signedIn;

  if(Auth.signedIn()) {
    $scope.user = Auth.user;
  }

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

  if($rootScope.model.results) {
    $rootScope.resultsAvailable = true;
    $rootScope.resultSet = $rootScope.model.results || {};
  }
  else {
    $rootScope.resultsAvailable = false;
    $rootScope.resultSet = {};
  }


	socket.on('ModelSolved', function(data) {

    console.log("model Solved with displacements: " + data.displacements);
    $rootScope.resultSet = data;

    if (data) {
      $rootScope.resultsAvailable = true;
    }
  });

	$scope.logout = function() {
    $rootScope.model = {};
		Auth.logout();
		$location.path('/');
	};



});
