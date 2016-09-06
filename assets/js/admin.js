var ajaxurl = meta_image.ajaxurl;

var init = {
	onReady: function() {
		init.imageUploader();
		init.removeItem();
	},
	imageUploader: function() {
		var meta_image_frame;
     	// Runs when the image button is clicked.
	    jQuery('.upload-image').click(function(e){

	    	// Prevents the default action from occuring.
	        e.preventDefault();
	        var button = jQuery(this);
	        var id = jQuery(this).parent().attr("data-post");
	        var type = jQuery(this).parent().attr("data-type");

	        // Sets up the media library frame
	        meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
	            title: meta_image.title,
	            button: { text:  meta_image.button },
	            library: { type: 'image, video' },
	            multiple: false
	        });

	        // Runs when an image is selected.
	        meta_image_frame.on('select', function(){

	            // Grabs the attachment selection and creates a JSON representation of the model.
	            var media_attachment = meta_image_frame.state().get('selection').first().toJSON();

	            if(media_attachment.type === "video") {
            		jQuery('.bannerWrap').append('<video muted autoplay id="bgvid" loop><source src="'+media_attachment.url+'" type="video/webm"><source src="'+media_attachment.url+'" type="video/ogv"><source src="'+media_attachment.url+'" type="video/mp4"></video><span class="button button-remove remove-banner">X</span>');
            	}
            	if(media_attachment.type === "image") {
            		jQuery('.bannerWrap').append('<img src="'+media_attachment.url+'" alt="" /><span class="button button-remove remove-banner">X</span>' );
            	}
            	button.remove();
            	init.saveImage(id, type, media_attachment.url);

	        });

	        // Opens the media library frame.
	        meta_image_frame.open();
	    });
	},
	saveImage: function(id, type, url) {
        jQuery.ajax({
            url: ajaxurl,
            type: "GET",
            data: {
            	postID: id,
            	type: type,
                fieldVal: url,
                action: 'setImage'
            },
            dataType: 'html',
            success : function() {
            	init.removeItem();
            	jQuery('.banner-image').remove();
            },
            error : function(jqXHR, textStatus, errorThrown) {
                window.alert(jqXHR + " :: " + textStatus + " :: " + errorThrown);
            }
        }); 
    },
	removeItem: function(postID, key, type) {
		jQuery.ajax({
	        url: ajaxurl,
	        type: "GET",
	        data: {
	            action: 'removeItem',
	            postID: postID,
	            type: type,
	            key: key
	        },
	        dataType: 'html',
	        error : function(jqXHR, textStatus, errorThrown) {
	            window.alert(jqXHR + " :: " + textStatus + " :: " + errorThrown);
	        }
	    });
	    jQuery(".button-remove").click(function(e){
            e.preventDefault();
            var postID = jQuery(this).parent().attr("data-post");
            var type = jQuery(this).parent().attr("data-type");
            var key = jQuery(this).parent().attr("data-key");

            if(jQuery(this).hasClass("remove-banner")) {
            	jQuery(this).parent().append('<a href="#" class="upload-image upload-banner">Set image/video</a>');
            }
            jQuery(this).prev().remove();
            init.removeItem(postID, key, type);
            init.imageUploader();
        });
	}
};

jQuery(document).ready(function() {
	init.onReady();
});