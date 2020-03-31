<?php

	if ( !isset($_GET["path"]) ) {
		die('Parametro necessario: path');
	}
	$path  = $_GET["path"];


	$out = array();
	foreach (glob($path.'*.mdb') as $filename) {
    	$p = pathinfo($filename);
    	$out[] = $p['basename'];
	}
	echo json_encode($out); 

?>;