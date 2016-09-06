<?php

// Hide admin bar
add_filter('show_admin_bar', '__return_false');

// Load all styles and scripts for the site
if (!function_exists( 'load_custom_scripts' ) ) {
	function load_custom_scripts() {
		// Styles
		wp_enqueue_style( 'Bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', false, '', 'all' );
		wp_enqueue_style( 'Style CSS', get_bloginfo( 'template_url' ) . '/style.css', false, '', 'all' );

		// Load default Wordpress jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"), false, '', false);
		wp_enqueue_script('jquery');

        wp_enqueue_script( 'modernizer', get_bloginfo( 'template_url' ) . '/assets/js/scroll/modernizr.custom.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'easing', get_bloginfo( 'template_url' ) . '/assets/js/scroll/jquery.easing.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'waypoints', get_bloginfo( 'template_url' ) . '/assets/js/scroll/waypoints.min.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'resize', get_bloginfo( 'template_url' ) . '/assets/js/scroll/jquery.debouncedresize.js', array( 'jquery' ), null, true );
        wp_enqueue_script( 'layout', get_bloginfo( 'template_url' ) . '/assets/js/scroll/cbpFixedScrollLayout.min.js', array( 'jquery' ), null, true );
		
		// Load custom scripts
		wp_enqueue_script('fontawesome', 'https://use.fontawesome.com/861f7334ea.js', array('jquery'), null, true);
		wp_register_script( 'custom', get_bloginfo( 'template_url' ) . '/assets/js/custom.js', array( 'jquery' ), null, true );
        wp_localize_script( 'custom', 'meta',
            array(
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'nonce' => wp_create_nonce( "contact" )
            )
        );
        wp_enqueue_script( 'custom' );
        wp_enqueue_media();
	}
}
add_action( 'wp_print_styles', 'load_custom_scripts' );

// Add admin styles for portfolios
add_action( 'admin_enqueue_scripts', 'load_portfolios_admin' );
function load_portfolios_admin() {
    wp_enqueue_style( 'user-styles', get_template_directory_uri() . '/assets/sass/css/user.css', false, '1.0.0' );
    // Registers and enqueues the required javascript.
    wp_register_script( 'admin-js', get_template_directory_uri() . '/assets/js/admin.js', array( 'jquery' ) );
    wp_localize_script( 'admin-js', 'meta_image',
        array(
            'title' => 'Choose or Upload Image',
            'button' => 'Select Image',
            'ajaxurl' => admin_url( 'admin-ajax.php' )
        )
    );
    wp_enqueue_script( 'admin-js' );
    wp_enqueue_media();
}

// Thumbnail Support
add_theme_support( 'post-thumbnails', array('post') );

// Load widget areas
if ( function_exists('register_sidebar') ) {
	register_sidebar(array(
		'id'	=> 'sidebar',
		'name' 	=> 'sidebar',
		'before_widget' => '<div class="widgetWrap">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgetTitle">',
		'after_title' => '</h3>',
	));
}

// Register Navigation Menu Areas
add_action( 'INiT', 'register_my_menus' );
function register_my_menu() {
  register_nav_menu( 'primary', 'Primary Menu' );
}

// remove WordPress admin menu items
function remove_menus(){
    // remove_menu_page( 'edit.php' );
    // remove_menu_page( 'edit.php?post_type=page' );
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'tools.php' );
    // remove_menu_page( 'themes.php' );
    remove_menu_page( 'plugins.php' );
    remove_menu_page( 'users.php' );
    remove_menu_page( 'upload.php' );
}
add_action( 'admin_menu', 'remove_menus' );

function get_contactForm() { ?>
	<form role="form" method="POST" action="" id="contactfrm">
        <div class="half">
            <input type="text" name="firstname" id="firstname" class="form-control" placeholder="first name"/>
            <input type="text" name="lastname" id="lastname" class="form-control" placeholder="last name"/>
        </div>
        <div class="half">
            <input type="text" name="emailaddress" id="emailaddress" class="form-control" placeholder="email"/>
            <div id="dropdown">
                <button>Interest <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu">
                    <li data-value="General">General</li>
                    <li data-value="Artist">Artist</li>
                    <li data-value="Venue">Venue</li>
                    <li data-value="Booking Agency">Booking Agency</li>
                    <li data-value="Promotional Company">Promotional Company</li>
                    <li data-value="Investor">Investor</li>
                    <li data-value="Other">Other</li>
                </ul>
            </div>
            <input type="hidden" name="interest" id="interest" class="form-control"/>
        </div>
        <textarea type="text" name="message" id="message" class="form-control" placeholder="comment"></textarea>
        <button type="submit" class="btn btn-submit">Submit</button>
        <input type="hidden" name="password" id="password" val="" />
    </form>
<?php }

add_action('wp_ajax_sendContact', 'emailSubmit');
add_action('wp_ajax_nopriv_sendContact', 'emailSubmit');
function emailSubmit() {
    global $post;
    if( empty($_POST['password']) ) {

        $success = false;

        $firstname = isset( $_POST['firstname'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['firstname'] ) : "";
        $lastname = isset( $_POST['lastname'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['lastname'] ) : "";
        $emailaddress = filter_var($_POST['emailaddress'], FILTER_SANITIZE_EMAIL);
        $interest = isset( $_POST['interest'] ) ? $_POST['interest'] : "";
        $message = isset( $_POST['message'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['message'] ) : "";

        $email = 'Surf App <'.esc_attr(get_option('admin_email').'>');
        $to = $firstname.' '.$lastname.' <'.$emailaddress.'>';

        if ( $firstname && $lastname && $emailaddress && $message ) {

            $subject = "Wyzerr Contact Lead";

            $headers = 'From:' . $email . "\r\n";
            $headers .= 'Reply-To:' . $to . "\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html\r\n";
            $headers .= "charset: ISO-8859-1\r\n";
            $headers .= "X-Mailer: PHP/".phpversion()."\r\n";

            $formcontent = '<html><body><center>';
                $formcontent .= '<table rules="all" style="border: 1px solid #cccccc; width: 600px;" cellpadding="10">';
                $formcontent .= "<tr><td><strong>Name:</strong></td><td>" . $firstname .' '. $lastname . "</td></tr>";
                $formcontent .= "<tr><td><strong>Email:</strong></td><td>" . $emailaddress . "</td></tr>";
                $formcontent .= "<tr><td><strong>Interest:</strong></td><td>".$interest."</td></tr>";
                $formcontent .= "<tr><td><strong>Message:</strong></td><td>" . $message . "</td></tr>";
            $formcontent .= '</table></center></body></html>';

            $success = mail( $email, $subject, $formcontent, $headers );

            $key = esc_attr(get_option('mailchimp_api'));
            $list = esc_attr(get_option('mailchimp_list'));

            if($success && !empty($key) && !empty($list)) {

                $auth = base64_encode( 'user:'.$key );

                $data = array(
                    'apikey'        => $key,
                    'email_address' => $emailaddress,
                    'status'        => 'subscribed',
                    'merge_fields'  => array(
                        'FNAME'     => $firstname,
                        'LNAME'     => $lastname,
                        'INTEREST'  => $interest
                    )
                );

                $json_data = json_encode($data);

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, 'https://us8.api.mailchimp.com/3.0/lists/'.$list.'/members/');
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
                                                            'Authorization: Basic '.$auth));
                curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);                                                                                                                  

                $result = curl_exec($ch);
            }
        }

        // Return an appropriate response to the browser
        if ( defined( 'DOING_AJAX' ) ) {
            
            echo $success ? "Success" : "E";

        }
    }
    die();

}

// Create social bookmark input fields in general settings
add_action('admin_init', 'my_general_section');  
function my_general_section() {  
    add_settings_section(  
        'my_settings_section', // Section ID 
        'Social Media', // Section Title
        'my_section_options_callback', // Callback
        'general' // What Page?  This makes the section show up on the General Settings Page
    );
    add_settings_field( // Option 1
        'facebook', // Option ID
        'Facebook URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'facebook' // Should match Option ID
        )  
    );
    add_settings_field( // Option 2
        'twitter', // Option ID
        'Twitter URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'twitter' // Should match Option ID
        )  
    );
    add_settings_field( // Option 2
        'instagram', // Option ID
        'Instagram URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'instagram' // Should match Option ID
        )  
    );
    add_settings_field( // Option 2
        'pinterest', // Option ID
        'Pinterest URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'pinterest' // Should match Option ID
        )  
    );
    add_settings_field( // Option 2
        'googleplus', // Option ID
        'GooglePlus URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'googleplus' // Should match Option ID
        )  
    );
    add_settings_field( // Option 2
        'youtube', // Option ID
        'Youtube URL', // Label
        'my_textbox_callback', // !important - This is where the args go!
        'general', // Page it will be displayed
        'my_settings_section', // Name of our section (General Settings)
        array( // The $args
            'youtube' // Should match Option ID
        )  
    );
    register_setting('general','facebook', 'esc_attr');
    register_setting('general','twitter', 'esc_attr');
    register_setting('general','instagram', 'esc_attr');
    register_setting('general','pinterest', 'esc_attr');
    register_setting('general','googleplus', 'esc_attr');
    register_setting('general','youtube', 'esc_attr');
}

function my_section_options_callback() { // Section Callback
    echo '<p>Enter your social media links to have them automatically display on the website.</p>';  
}

function my_textbox_callback($args) {  // Textbox Callback
    $option = get_option($args[0]);
    echo '<input type="text" class="regular-text" id="'. $args[0] .'" name="'. $args[0] .'" value="' . $option . '" />';
}

include(TEMPLATEPATH.'/partials/functions/theme.php');
include(TEMPLATEPATH.'/partials/functions/banner.php');