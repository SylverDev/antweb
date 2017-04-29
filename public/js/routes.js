const routes = ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
        .when('/admin', {
            templateUrl: 'admin/index.html',

        })
        .otherwise({
            redirectTo: '/'
        });

};
