/*
*
* 	Horizontally.js v1.0 
*	https://github.com/MatthewBleUK/horizontally.js
*
*	@license 
*
*   Copyright 2022 - Created by Matthew Bleathman
*
*/

"use strict";

var state = {
	sections: [],
	currentSection: '',
	currentIndex: '',
	nextSection: '',
	previousSection: '',
	isScrolling: false,
	currentLeftPos: 0,
}

var defaultOptions = {
	wrapper: '#horizontally',
	arrowButtons: true,
	pageSelector: true,
}

var options = {}

// This function initializes the project
function horizontally(userOptions) {

	// Sets the default options
	setOptions(defaultOptions);

	// Overrides default options with the user's options if available 
	setOptions(userOptions);

	// Creates an array of all the sections
	createSectionArray();

	// Creates the on page DOM elements depending on user's options
	if (options.arrowButtons) addArrowButtonsToDom();
	if (options.pageSelector) addPageSelectorsToDom();

	// Updates the state object
	updateState();

}

function setOptions(obj) {
	
	// Loops through key value pairs and adds or updates them to the options object
	for (let [key, value] of Object.entries(obj)) {

		// Wrapper needs to be stored as a DOM element
		key != "wrapper" ? options[key] = value : options[key] = document.querySelector(value);
	
	}

	// Error handling for incorrect wrapper option
	if (options.wrapper == null || options.wrapper == undefined || typeof options.wrapper != 'object') {

		throw new Error('Incorrect wrapper. Please check for spelling mistakes or take a look at the documentation example.');

	}
}

function addArrowButtonsToDom() {

	let leftArrowHTML = `
		<button class="arrow left" onclick='previousSection()'>
			<svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<polyline points="30 10 10 30 30 50" stroke="#172529" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round" shape-rendering="geometricPrecision"></polyline>
			</svg>
		</button>
	`;

	let rightArrowHTML = `
		<button class="arrow right" onclick='nextSection()'>
			<svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<polyline points="10 10 30 30 10 50" stroke="#172529" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round" shape-rendering="geometricPrecision"></polyline>
			</svg>
		</button>
	`;

	// Adds the left and right arrow button html after the wrapper
	options.wrapper.insertAdjacentHTML("afterend", `<div id="fixed-arrows">` + leftArrowHTML + rightArrowHTML + `</div>`);

}

function addPageSelectorsToDom() {

	let innerHTML = '';
	
	// Appends the innerHTML variable for each new section
	state.sections.forEach((element, index) => {

		// Adds active class to index[0] and custom data-index attribute to li tag
		innerHTML += `<li ${index == 0 ? 'class="active"' : ''} data-index="${index}"><span></span></li>`

	});

	// Adds the circle page selector html after the wrapper
	options.wrapper.insertAdjacentHTML("afterend", `<div id="page-selector"><ul>` + innerHTML + `</ul></div>`);


	let selectorLi = document.querySelectorAll('#page-selector ul li');

	// Adds a click event listener to all page selector's li elements
	addClickListenerToNodes(selectorLi, handleSelectorsClick);

}

function addClickListenerToNodes(nodes, func) {
	
	// Iterates through each node and adds a click event listener.
	nodes.forEach(element => {
		
		element.addEventListener('click', func);

	});
	
}

function createSectionArray() {	

		let sections = document.querySelectorAll('.section');

		// If sections exist, push to state.sections array
		if (sections.length > 0) {

			state.sections.push(...sections);

		} else {

			// Error handling in case no sections were found
			throw new Error('Could not find correct section class. Please check for spelling mistakes or take a look at the documentation example.');

		}

}

// Main function to update the state
function updateState() {

	state.currentSection = getSectionInView();

	// Returns the index of state.currentSection
	state.currentIndex = state.sections.findIndex(index => index === state.currentSection); 

	/* Ternary operator: update next section in state object. 
	If user is on the last slide, assign to the first section else increment */
	state.nextSection = state.currentIndex === state.sections.length - 1 ? state.sections[0] : state.sections[state.currentIndex  + 1];

	/* Ternary operator: update previous section in state object. 
	If user is on the first slide, assign to the last section else decrement */
	state.previousSection = state.currentIndex === 0 ? state.sections[state.sections.length - 1] : state.sections[state.currentIndex  - 1];

	addActiveClassToSelectors();

}

function getSectionInView() {

	let currentSection,
		wrapperRect = options.wrapper.getBoundingClientRect(),
		wrapperXPos = Math.abs(wrapperRect.x);	// Math.abs on a negative number returns a positive number

	// Iterates through each section
	state.sections.forEach(section => {

		const left = section.offsetLeft, 
			  width = section.clientWidth, 
			  numOfSections = state.sections.length;

		/* Finds which section the wrapper's scroll positioning is on by subtracting the section's offset left pixel
	 	to the client width and dividing by the number of sections. Last section to fit this criteria is the 
		current section in viewport */ 
		if (wrapperXPos > left - width / numOfSections + 1) {

			currentSection = section;

		}

	});

	return currentSection;


}

function addActiveClassToSelectors() {

	let pageSelectorLi = document.querySelectorAll('#page-selector ul li');

	// Removes active class from each circle page selector li
	pageSelectorLi.forEach(anchor => {

		anchor.classList.remove('active');
		
	});

	let pageSelectorLiActive = document.querySelector(`#page-selector ul li:nth-child(${state.currentIndex + 1})`);

	// Adds active class by using the index of the current section + 1
	pageSelectorLiActive.classList.add('active');

}

function handleSelectorsClick(e) {

	e.preventDefault(); 

	// Gets the section index from the li circle page selector data-index attribute
	let index = this.getAttribute('data-index'); 

	scroll(state.sections[index]);
	
}

function previousSection() {
		
	scroll(state.previousSection);
	
}

function nextSection() {
		
	scroll(state.nextSection);

}

function scroll(destination) {

	if(!state.isScrolling) {

		state.isScrolling = true;

		let pixel = destination.offsetLeft;

		/* The scroll function works by updating the transform: translate3d tx value. 
		CSS transition handles the speed */
		options.wrapper.style.transform = `translate3d(-${pixel}px, 0px, 0px)`	

		setTimeout(() => {

			state.isScrolling = false;

			updateState();
			
		}, 1000 + 50);	// Waits until scroll is over + 50ms to call update state

	}

}