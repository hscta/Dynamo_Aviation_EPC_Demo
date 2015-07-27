<?php
include "checksession.php";

  global $errorPage;
  global $noticeboard;
  global $spareParts;
  global $groupDetails;    global $trainingLessons;
  global $techDetails;
  global $supportDesk;
  global $help;


   


  $pageName = $_GET['page'];

  //Page names
  $errorPage = $noticeboard = $spareParts = $trainingLessons = $techDetails =  $viewECO = "";

  $activeClass = 'class="active"';

  switch ($pageName) {
    case "noticeboard":
        $noticeboard = $activeClass;
        break;
    case "spareParts":
         $spareParts = $activeClass;
        break;
    case "viewECO":
        $viewECO = $activeClass;
        break;
    case "techDetails":
        $techDetails = $activeClass;
        break;

    case "trainingLessons":
        $trainingLessons = $activeClass;
        break;
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Bajaj Admin</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<link href="../css/bootstrap.min.css" rel="stylesheet">
<link href="../css/bootstrap-responsive.min.css" rel="stylesheet">
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600"
        rel="stylesheet">
<link href="../css/font-awesome.css" rel="stylesheet">
<link href="../css/style.css" rel="stylesheet">
<link href="../css/sidebar.css" rel="stylesheet">
<link href="../css/pages/dashboard.css" rel="stylesheet">
<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->


<script src="../js/jquery-1.7.2.min.js"></script> 
<script src="../js/excanvas.min.js"></script> 
<script src="../js/chart.min.js" type="text/javascript"></script> 
<script src="../js/bootstrap.js"></script>
<script language="javascript" type="text/javascript" src="../js/full-calendar/fullcalendar.min.js"></script>
 
<script src="../js/base.js"></script> 
<script src="../js/inc.js"></script> 

</head>
<body>
<?
  include "pages/admin_header.php";
?>

<div class="subnavbar">
  <div class="subnavbar-inner">
    <div class="container">
      <ul class="mainnav">
      
        <li <?=$noticeboard?>><a href="index.php?page=noticeboard"><i class="icon-user"></i><span>Notice Board</span> </a> </li>
        <li <?=$spareParts?>><a href="index.php?page=spareParts"><i class="icon-user"></i><span>Spare Parts</span> </a> </li>		        <li <?=$trainingLessons?>><a href="index.php?page=trainingLessons"><i class="icon-user"></i><span>Training Lessons</span> </a> </li>
        <li <?=$techDetails?>><a href="index.php?page=techDetails"><i class="icon-user"></i><span>Technical Files</span> </a> </li>
        <li <?=$supportDesk?>><a href="http://gladminds.co/support/" target="_blank"><i class="icon-user"></i><span>Glad Desk</span> </a> </li>
        
      </ul>
    </div>
    <!-- /container --> 
  </div>
</div>
<!-- /subnavbar -->




<!-- /subnavbar -->
<div class="main">
  <div class="main-inner">
    <div class="container">
      <div class="row">
        <div class="span12" id="slide1">