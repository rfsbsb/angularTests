(function(){
  var app = angular.module('pessoas', []);

  app.controller('UsuarioListCtrl', ['$scope', '$http', '$indexedDB', function($scope, $http, $indexedDB){
    $http.get("http://localhost:3000/usuarios.json").success(function(data){
      $scope.usuarios = data;
    });
  }]);

  app.controller('UsuarioAdicionarCtrl', ['$scope', '$routeParams', '$http', '$location', '$indexedDB', function($scope, $routeParams, $http, $location, $indexedDB){
    $scope.frmUsuario = {};
    $scope.novo = function(form) {
      var dataObject = {
        nome: $scope.frmUsuario.nome,
        idade: $scope.frmUsuario.idade
      };
      $http.post("http://localhost:3000/usuarios.json", dataObject).success(function(data){
        $scope.usuarios = data;
        $location.path("/lista");
      });
    };
  }]);

  app.controller('UsuarioEditarCtrl', ['$scope', '$routeParams', '$http', '$location', '$indexedDB', function($scope, $routeParams, $http, $location, $indexedDB){
    $scope.frmUsuario = {};
    $http.get("http://localhost:3000/usuarios/" + $routeParams.usuarioId + ".json").success(function(data){
      // $scope.frmUsuario = data;
    });
    $scope.editar = function(form) {
      var dataObject = {
        nome: $scope.frmUsuario.nome,
        idade: $scope.frmUsuario.idade,
        id: $scope.frmUsuario.id
      };
      $http.put("http://localhost:3000/usuarios.json", dataObject).success(function(data){
        $scope.usuarios = data;
        $location.path("/lista");
      });
    };
  }]);

})();