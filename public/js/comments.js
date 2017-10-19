
function destroyComment(id,galleryId) {
	$.ajax({
		type : 'DELETE',
		url : host + "/api/comments/deleteComments/" + id,
		dataType : "json",
	}).done(function(comment) {
		var div=$('#comment_'+comment.comment.id).parent();
		$('#comment_'+comment.comment.id).remove();
		commentBlock(div,comment.comment,galleryId);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

function writeComment2(galleryId){
	writeComment(galleryId,"0");
}

function writeComment(galleryId,commentParentId){

	$('#comment_'+commentParentId+'_create').html('<div class="well" ><textarea id="comment_text"></textarea><div class="pointer" onclick="setComments('+galleryId+',$(\'#comment_text\').val(),'+commentParentId+');">Abschicken</div> </div>');
	$('#comment_'+commentParentId+'_create').removeAttr('onclick');
};

//Sucht unsere ganzen Comments für das Bild
function getChildComments(commentId,galleryId) {
	$.ajax({
		type : 'GET',
		url : host + "/api/comments/getChildComments/" + commentId,
		dataType : "json",
	}).done(function(comments) {
		$.each(comments, function(i, item) {
			commentBlock($('#comment_'+comments[i].comment.parent_id),comments[i].comment,galleryId);
			if(comments[i].comment.hasChild){
				$('#comment_'+comments[i].comment.id+'_row').prepend('<div class="comment_'+comments[i].comment.id+' pointer col-md-1">+</div>');
			}
    	
		$('.comment_'+comments[i].comment.id).click(function(){ // trigger
			console.log($(this).parent().parent().children());
			console.log($(this).parent().parent()[0].id.substring(8,$(this).parent().parent()[0].id.length));
			if ($(this).text() == "+"){
				getChildComments($(this).parent().parent()[0].id.substring(8,$(this).parent().parent()[0].id.length,galleryId));
			}else{
				$(this).parent().parent().children().remove(".well");
			}
			$(this).text($(this).text() == "+" ? "-" : "+");
		});
		});
    	
	});
	};




//Sucht unsere ganzen Comments für das Bild
function getRootComments(galleryId) {
	$('#comments').text("");
	$.ajax({
		type : 'GET',
		url : host + "/api/comments/getRootComments/" + galleryId,
		dataType : "json",
	}).done(function(comments) {
		//updaten der Ansicht
	//to write a comment you need to be signed_in
	if (getCookie("signed_in") == 1) {
		$('#comments').prepend('<div  id="comment_0_create" class="pointer" onclick="writeComment2(' + galleryId + ');">Neuen Kommentar schreiben</div>');
	};
		$.each(comments, function(i, item) {
			commentBlock($('#comments'),comments[i].comment,galleryId);
			if(comments[i].comment.hasChild){
				$('#comment_'+comments[i].comment.id+'_row').prepend('<div class="comment pointer col-md-1">+</div>');
			}
    	});

		$(".comment").click(function(){ // trigger
						
			if ($(this).parent().parent().children().length==3){
				getChildComments($(this).parent().parent()[0].id.substring(8,$(this).parent().parent()[0].id.length),galleryId);
			}else{
				$(this).parent().parent().children().remove(".well");
			}
			$(this).text($(this).text() == "+" ? "-" : "+");
		});

		
		}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
};

function commentBlock(div,comment,galleryId){
    		div.append('<div class="well col-md-12" id="comment_'+comment.id+'">'
    		+'<div class="row" id="comment_'+comment.id+'_row"><div class="col-md-11">'+new Date(comment.created_at)+"  "+comment.username+'</div></div>'
    													+'<div class="row" ><div class="white  col-md-11 col-md-offset-1">'+comment.body+'</div></div>'
    													+'<div class="row" id="comment_'+comment.id+'_controls"></div>'
    		
    		+'</div>');
			//to write a comment you need to be signed_in
   			if (getCookie("signed_in")==1){
   				$('#comment_'+comment.id+'_controls').append('<div class="pointer col-md-3 col-md-offset-1" id="comment_'+comment.id+'_create" onclick="writeComment('+galleryId+','+comment.id+');">Neuen Kommentar schreiben</div>');
   			};
   				
   			//you can only delete your comments						
   			if (window.currentUser && window.currentUser.id == comment.user_id) {
   				$('#comment_'+comment.id+'_controls').append('<div class="pointer col-md-3" id="comment_'+comment.id+'_destroy" onclick="destroyComment('+comment.id+','+galleryId+');">Kommentar löschen</div>');
   			};
 
   			$('#comment_'+comment.id+'_controls').append('<div class="pointer col-md-3" id="comment_'+comment.id+'_alert" ><a href="'+host+'/comment_mails/new?comment_id='+comment.id+'">Kommentar melden</a></div>');
   			
};


//schreibt ein Comment für das Bild
function setComments(galleryId,commentText,commentParentId) {
	if (commentParentId==0){
		var data = 'commentText='+commentText;
	}else{
		var data='commentText='+commentText+'&commentParentId='+commentParentId;
	}
	$.ajax({
		type : 'POST',
		url : host + "/api/comments/setComments/"+galleryId,
		dataType : "json",
		data: data,
	}).done(function(comment) {
		//updaten der Ansicht
		var div=$('#comment_'+commentParentId+'_create').parent();
		$('#comment_'+commentParentId+'_create').remove();
		commentBlock(div,comment.comment,galleryId);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});

};
