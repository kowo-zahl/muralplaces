// Overlays die ein Formular aufrufen

// overlay für den Background
// dieses ist fixed und sorgt für den Hintergrund, 
// Die anderen sind absolute damit sie scrollbar bleiben 
function blindOverlay(){
	var el = document.getElementById("blindOverlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


// für Modal um die Tags zu ändern
function newUtext() {
	hideAllForms();
	document.getElementById("utext").style.display = "none";
	document.getElementById("utextDiv").style.display = "none";
	document.getElementById("utextFormData").style.display = "inline";
}
// für Modal um die Tags zu ändern
function newDtext() {
	hideAllForms();
	document.getElementById("dtext").style.display = "none";
	document.getElementById("dtextDiv").style.display = "none";
	document.getElementById("dtextFormData").style.display = "inline";
}

function hideAllForms(){
	document.getElementById("utext").style.display = "inline";
	document.getElementById("utextDiv").style.display = "block";
	document.getElementById("dtextDiv").style.display = "block";
	document.getElementById("utextFormData").style.display = "none";
	document.getElementById("dtext").style.display = "inline";
	document.getElementById("dtextFormData").style.display = "none";
	document.getElementById("titleFormData").style.display = "none";
	document.getElementById("tagFormData").style.display = "none";
	document.getElementById("tag").style.display = "inline";
	document.getElementById("title").style.display = "inline";	
}

// für Modal um die Tags zu ändern
function newTags() {
	hideAllForms();
	document.getElementById("tag").style.display = "none";
	document.getElementById("tagFormData").style.display = "inline";
}

// für Modal um den Titel zu ändern
function newTitle() {
	hideAllForms();
	document.getElementById("title").style.display = "none";
	document.getElementById("titleFormData").style.display = "inline";

}

// für Modal um die Sichtbarkeit in der Gallerie zu ändern
function newShow() {

	var el = document.getElementById("showForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();

}


function newPicsClose(){
	var el = document.getElementById("picForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();
}

function newThumbnailClose(){
	var el = document.getElementById("thumbnailForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();
}

function newPicsDetailClose(){
	var el = document.getElementById("picDetailForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();
}

// Overlays die sich Ihre Daten über die API ziehen

// we don't use the normal ruby forms for pictures, because it would be unwise to preload all pictures if we don't need them
function newPics(galleryId) {
	//Overlay anzeigen oder nicht
	var el = document.getElementById("picForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();

	//picFormData leeren
	var myNode = document.getElementById('picFormData');
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}

	//Close Button im Modal
	var s = document.createElement("p");
	s.setAttribute('class',"pointer close");
	s.setAttribute('onClick',"newPicsClose()");
	s.innerText="X";
	myNode.appendChild(s);
	
	//create Hosturl
	var http = location.protocol;
	var slashes = http.concat("//");
	var host = slashes.concat(location.host);
	
	//create xhttp
	var xhttp;
	if (window.XMLHttpRequest) {
    	xhttp = new XMLHttpRequest();
    } else {
    	// code for IE6, IE5
    	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	
	xhttp.open("GET", host+"/api/arts", true);
	xhttp.onreadystatechange = function() 
		{
  			if (xhttp.readyState == 4 && xhttp.status == 200) {
  
    			var obj = JSON.parse(xhttp.responseText);
    			
				var f = document.createElement("form");
				f.setAttribute('method',"post");
				f.setAttribute('action',galleryId);
				
				//we send utf8
				var inpututf8 = document.createElement("input");
				inpututf8.setAttribute('name','utf8');
				inpututf8.setAttribute('type','hidden');
				inpututf8.setAttribute('value','✓');
				f.appendChild(inpututf8);
				

				//we want to send it as a patch request
				var inputpatch = document.createElement("input");
				inputpatch.setAttribute('name','_method');
				inputpatch.setAttribute('type','hidden');
				inputpatch.setAttribute('value','patch');
				f.appendChild(inputpatch); 
				
				//we need the csrf token
				var inputcsrf = document.createElement("input");
				inputcsrf.setAttribute('name','authenticity_token');
				inputcsrf.setAttribute('type','hidden');
				inputcsrf.setAttribute('value',document.getElementsByTagName('meta')['csrf-token'].getAttribute("content"));
				f.appendChild(inputcsrf); 
				
				
				
				var field = document.createElement("fieldset");
				for(var i =0,len = obj.length; len> i;i++){
    				if(obj[i].art.getThumbUrl){
    					var img = document.createElement('img');
						img.src = obj[i].art.getThumbUrl;
    					img.setAttribute('class','fimg');
    					var label = document.createElement('label');
    					label.setAttribute('for','check'+i);
    					//TODO: nachsehen welche Bilder schon in der Gallerie sind und diese Vorchecken.
    					var input = document.createElement('input');
    					input.setAttribute('type','checkbox');
    					input.setAttribute('name','gallery[art_ids][]');
    					input.setAttribute('value',obj[i].art.id);
    					input.setAttribute('id','check'+i);
    					input.setAttribute('class','finput');
    					
 						var wrapperDiv = document.createElement('div');
 						wrapperDiv.setAttribute('class','wrapperDiv');
 						
    					
						wrapperDiv.appendChild(label);
						wrapperDiv.appendChild(input);
						wrapperDiv.appendChild(img);
						field.appendChild(wrapperDiv);
					
					}
    			}


				var s = document.createElement("input"); //input element, Submit button
				s.setAttribute('type',"submit");
				s.setAttribute('value',"Submit");
				f.appendChild(field);
				f.appendChild(s);


				document.getElementById('picFormData').appendChild(f);

  			}
		};


	xhttp.send();
}



// we don't use the normal ruby forms for pictures, because it would be unwise to load all pictures if we don't need them
function newThumbnail(galleryId) {
	
	el = document.getElementById("thumbnailForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();
	var myNode = document.getElementById('thumbnailFormData');
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	
	var s = document.createElement("p"); //input element, Submit button
	s.setAttribute('class',"pointer close");
	s.setAttribute('onClick',"newThumbnailClose()");
	s.innerText="X";
	myNode.appendChild(s);
	
	var http = location.protocol;
	var slashes = http.concat("//");
	var host = slashes.concat(location.host);
	
	var xhttp;
	if (window.XMLHttpRequest) {
    	xhttp = new XMLHttpRequest();
    } else {
    	// code for IE6, IE5
    	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", host+"/api/galleries/"+galleryId, true);
	xhttp.onreadystatechange = function() 
		{
  			if (xhttp.readyState == 4 && xhttp.status == 200) {
    			var obj = JSON.parse(xhttp.responseText);
    			
    			var arts = obj.gallery.arts;

				var f = document.createElement("form");
				f.setAttribute('method',"post");
				f.setAttribute('action',galleryId);
				
				//we send utf8
				var inpututf8 = document.createElement("input");
				inpututf8.setAttribute('name','utf8');
				inpututf8.setAttribute('type','hidden');
				inpututf8.setAttribute('value','✓');
				f.appendChild(inpututf8);
				

				//we want to send it as a patch request
				var inputpatch = document.createElement("input");
				inputpatch.setAttribute('name','_method');
				inputpatch.setAttribute('type','hidden');
				inputpatch.setAttribute('value','patch');
				f.appendChild(inputpatch); 
				
				//we need the csrf token
				var inputcsrf = document.createElement("input");
				inputcsrf.setAttribute('name','authenticity_token');
				inputcsrf.setAttribute('type','hidden');
				inputcsrf.setAttribute('value',document.getElementsByTagName('meta')['csrf-token'].getAttribute("content"));
				f.appendChild(inputcsrf); 

				
				
				var field = document.createElement("fieldset");
				for(var i =0,len = arts.length; len> i;i++){
    				if(arts[i].art.getThumbUrl){
    					var img = document.createElement('img');
						img.src = arts[i].art.getThumbUrl;
    					img.setAttribute('class','fimg');
    					var label = document.createElement('label');
    					label.setAttribute('for','check'+i);
    					//TODO: nachsehen welches Thumbnail gerade genutzt wird und dieses Vorchecken.
    					var input = document.createElement('input');
    					input.setAttribute('type','radio');
    					input.setAttribute('name','gallery[thumbUrl]');
    					input.setAttribute('value',arts[i].art.getThumbUrl);
    					input.setAttribute('id','check'+i);
    					input.setAttribute('class','finput');
    					
  
    					
						field.appendChild(label);
						field.appendChild(input);
						field.appendChild(img);
					
					}
    			}


				var s = document.createElement("input"); //input element, Submit button
				s.setAttribute('type',"submit");
				s.setAttribute('value',"Submit");
				f.appendChild(field);
				f.appendChild(s);

				//and some more input elements here
				//and dont forget to add a submit button

				document.getElementById('thumbnailFormData').appendChild(f);
    			
  			}
		};

	xhttp.send();
}



// we don't use the normal ruby forms for pictures, because it would be unwise to load all pictures if we don't need them
function newPicDetail(allocationId) {
	el = document.getElementById("picDetailForm");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	blindOverlay();
	
	var myNode = document.getElementById('picDetailFormData');
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	
	var s = document.createElement("p"); //input element, Submit button
	s.setAttribute('class',"pointer close");
	s.setAttribute('onClick',"newPicsDetailClose()");
	s.innerText="X";
	myNode.appendChild(s);
	
	
	
	
	var http = location.protocol;
	var slashes = http.concat("//");
	var host = slashes.concat(location.host);
	
	var xhttp;
	if (window.XMLHttpRequest) {
    	xhttp = new XMLHttpRequest();
    } else {
    	// code for IE6, IE5
    	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", host+"/api/allocations/"+allocationId, true);
	xhttp.onreadystatechange = function() 
		{
  			if (xhttp.readyState == 4 && xhttp.status == 200) {
    			var obj = JSON.parse(xhttp.responseText);

				var allocation = obj.allocation;
				var f = document.createElement("form");
				f.setAttribute('method',"post");
				f.setAttribute('action',host+"/allocations/"+allocationId);
				
				//we send utf8
				var inpututf8 = document.createElement("input");
				inpututf8.setAttribute('name','utf8');
				inpututf8.setAttribute('type','hidden');
				inpututf8.setAttribute('value','✓');
				f.appendChild(inpututf8);
				

				//we want to send it as a patch request
				var inputpatch = document.createElement("input");
				inputpatch.setAttribute('name','_method');
				inputpatch.setAttribute('type','hidden');
				inputpatch.setAttribute('value','patch');
				f.appendChild(inputpatch); 
				
				//we need the csrf token
				var inputcsrf = document.createElement("input");
				inputcsrf.setAttribute('name','authenticity_token');
				inputcsrf.setAttribute('type','hidden');
				inputcsrf.setAttribute('value',document.getElementsByTagName('meta')['csrf-token'].getAttribute("content"));
				f.appendChild(inputcsrf); 

				
				var field = document.createElement("fieldset");

    				
    			var label = document.createElement('label');
    			label.setAttribute('for','text');
    			label.innerText="Bildtext";
  
  				var input = document.createElement('input');
  				input.setAttribute('type','textarea');
  				input.setAttribute('name','allocation[text]');
  				input.setAttribute('value',allocation.text);
  				input.setAttribute('id','text');
    					
  			//	var div = document.createElement('div');
    		//	div.setAttribute('class','divInput');
    		//	div.appendChild(input);
    		//	label.appendChild(div);
    					
				field.appendChild(label);
				field.appendChild(input);
				
				var label = document.createElement('label');
    			label.setAttribute('for','position');
  				label.innerText="Position";
  				
    			var input = document.createElement('input');
    			input.setAttribute('type','text');
    			input.setAttribute('name','allocation[position]');
    			input.setAttribute('value',allocation.position);
    			input.setAttribute('id','position');
    					
    		//	var div = document.createElement('div');
    		//	div.setAttribute('class','divInput');
    		//	div.appendChild(input);
    		//	label.appendChild(div);
    					
				field.appendChild(label);
				field.appendChild(input);
    		


				var s = document.createElement("input"); //input element, Submit button
				s.setAttribute('type',"submit");
				s.setAttribute('value',"Submit");
				f.appendChild(field);
				f.appendChild(s);

				//and some more input elements here
				//and dont forget to add a submit button

				document.getElementById('picDetailFormData').appendChild(f);
    			
  			}
		};

	xhttp.send();
}







