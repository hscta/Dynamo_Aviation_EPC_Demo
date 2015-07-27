<?php
include "checksession.php";

  global $errorPage;
  global $addstaff;
  global $adddealers;
  global $addasc;
  global $noticeboard;
  global $product;
  global $productType;

   $pageName = $_GET['page'];

  //Page names
  $errorPage = $addstaff = $adddealers = $addasc = $noticeboard = $product = $productType = $productCategory = "";

  $activeClass = 'class="active"';

  switch ($pageName) {
    case "addstaff":
        $addstaff = $activeClass;
        break;
    case "adddealers":
         $adddealers = $activeClass;
        break;
    case "addasc":
        $addasc = $activeClass;
        break;
    case "noticeboard":
        $noticeboard = $activeClass;
        break;
    case "product":
        $product = $activeClass;
        break;
    case "productType":
        $productType = $activeClass;
        break;
    case "productCategory":
        $productCategory = $activeClass;
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
      
        <li <?=$addstaff?>><a href="index.php?page=addstaff"><i class="icon-user"></i><span>Add Staff</span> </a> </li>
        <li <?=$adddealers?>><a href="index.php?page=adddealers"><i class="icon-user"></i><span>Add Dealer</span> </a> </li>
        <li <?=$addasc?>><a href="index.php?page=addasc"><i class="icon-user"></i><span>Add ASCs</span> </a> </li>
        <li <?=$noticeboard?>><a href="index.php?page=noticeboard"><i class="icon-user"></i><span>Add to Notice Board</span> </a> </li>
        <li <?=$productCategory?>><a href="index.php?page=productCategory"><i class="icon-user"></i><span>Product Category</span> </a> </li>
        <li <?=$productType?>><a href="index.php?page=productType"><i class="icon-user"></i><span>Product Type</span> </a> </li>
        <li <?=$product?>><a href="index.php?page=product"><i class="icon-user"></i><span>Product</span> </a> </li>
        
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