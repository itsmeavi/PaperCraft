/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('papercraft', ['summernote', 'ngSanitize'])
        .controller('DashBoardController', ['$scope', function ($scope) {
                
                /** EMPTY CONTROLLER **/
                
        }])
        .controller('QuestionBankController', ['$scope', 'standardsListService', 'courseListService', 'programmeListService', 'questionBankService', function($scope, standardsListService, courseListService, programmeListService, questionBankService) {
                
                var standardsListJSONController = standardsListService.getStandards();
                var courseListJSONController = courseListService.getCourses();
                var programmeListJSONController = programmeListService.getProgrammes();
                
                var setInitialJSON = function () {
                    $scope.MCQOPTIONNUM = 2;
                    $scope.optionValue = '1';
                    $scope.tfaAnswer = 'false';

                    // Required in Filling Blanks
                    $scope.flagWhetherOrdersAreAdjascent = true;
                    $scope.isDashPresentFillingBlank = true;
                    $scope.isBlankAdded = false;


                    $scope.isQuestionStandardDropdownEmpty = false;
                    $scope.isQuestionProgrammeDropdownEmpty = false;
                    $scope.isQuestionCourseDropdownEmpty = false;
                    $scope.isQuestionTypeDropdownEmpty = false;
                    $scope.isQuestionMinMarksInputEmpty = false;
                    $scope.isQuestionMaxMarksInputEmpty = false;

                    $scope.questionBank = {
                        question: '',
                        questionCourse: '',
                        questionProgramme: '',
                        questionStandard: '',
                        questionType:'',
                        minMarks: '',
                        maxMarks: ''
                    };


                    $scope.questionBank['fillingBlank'] = [];

                    $scope.MCQOPTIONNUM = 2;
                    $scope.questionBank['optionNum'] = 2;
                    $scope.questionBank['mcqOptions'] = [
                            {
                                option: '',
                                isCorrectAnswer: false
                            },
                            {
                                option: '',
                                isCorrectAnswer: false
                            }
                        ];


                    $scope.questionBank['qAnswer'] = '';


                    $scope.questionBank['trueFalseAnswer'] = "false";

                    $scope.questionBank.multipleAnswerOptions = [
                                    {
                                        option: '',
                                        isCorrectAnswer: true
                                    },
                                    {
                                        option: '',
                                        isCorrectAnswer: false
                                    }
                                ];
                                
                    $scope.questionBank.matchOptions = [];
                    $scope.addedMatchOptions = [
                        {
                            option: '',
                            inList: ''
                        }
                    ];
                    $scope.hasMatchingStarted = false;
                    $scope.optionInListA = [];
                    $scope.optionInListB = [];
                    $scope.inListForMatchOptions = ['A', 'B'];
                    $scope.questionBank.matchOptionNum = 0;
                    $scope.optionNotInA = false;
                    $scope.OptionNotInB = false;

                };
                
                setInitialJSON();
                
                $scope.programmeListInCreateQuestion = [];
                $scope.courseListInCreateQuestion = [];
                $scope.standardsListInCreateQuestion = [];
                
                
                for ( var standard in standardsListJSONController) {
                    if (standardsListJSONController[standard].isStandardDeleted === false) {
                        $scope.standardsListInCreateQuestion.push(standardsListJSONController[standard]);
                    }
                }
                
                for ( var course in courseListJSONController) {
                    if (courseListJSONController[course].isCourseDeleted === false) {
                        $scope.courseListInCreateQuestion.push(courseListJSONController[course]);
                    }
                }
                
                for ( var programme in programmeListJSONController) {
                    if (programmeListJSONController[programme].isProgrammeDeleted === false) {
                        $scope.programmeListInCreateQuestion.push(programmeListJSONController[programme]);
                    }
                }
                
                $scope.addMCQOption = function() {
                    $scope.questionBank.mcqOptions.push({
                        option: '',
                        isCorrectAnswer: false
                    });
                    $scope.questionBank.optionNum++;
                };
                
                $scope.addMultiAnswerOption = function () {
                    $scope.questionBank.multipleAnswerOptions.push({
                        option: '',
                        isCorrectAnswer: false
                    });
                    $scope.questionBank.optionNum++;
                };
                
                $scope.addBlank = function () {
                    try {
                        var countDash = $scope.questionBank.question.match(/_____/g).length;
                        console.log(countDash);
                        $scope.isDashPresentFillingBlank = true;
                        for (var i = 1; i <= countDash; i++) {
                            $scope.questionBank.fillingBlank.push({
                                fillingBlankAnswer: '',
                                fillingBlankAnswerOrder: ''
                            });
                        }
                        $scope.isBlankAdded = true;
                    }catch (err) {
                        $scope.isDashPresentFillingBlank = false;
                    }
                };
                
                $scope.addMatchingOption = function () {
                    $scope.addedMatchOptions.push({
                        option: '',
                        inList: ''
                    });
                };
                
                $scope.standardDropdownChanged = function() {
                    $scope.isQuestionStandardDropdownEmpty = false;
                };
                
                $scope.courseDropdownChanged = function() {
                    $scope.isQuestionCourseDropdownEmpty = false;
                };
                
                $scope.programmeDropdownChanged = function() {
                    $scope.isQuestionProgrammeDropdownEmpty = false;
                };
                
                $scope.typeDropdownChanged = function() {
                    $scope.isQuestionTypeDropdownEmpty = false;
                };
                
                $scope.minMarksInputChanged = function () {
                    $scope.isQuestionMinMarksInputEmpty = false;
                };
                
                $scope.maxMarksInputChanged = function () {
                    $scope.isQuestionMaxMarksInputEmpty = false;
                };
                
                
                
                
                
                $scope.startMatching = function () {
                    var oneOptionOfAFlag = false;
                    var oneOptionOfBFlag = false;
                    
                    for (var addedMatchOption in $scope.addedMatchOptions) {
                        if( $scope.addedMatchOptions[addedMatchOption].inList === 'A') {
                            oneOptionOfAFlag = true;
                            console.log("outer if " + oneOptionOfAFlag);
                            for (var addedInnerMatchOption in $scope.addedMatchOptions) {
                                if ($scope.addedMatchOptions[addedInnerMatchOption].inList === 'B') {
                                    oneOptionOfBFlag = true;
                                    console.log("inner if " + oneOptionOfBFlag);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    console.log(oneOptionOfAFlag + " " + oneOptionOfBFlag);
                    if (oneOptionOfAFlag == false) {
                        $scope.optionNotInA = true;
                    }
                    else {
                        if (oneOptionOfBFlag == false) {
                            $scope.optionNotInB = true;
                        }
                        else {
                            $scope.hasMatchingStarted = true;
                            for (var addedMatchOption in $scope.addedMatchOptions) {
                                if ($scope.addedMatchOptions[addedMatchOption].inList == 'A') {
                                    $scope.optionInListA.push($scope.addedMatchOptions[addedMatchOption].option);
                                    $scope.questionBank.matchOptions.push({
                                        inList: 'A',
                                        option: $scope.addedMatchOptions[addedMatchOption].option,
                                        correctMatch: ''
                                    });
                                }
                                else {
                                    $scope.optionInListB.push($scope.addedMatchOptions[addedMatchOption].option);
                                }
                            }
                        }
                    }
                    
                    
                };
                
                $scope.inListDropdownChanged = function() {
                    $scope.optionNotInA = false;
                    $scope.optionNotInB = false;
                };
                
                
                /* 
                 *****************************************************************
                 ******************** MODAL QUESTION CREATION ********************
                 *****************************************************************
                 */
                $scope.openQuestionModal = function() {
                    if ($('#qst_standard').val() === '') {
                        $scope.isQuestionStandardDropdownEmpty = true;
                    }
                    else if ($('#qst_course').val() === '') {
                        $scope.isQuestionCourseDropdownEmpty = true;
                    }
                    else if ($('#qst_programme').val() === '') {
                        $scope.isQuestionProgrammeDropdownEmpty = true;
                    }
                    else if ($('#qst_type').val() === '') {
                        $scope.isQuestionTypeDropdownEmpty = true;
                    }
                    else if ($('#qst_minMarks').val() === undefined || $('#qst_minMarks').val() === '') {
                        $scope.isQuestionMinMarksInputEmpty = true;
                    }
                    else if ($('#qst_maxMarks').val() === undefined || $('#qst_maxMarks').val() === '') {
                        $scope.isQuestionMaxMarksInputEmpty = true;
                    }
                    else {

                        if ($scope.questionBank.questionType === 'mcq') {
                            
                            $('#mcqOptionNumHidden').val($scope.MCQOPTIONNUM);
                            $('#mcqQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#mcqQuestionModal').modal('show');
                        }
                        else if ($scope.questionBank.questionType === 'numerical') {
                            $('#numericalQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#numericalQuestionModal').modal('show');
                        }
                        else if ($scope.questionBank.questionType === 'truefalse') {
                            $('#trueFalseQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#trueFalseQuestionModal').modal('show');
                        }
                        else if ($scope.questionBank.questionType === 'longanswer') {
                            $('#longAnswerQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#longAnswerQuestionModal').modal('show');
                        }
                        else if ($scope.questionBank.questionType === 'fillingblanks') {
                            $('#fillingBlanksQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#fillingBlanksQuestionModal').modal('show');
                        }
                        else if ($scope.questionBank.questionType === 'matching') {
                            $('#matchingOptionsQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#matchingOptionsQuestionModal').modal('show');
                        }
                        else {
                            $('#multipleAnswersQuestionModal').modal({
                                backdrop: 'static',
                                keyboard: true
                            });
                            $('#multipleAnswersQuestionModal').modal('show');
                        }
                        
                    }
                    
                    
                };
                
                
                
                
                
                
                
                $scope.sendMCQQuestion = function () {
                    questionBankService.postQuestion($scope.questionBank);
                    for (var option in $scope.questionBank.mcqOptions) {
                        if (option == $scope.optionValue - 1) {
                            $scope.questionBank.mcqOptions[option].isCorrectAnswer = 'true';
                        }
                    }
                    setInitialJSON();
                    $scope.mcqQuestionForm.$setPristine();
                    $('#mcqQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
                
                $scope.sendNumericalQuestion = function () {
                    questionBankService.postQuestion($scope.questionBank);
                    setInitialJSON();
                    $scope.numericalQuestionForm.$setPristine();
                    $('#numericalQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
                
                $scope.sendTrueFalseAnswerQuestion = function () {
                    questionBankService.postQuestion($scope.questionBank);
                    setInitialJSON();
                    $scope.trueFalseQuestionForm.$setPristine();
                    $('#trueFalseQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
                
                $scope.sendLongAnswerQuestion = function () {
                    questionBankService.postQuestion($scope.questionBank);
                    setInitialJSON();
                    $scope.longAnswerQuestionForm.$setPristine();
                    $('#longAnswerQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
                
                $scope.sendMultipleAnswerQuestion = function() {
                    questionBankService.postQuestion($scope.questionBank);
                    setInitialJSON();
                    $scope.multipleAnswerQuestionForm.$setPristine();
                    $('#multipleAnswersQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
                
                $scope.sendFillingBlankQuestion = function () {
                    var orderList = [];
                    console.log($scope.questionBank);
                    for (var blank in $scope.questionBank.fillingBlank) {
                        orderList.push($scope.questionBank.fillingBlank[blank].fillingBlankAnswerOrder);
                    }
                    orderList.sort();
                    $scope.flagWhetherOrdersAreAdjascent = true;
                    console.log(orderList);
                    for (var i = 1; i <= orderList.length; i++) {
                        if (i !== orderList[i-1]) {
                            console.log(i);
                            console.log(orderList[i-1]);
                            $scope.flagWhetherOrdersAreAdjascent = false;
                            break;
                        }
                    }
                    if ($scope.flagWhetherOrdersAreAdjascent === true) {
                        questionBankService.postQuestion($scope.questionBank);
                        setInitialJSON();
                        $scope.numericalQuestionForm.$setPristine();
                        $('#fillingBlanksQuestionModal').modal('hide');
                        console.log($scope.questionBank);
                    }
                    
                };
                
                $scope.sendMatchingOptionQuestion = function (){
                    $scope.questionBank.question = "<---Match the following--->";
                    questionBankService.postQuestion($scope.questionBank);
                    setInitialJSON();
                    $scope.numericalQuestionForm.$setPristine();
                    $('#matchingOptionsQuestionModal').modal('hide');
                    console.log($scope.questionBank);
                };
        }])
        
        .controller('CourseListController', ['$scope', 'courseListService', function($scope, courseListService) {
                
                $scope.setInitialCourseControllerState = function () {
                    $scope.isCoursePresent = false;
                    $scope.coursesList = courseListService.getCourses();
                    $scope.course = {
                        courseName: '',
                        courseDescription: '',
                        isCourseDeleted: false
                    };
                };
                
                $scope.setInitialCourseControllerState();
                
                $scope.checkCourseNamePresent = function() {
                    $scope.isCoursePresent = false;
                    console.log("inside check course name");
                    for (var courseJSON in $scope.coursesList) {
                        if ($scope.coursesList[courseJSON].courseName.toLowerCase() == $scope.course.courseName.toLowerCase()) {
                            $scope.isCoursePresent = true;
                            break;
                        }
                    }
                };
                
                $scope.sendCourse = function () {
                    courseListService.postCourses($scope.course);
                    $scope.setInitialCourseControllerState();
                    $scope.courseListForm.$setPristine();
                    console.log($scope.course);
                };
        }])
            
            .controller('ProgrammeListController', ['$scope', 'programmeListService', function($scope, programmeListService) {
                
                $scope.setInitialProgrammeControllerState = function () {
                    $scope.isProgrammePresent = false;
                    $scope.programmesList = programmeListService.getProgrammes();
                    $scope.programme = {
                        programmeName: '',
                        programmeDescription: '',
                        isProgrammeDeleted: false
                    };
                };
                
                $scope.setInitialProgrammeControllerState();
                
                $scope.checkProgrammeNamePresent = function() {
                    $scope.isProgrammePresent = false;
                    console.log("inside check programme name");
                    for (var programmeJSON in $scope.programmesList) {
                        if ($scope.programmesList[programmeJSON].programmeName.toLowerCase() == $scope.programme.programmeName.toLowerCase()) {
                            $scope.isProgrammePresent = true;
                            break;
                        }
                    }
                };
                
                $scope.sendProgramme = function () {
                    programmeListService.postProgrammes($scope.programme);
                    $scope.setInitialProgrammeControllerState();
                    $scope.programmeListForm.$setPristine();
                    console.log($scope.programme);
                };
        }])
    
            .controller('StandardListController', ['$scope', 'standardsListService', function($scope, standardsListService) {
                
                $scope.setInitialStandardControllerState = function () {
                    $scope.isStandardPresent = false;
                    $scope.standardsList = standardsListService.getStandards();
                    $scope.standard = {
                        standardName: '',
                        standardDescription: '',
                        isStandardDeleted: false
                    };
                };
                
                $scope.setInitialStandardControllerState();
                
                $scope.checkStandardNamePresent = function() {
                    $scope.isStandardPresent = false;
                    console.log("inside check standard name");
                    for (var standardJSON in $scope.standardsList) {
                        if ($scope.standardsList[standardJSON].standardName.toLowerCase() == $scope.standard.standardName.toLowerCase()) {
                            $scope.isStandardPresent = true;
                            break;
                        }
                    }
                };
                
                $scope.sendStandard = function () {
                    standardsListService.postStandards($scope.standard);
                    $scope.setInitialStandardControllerState();
                    $scope.standardListForm.$setPristine();
                    console.log($scope.standard);
                };
        }])
    
        .controller('QuestionBankViewController', ['$scope', '$sce', 'standardsListService', 'programmeListService', 'courseListService', 'questionBankService', function($scope, $sce, standardsListService, programmeListService, courseListService, questionBankService) {
            $scope.listOfQuestionsInBank = questionBankService.getQuestions();
            console.log("Question:");
            console.log($scope.listOfQuestionsInBank);
            $scope.listOfQuestionsForView = [];
            $scope.listOfStandardsForView = standardsListService.getStandards();
            $scope.listOfProgrammesForView = programmeListService.getProgrammes();
            $scope.listOfCoursesForView = courseListService.getCourses();
            
            for(var question in $scope.listOfQuestionsInBank) {
                $scope.listOfQuestionsForView[question] = {
                    'idQuestionBank' : $scope.listOfQuestionsInBank[question].idQuestionBank,
                    'question' : $scope.listOfQuestionsInBank[question].question,
                    'questionType' : $scope.listOfQuestionsInBank[question].questionType
                };
                for (var course in $scope.listOfCoursesForView) {
                    if ($scope.listOfQuestionsInBank[question].questionCourse == $scope.listOfCoursesForView[course].idCourseList) {
                        $scope.listOfQuestionsForView[question].questionCourse = $scope.listOfCoursesForView[course].courseName;
                        break;
                    }
                }
                
                for (var programme in $scope.listOfProgrammesForView) {
                    if ($scope.listOfQuestionsInBank[question].questionProgramme == $scope.listOfProgrammesForView[programme].idProgrammeList) {
                        $scope.listOfQuestionsForView[question].questionProgramme = $scope.listOfProgrammesForView[programme].programmeName;
                        break;
                    }
                }
                
                for (var standard in $scope.listOfStandardsForView) {
                    if ($scope.listOfQuestionsInBank[question].questionStandard == $scope.listOfStandardsForView[standard].idStandardList) {
                        $scope.listOfQuestionsForView[question].questionStandard = $scope.listOfStandardsForView[standard].standardName;
                        break;
                    }
                }
            }
            $('div.container-fluid').ready(function() {
                $('h3.questionView').text(function(index, currString) {
                    return currString.substr(0, 50) + "....";
                });
            });
            
            
            console.log($scope.listOfQuestionsInBank);
        }]) 
    
        .controller('QuestionDetailViewController', ['$scope', '$sce', 'standardsListService', 'programmeListService', 'courseListService', 'questionBankService', function($scope, $sce, standardsListService, programmeListService, courseListService, questionBankService) {
            $scope.questionDetailView = {};
            
                
            var question = questionBankService.getQuestion();
            var listOfCourses = courseListService.getCourses();
            var listOfProgrammes = programmeListService.getProgrammes();
            var listOfStandards = standardsListService.getStandards();
            
            $scope.questionDetailView['question'] = question.question;
            $scope.questionDetailView['questionType'] = question.questionType;
            
            for (var course in listOfCourses) {
                if (listOfCourses[course].idCourseList == question.questionCourse) {
                    $scope.questionDetailView['questionCourseName'] = listOfCourses[course].courseName;
                    break;
                }
            }
            
            for (var standard in listOfStandards) {
                if (listOfStandards[standard].idStandardList == question.questionStandard) {
                    $scope.questionDetailView['questionStandardName'] = listOfStandards[standard].standardName;
                    break;
                }
            }
            
            for (var programme in listOfProgrammes) {
                if (listOfProgrammes[programme].idProgrammeList == question.questionProgramme) {
                    $scope.questionDetailView['questionProgrammeName'] = listOfProgrammes[programme].programmeName;
                    break;
                }
            }
            
            if(question.questionType == 'mcq') {
                $scope.questionDetailView['mcqOptions'] = question.mcqOptions;
            }
            
            else if (question.questionType == 'numerical') {
                $scope.questionDetailView['qAnswer'] = question.qAnswer;
            }
            
            else if (question.questionType == 'truefalse') {
                $scope.questionDetailView['trueFalseAnswer'] = question.trueFalseAnswer;
            }
            
            else if (question.questionType == 'fillingblanks') {
                $scope.questionDetailView['fillingBlank'] = question.fillingBlank;
                
                
                for ( var i = 0; i < $scope.questionDetailView.fillingBlank.length; i++) {
                    for ( var j = 0; j < $scope.questionDetailView.fillingBlank.length - i - 1; j++) {
                        if ($scope.questionDetailView.fillingBlank[j].fillingBlankAnswerOrder > $scope.questionDetailView.fillingBlank[ j+1 ].fillingBlankAnswerOrder) {
                            var tmp = $scope.questionDetailView.fillingBlank[j];
                            $scope.questionDetailView.fillingBlank[j] = $scope.questionDetailView.fillingBlank[j+1];
                            $scope.questionDetailView.fillingBlank[j + 1] = tmp;
                        }
                    }
                }
                
                
            }
            
            else if(question.questionType == 'matching') {
                $scope.questionDetailView['matchOptions'] = question.matchOptions;
            }
            
            else if(question.questionType == 'multipleanswers') {
                $scope.questionDetailView['multipleAnswerOptions'] = question.multipleAnswerOptions;
            }
            
            else {
                
            }
            
        }])
;

