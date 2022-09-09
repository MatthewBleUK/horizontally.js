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

	// Creates the on page DOM elements depending on user's options
	if (options.arrowButtons) addArrowButtonsToDom();
	if (options.pageSelector) addPageSelectorsToDom();

}

function setOptions(obj) {
	
	// Loops through key value pairs and adds or updates them to the options object
	for (let [key, value] of Object.entries(obj)) {

		// wrapper needs to be stored as a DOM element
		key != "wrapper" ? options[key] = value : options[key] = document.querySelector(value);
	
	}

	// Error handling for incorrect wrapper option
	if (options.wrapper == null || options.wrapper == undefined || typeof options.wrapper != 'object') {

		throw new Error('Incorrect wrapper. Please check for spelling mistakes or take a look at the documentation example.');

	}
}

function addArrowButtonsToDom() {

	let leftArrowHTML = `
		<button class="arrow left">
			<svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<polyline points="30 10 10 30 30 50" stroke="#172529" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round" shape-rendering="geometricPrecision"></polyline>
			</svg>
		</button>
	`;

	let rightArrowHTML = `
		<button class="arrow right">
			<svg width="40" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<polyline points="10 10 30 30 10 50" stroke="#172529" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round" shape-rendering="geometricPrecision"></polyline>
			</svg>
		</button>
	`;

	// Adds the left and right arrow button html after the wrapper
	options.wrapper.insertAdjacentHTML("afterend", `<div id="fixed-arrows">` + leftArrowHTML + rightArrowHTML + `</div>`);

}

function addPageSelectorsToDom() {

	let sections = document.querySelectorAll('.section'), 
		innerHTML = '';
	
	// Appends the innerHTML variable for each new section
	sections.forEach((element, index) => {
		
		// Adds active class to index[0] and custom data-index attribute to li tag
		innerHTML += `<li ${index == 0 ? 'class="active"' : ''} data-index="${index}"><span></span></li>`

	});

	// Adds the circle page selector html after the wrapper
	options.wrapper.insertAdjacentHTML("afterend", `<div id="page-selector"><ul>` + innerHTML + `</ul></div>`);

}
