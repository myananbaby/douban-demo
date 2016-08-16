(function(angular) {
	angular.module('moviecat.directives.auto_focus', [])
	.directive('autoFocus', ['$location', function($location){
		// Runs during compile

		// var path = $location.path();
		// console.log(path+"--");
		return {
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			link: function($scope, iElm, iAttrs, controller) {
				$scope.$location = $location;
				$scope.$watch('$location.path()',function(now){
					var aLink = iElm.children().attr('href');
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
					if (now.startsWith(type)) {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				});

			}
		};
	}]);
})(angular);
