let app = angular.module('MedFormsApp', ['ui.router']);

//state provider & states
app.config(function ($stateProvider) {
    $stateProvider.state({
        name: "loginState",
        url: "/login",
        component: "loginPage",
    })
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
// Login page component
// app.component("loginPage", {
//     templateUrl: "loginView.html",
//     controller: "loginPageController",
// });
//forms page component
app.component("formsPage", {
    templateUrl: "formView.html",
    controller: "formViewController",
})
// RecordsPage component
app.component("recordsPage", {
    templateUrl: "recordsView.html",
    controller: "recordsPageController",
})
// Login page controller
app.controller("loginPageController", function ($scope) {
    console.log("load1");
     // need to take the value of ng-model=“username" ng-model="password" and push to a new object to send to backend
    let credentials = {
        userName: null,
        passWord: null,
        valid: null,
    };

    $scope.loginUser = function () {
        username = $scope.userName;
        password = $scope.passWord;
        console.log("credentials");
        return credentials
    };

});

// FormsPage controller
app.controller("formsPageController", function ($scope) {
    console.log("load2");
    $scope.forms = formsPageService.allForms();
})

// RecordsPage controller
app.controller("recordsPageController", function ($scope) {
    console.log("load3");
})

//login page service
// app.factory("loginPageService", function () {
//     // LoginService
//    
//     let credentials = {
//         userName: null,
//         passWord: null,
//         valid: null,
//     };

//     return {
//         loginUser: function (username, password) {
//             if (username !== "" && password !== "") {
//                 credentials = username, password;
//                 loginPageService.username = "";
//                 loginPageService.password = "";
//                 console.log(credentials);
//                 return credentials
//             }
//         }
//     }
// })

// FormsPageService
app.factory("formsPageService", function ($http) {
    // render titles/links to all available forms
    let forms = [];
    //  is this where I need a listener/callback
    $http({
        method: "GET",
        url: "",
    }).then(function (response) {
        angular.copy(response.data, allForms);
    });
    return {
        getForms: function () {
            return allForms;
        }
    }
    //function: request all users from backend
    // render all users


});
// function: when form is clicked make a request to the backend for specific form and if it is a returning user populate user info. 
// display selected form in a new window 

// RecordsPageService
app.factory("recordsPageService", function (http) {
    // function: request all results from the backend
    $http({
        method: "GET",
        url: "",
    }).then(function (response) {
        angular.copy(response.data, allRecords);
    });
    return {
        getRecords: function () {
            return allRecords;
        }
    }
    // function: search through the backend for user results
    // render search results
});









