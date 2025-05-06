/* A simplistic server

It should normally fetch his datas from a database but since Node.js and Express are still prohibited
I will just hard code the datas
*/

// Since I don't know how to make a real database for now, we will just use this.
const question_table = [
    ["What is the capital of Cameroon?", [["Buea", 0], ["New York", 0], ["Yaounde", 1]]],
    ["What is the largest planet in our solar system?", [["Earth", 0], ["Jupiter", 1], ["Mars", 0]]],
    ["Who wrote 'Romeo and Juliet'?", [["William Shakespeare", 1], ["Charles Dickens", 0], ["Jane Austen", 0]]],
    ["What is the chemical symbol for water?", [["O2", 0], ["H2O", 1], ["CO2", 0]]],
    ["Which language is primarily spoken in Brazil?", [["Spanish", 0], ["Portuguese", 1], ["French", 0]]],
    ["What is the result of 7 * 6?", [["42", 1], ["36", 0], ["48", 0]]],
    ["Which animal is known as the king of the jungle?", [["Elephant", 0], ["Lion", 1], ["Tiger", 0]]],
    ["Who painted the Mona Lisa?", [["Leonardo da Vinci", 1], ["Pablo Picasso", 0], ["Michelangelo", 0]]],
    ["What is the capital city of Japan?", [["Seoul", 0], ["Beijing", 0], ["Tokyo", 1]]],
    ["What gas do humans need to breathe to survive?", [["Oxygen", 1], ["Carbon dioxide", 0], ["Nitrogen", 0]]],
    ["Which ocean is the largest?", [["Atlantic Ocean", 0], ["Arctic Ocean", 0], ["Pacific Ocean", 1]]],
    ["What is the boiling point of water at sea level in Celsius?", [["100", 1], ["90", 0], ["80", 0]]],
    ["Who discovered gravity when an apple fell on his head?", [["Albert Einstein", 0], ["Isaac Newton", 1], ["Galileo Galilei", 0]]],
    ["Which continent is Egypt located in?", [["Asia", 0], ["Africa", 1], ["Europe", 0]]],
    ["What color is chlorophyll?", [["Green", 1], ["Red", 0], ["Blue", 0]]],
    ["Which planet is closest to the sun?", [["Venus", 0], ["Mercury", 1], ["Earth", 0]]],
    ["What is the square root of 64?", [["8", 1], ["6", 0], ["10", 0]]],
    ["How many continents are there?", [["5", 0], ["7", 1], ["6", 0]]],
    ["What is the hardest natural substance on Earth?", [["Diamond", 1], ["Gold", 0], ["Iron", 0]]],
    ["Who was the first man to walk on the moon?", [["Neil Armstrong", 1], ["Buzz Aldrin", 0], ["Yuri Gagarin", 0]]]
];


/*
    Answer(val, correct)

Will create a new `Answer` object with the text `val`. `correct` indicates if the answer is true or false
*/
class Answer{
	constructor(val, correct){
		this.val = val;
		this.correct = correct;
	}

    isCorrect(){
    	return Boolean(this.correct);
    }

    // Will add the answer to the current HTML file
	render(){
		document.write("<input type='checkbox' class='answer'>"+this.val);
	}

	toTag(){
		return "<input type='checkbox' class='answer'>"+this.val;
	}
}

/*
    Question(id, question, ..answers)

This will create a new `Question` object with the id `id` and the text `question` with a list of `Answer` object
*/
class Question{
	constructor(id, question, ...answers){
		this.id = id;
		this.question = question;
		this.answers = shuffle(answers);
    }

    render(){
    	document.write("<div id='question-div'>");
    	document.write("<p>"+this.question+"</p>");

    	// Each answer will render himself
    	let answers = this.answers[0];
    	for (var i = 0; i < answers.length; i++)
    		answers[i].render()

    	document.write("</div>");
    }

    toTag(){
    	let str = "";
    	str += "<div id='question-div'>";
    	str += "<p>"+this.question+"</p>";
        
        let answers = this.answers[0];
    	for (var i = 0; i < answers.length; i++)
    		str += answers[i].toTag();

        str += "</div>"
    	return str;    	
    }
}


/* 
    getData()

Return the a table of questions
*/
function getData(){
    // We will transform the data into Question objects

    let Q = new Array(); // Here is the Questions list

    for (let i = 0; i < question_table.length; i++) {
    	let A = new Array();

    	for (let j = 0; j < question_table[i][1].length; j++) {
    		let ans = new Answer(question_table[i][1][j][0], question_table[i][1][j][1]);
    		A.push(ans);
    	}
    	let question = new Question(i, question_table[i][0], A);
    	Q.push(question);
    }

    return Q;
}

/*
    shuffle(A)

This function take an array `A` as parameter and return another array with the elements of `A` mixed up.
*/
function shuffle(A){
    let B = []; // Shuffle will return this variable
    A = A.slice(); // We copy the array
    const L = A.length; // To end the loop

    // while B doesn't have the same number of elements as A
    while (B.length < L){
    	let l = A.length-1; // The current length of A since it decrease at each loop
    	let i = randInt(0,l); // The random index

        // Here we check some edge case to avoid doing useless operations
        // if i==0, the we just remove the first element and add it to B
    	if (i == 0){
    		B.push(A.shift());
    	}
    	// if i == l, meaning he his the last element, then we just pop it from A and push to B
    	else if (i == l){
    		B.push(A.pop());
    	}
    	else if ((i+1) == l){
    		B.push(A[i]) // We push the element in B
        	A = A.slice(0,i).concat([A[l]]) // The we constitute a new array without that element
        	
    	}
    	// In any other case, we will do a tricky operation
    	else{
    		B.push(A[i]) // We push the element in B
        	A = A.slice(0,i).concat(A.slice(i+1,l)) // The we constitute a new array without that element
        }
    }

    return B

}

/*
    randInt(min,max)

Return a random number between `min` and `max`
*/
function randInt(min, max){
	// just some baby maths
	return min + Math.floor((max - min)*Math.random());
}
