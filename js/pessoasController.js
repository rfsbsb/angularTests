(function(){
  var app = angular.module('pessoas', []);

  var OBJECT_STORE_NAME = 'usuarios';

  app.controller('UsuarioListCtrl', ['$scope', '$http', '$indexedDB', function($scope, $http, $indexedDB){
    if (navigator.onLine) {
      $http.get("http://localhost:3000/usuarios.json").success(function(data){
        $scope.usuarios = data;
      });
    } else {
      // offline
      var conexao = $indexedDB.objectStore(OBJECT_STORE_NAME);
      conexao.getAll().then(function(results) {
        $scope.usuarios = results;
      });
    }
  }]);

  app.controller('UsuarioAdicionarCtrl', ['$scope', '$routeParams', '$http', '$location', '$indexedDB', function($scope, $routeParams, $http, $location, $indexedDB){
    var conexao = $indexedDB.objectStore(OBJECT_STORE_NAME);
    $scope.frmUsuario = {};
    $scope.novo = function(form) {
      var dataObject = {
        nome: $scope.frmUsuario.nome,
        idade: $scope.frmUsuario.idade
      };

      if (navigator.onLine) {
        $http.post("http://localhost:3000/usuarios.json", dataObject).success(function(data){
          $scope.usuarios = data;
          $location.path("/lista");
        });
      } else {
        // offline
        dataObject['id'] = Math.floor((Math.random() * 100) + 1);
        conexao.insert(dataObject).then(function(e){
          $location.path("/lista");
        });
      }

    };
  }]);

  app.controller('UsuarioEditarCtrl', ['$scope', '$routeParams', '$http', '$location', '$indexedDB', function($scope, $routeParams, $http, $location, $indexedDB){
    var conexao = $indexedDB.objectStore(OBJECT_STORE_NAME);
    $scope.frmUsuario = {};
    if (navigator.onLine) {
      $http.get("http://localhost:3000/usuarios/" + $routeParams.usuarioId + ".json").success(function(data){
        $scope.frmUsuario = data;
      });
    } else {
      // offline
      conexao.find($routeParams.usuarioId).then(function(e){
        console.log(e);
      }).error(function(e){
        console.log('erro: '+ e);
      });
    }

    $scope.editar = function(form) {
      var dataObject = {
        nome: $scope.frmUsuario.nome,
        idade: $scope.frmUsuario.idade,
        id: $scope.frmUsuario.id
      };

      if (navigator.onLine) {
        $http.put("http://localhost:3000/usuarios/" + $routeParams.usuarioId + ".json", dataObject).success(function(data){
          $location.path("/lista");
        });
      } else {
        // offline
        conexao.upsert(dataObject).then(function(e){
          $location.path("/lista");
        });
      }
    };
  }]);

})();