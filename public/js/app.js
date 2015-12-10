var bbcast = angular.module('bbcast', []);

bbcast.controller('bbController', function($scope){
	$scope.files = [
		{title: 'Config', file: '/views/config.html'},
		{title: 'Layout1', file: '/views/layout1.html'},
		{title: 'Layout2', file: '/views/layout2.html'},
		{title: 'Layout3', file: '/views/layout3.html'}
	];
	$scope.current = $scope.files[0].file;
	$scope.renderLayout1 = function(){
		//alert(file);
		$scope.current = '/views/layout1.html';
	}
	$scope.renderLayout2 = function(){
		//alert(file);
		$scope.current = '/views/layout2.html';
	}
	$scope.renderLayout3 = function(){
		//alert(file);
		$scope.current = '/views/layout3.html';
	}
})

bbcast.directive("layout", function(){
	return {
		templateUrl: "/views/layout1.html"
	}
})




