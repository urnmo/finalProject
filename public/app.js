'use strict';

var app = angular.module('MedFormsApp', ['ui.router']);

//state provider & states
app.config(function ($stateProvider) {

    $stateProvider.state({
        name: "login",
        url: "/login",
        component: "graphic"
    });

    $stateProvider.state({
        name: "forms",
        url: "/forms",
        component: "formsPage"
    });

    $stateProvider.state({
        name: "records",
        url: "/records",
        component: "recordsPage"
    });

    $stateProvider.state({
        name: "recordItself",
        url: "/recordItself/:id",
        component: "recordItself"
    });

    $stateProvider.state({
        name: "formItself",
        url: "/formItself/:qid",
        component: "formItself"
    });
});

//records component
app.component("recordItself", {
    templateUrl: "recordItself.html",
    controller: "recordItselfController"
});

//login page component
app.component("headerPage", {
    templateUrl: "headerPage.html",
    controller: "headerPageController"
});

//footer page component
app.component("footerPage", {
    templateUrl: "footerPage.html",
    controller: "footerPageController"
});

//graphic page component
app.component("graphic", {
    templateUrl: "graphic.html",
    controller: "graphicController"
});
//forms page component
app.component("formsPage", {
    templateUrl: "formPage.html",
    controller: "formPageController"
});

// RecordsPage component
app.component("recordsPage", {
    templateUrl: "recordsView.html",
    controller: "recordsPageController"
});

//form component
app.component("formItself", {
    templateUrl: "formItself.html",
    controller: "formItselfController"
});

// headerPage page controller
app.controller("headerPageController", function ($scope, $http, $state, loginService) {
    console.log("load1");
    $scope.loginUser = function (username, password) {
        loginService.loginUser(username, password);
        $state.go("forms");
    };
    $scope.user = loginService.user();
});

// footerPage controller
app.controller("footerPageController", function ($scope, $state, $http, loginService) {
    console.log("load1a");
    $scope.user = loginService.user();
    $scope.logout = function () {
        loginService.logout();
        $state.go('login');
    };

    $state.go("login");

    // todo: you call a function called 'logout' but it doesnt exist
});

// graphicController
app.controller("graphicController", function ($scope, $stateParams, loginService) {
    $scope.user = loginService.user();
});

//formItselfController
app.controller("formItselfController", function ($scope, $http, $stateParams, loginService, formsPageService, $state) {
    $scope.user = loginService.user();
    if ($scope.user.loggedIn === true) {
        console.log("load 4x");
        $scope.form = formsPageService.getForm();
        $scope.qid = parseInt($stateParams.qid);

        $scope.next = function () {
            $state.go('formItself', { qid: parseInt($stateParams.qid) + 1 });
        };
        $scope.back = function () {
            $state.go('formItself', { qid: parseInt($stateParams.qid) - 1 });
        };

        $scope.submit = function () {
            // route to login page
            // post answers to backend
            formsPageService.submit();
            console.log("pushed that shit");
            loginService.logout();
            $state.go('login');
        };
    }

    // get question #x and show it
    // $stateParams.qid;
    // if its not the last question, show the next button
    // if its not the first question, show the prev button
    // show submit when its the last
});

// FormsPage controller
app.controller("formPageController", function ($http, $scope, loginService, $stateParams, formsPageService, $state) {
    $scope.user = loginService.user();
    if ($scope.user.loggedIn === true) {
        console.log("load2");
        $scope.forms = formsPageService.allForms();
        $scope.patients = formsPageService.allPatients();
        $scope.target = function () {
            formsPageService.target($scope.chosenForm, $scope.chosenPatient);
            $state.go('formItself', { qid: 0 });
        };
    } else {
        $state.go('login');
    }
});

// RecordsPage controller
app.controller("recordsPageController", function ($scope, recordsPageService, loginService, $stateParams) {
    $scope.user = loginService.user();
    if ($scope.user.loggedIn === true) {
        console.log("load3");
        $scope.records = recordsPageService.getRecords();
        $scope.target = function () {
            recordsPageService.target(records.id);
            $state.go('recordItself');
        };
    }
});

//recorditselfcontroller
app.controller("recordItselfController", function ($scope, $http, $stateParams, loginService, recordsPageService) {
    $scope.user = loginService.user();
    if ($scope.user.loggedIn === true) {
        console.log('load5');
        var id = parseInt($stateParams.id);
        $scope.recordItself = recordsPageService.recordItself(id);
    }
});

// FormsPageService
app.factory("formsPageService", function ($http) {
    // render titles/links to all available forms
    var forms = [{ id: 1, title: "form1", description: "This is the foot form." }, { id: 2, title: "form2", description: "This is the back form." }, { id: 3, title: "form3", description: "This is the neck form." }, { id: 4, title: "form4", description: "This is the arm form." }];

    var patients = [{ firstName: "Dave", lastName: "Blanton", id: 1 }, { firstName: "Ted", lastName: "Kay", id: 2 }, { firstName: "Andy", lastName: "Jones", id: 3 }, { firstName: "Jeb", lastName: "Bush", id: 4 }, { firstName: "Pedro", lastName: "Martinez", id: 5 }];
    var formItself = null;
    var fidPid = {
        fid: null,
        pid: null
    };

    return {
        allForms: function allForms() {
            $http({
                method: "GET",
                url: "https://radiant-brook-98763.herokuapp.com/forms"
            }).then(function (response) {
                angular.copy(response.data, forms);
                console.log('getting data');
            });
            return forms;
        },

        allPatients: function allPatients() {
            $http({
                method: "GET",
                url: "https://radiant-brook-98763.herokuapp.com/patients"
            }).then(function (response) {
                angular.copy(response.data, patients);
            });
            return patients;
        },

        target: function target(chosenForm, chosenPatient) {
            fidPid.fid = chosenForm;
            fidPid.pid = chosenPatient;
            return fidPid;
        },

        getForm: function getForm() {
            console.log("you runnin boss");
            if (formItself === null) {
                formItself = {};

                $http({
                    method: "GET",
                    url: "https://radiant-brook-98763.herokuapp.com/forms" + "/" + fidPid.fid + "/" + fidPid.pid
                }).then(function (response) {
                    angular.copy(response.data, formItself);
                    console.log(response);
                });
            }

            console.log(formItself);

            return formItself;
        },
        submit: function submit() {
            console.log(formItself);
            var answers = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = formItself.form.questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var question = _step.value;

                    answers.push(question.answer);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            console.log(answers);
            // angular.copy(formItself, answers); // issue

            $http({
                method: "POST",
                url: "https://radiant-brook-98763.herokuapp.com/records/" + fid.Pid.fid + "/" + fidPid.pid,
                data: answers
            });
        }
    };
});
// function: when form is clicked make a request to the backend for specific form and if it is a returning user populate user info. 

// RecordsPageService
app.factory("recordsPageService", function ($http) {
    var records = [];
    var aRecord = {};
    var id = null;

    // function: request all results from the backend

    return {
        getRecords: function getRecords() {
            console.log("ahoy hoy"), $http({
                method: "GET",
                url: "https://radiant-brook-98763.herokuapp.com/records"
            }).then(function (response) {
                angular.copy(response.data, records);
            });
            console.log(records);
            return records;
        },

        recordItself: function recordItself(id) {
            $http({
                method: "GET",
                url: "https://radiant-brook-98763.herokuapp.com/records" + "/" + id
            }).then(function (response) {
                console.log(response.data);
                angular.copy(response.data, aRecord);
                console.log(response);
            });
            return aRecord;
        },
        getRec: function getRec() {
            return aRecord;
        }
    };
});

app.factory("loginService", function () {
    // need to take the value of ng-model=“userfirstName" ng-model="password" and push to a new object to send to backend
    var _user = {
        username: "Fred",
        password: null,
        loggedIn: false
    };
    console.log(_user);

    return {

        logout: function logout() {
            _user.username = "";
            _user.password = "";
            _user.loggedIn = false;
            console.log('logging out');
            console.log(_user);

            return _user;
        },

        loginUser: function loginUser(username, password) {
            _user.username = username;
            _user.password = password;
            console.log(_user);
            _user.loggedIn = true;
            return _user;
        },
        user: function user() {
            return _user;
        }
    };
});