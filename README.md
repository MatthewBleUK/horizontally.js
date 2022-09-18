# Horizontally.js

Horizontally.js is a vanilla JavaScript library that creates mobile-friendly slide show style web pages. 

![Horizontally logo](logo.svg) 

Try our [online demo](https://horizontaly.com).

</br>

# Contents
- [Personal License](#-Personal-License)
- [Commercial License](#-Commerical-License)
- [Usage](#-Usage)
- [Options](#-Options)
- [Contributors](#-Contributors)

</br>

# Personal License

Horizontally.js is released under the GNU General Public License v3 for open-source personal projects. 

This means you are free to modify and distribute under the GPL license if the copyright and credits notices remain untouched.

View this [resource](https://choosealicense.com/licenses/gpl-3.0/) for more information on the GPL License. 

</br>

# Commercial License

For commercial uses such as non open-source sites, website templates, and other types of web applications a commercial license is needed.

For more information on commercial licenses, take a look at [our site](https://horizontaly.com). 

</br>

# Usage

To use Horizontally.js you need to include the css and js files, add the correct HTML structure, and initialize the project.
</br>
</br>

### Including CSS and JS files:

```html
<link rel="stylesheet" type="text/css" href="horizontally.css">

<script type="text/javascript" src="horizontally.js"></script>
```
</br>

### HTML structure:

```html
<div id="horizontally">
	<div class="section"></div>
	<div class="section"></div>
	<div class="section"></div>
</div>
```
</br>

### Initialize project:

```javascript
new horizontally({
	wrapper: '#horizontally',
	speed: 1000,
	arrowButtons: true,
	pageSelector: true,
});
```
</br>

# Options 

Horizontally can be used with four options. 

</br>

The wrapper option enables you to change the HTML ID name of the wrapper. The default option is #horizontally.
```javascript
wrapper: '#horizontally'
```

</br>

The speed option enables you to change the scroll ms duration. For best results, and to prevent buggy behavior a speed above 300ms is a good choice. The default scroll speed is set to 1000ms.
```javascript
speed: 1000
```
</br>

The arrowButtons options lets you to enable or disable the DOM onscreen arrow buttons.
```javascript
arrowButtons: true
```
</br>

The pageSelector options lets you to enable or disable the DOM circle page selector / navigation buttons.
```javascript
pageSelector: true
```

</br>

# Contributors

All contributors to this project are welcome.

A detailed list of all the feature features and bugs can be found inside the issues tab.

Simply fork the project, send a PR request when done, and I will review it.