<?php

session_start();

if(!isset($_SESSION['USERNAME']))
	header("Location: ../login.php"); /* Redirect browser to login page if user not loggedin */
else if($_SESSION['ADMINROLE']!=1)
	header("Location: ../login.php"); /* Redirect browser to login page if user not loggedin */



?>