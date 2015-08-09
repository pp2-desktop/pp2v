'use strict';

var app = angular.module('app');


app.controller('mainCtrl', function($scope, $http, $modal) {
  
  
});



app.controller('confirmSubmitCtrl', function ($scope, $modalInstance) {

  

});


app.controller('subCtrl', function ($scope, $http, $routeParams, $location) {
  
  var season = $routeParams.season;
  var ep = $routeParams.ep;
  var uid = $routeParams.uid;

  $scope.is_video_enable = true;
  $scope.is_theater_mode = false;

  $scope.uid = uid;

  if(ep == 3) {

      $http.get('http://naver.com').
      success(function(data, status, headers, config) {
	alert('ok');
      }).
      error(function(data, status, headers, config) {
	alert('err');
      });


    $scope.is_loading_done = false;
    $http.get('http://112.219.140.178:3000').
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
	    captions:  [{file: "http://112.219.140.178:3001/dd.vtt", label: "Korean", default: true },
			{file: "http://112.219.140.178:3001/bb.vtt", label: "English"}],
	    //file: "https://www.youtube.com/watch?v=mv_FNQ6LkD8"
	    file: "https://www.youtube.com/watch?v=UgA0wI1hjOk"
	    //file:"http://www.youtube.com/watch?v=" + $scope.video
	  }],
	  captions: {
	    color: '#ffffff',
	    fontSize: 12,
	    backgroundOpacity: 100
	    //backgroundOpacity: 75
	  }
	};
	$scope.is_loading_done = true;
	$scope.$apply();
      }).
      error(function(data, status, headers, config) {
	alert('err');
      });
    
    
    
  } //http://112.219.140.178:3000/dd.vtt
  else if(ep == 4) {
    //alert('a');
    $scope.is_loading_done = false;
    $scope.prev_ep = '3';
    $scope.next_ep = '5';
    $scope.myString = '[Ep4] 페파는 젠틀맨 안마방';
    $scope.options = {
      //file: "aa.mp4",
      height: '100%',
      width: '100%',
      primary: 'flash',
      controlbar: "bottom",
      autostart: false,
      playlist: [{
	captions:  [{file: "http://112.219.140.178:3000/bb.vtt", label: "English", default: true },
		    {file: "http://112.219.140.178:3000/bb.vtt", label: "Korean"}],
	file: "http://www.youtube.com/watch?v=cZtNIQfzq8U"
	//file:"http://www.youtube.com/watch?v=" + $scope.video
      }],
      captions: {
	color: '#ffffff',
	fontSize: 12,
	backgroundOpacity: 100
	//backgroundOpacity: 75
      }
    };
    $scope.is_loading_done = true;
    $scope.$apply();
    
  } else {
    $scope.is_loading_done = false;
    $scope.myString = '[Ep5] 페파는 즐거워 배도 고프고 고프고고프고졸리네';
    $scope.prev_ep = '4';
    $scope.next_ep = '6';
    $scope.options = {
      //file: "aa.mp4",
      height: '100%',
      width: '100%',
      primary: 'flash',
      controlbar: "bottom",
      autostart: false,
      playlist: [{
	file:"http://www.youtube.com/watch?v=uL07TYkDe6E"
	//file:"http://www.youtube.com/watch?v=" + $scope.video
      }],
      captions: {
	color: '#ffffff',
	fontSize: 12,
	backgroundOpacity: 100
	//backgroundOpacity: 75
      }
      
    };
    $scope.is_loading_done = true;
    $scope.$apply();

  }

  $scope.msg = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';



  $scope.today = function() {
    alert('a');
  };

  $scope.status = {
    open: true
  };



  $scope.back = function() {
    //window.history.back();
    window.history.go(-(window.history.length - 1));
  };
  
  

});



