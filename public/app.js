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

    $scope.loginUser = function (username, password) {
        user.username = username;
        user.password = password
        console.log(user);
        return user
    };

});

// FormsPage controller
app.controller("formPageController", function ($scope, formsPageService) {
    console.log("load2");
    $scope.forms = formsPageService.allForms();
    $scope.patients = formsPageService.allPatients();
    $scope.chosen = null;
    $scope.getForm = function (){
        console.log($scope.chosen);
    }
});

// RecordsPage controller
app.controller("recordsPageController", function ($scope, recordsPageService) {
    console.log("load3");
    $scope.records = recordsPageService.allRecords();
});


// FormsPageService
app.factory("formsPageService", function () {
    // render titles/links to all available forms
    let forms = [{title: "form1", description: "This is the foot form."}, {title: "form2", description: "This is the back form."}, {title: "form3", description: "This is the neck form."}, {title: "form4", description: "This is the arm form."},];

    let patients = [{name: "Dave Blanton", id: 1}, {name: "Ted Kay", id: 2}, {name: "Andy Jones", id: 3}, {name: "Jeb Bush", id: 4}, {name: "Pedro Martinez", id: 5}, ];


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
        allForms: function (){return forms;},
        allPatients: function(){return patients;},
        getForms: function(){
            for (let i = 0; i < forms.length; i++){

            }

        }
    }

});
// function: when form is clicked make a request to the backend for specific form and if it is a returning user populate user info. 
// display selected form in a new window 

// RecordsPageService
app.factory("recordsPageService", function () {
    let records = [{formId: 1, patient: "Bill Murray", date: "11/24/2016", form: "a"}, {formId: 2, patientID: "Dame Edna", date: "10/24/2016",form: "a"}, {formId: 3, patientID: "Gilda Radner", date: "11/15/2016",form: "a"}, {formId: 1, patientID: "Bill Murray", date: "11/24/2016",form: "a"}, {formId: 1, patientID: "Bill Murray", date: "11/24/2016",form: "a"}, {formId: 1, patientID: "Bill Murray", date: "11/24/2016",form: "a"}, {formId: 1, patientID: "Bill Murray", date: "11/24/2016",form: "a"}]
    
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
    return{
        allRecords: function(){return records;},
    }
});









