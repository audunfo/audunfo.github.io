'use strict';
(function () {
  angular.module('dotMutual', ['ngMaterial'])
    .controller('AppCtrl', function($scope){
      var vc = this;
      vc.title = "test";
      console.log('Hello from controller')
    });
  console.log('im running');
}());
