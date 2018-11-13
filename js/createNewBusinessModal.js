/* Create business information modals for new business listings */
function createNewBusinessModal(e) {
	var modalName = e.target.id;
	var modalId = modalName + "-modal";
	var modalTitle = modalName + "-title";
	console.log(modalName);

	var bsnModal = document.createElement("DIV");
	bsnModal.id = modalId;
	bsnModal.className = "modal fade";
	bsnModal.tabIndex = "-1";
	bsnModal.setAttribute("role", "dialog");
	bsnModal.setAttribute("aria-labelledby", modalTitle);
	bsnModal.setAttribute("aria-hidden", "true");
	bsnModal.setAttribute("data-show", "true");

	var dialog = document.createElement("DIV");
	dialog.className = "modal-dialog";
	dialog.setAttribute("role", "document");

	var content = document.createElement("DIV");
	content.className = "modal-content";

	var header = document.createElement("DIV");
	header.className = "modal-header";
	var title = document.createElement("H5");
	title.className = "modal-title";
	title.id = modalTitle;
	title.textContent = modalName.replace(/_/g, ' ');
	var x_btn = document.createElement("BUTTON");
	x_btn.setAttribute("type", "button");
	x_btn.className = "close";
	x_btn.setAttribute("data-dismiss", "modal");
	x_btn.setAttribute("aria-label", "Close");
	x_btn.innerHTML = "<span aria-hidden=true>&times;</span>";
	header.appendChild(title);
	header.appendChild(x_btn);

	var body = document.createElement("DIV");
	body.className = "modal-body";

	var footer = document.createElement("DIV");
	footer.className = "modal-footer";
	var reject_btn = document.createElement("BUTTON");
	reject_btn.className = "btn btn-danger";
	reject_btn.id = "reject";
	reject_btn.setAttribute("type", "button");
	reject_btn.addEventListener("click", function() {
		updateApproval("reject", modalName, "new");
	});
	reject_btn.textContent = "Reject";
	var approve_btn = document.createElement("BUTTON");
	approve_btn.className = "btn btn-success";
	approve_btn.id = "approve"
	approve_btn.setAttribute("type", "button");
	approve_btn.addEventListener('click', function() {
		updateApproval("approve", modalName, "new");
	});
	approve_btn.textContent = "Approve";
	footer.appendChild(reject_btn);
	footer.appendChild(approve_btn);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);

	dialog.appendChild(content);

	bsnModal.appendChild(dialog);

	document.getElementById("new_modal_area").appendChild(bsnModal);

	//Request for data then show
	var obj = { "businessname": modalName.replace(/_/g, ' ') };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			obj = JSON.parse(xmlhttp.responseText);
			console.log(obj);

			var lbr = document.createElement("BR");

			var address = document.createElement("P");
			var address_head = document.createElement("B");
			address_head.textContent = "Address: ";
			var address_txt2 = document.createTextNode(obj.address['CITY'] + ", " + obj.address['STATE'] + " " + obj.address['ZIPCODE']);
			var address_txt1 = document.createElement("SPAN");
			address_txt1.textContent = obj.address['ADDRESS'];
			var address_txt2 = document.createElement("SPAN");
			address_txt2.textContent = obj.address['CITY'] + ", " + obj.address['STATE'] + " " + obj.address['ZIPCODE'];
			address.appendChild(address_head);
			address.appendChild(address_txt1);
			address.appendChild(address_txt2);

			var spans = address.getElementsByTagName("SPAN");

			for (var i = 0; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				address.insertBefore(lbr, spans[i]);
			}

			for (var i = 1; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				address.insertBefore(lbr, spans[1]);
			}


			var phone = document.createElement("P");
			var phone_head = document.createElement("B");
			phone_head.textContent = "Phone: ";
			var phone_num = document.createTextNode(obj.contact['PHONENUMBER']);
			phone.appendChild(phone_head);
			phone.appendChild(phone_num);

			var email = document.createElement("P");
			var email_head = document.createElement("B");
			email_head.textContent = "Email: ";
			var email_addr = document.createTextNode(obj.contact['EMAIL']);
			email.appendChild(email_head);
			email.appendChild(email_addr);

			var owner = document.createElement("P");
			var owner_head = document.createElement("B");
			owner_head.textContent = "Owner: ";
			var owner_name = document.createTextNode(obj.owner['FIRSTNAME'] + " " + obj.owner['LASTNAME']);
			owner.appendChild(owner_head);
			owner.appendChild(owner_name);

			var tags = document.createElement("P");
			var tags_head = document.createElement("B");
			tags_head.textContent = "Tags: ";
			var tags_text = document.createTextNode(obj.description['TAG']);
			tags.appendChild(tags_head);
			tags.appendChild(tags_text);

			var descrip = document.createElement("P");
			var descrip_head = document.createElement("B");
			descrip_head.textContent = "Description: ";
			var descrip_text = document.createTextNode(obj.description['COMMENTS']);
			descrip.appendChild(descrip_head);
			descrip.appendChild(lbr);
			descrip.appendChild(descrip_text);

			body.appendChild(address);
			body.appendChild(phone);
			body.appendChild(email);
			body.appendChild(owner);
			body.appendChild(tags);
			body.appendChild(descrip);

			$('#' + modalId).modal('show');
		}
	}

	xmlhttp.open("POST", "../php/getBusinessData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}