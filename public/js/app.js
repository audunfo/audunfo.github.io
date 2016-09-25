'use strict';
(function () {
	var app = angular.module('dotMutual', ['ngMaterial'])
	app.constant('firebase', window.firebase);
	app.config(function(){
 	// Initialize Firebase
 		var config = {
 		apiKey: "AIzaSyBVEJWnq1ULlF72ds0rHo4NGbXUXKCw7Ko",
 		authDomain: "dotmutual.firebaseapp.com",
 		databaseURL: "https://dotmutual.firebaseio.com",
 		storageBucket: "dotmutual.appspot.com",
 		messagingSenderId: "325411411582"
 		};
 		firebase.initializeApp(config);
 		console.log('im running, firebase configured');
	});
	
	app.controller('AppCtrl', function($scope, $anchorScroll){
		$scope.form = {};

		$scope.heroClick = function(proceed){
			if(proceed)
				console.log('Go further');
		};

		$scope.scrollTo = function(anchor) {
			$anchorScroll(anchor);
		};

		$scope.submitForm = function(){

		};
	});
}());
