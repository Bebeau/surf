<?php
global $post;

add_action( 'add_meta_boxes', 'banner_meta_box', 1 );
function banner_meta_box($post) {
    add_meta_box(
        'banner', 
        'Image/Video', 
        'banner',
        'page', 
        'side', 
        'low'
    );
}
function banner($post) {
    // Use nonce for verification
    wp_nonce_field( 'banner', 'banner_noncename' );

    $banner = get_post_meta($post->ID,'banner', true);
    $info = new SplFileInfo($banner);
    $fileType = $info->getExtension();

    echo '<div data-post="'.$post->ID.'" data-type="banner">';
        if ( !empty($banner) ) {
            if($fileType === "mp4" || $fileType === "webm" || $fileType === "ogv" || $fileType === "ogg") {
                echo '<div class="bannerWrap" data-post="'.$post->ID.'" data-type="banner">';
                    echo '<video muted autoplay id="bgvid" loop>';
                        echo '<source src="'.$banner.'" type="video/webm">';
                        echo '<source src="'.$banner.'" type="video/ogv">';
                        echo '<source src="'.$banner.'" type="video/mp4">';
                    echo '</video>';
                    echo '<span class="button button-remove remove-banner">X</span>';
                echo '</div>';
            } else {
                echo '<div class="bannerWrap" data-post="'.$post->ID.'" data-type="banner">';
                    echo '<img src="'.$banner.'" alt="" /><span class="button button-remove remove-banner">X</span>';
                echo '</div>';
            }
        } else {
            echo '<div class="bannerWrap" data-post="'.$post->ID.'" data-type="banner">';
                echo '<a href="" class="upload-image upload-banner">Set image/video</a>';
            echo '</div>';
        }
    echo '</div>';
}

add_action( 'save_post', 'save_custom_meta', 10, 3 );
function save_custom_meta($post_id) {
    update_post_meta($post_id,'banner',"");
}
// ajax response to save download track
add_action('wp_ajax_setImage', 'setCustomImage');
add_action('wp_ajax_nopriv_setImage', 'setCustomImage');
function setCustomImage($post_id) {
    // get response variables
    $postID = (isset($_GET['postID'])) ? $_GET['postID'] : 0;
    $imageURL = (isset($_GET['fieldVal'])) ? $_GET['fieldVal'] : 0;
    $type = (isset($_GET['type'])) ? $_GET['type'] : 0;
    // save photos
    update_post_meta( $postID, $type, $imageURL);
}
// ajax response to save download track
add_action('wp_ajax_removeItem', 'removeItem');
add_action('wp_ajax_nopriv_removeItem', 'removeItem');
function removeItem() {
    $postID = (isset($_GET['postID'])) ? $_GET['postID'] : 0;
    $key = (isset($_GET['key'])) ? $_GET['key'] : 0;
    $type = (isset($_GET['type'])) ? $_GET['type'] : 0;

    update_post_meta($postID, $type, "");
}
?>