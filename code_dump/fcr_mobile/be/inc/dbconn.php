<?php
	$hostname = "localhost";
	$username = "root";
	$password = "";
	$databaseName = "bajaj_fcr";
	
    
    $hostname = "bajajfcr.db.11965675.hostedresource.com";
    $username = "bajajfcr";
    $password = "Bajaj@1234";
    $databaseName = "bajajfcr";

	//Connecting to database
	$link = mysql_connect($hostname, $username, $password); 
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db($databaseName); 
	
?>
