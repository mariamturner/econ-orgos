var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function($scope, $http) {
  console.log("HERE in login");
  $scope.verifyLogin = function() {
    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      console.log(response);
      if (response.result === "success") {
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function(err) {
      console.log("error: ", err);
    });
  };
});


app.controller('getYearIDController', function($scope, $http) {
  $scope.getYearID = function() {
    var request = $http({
      url: '/years',
      method: 'GET'
    })

    request.success(function(response) {
      $scope.year_id = response.rows;
    });
    request.error(function(err) {
      console.log('error: ' + err);
    });
  }
})

app.controller('getDataController', function($scope, $http){
  $scope.getData = function(curr_location) {
    var request = $http({
      url: '/rowDataset',
      method: 'POST',
      data: {
        'currentLocation': curr_location
      }
    })

    request.success(function(response) {
      $scope.rowData = response.rows;
    });
    request.error(function(err) {
      console.log('error: ' + err);
    })
  }
})
