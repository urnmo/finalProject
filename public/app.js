let app = angular.module('MedFormsApp', ['ui.router']);

//state provider & states
app.config(function ($stateProvider) {
    $stateProvider.state({
        name: "loginState",
        url: "/login",
        component: "loginPage",
    })

});
// Login page component
app.component("loginPage", {
    templateUrl: "loginPage.html",
    controller: "loginController",
});


// Login page controller
app.controller("loginPageController", function ($scope, loginPageService) {
    console.log("load1"),
    $scope.credentials = loginPageService.loginUser();
});

app.factory("loginPageService", function () {
    let credentials = {
        userName: null,
        passWord: null,
        valid: null,
    };

    return {
        loginUser: function (username, password) {
            if (username !== "" && password !== "") {
                credentials = username, password;
                loginPageService.username = "";
                loginPageService.password = "";
                console.log(credentials);
                return credentials
            }
        }
    }
})

// LoginService

// need to take the value of ng-model=“username" ng-model="password" and push to a new object to send to backend
// need to receive validation from backend that user is valid
// if user is valid then load homepage