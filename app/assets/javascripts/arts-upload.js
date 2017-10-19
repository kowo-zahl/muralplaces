function ArtUpload() {

	this.map = null;
	this.marker = null;

	//da wir jetzt die Koordinaten haben, können wir auch ne map anzeigen
	this.showMap = function(lat, lng) {
		this.map = L.map('mapu2').setView([lat, lng], 13);

		L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution : '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);
	
	};

	//wir haben die Koordinaten, mal Google fragen wo das genau ist und in die Felder eintragen
	this.getCity = function(url) {
		$.getJSON(url, function(data, textStatus) {
			$.each(data.results[0].address_components, function(key, value) {
				if (value.types[0] == "locality") {
					$('#art_city').val(value.long_name);
				};
				if (value.types[0] == "country") {
					$('#art_country').val(value.long_name);
				};
			});
		});
	};

	//wir wollen ne Vorschau vom Bild
	this.readURL = function(input) {

		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				var img = document.getElementById('image');
				img.src = e.target.result;
			};

			reader.readAsDataURL(input.files[0]);
		}
	};

	this.setImage = function(div) {
		var el = document.getElementById('imagediv');
		clearDivEl(el);
		var img = document.createElement('img');
		img.src = "#";
		img.setAttribute('class', 'showSmall schatten well');
		img.setAttribute('id', 'image');
		img.setAttribute('alt', 'your image');
		el.appendChild(img);
		this.readURL(div);
	};

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
		 //set city,country,state
		 var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.lat + ',' + position.lng + '&sensor=false';
		 self.getCity(url);
		 $('#hideme').show();

		 self.setPopup(self.marker);
		 });

		
		this.map.addLayer(this.marker);
		this.setPopup();
	};

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

	//initial the map with the location of the browser
	this.initalMap = function() {
		var self = this;
		jQuery.ajax({
			url : '//freegeoip.net/json/',
			type : 'POST',
			dataType : 'jsonp',
			success : function(location) {
				self.showMap(location.latitude, location.longitude);
				self.onMapUploadClick(location.latitude, location.longitude);
			}
		});
	};

	//sobald ein Bild ausgewählt ist, die Koordinaten auslesen
	this.addOnChange = function() {
		var self = this;
		document.getElementById("art_name").onchange = function(e) {
			self.setPopup();
		};
		document.getElementById("art_image").onchange = function(e) {
			EXIF.getData(e.target.files[0], function() {
				var lngi = EXIF.getTag(this, "GPSLongitude");
				var lati = EXIF.getTag(this, "GPSLatitude");

				if (!( typeof lngi === 'undefined')) {
					vallngi = lngi[0] + (lngi[1] * 60 + lngi[2]) / 3600;
					$('#art_lng').val(vallngi);

					vallati = lati[0] + (lati[1] * 60 + lati[2]) / 3600;
					$('#art_lat').val(vallati);
					//Grad+(Minuten*60+Sekunden)/3600
					//console.log(this)
					//alert(EXIF.pretty(this));

					var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + vallati + ',' + vallngi + '&sensor=false';
					self.getCity(url);

					self.map.remove();
					self.showMap(vallati, vallngi);
					self.onMapUploadClick(vallati, vallngi);

					/*$('#hideme').hide();*/
					$('#notfound').text("");

				} else {
					$('#notfound').text("Keine GPS Daten im Bild gefunden. Bitte selber eintragen.");
					$('#art_lng').val("");
					$('#art_lat').val("");
					$('#art_city').val("");
					$('#art_country').val("");
					$('#hideme').show();
				}
			});
			self.setImage(this);
		};
	};
};
var artUpload = new ArtUpload();
