(function(){var t;t=function(){function t(t,i,n,o){this.buttonId=t,this.formId=i,this.postUrl=n,this.modalId=o,this.button=$("#"+this.buttonId),this.form=$("#"+this.formId),this.modal=$("#"+this.modalId),this.iframe=this.modal.find("iframe")}return t.prototype.init=function(){var t,i;return i=this.postUrl,t=this.previewPost,this.button.on("click",function(t){return function(n){return t.updateCKeditor(),n.preventDefault(),$.ajax({type:"POST",url:i,data:t.form.serialize(),success:function(i){return t.previewPost(i)}})}}(this))},t.prototype.previewPost=function(t){return this.iframe.contents().find("html").html(t),document.location.hash=this.modalId},t.prototype.updateCKeditor=function(){var t,i,n,o;if("undefined"!=typeof CKEDITOR&&null!==CKEDITOR){n=CKEDITOR.instances,o=[];for(i in n)t=n[i],o.push(t.updateElement());return o}},t}(),window.PostPreview=t}).call(this);