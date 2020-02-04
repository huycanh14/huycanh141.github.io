
var app = angular.module('myApp', ['ngMaterial', 'checklist-model']);
app.controller('QuestionController',  function ($scope, $http,$timeout, $mdToast) {
	var _as = localStorage.getItem('key');
	var number_question = 0;
	var save = [];
	var temp = 0;
    if(_as != "yes"){
    	window.location.replace("index.html")
	}
	let info = null;
	$.getJSON('https://ipinfo.io/json', function(data) {
		info = JSON.stringify(data, null, 2);
	});

    $scope.button = "Lưu kết quả";
    $scope.mess = "";
    $scope.is_done = false;

	$http.get("json/questions.json")
	.then(function(response){
		$scope.questions = response.data.questions;
		$scope.question = $scope.questions[number_question];
	});

	$http.get("json/answers.json")
	.then(function(response){
		$scope.answers = response.data;
	});

	$scope._answer = {
		number:"",
		answer: []
	};

	$scope.saveAnswer = async function(){
		if($scope._answer.answer == null)
			$scope._answer.answer = "null";
		var _answer = {
			number : $scope.question.number,
			answer: $scope._answer.answer.sort().toString()
		}
		save.push(_answer);
		// console.log(save);
		$scope._answer = {
			number:"",
			answer: []
		};
		if(number_question < 10)
			await $scope.hideQuetion();
		await $scope.compareQuestion();
		await $timeout($scope.getQuestion,1000);
		if(number_question < 10)
			await $scope.showQuetion();
		
	}
	$scope.getQuestion = function(){
		number_question++;
		if(number_question < 10)
			$scope.question = $scope.questions[number_question];
		else{
			// $.ajax({
			// 	type: "POST",
			// 	url: "https://mandrillapp.com/api/1.0/messages/send.json",
			// 	data: {
			// 		'key': '61dda462710a751340315109f68696ca-us4',
			// 		'message': {
			// 		'from_email': 'cugiai859@gmail.com',
			// 		'to': [
			// 			{
			// 				'email': 'huycanh4@gmail.com',
			// 				'name': 'RECIPIENT NAME (OPTIONAL)',
			// 				'type': 'to'
			// 			},
			// 			],
			// 		'autotext': 'true',
			// 		'subject': 'YOUR SUBJECT HERE!',
			// 		'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
			// 		}
			// 	}
			// 	}).done(function(response) {
			// 	console.log(response); // if you're into that sorta thing
			// });
			//https://pepipost.com/tutorials/how-to-send-emails-with-javascript/
			
			let message = `Kết quả: ${temp.toString()}/10 câu.\f
							Thông tin: ${info}`;
			Email.send({
				SecureToken : '1f6dcd74-22ec-4f05-9312-7c1ea6553dcc',
				To : 'huycanh14@gmail.com',
				From : 'canh.huy.web@gmail.com',
				Subject : "Kết quả kiểm tra",
				Body : message,
				Port: '587'
				}).then(
					message => console.log(message)
				);

			$scope.mess = temp.toString() + "/10 câu";
			$scope.is_done = true;
		}
		if(number_question == 9){
			$scope.button = "Xong";
		}
	}

	$scope.showQuetion = function(){
		let nbquestion = $('.nbquestion');
		let content = $('.content');
		nbquestion.removeClass("fadeOutRight");
		nbquestion.addClass("fadeInDownBig");
		content.removeClass("fadeOutLeft");
		content.addClass("fadeInUpBig");
	}

	$scope.hideQuetion = function(){
		let nbquestion = $('.nbquestion');
		let content = $('.content');
		nbquestion.removeClass("fadeInDownBig");
		nbquestion.addClass("fadeOutRight");
		content.removeClass("fadeInUpBig");
		content.addClass("fadeOutLeft");
	}

	$scope.compareQuestion = function(){
		if(number_question < 10)
			if(save[number_question].answer == $scope.answers[number_question].answer)
				temp++;
		// console.log(temp);
	}
});