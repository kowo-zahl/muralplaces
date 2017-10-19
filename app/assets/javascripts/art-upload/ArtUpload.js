function ArtUpload() {
	this.file = null;
	this.map = null;
	this.marker = null;
	this.city = null;
	this.country = null;
	this.lng = null;
	this.lat = null;
	this.thisData = null;
	this.name = null;
	this.id = null;
	this.orientation = "1";

/*	//sorgt dafür das wir ein durchgehendes abdeckendes Schwarz beim Overlay haben
	this.blindOverlay = function() {
		var el = document.getElementById("blindOverlay");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	};

	//eigendliches Overlay, mit Zählfunktion, dass unser Overlay erst entfernt wenn alle Dateien verarbeitet worden.
	this.overlay = function() {
		var el = document.getElementById("hold");
		el.filesCount = el.filesCount - 1;
		console.log(el.fileCount);
		if (el.filesCount == 0) {
			el.style.visibility = "hidden";
			this.blindOverlay();
		}
	};
*/
	this.readCity = function(data) {
		var self = this;
		$.each(data.results[0].address_components, function(key, value) {
			if (value.types[0] == "locality") {
				self.city = value.long_name;
			};
			if (value.types[0] == "country") {
				self.country = value.long_name;
			};
		});
		this.setJson();
	};

	this.getCity = function(url) {

		var self = this;
		var xmlhttp2 = new XMLHttpRequest();

		xmlhttp2.onreadystatechange = function() {
			if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
				var myArr = JSON.parse(xmlhttp2.responseText);
				self.readCity(myArr);
				//self.overlay();

			}

		};
		xmlhttp2.open("GET", url, true);
		xmlhttp2.send();
		var xmlHttpTimeout = setTimeout(ajaxTimeout, 5000);
		function ajaxTimeout() {
			xmlhttp2.abort();
			//self.overlay();
		}

	};

	//Generiert die Vorschau von unserem Bild und setzt Sie ins Dokument
	this.readURL = function() {

		var reader = new FileReader();

		reader.onload = function(e) {
			var img = document.getElementById('image');
			img.src = e.target.result;
		};

		reader.readAsDataURL(this.file);
	};

	//Generiert Element für die Bildvorschau und ruft readURL
	this.setImage = function(orientation) {
		if (orientation !== 'undefined'){
			orientation = EXIF.getTag(this.file,"Orientation");
		}; 

		var el = document.getElementById('imagediv');
		clearDivEl(el);
		var img = document.createElement('img');
		img.src = "#";
		img.setAttribute('class', 'showSmall schatten well');
		img.setAttribute('id', 'image');
		img.setAttribute('alt', 'your image');
		el.appendChild(img);
		this.readURL();
		
		if (orientation == "8" || orientation == "7"){
			img.setAttribute('class', 'showSmall schatten well rot270');
		}else{
			if (orientation == "3" || orientation=="4"){
				img.setAttribute('class', 'showSmall schatten well rot180');
			}else{
				if(orientation =="6" || orientation=="5"){
					img.setAttribute('class', 'showSmall schatten well rot90');
				}
				
			} 
			}
//img.setAttribute('class', 'showSmall schatten well');
		
	};

	//sets Marker on Map
	this.onMapUploadClick = function(lat, lng) {

		var self = this;

		this.marker = new L.marker(L.latLng(lat, lng), {
			draggable : 'true'
		});

		this.marker.on('dragend', function(event) {
			//set position in the input values
			var position = event.target.getLatLng();
			$('#art_lng').val(position.lng);
			$('#art_lat').val(position.lat);
			self.setPopup(self.marker);
		});

		this.map.map.addLayer(this.marker);
		this.setPopup();
		var currentMarker = this.marker;
		this.map.map.on("click", function(event) {

			var position = event.latlng;
			//console.log(position);

			$('#art_lng').val(position.lng);
			$('#art_lat').val(position.lat);

			if (currentMarker) {
				currentMarker._icon.style.transition = "transform 0.3s ease-out";
				currentMarker._shadow.style.transition = "transform 0.3s ease-out";

				currentMarker.setLatLng(event.latlng);

				setTimeout(function() {
					currentMarker._icon.style.transition = null;
					currentMarker._shadow.style.transition = null;
				}, 300);
				return;
			}

		});

	};
	//sets the Popup with the art_name as text
	this.setPopup = function() {
		var artName = document.getElementById("art_name");
		var leafletPopup = document.getElementsByClassName("leaflet-popup-close-button")[0];
		if (artName.value != "") {
			var popup = L.popup().setContent(document.getElementById("art_name").value);
			this.marker.bindPopup(popup).openPopup();
		}
		if (artName.value == "" && leafletPopup) {
			leafletPopup.click();
		}
	};
	//the data for the controller
	this.setJson = function() {
		var thisData = new Array();
		thisData.push(this.file.name);
		thisData.push(this.name);
		thisData.push(this.lat);
		thisData.push(this.lng);
		thisData.push(this.city);
		thisData.push(this.country);
		thisData.push(this.orientation);

		var oldData = document.getElementById("inputData").value;
		var allData = new Array();
		if (!(oldData === '')) {
			allData = JSON.parse(oldData);
		};
		var newData = new Array();
		var saved = false;
		for (var i = 0,
		    len = allData.length; len > i; i++) {
			if (allData[i][0] === thisData[0]) {
				newData.push(thisData);
				saved = true;
			} else {
				newData.push(allData[i]);
			}
		}
		if (!saved) {
			newData.push(thisData);
		}

		//console.log(allData);
		document.getElementById("inputData").value = JSON.stringify(newData);
	};

	this.isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	this.update = function() {

		this.art.name = $('#art_name').val();
		this.art.lng = $('#art_lng').val();
		this.art.lat = $('#art_lat').val();

		if (this.art.isNumber(this.art.lng) && this.art.isNumber(this.art.lat)) {
			var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.art.lat + ',' + this.art.lng + '&sensor=false';
			this.art.getCity(url);
			document.getElementById("id_" + this.art.file.name).style.color = "#337ab7";
		} else {
			document.getElementById("id_" + this.art.file.name).style.color = "red";
		};
		document.getElementById('art_city').innerText = this.art.city;
		document.getElementById('art_country').innerText = this.art.country;

		if (this.id === 'art_name') {
			this.art.setPopup();
		}
		this.art.setJson();
	};

	//we can't remove listeners so we clone the
	//node (without listeners) and reattach it.
	this.changeListeners = function(id) {

		//remove all listeners
		var el = document.getElementById(id),
		    elClone = el.cloneNode(true);
		el.parentNode.replaceChild(elClone, el);

		//add listeners
		elClone.art = this;

		document.getElementById(id).addEventListener("change", this.update);

		if (id === 'art_name') {
			this.setPopup();
		}
	};

	this.setFocus = function() {
		//clear all values
		$('#art_name').val("");
		$('#art_lng').val("");
		$('#art_lat').val("");
		document.getElementById('art_city').innerText = "";
		document.getElementById('art_country').innerText = "";
		//set values with actuel data
		$('#art_name').val(this.name);
		$('#art_lng').val(this.lng);
		$('#art_lat').val(this.lat);
		document.getElementById('art_city').innerText = this.city;
		document.getElementById('art_country').innerText = this.country;

		//remove/add all Listeners
		this.changeListeners("art_name");
		this.changeListeners("art_lng");
		this.changeListeners("art_lat");

		this.setImage();

		//we need to remove all of the old markers
		var m = document.getElementById("messages");
		var nodeList = m.childNodes;
		for (var i = 0,
		    nl = nodeList.length; nl > i; i++) {
			if (!( typeof nodeList.item(i).art.marker === 'undefined' || nodeList.item(i).art.marker === null)) {
				//this.map.map.removeLayer(nodeList.item(i).art.marker);
			};
		}

		//show the form
		$('#hideme').show();
		var div = document.getElementById("notfound");

		if ( typeof this.lng === 'undefined' || this.lng === null || !(!isNaN(parseFloat(this.lng)) && isFinite(this.lng))) {
			if (div.childNodes.length == 0) {
				var t = document.createTextNode('Keine GPS Daten gefunden. Bitte selber eintragen oder nutzen Sie die Karte.');
				document.getElementById("notfound").appendChild(t);
			}
			$('#mapu2').show();
			this.map.showMap(this.map.lat, this.map.lng);
			this.onMapUploadClick(this.map.lat, this.map.lng);
		} else {
			clearDivEl(div);
			$('#mapu2').show();
			this.map.showMap(this.lat, this.lng);
			this.onMapUploadClick(this.lat, this.lng);
		};


	};

	this.setAllData = function() {

		if ( typeof this.file === 'undefined') {
			this.overlay();
			return false;
		};

		if (!(this.file.type === "image/jpeg")) {
			this.overlay();
			document.getElementById("id_" + this.file.name).style.color = "red";
			return false;
		}

		var self = this;

		var ausgabe = EXIF.getData(this.file, function() {
			var lngi = EXIF.getTag(this, "GPSLongitude");
			var lati = EXIF.getTag(this, "GPSLatitude");
			if (!( typeof lngi === 'undefined' || typeof lati === 'undefined')) {
				vallngi = lngi[0] + (lngi[1] * 60 + lngi[2]) / 3600;
				vallati = lati[0] + (lati[1] * 60 + lati[2]) / 3600;
				//Grad+(Minuten*60+Sekunden)/3600
				//console.log(EXIF.pretty(this));
				self.lat = vallati;
				self.lng = vallngi;
				self.orientation  = EXIF.getTag(this, "Orientation");

				var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + vallati + ',' + vallngi + '&sensor=false';

				self.getCity(url);
			} else {
				document.getElementById("id_" + self.file.name).style.color = "red";
				self.setJson();
				//self.overlay();
			}
		});
			
	};

};