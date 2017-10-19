// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require google-analytic
//= require bootstrap
//= require exif
//= require arts-show
//= require galleries-show
//= require art-upload/MapIt
//= require art-upload/ArtUpload
//= require art-upload/PictureUpload





//modal username
//benötigt devise wenn wir angemeldet sind
jQuery.ajaxSetup({
	'beforeSend' : function(xhr) {
		var token = $("meta[name='csrf-token']").attr("content");
		xhr.setRequestHeader("X-CSRF-Token", token);
	}
});

var host = "https://" + window.location.host;

function testUsername(){
	if (document.getElementById("user_username").value != ""){
document.getElementById("user_username").style.borderColor = "green";
}
	$.ajax({
		type : 'POST',
		url : host + "/api/getUserName",
		 data: {
             username: document.getElementById("user_username").value},
		dataType : "json"
	}).done(function(obj) {
		
		if (obj != null && obj.user.username != document.getElementById("user_username").value){
		document.getElementById("user_username").style.borderColor = "green";
		}else{
			document.getElementById("user_username").style.borderColor = "red";
		}

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

function testUserEmail(){

	if (document.getElementById("user_email").value != ""){
document.getElementById("user_email").style.borderColor = "green";
}
	$.ajax({
		type : 'POST',
		url : host + "/api/getUserEmail",
		 data: {
              email: document.getElementById("user_email").value},
		dataType : "json"
	}).done(function(obj) {
		
		if (obj != null && obj.user.email != document.getElementById("user_email").value){
		document.getElementById("user_email").style.borderColor = "green";
		}else{
			document.getElementById("user_email").style.borderColor = "red";
		}

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

window.onload = function () {
document.getElementById("user_username").addEventListener("change",testUsername);
document.getElementById("user_username").addEventListener("keypress",testUsername);
document.getElementById("user_username").addEventListener("paste",testUsername);
document.getElementById("user_username").addEventListener("input",testUsername);
document.getElementById("user_email").addEventListener("change",testUserEmail);
document.getElementById("user_email").addEventListener("keypress",testUserEmail);
document.getElementById("user_email").addEventListener("paste",testUserEmail);
document.getElementById("user_email").addEventListener("input",testUserEmail);
};












//clear divs
function clearDiv(string) {
	var myNode = document.getElementById(string);
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
};
function clearDivEl(myNode) {
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
};

/*
window.onload = function () {


// Set to the same value as the web property used on the site
var gaProperty = 'UA-70788029-1';

// Disable tracking if the opt-out cookie exists.
var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
	window[disableStr] = true;
}

// Opt-out function
function gaOptout() {
	document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
	window[disableStr] = true;
}
function removeCookieBanner(){
	var banner = document.getElementById("cookiebanner");
	banner.parentNode.removeChild(banner);	

}
function createCookieBanner(){
	
		document.getElementById("cookiebanner").innerHTML = '<div class="container cookie" ><div class="row-centered"><div class="col-centered" >Diese Website nutzt Cookies zur Datenerhebung! <a href="'+window.location.origin+'/static_pages/datenschutz"> Weitere Informationen.</a><button id="cookieButton">Verstanden</button></div></div></div>';
	var button = document.getElementById("cookieButton");
	button.addEventListener("click",cookieBanner);
}
if (document.cookie.indexOf('cookiebanner' + '=true') > -1) {
	window['cookiebanner'] = true;
	removeCookieBanner();
	
}else{
	
	createCookieBanner();
}

function cookieBanner() {
	document.cookie = 'cookiebanner=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
	window['cookiebanner'] = true;
	removeCookieBanner();
}

};
*/
