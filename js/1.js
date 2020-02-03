var app = angular.module('myApp', ['ngMaterial']);
app.controller('IndexController',  function ($scope, $http, $mdToast) {
	$scope.notification = false;
	$scope.choose = true;
	$scope.mess = "";
	$scope.clickChoose = function(value){
		$scope.notification = true;
		if(value == "yes") {
			$scope.choose = true;
			$scope.mess = "Một sự lựa chọn tốt. Quá hoàn hảo";
		} else{
			$scope.choose = false;
			$scope.mess = "Ngu như chó khi không yêu";
		} 

	}
	$scope.goToQuestion = function(){
		localStorage.setItem('key', 'yes');
		window.location.replace("question.html")
	}
});
$( document ).ready(function() {
    localStorage.clear();
});