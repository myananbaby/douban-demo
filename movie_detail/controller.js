(function(angular) {
	'use strict';



	var module = angular.module('moviecat.movie_detail', [
		'ngRoute',
		'movie.services.http'
		]);
	module.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/detail/:id',{
			templateUrl:'movie_detail/view.html',
			controller:'MovieDetailController'
		});
	}]);

	module.controller('MovieDetailController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpServices',
		'AppConfig',
		function($scope,$route,$routeParams,HttpServices,AppConfig){
			$scope.movie = {};
			$scope.loading = true;
			var id = $routeParams.id;
			var apiAddress = AppConfig.detailApiAddress+id;
			HttpServices.jsonp(apiAddress,
				{},
				function(data){
					$scope.movie = data;
					$scope.loading = false;
					$scope.$apply();

				}
			);

	}]);
})(angular);






