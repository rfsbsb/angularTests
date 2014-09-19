(function(){
  var app = angular.module('pessoasApp', ['ngRoute', 'pessoas', 'angularFileUpload', 'xc.indexedDB']);

  app.config(['$routeProvider', '$indexedDBProvider', function($routeProvider, $indexedDBProvider) {
    $routeProvider.
    when('/lista', {
      templateUrl: 'lista.html',
      controller: 'UsuarioListCtrl'
    }).
    when('/novo', {
      templateUrl: 'novo.html',
      controller: 'UsuarioAdicionarCtrl'
    }).
    when('/editar/:usuarioId', {
      templateUrl: 'editar.html',
      controller: 'UsuarioEditarCtrl'
    }).
    otherwise({
      redirectTo: '/lista'
    });
    // $indexedDBProvider.connection('pessoasDB').upgradeDatabase(1.3, function(event, db, tx){
    //   var objStore = db.createObjectStore('pessoas', {keyPath: 'id'});
    //   objStore.createIndex('nome_idx', 'nome', {unique: false});
    //   objStore.createIndex('id_idx', 'id', {unique: false});
    //   objStore.createIndex('idade_idx', 'idade', {unique: false});
    // });
  }]);

})();