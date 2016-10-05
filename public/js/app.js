'use strict';
(function () {
	var app = angular.module('dotMutual', ['ngMaterial']);
	app.constant('firebase', window.firebase);
	app.config(function($mdIconProvider){
 	// Initialize Firebase
 		var config = {
 		apiKey: "AIzaSyBVEJWnq1ULlF72ds0rHo4NGbXUXKCw7Ko",
 		authDomain: "dotmutual.firebaseapp.com",
 		databaseURL: "https://dotmutual.firebaseio.com",
 		storageBucket: "dotmutual.appspot.com",
 		messagingSenderId: "325411411582"
 		};
 		firebase.initializeApp(config);
		$mdIconProvider.fontSet('md', 'material-icons');
	});

	app.controller('SignUpCtrl', function($scope, firebase){
		$scope.user = {};
		$scope.success = false;

		$scope.signup = function(){
			var db = firebase.database();
			var objRef = db.ref().child('signups').push().key;
			var payload = {};
			payload['/signups/' + objRef] = $scope.user.email;
			db.ref().update(payload).then(function(){
				$scope.success = true;
				console.log('Saved to db');
			}, function(error){
				console.log(error);
			});
		};

	});

	app.controller('AppCtrl', function($scope, $anchorScroll, $window, $mdDialog){
		$scope.showMobileButton = false;

		$scope.heroClick = function(proceed){
			if(proceed)
				console.log('Go further');
		};

		$scope.scrollTo = function(anchor) {
			$anchorScroll(anchor);
		};

		$scope.showSignup = function($event){
			$mdDialog.show({
				controller: 'SignUpCtrl',
				templateUrl: 'templates/signup.tpl.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose:true,
				size:'lg',
				fullscreen: false// Only for -xs, -sm breakpoints.
			})
				.then(function(answer) {
					console.log('Awesome!');
				}, function() {
					console.log('Canceled');
				});
		};

		$scope.shouldShowMobileSignup = function(){
			console.log(document.body.scrollTop);
			return window.scrollX >= 500;
		};

		$scope.$watch(function () {
			return $window.scrollY;
		}, function (scrollY) {
			console.log(scrollY);
			$scope.showMobileButton = (scrollY > 500);
		});
	});
}());
