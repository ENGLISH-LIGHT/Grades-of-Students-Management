var myapp = angular.module('myapp',[]);
myapp.controller('TInfo',['$scope','$http',function($scope,$http){
    $scope.method = 'GET';
    $scope.url = '/teacher/info';

    $http({
        method:$scope.method,
        url:$scope.url,
    }).then(function successCallback(response){
        $scope.data = response.data;
        console.log($scope);
    },function errorCallback(response){
        console.log('error');
    })
}]);