var myApp = angular.module('myApp');

myApp.controller('MsgCtrl', function ($scope, auth) {
  $scope.message = '';

});

myApp.controller('RootCtrl', function (auth, $scope) {
  $scope.$parent.message = 'Welcome ' + auth.profile.name + '!';
  $scope.auth = auth;
});

myApp.controller('LoginCtrl', function (auth, $scope, $cookies, $state) {
  $scope.user = '';
  $scope.pass = '';

  function onLoginSuccess() {
    $scope.$parent.message = '';
    $state.go('root');
    $scope.loading = false;
  }

  function onLoginFailed() {
    $scope.$parent.message = 'invalid credentials';
    $scope.loading = false;
  }

  $scope.submit = function () {
    $scope.$parent.message = 'loading...';
    $scope.loading = true;

    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      popup: true,
      password: $scope.pass,
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.$parent.message = 'loading...';
    $scope.loading = true;

    auth.signin({
      popup: true,
      connection: 'google-oauth2',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };
});

myApp.controller('LogoutCtrl', function (auth, $scope, $state) {
  auth.signout();
  $scope.$parent.message = '';
  $state.go('login');
});
