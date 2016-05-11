/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('papercraft')
        .service('standardsListService', [function (){
                
                var standardsJSONList = [
                    {
                        "idStandardList" : 1,
                        "standardName" : 'VI',
                        "standardDescription" : 'Sixth Standard or Grade',
                        "isStandardDeleted" : false
                    },
                    {
                        "idStandardList" : 2,
                        "standardName" : 'VII',
                        "standardDescription" : 'Seventh Standard or Grade',
                        "isStandardDeleted" : false
                    },
                    {
                        "idStandardList" : 3,
                        "standardName" : 'VIII',
                        "standardDescription" : 'Eighth Standard or Grade',
                        "isStandardDeleted" : false
                    },
                    {
                        "idStandardList" : 4,
                        "standardName" : 'IX',
                        "standardDescription" : 'Ninth Standard or Grade',
                        "isStandardDeleted" : true
                    }
                ];
                
                this.postStandards = function (standard) {
                    standard.idStandardList = standardsJSONList.length + 1;
                    standardsJSONList.push(standard);
                    console.log(standardsJSONList);
                };
                
                this.getStandards = function() {
                    return standardsJSONList;
                };
}])
        .service('courseListService', [function() {
                
                var courseJSONList = [
                    {
                        "idCourseList" : 1,
                        "courseName" : 'Mathematics',
                        "courseDescription" : "no desc available",
                        "isCourseDeleted" : false
                    },
                    {
                        "idCourseList" : 2,
                        "courseName" : 'Physics',
                        "courseDescription" : "no desc available",
                        "isCourseDeleted" : false
                    },
                    {
                        "idCourseList" : 3,
                        "courseName" : 'Additional',
                        "courseDescription" : "no desc available",
                        "isCourseDeleted" : true
                    },
                    {
                        "idCourseList" : 4,
                        "courseName" : 'Computer Science',
                        "courseDescription" : "no desc available",
                        "isCourseDeleted" : false
                    }
                ];
                
                this.postCourses = function (course) {
                    course.idCourseList = courseJSONList.length + 1;
                    courseJSONList.push(course);
                    console.log(courseJSONList);
                };
                
                this.getCourses = function() {
                    return courseJSONList;
                };
}])

        .service('programmeListService', function() {
                
                var programmeJSONList = [
                    {
                        "idProgrammeList" : 1,
                        "programmeName" : 'WBBSE',
                        "programmeDescription" : "no desc available",
                        "isProgrammeDeleted" : false
                    },
                    {
                        "idProgrammeList" : 2,
                        "programmeName" : 'CBSE',
                        "programmeDescription" : "no desc available",
                        "isProgrammeDeleted" : false
                    },
                    {
                        "idProgrammeList" : 3,
                        "programmeName" : 'Madrasa',
                        "programmeDescription" : "deleted due to terrorist attacks on our center",
                        "isProgrammeDeleted" : true
                    },
                    {
                        "idProgrammeList" : 4,
                        "programmeName" : 'ICSE',
                        "programmeDescription" : "no desc available",
                        "isProgrammeDeleted" : false
                    }
                ];
                
                this.postProgrammes = function (programme) {
                    programme.idProgrammeList = programmeJSONList.length + 1;
                    programmeJSONList.push(programme);
                    console.log(programmeJSONList);
                };
                
            
                this.getProgrammes = function() {
                    return programmeJSONList;
                };
})
        .service('questionBankService', function() {
            var questionBank = [{
                    question: 'What did <b>God</b> say when he made the first black man? -"Damn, I burnt one"',
                    questionCourse: '2',
                    questionProgramme: '3',
                    questionStandard: '1',
                    questionType:'truefalse',
                    minMarks: '3',
                    maxMarks: '5',
                    trueFalseAnswer : 'true'
            },
            {
                    question: ' How do Chinese people name their babies? ',
                    questionCourse: '2',
                    questionProgramme: '3',
                    questionStandard: '1',
                    questionType:'numerical',
                    minMarks: '3',
                    maxMarks: '5',
                    trueFalseAnswer : false,
                    qAnswer : "They throw them down the stairs to see what noise they make."
            },
            {
                question: 'How do we fuck?',
                questionCourse: '2',
                questionProgramme: '3',
                questionStandard: '1',
                questionType:'mcq',
                minMarks: '3',
                maxMarks: '5',
                trueFalseAnswer : false,
                mcqOptions: [
                    {
                        isCorrectAnswer: "false",
                        option: 'eyes'
                    },
                    {
                        isCorrectAnswer: "false",
                        option: 'hand'
                    },
                    {
                        isCorrectAnswer: "true",
                        option: 'dick'
                    },
                    {
                        isCorrectAnswer: "false",
                        option: 'tongue'
                    }
                ]
            },
            {
                question: 'Why did _____ kill himself? Because he saw his _____ bill. ',
                questionCourse: '2',
                questionProgramme: '3',
                questionStandard: '1',
                questionType:'fillingblanks',
                minMarks: '3',
                maxMarks: '5',
                trueFalseAnswer : false,
                fillingBlank: [
                    {
                            fillingBlankAnswer: 'Hitler',
                            fillingBlankAnswerOrder : 2
                    },
                    {
                            fillingBlankAnswer: 'gas',
                            fillingBlankAnswerOrder : 1
                    }
                ]
            },
            {
                question: "<---Match the following--->",
                questionCourse: '2',
                questionProgramme: '3',
                questionStandard: '1',
                questionType:'matching',
                minMarks: '3',
                maxMarks: '5',
                trueFalseAnswer : false,
                matchOptions: [
                    {
                        option: 'a1',
                        inList: 'A',
                        correctMatch: 'b1'
                    },
                    {
                        option: 'a2',
                        inList: 'A',
                        correctMatch: 'b2'
                    }
                ]
            },
            {
                
                question: "What are powerpuff girls made of?",
                questionCourse: '2',
                questionProgramme: '3',
                questionStandard: '1',
                questionType:'multipleanswers',
                minMarks: '3',
                maxMarks: '5',
                trueFalseAnswer : false,
                multipleAnswerOptions: [
                    {
                        isCorrectAnswer: "true",
                        option: 'sugar'
                    },
                    {
                        isCorrectAnswer: "true",
                        option: 'spice'
                    },
                    {
                        isCorrectAnswer: "false",
                        option: 'cunt'
                    },
                    {
                        isCorrectAnswer: "false",
                        option: 'whore'
                    }
                ]
            },
            {
                question: "What are powerpuff girls made of?",
                questionCourse: '2',
                questionProgramme: '3',
                questionStandard: '1',
                questionType:'longanswer',
                minMarks: '3',
                maxMarks: '5',
                trueFalseAnswer : false,
            }];
            var questionNum = 0;
            this.postQuestion = function(question) {
                question['idQuestionBank'] = questionNum++;
                questionBank.push(question);
                console.log(questionBank);
            };
            
            this.getQuestions = function () {
                return questionBank;
            };
            
            this.getQuestion = function () {
                return questionBank[6];
            };
})
;


