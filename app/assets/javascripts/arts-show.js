function ArtShow(lat, lng) {

	this.lat = lat;
	this.lng = lng;
	this.name = "";

	//Die Variable für Maps
	this.map = L.map('mapu').setView([this.lat, this.lng], 13);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(this.map);

	this.setMap = function setMap(lat, lng, name) {
		document.getElementById("latlngFormData").style.display = "none";
		document.getElementById("reset").style.display = "none";

		if (this.map != null) {
			this.map.remove();
		}

		this.map = L.map('mapu').setView([lat, lng], 13);
		//saveMap=this.map;
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

		this.onMapClick(lat, lng, name);

	};

	this.setMarker = function setMarker(lat, lng) {
		if (this.marker != null) {
			this.marker.remove();
		}

		if (isUser){
		this.marker = new L.marker(L.latLng(lat, lng), {
			draggable : 'true'
		});
	}else{
		this.marker = new L.marker(L.latLng(lat, lng), {
		});
	}
		var self = this;
				if (isUser){
		this.marker.on('dragend',markerDragged );
}
		this.map.on('popupopen', popupOpen);
		this.map.addLayer(this.marker);

		//Setzt Marker
		//wenn der Marker bewegt wird, werden die Daten des Markers zur Zwischspeicherung in versteckte Divs geschrieben
		this.onMapClick = function(lat, lng, name) {
			if (name.length > 0) {
				//var popup = L.popup().setContent(name);
				//marker.bindPopup(popup).openPopup();
			}
		};
		if (isUser){
			this.map.on("click", mapClick);
		}
	};


function markerDragged(event) {
			document.getElementById("latlngFormData").style.display = "block";
			document.getElementById("reset").style.display = "block";
			var position = event.target.getLatLng();

			if (isUser) {
				document.getElementById("art_lng2").value = position.lng;
				document.getElementById("art_lat2").value = position.lat;
			}
			//hide all other forms

			//document.getElementById("name").style.display = "inline";
			//document.getElementById("nameFormData").style.display = "none";

			//Testen ob wir überhaupt Änderungen machen können.
			//Wenn das Fomular da ist ist alles ok
			if (isUser) {
				//In unserem Popup hätten wir gerne noch zwei Buttons fuer Reset und Update der Position des Bildes.
				//var popup = '<button id="popupReset">Reset</button><button id="popupSave">Änderungen Übernehmen</button>';
				var popup = '<button id="popupReset">Reset</button>';
			} else {

				var popup = '<button id="popupReset">Reset</button>';
			}

			self.marker.bindPopup(popup).openPopup();
			

		}

function popupOpen() {
			//Wir resetten den Marker
			$("#popupReset").on("click", function(event) {
				//self.setMap(self.lat, self.lng,self.name );
				self.setMarker(self.lat, self.lng, self.name);
			});
			//Testen ob wir überhaupt Änderungen machen können.
			//Wenn das Fomular da ist ist alles ok
			if (!document.getElementById("art_lng2").style.display == "none") {
				//Wir updaten die neue Position des Bildes auf dem Server
				$("#popupSave").on("click", function(event) {
					// aus irgend einem Grund kann ich das Formular nicht per ID finden, also hangeln wir uns lang
					document.getElementById("latlngFormData").childNodes[1].submit();
				});
			}
		}
		
function visual(event){
				//Visual start
			document.getElementById("latlngFormData").style.display = "block";
			document.getElementById("reset").style.display = "block";

			//hide all other forms

			//document.getElementById("name").style.display = "inline";
			//document.getElementById("nameFormData").style.display = "none";
			var position = event.latlng;
			document.getElementById("art_lng2").value = position.lng;
			document.getElementById("art_lat2").value = position.lat;
			//Visual end
}		
		
function mapClick(event) {
			visual(event);
			
			if (self.marker) {
				self.marker._icon.style.transition = "transform 0.3s ease-out";
				self.marker._shadow.style.transition = "transform 0.3s ease-out";

				self.marker.setLatLng(event.latlng);

			if (isUser) {
				//In unserem Popup hätten wir gerne noch zwei Buttons fuer Reset und Update der Position des Bildes.
				//var popup = '<button id="popupReset">Reset</button><button id="popupSave">Änderungen Uebernehmen</button>';
				var popup = '<button id="popupReset">Reset</button>';
			} else {

				var popup = '<button id="popupReset">Reset</button>';
			}

			self.marker.bindPopup(popup).openPopup();



				setTimeout(function() {
					self.marker._icon.style.transition = null;
					self.marker._shadow.style.transition = null;
				}, 300);
				return;
			}

		}


	//ab hier doppelt
	if (isUser){
		this.marker = new L.marker(L.latLng(lat, lng), {
			draggable : 'true'
		});
	}else{
		this.marker = new L.marker(L.latLng(lat, lng), {
		});
	}
	var self = this;
	if (isUser){	
		this.marker.on('dragend',markerDragged );
	}
	this.map.on('popupopen', popupOpen);
	this.map.addLayer(this.marker);

	//Setzt Marker
	//wenn der Marker bewegt wird, werden die Daten des Markers zur Zwischspeicherung in versteckte Divs geschrieben
	this.onMapClick = function(lat, lng, name) {
		if (name.length > 0) {
			//var popup = L.popup().setContent(name);
			//marker.bindPopup(popup).openPopup();
		}
	};
	if (isUser){
	this.map.on("click", mapClick );
	}
	//ende 




	this.showlatlngForm = function() {
		document.getElementById("latlngFormData").style.display = "block";
	};

	this.hideAllForms = function() {
		//document.getElementById("name").style.display = "inline";
		//document.getElementById("nameFormData").style.display = "none";

	};

	this.nameChance = function() {
		this.hideAllForms();
		document.getElementById("name").style.display = "none";
		document.getElementById("nameFormData").style.display = "inline";
	};
	this.lnglatMapChance = function() {
		this.hideAllForms();
		this.overlayChance("lnglatForm");
		document.getElementById("art_lat").value = document.getElementById("lat_hidden").innerText;
		document.getElementById("art_lnt").value = document.getElementById("lnt_hidden").innerText;
	};

};

//var artShow = new ArtShow();
