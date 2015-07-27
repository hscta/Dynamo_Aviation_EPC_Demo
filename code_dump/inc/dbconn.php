<?php
/* 	$hostname = "bajajPrj.db.11965675.hostedresource.com";
	$username = "bajajPrj";
	$password = "Bajaj@123";
	$databaseName = "bajajPrj";
	 */

	$hostname = "localhost";
	$username = "root";
	$password = "";
	$databaseName = "bajajprj";
	

	//Connecting to database
	$link = mysql_connect($hostname, $username, $password); 
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db($databaseName); 
	
?>
