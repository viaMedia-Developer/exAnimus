var quotes = qte.quotes;

var navLinks = document.querySelectorAll('nav#main a');

var aproposSlide = document.getElementById('apropos');

var getSiblings = (elem) => {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if(sibling.nodeType !== 1 || sibling == elem) continue;
		siblings.push(sibling);
	}
	return siblings;
}

navLinks.forEach((index) => {
	var currentSlide = document.querySelector(index.getAttribute('href'));
	index.addEventListener('click', function(e) {
		e.preventDefault();

		var linkSibling = getSiblings(this);
		(index.classList.contains('active') === true) ? index.classList.remove('active') : index.classList.add('active');
		linkSibling[0].classList.remove('active');

		currentSlide.classList.add('active');
		var siblings = getSiblings(currentSlide);
		siblings[0].classList.remove('active');

		aproposSlide.style.paddingRight = aproposSlide.offsetWidth - aproposSlide.clientWidth + "px";
	});
});





const preceding = document.getElementById('preceding'),
	succeeding = document.getElementById('succeeding'),
	randomButton = document.getElementById('random');

var	quoteHeader = document.querySelector('#quote h1'),
	quoteText = document.querySelector('#quote p'),

	pickRandom = () => { 
		number = Math.round(Math.random() * quotes.length);
		return number;
	},
	random = pickRandom(),
	current;
 	

var loadQuote = () => {
	quoteHeader.innerText = quotes[random].number;
	quoteText.innerText = quotes[random].quote;
	current = random;
}; 
window.onload = () => { loadQuote(); }

var randomQuote = () => {
	fade(quoteHeader); fade(quoteText);
	current = pickRandom();
	setTimeout(function() {
		quoteHeader.innerText = quotes[current].number;
		quoteText.innerText = quotes[current].quote;
	}, 800);
	setTimeout(function() {
		appear(quoteHeader); appear(quoteText);
	}, 1000);
}

var nextQuote = () => {
	fade(quoteHeader); fade(quoteText);
	current++;
	if (current > (quotes.length - 1)) {
		current = 0;
	}
	setTimeout(function() {
		quoteHeader.innerText = quotes[current].number;
		quoteText.innerText = quotes[current].quote;
	}, 800);
	setTimeout(function() {
		appear(quoteHeader); appear(quoteText);
	}, 1000);
	
}

var prevQuote = () => {
	fade(quoteHeader); fade(quoteText);
	current--;
	if (current <= 0) {
		current = 0;
	}
	setTimeout(function() {
		quoteHeader.innerText = quotes[current].number;
		quoteText.innerText = quotes[current].quote;
	}, 800);
	setTimeout(function() {
		appear(quoteHeader); appear(quoteText);
	}, 1000);
}

var fade = (element) => {	
	(element.classList.contains('appear') === true) ? element.classList.remove('appear') & element.classList.add('fade') : element.classList.add('fade');
}
var appear = (element) => {
	(element.classList.contains('fade') === true) ? element.classList.remove('fade') & element.classList.add('appear') : element.classList.add('appear');
}

preceding.addEventListener('click', prevQuote);
succeeding.addEventListener('click', nextQuote);
randomButton.addEventListener('click', randomQuote);





