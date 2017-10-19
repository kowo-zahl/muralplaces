var host = "http://" + window.location.host;
var picData = [];
var galleryData = [];
var map = null;

//benötigt devise wenn wir angemeldet sind
jQuery.ajaxSetup({
	'beforeSend' : function(xhr) {
		var token = $("meta[name='csrf-token']").attr("content");
		xhr.setRequestHeader("X-CSRF-Token", token);
	}
});
//Brauchen wir um signed_in aus den cookies zu bekommen um zu wissen ob wir eingeloggt sind.
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
		c = c.substring(1);
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}
	return "";
}

//setzt ein Like und updated unsere Likes/Dislikesansicht
function like(id) {
	$.ajax({
		type : 'PUT',
		url : host + "/api/galleries/" + id + "/upvote/",
		dataType : "json"
	}).done(function(obj) {
setVotes(obj);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

//setzt ein Dislike und updated unsere Likes/Dislikesansicht
function dislike(id) {
	$.ajax({
		type : 'PUT',
		url : host + "/api/galleries/" + id + "/downvote/",
		dataType : "json"
	}).done(function(obj) {
		setVotes(obj);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

function setVotes(obj){
	likesAndDislikes(obj.gallery.id);
	var spanLike = document.createElement('span');
	spanLike.innerText=obj.gallery.like;
	var el=	document.getElementById('like');
	el.insertBefore(spanLike,el.firstChild);
	var spanDislike = document.createElement('span');
	spanDislike.innerText=obj.gallery.dislike;
	var el = document.getElementById('dislike');
	el.insertBefore(spanDislike,el.firstChild);
	
};

// setzt uns unsere Map mit den coordinaten
function setMap(lat, lng) {
	//map vorbereiten
	if (map != null) {
		map.remove();
	};
	map = L.map('map').setView([lat, lng], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
};

//Hauptfunktion für die Bilder,
//setzt alle Daten vom Bild betreffend,
//setzt alles fürs Voten
//setzt die aktuelle Map
function thisPic(picData) {
	//setze Bilddaten
	
	var divData = document.createElement('div');
	divData.setAttribute('class','imageData');
    divData.setAttribute('id','imageData-'+picData.art.id); 
    //Das Div imageData+id hält die Herkunftsdaten
    
   	var div = document.createElement('div');
	div.setAttribute('class','col-md-1');
    div.innerText="";
    
    divData.appendChild(div);
    
    var div = document.createElement('div');
	div.setAttribute('class','col-md-4 col-md-offset-1 country');
    div.innerText=picData.art.country;

    divData.appendChild(div);

    var div = document.createElement('div');
	div.setAttribute('class','col-md-4 city');
    div.innerText=picData.art.city;

    divData.appendChild(div);

	return divData;
};

function nextItem() {
	number = Data.next;
	window.history.pushState("object or string", "Title", "/browse/" + Data.next);
	//setData(galleryData[number]);
	//thumb(picData[next].id, next);
}

function prevItem() {
	number = Data.prev;
	window.history.pushState("object or string", "Title", "/browse/" + Data.prev);
	//setData(galleryData[number]);
	//thumb(picData[next].id, next);
}

function thumb(id, num) {
	$.ajax({
		url : host + "/thumb/" + id,
		dataType : "text"
	}).done(function(pic) {
		$('.next').html('<div id=' + num + ' onclick="nextPic();"><img src="' + host + pic + '" class="preview schatten well"/></div>');
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});

}

function clearComments(){
	clearDivs("comments");
}


//clear divs
function clearDivs(string) {
	var myNode = document.getElementById(string);
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
};

//likesanddislikes
function likesAndDislikes(id) {
	//remove all childs from element
	clearDivs("like");
	clearDivs("dislike");
	//wenn eingeloggt, kann man voten
	if (getCookie("signed_in") == 1) {
		var div = document.createElement('div');
	   	div.setAttribute('class','glyphicon glyphicon-arrow-up pointer');
    	div.setAttribute('onclick','like(' + id + ');');
    	var el = document.getElementById("like");
    	el.appendChild(div);
    	
    	var div = document.createElement('div');
	   	div.setAttribute('class','glyphicon glyphicon-arrow-down pointer');
    	div.setAttribute('onclick','dislike(' + id + ');');
    	var el = document.getElementById("dislike");
    	el.appendChild(div);
	};
};

function setPicture(data){
	var el = document.getElementById("pics");
	var asc  = data.allocations.sort(function(a,b){
		return a.allocation.position - b.allocation.position;
	});	
	for (var i = 0; i < asc.length; i++) {
		for (var k=0;k<data.arts.length;k++){
			if (data.arts[k].art.id === asc[i].allocation.art_id){
				var img = document.createElement('img');
				img.src = host + data.arts[k].art.getUrl;
				
/* picturerotate siehe unten
				//set Orientation of Picture by class
				if (data.arts[k].art.orientation == "8" || data.arts[k].art.orientation == "7"){
					img.setAttribute('class', 'picshow rot270');
				}else{
					if (data.arts[k].art.orientation == "3" || data.arts[k].art.orientation=="4"){
						img.setAttribute('class', 'picshow rot180');
					}else{
						if(data.arts[k].art.orientation =="6" || data.arts[k].art.orientation=="5"){
							img.setAttribute('class', 'picshow rot90');
						}
					} 
				}
	*/			

    			

				
				
    			
    			img.setAttribute('id','image-'+data.arts[k].art.id);
    			
    			var divData = thisPic(data.arts[k]);
    			
    			var divText = document.createElement('div');
				divText.setAttribute('class','imageText');
    			divText.setAttribute('id','imageText-'+data.arts[k].art.id); 
    			divText.innerText=asc[i].allocation.text;
			};
		};
		var divContainer = document.createElement('div');
		divContainer.setAttribute('class','schatten well');
		divContainer.appendChild(img);
		divContainer.appendChild(divData);
		divContainer.appendChild(divText);
		el.appendChild(divContainer);
		
	/*	
	 * Versuch die Bilder zu drehen, aber ich bekomme das z.Z. nicht mit dem Parent div hin. 
	 console.log(divContainer.getBoundingClientRect().height);
		divContainer.style.height = img.width+"px";
		divContainer.style.width = img.width+"px";
		

		//After Orientation we have to reset the Height of the Box
		img.style.width =  divContainer.getBoundingClientRect().height+"px";
		console.log(img.height);
		console.log(img.width);
*/
	};
};


function setData(data) {
	clearComments();
	likesAndDislikes(data.id);
	//Bild anzeigen
	//map setzen
	setMap(data.arts[0].art.lat, data.arts[0].art.lng);
	setPicture(data);
	for (var i = 0; i < data.arts.length; i++) {
		var marker = L.marker([data.arts[i].art.lat, data.arts[i].art.lng]).addTo(map);
		if (data.arts[i].art.name!=""){
		//var popup = L.popup().setContent(data.arts[i].art.name);
		//marker.bindPopup(popup).openPopup();
		}
		
	};
	//get comments
	getRootComments(data.id);
}

//set Tags
function setTags(Data){
    var string="";
	for(var i=0;i<Data.tag_list.length;i++){
		string = string+Data.tag_list[i]+", ";
		var anchor = document.createElement('a');
		var linkText = document.createTextNode(Data.tag_list[i]);
		anchor.appendChild(linkText);
		anchor.href = host + "/tags/"+Data.tag_list[i];
		anchor.title=Data.tag_list[i];
		document.getElementById('tags').appendChild(anchor);
		linkText = document.createTextNode(", ");
		document.getElementById('tags').appendChild(linkText);
	}
	
	string = string.substr(0, string.length-2);
	//$("#tags").append(string);
}

//holt uns alle Art Daten und started die Picture Function und die Thumb Funktion
function getData(number) {
	$.when($.getJSON(host + "/api/browse/" + number)).done(function(data) {
		Data = data.gallery;
		if(Data.title != "null"){
			document.getElementById('title').innerText=Data.title;
		}else{
			document.getElementById('title').innerText="No Title";
		}
		if(Data.utext !== "null"){
			document.getElementById('utext').innerText=Data.utext;
		}	
		setData(Data);
		setTags(Data);
		if(Data.dtext !== "null"){
			document.getElementById('dtext').innerText=Data.dtext;
		}

		$("#next").removeClass("disabled");
		$("#prev").removeClass("disabled");
		if (Data.next === Data.id) {
			$("#next").addClass("disabled");
		};

		if (Data.prev === Data.id) {
			$("#prev").addClass("disabled");
		};
		$('#dislike').prepend(Data.dislike);
		$('#like').prepend(Data.like);
		//thumb(galleryData[1].id, 1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});

};
$(document).ready(function() {

	getData(number);

});

//Ermöglicht das Navigieren mit den Pfeiltasten
document.onkeydown=function(event){
	var key = event.keyCode;
	if (key==37){
		document.getElementById('next').click();
		
	}
	if (key==39){
		document.getElementById('prev').click();
	}
};

