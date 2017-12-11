/*
	All app elements listed here
*/
const 
	body = document.getElementsByTagName('body')[0],
	overlay = document.getElementById('overlay'),
	landing = document.getElementById('landing'),
	landing_h1 = document.querySelector('#landing .title'),
	landing_h3 = document.querySelector('#landing .subtitle'),
	landing_button = document.querySelector('#landing .cta'),

	header = document.getElementsByTagName('header')[0],
	header_h1 = document.querySelector('header h1'),

	nav = document.getElementsByTagName('nav')[0],
	closeNav = document.querySelector('nav svg'),
	navmenu = document.querySelector('nav .menu'),
	menuItems = document.querySelectorAll('nav .menu li'),

	sections = document.querySelectorAll('#sectionsWrapper section'),
	section_Main = document.getElementById('main'),
	section_About = document.getElementById('about'),
	section_DevInfo =document.getElementById('devInfo'),

	// Main Section Elements
	toggleNav = document.querySelector('#main .toggleNav'),
	quotesWrapper = document.getElementById('quotesWrapper'),
	quotes_number = document.querySelector('#quotesWrapper h1'),
	quotes_text = document.querySelector('#quotesWrapper p'),

	mainControls = document.getElementById('controls'),
	controls_next = document.querySelector('#controls #next'),
	controls_prev = document.querySelector('#controls #previous'),
	controls_rand = document.querySelector('#controls #random'),

	/*
		'back to main menu' buttons for About and DevInfo sections
		backToMain[0] = about's button
		backToMain[1] = devInfo's button 
	*/
	backToMain = [document.querySelector('#about .backToMain'), document.querySelector('#devInfo .backToMain'), ];


	/*
		DevInfo Section elements
	*/

	version_val = document.querySelector('#version span'),
	techUsed = document.getElementById('techUsed'),
	techUsed_tags = document.querySelectorAll('#techUsed .tag'),
	inspirations = document.getElementById('inspirations'),
	inspirations_tags = document.querySelectorAll('#inspirations .tags'),

	/*
		Changelog stuff
	*/
	changeLog_button = document.getElementById('changelog'),
	versionRecord_wrapper = document.getElementsByClassName('versionRecord')[0];


/*
	Core, continuously reused functions for project
*/
var 
	hide = function(element) { element.style.display = 'none'; },
    display = function(element) { element.style.display = 'block'; },
    opaNone = function(element) { element.style.opacity = 0; },
    opaOne = function(element) { element.style.opacity = 1; },
    getSiblings = (elem) => {
		var siblings = [];
		var sibling = elem.parentNode.firstChild;
		for (; sibling; sibling = sibling.nextSibling) {
			if(sibling.nodeType !== 1 || sibling == elem) continue;
				siblings.push(sibling);
			}
		return siblings;
	},
	quotes = qte.quotes,
	pickRandom = () => { 
		number = Math.round(Math.random() * quotes.length);
		return number;
	},
	randnum = pickRandom(),
	current = randnum;
	

/*
	Core Functions - Functionality 
	-- Parsing through Quotes --
*/
var 
	loadQuote = () => {
		quotes_number.innerText = quotes[randnum].number;
		quotes_text.innerText = quotes[randnum].quote;
		current = randnum;
		return current;
	},
	loadRandom = () => {
		opaNone(quotes_number); opaNone(quotes_text);
		current = pickRandom();
		setTimeout(_=> {
			quotes_number.innerText = quotes[current].number;
			quotes_text.innerText = quotes[current].quote;
		}, 600)
		setTimeout(_=> {
			opaOne(quotes_number); opaOne(quotes_text);
		}, 800)
	},
	loadNext = () => {
		opaNone(quotes_number); opaNone(quotes_text);
		current++;
		if (current > (quotes.length - 1)) {current = 0;}
		setTimeout(_=> {
			quotes_number.innerText = quotes[current].number;
			quotes_text.innerText = quotes[current].quote;
		}, 600);
		setTimeout(_=> {
			opaOne(quotes_number); opaOne(quotes_text);
		}, 800)
	},
	loadPrev = () => {
		opaNone(quotes_number); opaNone(quotes_text);
		current--;
		if (current <= 0) { current = 0; }
		setTimeout(_=> {
			quotes_number.innerText = quotes[current].number;
			quotes_text.innerText = quotes[current].quote;
		}, 600);
		setTimeout(_=> {
			opaOne(quotes_number); opaOne(quotes_text);
		}, 800)
	}

/* Function Assignment */
	//Sets a random quote to load on page load and reload
window.onload = () => { loadQuote(); }
controls_next.addEventListener('click', loadNext);
controls_prev.addEventListener('click', loadPrev);
controls_rand.addEventListener('click', loadRandom);




/*
	Core Functions - Functionality 
	-- Opening and Closing the Navigation Menu -- 
	-- Back to Main button Functionality --
	-- Menu Items Functionality --
*/

/* -- Opening and Closing the Navigation Menu -- */
var openNavi = () => {
		display(nav);
		setTimeout(_=> {
			opaOne(nav);
		}, 100)
	},
	closeNavi = () => {
		opaNone(nav);
		setTimeout(_=> {
			hide(nav);
		}, 800)
	};

toggleNav.addEventListener('click', openNavi);
closeNav.addEventListener('click', closeNavi);



/* -- Back to Main button Functionality -- */
backToMain.forEach((current) => {
	current.addEventListener('click', function() {
		var that = this.parentElement;
		opaNone(that);
		setTimeout(function() {
			hide(that);
		}, 800);
		setTimeout(function() {
			opaNone(section_Main);
			display(section_Main);
		}, 900);
		setTimeout(function() {
			opaOne(section_Main);
		}, 1000);
	})
})




/*	-- Menu Items Functionality -- */
menuItems.forEach((current, index) => {
	current.addEventListener('click', _=> {
		var selectedSection = sections[index];
		var otherSections = getSiblings(selectedSection);
		otherSections.forEach((current) => {
			hide(current);
		})
		display(selectedSection);
		setTimeout(_=> {
			opaNone(nav);
		}, 100)
		setTimeout(_=> {
			hide(nav);
		}, 900)
		setTimeout(_=> {
			opaOne(selectedSection);
		}, 1000)
	})
})









/*
	Developer Info Functionalities Section
	- Changelog button toggling version's list
*/

window.addEventListener('load', function() {
	/*
		This code allows for the correct height of the versionWrapper
		when it is filled with all of it's entries to be saved, then
		save that value, set the height of the wrapper to 0 (so that
		it can be toggled open) and sets that value equal to a variable
		that will be used in the css

		This code also sets up the fade in animation whenever project is
		loaded or reloaded
	*/
	display(section_DevInfo);
	setHeight = getComputedStyle(versionRecord_wrapper, null).height;
	versionRecord_wrapper.style.height = 0;
	body.style.setProperty('--setHeight', setHeight);
	hide(section_DevInfo);

	setTimeout(_=> {
		display(section_Main);
		opaOne(section_Main);
	}, 900);
	setTimeout(_=> {
		overlay.classList.add('fade');
		display(section_Main);
	}, 1000);
	setTimeout(_=> {
		hide(overlay);
	}, 2000);
})

var setHeight;
// console.log(setHeight);
// setTimeout(_=> {
// 	versionRecord_wrapper.style.height = 0;
// })

changeLog_button.addEventListener('click', function() {
	versionRecord_wrapper.classList.toggle('opened');
})