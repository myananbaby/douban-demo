(function(angular) {
	'use strict';



	var module = angular.module('moviecat.movie_list', [
		'ngRoute',
		'movie.services.http'
		]);
	module.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/:category/:page',{
			templateUrl:'movie_list/view.html',
			controller:'MovieListController'
		});
	}]);

	module.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpServices',
		'AppConfig',
		function($scope,$route,$routeParams,HttpServices,AppConfig){
			var count = AppConfig.pageSize;
			var page = parseInt($routeParams.page);
			var start = (page-1)*count;
			$scope.loading = true;
			$scope.subjects = [];
			$scope.title = "Loading...";
			$scope.currentPage = page;
			$scope.message = "";
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			HttpServices.jsonp(AppConfig.listApiAddress+$routeParams.category,
				{start:start,count:count,q:$routeParams.q},
				function(data){
					$scope.subjects = data.subjects;
					$scope.title = data.title;
					$scope.totalCount = data.total;
					$scope.totalPages = Math.ceil($scope.totalCount/count);
					$scope.loading = false;
					$scope.$apply();

				}
			);

			$scope.go = function(page){
				if (page>=1 && page<=$scope.totalPages) {
						$route.updateParams({page:page});
				}

			};

	}]);
})(angular);


// var doubanApiAddress = 'http://api.douban.com/v2/movie/coming_soon';
//   	$http.get(doubanApiAddress).then(
//   		function(res){
//   			console.log(res);
//   			if (res.status == 200) {
//   				$scope.subjects = res.data.subjects;
//   			}else{
//   				$scope.message = res.statusText;
//   			}
//   		},function(err){
//   			  $scope.message = err.statusText;
//   		}
//   	);



