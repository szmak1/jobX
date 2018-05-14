<?php

define('I18N_THEME', 'theme');

// Import library functions
$libraries = array(
	'page_composer',
	'twig_extensions',
	'post',
	'default_page',
);

foreach($libraries as $library) {
	require __DIR__ . '/lib/' . $library . '.php';
}

/**
 * Class that defines the site. Use this to add define what this theme is capable of
 * and to add extra functions to the template engine.
 *
 * By default the site is exposed to templates as the property site, which means that any
 * public methods and properties of this class can be retrieved via that variable. See
 * https://github.com/jarednova/timber/wiki/TimberSite for default properties.
 *
 * Example: site.name, site.do_stuff()
 */
class Site extends TimberSite {
	function __construct() {
		add_theme_support('post-formats');
		add_theme_support('post-thumbnails');
		add_theme_support('menus');

		add_filter('timber_context', array($this, 'timber_context'));
		add_filter('twig_apply_filters', array($this, 'twig_filters'));
		//add_filter( 'tiny_mce_plugins', array($this, 'disable_emojis_tinymce')  );

		// Register actions
		// add_action('init', array($this, 'custom_init'))

		self::setup_styles_and_scripts();
		self::cleanup();


		//self::disable_blog();
		self::disable_comments();

		// Setup the page composer
		PageComposer::for_post_types(array('page'));
		//PageComposer::with_shared_content();
		PageComposer::with_blocks(array(
	
			'shared-content',
			'layout',
			'section',
			'StandardBlock',
			'ImageBlock',
			'ImageSlider',
			'ShowCategory',
			'LatestPost',

		));


		// Register Primary Navigation
		register_nav_menu('primary', 'Primary Navigation');

		//add option page
		function create_option_page(){
			if( function_exists('acf_add_options_page') ) {
				acf_add_options_page(array(
					'page_title' 	=> 'General Settings',
					'menu_title'	=> 'General Settings',
					'menu_slug' 	=> 'general-settings',
					'capability'	=> 'edit_posts',
					'redirect'		=> false
				));
			}
		}

		add_action( 'init', 'create_option_page' );

		parent::__construct();
	}

	/**
	  * Setup any extra global variables you want all templates of the
	  * theme to have access to.
	  */
	function timber_context($ctx) {
		$ctx['site'] = $this;

		$ctx['primary_menu'] = new TimberMenu('primary');

		// To fetch all options as an associative array
		$options = get_fields('option');


		// Get Google Analytics
		$ctx['google_analytics_id'] = get_field('google_analytics_id', 'options');


		return $ctx;
	}

	/**
	 * Setup some extra Twig filters used by the theme.
	 */
	function twig_filters($twig) {
		return $twig;
	}

	/**
	 * Perform cleanup of some WordPress features. This is used to make
	 * the site experience a bit better, customize as needed.
	 */
	private function cleanup() {
		remove_action('wp_head', 'wp_generator');
		add_filter('show_admin_bar', '__return_false');

		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'wp_shortlink_wp_head');
		remove_action('wp_head', 'feed_links_extra', 3);
		remove_action('wp_head', 'feed_links', 2);

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );	
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

		add_filter( 'xmlrpc_enabled', '__return_false' );



		if(WP_ENV != 'development') {
			// Remove Custom Post Types unless we are developing
			add_action('admin_menu', function() {
				remove_menu_page('edit.php?post_type=acf-field-group');
			});
		}
	}

	private function setup_styles_and_scripts() {
		add_action('wp_enqueue_scripts', function() {
			$js = get_template_directory_uri() . '/assets/js/scripts.min.js';
			$css = get_template_directory_uri() . '/assets/css/main.css';
			// $modernizr = get_template_directory_uri() . '/assets/js/modernizr.js';
			// wp_enqueue_script('modernizr', $modernizr);
			wp_enqueue_style('theme', $css,array(), '1.0.0');
			wp_enqueue_script('theme', $js, array(), '1.0.0', true);
		});
	}

	/**
	 * Disable commenting on posts and pages.
	 */
	private function disable_comments() {
		// TODO: This should do a bit more than just remove the comments page
		add_action('admin_menu', function() {
			remove_menu_page('edit-comments.php');
		});
	}

/**
 * Filter function used to remove the tinymce emoji plugin.
 * 
 * @param    array  $plugins  
 * @return   array             Difference betwen the two arrays
 */
	private function disable_emojis_tinymce( $plugins ) {
	if ( is_array( $plugins ) ) {
		return array_diff( $plugins, array( 'wpemoji' ) );
	} else {
		return array();
	}
}


}


/**
 * Layout Styles
 */
$layout_styles = function ($styles) {
	$styles['Columns'] = array(
		'row--cols-2' => 'Two Columns',
		'row--cols-3' => 'Three Columns',
		'row--cols-4' => 'Four Columns'
	);

	return $styles;
};

add_filter('acf/section/styles/layout', $layout_styles);


$section_styles = function ($styles) {
	$styles['Spacing'] = array(
		'section--no-padding' => 'Remove Spacing',
	);

	return $styles;
};

add_filter('acf/section/styles/section', $section_styles);


/**
 * @param \PHPMailer $phpmailer
 */
function disableTLS($phpmailer){
    // Disable the automatic TLS encryption added in PHPMailer v5.2.10 (9da56fc1328a72aa124b35b738966315c41ef5c6)
    $phpmailer->SMTPAutoTLS = false;
}
add_action( 'phpmailer_init', 'disableTLS' );


//remove wp-embed.min.js
add_action( 'init', function() {

    // Remove the REST API endpoint.
    remove_action('rest_api_init', 'wp_oembed_register_route');

    // Turn off oEmbed auto discovery.
    // Don't filter oEmbed results.
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

    // Remove oEmbed discovery links.
    remove_action('wp_head', 'wp_oembed_add_discovery_links');

    // Remove oEmbed-specific JavaScript from the front-end and back-end.
    remove_action('wp_head', 'wp_oembed_add_host_js');
}, PHP_INT_MAX - 1 );

function the_breadcrumb() {
	global $post;
	//dont show on search page & single shops
	if (is_search() || is_front_page() ) {
		return;
	}
	if($post && get_post_meta($post->ID, 'hide_breadcrumb', true) == FALSE) {
		echo '<div class="breadcrumbs"><span>' . __('You are here', 'site') . ':</span><ul>';
		if (!is_front_page()) {
			echo '<li><a href="';
			echo get_option('home');
			echo '">';
			echo __('Home', 'site');
			echo '</a></li><li class="separator">›</li>';
			if (is_category() || is_single()) {
				echo '<li>';
				if (is_single()) {
					echo get_post_type( $post );
				}
				the_category(' </li><li class="separator">›</li><li> ');
				if (is_single()) {
					echo '</li><li class="separator">›</li><li class="active">';
					the_title();
					echo '</li>';
				}
			} elseif (is_page()) {
				if($post->post_parent){
					$anc = get_post_ancestors( $post->ID );
					$title = get_the_title();
					foreach ( $anc as $ancestor ) {
						$output = '<li><a href="'.get_permalink($ancestor).'" title="'.get_the_title($ancestor).'">'.get_the_title($ancestor).'</a></li> <li class="separator">›</li>';
					}
					echo $output;
					echo '<li class="active" title="'.$title.'"> '.$title.'</li>';
				} else {
					echo '<li class="active">'.get_the_title().'</li>';
				}
			}
		}
		elseif (is_tag()) {single_tag_title();}
		elseif (is_day()) {echo"<li>Archive for "; the_time('F jS, Y'); echo'</li>';}
		elseif (is_month()) {echo"<li>Archive for "; the_time('F, Y'); echo'</li>';}
		elseif (is_year()) {echo"<li>Archive for "; the_time('Y'); echo'</li>';}
		elseif (is_author()) {echo"<li>Author Archive"; echo'</li>';}
		elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {echo "<li>Blog Archives"; echo'</li>';}
		elseif (is_search()) {echo"<li>Search Results"; echo'</li>';}
		elseif(is_front_page()){
			echo "<li> " . __('Home', 'site') . " </li>";
		}
		echo '</ul>';
		echo '</div>';
	}
}
new Site();


add_action("wp_ajax_my_user_vote", "my_user_vote");
add_action("wp_ajax_nopriv_my_user_vote", "my_user_vote");

function my_user_vote() {

$name = $_FILES['myfile']['name'];
$vecka = $name;
$project_array = [];
$projekt_name_remember = "";
$projekt_nr_remember = "";
$projekt_status_remember = "";
$NB_remember = "";
$is_last_line = false;
$csv = array();

// // check there are no errors
if($_FILES['myfile']['error'] == 0){

    $name = $_FILES['myfile']['name'];
    $ext = strtolower(end(explode('.', $_FILES['myfile']['name'])));
    $type = $_FILES['myfile']['type'];
    $tmpName = $_FILES['myfile']['tmp_name'];

    // check the file is a csv
    if($ext === 'csv'){
        if(($handle = fopen($tmpName, 'r')) !== FALSE) {
        		
            // necessary if a large csv file
            set_time_limit(0);

            $row = 0;
			$firstline = 0;
			$data2 = fgetcsv($handle, 1000, ';');
			$rows = 0;
			$medarbetare_list = ""; // en arry av alla medarbetare och vilken kolum dem tillhör
			while(($data = fgetcsv($handle, 1000, ';')) !== FALSE) {
				$rows ++;
				if ($rows == 2) {
                    $medarbetare_list = $data;
                     break;
				}
				continue;
			}
            while(($data = fgetcsv($handle, 1000, ';')) !== FALSE) {
             	
                if ( $data[0] == "Total" ) {
                	$is_last_line = true;
                }
                if ($is_last_line) {
                	break;
                }
                if ($data[0] == "NB") {
                	$projekt_nr_remember = "NB";
                	
                }
                if ($projekt_nr_remember == "NB"  ) {
                	$data[0] =  "NB";
                }

                if ($data[1] == "" && $data[2] == "" && $data[3] == "" ) {
                	continue;
                }
 				if ($data[0] !== "" && $data[1] == "") {
	              	$data[1] = $data[0];
	              }
                if (  $data[1] == ""  ){
                	$data[1] = $projekt_name_remember;

                }else{
                	$projekt_name_remember =  $data[1];
                }
                if ($data[2] == ""){
                	$data[2] = $projekt_nr_remember;

                }else{
                	$projekt_nr_remember =  $data[2];
                }

                $tim = array();
                $tim[$row] = array(); 

				$project_array[$row] =  array(
             		'project_namn' =>  $data[1],
             		'project_nr' => $data[2],
             		'project_status' => $data[3],
             		'timmar' => $tim,

             	);
                 // number of fields in the csv
				// data = row
                 $col_count = count($data);
                 $antalPersoner = ($col_count - 5) / 5;

                for ($i=5; $i < count($data); $i++) {
                	
                	if ($data[$i] !== "") {
                		if ($i < 14 ) {
                		
                			$project_array[$row]['timmar'][$row]['m'][] =  array( 
                				"person" =>  $medarbetare_list[$i] ,
								"timmar" => $data[$i]
                			 );
                		}
                		elseif($i > 14  && $i < 23){
                			$project_array[$row]['timmar'][$row]['t'][] = array(
                				"person" =>  $medarbetare_list[$i] ,
								"timmar" => $data[$i]
                			 );
                			
                		}
                		elseif($i > 22  && $i < 32){
                			$project_array[$row]['timmar'][$row]['o'][] = array(
                				"person" =>  $medarbetare_list[$i] ,
								"timmar" => $data[$i]
                			 );
                			
                		}
                		elseif($i > 31  && $i < 41){
                			$project_array[$row]['timmar'][$row]['th'][] = array(
                				"person" =>  $medarbetare_list[$i] ,
								"timmar" => $data[$i]
                			 );
                			
                		}
                		elseif($i > 40  && $i < 50){
                			$project_array[$row]['timmar'][$row]['f'][] = array(
                				"person" =>  $medarbetare_list[$i] ,
								"timmar" => $data[$i]
                			 );
                		} 
                	}
                }
                $row++;
            }
            fclose($handle);
        }
    }
}



$my_post = array(
  'post_title'    => wp_strip_all_tags( substr($vecka, 0, -4)  ),
  'post_status'   => 'publish',
  'post_author'   => 1,
);

// Insert the post into the database
$post_id = wp_insert_post( $my_post );

$value = update_field( 'vecka', $vecka, $post_id );


// save a repeater field value
$field_key = "field_5a86df487c0d4";
$projekt = update_field( $field_key, $project_array , $post_id );

//Get 2 person for Köksvecka
$options = get_fields('option');
$alla = $options['medarbetare'];
$done = $options["done"];
$done = json_decode($done,true);
$other = [];
//$current = $options["current"];
for ($i=0; $i < count($alla); $i++) {

	if (!in_array($alla[$i], $done)) {
		$other[] = $alla[$i];
	}
 }

shuffle($other);

 if (count($other) == 1 && count($other) !== 0){
 	$current = $other[0]['medarbetare_name'] . ' &  ' . $done[0]['medarbetare_name'];
 	$_done = $done[0];
 
 	unset($done);
 	$done[] = $other[0] ;
 	$done[] = $_done;

}
 elseif (count($other) !== 0) {

 	$current = $other[0]['medarbetare_name'] . ' & ' . $other[1]['medarbetare_name'];
 	$done[] = $other[0];
 	$done[] = $other[1];
 }

//save current
//$current
update_field('current', json_encode($current) , 'option');
//save Done
//$done
update_field('done', json_encode($done) , 'option');


 die;
}


// Return all todos for 
function get_all_todos($data) {
	
	//print_r($data['slug']);
	//$all_post_ids = Timber::get_post();
	$arry =  [];
	$all_post_ids = get_field( "todos", $data['id'] );

	for ($i=0; $i < count($all_post_ids) ; $i++) { 

		if ($all_post_ids[$i]['id'] == $data['slug']) {
			$all_post_ids[$i]['todos'] = $all_post_ids[$i]['todos'];
			$arry= $all_post_ids[$i];


		}
	}

	if (empty( $arry)) {
		$arry = array('id' => $data['slug'] , 'todos' => ""  );
	}

    return $arry;
}
add_action( 'rest_api_init', function () {
	register_rest_route( 'todo/v1', '/get-all-todos/(?P<id>\d+)/(?P<slug>\w+)', array(
		'methods' => 'GET',
		'callback' => 'get_all_todos',
	) );
} );


// save todos
function save_todos( WP_REST_Request $request) {

	$body = $request->get_body();
	$body = json_decode($body,true);
	$todo = $body['todo'];

	$arry =  [];
	$all_post_ids = get_field( "todos", $request['id'] );

	


		for ($i=0; $i < count($all_post_ids) ; $i++) { 
			

			 if ($all_post_ids[$i]['id'] == $request['slug']) {
			 	$all_post_ids[$i]['todos'] = $todo;
			 	$arry = array('done');
			 }
		}


	if (empty( $arry ) ) {
		$all_post_ids[]= array('id' =>  $request['slug'], 'todos' => $todo);
	}
	

	update_field('todos', $all_post_ids, $request['id']);

	return $all_post_ids;
	

	//update_sub_field( $selector, $value, $post_id );
	
}
add_action( 'rest_api_init', function () {
	register_rest_route( 'todo/v1', '/save/(?P<id>\d+)/(?P<slug>\w+)', array(
		'methods' => 'POST',
		'callback' => 'save_todos',
	) );
} );



/*
	
// custom 

add_action( 'init', 'handlare_register' );   

function handlare_register() {   

    $labels = array( 
        'name' => _x('Handlare', 'post type general name'), 
        'singular_name' => _x('Handlare Item', 'post type singular name'), 
    );   

    $args = array( 
        'labels' => $labels, 
        'public' => true, 
        'publicly_queryable' => true, 
        'show_ui' => true, 
        'query_var' => true, 
        'rewrite' => array( 'slug' => 'work', 'with_front'=> false ), 
        'capability_type' => 'post', 
        'hierarchical' => true,
        'has_archive' => true,  
        'menu_position' => null, 
        'supports' => array('title','editor','thumbnail','revisions') 
    );   

    register_post_type( 'work' , $args ); 

    register_taxonomy( 'categories', array('work'), array(
        'hierarchical' => true, 
        'label' => 'Categories', 
        'singular_label' => 'Category', 
        'rewrite' => array( 'slug' => 'categories', 'with_front'=> false )
        )
    );

    register_taxonomy_for_object_type( 'categories', 'work' );

}
*/

add_action("wp_ajax_medarbetare_name", "medarbetare_name");
add_action("wp_ajax_nopriv_medarbetare_name", "medarbetare_name");

function medarbetare_name() {


// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


$options = get_fields('option');
$medarbetare = $options['medarbetare'];

echo(json_encode($arr));
die;

}