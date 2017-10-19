function PictureUpload() {

	this.start = function() {
		// call initialization file
		if (window.File && window.FileList && window.FileReader) {
			this.init();
		}
	};

	// getElementById
	this.$id = function(id) {
		return document.getElementById(id);
	};

	//
	// initialize
	this.init = function() {

		var fileselect = this.$id("art_image");
		var filedrag = this.$id("filedrag");
		var submitbutton = this.$id("commit");
		
		filedrag.data = this;
		// file select
		fileselect.addEventListener("change", this.FileSelectHandler, false);
		fileselect.data = this;
		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", this.FileDragHover, false);
			filedrag.addEventListener("dragleave", this.FileDragHover, false);
			filedrag.addEventListener("drop", this.FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			//	submitbutton.style.display = "none";
		}

	};

	// file drag hover
	this.FileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	};


	this.showHandler = function() {
		this.art.setFocus();
	};


	
	// file selection
	this.FileSelectHandler = function(e) {
		var el = this.data.$id("messages");
		clearDivEl(el);

		// cancel event and hover styling
		this.data.FileDragHover(e);

		// fetch FileList object
		files = e.target.files || e.dataTransfer.files;

		//start modal
		var el = document.getElementById("hold");
		el.filesCount = files.length;
		//el.style.visibility = "visible";
		var el = document.getElementById("blindOverlay");
		//el.style.visibility = "visible";




		// process all File objects
		for (var i = 0,
		    f; f = files[i]; i++) {
			var pId = this.data.ParseFile(f);

		}
		//we set art_image new, so drop images will be considered
		document.getElementById("art_image").files = e.target.files || e.dataTransfer.files;
		$('#hideme').hide();



		
	};

	this.ParseFile = function(file) {
		var id = "id_" + file.name;
		var m = this.$id("messages");

		var div = document.createElement("div");
		div.setAttribute("class", "pointer");
		div.setAttribute("id", id);
		var t = document.createTextNode('File information: ' + file.name);
		div.appendChild(t);
		m.appendChild(div);
		div.art = new ArtUpload();
		div.art.file = file;
		div.art.map = mapIt;
		div.art.setAllData();
		
		div.addEventListener('click', this.showHandler, false);

		return id;
	};
	
	this.start();
};