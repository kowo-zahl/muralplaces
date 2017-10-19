var host = "http://" + window.location.host;
//Sucht unsere ganzen Comments für das Bild
function getComments2(comments) {
		$.each(comments, function(i, item) {
			
			$('#comments').append('<div class="well row" id="comment_'+comments[i].id+'">'
														+'<div class="col-md-8">'												
    													+new Date(comments[i].created_at)+'<br />'
    													+comments[i].body+
    													'<div class="pointer" id="comment_'+comments[i].id+'_destroy" onclick="destroyiComment('+comments[i].id+');">Kommentar löschen</div>'+
    													'</div>');
    		thumb2(comments[i].commentable_id,comments[i].id);		
    	});

		
		
		
};

function thumb2(id,cid) {
	$.ajax({
		url : host + "/api/thumb/" + id,
		dataType : "json",
	}).then(function(pic) {

		$('#comment_'+cid).prepend('<div class="col-md-3"><img src="' + host + pic.art.getThumbUrl + '" class="picSmall schatten "/></div>');
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});

};

function destroyiComment(id) {
	$.ajax({
		type : 'DELETE',
		url : host + "/comments/" + id,
		dataType : "json",
	}).then(function(comments) {
		location.reload();
		}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};
//benötigt devise wenn wir angemeldet sind
    jQuery.ajaxSetup({
        'beforeSend': function(xhr) {
            var token = $("meta[name='csrf-token']").attr("content");
            xhr.setRequestHeader("X-CSRF-Token", token);
        }
    });
$(document).ready(function() {
	getComments2(comments);
});