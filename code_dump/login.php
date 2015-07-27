<!DOCTYPE html>
<html lang="en">
  
<head>
    <meta charset="utf-8">
    <title>Login - Bajaj Administrator</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes"> 

	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />

	<link href="css/font-awesome.css" rel="stylesheet">
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600" rel="stylesheet">

	<link href="css/style.css" rel="stylesheet" type="text/css">
	<link href="css/pages/signin.css" rel="stylesheet" type="text/css">
	<link href="css/pages/jcarousel.basic.css" rel="stylesheet" type="text/css">

</head>

<body class="darkBG">

<?php
	include "inc/header.php";
?>

<div id="whiteBg">
	<div class="jcarousel-wrapper">
		<div class="jcarousel">
		    <ul>
		        <li><img src="img/slider/dis-125new-big-banner.jpg" width="924" height="250" alt=""></li>
		        <li><img src="img/slider/discover-100m.jpg" width="924" height="250" alt=""></li>
		        <li><img src="img/slider/discover-150-big-banner.jpg" width="924" height="250" alt=""></li>
		        <li><img src="img/slider/ktmbanner_bajajauto.jpg" width="924" height="250" alt=""></li>
		        <li><img src="img/slider/pulsar200ns.jpg" width="924" height="250" alt=""></li>
		        <li><img src="img/slider/pulsar-thrill-banner.jpg" width="924" height="250" alt=""></li>
		    </ul>
		</div>

		
		<a href="#" class="jcarousel-control-prev">&lsaquo;</a>
		<a href="#" class="jcarousel-control-next">&rsaquo;</a>

		<p class="jcarousel-pagination">
		    
		</p>
	</div>


	<div class="account-container">
		
		<div class="content clearfix">
			
			<form action="#" method="post" id="loginForm" onsubmit="return validator()">
				<input type="hidden" value="loginCheck" name="action"/>
				<!-- <h1>Member Login</h1>		
				 -->
				<div class="login-fields">
					<p class="alert"></p>
					
					<div class="field">
						<label for="username">Username</label>
						<input type="text" id="username" name="username" value="" placeholder="Username" class="login username-field" />
					</div> <!-- /field -->
					
					<div class="field">
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" value="" placeholder="Password" class="login password-field"/>
					</div> <!-- /password -->

					<div class="field">
						<label for="password">User:</label>
						<select name="userType" id="userType">
							<option value="1">Super Admin</option>
							<option value="2">Admin</option>
							<option value="3">Staff</option>
							<option value="4">Dealer</option>
							<option value="5">ASC User</option>
						</select>

					</div> <!-- /password -->
					
				</div> <!-- /login-fields -->
				
				<div class="login-actions">
					
					<span class="login-checkbox">
						<input id="Field" name="Field" type="checkbox" class="field login-checkbox" value="First Choice" tabindex="4" />
						<label class="choice" for="Field">Keep me signed in</label>
					</span>
										
					<button class="button btn btn-success btn-large">Sign In</button>
					
				</div> <!-- .actions -->
				
				<div class="login-actions1">
					
					<a href="forgotpassword.php">Forgot Password?</a>
					
				</div> <!-- .actions -->
				
				
				
			</form>
			
		</div> <!-- /content -->
		
	</div> <!-- /account-container -->
</div>

<script src="js/jquery-1.7.2.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/jquery.jcarousel.min.js"></script>

<script src="js/inc.js"></script>

<script src="js/signin.js"></script>



<div id="loading">
  <div class="txt"></div>
  <div class="bg"></div>
</div>


</body>

</html>
