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

</head>

<body>
	

<?php
	include "inc/header.php";
?>

<div class="account-container">
	
	<div class="content clearfix">
		
	
		
			<!-- <h1>Member Login</h1>		
			 -->

				
				<p class="info"><strong>Forgot Password? </strong></p>
				<hr/>
				<div class="control-group">
					<!-- <h5>Option 1</h5> -->
					<div id="forgotPassword">
					<form class="form-horizontal" id="addUserForm1" onsubmit="return prEmail()">
												
						<div class="controls">
							<div class="input-append">
							<input type="hidden" value="fPassword" name="action"/>
							  <input class="span2 m-wrap" id="txtEmail" name="txtEmail" type="text" placeholder="Enter Your Email ID">
							  <button class="btn" type="submit" >Go!</button>
							</div>
						</div>
					</form>
					</div>
					<div id="divComponent">
						Password has been reset and sent to your email ID
						<div style="width:100%;text-align:center;marg"><a href="login.php" class="btn" style="margin:0 auto;">OK</a></div>
					</div>
				<hr/>
					<div class="alert"></div>
				</div>

<!-- 				<div class="control-group">
				<h5>Option 2</h5>
				<form id="edit-profile" class="form-horizontal">
					<div class="controls">
						<div class="input-append">
						  <input class="span2 m-wrap" id="txtEmail" name="txtEmail" type="text" placeholder="Enter Your Mobile Number">
						  <button class="btn" type="button">Go!</button>
						</div>
					</div>
				</form>
				</div>
				 -->
			</div> <!-- /login-fields -->
			
			
		
	</div> <!-- /content -->
	
</div> <!-- /account-container -->



<script src="js/jquery-1.7.2.min.js"></script>
<script src="js/bootstrap.js"></script>

<script src="js/inc.js"></script>
<script src="js/signin.js"></script>



<div id="loading">
  <div class="txt"></div>
  <div class="bg"></div>
</div>


</body>

</html>
