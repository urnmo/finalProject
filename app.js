let app = angular.module('MedFormsApp', ['ui.router']);

//state provider & states
app.config(function ($stateProvider) {

    $stateProvider.state({
        name: "forms",
        url: "/forms",
        component: "formsPage",
    })

    $stateProvider.state({
        name: "records",
        url: "/records",
        component: "recordsPage"
    })
});

//forms page component
app.component("formsPage", {
    templateUrl: "formPage.html",
    controller: "formPageController",
});
// RecordsPage component
app.component("recordsPage", {
    templateUrl: "recordsView.html",
    controller: "recordsPageController",
});
// Login page controller
app.controller("loginPageController", function ($scope, $http) {
    console.log("load1");
     // need to take the value of ng-model=“username" ng-model="password" and push to a new object to send to backend
    let user = {
        username: null,
        password: null,
        valid: null,
    };
   
    $scope.loggedIn = true;

    $scope.loginUser = function ($scope) {
       username =  $scope.username;
        password =  $scope.password;
        console.log(user);
        return user
    };

});

// FormsPage controller
app.controller("formsPageController", function ($scope, formsPageService) {
    console.log("load2");
    $scope.forms = formsPageService.allForms();
});

// RecordsPage controller
app.controller("recordsPageController", function ($scope) {
    console.log("load3");
});


// FormsPageService
app.factory("formsPageService", function ($http) {
    // render titles/links to all available forms
    let forms = [{title: "form1", description: "This is the foot form."}, {title: "form2", description: "This is the back form."}, {title: "form3", description: "This is the neck form."}, {title: "form4", description: "This is the arm form."},];
    //  is this where I need a listener/callback
    // $http({
    //     method: "GET",
    //     url: "",
    // }).then(function (response) {
    //     angular.copy(response.data, allForms);
    // });
    // return {
    //     getForms: function () {
    //         return allForms;
    //     }
    // }
    //function: request all users from backend
    // render all users
    return{ 
        allForms: function (){return forms;}
    }

});
// function: when form is clicked make a request to the backend for specific form and if it is a returning user populate user info. 
// display selected form in a new window 

// RecordsPageService
app.factory("recordsPageService", function (http) {
    // function: request all results from the backend
    // $http({
    //     method: "GET",
    //     url: "",
    // }).then(function (response) {
    //     angular.copy(response.data, allRecords);
    // });
    // return {
    //     getRecords: function () {
    //         return allRecords;
    //     }
    // }
    // function: search through the backend for user results
    // render search results
});









