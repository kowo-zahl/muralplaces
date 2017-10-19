/**
 * CKEditor plugin for inserting simple More tag: <!--more-->
 *
 * This is modified from the WPMore plugin in the CKEditor extension for WordPress
 *
 * @link      [Demo] http://wordpress.ckeditor.com/
 * @link      [Source] http://wordpress.org/extend/plugins/ckeditor-for-wordpress/
 * @copyright Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
 * @license   For licensing, see LICENSE.html or http://ckeditor.com/license
 *
 * The docblock above is to acknowledge the original source and author.
 * The docblock below lists my information and the changelog. The @author tag
 * is just a phpDocumentor tag and does NOT imply claim of copyright or authorship of the original source.
 *
 * The most important change is the wrapping of text before and after the More tag.
 * Sample text: The quick brown fox jumps over the lazy old dog.
 * More tag inserted just before the word 'over'.
 * Original effect: <p>The quick brown fox jumps</p><!--more--><p>over the lazy old dog.</p>
 * Changed effect:  The quick brown fox jumps <!--more-->over the lazy old dog.
 *
 * Changelog:
 *   - Updated docblock
 *   - Removed docblock: "@file Plugin for inserting Drupal teaser and page breaks."
 *   - Updated comment <!--break--> to <!--more-->
 *   - Updated comment "cke_drupal_break" to "cke_wordpress_more"
 *   - Attempt to format code according to PSR-2
 *     @see https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md
 *   - Moved text for confirm message into 'msg' variable
 *   - Changed (old): range.splitBlock('p');
 *             (new): range.splitBlock('span');
 *   - Commented out: if (!hasMoved) { range.splitBlock('span') };
 *   - Updated to work with both CKEditor v3 and v4
 *
 * @see    http://en.support.wordpress.com/splitting-content/more-tag/ on More tag
 * @author Zion Ng <zion@intzone.com>
 * @link   [Source] https://github.com/zionsg/CKEditor-More-plugin
 * @since  2012-11-24T10:00+08:00
 */
CKEDITOR.plugins.add("wpmore",{requires:["fakeobjects"],getPlaceholderCss:function(){return"img.cke_wordpress_more{background-image: url("+CKEDITOR.getUrl(this.path+"images/more_bug.gif")+");background-position: right center;background-repeat: no-repeat;clear: both;display: block;float: none;width: 100%;border-top: #999999 1px dotted;height: 10px;}"},onLoad:function(){CKEDITOR.addCss&&CKEDITOR.addCss(this.getPlaceholderCss())},init:function(e){function t(t){CKEDITOR.dom.comment.prototype.getAttribute||(CKEDITOR.dom.comment.prototype.getAttribute=function(){return""},CKEDITOR.dom.comment.prototype.attributes={align:""});for(var a,n=e.createFakeElement(new CKEDITOR.dom.comment(t),"cke_wordpress_"+t,"hr"),i=e.getSelection().getRanges()[0],o=new CKEDITOR.dom.elementPath(i.getCommonAncestor(!0)),r=o.block&&o.block.getParent()||o.blockLimit;r&&"body"!=r.getName();)i.moveToPosition(r,CKEDITOR.POSITION_AFTER_END),a=1,r=r.getParent();i.insertNode(n);for(var l=n;(l=l.getNext())&&!i.moveToElementEditStart(l););i.select()}e.addCss&&e.addCss(this.getPlaceholderCss()),e.ui.addButton("WPMore",{label:"Insert More Break",icon:this.path+"images/more.gif",command:"wpmore"}),e.addCommand("wpmore",{exec:function(){for(var a=e.document.getElementsByTag("img"),n=0,i=a.count();i>n;n++){var o=a.getItem(n);if(o.hasClass("cke_wordpress_more")){var r="The document already contains a more. Do you want to proceed by removing it first?";if(confirm(r)){o.remove();break}return}}t("more")}})},afterInit:function(e){e.dataProcessor.dataFilter.addRules({comment:function(t){return CKEDITOR.htmlParser.comment.prototype.getAttribute||(CKEDITOR.htmlParser.comment.prototype.getAttribute=function(){return""},CKEDITOR.htmlParser.comment.prototype.attributes={align:""}),"more"==t?e.createFakeParserElement(new CKEDITOR.htmlParser.comment(t),"cke_wordpress_"+t,"hr"):t}})}});