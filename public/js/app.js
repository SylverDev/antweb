angular.module('app', ['ngRoute', 'slickCarousel', 'ui.tinymce', 'ngSanitize'] )
    .factory('sessionFactory', sessionFactory)
    .service('mailUserService', mailUserService)
    .service('mainService', mainService)
    .service('serviceService', serviceService)
    .controller('navbarController', navbarController)
    .controller('mainController', mainController)
    .directive('file', findImage)
    .config(routes);
