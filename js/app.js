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
    $indexedDBProvider.connection('BDUsuarios').upgradeDatabase(1, function(event, db, tx){
      var objStore = db.createObjectStore('usuarios', {keyPath: 'id'});
      objStore.createIndex('nome_idx', 'nome', {unique: false});
      objStore.createIndex('idade_idx', 'idade', {unique: false});
    });
  }]);

  window.addEventListener('load', function() {
    var status = $("#status");

    function updateOnlineStatus(event) {
      var condition = navigator.onLine ? "Online" : "Offline";
      var className = navigator.onLine ? "badge alert-success" : "badge alert-danger";
      $(status).attr("class", className);
      $(status).html(condition);
    }

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });

  $(window).change();
})();