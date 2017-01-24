reset=false;

window.onload = function(){
	if(reset){
		localStorage.removeItem("token_logged_in");
	}
	if(!("token_logged_in" in localStorage)){
		document.getElementById("insert_here").innerHTML = document.getElementById("welcome_view").innerHTML;
	}else{
		document.getElementById("insert_here").innerHTML = document.getElementById("profile_view").innerHTML;
	}
}

function submit(){
	if(signup_validator())
		if(signup())
			return true;
	return false;
}

function signup_validator(){

	//First, validation
	var pss1 = document.forms["signup_form"]["pss"].value;
	var pss2 = document.forms["signup_form"]["pssR"].value;

	if (pss1 != pss2){
		document.forms["signup_form"]["pss"].style.border = "1px solid red";
		document.forms["signup_form"]["pssR"].style.border = "1px solid red";
		// Comment créer une alerte qui ne fasse pas tout bouger ??

		alert("Passwords must be the same !");
		return false;
	}
	if (pss1.length<7 || pss2.length<7){
		document.forms["signup_form"]["pss"].style.border = "1px solid red";
		document.forms["signup_form"]["pssR"].style.border = "1px solid red";
		alert("Passwords must be at least 8 characters long !");
		return false;
	}
	return true;
}

	//Second, signup process
function signup(){
	var user = {email:document.forms["signup_form"]["email"].value,
				password:pss1,
				firstname:document.forms["signup_form"]["firstname"].value,
				familyname:document.forms["signup_form"]["lastname"].value,
				gender:document.forms["signup_form"]["gender"].value,
				city:document.forms["signup_form"]["city"].value,
				country:document.forms["signup_form"]["country"].value
				}

	var ret = serverstub.signUp(user);
	//alert(ret.message);

	if(ret.success){
		var res =serverstub.signIn(user.email,user.password);
		localStorage.setItem("token_logged_in", res.data);
	}else{
		alert("false");
		return false;
	}
	
}