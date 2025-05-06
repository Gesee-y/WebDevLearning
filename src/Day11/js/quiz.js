const QuestionList = getData();
var counter = 0;
var correct = 0;
var incorrect = 0;
let container = document.getElementById("question-div");

function genQuestion(){
	container = document.getElementById("question-div");
	if (0 <= counter < QuestionList.length){
		console.log(container)
	    container.outerHTML = QuestionList[counter].toTag();
	    return true;
    }

    return false;
}

function genResults() {
	container.outerHTML = `<div id='results'>
		<p>You answered `+counter+` questions</p>
	    <p>Correct answer: `+correct+`</p>
		<p>Incorrect answer: `+incorrect+`</p>
	</div>
	`;
}

function nextQuestion(){
	counter++;
	if (container){
		if (!(genQuestion())){
		    genResults();
	    }
	}
}

function cleatResults() {
	let res = document.getElementById('results');

	if (res){
		counter = 0;
		correct = 0;
		incorrect = 0;
		res.remove();
	}
}

function _on_submit_clicked(){
	const body = document.getElementsByTagName('body');
    let checked = getChecked();
    if (checked != null){
    	if (isCorrectAnswer(checked)){
    		correct++;
    		body[0].style.backgroundColor = "lime";
    	}
    	else{
    		incorrect++;
    		body[0].style.backgroundColor = "red";
    	}
    	
    	setTimeout(() => nextStep(body[0]), 500);
    }
}

function nextStep(body) {
	body.style.backgroundColor = "white";
	body.style = "";
	nextQuestion();
	
}

function isCorrectAnswer(i) {
	return QuestionList[counter].answers[0][i].isCorrect();
}

function getChecked(){
	let container = document.getElementsByTagName('input');

	if (container){
		for (var i = 0; i < container.length; i++) {
			if (container[i].checked){
				return i;
			}
		}
	}

	return null;
}