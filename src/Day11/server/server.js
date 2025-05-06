/* A simplistic server

It should normally fetch his datas from a database but since Node.js and Express are still prohibited
I will just hard code the datas
*/

// Since I don't know how to make a real database for now, we will just use this.
const question_table = {
    "What is the capital of Cameroon?": [["Buea", false], ["New York", false], ["Yaounde", true]],
    "What is the largest planet in our solar system?": [["Earth", false], ["Jupiter", true], ["Mars", false]],
    "Who wrote 'Romeo and Juliet'?": [["William Shakespeare", true], ["Charles Dickens", false], ["Jane Austen", false]],
    "What is the chemical symbol for water?": [["O2", false], ["H2O", true], ["CO2", false]],
    "Which language is primarily spoken in Brazil?": [["Spanish", false], ["Portuguese", true], ["French", false]],
    "What is the result of 7 * 6?": [["42", true], ["36", false], ["48", false]],
    "Which animal is known as the king of the jungle?": [["Elephant", false], ["Lion", true], ["Tiger", false]],
    "Who painted the Mona Lisa?": [["Leonardo da Vinci", true], ["Pablo Picasso", false], ["Michelangelo", false]],
    "What is the capital city of Japan?": [["Seoul", false], ["Beijing", false], ["Tokyo", true]],
    "What gas do humans need to breathe to survive?": [["Oxygen", true], ["Carbon dioxide", false], ["Nitrogen", false]],
    "Which ocean is the largest?": [["Atlantic Ocean", false], ["Arctic Ocean", false], ["Pacific Ocean", true]],
    "What is the boiling point of water at sea level in Celsius?": [["100", true], ["90", false], ["80", false]],
    "Who discovered gravity when an apple fell on his head?": [["Albert Einstein", false], ["Isaac Newton", true], ["Galileo Galilei", false]],
    "Which continent is Egypt located in?": [["Asia", false], ["Africa", true], ["Europe", false]],
    "What color is chlorophyll?": [["Green", true], ["Red", false], ["Blue", false]],
    "Which planet is closest to the sun?": [["Venus", false], ["Mercury", true], ["Earth", false]],
    "What is the square root of 64?": [["8", true], ["6", false], ["10", false]],
    "How many continents are there?": [["5", false], ["7", true], ["6", false]],
    "What is the hardest natural substance on Earth?": [["Diamond", true], ["Gold", false], ["Iron", false]],
    "Who was the first man to walk on the moon?": [["Neil Armstrong", true], ["Buzz Aldrin", false], ["Yuri Gagarin", false]]
};


/*
    Answer(val, correct)

Will create a new `Answer` object with the text `val`. `correct` indicates if the answer is true or false
*/
class Answer{
	constructor(val, correct){
		this.val = val;
		this.correct = correct;
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
}


/* 
    getData()

Return the a table of questions
*/
function getData(){

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