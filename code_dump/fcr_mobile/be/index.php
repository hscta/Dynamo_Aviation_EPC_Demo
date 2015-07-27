<?php
session_start();
//mail Settings

include "inc/dbconn.php";
include "inc/function.php";


if (isset($_POST['action']) && ! empty($_POST['action'])) {
    $action = $_POST['action'];
} elseif (isset($_GET['action']) && ! empty($_GET['action'])) {
    $action = $_GET['action'];
}

switch ($action){
    case 'loginCheck':
		loginCheck();
		break;
	case 'fetchFCList':
		fetchFCList();
		break;
	case 'listAllFailuresOpen':
		listAllFailuresOpen();
		break;
	case 'listAllFailuresClosed':
		listAllFailuresClosed();
		break;
	case 'listAllComplaintsOpen':
		listAllComplaintsOpen();
		break;
	case 'listAllComplaintsClosed':
		listAllComplaintsClosed();
		break;
	case 'generateFailureID':
		generateFailureID();
		break;
	case 'generateComplaintID':
		generateComplaintID();
		break;
	case 'listAllLocations':
		listAllLocations();
		break;
	case 'listAllLocations_edit':
		listAllLocations_edit();
		break;
	case 'listAllLocations_edit1':
		listAllLocations_edit1();
		break;
	case 'addDefault':
		addDefault();
		break;
	case 'addDefaultComplaint':
		addDefaultComplaint();
		break;
	case 'editDefaultComplaint':
		editDefaultComplaint();
		break;
	case 'addCustomer':
		addCustomer();
		break;
	case 'addCustomerComplaint':
		addCustomerComplaint();
		break;
	case 'addVehicle':
		addVehicle();
		break;
	case 'addVehicleComplaint':
		addVehicleComplaint();
		break;
	case 'listAllModels':
		listAllModels();
		break;
	case 'listCategorynParts':
		listCategorynParts();
		break;
	case 'listCategory':
		listCategory();
		break;
	case 'addFailureDetails':
		addFailureDetails();
		break;
	case 'addComplaintDetails':
		addComplaintDetails();
		break;
	case 'editComplaintDetails':
		editComplaintDetails();
		break;
	case 'listAllActions':
		listAllActions();
		break;
	case 'listActionsTaken':
		listActionsTaken();
		break;
	case 'saveActions':
		saveActions();
		break;
	case 'addComplaintActions':
		addComplaintActions();
		break;
	case 'draftComplaintActions':
		draftComplaintActions();
		break;
	case 'closeFailure':
		closeFailure();
		break;
	case 'deleteFailure':
		deleteFailure();
		break;
	case 'deleteComplaint':
		deleteComplaint();
		break;
	case 'addFailure':
		addFailure();
		break;
	case 'sendPartsEmail':
		sendPartsEmail();
		break;
	case 'editDefault':
		editDefault();
		break;		
	case 'getCustomerDetails':
		getCustomerDetails();
		break;
	case 'getCustomerDetails1':
		getCustomerDetails1();
		break;
	case 'editCustomer':
		editCustomer();
		break;
	case 'editCustomer1':
		editCustomer1();
		break;
	case 'getVehicleDetails':
		getVehicleDetails();
		break;
	case 'getVehicleDetails1':
		getVehicleDetails1();
		break;
	case 'editVehicle':
		editVehicle();
		break;
	case 'editVehicleComplaint':
		editVehicleComplaint();
		break;
	case 'listfailures':
		listfailures();
		break;
	case 'listComplaints':
		listComplaints();
		break;
	case 'convert2Failure':
		convert2Failure();
		break;

}

	function loginCheck(){
		$username=$_POST['txtEmpCode'];
		$password=$_POST['txtPassword'];
		//$uType	 =$_POST['userType'];

		$sign_remember	 = isset($_POST['sign_remember'])?$_POST['sign_remember']:0;

		//$userid = singlefield("ID","users","email='".$username."' and password='".md5($password)."' and  admin_type_id=".$uType);
		$userid = singlefield("ID","users","emp_code='".$username."' and password='".$password."' and active=1");

		if($userid){
			
			$_SESSION['NAME'] = singlefield("name","users","ID=".$userid);
			$_SESSION['EMAIL'] = singlefield("email","users","ID=".$userid);
			$_SESSION['EMPCODE'] = singlefield("emp_code","users","ID=".$userid);
			$_SESSION['ADMIN_ID'] = singlefield("ID","users","ID=".$userid);
			$_SESSION['ADMIN_TYPE_ID'] = singlefield("admin_type_id","users","ID=".$userid);
			



			$cookie_user_name = $username;
			$cookie_password = $password;

			// if($sign_remember=="1"){
			// 	//Expire after 365 Days
			// 	$expTime = time() + (86400 * 365);
			// }
			// else{
			// 	//Expire 1 Hour Before
			// 	$expTime = time() - 3600;
			// }

			// setcookie("bajaj_username", $cookie_user_name, $expTime, "/");
			// setcookie("bajaj_password", $cookie_password, $expTime, "/");
			// setcookie("bajaj_check", $sign_remember, $expTime, "/");

			//setcookie("total_uType", $uType, $expTime, "/");
			if($sign_remember=="1")
				$arr = array('status' => 1, 'message' => 'Login Success. Redirecting...', 'name' => $_SESSION["NAME"], 'email' => $_SESSION["EMAIL"], 'empcode' => $_SESSION["EMPCODE"],'remember'=>1);
			else
				$arr = array('status' => 1, 'message' => 'Login Success. Redirecting...', 'name' => $_SESSION["NAME"], 'email' => $_SESSION["EMAIL"], 'empcode' => $_SESSION["EMPCODE"],'remember'=>0);
			
		}
		else{
			$arr = array('status' => 0, 'message' => 'Login Failure. Please try again');
			
		}

		echo json_encode($arr);
	}

	function fetchFCList(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];

		$fail_open = singlefield("count(failure_no)","failure","status=1 and emp_code='".$emp_code."'");
		$fail_close = singlefield("count(failure_no)","failure","status=0 and emp_code='".$emp_code."'");

		$comp_open = singlefield("count(complaint_no)","complaint","status=1 and emp_code='".$emp_code."'");
		$comp_close = singlefield("count(complaint_no)","complaint","status=0 and emp_code='".$emp_code."'");

		echo '{ "complaint":{"open":"'.$comp_open.'","closed":"'.$comp_close.'"}, "failure":{"open":"'.$fail_open.'","closed":"'.$fail_close.'"}}';
	}

	function listAllFailuresOpen(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];

		$fields = "failure_no, cust_name, cust_mobile, frame_vin_no, veh_reg_no, location_id, engine_no, channel_name";

		$table = "failure";

		$rows = selectrec($fields, $table,"status=1 and active=1 and emp_code='".$emp_code."' order by failure_no desc");
		$str = "[";
		foreach($rows as $row){ 

			$str .='{"failure_no" : "'.$row[0].'", "customer_name" : "'.$row[1].'", "phone_number" : "'.$row[2].'", "frame_VIN" : "'.$row[3].'", "veh_reg_no" : "'.$row[4].'", "location" : "'.singlefield("location_name","locations","location_id=".$row[5]).'", "engine_no" : "'.$row[6].'", "channel_name" : "'.$row[7].'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]";
		echo $str;
	}

	function listAllFailuresClosed(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];

		$fields = "failure_no, cust_name, cust_mobile, frame_vin_no, veh_reg_no, location_id, engine_no, channel_name";

		$table = "failure";

		$rows = selectrec($fields, $table,"status=0 and active=1 and emp_code='".$emp_code."' order by failure_no desc");
		$str = "[";
		foreach($rows as $row){ 

			$str .='{"failure_no" : "'.$row[0].'", "customer_name" : "'.$row[1].'", "phone_number" : "'.$row[2].'", "frame_VIN" : "'.$row[3].'", "veh_reg_no" : "'.$row[4].'", "location" : "'.singlefield("location_name","locations","location_id=".$row[5]).'", "engine_no" : "'.$row[6].'", "channel_name" : "'.$row[7].'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]";
		echo $str;
	}

	function listAllComplaintsOpen(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];

		$fields = "complaint_no, cust_name, cust_mobile, frame_vin_no, veh_reg_no, location_id, engine_no";

		$table = "complaint";

		$rows = selectrec($fields, $table,"status=1 and active=1 and emp_code='".$emp_code."' order by complaint_no desc");
		$str = "[";
		foreach($rows as $row){ 

			$str .='{"complaint_no" : "'.$row[0].'", "customer_name" : "'.$row[1].'", "phone_number" : "'.$row[2].'", "frame_VIN" : "'.$row[3].'", "veh_reg_no" : "'.$row[4].'", "location" : "'.singlefield("location_name","locations","location_id=".$row[5]).'", "engine_no" : "'.$row[6].'"},';
		}

		if(count($rows)>0)
		$str = substr($str,0,-1);

		$str .= "]";
		echo $str;
	}

	function listAllComplaintsClosed(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];

		$fields = "complaint_no, cust_name, cust_mobile, frame_vin_no, veh_reg_no, location_id, engine_no";

		$table = "complaint";

		$rows = selectrec($fields, $table,"status=0 and active=1 and emp_code='".$emp_code."' order by complaint_no desc");
		$str = "[";
		foreach($rows as $row){ 

			$str .='{"complaint_no" : "'.$row[0].'", "customer_name" : "'.$row[1].'", "phone_number" : "'.$row[2].'", "frame_VIN" : "'.$row[3].'", "veh_reg_no" : "'.$row[4].'", "location" : "'.singlefield("location_name","locations","location_id=".$row[5]).'", "engine_no" : "'.$row[6].'"},';
		}

		if(count($rows)>0)
		$str = substr($str,0,-1);

		$str .= "]";
		echo $str;
	}


	function listAllLocations(){
		//Fetch Failure and Complaint List for that Employee
		$emp_code = $_GET["emp_code"];
		$assignedLocation = singlefield("location_id","users","emp_code='".$emp_code."'");

		$fields = "location_id,location_name";
		$table = "locations";

		$rows = selectrec($fields, $table,"active=1");
		$str = '[{"locations":[';
		foreach($rows as $row){ 
			$sel = ($row[0]==$assignedLocation)?"1":"0";
			$str .='{"location_id":"'.$row[0].'","location_name":"'.$row[1].'","selected":"'.$sel.'"},';
		}
		$str = substr($str,0,-1);

		$str .= '],"channels":'.listAllChannels().'}]';

		//$str = listAllChannels();
		echo $str;
	}


	function addDefault(){
		
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["fr_txtFailureNumber"];
		$col_val = "`exp_date_time` = '".$_POST["fr_datetime"]."', `channel_name` = '".htmlspecialchars($_POST["fr_channelName"], ENT_QUOTES)."', `channel_type_id` = '".$_POST["fr_txtChannelType"]."', `location_id` = '".$_POST["fr_txtLocation"]."'";

		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addDefaultComplaint(){
		
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["cr_txtComplaintNumber"];
		$col_val = "`location_id` = '".$_POST["cr_txtLocation"]."'";

		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function editDefault(){
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["fr_txtFailureNumber_edit"];
		$col_val = "`exp_date_time` = '".$_POST["fr_datetime_edit"]."', `channel_name` = '".htmlspecialchars($_POST["fr_channelName_edit"], ENT_QUOTES)."', `channel_type_id` = '".$_POST["fr_txtChannelType_edit"]."', `location_id` = '".$_POST["fr_txtLocation_edit"]."'";

		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function editDefaultComplaint(){
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["cr_txtComplaintNumber_edit"];
		$col_val = "`location_id` = '".$_POST["cr_txtLocation_edit"]."', `emp_code` = '".$_POST["cr_txtEmpCode_edit"]."'";

		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addCustomer(){
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["failureNumber"];

		$col_val = "`cust_name`='".htmlspecialchars($_POST['fr_txtName'],ENT_QUOTES)."',`cust_address` = '".htmlspecialchars($_POST['fr_txtAddress'],ENT_QUOTES)."',`cust_email` = '".htmlspecialchars($_POST['fr_txtEmail'],ENT_QUOTES)."',`cust_mobile` = '".htmlspecialchars($_POST['fr_txtPhone'],ENT_QUOTES)."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addCustomerComplaint(){
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["complaintNumber"];

		$col_val = "`cust_name`='".htmlspecialchars($_POST['cr_txtName'],ENT_QUOTES)."',`cust_address` = '".htmlspecialchars($_POST['cr_txtAddress'],ENT_QUOTES)."',`cust_email` = '".htmlspecialchars($_POST['cr_txtEmail'],ENT_QUOTES)."',`cust_mobile` = '".htmlspecialchars($_POST['cr_txtPhone'],ENT_QUOTES)."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function editCustomer(){
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["failureNumber"];

		$col_val = "`cust_name`='".htmlspecialchars($_POST['fr_txtName_edit'],ENT_QUOTES)."',`cust_address` = '".htmlspecialchars($_POST['fr_txtAddress_edit'],ENT_QUOTES)."',`cust_email` = '".htmlspecialchars($_POST['fr_txtEmail_edit'],ENT_QUOTES)."',`cust_mobile` = '".htmlspecialchars($_POST['fr_txtPhone_edit'],ENT_QUOTES)."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function editCustomer1(){
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["complaintNumber"];

		$col_val = "`cust_name`='".htmlspecialchars($_POST['cr_txtName_edit'],ENT_QUOTES)."',`cust_address` = '".htmlspecialchars($_POST['cr_txtAddress_edit'],ENT_QUOTES)."',`cust_email` = '".htmlspecialchars($_POST['cr_txtEmail_edit'],ENT_QUOTES)."',`cust_mobile` = '".htmlspecialchars($_POST['cr_txtPhone_edit'],ENT_QUOTES)."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addVehicle(){
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["failureNumber"];

		$paid = $warranty = 0;
		if($_POST["fr_txtrtype"]=="1")
			$paid = 1;
		else
			$warranty = 1;


		$col_val = "`model` = '".htmlspecialchars($_POST['fr_txtModel'],ENT_QUOTES)."',`veh_reg_no` = '".htmlspecialchars($_POST['fr_txtregno'],ENT_QUOTES)."',`frame_vin_no` = '".htmlspecialchars($_POST['fr_txtVinno'],ENT_QUOTES)."',`engine_no` = '".htmlspecialchars($_POST['fr_txtEngno'],ENT_QUOTES)."',`date_of_sale` = '".htmlspecialchars($_POST['fr_txtDOP'],ENT_QUOTES)."',`km_reading` = '".htmlspecialchars($_POST['fr_txtKMR'],ENT_QUOTES)."',`warranty` = '".$warranty."',`paid` = '".$paid."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addVehicleComplaint(){
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["complaintNumber"];

		$paid = $warranty = 0;
		if($_POST["cr_txtrtype"]=="1")
			$paid = 1;
		else
			$warranty = 1;


		$col_val = "`model` = '".htmlspecialchars($_POST['cr_txtModel'],ENT_QUOTES)."',`veh_reg_no` = '".htmlspecialchars($_POST['cr_txtregno'],ENT_QUOTES)."',`frame_vin_no` = '".htmlspecialchars($_POST['cr_txtVinno'],ENT_QUOTES)."',`engine_no` = '".htmlspecialchars($_POST['cr_txtEngno'],ENT_QUOTES)."',`date_of_sale` = '".htmlspecialchars($_POST['cr_txtDOP'],ENT_QUOTES)."',`km_reading` = '".htmlspecialchars($_POST['cr_txtKMR'],ENT_QUOTES)."',`warranty` = '".$warranty."',`paid` = '".$paid."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function addFailureDetails(){

		$table = "failure_details";
		$table1 = "failure_details_others";
		$failure_id = $_POST["failureNumber"];

		$txtComplaintCategories	= $_POST["fr_txtComplaintCategory"];
		$txtCustomerVoice 		= $_POST["fr_txtCustomerVoice"];
		$txtActionstaken 		= $_POST["fr_txtActionstaken"];
		$txtPartnumber 			= $_POST["fr_txtPartnumber"];
		$txtPartDesc 			= $_POST["fr_txtPartDesc"];
		$txtRequiredQty 		= $_POST["fr_txtRequiredQty"];

		$fields = "`cat_id`,`customer_voice_id`,`actions`,`part_no`,`qty`,`failure_id`,`slno`";
		$fields1 = "`cat_id`,`customer_voice_others`,`actions`,`part_no`,`qty`,`failure_id`,`slno`";

		$values = $values1 = "";

		$slno = 0;

		foreach ($txtComplaintCategories as $key => $txtComplaintCategory) {
			$slno++;

			$txtRequiredQty[$key] = ($txtRequiredQty[$key]=="")?0:$txtRequiredQty[$key];
			$txtPartnumber[$key] = ($txtPartnumber[$key]=="")?0:$txtPartnumber[$key];

 			if($txtComplaintCategory=="9")
 				$values1 .= "(".$txtComplaintCategory.",'".htmlspecialchars($txtCustomerVoice[$key],ENT_QUOTES)."','".htmlspecialchars($txtActionstaken[$key], ENT_QUOTES)."',".$txtPartnumber[$key].",".$txtRequiredQty[$key].",".$failure_id.",".$slno."),";
 			else
 				$values .= "(".$txtComplaintCategory.",".$txtCustomerVoice[$key].",'".htmlspecialchars($txtActionstaken[$key], ENT_QUOTES)."',".$txtPartnumber[$key].",".$txtRequiredQty[$key].",".$failure_id.",".$slno."),";
		}

		deleterec($table,"failure_id",$failure_id,"delete");
		deleterec($table1,"failure_id",$failure_id,"delete");

		if($values!=""){
			$values = substr($values,1,-2);

			if(insertrec($table,$fields,$values))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

		}

		if($values1!=""){
			$values1 = substr($values1,1,-2);

			if(insertrec($table1,$fields1,$values1))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');
		}


		echo json_encode($arr);
	}

	function addComplaintDetails(){

		$table = "complaint_details";
		$table1 = "complaint_details_others";
		$complaint_id = $_POST["complaintNumber"];

		$txtComplaintCategories	= $_POST["cr_txtComplaintCategory"];
		$txtCustomerVoice 		= $_POST["cr_txtCustomerVoice"];

		$fields = "`cat_id`,`customer_voice_id`,`complaint_no`,`sl_no`";
		$fields1 = "`customer_voice_others`,`complaint_no`,`sl_no`";

		$values = $values1 = "";

		$slno = 0;
        
        if(!is_array($txtComplaintCategories))
            $txtComplaintCategories = explode(",", $txtComplaintCategories);

		foreach ($txtComplaintCategories as $key => $txtComplaintCategory) {
			$slno++;


 			if($txtComplaintCategory=="9")
 				$values1 .= "('".htmlspecialchars($txtCustomerVoice[$key],ENT_QUOTES)."',".$complaint_id.",".$slno."),";
 			else
 				$values .= "(".$txtComplaintCategory.",".$txtCustomerVoice[$key].",".$complaint_id.",".$slno."),";
		}

		deleterec($table,"complaint_no",$complaint_id,"delete");
		deleterec($table1,"complaint_no",$complaint_id,"delete");

		if($values!=""){
			$values = substr($values,1,-2);

			if(insertrec($table,$fields,$values))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

		}

		if($values1!=""){
			$values1 = substr($values1,1,-2);

			if(insertrec($table1,$fields1,$values1))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');
		}


		echo json_encode($arr);
	}

	function editComplaintDetails(){

		$table = "complaint_details";
		$table1 = "complaint_details_others";
		$complaint_id = $_POST["complaintNumber"];

		$txtComplaintCategories	= $_POST["cr_txtComplaintCategory_edit"];
		$txtCustomerVoice 		= $_POST["cr_txtCustomerVoice"];

		$fields = "`cat_id`,`customer_voice_id`,`complaint_no`,`sl_no`";
		$fields1 = "`customer_voice_others`,`complaint_no`,`sl_no`";

		$values = $values1 = "";

		$slno = 0;
        
        if(count($txtComplaintCategories)>0){
		foreach ($txtComplaintCategories as $key => $txtComplaintCategory) {
			$slno++;


 			if($txtComplaintCategory=="9")
 				$values1 .= "('".htmlspecialchars($txtCustomerVoice[$key],ENT_QUOTES)."',".$complaint_id.",".$slno."),";
 			else
 				$values .= "(".$txtComplaintCategory.",".$txtCustomerVoice[$key].",".$complaint_id.",".$slno."),";
		}

		deleterec($table,"complaint_no",$complaint_id,"delete");
		deleterec($table1,"complaint_no",$complaint_id,"delete");

		if($values!=""){
			$values = substr($values,1,-2);

			if(insertrec($table,$fields,$values))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

		}

		if($values1!=""){
			$values1 = substr($values1,1,-2);

			if(insertrec($table1,$fields1,$values1))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');
		}
        }
        else
        $arr = array('status' => "1", 'message' => 'Success');    

		echo json_encode($arr);
	}

	function listAllModels(){

		
		$fields = "model_id,model_name";
		$table = "model";

		$rows = selectrec($fields, $table,"active=1");
		$str = '[{"models":[';
		foreach($rows as $row){ 

			$str .='{"model_id":"'.$row[0].'","model_name":"'.$row[1].'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]}]";

		echo $str;
	}

	function listCategorynParts(){

		
		$str = "[{".categorynParts()."}]";
		echo $str;
	}

	function listCategory(){

		$fields = "cat_id,cat_name";
		$table = "category";

		$fields1 = "customer_voice_id,customer_voice";
		$table1 = "customer_voice";

		$str = "[{";
		$rows = selectrec($fields, $table,"active=1");
		$str .= '"categories":[';
		foreach($rows as $row){ 

			$str .='{"cat_id":"'.$row[0].'","cat_name":"'.$row[1].'","customer_voices":[';

			$voices = selectrec($fields1, $table1,"active=1 and cat_id=".$row[0]);
			$str1 = "";
			foreach($voices as $voice){ 
				$str1 .='{"customer_voice_id":"'.$voice[0].'","customer_voice":"'.$voice[1].'"},';
			}
			$str1 = substr($str1,0,-1);
			$str .=$str1.']},';
		}
		if(count($rows>0))
		$str = substr($str,0,-1);

		$str .= "]}]";

		echo $str;
	}

	function generateFailureID(){
		//Generate new FailureID
		
		$table = "failure";
		$fields = "emp_code";
		$value = "'".$_GET["emp_code"]."'";
		
		$failureID = insertrec($table,$fields,$value);
		echo '{"failureID":"'.$failureID.'"}';
	}

	function generateComplaintID(){
		//Generate new FailureID
		
		$table = "complaint";
		$fields = "emp_code";
		$value = "'".$_GET["emp_code"]."'";
		
		$failureID = insertrec($table,$fields,$value);
		echo '{"complaintID":"'.$failureID.'"}';
	}

	function deleteFailure(){
		//Generate new FailureID
		
		$table = "failure";
		$field = "failure_id";
		$value = $_GET["recID"];
		
		if(deleterec($table,"failure_no",$value,"delete") && deleterec("failure_actions_taken",$field,$value,"delete") && deleterec("failure_details",$field,$value,"delete") && deleterec("failure_details_others",$field,$value,"delete") && deleterec("failure_pictures",$field,$value,"delete"))
			$arr = array('status' => "1", 'message' => 'Success');			
		else
			$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

		echo json_encode($arr);
	}

	function deleteComplaint(){
		//Generate new FailureID
		
		$table = "complaint";
		$field = "complaint_no";
		$value = $_GET["recID"];
		
		if(deleterec($table,$field,$value,"delete") && deleterec("complaint_actions_taken",$field,$value,"delete") && deleterec("complaint_details",$field,$value,"delete") && deleterec("complaint_details_others",$field,$value,"delete") && deleterec("complaint_pictures",$field,$value,"delete"))
			$arr = array('status' => "1", 'message' => 'Success');			
		else
			$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

		echo json_encode($arr);
	}

	function listAllActions(){
		//Fetch Failure and Complaint List for that Employee
		$failure_id = $_GET["failureID"];

		$fields = "count(failure_action_taken_id)";
		$table = "failure_actions_taken";
		$cond = "failure_id=".$failure_id;

		$failureDet = singlerec("job_completed_date,vehicle_delevered_date,dealer_asm_remark","failure","failure_no=".$failure_id);
		$arr = mysql_fetch_row($failureDet);

		$initiated_date = singlefield("date_time","failure","failure_no=".$failure_id);

		$str = '{"initiated_date":"'.$initiated_date.'","job_complete_date":"'.$arr[0].'","vehicle_delevered_date":"'.$arr[1].'","dealer_asm_remark":"'.$arr[2].'","actions":[';

		$recCount = 0;
		if(singlefield($fields,$table,$cond)>1){

			$fields1 = "failure_action_taken_id, action";
			$table1 = "failure_actions_taken";
			$cond1 = "failure_id=".$failure_id;

			$rows = selectrec($fields1,$table1,$cond1);

			foreach($rows as $row){ 
				$recCount++;
				$str .='{"failure_action_taken_id":"'.$row[0].'","action":"'.$row[1].'"},';
			}
		}
		else{
			$fields1 = "failure_details_id, actions, slno";
			$fields2 = "failure_details_others_id, actions, slno";

			$table1 = "failure_details";
			$table2 = "failure_details_others";

			$commonCond = "failure_id=".$failure_id;

			$rows1 = selectrec($fields1,$table1,$commonCond);
			$rows2 = selectrec($fields2,$table2,$commonCond);

			$rows = array_merge($rows1,$rows2);

			//print_r($rows);

			$sorter = new FieldSorter('2');    
			usort($rows, array($sorter, "cmp")); 

			foreach($rows as $row){ 
				$recCount++;
				$str .='{"failure_action_taken_id":"'.$row[0].'","action":"'.$row[1].'"},';
			}
		}

		if($recCount>=1)
			$str = substr($str,0,-1);
		
		$str .= ']}';
		echo $str;

	}

	function listActionsTaken(){
		//Fetch Failure and Complaint List for that Employee
		$complaintNumber = $_GET["complaintNumber"];

		$fields = "count(com_actions_id)";
		$table = "complaint_actions_taken";
		$cond = "complaint_no=".$complaintNumber;

		$recCount = 0;
		
		$str ='{"complaintDetails":[';

		if(singlefield($fields,$table,$cond)>1){

			$fields1 = "customer_voice, com_action, com_responsibility";
			$table1 = "complaint_actions_taken";
			$cond1 = "complaint_no=".$complaintNumber;

			$rows = selectrec($fields1,$table1,$cond1);

			foreach($rows as $row){ 
				$recCount++;
				$str .='{"customer_voice":"'.$row[0].'","action_taken":"'.$row[1].'","resposibilty":"'.$row[2].'"},';
			}
		}
		else{


			$fields1 = "cat_id,customer_voice_id,sl_no";
			$table1 = "complaint_details";

			$fields2 = "cat_id,customer_voice_others,sl_no";
			$table2 = "complaint_details_others";

			$commonCond = "complaint_no=".$complaintNumber;

			$rows1 = selectrec($fields1, $table1,$commonCond);
			$rows2 = selectrec($fields2, $table2,$commonCond);

			foreach($rows1 as $key => $csm)
			{
				$rows1[$key][1] = singlefield("customer_voice","customer_voice","customer_voice_id=".$rows1[$key][1]);
				$rows1[$key]['flag'] = 1;
			}

			foreach($rows2 as $key => $csm)
			{
				$rows2[$key]['flag'] = 2;
			}


			$rows = array_merge($rows1,$rows2);

			//print_r($rows);

			$sorter = new FieldSorter('2');    
			usort($rows, array($sorter, "cmp")); 


			foreach ($rows as $row) {
				$str .='{"customer_voice":"'.$row[1].'","action_taken":"","resposibilty":""},';
			}

		}

		if(count($rows)>0)
		$str = substr($str,0,-1);

		$str .="]}";

		echo $str;
	}

	function saveActions(){
		//Fetch Failure and Complaint List for that Employee
		$failure_id = $_POST["failureNumber"];
		$table = "failure_actions_taken";
		$txtActions	= $_POST["fr_txtActions"];
		$fields = "`action`,`failure_id`";



		$txtJobCompleteDate = $_POST["fr_txtJobCompleteDate"];
		$DeliveryDatetime = $_POST["fr_DeliveryDatetime"];
		//$DealerAsmRemark = htmlspecialchars($_POST["fr_DealerAsmRemark"], ENT_QUOTES);
		$DealerAsmRemark = "";


		$upFields = ",,";
		$upValues = "`job_completed_date` = '".$txtJobCompleteDate."',`vehicle_delevered_date` = '".$DeliveryDatetime."',`dealer_asm_remark`='".$DealerAsmRemark."'";


		$values = "";
		foreach ($txtActions as $key => $txtAction) {
			$values .= "('".htmlspecialchars($txtAction, ENT_QUOTES)."',".$failure_id."),";
		}
		$values = substr($values,1,-2);

		deleterec($table,"failure_id",$failure_id,"delete");




		if(insertrec($table,$fields,$values) && updaterecs("failure",$upValues, "failure_no=".$failure_id))
			$arr = array('status' => "1", 'message' => 'Success');			
		else
			$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');


		if($_POST["closeTicketFailure"]=="1"){

			$table = "failure";
			$fieldname = "status";
			$newval = 0;
			$cond = "`failure_no`=".$failure_id;

			if(updaterec($table,$fieldname,$newval,$cond))
				$arr = array('status' => "1", 'message' => 'Success');			
			else
				$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');			
		}



		echo json_encode($arr);
	}
	
	function addComplaintActions(){
		//Fetch Failure and Complaint List for that Employee
		$complaintNumber = $_POST["complaintNumber"];
		$table = "complaint_actions_taken";
		
		$txtActions	= $_POST["cr_txtActionsTaken"];
		$customerVoice = $_POST["cr_txtCustomerVoice"];
		$resposibilty = $_POST["cr_txtResponsibility"];




		$fields = "`customer_voice`,`com_action`,`com_responsibility`,`complaint_no`";

		$values = "";
		foreach ($txtActions as $key => $txtAction) {
			$values .= "('".htmlspecialchars($customerVoice[$key], ENT_QUOTES)."','".htmlspecialchars($txtAction, ENT_QUOTES)."','".htmlspecialchars($resposibilty[$key], ENT_QUOTES)."',".$complaintNumber."),";
		}

		$values = substr($values,1,-2);

		deleterec($table,"complaint_no",$complaintNumber,"delete");


		if(insertrec($table,$fields,$values) && updaterec("complaint","status","0","complaint_no=".$complaintNumber))
			$arr = array('status' => "1", 'message' => 'Success');			
		else
			$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');



		echo json_encode($arr);
	}
	
	function draftComplaintActions(){
		//Fetch Failure and Complaint List for that Employee
		$complaintNumber = $_POST["complaintNumber"];
		$table = "complaint_actions_taken";
		
		$txtActions	= $_POST["cr_txtActionsTaken"];
		$customerVoice = $_POST["cr_txtCustomerVoice"];
		$resposibilty = $_POST["cr_txtResponsibility"];



    	$fields = "`customer_voice`,`com_action`,`com_responsibility`,`complaint_no`";

		$values = "";
    
    	if(!is_array($txtActions))
            $txtActions = explode(",", $txtActions);

		if(!is_array($customerVoice))
            $customerVoice = explode(",", $customerVoice);
        
		if(!is_array($resposibilty))
            $resposibilty = explode(",", $resposibilty);


        
        
        
        
		foreach ($txtActions as $key => $txtAction) {
			$values .= "('".htmlspecialchars($customerVoice[$key], ENT_QUOTES)."','".htmlspecialchars($txtAction, ENT_QUOTES)."','".htmlspecialchars($resposibilty[$key], ENT_QUOTES)."',".$complaintNumber."),";
		}

		$values = substr($values,1,-2);

		deleterec($table,"complaint_no",$complaintNumber,"delete");


		if(insertrec($table,$fields,$values))
			$arr = array('status' => "1", 'message' => 'Success');			
		else
			$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');



		echo json_encode($arr);
	}
	
	function closeFailure(){
		//Generate new FailureID
		echo json_encode($arr);
	}


	function sendPartsEmail(){
		$task = $_GET["task"];
		$id = $_GET["ID"];

		$rows1 = selectrec("part_no,qty", "failure_details","failure_id=".$id);
		$str1 = "";
		$rowCount = 0;

		foreach($rows1 as $row1){
			if($row1[1]>0){
				$str1 .="<tr><td>".singlefield("part_code","parts","part_id=".$row1[0])."</td><td>".singlefield("part_desc","parts","part_id=".$row1[0])."</td><td>".$row1[1]."</td></tr>";
				$rowCount++;
			}
		}


		if($task=="failure" && $rowCount>0){
			$table = "failure_details";

			$subject = "Parts required for Failure #".$id;
			
			$toEmail = "ashakiran@gladminds.co,naveen.shankar@gladminds.co";
			$ccEmail = "karthik.rajagopalan@gladminds.co";

			$str = '<p>Dear Bajaj Supply team member,</p><br/><p>Please note new request for parts.&nbsp;</p><table style="border-collapse:collapse;width:100%;" width="100%" border="1">      
						<thead><tr><th style="text-align: center;">'.ucwords($task).' #<br /></th>
							<th style="text-align: center;">'.ucwords($task).' Date<br /></th>
							<th style="text-align: center;">VIN#</th>
							<th style="text-align: center;">M/s Dealer Name</th>
							<th style="text-align: center;">Town</th>
						</tr></thead><tbody>';

			$fields = "failure_no, date_time, frame_vin_no, dealer_code, location_id";
			$table = "failure";
			$cond = "failure_no=".$id;

			$rows = singlerec($fields,$table,$cond);
			$arr = mysql_fetch_row($rows);

			$str .='<tr>
						<td style="text-align: center;">'.$arr[0].'</td>
						<td style="text-align: center;">'.$arr[1].'</td>
						<td style="text-align: center;">'.$arr[2].'</td>
						<td style="text-align: center;">'.singlefield("dealer_name","dealer","dealer_code=".$arr[3]).'</td>
						<td style="text-align: center;">'.singlefield("location_name","locations","location_id=".$arr[4]).'</td>
					</tr>
					<tr>
					<td colspan="5" style="padding:10px;">
					<table width="100%">
						<tr>
							<th style="text-align: center;">Parts Requested</th><th style="text-align: center;">Description</th><th width="10%" style="text-align: center;">Qty</th>
						</tr>';

			$str .=$str1.'</table></td></tr></tbody></table>';


				$str .= '<br/><p>Thanks and Regards,</p><div><span style="font-style: italic; font-weight: bold;">GladMinds, FMS team</span></div><p>&nbsp;</p>';

				if(mailTo($subject,$toEmail,$str,$ccEmail))
					$arr = array('status' => "1", 'message' => 'Success');			
				else
					$arr = array('status' => "0", 'message' => 'Failure. Please try again later.');

			echo json_encode($arr);

		}
		else{
			$arr = array('status' => "1", 'message' => 'Email Not Sent');
            echo json_encode($arr);
    	}
	}

/* ************************************************************* Edit Functions ******************************************************************/

	function listAllLocations_edit(){
		//Fetch Failure and Complaint List for that Employee
		$failureNumber = $_GET["failureNumber"];

		$fields = "exp_date_time, channel_name, channel_type_id, location_id";
		$cond = "failure_no=".$failureNumber;
		$table = "failure";

		$rows = singlerec($fields,$table,$cond);
		$row_edit = mysql_fetch_row($rows);


		$assignedLocation = $row_edit[3];
		$fields = "location_id,location_name";
		$table = "locations";

		$rows = selectrec($fields, $table,"active=1");
		$str = '[{"locations":[';
		foreach($rows as $row){ 
			$sel = ($row[0]==$assignedLocation)?"1":"0";
			$str .='{"location_id":"'.$row[0].'","location_name":"'.$row[1].'","selected":"'.$sel.'"},';
		}

		$str = substr($str,0,-1);

		$str .= '],"channels":'.listAllChannels($row_edit[2]).',"channel_name":"'.$row_edit[1].'","exp_date_time":"'.$row_edit[0].'"}]';

		echo $str;
	}

	function listAllLocations_edit1(){
		//Fetch Failure and Complaint List for that Employee
		$complaintNumber = $_GET["complaintNumber"];

		$fields = "location_id, emp_code";
		$cond = "complaint_no=".$complaintNumber;
		$table = "complaint";

		$rows = singlerec($fields,$table,$cond);
		$row_edit = mysql_fetch_row($rows);


		$assignedLocation = $row_edit[0];
		$fields = "location_id,location_name";
		$table = "locations";

		$rows = selectrec($fields, $table,"active=1");
		$str = '[{"emp_code":"'.$row_edit[1].'","locations":[';
		foreach($rows as $row){ 
			$sel = ($row[0]==$assignedLocation)?"1":"0";
			$str .='{"location_id":"'.$row[0].'","location_name":"'.$row[1].'","selected":"'.$sel.'"},';
		}

		$str = substr($str,0,-1);

		$str .= ']}]';

		echo $str;
	}

	function getCustomerDetails(){
		//Fetch Failure and Complaint List for that Employee
		$failureNumber = $_GET["failureNumber"];

		$fields = "cust_name, cust_address, cust_email, cust_mobile";

		$table = "failure";

		$rows = singlerec($fields, $table,"failure_no=".$failureNumber);
		$row = mysql_fetch_row($rows);

		$str ='{"cust_name" : "'.$row[0].'", "cust_address" : "'.parseString($row[1]).'", "cust_email" : "'.$row[2].'", "cust_mobile" : "'.$row[3].'"}';

		
		echo $str;
	}

	function getCustomerDetails1(){
		//Fetch Failure and Complaint List for that Employee
		$complaintNumber = $_GET["complaintNumber"];

		$fields = "cust_name, cust_address, cust_email, cust_mobile";

		$table = "complaint";

		$rows = singlerec($fields, $table,"complaint_no=".$complaintNumber);
		$row = mysql_fetch_row($rows);

		$str ='{"cust_name" : "'.$row[0].'", "cust_address" : "'.parseString($row[1]).'", "cust_email" : "'.$row[2].'", "cust_mobile" : "'.$row[3].'"}';

		
		echo $str;
	}

	function getVehicleDetails(){

		$failureNumber = $_GET["failureNumber"];
		$fields = "model,veh_reg_no,frame_vin_no,engine_no,date_of_sale,km_reading,warranty,paid";
		$table = "failure";

		$rows = singlerec($fields, $table,"failure_no=".$failureNumber);
		$row = mysql_fetch_row($rows);

		$modelNo = $row[0];
		$str ='{"veh_reg_no" : "'.$row[1].'", "frame_vin_no" : "'.$row[2].'", "engine_no" : "'.$row[3].'", "date_of_sale" : "'.$row[4].'", "km_reading" : "'.$row[5].'", "warranty" : "'.$row[6].'", "paid" : "'.$row[7].'",';

		$fields = "model_id,model_name";
		$table = "model";

		$rows = selectrec($fields, $table,"active=1");
		$str .= '"models":[';
		foreach($rows as $row){ 
			$sel = ($row[0]==$modelNo)?"1":"0";
			$str .='{"model_id":"'.$row[0].'","model_name":"'.$row[1].'","selected":"'.$sel.'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]}";

		echo $str;
	}

	function getVehicleDetails1(){

		$complaintNumber = $_GET["complaintNumber"];
		$fields = "model,veh_reg_no,frame_vin_no,engine_no,date_of_sale,km_reading,warranty,paid";
		$table = "complaint";

		$rows = singlerec($fields, $table,"complaint_no=".$complaintNumber);
		$row = mysql_fetch_row($rows);

		$modelNo = $row[0];
		$str ='{"veh_reg_no" : "'.$row[1].'", "frame_vin_no" : "'.$row[2].'", "engine_no" : "'.$row[3].'", "date_of_sale" : "'.$row[4].'", "km_reading" : "'.$row[5].'", "warranty" : "'.$row[6].'", "paid" : "'.$row[7].'",';

		$fields = "model_id,model_name";
		$table = "model";

		$rows = selectrec($fields, $table,"active=1");
		$str .= '"models":[';
		foreach($rows as $row){ 
			$sel = ($row[0]==$modelNo)?"1":"0";
			$str .='{"model_id":"'.$row[0].'","model_name":"'.$row[1].'","selected":"'.$sel.'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]}";

		echo $str;
	}


	function editVehicle(){
		
		$table = "failure";
		$cond = "`failure_no` = ".$_POST["failureNumber"];

		$paid = $warranty = 0;
		if($_POST["fr_txtrtype_edit"]=="1")
			$paid = 1;
		else
			$warranty = 1;


		$col_val = "`model` = '".htmlspecialchars($_POST['fr_txtModel_edit'],ENT_QUOTES)."',`veh_reg_no` = '".htmlspecialchars($_POST['fr_txtregno_edit'],ENT_QUOTES)."',`frame_vin_no` = '".htmlspecialchars($_POST['fr_txtVinno_edit'],ENT_QUOTES)."',`engine_no` = '".htmlspecialchars($_POST['fr_txtEngno_edit'],ENT_QUOTES)."',`date_of_sale` = '".htmlspecialchars($_POST['fr_txtDOP_edit'],ENT_QUOTES)."',`km_reading` = '".htmlspecialchars($_POST['fr_txtKMR_edit'],ENT_QUOTES)."',`warranty` = '".$warranty."',`paid` = '".$paid."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}

	function editVehicleComplaint(){
		
		$table = "complaint";
		$cond = "`complaint_no` = ".$_POST["complaintNumber"];

		$paid = $warranty = 0;
		if($_POST["cr_txtrtype_edit"]=="1")
			$paid = 1;
		else
			$warranty = 1;


		$col_val = "`model` = '".htmlspecialchars($_POST['cr_txtModel_edit'],ENT_QUOTES)."',`veh_reg_no` = '".htmlspecialchars($_POST['cr_txtregno_edit'],ENT_QUOTES)."',`frame_vin_no` = '".htmlspecialchars($_POST['cr_txtVinno_edit'],ENT_QUOTES)."',`engine_no` = '".htmlspecialchars($_POST['cr_txtEngno_edit'],ENT_QUOTES)."',`date_of_sale` = '".htmlspecialchars($_POST['cr_txtDOP_edit'],ENT_QUOTES)."',`km_reading` = '".htmlspecialchars($_POST['cr_txtKMR_edit'],ENT_QUOTES)."',`warranty` = '".$warranty."',`paid` = '".$paid."'";


		if(updaterecs($table,$col_val, $cond))
			$arr = array('status' => 1, 'message' => 'Success');			
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);
	}


	function listfailures(){

		$failureNumber = $_GET["failureNumber"];
		$str = "[{".categorynParts();

		$fields1 = "cat_id,customer_voice_id,actions,part_no,qty,slno";
		$table1 = "failure_details";

		$fields2 = "cat_id,customer_voice_others,actions,part_no,qty,slno";
		$table2 = "failure_details_others";

		$commonCond = "failure_id=".$failureNumber;

		$rows1 = selectrec($fields1, $table1,$commonCond);
		$rows2 = selectrec($fields2, $table2,$commonCond);

		foreach($rows1 as $key => $csm)
		{
			$rows1[$key]['flag'] = 1;
		}

		foreach($rows2 as $key => $csm)
		{
			$rows2[$key]['flag'] = 2;
		}


		$rows = array_merge($rows1,$rows2);

		//print_r($rows);

		$sorter = new FieldSorter('5');    
		usort($rows, array($sorter, "cmp")); 
		
		$str .=',"failuresList":[';

		foreach ($rows as $row) {
			$str .='{"cat_id":"'.$row[0].'","customer_voice_id":"'.$row[1].'","actions":"'.$row[2].'","part_no":"'.$row[3].'","qty":"'.$row[4].'","flag":"'.$row[5].'"},';
		}

		if(count($rows)>0)
		$str = substr($str,0,-1);

		$str .= "]}]";
		echo $str;
	}


	function listComplaints(){

		$complaintNumber = $_GET["complaintNumber"];
		$str = "[{".categorynParts();



		$fields = "cat_id,cat_name";
		$table = "category";

		$fields1 = "customer_voice_id,customer_voice";
		$table1 = "customer_voice";

		$rows = selectrec($fields, $table,"active=1");
		$str = '[{"categories":[';
		foreach($rows as $row){ 

			$str .='{"cat_id":"'.$row[0].'","cat_name":"'.$row[1].'","customer_voices":[';

			$voices = selectrec($fields1, $table1,"active=1 and cat_id=".$row[0]);
			$str1 = "";
			foreach($voices as $voice){ 
				$str1 .='{"customer_voice_id":"'.$voice[0].'","customer_voice":"'.$voice[1].'"},';
			}
			$str1 = substr($str1,0,-1);
			$str .=$str1.']},';
		}

		if(count($rows)>0)
			$str = substr($str,0,-1);

		$str .= '],';



		$fields1 = "cat_id,customer_voice_id,sl_no";
		$table1 = "complaint_details";

		$fields2 = "cat_id,customer_voice_others,sl_no";
		$table2 = "complaint_details_others";

		$commonCond = "complaint_no=".$complaintNumber;

		$rows1 = selectrec($fields1, $table1,$commonCond);
		$rows2 = selectrec($fields2, $table2,$commonCond);

		foreach($rows1 as $key => $csm)
		{
			$rows1[$key]['flag'] = 1;
		}

		foreach($rows2 as $key => $csm)
		{
			$rows2[$key]['flag'] = 2;
		}


		$rows = array_merge($rows1,$rows2);

		//print_r($rows);

		$sorter = new FieldSorter('2');    
		usort($rows, array($sorter, "cmp")); 
		
		$str .='"complaintsList":[';

		foreach ($rows as $row) {
			$str .='{"cat_id":"'.$row[0].'","customer_voice_id":"'.$row[1].'"},';
		}

		if(count($rows)>0)
		$str = substr($str,0,-1);

		$str .="]}]";
		echo $str;
	}

	function convert2Failure(){

		$complaintNumber = $_GET["complaintNumber"];

		$fields = "date_time,dealer_code,location_id,emp_code,cust_name,cust_address,cust_email,cust_mobile,model,veh_reg_no,frame_vin_no,engine_no,date_of_sale,km_reading,warranty,paid,photo_url,status";

		$table1 = "complaint";
		$table2 = "failure";

		$rows = singlerec($fields,$table1,"complaint_no=".$complaintNumber);
		$row = mysql_fetch_row($rows);

		$value = "'".$row[0]."',".$row[1].",".$row[2].",'".$row[3]."','".$row[4]."','".$row[5]."','".$row[6]."',".$row[7].",'".$row[8]."','".$row[9]."','".$row[10]."','".$row[11]."','".$row[12]."','".$row[13]."',".$row[14].",".$row[15].",'".$row[16]."',".$row[17];


		if(insertrec($table2,$fields,$value)){
			$failureID = mysql_insert_id();
			//Move actions data
            //echo $failureID;
			$newField = "cat_id,customer_voice_id";
			$rows = selectrec($newField,"complaint_details","complaint_no=".$complaintNumber);

			$newField1 = "cat_id,customer_voice_id,failure_id";
			foreach($rows as $row){ 
				$value = $row[0].",".$row[1].",".$failureID;
				insertrec("failure_details",$newField1,$value);
			}

			deleterec("complaint_details","complaint_no",$complaintNumber,"delete");
			

			//move actions others data
			$newField = "cat_id,customer_voice_others";
			$rows = selectrec($newField,"complaint_details_others","complaint_no=".$complaintNumber);

			$newField1 = "cat_id,customer_voice_others,failure_id";
			foreach($rows as $row){ 
				$value = $row[0].",'".$row[1]."',".$failureID;
				insertrec("failure_details_others",$newField1,$value);
			}

			deleterec("complaint_details_others","complaint_no",$complaintNumber,"delete");

    		//move actions taken data
			$newField = "com_action,com_responsibility";
			$rows = selectrec($newField,"complaint_actions_taken","complaint_no=".$complaintNumber);

			$newField1 = "action,failure_id";
			foreach($rows as $row){ 
				$value = "'".$row[0]."-".$row[1]."',".$failureID;
				insertrec("failure_actions_taken",$newField1,$value);
			}

			deleterec("complaint_actions_taken","complaint_no",$complaintNumber,"delete");


        	//move Pictures
			$newField = "picture_url";
			$rows = selectrec($newField,"complaint_pictures","complaint_no=".$complaintNumber);

			$newField1 = "picture_url,failure_id";
			foreach($rows as $row){ 
				$value = "'".$row[0]."',".$failureID;
				insertrec("failure_pictures",$newField1,$value);
                $fileURL = "http://gladminds.co/bajaj/fcr_mobile/be/";
                
                $fromURL = "pics_upload/complaint/".$complaintNumber."/";
                $toURL   = "pics_upload/failure/".$failureID."/";
                
if(file_exists($fromURL.$row[0])){                
    $folderPath = "pics_upload/failure/".$failureID;
    
    if (!file_exists($folderPath)) {
        mkdir($folderPath, 0777, true);
    }
    
    $file = $fromURL.$row[0];
    $newfile = $toURL.$row[0];
    
    if (!copy($file, $newfile)) {
       
    }
    else{
          //Remove the complaint file after copying
          //rmdir($fromURL.$row[0]);
    }
}
#                if (!file_exists($toURL)) {
#                    mkdir($toURL, 0777, true);
#                }
#                
#                echo "FailureID -->"."'".$toURL.$row[0]."'";
#                
#                if(file_exists($fromURL.$row[0])){
#                     $file = $fromURL.$row[0];
#                     $newfile = $toURL.$row[0];
#                     copy($file, $newfile);
#                }
			}
            
            
//Remove the Complaint Folder finally.
if(file_exists($fromURL))
    rrmdir($fromURL);

			deleterec("complaint_pictures","complaint_no",$complaintNumber,"delete");



			$arr = array('status' => 1, 'message' => 'Success');
			deleterec($table1,"complaint_no",$complaintNumber,"delete");
		}
		else
			$arr = array('status' => 0, 'message' => 'Failure');

		echo json_encode($arr);

	}


/* Other Functions */
	
	function categorynParts(){


		$fields = "cat_id,cat_name";
		$table = "category";

		$fields1 = "customer_voice_id,customer_voice";
		$table1 = "customer_voice";

		$rows = selectrec($fields, $table,"active=1");
		$str = '"categories":[';
		foreach($rows as $row){ 

			$str .='{"cat_id":"'.$row[0].'","cat_name":"'.$row[1].'","customer_voices":[';

			$voices = selectrec($fields1, $table1,"active=1 and cat_id=".$row[0]);
			$str1 = "";
			foreach($voices as $voice){ 
				$str1 .='{"customer_voice_id":"'.$voice[0].'","customer_voice":"'.$voice[1].'"},';
			}
			$str1 = substr($str1,0,-1);
			$str .=$str1.']},';
		}
		$str = substr($str,0,-1);

		$str .= '],"parts":[';

		$partFields = "part_id,part_code,part_desc";
		$partsTable = "parts";
		$partRows = selectrec($partFields, $partsTable,"active=1");

			$str2 = "";
			foreach($partRows as $partRow){ 
				$str_desc = $partRow[2];
				$str_desc = str_replace('"', "Inch", $str_desc);
				$str_desc = str_replace("\\n","",$str_desc);

				$str2 .='{"part_id":"'.$partRow[0].'","part_code":"'.htmlspecialchars($partRow[1],ENT_QUOTES).'","part_desc":"'.$str_desc.'"},';
			}
			$str2 = substr($str2,0,-1);
			$str .=$str2;


		$str .= ']';

		return $str;

	}


	function listAllChannels($assignedChannel=0){

		
		$fields = "channel_type_id,channel_type";
		$table = "channel_type";

		$rows = selectrec($fields, $table,"active=1");
		$str = "[";
		foreach($rows as $row){ 
			$sel = ($row[0]==$assignedChannel)?"1":"0";
			$str .='{"channel_type_id":"'.$row[0].'","channel_type":"'.$row[1].'","selected":"'.$sel.'"},';
		}
		$str = substr($str,0,-1);

		$str .= "]";

		return $str;
	}


/* ************************** Others ***********************************/

	function rand_passwd( $length = 8, $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' ) {
	    return substr( str_shuffle( $chars ), 0, $length );
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

	function passwordResetByEmail($userid){

	 	$table = "users";
	 	$cond = "ID=".$userid;
		$newPassword = rand_passwd();
		$fieldname	= "password";
		$newval = "'".md5($newPassword)."'";

		if(updaterec($table,$fieldname,$newval,$cond)){

		 	$fields = "username,name,email";
			$rows = singlerec($fields,$table,$cond);
			$row = mysql_fetch_row($rows);

		    $message = "Your password reset link send to your e-mail address.";
		    $to=$row[2];
		    $subject="Total Admin - Password reset";
		    $from = 'no_reply@gladminds.co';
		    $rPass = md5(time());

	        $body='<span style="font-family:arial,verdana">Hi '.$row[1].', <br/> <br/>Your Username is: '.$row[0].' <br><br>Your password has been reset to: <b>'.$newPassword."</b></span><br/><br/>Regards,<br/>Bajaj Admin.";

		    $headers = "From: " . strip_tags($from) . "\r\n";
		    $headers .= "Reply-To: ". strip_tags($from) . "\r\n";
		    $headers .= "MIME-Version: 1.0\r\n";
		    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	        $headers .= "X-Mailer: PHP/" . phpversion();

			//echo $body;
	     	if(mail($to,$subject,$body,$headers))
	     		$arr = array('status' => 1, 'message' => 'Password Reset Successful.'.$to);
	     	else
	     		$arr = array('status' => 0, 'message' => 'Password Reset Un-Successful.');

			echo json_encode($arr);

		}
	}

	function mailTo($subject,$to,$body,$cc=""){

		$from_email = "admin@gladminds.co";

		$headers = "From: " . strip_tags($from_email) . "\r\n";
		$headers .= "Reply-To: ". strip_tags($from_email) . "\r\n";
		if($cc!="")
			$headers .= 'Cc: '.$cc."\r\n";

		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


		if(mail($to,$subject,$body,$headers))
		 	return true;
		 else
		 	return false;

		return true;

	}


	function parseString($string) {
	    $string = str_replace("\\", "\\\\", $string);
	    $string = str_replace('/', "\\/", $string);
	    $string = str_replace('"', "\\".'"', $string);
	    $string = str_replace("\b", "\\b", $string);
	    $string = str_replace("\t", "\\t", $string);
	    $string = str_replace("\n", "\\n", $string);
	    $string = str_replace("\f", "\\f", $string);
	    $string = str_replace("\r", "\\r", $string);
	    $string = str_replace("\u", "\\u", $string);
	    return $string;
    }

  //Sort an Array based on a field
 class FieldSorter {
    public $field;

    function __construct($field) {
        $this->field = $field;
    }

    function cmp($a, $b) {
        if ($a[$this->field] == $b[$this->field]) return 0;
        return ($a[$this->field] > $b[$this->field]) ? 1 : -1;
    }
}

function rrmdir($dir) { 
   if (is_dir($dir)) { 
     $objects = scandir($dir); 
     foreach ($objects as $object) { 
       if ($object != "." && $object != "..") { 
         if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object); 
       } 
     } 
     reset($objects); 
     rmdir($dir); 
   } 
} 

?>