<?php

session_start();

// echo $_SESSION['USERNAME']."<br/>";
// echo $_SESSION['ADMINROLE'];

// exit();

if(!isset($_SESSION['USERNAME']))
	header("Location: ../login.php"); /* Redirect browser to login page if user not loggedin */
else if(!($_SESSION['ADMINROLE']=="4" || $_SESSION['ADMINROLE']=="5" ))
	header("Location: ../login.php"); /* Redirect browser to login page if user not loggedin */



?>