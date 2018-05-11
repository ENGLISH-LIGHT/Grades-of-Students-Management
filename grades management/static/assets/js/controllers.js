var myapp = angular.module('myapp', []);

myapp.controller('getTInfo', ['$scope', '$http',function ($scope, $http) {
    $scope.method = 'GET';
    $scope.url = '/teacher/info';
    $scope.title = '教师信息';
    $scope.tableHeads = [
        '编号',
        '姓名',
        '性别',
        '电话',
        '邮箱',
    ],
    $scope.getTeacherInfo = function () {
        alert(1);
        $http({
            method: $scope.method,
            url: $scope.url,
        }).then(function successCallback(response) {
            $scope.datas = response.data;
            console.log($scope.datas);
        }, function errorCallback(response) {
            console.log('error:请求老师数据失败！');
        });
    }
}]);