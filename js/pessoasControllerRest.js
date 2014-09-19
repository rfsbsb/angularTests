(function(){
  var app = angular.module('pessoas', []);

  app.controller('PessoaListCtrl', ['$scope', '$http', '$indexedDB', function($scope, $http, $indexedDB){
    // $http.get("http://localhost:3000/pessoas.json").success(function(data){
    //   $scope.pessoas = data;
    // });
    var OBJECT_STORE_NAME = 'pessoas';
    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);
    myObjectStore.getAll().then(function(results) {
      // Update scope
      $scope.pessoas = results;
    });

  }]);

  app.controller('PessoaDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    // $http.get("http://localhost:3000/pessoas/" + $routeParams.pessoaId +".json").success(function(data){
    //   $scope.pessoa = data;
    // });
    var OBJECT_STORE_NAME = 'pessoas';
    var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);
    myObjectStore.find('id', $routeParams.pessoaId).then(function(results) {
      $scope.objects = results;
    });
  }]);

  app.controller('PessoaAdicionarCtrl', ['$scope', '$routeParams', '$http', '$upload', '$location', '$indexedDB', function($scope, $routeParams, $http, $upload, $location, $indexedDB){
    $scope.frmPessoa = {};
    $scope.files = {};

    $scope.onFileSelect = function($files) {
      $scope.files = $files;
    };

    $scope.criar = function(form, $files) {
      var dataObject = {
        'pessoa[nome]'      : $scope.frmPessoa.nome,
        'pessoa[idade]'     : $scope.frmPessoa.idade,
        'pessoa[sexo]'      : $scope.frmPessoa.sexo,
        'pessoa[nascimento]': $scope.frmPessoa.nascimento
      };

      var OBJECT_STORE_NAME = 'pessoas';
      var myObjectStore = $indexedDB.objectStore(OBJECT_STORE_NAME);
      var id = Math.floor((Math.random() * 10) + 1);
      myObjectStore.insert({'id': id, "nome": $scope.frmPessoa.nome, "idade": $scope.frmPessoa.idade}).then(function(e){
        $location.path('/list');
      });

      myObjectStore.getAll().then(function(results) {
        $scope.objects = results;
      });

      // $scope.upload = $upload.upload({
      //   url: "http://localhost:3000/pessoas.json",
      //   method: 'POST',
      //   data: dataObject,
      //   file: $scope.files,
      //   fileFormDataName: 'pessoa[foto]',
      // }).success(function (data, status, headers, config) {
      //   console.log(data);
      //   $location.path('/list');
      // }).error(function (data, status, headers, config) {
      //   console.log(data);
      //   alert('falha');
      // });
    };
  }]);

  app.controller('PessoaRemoverCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
    // $http.delete("http://localhost:3000/pessoas/" + $routeParams.pessoaId + ".json").success(function(data){
    //   $location.path('/list');
    // });
  }]);

  app.controller('PessoaAtualizarCtrl', ['$scope', '$routeParams', '$http', '$upload', '$location', function($scope, $routeParams, $http, $upload, $location){
    // $http.get("http://localhost:3000/pessoas.json").success(function(data){
    //   $scope.frmPessoa = data;
    // });

    // $scope.files = {};

    // $scope.onFileSelect = function($files) {
    //   $scope.files = $files;
    // };

    // $scope.atualizar = function(form, $files) {
    //   var dataObject = {
    //     'pessoa[nome]'      : $scope.frmPessoa.nome,
    //     'pessoa[idade]'     : $scope.frmPessoa.idade,
    //     'pessoa[sexo]'      : $scope.frmPessoa.sexo,
    //     'pessoa[nascimento]': $scope.frmPessoa.nascimento
    //   };
    //   $scope.upload = $upload.upload({
    //     url: "http://localhost:3000/pessoas.json",
    //     method: 'PUT',
    //     data: dataObject,
    //     file: $scope.files,
    //     fileFormDataName: 'pessoa[foto]',
    //   }).success(function (data, status, headers, config) {
    //     console.log(data);
    //     $location.path('/list');
    //   }).error(function (data, status, headers, config) {
    //     console.log(data);
    //     alert('falha');
    //   });
    // };
  }]);

})();