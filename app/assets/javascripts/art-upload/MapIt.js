function MapIt() {
	var map;
	var marker;
	var lat;
	var lng;
    var self = this;

	//removes all markers form the map
	this.removeMarkers = function(){
		this.map.eachLayer(function (layer) {
    		self.map.removeLayer(layer);
		});
		
	};

	//da wir jetzt die Koordinaten haben, können wir auch ne map anzeigen
	this.showMap = function(lat, lng) {
		if (!( typeof this.map === 'undefined')) {
			this.map.remove();
		}
		this.map = L.map('mapu2').setView([lat, lng], 13);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

	};
	//initial the map with the location from the browser
	this.initalMap = function() {
	/*	jQuery.ajax({

			url : '//freegeoip.net/json/',
			type : 'POST',
			dataType : 'jsonp',
			success : function(location) {
				self.showMap(location.latitude, location.longitude);
				self.lat = location.latitude;
				self.lng = location.longitude;
				//self.onMapUploadClick(location.latitude, location.longitude);
			}
		});
		*/
		this.showMap("50.111606","8.680795");
		this.lat = "50.111606";
		this.lng = "8.680795";
	};
	
	
	this.onMapUploadClick = function(lat, lng) {
		
		this.marker = new L.marker(L.latLng(lat, lng), {
			draggable : 'true'
		});

		this.marker.on('dragend', function(event) {
			//set position in the input values
			var position = event.target.getLatLng();
			$('#art_lng').val(position.lng);
			$('#art_lat').val(position.lat);
			// self.setPopup(self.marker);
		});

		this.map.addLayer(this.marker);
		//this.setPopup();
	};
	this.getValue = function() {
		return map;
	};
	this.initalMap();
}