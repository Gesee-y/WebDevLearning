/* The main script to manage super objects */

const button = document.getElementById("start");

button.addEventListener("click", () => onClick());
button.addEventListener("hover", () => onHover());

function onClick(){
	changeCol(button, "white", "black");
	setTimeout(() => button.style = "", 100);
	goToPage("src/quiz.html");
}

function onHover(){
	changeCol(button, "lime", "black");
}

function changeCol(b, c1, c2){
	b.style.backgroundColor = c1;
	b.style.color = c2;
}

function goToPage(url){
	window.location.assign(url);
}
