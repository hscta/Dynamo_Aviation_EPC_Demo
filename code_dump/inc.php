<?php
session_start();
//mail Settings
$arr="";

include "inc/dbconn.php";
include "inc/function.php";


if (isset($_POST['action']) && ! empty($_POST['action'])) {
    $action = $_POST['action'];
} elseif (isset($_GET['action']) && ! empty($_GET['action'])) {
    $action = $_GET['action'];
}


switch ($action){
    case 'slide2':
		slide2();
		break;
	case 'search':
		search();
		break;
	case 'searchTechDetails':
		searchTechDetails();
		break;
	case 'fPassword':
		fPassword();
		break;
	case 'loginCheck':
		loginCheck();
		break;
	case 'listAllUsers':
		listAllUsers();
		break;
	case 'showadminUsers':
		showadminUsers();
		break;
	case 'showproductTypes':
		showproductTypes();
		break;
	case 'showDealers':
		showDealers();
		break;
	case 'showProductCategory':
		showProductCategory();
		break;
	case 'showASC':
		showASC();
		break;
	case 'showGroups':
		showGroups();
		break;
	case 'showSpareParts':
		showSpareParts();
		break;
	case 'addUserfromAdmin':
		addUserfromAdmin();
		break;
	case 'submitnewStaff':
		submitnewStaff();
		break;
	case 'submitnewDealer':
		submitnewDealer();
		break;
	case 'submitASC':
		submitASC();
		break;
	case 'submitnewProduct':
		submitnewProduct();
		break;
	case 'submitnewGroups':
		submitnewGroups();
		break;
	case 'submitnewProductType':
		submitnewProductType();
		break;
	case 'submitnewProductCategory':
		submitnewProductCategory();
		break;
	case 'getUserRoles':
		getUserRoles();
		break;
	case 'getSpareParts':
		getSpareParts();
		break;
	case 'addNoticeBoard':
		addNoticeBoard();
		break;
	case 'deleteNotices':
		deleteNotices();
		break;
	case 'deleteDealer':
		deleteDealer();
		break;
	case 'deleteASC':
		deleteASC();
		break;
	case 'deleteGroup':
		deleteGroup();
		break;
	case 'deleteSpares':
		deleteSpares();
		break;
	case 'deleteProductType':
		deleteProductType();
		break;
	case 'deleteCategoryType':
		deleteCategoryType();
		break;
	case 'deleteProduct':
		deleteProduct();
		break;
	case 'deleteTech':
		deleteTech();
		break;
	case 'passwordResetByEmail':
		passwordResetByEmail($_GET['userid']);
		break;
	
}

function slide2(){
	$group_id = $_GET["id"];


	$fields = "spare_id";
	$table = "groups_details";
	$cond = "active = 1 and group_id=".$group_id;

	$rows = selectrec($fields,$table,$cond);
	
	$mainArr = array();
	foreach($rows as $row){ 
		$arr1[] = $row[0];
		$arr1[] = singlefield("spare_name","spares","spare_id=".$row[0]);
		$arr1[] = singlefield("spare_url","spares","spare_id=".$row[0]);
		$arr1[] = singlefield("spare_desc","spares","spare_id=".$row[0]);

		$mainArr[] = $arr1;
		unset( $arr1 );
	}


	if(sizeof($mainArr)>=1){
		$arr[] = array('status' => 1, 'message' => 'Success');
		$arr[] = $mainArr;
	}
	else
		$arr = array(array('status' => 0, 'message' => 'No Records Found.'));

	echo json_encode($arr);
}

function search(){
	$searchIn = $_POST["searchIn"];
	$searchCatalogue = $_POST["searchCatalogue"];



	$fields = "a.product_id,a.product,a.url,b.group_id, b.product_type_id";

	if($searchIn=="Vin"){
		$table = "product a, groups b, groups_vins c";
		$cond = "a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.vin_num = '".$searchCatalogue."' and a.active=1 and b.active=1 and c.active=1";
	}
	else if($searchIn=="Part_Assembly"){
		$table = "product a,groups b, groups_details c, spares d";
		$cond = "a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.spare_id=d.spare_id and d.spare_name LIKE '%".$searchCatalogue."%' GROUP BY a.product_type_id";
	}
	else if($searchIn=="Part_Description"){
		$table = "product a,groups b, groups_details c, spares d";
		$cond = "a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.spare_id=d.spare_id and d.spare_desc LIKE '%".$searchCatalogue."%' GROUP BY a.product_type_id";
	}

	else{
		$fields = "a.product_id,a.product,a.url,b.group_id, b.product_type_id";
		$table = "product a,groups b";
		$cond = "a.product_type_id=b.product_type_id GROUP BY a.product_type_id";
	}

	//vins
	//select a.product_type_id,a.product,a.url from product a, groups b, groups_vins c where a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.vin_num = 'MD2A18AZ8EW'

	//Part Assembly
	//select a.product_type_id,a.product,a.url from product a,groups b, groups_details c, spares d where a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.spare_id=d.spare_id and d.spare_name LIKE "%Camp Shaft%"

	//Part Description
	//select a.product_type_id,a.product,a.url from product a,groups b, groups_details c, spares d where a.product_type_id=b.product_type_id and b.group_id=c.group_id and c.spare_id=d.spare_id and d.spare_desc LIKE "%Camp Shaft%"


	$rows = selectrec($fields,$table,$cond);
	
	$arr1 = array();
	foreach($rows as $row){ 
		$arr1[] = $row;
	}


	if(sizeof($arr1)>=1){
		$arr[] = array('status' => 1, 'message' => 'Success');
		$arr[] = $arr1;
	}
	else
		$arr = array(array('status' => 0, 'message' => 'No Records Found.'));

	echo json_encode($arr);
}

function searchTechDetails(){
	$groupid = $bulletinid = "";
	if(isset($_POST["groupid"]) && trim($_POST["groupid"]) != ""){
		$groupid = $_POST["groupid"];
	}
	if(isset($_POST["bulletinid"]) && trim($_POST["bulletinid"]) != ""){
		$bulletinid = $_POST["bulletinid"];
	}



	$fields = "`techfiles_id`,`product_type_id`,`group_id`,`bulletin_type_id`,`service_bulletin_id`,`service_bulletin_desc`,`service_document_url`,`service_document_url_french`,`service_document_url_kannada`,DATE_FORMAT(date_time, '%d-%m-%Y'),`plates`";
	$table = "techfiles";

	if($groupid=="" &&  $bulletinid!="")
		$cond = "active=1 and bulletin_type_id=".$bulletinid;
	else if($bulletinid=="" && $groupid!="")
		$cond = "active=1 and group_id=".$groupid;
	else if($groupid!="" && $bulletinid!="")
		$cond = "active=1 and group_id=".$groupid." and bulletin_type_id=".$bulletinid;
	else
		$cond = "active=1 ORDER BY date_time DESC LIMIT 5";
	

//echo $cond;

//$cond = "active=1 and group_id=".$groupid." and bulletin_type_id=".$bulletinid;
	$rows = selectrec($fields,$table,$cond);
	
	$mainArr = array();
	foreach($rows as $row){ 

		$arr1[] = singlefield("product_type","product_types","product_type_id=".$row[1]);
		$arr1[] = singlefield("group_name","groups","group_id=".$row[2]);
		$arr1[] = singlefield("bulletin_type_name","bulletin","bulletin_type_id=".$row[3]);
		$arr1[] = $row[4];
		$arr1[] = $row[5];
		$arr1[]	= $row[6];
		$arr1[]	= $row[7];
		$arr1[]	= $row[8];
		$arr1[]	= $row[9];
		$arr1[]	= $row[10];

		$mainArr[] = $arr1;
		unset( $arr1 );
	}


	if(sizeof($mainArr)>=1){
		$arr[] = array('status' => 1, 'message' => 'Success');
		$arr[] = $mainArr;
	}
	else
		$arr = array(array('status' => 0, 'message' => 'No Records Found.'));

	echo json_encode($arr);
}


function addNoticeBoard(){


	$allowedExts = array("gif", "jpeg", "jpg", "png");


	$temp = explode(".", $_FILES["myfile"]["name"]);
	$extension = end($temp);

	if ((($_FILES["myfile"]["type"] == "image/gif") || ($_FILES["myfile"]["type"] == "image/jpeg") || ($_FILES["myfile"]["type"] == "image/jpg") || ($_FILES["myfile"]["type"] == "image/pjpeg") || ($_FILES["myfile"]["type"] == "image/x-png") || ($_FILES["myfile"]["type"] == "image/png")) && in_array($extension, $allowedExts)) 
	{   
		if ($_FILES["myfile"]["error"] > 0) {
	    	echo "Return Code: " . $_FILES["myfile"]["error"] . "<br>";
	  	} else {
		    echo "Upload: " . $_FILES["myfile"]["name"] . "<br>";
		    echo "Type: " . $_FILES["myfile"]["type"] . "<br>";
		    echo "Size: " . ($_FILES["myfile"]["size"] / 1024) . " kB<br>";
		    echo "Temp file: " . $_FILES["myfile"]["tmp_name"] . "<br>";
		    if (file_exists("../img/notice_board/" . $_FILES["myfile"]["name"])) {
		      echo $_FILES["myfile"]["name"] . " already exists. ";
		    } else {
		      move_uploaded_file($_FILES["myfile"]["tmp_name"],
		      "../img/notice_board/" . $_FILES["myfile"]["name"]);
		      echo "Stored in: " . "../img/notice_board/" . $_FILES["myfile"]["name"];
		    }
	  	}
	} else {
	  	echo "Invalid file";
	}
}

function fPassword(){
	$txtEmail = $_POST["txtEmail"];
	$userid = (singlefield("id","users","email = '".$txtEmail."'"));

	if($userid){
		passwordResetByEmail($userid);
		$arr = array('status' => 1, 'message' => 'Success');
		
	}
	else{
		$arr = array('status' => 0, 'message' => 'Reset Failure. Please try again');

	}
	echo json_encode($arr);
}

function deleteNotices(){
	$notice_id = $_GET["id"];

	$tabname = "noticeboards";
	$fieldname = "active";
	$newval = 0;
	$cond = "id=".$notice_id;


	$rows = updaterec($tabname,$fieldname,$newval,$cond);


	echo 1;
}

function deleteDealer(){
	$dealer_id = $_GET["id"];

	$tabname = "dealers";
	$fieldname = "active";
	$newval = 0;
	$cond = "dealer_id =".$dealer_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteSpares(){
	$spare_id = $_GET["id"];

	$tabname = "spares";
	$fieldname = "active";
	$newval = 0;
	$cond = "spare_id =".$spare_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteASC(){
	$asc_id = $_GET["id"];

	$tabname = "`asc`";
	$fieldname = "active";
	$newval = 0;
	$cond = "asc_id =".$asc_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteProductType(){
	$productType_id = $_GET["id"];

	$tabname = "`product_types`";
	$fieldname = "active";
	$newval = 0;
	$cond = "product_type_id =".$productType_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteCategoryType(){
	$productCategory_id = $_GET["id"];

	$tabname = "`product_categories`";
	$fieldname = "active";
	$newval = 0;
	$cond = "product_category_id=".$productCategory_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteTech(){
	$deleteTech = $_GET["id"];

	$tabname = "`techfiles`";
	$fieldname = "active";
	$newval = 0;
	$cond = "techfiles_id  =".$deleteTech;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteProduct(){
	$product_id = $_GET["id"];

	$tabname = "`product`";
	$fieldname = "active";
	$newval = 0;
	$cond = "product_id =".$product_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function deleteGroup(){
	$group_id = $_GET["id"];

	$tabname = "`groups`";
	$fieldname = "active";
	$newval = 0;
	$cond = "group_id =".$group_id;


	if(updaterec($tabname,$fieldname,$newval,$cond))
		echo 1;
}

function getUserRoles(){
	$userTypeID = $_GET["userTypeID"];

	$rows = selectrec("`user_role_id`,`user_role`", "user_role","user_type_id=".$userTypeID);

	foreach($rows as $row){
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function getSpareParts(){
	$product_type_id = $_GET["product_type_id"];

	$rows = selectrec("`spare_id`,`spare_name`", "spares","product_type_id=".$product_type_id);

	foreach($rows as $row){
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function loginCheck(){
	$username=$_POST['username'];
	$password=$_POST['password'];
	$uType	 =$_POST['userType'];

	if($uType=="1" || $uType=="2" || $uType=="3")
		$userid = singlefield("id","users","username='".$username."' and password='".md5($password)."' and admin=".$uType);
	else if($uType=="4")
		$userid = singlefield("dealer_id","dealers","dealer_username='".$username."' and dealer_password='".$password."' and active=1");
	else if($uType=="5")
		$userid = singlefield("asc_id","`asc`","asc_username='".$username."' and asc_password='".$password."' and active=1");



	if($userid){
		

		if($uType=="1" || $uType=="2" || $uType=="3"){

			$_SESSION['NAME'] = singlefield("name","users","ID=".$userid);
			$_SESSION['EMAIL'] = singlefield("email","users","ID=".$userid);
			$_SESSION['USERNAME'] = singlefield("username","users","ID=".$userid);

			$_SESSION['ADMINROLE'] = singlefield("admin","users","ID=".$userid);
		}
		else{
			if($uType=="4"){
				$_SESSION['NAME'] = singlefield("dealer_name","dealers","dealer_id=".$userid);
				$_SESSION['EMAIL'] = singlefield("dealer_email","dealers","dealer_id=".$userid);
				$_SESSION['USERNAME'] = singlefield("dealer_username","dealers","dealer_id=".$userid);
				$_SESSION['ADMINROLE'] = 4;
			}
			else if($uType=="5"){
				$_SESSION['NAME'] = singlefield("asc_name","`asc`","asc_id=".$userid);
				$_SESSION['EMAIL'] = singlefield("asc_email","`asc`","asc_id=".$userid);
				$_SESSION['USERNAME'] = singlefield("asc_username","`asc`","asc_id=".$userid);
				$_SESSION['ADMINROLE'] = 5;
			}

		}

		$arr = array('status' => 1, 'message' => 'Success', 'adminRole' => $_SESSION['ADMINROLE'],  'name' => $_SESSION['NAME'], 'email' => $_SESSION['EMAIL'], 'username' => $_SESSION['USERNAME']);
		
	}
	else{
		$arr = array('status' => 0, 'message' => 'Login Failure');
		
	}
	echo json_encode($arr);
}

function showadminUsers(){
	$rows = selectrec("`id`,`username`,`name`,`email`,`mobile`,`admin`,`role`", "users","admin!=1 and admin !=2");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function showproductTypes(){
	$rows = selectrec("a.product_type_id,a.product_type,b.product_category", "product_types a, product_categories b","a.product_category_id =b.product_category_id  and a.active=1");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function showProductCategory(){
	$arr="";
	$rows = selectrec("`product_category_id`,`product_category`", "product_categories","active=1");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function showDealers(){
	$rows = selectrec("`dealer_id`,`dealer_name`,`dealer_email`,`dealer_service_advisor_name`,`dealer_service_advisor_mobile`,`dealer_username`", "dealers","active=1");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function showASC(){

	$rows = selectrec("`asc_id`,`dealer_id`,`asc_name`,`asc_email`,`asc_service_advisor_name`,`asc_service_advisor_mobile`,`asc_username`", "`asc`","active=1");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function showSpareParts(){
	$rows = selectrec("`spare_id`,`spare_name`,`spare_url`", "`spares`","active=1 ORDER BY spare_id");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}


function showGroups(){


	$rows = selectrec("`group_id`,`group_name`", "`groups`","active=1");
	$arr="";

	foreach($rows as $row){
		$row .= selectrec("a.group_details_id,a.spare_id,b.spare_name","a.groups_details, b.spares","a.spare_id=b.spare_id and a.active=1 and a.group_id=".$row[0]);
		$row .= selectrec("a.group_vins_id,a.vin_num","groups_vins","a.active=1 and group_id=".$row[0]);

		$arr[] = $row;
	}

	echo json_encode($arr);
}

function listAllUsers(){
	$rows = selectrec("`id`,`username`,`name`,`email`,`mobile`,`admin`", "users");

	foreach($rows as $row){ 
		$arr[] = $row;
	}

	echo json_encode($arr);
}

function addUserfromAdmin(){


	$table="users";

	$username = $_POST['txtUsername'];
	$password = md5($_POST['txtPassword']);
	$name 	= $_POST['txtName'];
	$email = $_POST['txtEmail'];
	$mobile = $_POST['txtMobile'];


	// $groupId = "1";
	// $username = "bajaj";
	// $password = md5("bajaj123");
	// $name 	= "bAJAJ";
	// $email = "aishkarthik@gmail.com";
	// $mobile = "9867727272";


 	$fields = "`username`,`password`,`name`,`email`,`mobile`,`admin`";

 	$values = "'".$username."','".$password."','".$name."','".$email."',".$mobile.",2";


	if(insertrec($table,$fields,$values))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function submitnewStaff(){


	$table="users";

	$username = $_POST['txtUsername'];
	$password = md5($_POST['txtPassword']);
	$name 	= $_POST['txtName'];
	$email = $_POST['txtEmail'];
	$mobile = $_POST['txtMobile'];
	$txtuserType = $_POST['txtuserType'];
	$txtuserRole = $_POST['txtuserRole'];


	// $groupId = "1";
	// $username = "bajaj";
	// $password = md5("bajaj123");
	// $name 	= "bAJAJ";
	// $email = "aishkarthik@gmail.com";
	// $mobile = "9867727272";


 	$fields = "`username`,`password`,`name`,`email`,`mobile`,`admin`,`role`";

 	$values = "'".$username."','".$password."','".$name."','".$email."',".$mobile.",".$txtuserType.",".$txtuserRole;


	if(insertrec($table,$fields,$values))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data.');
		

	echo json_encode($arr);
}

function submitnewDealer(){



	$dealerName = $_POST['txtdealerName'];
	$txtdealerUserName = $_POST['txtdealerUserName'];
	$txtdealerEmail = $_POST['txtdealerEmail'];
	$txtdealerPassword = $_POST['txtdealerPassword'];

	$txtdealerSAName = $_POST['txtdealerSAName'];
	$txtdealerSAMobile = $_POST['txtdealerSAMobile'];



	

	$table="dealers";



 	$fields = "`dealer_name`,`dealer_email`,`dealer_username`,`dealer_password`,`dealer_service_advisor_name`,`dealer_service_advisor_mobile`";

 	$values = "'".$dealerName."','".$txtdealerEmail."','".$txtdealerUserName."','".$txtdealerPassword."','".$txtdealerSAName."',".$txtdealerSAMobile;


	if(insertrec($table,$fields,$values))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data.');
		

	echo json_encode($arr);
}

function submitnewProduct(){

	$productType	= $_POST['productType'];
	$txtProductName	= $_POST['txtProductName'];
	

	$table="product";



 	$fields = "`product_type_id`,`product`";

 	$values = $productType.",'".$txtProductName."'";


	if(insertrec($table,$fields,$values))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function submitASC(){





	$txtSelectDealer	= $_POST['txtSelectDealer'];
	$txtascName			= $_POST['txtascName'];
	$txtascUserName		= $_POST['txtascUserName'];
	$txtascPassword		= $_POST['txtascPassword'];
	$txtascEmail		= $_POST['txtascEmail'];
	$txtPMName			= $_POST['txtPMName'];
	$txtPMMobile		= $_POST['txtPMMobile'];
	

	$table="asc";



 	$fields = "`dealer_id`,`asc_name`,`asc_email`,`asc_username`,`asc_password`,`asc_service_advisor_name`,`asc_service_advisor_mobile`";

 	$values = $txtSelectDealer.",'".$txtascName."','".$txtascEmail."','".$txtascUserName."','".$txtascPassword."','".$txtPMName."',".$txtPMMobile;


	if(insertrec($table,$fields,$values))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function submitnewGroups(){

	$txtProductType	= $_POST['txtProductType'];
	$txtGroupName	= $_POST['txtGroupName'];
	$txtGroupDesc	= $_POST['txtGroupDesc'];
	$txtRevision	= $_POST['txtRevision'];

	$vins			= $_POST['vins'];
	$selectedSpares	= $_POST['selectedSpares'];


	

	$table	="groups";
 	$fields = "`product_type_id`,`revision`,`group_name`,`group_desc`";
 	$values = $txtProductType.",'".$txtRevision."','".$txtGroupName."','".$txtGroupDesc."'";


	if(insertrec($table,$fields,$values)){
		$group_id = mysql_insert_id();

		$table1 = "groups_vins";
		$table2 = "groups_details";

		$fields1 = "`group_id`,`vin_num`";
		$fields2 = "`group_id`,`spare_id`";


		foreach($vins as $vin){ 

			$values1 = $group_id.",'".$vin."'";

			insertrec($table1,$fields1,$values1);

		}

		foreach($selectedSpares as $selectedSpare){ 

			$values2 = $group_id.",'".$selectedSpare."'";

			insertrec($table2,$fields2,$values2);

		}

		$arr = array('status' => 1, 'message' => 'Success');

	}		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function submitnewProductType(){

	$txtProductType	= $_POST['txtProductType'];
	$txtProductCategory	= $_POST['txtProductCategory'];

	

	$table	="product_types";
 	$fields = "`product_type`,`product_category_id`";
 	$values = "'".$txtProductType."','".$txtProductCategory."'";


	if(insertrec($table,$fields,$values))
		$arr = array('status' => 1, 'message' => 'Success');
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function submitnewProductCategory(){

	$txtProductCategory	= $_POST['txtProductCategory'];

	

	$table	="product_categories";
 	$fields = "`product_category`";
 	$values = "'".$txtProductCategory."'";


	if(insertrec($table,$fields,$values))
		$arr = array('status' => 1, 'message' => 'Success');
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

//6add_admins.png, 8add_staff.png, 
function addAdmins($adminType){

	$table="users";

	$username = $_POST['txtUsername'];
	$password = md5($_POST['txtPassword']);
	$name 	= $_POST['txtName'];
	$email = $_POST['txtEmail'];
	$mobile = $_POST['txtMobile'];
	$role = ($_POST['txtRole'])?$_POST['txtRole']:0;

	$admin = $adminType;

	// $username = "bajaj";
	// $password = md5("bajaj123");
	// $name 	= "bAJAJ";
	// $email = "aishkarthik@gmail.com";
	// $mobile = "9867727272";
	// $admin = $adminType;

 	$fields = "`username`,`password`,`name`,`email`,`mobile`,`admin`,`role`";

 	$value = "'".$username."','".$password."','".$name."','".$email."',".$mobile.",".$admin.",".$role;


	if(insertrec($table,$fields,$value))

		$arr = array('status' => 1, 'message' => 'Success');
		
	else
		$arr = array('status' => 0, 'message' => 'Insertion failure. Please retry with correct data');
		

	echo json_encode($arr);
}

function fetchUserById($userid){

 	$fields = "username,name,email,mobile,admin";
 	$table = "users";
 	$cond = "ID=".$userid;

	$rows = selectrec($fields,$table,$cond);


	foreach($rows as $row){ 
		$arr['username'] = $row[0];
		$arr['name'] = $row[1];
		$arr['email'] = $row[2];
		$arr['mobile'] = $row[3];
		$arr['admin'] = $row[4];
	}

	if($row){
		$arr['status'] = 1;
		$arr['message'] = 'Success';
		
	}
	else{
		$arr = array('status' => 0, 'message' => 'No Records fetched. Try again.');
		
	}
	echo json_encode($arr);
}

function getRandomString($length = 6) {

    $validCharacters = "abcdefghijklmnopqrstuxyvwzABCDEFGHIJKLMNOPQRSTUXYVWZ+-*#&@!?";
    $validCharNumber = strlen($validCharacters);

    $result = "";

    for ($i = 0; $i < $length; $i++) {
        $index = mt_rand(0, $validCharNumber - 1);
        $result .= $validCharacters[$index];
    }
    return $result;
}



function passwordResetByEmail($userid){

 	$table = "users";
 	$cond = "ID=".$userid;
	$newPassword = getRandomString();
	$fieldname	= "password";
	$newval = "'".md5($newPassword)."'";

	if(updaterec($table,$fieldname,$newval,$cond)){

	 	$fields = "username,name,email";
		$rows = singlerec($fields,$table,$cond);
		$row = mysql_fetch_row($rows);

	    $message = "Your password reset link send to your e-mail address.";
	    $to=$row[2];
	    $subject="Bajaj Admin - Password reset";
	    $from = 'no_reply@gladminds.co';
	    $rPass = md5(time());

        $body='<span style="font-family:arial,verdana">Hi '.$row[1].', <br/> <br/>Your Username is: '.$row[0].' <br><br>Your password has been reset to: <b>'.$newPassword."</b></span><br/><br/>Regards,<br/>Bajaj Admin.";

	    $headers = "From: " . strip_tags($from) . "\r\n";
	    $headers .= "Reply-To: ". strip_tags($from) . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

//		echo $body;
     	if(mail($to,$subject,$body,$headers))
     		$arr = array('status' => 1, 'message' => 'Password Reset Successful.'.$to);
     	else
     		$arr = array('status' => 0, 'message' => 'Password Reset Un-Successful.');

		echo json_encode($arr);

	}
}

?>