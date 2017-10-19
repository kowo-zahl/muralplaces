


//sobald ein Bild ausgewählt ist die Koordinaten auslesen
document.getElementById("art_image").onchange = function(e) {

	EXIF.getData(e.target.files[0], function() {
		lngi = EXIF.getTag(this, "GPSLongitude");
		lati = EXIF.getTag(this, "GPSLatitude");

		if (!( typeof lngi === 'undefined')) {
			vallngi = lngi[0] + (lngi[1] * 60 + lngi[2]) / 3600;
			$('#art_lng').val(vallngi);

			vallati = lati[0] + (lati[1] * 60 + lati[2]) / 3600;
			$('#art_lat').val(vallati);
			//Grad+(Minuten*60+Sekunden)/3600
			//console.log(this)
			//alert(EXIF.pretty(this));

			var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + vallati + ',' + vallngi + '&sensor=false';
			getCity(url);
			
			map.remove();

			showMap(vallati, vallngi);
			L.marker([vallati, vallngi]).addTo(map).openPopup();
			onMapClick(vallati, vallngi);
			$('#hideme').hide();
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
};

//da wir jetzt die Koordinaten haben, können wir auch ne map anzeigen
function showMap(lat, lng) {
	map = L.map('mapu').setView([lat, lng], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
};

//wir haben die Koordinaten, mal Google fragen wo das genau ist und in die Felder eintragen
function getCity(url) {
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
function readURL(input) {

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#image').attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}


$("#art_image").change(function() {
	var el = document.getElementById('imagediv');
	var img = document.createElement('img');
	img.src = "#";
	img.setAttribute('class', 'showSmall schatten well');
	img.setAttribute('id', 'image');
	img.setAttribute('alt', 'your image');
	el.appendChild(img);
	readURL(this);
});

function onMapClick(lat, lng) {
	marker = new L.marker(L.latLng(lat, lng), {
		draggable : 'true'
	});
	console.log(marker);
	marker.on('dragend', function(event) {
		var marker = event.target;
		var position = marker.getLatLng();
		$('#art_lng').val(position.lng);
		$('#art_lat').val(position.lat);
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.lat + ',' + position.lng + '&sensor=false';
		getCity(url);
		$('#hideme').show();
		//marker.setLatLng([lat,lng],{id:uni,draggable:'true'}).bindPopup(position).update();
	});
	map.addLayer(marker);
};

function initalMap() {
	jQuery.ajax({
		url : '//freegeoip.net/json/',
		type : 'POST',
		dataType : 'jsonp',
		success : function(location) {
			console.log(location);
			showMap(location.latitude, location.longitude);
			onMapClick(location.latitude, location.longitude);
		}
	});
};

$(document).ready(function() {
	$('#hideme').hide();
	initalMap();

}); 