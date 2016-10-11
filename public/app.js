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
//login page component
app.component("headerPage",{
    templateUrl: "headerPage.html",
    controller: "headerPageController",
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
app.controller("headerPageController", function ($scope, $http, headerPageService ) {
    console.log("load1");    
    $scope.loggedIn = true;

});

// FormsPage controller
app.controller("formPageController", function ($scope, formsPageService) {
    console.log("load2");
    $scope.forms = formsPageService.allForms();
    $scope.patients = formsPageService.allPatients();
    $scope.chosenPatient = 'larry';
    $scope.chosenForm = null;
    $scope.getForm = function (){
        console.log("button pushed");
        console.log($scope.chosenForm, $scope.chosenPatient);
        formsPageService.getForm($scope.chosenForm, $scope.chosenPatient); //pass in parameters here?
        console.log();
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
    let forms = [{formId:1, title: "form1", description: "This is the foot form."}, {formId:2, title: "form2", description: "This is the back form."}, {formId:3, title: "form3", description: "This is the neck form."}, {formId:4, title: "form4", description: "This is the arm form."},];

    let patients = [{name: "Dave Blanton", id: 1}, {name: "Ted Kay", id: 2}, {name: "Andy Jones", id: 3}, {name: "Jeb Bush", id: 4}, {name: "Pedro Martinez", id: 5}, ];

let patientView = {chosenPatient: null,
                    chosenForm: null, };
    return{ 
        allForms: function (){return forms;},
        allPatients: function(){return patients;},
        getForm: function(chosenPatient, chosenForm){ 
            console.log(chosenForm);
            console.log(chosenPatient);
            //pass in parameters here?
            //search through all patients. if the current patient matches the value of the chosen patient, keep that value.

    // $http({
    //     method: "POST",
    //     url: "",
    // }).then(function (response) {
    //     angular.copy(response.data, );
    // });
    // return {
    //     getForms: function () {
    //         return ;
    //     }
    // }
    // function: request specific forms
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
app.factory("headerPageService", function(){
     // need to take the value of ng-model=“username" ng-model="password" and push to a new object to send to backend
    let user = {
        username: null,
        password: null,
        valid: null,
    };
   
    //  is this where I need a listener/callback
    // $http({
    //     method: "GET",
    //     url: "",
    // }).then(function (response) {
    //     angular.copy(response.data, loginUser);
    // });
    // return {
    //     user: function () {
    //         return user;
    //     }
    // }

  return{
    loginUser: function (username, password) {
        user.username = username;
        user.password = password
        console.log(user);
        return user
        },
    user: function(){return user},
    };

})








