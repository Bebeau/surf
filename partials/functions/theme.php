<?php

// create custom plugin settings menu
add_action('admin_menu', 'add_project_ordering');
function add_project_ordering() {
    add_submenu_page(
        'themes.php',
        'Setup',
        'MailChimp',
        'manage_options',
        'theme-setup',
        'theme_setup_page' 
    );
    //call register settings function
	add_action( 'admin_init', 'register_setup_options' );
}
function register_setup_options() {
	//register our settings
	register_setting( 'theme_setup_options', 'custom_logo' );
	register_setting( 'theme_setup_options', 'custom_bg' );

	register_setting( 'theme_setup_options', 'fb_url' );
	register_setting( 'theme_setup_options', 'ig_url' );
	register_setting( 'theme_setup_options', 'twit_url' );
	register_setting( 'theme_setup_options', 'sc_url' );
	register_setting( 'theme_setup_options', 'yt_url' );
}
function theme_setup_page() {

	save_custom_theme_options();

	settings_fields( 'theme_setup_options' );
    do_settings_sections( 'theme_setup_options' );

    $api = get_option('mailchimp_api');
	$list = get_option('mailchimp_list');

	echo '<div class="wrap">';

		echo '<form method="post" action="themes.php?page=theme-setup">';

			echo "<h1>Theme Options</h1>";

			echo '<section id="MailChimp">';
			echo '<h2>Mailchimp Integration</h2>';
			echo '<p>Add your MailChimp API and list ID below to connect the newsletter form to your MailChimp list.</p>';
				echo '<label for="mailchimp_api">MailChimp API</label>';
				echo '<input type="text" name="mailchimp_api" id="mailchimp_api" value="'.$api.'" />';
				echo '<label for="mailchimp_list">MailChimp List ID</label>';
				echo '<input type="text" name="mailchimp_list" id="mailchimp_list" value="'.$list.'" />';
			echo '</section>';

			echo '<input type="submit" value="Save settings" class="button button-large button-primary button-submit"/>';
			echo '<input type="hidden" name="update_settings" value="Y" />';
			wp_nonce_field( 'theme_setup_options_save', 'theme_setup_options_save_nonce' );

		echo '</form>';

	echo '</div>';
}
function custom_user_can_save( $action, $nonce ) {
	$is_nonce_set   = isset( $_POST[ $nonce ] );
	$is_valid_nonce = false;
	if ( $is_nonce_set ) {
		$is_valid_nonce = wp_verify_nonce( $_POST[ $nonce ], $action );
	}
	return ( $is_nonce_set && $is_valid_nonce );
}
function save_custom_theme_options() {

	$action = 'theme_setup_options_save';
	$nonce 	= 'theme_setup_options_save_nonce';

	if ( !custom_user_can_save( $action, $nonce ) ) {
		return;
	}
	if (isset($_POST["update_settings"])) {

		if ( isset( $_POST['custom_bg_video'] ) ) {
			update_option('custom_bg_video', $_POST['custom_bg_video']);
		}

		if ( isset( $_POST['mailchimp_api'] ) ) {
			update_option('mailchimp_api', $_POST['mailchimp_api']);
		}
		if ( isset( $_POST['mailchimp_list'] ) ) {
			update_option('mailchimp_list', $_POST['mailchimp_list']);
		}

		echo '<div id="message" class="updated">Settings saved</div>';

	}
}
?>