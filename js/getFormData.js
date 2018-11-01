function getFormData() {
	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var grad_year = document.getElementById("grad_year-select").value;
	var business = document.getElementById("business-name").value;
	var city = document.getElementById("business-city").value;
	var state = document.getElementById("state-select").value;
	var zip = document.getElementById("business-zip").value;
	var email = document.getElementById("business-email").value;
	var phone = document.getElementById("business-phone").value;

	var obj = { "firstname": firstname, "lastname": lastname, "year": grad_year, "business": business, "city": city, "state": state, "zip": zip, "email": email, "phone": phone};
	console.log(obj);
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = JSON.parse(xmlhttp.responseText);
	    }
	};
	xmlhttp.open("POST", "../php/add_business.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-changes").onclick = getFormData;