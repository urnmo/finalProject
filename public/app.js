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

    $stateProvider.state({
        name: "recordItself",
        url: "/recordItself/:id",
        component: "recordItself"
    })

    $stateProvider.state({
        name: "formItself",
        url: "/formItself",
        component: "formItself"
    })
});

//records component
app.component("recordItself", {
    templateUrl: "recordItself.html",
    controller: "recordItselfController",
});

//login page component
app.component("headerPage", {
    templateUrl: "headerPage.html",
    controller: "headerPageController",
});

//footer page component
app.component("footerPage", {
    templateUrl: "footerPage.html",
    controller: "footerPageController",
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

//form component
app.component("formItself", {
    templateUrl: "formItself.html",
    controller: "formItselfController",
});


//recorditselfcontroller
app.controller("recordItselfController", function ($scope, $http, $stateParams, recordItselfService) {
    console.log('load5')
    $scope.recordItself = recordItselfService.get($stateParams.id);
    console.log($stateParams.id);
})

//formItselfController
app.controller("formItselfController", function ($scope, $http, formItselfService) {
    console.log("load 4");
    $scope.formItself = formItselfService.get();
    $scope.booleanQ = true;
});


// Login page controller
app.controller("headerPageController", function ($scope, $http, headerPageService) {
    console.log("load1");
    $scope.loggedIn = true;
});

// footerPage controller
app.controller("footerPageController", function ($scope, $http, headerPageService) {
    console.log("load1a");
    $scope.loggedIn = true;
});



// FormsPage controller
app.controller("formPageController", function ($scope, formsPageService) {
    console.log("load2");
    $scope.forms = formsPageService.allForms();
    $scope.patients = formsPageService.allPatients();
    $scope.chosenPatient = 'null';
    $scope.chosenForm = null;
    $scope.getForm = function () {
        console.log("button pushed");
        console.log($scope.chosenForm, $scope.chosenPatient);
        formsPageService.getForm($scope.chosenForm, $scope.chosenPatient); //pass in parameters here?
        console.log();
    }
});

// RecordsPage controller
app.controller("recordsPageController", function ($scope, recordsPageService, $stateParams) {
    console.log("load3");
    $scope.records = recordsPageService.allRecords();

});


// FormsPageService
app.factory("formsPageService", function () {
    // render titles/links to all available forms
    let forms = [{ id: 1, title: "form1", description: "This is the foot form." }, { id: 2, title: "form2", description: "This is the back form." }, { id: 3, title: "form3", description: "This is the neck form." }, { id: 4, title: "form4", description: "This is the arm form." },];

    let patients = [{ firstName: "Dave", lastName: "Blanton", id: 1 }, { firstName: "Ted", lastName: "Kay", id: 2 }, { firstName: "Andy", lastName: "Jones", id: 3 }, { firstName: "Jeb", lastName: "Bush", id: 4 }, { firstName: "Pedro", lastName: "Martinez", id: 5 },];

        return {
            allForms: function () {
                $http({
                    method: "GET",
                    url: "https://radiant-brook-98763.herokuapp.com/forms"
                }).then(function (response) {
                    angular.copy(response.data, forms);
                });
                return forms;
            },

            allPatients: function () {
                $http({
                    method: "GET",
                    url: "https://radiant-brook-98763.herokuapp.com/user/1/patients"
                }).then(function (response) {
                    angular.copy(response.data, patients);
                })
                return patients;
            },
            getForm: function (chosenPatient, chosenForm) {
                console.log(chosenForm);
                console.log(chosenPatient);
                //pass in parameters here?
                //search through all patients. if the current patient matches the value of the chosen patient, keep that value.
                // search through all patients. if the current patient matches the value of the chosen patient, keep that value.
                $http({
                    method: "GET",
                    url: "https://radiant-brook-98763.herokuapp.com/forms" + "/" + chosenForm + "/" + chosenPatient,
                }).then(function (response) {
                    angular.copy(response.data, formItself);
                });
            },
            get: function () { return formItself },

        }

    });
// function: when form is clicked make a request to the backend for specific form and if it is a returning user populate user info. 
// display selected form in a new window 

// RecordsPageService
app.factory("recordsPageService", function () {
    let records = [{ id: 22324, name: "Foot Form", date: "11/24/2016", patient: { firstName: "Earl", lastName: "Scruggs" } },]

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
    return {
        allRecords: function () { return records; },
    }
});
app.factory("headerPageService", function () {
    // need to take the value of ng-model=“userfirstName" ng-model="password" and push to a new object to send to backend
    let user = {
        username: null,
        password: null,
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

    return {
        loginUser: function (username, password) {
            user.username = username;
            user.password = password
            console.log(user);
            return user
        },
        user: function () { return user },
    };

})

app.factory("formItselfService", function () {
    let formItself = {
        formName: "Foot Form",
        date: null,
        patient: {
            firstName: "Jeb",
            lastName: "Gladys",
        },
        questions: [
            {
                id: null,
                title: "Pain1",
                type: "booleanQ",
                text: "Are you experiencing pain today?",
                answerValue: null,
                first: true,
                last: false,
            },
            {
                id: null,
                title: "Pain2",
                type: "scale1-10",
                text: "Rate your pain on scale",
                answerValue: null,
                first: false,
                last: false,

            },
            {
                id: null,
                title: "Pain3",
                type: "fillIn",
                text: "Describe your pain today.",
                answerValue: null,
                first: false,
                last: false,
            },
            {
                id: null,
                title: "Pain4",
                type: "ifYesRate",
                text: "Are you experiencing pain today? If 'Yes, please rate it.",
                answerValue: null,
                first: false,
                last: false,
            },
            {
                id: null,
                title: "Pain5",
                type: "checkBox",
                text: "Choose answer that best fits your pain.",
                answerValue: null,
                first: false,
                last: true,
            },
        ],

    };
    //  is this where I need a listener/callback
    // $http({
    //     method: "POST",
    //     url: "",
    // }).then(function (response) {
    //     angular.copy(response.data, getForm);
    // });
    // return {
    //     form: function () {
    //         return ;
    //     }
    // }

    return {
        get: function () { return formItself },
    }



})

app.factory("recordItselfService", function () {
    let recordItself = {
        id: 12324,
        name: "Foot Form",
        date: null,
        patient: {
            firstName: "Jeb",
            lastName: "Gladys",
        },
        records: [
            {
                id: null,
                title: "Pain1",
                type: "booleanQ",
                text: "Are you experiencing pain today?",
                answerValue: "yes",
            },
            {
                id: null,
                title: "Pain2",
                type: "scale1-10",
                text: "Rate your pain on scale",
                answerValue: "7",
            },
            {
                id: null,
                title: "Pain4",
                type: "ifYesRate",
                text: "Are you experiencing pain today? If 'Yes, please rate it.",
                answerValue: "9",
            },
            {
                id: null,
                title: "Pain5",
                type: "checkBox",
                text: "Choose answer that best fits your pain.",
                answerValue: '5',
            },
        ],
    }
    return {
        get: function () { return recordItself },
    }
});







