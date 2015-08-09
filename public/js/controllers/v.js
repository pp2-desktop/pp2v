'use strict';

var app = angular.module('app');

angular.module('app').controller('vCtrl', ['$scope', '$http', '$routeParams', '$location', '$rootScope', 'quizService2', '$sce',  function($scope, $http, $routeParams, $location, $rootScope, quizService2, $sce){

  var parent = $routeParams.parent;
  var child = $routeParams.child;
  var id = $routeParams.id;
  var uid = $routeParams.uid;

  $scope.is_video_enable = true;
  $scope.is_theater_mode = false;
  $scope.is_loading_done = false;
  $scope.quizType = 'en';
  $scope.quizText = '한글퀴즈 풀기';
  quizService2.resetValue();
  $scope.memo = '';
  
  $scope.audios = [];
  $scope.m = {is_hide_memo: false};
  setInterval( function() {
    var element = window.document.activeElement;
    element.blur();
  }, 4000*2);
  
  var _url = '/v/' + parent + '/' + child + '/' + id + '/' + uid;
  $scope.parent = parent;
  $scope.child = child;
  $scope.uid = uid;

  $scope.is_en_caption = false;
  $scope.is_ko_caption = false;

  $http.get(_url).
    success(function(data, status, headers, config) {
      //console.log(data);
      var v = data.v;
      $scope.prev = data.prev;
      $scope.next = data.next;
      $scope.myString = v.title;
      $scope.is_ko_quiz = v.is_ko_quiz;

      if(v.is_hide_memo == undefined || v.is_hide_memo == null) {
	$scope.m.is_hide_memo = false;
      } else {
	$scope.m.is_hide_memo = v.is_hide_memo;
      }
      
      var res_url = 'https://s3-ap-northeast-1.amazonaws.com/pp2-data/' + encodeURIComponent(v.parent) + '/' + encodeURIComponent(v.child) + '/' +  encodeURIComponent(v.title) + '/';
      //var res_url = 'http://112.219.140.178:3000/' + encodeURIComponent(v.parent) + '/' + encodeURIComponent(v.child) + '/' +  encodeURIComponent(v.title) + '/';
      //var sub = 'https://s3-ap-northeast-1.amazonaws.com/helpme2/bb.vtt';
      //var sub_ko = 'https://s3-ap-northeast-1.amazonaws.com/helpme2/dd.vtt';
      var sub = res_url + v.sub;
      var sub_ko = res_url + v.sub_ko;
      
      if(v.sub != 'none') {
	$scope.is_en_caption = true;
      }
      if(v.sub_ko != 'none') {
	$scope.is_ko_caption = true;
      }
      
      var opacity = 65;
      if(v.parent == 'news' & v.child == 'CNN') {
	opacity = 85;
      }

      var captions = [{file: sub, label: "English", default: true},
		      {file: sub_ko, label: "Korean"}];
      
      if(v.primary_sub == 'none') {

	if(v.sub == 'none' && v.sub_ko == 'none') {
	  captions = [];
	} else if(v.sub == 'none' && v.sub_ko != 'none') {
	  captions = [{file: sub_ko, label: "Korean"}];
	} else if(v.sub != 'none' && v.sub_ko == 'none') {
	  captions = [{file: sub, label: "English"}];
	} else {
	  captions = [{file: sub, label: "English"},
		      {file: sub_ko, label: "Korean"}];
	}
	
      } else if(v.primary_sub == 'ko') {

	if(v.sub == 'none' && v.sub_ko == 'none') {
	  captions = [];
	} else if(v.sub == 'none' && v.sub_ko != 'none') {
	  captions = [{file: sub_ko, label: "Korean", default: true}];
	} else if(v.sub != 'none' && v.sub_ko == 'none') {
	  captions = [{file: sub, label: "English"}];
	} else {
	  captions = [{file: sub_ko, label: "Korean", default: true },
		      {file: sub, label: "English"}];
	}
	
      } else {

	if(v.sub == 'none' && v.sub_ko == 'none') {
	  captions = [];
	} else if(v.sub == 'none' && v.sub_ko != 'none') {
	  captions = [{file: sub_ko, label: "Korean"}];
	} else if(v.sub != 'none' && v.sub_ko == 'none') {
	  captions = [{file: sub, label: "English", default: true}];
	} else {
	  captions = [{file: sub, label: "English", default: true},
		      {file: sub_ko, label: "Korean"}];
	}
      }

      $scope.options = {
	height: '100%',
	width: '100%',
	primary: 'flash',
	controlbar: "bottom",
	autostart: false,
	playlist: [{
	  captions: captions,
	  /*
	  captions:  [{file: sub_ko, label: "Korean", default: true },
		      {file: sub, label: "English"}],
	   */
	  file: "https://www.youtube.com/watch?v=" + v.vid
	}],
	captions: {
	  color: '#ffffff',
	  fontSize: 12,
	  backgroundOpacity: opacity
	}
      };

      for(var i=0; i<v.words.length; i++) {
	if(i == 0) {
	  v.words[i].is_open = true;
	} else {
	  v.words[i].is_open = false;
	}
      }
      $scope.words = v.words;
      for(i=0; i<$scope.words.length; i++){
	if($scope.words[i].img=='none') {
	  $scope.words[i].img = 'http://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png';
	} else {
	  $scope.words[i].img = res_url + $scope.words[i].img;
	}
	$scope.audios.push($sce.trustAsResourceUrl(res_url + $scope.words[i].audio));
      }

      $scope.quiz_container = v.quiz_container;
      $scope.quiz_container_en = v.quiz_container;
      $scope.quiz_container_ko = v.quiz_container_ko;

      $scope.memo = v.memo;

      $scope.is_loading_done = true;
    }).
    error(function(data, status, headers, config) {
      //alert('err');
      alert('[오류] 오프라인 상태에서는 동영상을 보실수 없습니다.');
      window.location.assign("http://pp2.com");
    });

  
  
  $scope.status = {
    open: true
  };

  $scope.quiz_status = {
    open: true
  };

  $scope.word_status = {
    open: true
  };

  $scope.memo_status = {
    open: true
  };

  $scope.playAudio = function(index) {
    var _id = 'audio1ng-'; _id = _id + index;
    var audio = document.getElementById(_id);
    audio.play();
  };

  
  $scope.goPrev = function() {
    var url = 'http://v.05day.com/#/v/' + $scope.parent + '/' + $scope.child + '/' + $scope.prev + '/' + $scope.uid;
    window.location.assign(url);
  };

  $scope.goNext = function() {
    //console.log(jwplayer('pp2').getCurrentCaptions());
    //jwplayer('pp2').setCurrentCaptions(2);
    return;
    var url = 'http://v.05day.com/#/v/' + $scope.parent + '/' + $scope.child + '/' + $scope.next + '/' + $scope.uid;
    window.location.assign(url);
  };

  $scope.back = function() {
    //window.history.back();
    //window.history.go(-(window.history.length - 1));
    //window.close();
    window.location.assign("http://pp2.com");
  };

  $scope.changeTypequiz = function() {
    if($scope.quizType == 'en') {
      $scope.quiz_container = $scope.quiz_container_ko;
      $scope.quizType = 'ko';
      $scope.quizText = '영어퀴즈 풀기';
      quizService2.resetValue();
    } else {
      $scope.quiz_container = $scope.quiz_container_en;
      $scope.quizType = 'en';
      $scope.quizText = '한글퀴즈 풀기';
      quizService2.resetValue();
    }
  };




  $scope.changeCaption = function(index) {
    var length = jwplayer('pp2').getCaptionsList().length;
    if(index > length) {
      return;
    }
    jwplayer('pp2').setCurrentCaptions(index);
  };

}]);

//퀴즈
angular.module('app').service("quizService2", function() {
  return new Quiz();
});

function Quiz() {
  this.score = 0;
  this.showScore = false;
  this.totalQuestions = 0;
  this.counter = 1;
  //this.totalQuestions = 0;
  this.questionsAttempted = 0;
  this.correctAnswers = 0;
  this.displayAnswers = false;


  this.resetValue = function() {
    //alert('reset value called for QuizService2');
    this.score = 0;
    this.showScore = false;
    this.totalQuestions = 0;
    this.counter = 1;
    //this.totalQuestions = 0;
    this.questionsAttempted = 0;
    this.correctAnswers = 0;
    this.displayAnswers = false;
  };

  this.plusScore = function(value) {
    this.score += value;
    this.correctAnswers++;
  };
  this.minusScore = function(value) {
    this.score -= value;
    this.correctAnswers--;
  };
  this.displayScore = function() {
    this.showScore = true;
  };
  this.getCounter = function() {
    return this.counter++;
  };
  this.updateTotalQuestionsCount = function() {
    this.totalQuestions++;
  };
  this.updateQuestionsAttemptedCount = function() {
    this.questionsAttempted++;
  };
  this.updateCorrectQuestionsCount = function() {
    this.correctAnswers++;
  };
}


angular.module('app').directive("iquiz", function() {
  return {
    restrict : 'E',
    scope : {
      summary : '@'
    },
    controller : function($scope) {
    },
    templateUrl : 'tpl/quiz/quiz.html'
  };
});

angular.module('app').directive("iscorecard2", [ 'quizService2', '$http', function( quizService2, $http ) {
  return {
    restrict : 'E',
    scope : false,
    controller : function($scope) {
      $scope.is_hide_memo = false;
      $scope.totalQuestions =  quizService2.totalQuestions;
      $scope.questionsAttempted =  quizService2.questionsAttempted;
      $scope.correctAnswers =  quizService2.correctAnswers;
      $scope.score =  quizService2.score;
      $scope.showscores = "";
      $scope.is_check_result = false;

      $scope.showAnswers = function() {
        quizService2.displayAnswers = true;
      };

      $scope.showScores = function() {
	$scope.m.is_hide_memo = false;
        $scope.showscores = true;
	$scope.grade = Math.round(($scope.score / $scope.totalQuestions) * 100);
	$scope.is_check_result = true;
	quizService2.displayAnswers = true;
	
	// 결과 보내기
	$http.get("http://v.05day.com/users")
	  .success(function(response) {
	    $scope.names = response.records;});
      };
    },
    link : function(scope, element, attrs) {
      scope.$watch(function() {
        return  quizService2.questionsAttempted;
      }, function() {
        scope.questionsAttempted =  quizService2.questionsAttempted;
      });
      scope.$watch(function() {
        return  quizService2.score;
      }, function() {
        scope.score =  quizService2.score;
      });
      scope.$watch(function() {
        return  quizService2.score;
      }, function() {
        scope.correctAnswers =  quizService2.correctAnswers;
      });
    },
    templateUrl : 'tpl/quiz/scorecard.html'
  };
}]);

angular.module('app').directive("iquestion2", [ 'quizService2', function( quizService2 ) {
  return {
    restrict : 'E',
    scope : {
      text : '@'
    },
    controller : function($scope) {

      $scope.evalScore = function(id, value) {
        var rightAnswerFound = false, foundIndex = 0, i = 0, arrIndex;
	
	angular.forEach($scope.qna, function(qna) {
          if (qna.tag === id.tag) {
	    arrIndex = i;

	    angular.forEach(qna.options, function(option) {
              if (option.text === value
                  && option.correct === true) {
                rightAnswerFound = true;
              }
            });


          }
          i++;
        });
	
	
        if (rightAnswerFound === true) {
          quizService2.plusScore(1);
          $scope.qna[arrIndex].answeredCorrectly = true;
        } else {
          if ($scope.qna[arrIndex].answeredCorrectly === true) {
            quizService2.minusScore(1);
            $scope.qna[arrIndex].answeredCorrectly = false;
          }
        }
	
        if ($scope.qna[arrIndex].attempted === false) {
          $scope.qna[arrIndex].attempted = true;
          quizService2.updateQuestionsAttemptedCount();
        }
      };

    },
    /*
    link : function(scope, element, attrs) {
      // Update parent scope details
      //
      quizService2.updateTotalQuestionsCount();
      //
      //
      var text = scope.text;
      scope.qna = [];
      var qnaObj = new Object();
      qnaObj.id = quizService2.getCounter();
      qnaObj.tag = "q_" + qnaObj.id;
      qnaObj.answeredCorrectly = false;
      qnaObj.attempted = false;
      //
      // Processing the question and answer text
      //
      var qnaArr = text.split("::");
      qnaObj.question = "Q: " + qnaArr[0];
      var ansArr = qnaArr[1].split(";");
      qnaObj.options = [];
      qnaObj.answers = [];
      for (var i = 0; i < ansArr.length; i++) {
        var option = {
          "text" : ansArr[i],
          "correct" : false,
          "style" : ""
        };
        var optionText = option.text;
        if (optionText.indexOf("__") === 0) {
          option.text = optionText.substring(2, optionText.length);
          option.correct = true;
        }
        qnaObj.options.push(option);
      }
      scope.qna.push(qnaObj);
      
      scope.$watch(function() {
        return quizService2.displayAnswers;
      }, function() {
        angular.forEach(scope.qna, function(qna) {
          var i = 0;
          angular.forEach(qna.options, function(option) {
            if (option.correct === true
                && quizService2.displayAnswers === true) {
	      //alert('werewr');
              //qna.options[i].style = "background-color:#ffff00";
	      qna.options[i].style = "#ffff00";
            }
            i++;
          });
        });
      });

    },
    */

       link : function(scope, element, attrs) {
      quizService2.updateTotalQuestionsCount();
      var text = scope.text;
      scope.qna = [];
      var qnaObj = new Object();
      qnaObj.id = quizService2.getCounter();
      qnaObj.tag = "q_" + qnaObj.id;
      qnaObj.answeredCorrectly = false;
      qnaObj.attempted = false;

      var qnaArr = text.split("::");
	 //qnaObj.question = "<b>Q: " + qnaArr[0] + "</b>";
	 qnaObj.question = "<b>" + quizService2.totalQuestions + ". " + qnaArr[0] + "</b>";
      var ansArr = qnaArr[1].split(";;");
      qnaObj.options = [];
      for (var i = 0; i < ansArr.length; i++) {
        var option = {
          "text" : ansArr[i],
          "correct" : false,
          "style" : ""
        };
	
        var optionText = option.text;
        if (optionText.indexOf("__") === 0) {
          option.text = optionText.substring(2, optionText.length);
          option.correct = true;
        }
        qnaObj.options.push(option);
      }

      scope.qna.push(qnaObj);

      scope.$watch(function() {
        return quizService2.displayAnswers;
      }, function() {
        angular.forEach(scope.qna, function(qna) {
          var i = 0;
          angular.forEach(qna.options, function(option) {
            if (option.correct === true
                && quizService2.displayAnswers === true) {
	      //alert('werewr');
              //qna.options[i].style = "background-color:#ffff00";
	      qna.options[i].style = "#ffff00";
            }
            i++;
          });
        });
      });

    },

    templateUrl : 'tpl/quiz/question.html'
  };
}]);

angular.module('app').directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});


 /*
  var season = $routeParams.season;
  var ep = $routeParams.ep;
  var uid = $routeParams.uid;

  $scope.is_video_enable = true;
  $scope.is_theater_mode = false;

  $scope.uid = uid;
  
  var sub = 'http://112.219.140.178:3002/cnn/news/Second%20black%20box%20found%20from%20Germanwings%20crash/bb.vtt';

  //var sub = 'https://s3-ap-northeast-1.amazonaws.com/helpme2/bb.vtt';
  //var sub_ko = 'https://s3-ap-northeast-1.amazonaws.com/helpme2/dd.vtt';
  var sub_ko = 'http://112.219.140.178:3002/cnn/news/Second%20black%20box%20found%20from%20Germanwings%20crash/dd.vtt';


  $scope.is_loading_done = false;
  
  $http.get($rootScope.host).
    success(function(data, status, headers, config) {
      $scope.prev_ep = '2';
      $scope.next_ep = '4';
      $scope.myString = '[Ep3] 페파는 저녁먹으로감';
      $scope.options = {
	//file: "aa.mp4",
	height: '100%',
	width: '100%',
	primary: 'flash',
	controlbar: "bottom",
	autostart: false,
	playlist: [{
	  captions:  [{file: sub_ko, label: "Korean", default: true },
		      {file: sub, label: "English"}],
	  file: "https://www.youtube.com/watch?v=UgA0wI1hjOk"
	}],
	captions: {
	  color: '#ffffff',
	  fontSize: 12,
	  backgroundOpacity: 100
	}
      };
      $scope.is_loading_done = true;
    }).
    error(function(data, status, headers, config) {
      alert('err');
    });
  


  $scope.msg = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
   */
