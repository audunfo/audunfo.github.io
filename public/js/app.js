'use strict';
(function() {
    var app = angular.module('dotMutual', ['ngMaterial', 'ngRoute', 'ui.router']);
    app.constant('firebase', window.firebase);
    app.constant('ga', window.ga);
    app.config(function($mdIconProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
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

        // Enable HTML5 mode
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $urlRouterProvider.otherwise('/form');
        $stateProvider
            .state('signup', {
                url: '/form',
                templateUrl: './templates/signup.tpl.html',
                controller: 'SignUpCtrl',
            })
            .state('success', {
                url: '/success',
                templateUrl: './templates/signup-success.tpl.html',
                controller: 'SuccessCtrl'
            });
    });

    app.controller('SignUpCtrl', function($scope, firebase, $state, $window) {
        $scope.user = {};

        $scope.signup = function() {
            var db = firebase.database();
            var objRef = db.ref().child('signups').push().key;
            var payload = {};
            payload['/signups/' + objRef] = $scope.user.email;

            db.ref().update(payload).then(function() {
                $window.ga('send', 'event', {
                    'eventCategory': 'Conversion',
                    'eventAction': 'Signup',
                    'eventLabel':'Signup',
                    'eventValue': 5,
                });
                $state.transitionTo('success');

            }, function(error) {
                console.log(error);
            });
        };

    });

    app.controller('SuccessCtrl', function() {
        // Nothing here for now
        console.log('Success');
    });

    app.controller('AppCtrl', function($scope, $anchorScroll, $window, $mdDialog, ga) {
        $scope.showMobileButton = false;

        $scope.scrollTo = function(anchor) {
            $anchorScroll(anchor);
            if (anchor == 'info-img') {
                $window.ga('send', 'event', {
                	'eventLabel':'Click on arrow',
                    'eventCategory': 'PageInteraction',
                    'eventAction': 'click',
                });
            }
            if (anchor == 'form') {
                $window.ga('send', 'event', {
                	'eventLabel':'Click on signup',
                    'eventCategory': 'PageInteraction',
                    'eventAction': 'click',
                });
            }
        };

        $scope.shouldShowMobileSignup = function() {
            console.log(document.body.scrollTop);
            return window.scrollX >= 500;
        };

        $scope.$watch(function() {
            return $window.scrollY;
        }, function(scrollY) {
            console.log(scrollY);
            $scope.showMobileButton = (scrollY > 500);
        });
    });
}());
