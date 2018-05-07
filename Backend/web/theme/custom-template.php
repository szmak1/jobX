<?php
/*
 * Template Name: Custom
 * Description: Full Width Template
 */


render('empty.twig', array(
	'post' => new SitePost(),
	'ajax_url' => admin_url('admin-ajax.php'),
));





