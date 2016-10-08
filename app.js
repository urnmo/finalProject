let app = angular.module('MedFormsApp', ['ui.router']);

//state provider & states
app.config(function ($stateProvider){
    $stateProvider.state({
        name: "loginState",
        url: "/login",
        component:"loginPage",
    })

});
// Login page component
app.component("loginPage",{
    templateUrl: "loginPage.html",
    controller: "loginController",
});


// Login page controller
app.controller("loginPageController", function($scope){
    $scope.username = "";
    $scope.password = "";
    let credentials = {
            userName:"",
            passWord:"",
            valid:"",
    };

    $scope.loginUser = function(){
        if ($scope.username !== "" && $scope.password !== "") 
            {$scope.username.push(credentials); 
            $scope.password.push(credentials);
            $http({
                method: 'POST',
                url: "",
            })
        }
    }
})


// LoginService

// need to take the value of ng-model=“username" ng-model="password" and push to a new object to send to backend
// need to receive validation from backend that user is valid
// if user is valid then load homepage