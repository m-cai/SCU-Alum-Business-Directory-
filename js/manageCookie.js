//window.addEventListener("load",nameFieldInit,false);
//Ojbective of file: to store a cookie

/*	manageCookie.js contains the functions relating to
	the system's usage of cookies. Cookies are used by
	the system for the convenience of returing users
	and logged in staff.								*/


//Function for filling user input fields with saved data in cookies
//Also contains disabled code for writing new cookies after fields are edited
function nameFieldInit() {
	
	//prepare variables to hold the info needed
	var firstName = "";
	var lastName = "";
	var gradYear = "";
	
	//prepare place in the cookie to store the fristname, lastname and grad year in
	if (document.cookie != "") {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	//get the element ids of all the variables 
	document.getElementById("first-name").value = firstName;
	// document.getElementById("first-name").onblur = setCookie();

	document.getElementById("last-name").value = lastName;
	// document.getElementById("last-name").onblur = setCookie();

	document.getElementById("grad-year").value = gradYear;
	// document.getElementById("grad-year").onblur = setCookie;
}

//The get functions ascertain that the cookies exist using checkCookie,
//then returns the associated piece of data stored in cookies
//If the cookies are missing or invalid, the functions return false.
function getFirstName(){
	if (checkCookie() == 1) {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return firstName;
	}
	return false;
}

function getLastName(){
	if (checkCookie() == 1) {
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return lastName;
	}
	return false;
}

function getGradYear(){
	if (checkCookie() == 1) {
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return gradYear;
	}
	return false;
}

//Reads data in text forms at time of execution and saves them into cookies
function setCookie() {
	
	var firstName = document.getElementById("first-name").value;
	var lastName = document.getElementById("last-name").value;
	var gradYear = document.getElementById("grad-year").value;
	document.cookie = "firstName=" + firstName;
	document.cookie = "lastName=" + lastName;
	document.cookie = "gradYear=" + gradYear;

	return false;
}

//The setFlag functions set a cookie to note whether
//the client is an alum, non-alum, or unidentified user
function setFlagAlum() {
	document.cookie = "cookieFlag=Alum";
}

function setFlagGuest() {
	document.cookie = "cookieFlag=Guest";
}

function alertCookie() {
  alert(document.cookie);
}

//The function checks if there is a cookie and if the cookie is for an Alum user or a Guest
//Returns 1 if it's an Alum user
//Return 2 if it's a Guest user
function checkCookie() {
	var cookieFlag = "";
	if (document.cookie != "") {
		cookieFlag = document.cookie.replace(/(?:(?:^|.*;\s*)cookieFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	if (cookieFlag == "Alum") {
		return 1
	} else if (cookieFlag == "Guest") {
		return 2;
	}

	return 0;
}


//To set up log-in session so the user doesn't have to log in all the time set a login flage = to True
//When set to True stays logged in
function setLogin() {
	document.cookie = "loginFlag=TRUE";
}

//Removes a flag allowing the system to identify logged in users
function setLogout() {
	document.cookie = "loginFlag=FALSE";
}

//Check if the user has already logged in or not so not to require the user to log-in again

function loginCheck(){
	var loginFlag = "";

	if (document.cookie != "") {
		loginFlag = document.cookie.replace(/(?:(?:^|.*;\s*)loginFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if (loginFlag == "TRUE"){
			window.location.replace('manage_listings.html')
			return true;
		}
	}
}

