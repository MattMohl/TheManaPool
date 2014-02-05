var themanapool = angular.module('themanapool', ['ngRoute', 'firebase']);

themanapool.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'user',
			templateUrl: 'views/home.html'
		})
		.when('/mydecks', {
			controller: 'user',
			templateUrl: 'views/user-decks.html'
		})
		.when('/browse', {
			controller: 'browser',
			templateUrl: 'views/browse.html'
		})
		.when('/browse/sets', {
			controller: 'browser',
			templateUrl: 'views/sets.html'
		})
		.when('/browse/sets/:set', {
			controller: 'browser',
			templateUrl: 'views/set-cards.html'
		})
		.when('/browse/advanced', {
			controller: 'browser',
			templateUrl: 'views/advanced.html'
		})
		.when('/browse/advanced/results', {
			controller: 'browser',
			templateUrl: 'views/results.html'
		})
		.otherwise({redirectTo: '/'});
});

themanapool.run(['$rootScope', '$firebase', '$firebaseSimpleLogin', '$location', function($rootScope, $firebase, $firebaseSimpleLogin, $location) {
	console.log('RUN');

	var manapool = new Firebase('https://manapool.firebaseio.com');

	// If they are on the results page
	// send them back
	if($location.path() === '/browse/advanced/results') {
		$location.path('/browse/advanced');
	}

	// Instantiate an auth reference
	$rootScope.auth = new FirebaseSimpleLogin(manapool, 
		function(error, user) {
			console.log(error, user);
			if(angular.isObject(user)) {
				console.log('is user '+user.id);
				if($location.path() == '/') {
					console.log('redir');
					$location.path('/browse');
				}
			}else {
				console.log('not user '+user);
				$location.path('/');
			}
	});

	$rootScope.logout = function() {
		console.log('out');
		$rootScope.auth.logout();
		$location.path('/');
	}

}]);