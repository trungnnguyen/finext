'use strict';

/* global app:true */

var app = angular.module('confeaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngDropdowns',
		'firebase'
  ])
	.constant('FIREBASE_URL', 'https://finext.firebaseio.com/');

 app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'InputCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
	    .when('/signin', {
		    templateUrl: 'views/login.html',
		    controller: 'AuthCtrl'
	    })
      .otherwise({
        redirectTo: '/'
      });
  });
