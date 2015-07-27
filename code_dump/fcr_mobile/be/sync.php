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
    case 'complaint':
		complaint();
		break;
    case 'complaint_actions_taken':
		complaint_actions_taken();
		break;	
    case 'complaint_details':
		complaint_details();
		break;
    case 'complaint_details_others':
		complaint_details_others();
		break;
    case 'complaint_pictures':
		complaint_pictures();
		break;
	case 'complaint_audios':
		complaint_audios();
		break;

	case 'failure':
		failure();
		break;
	case 'failure_actions_taken':
		failure_actions_taken();
		break;
	case 'failure_details':
		failure_details();
		break;
	case 'failure_details_others':
		failure_details_others();
		break;
	case 'failure_pictures':
		failure_pictures();
		break;
	case 'failure_audios':
		failure_audios();
		break;
	case 'upload_files':
		upload_files();
		break;

}
//******************************************* Complaint Section Start **************************************************************
	function complaint(){

		$updated_by		= $_POST['emp_code'];

		$complaint_nos 	= $_POST["complaint_no"];
		$date_time 		= $_POST["date_time"];
		$dealer_code 	= $_POST["dealer_code"];
		$location_id 	= $_POST["location_id"];
		$emp_code 		= $_POST["emp_code"];
		$cust_name 		= $_POST["cust_name"];
		$cust_address 	= $_POST["cust_address"];
		$cust_email 	= $_POST["cust_email"];
		$cust_mobile 	= $_POST["cust_mobile"];
		$model 			= $_POST["model"];
		$veh_reg_no 	= $_POST["veh_reg_no"];
		$frame_vin_no 	= $_POST["frame_vin_no"];
		$engine_no 		= $_POST["engine_no"];
		$date_of_sale 	= $_POST["date_of_sale"];
		$km_reading 	= $_POST["km_reading"];
		$warranty 		= $_POST["warranty"];
		$paid 			= $_POST["paid"];
		$photo_url 		= $_POST["photo_url"];
		$status 		= $_POST["status"];
		$active 		= $_POST["active"];
		$job_completed_date 		= $_POST["job_completed_date"];


		// echo "aiaia".$job_completed_date;

		$count = 0;

		$table = "complaint";


		foreach ($complaint_nos as $complaint_no) {

			$i_complaint_no  	= ($complaint_no=="")?"0":$complaint_no;
			$i_date_time  		= ($date_time[$count]=="")?"0":$date_time[$count];
			$i_dealer_code  	= ($dealer_code[$count]=="")?"0":$dealer_code[$count];
			$i_location_id  	= ($location_id[$count]=="")?"0":$location_id[$count];

			$i_cust_name  		= ($cust_name[$count]=="")?"0":$cust_name[$count];
			$i_cust_address  	= ($cust_address[$count]=="")?"0":$cust_address[$count];
			$i_cust_email  		= ($cust_email[$count]=="")?"0":$cust_email[$count];
			$i_cust_mobile  	= ($cust_mobile[$count]=="")?"0":$cust_mobile[$count];
			$i_model  			= ($model[$count]=="")?"0":$model[$count];
			$i_veh_reg_no  		= ($veh_reg_no[$count]=="")?"0":$veh_reg_no[$count];
			$i_frame_vin_no  	= ($frame_vin_no[$count]=="")?"0":$frame_vin_no[$count];
			$i_engine_no  		= ($engine_no[$count]=="")?"0":$engine_no[$count];
			$i_date_of_sale  	= ($date_of_sale[$count]=="")?"0":$date_of_sale[$count];
			$i_km_reading  		= ($km_reading[$count]=="")?"0":$km_reading[$count];
			$i_warranty  		= ($warranty[$count]=="")?"0":$warranty[$count];
			$i_paid  			= ($paid[$count]=="")?"0":$paid[$count];
			$i_photo_url  		= ($photo_url[$count]=="")?"0":$photo_url[$count];
			$i_status  			= ($status[$count]=="")?"0":$status[$count];
			$i_active  			= ($active[$count]=="")?"0":$active[$count];
			$job_completed_date = ($job_completed_date[$count]=="")?"0":$job_completed_date[$count];

			$fields = "complaint_no,date_time,dealer_code,location_id,emp_code,cust_name,cust_address,cust_email,cust_mobile,model,veh_reg_no,frame_vin_no,engine_no,date_of_sale,km_reading,warranty,paid,photo_url,status,active,updated_by,job_completed_date";

			$str =  $i_complaint_no.",'".$i_date_time."',".$i_dealer_code.",".$i_location_id.",'".$updated_by."','".$i_cust_name."','".$i_cust_address."','".$i_cust_email."',".$i_cust_mobile.",'".$i_model."','".$i_veh_reg_no."','".$i_frame_vin_no."','".$i_engine_no."','".$i_date_of_sale."',".$i_km_reading.",".$i_warranty.",".$i_paid.",'".$i_photo_url."',".$i_status.",".$i_active.",'".$updated_by."','".$job_completed_date."'";

			$vals = explode(",", $str);
			$cols = explode(",",$fields);
			$compField = "complaint_no";
			$compCond = "complaint_no=".$i_complaint_no." and updated_by='".$updated_by."'";


			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);


			$count++;

		}

		echo json_encode($arr);
	}

	function complaint_actions_taken(){

		$updated_by=$_POST['emp_code'];

		$com_actions_ids	= $_POST['com_actions_id'];
		$customer_voice		= $_POST['customer_voice'];
		$com_action 		= $_POST['com_action'];
		$com_responsibility	= $_POST['com_responsibility'];
		$complaint_no		= $_POST['complaint_no'];
		$updated_by			= $_POST['emp_code'];

		$count = 0;

		$table = "complaint_actions_taken";

		foreach ($com_actions_ids as $com_actions_id) {

			$actions_id = ($com_actions_id=="")?"0":$com_actions_id;
			$voice = $customer_voice[$count];
			$action = $com_action[$count];
			$responsibility = $com_responsibility[$count];
			$comp_no = ($complaint_no[$count]=="")?"0":$complaint_no[$count];

			$voice  = (htmlspecialchars($voice,ENT_QUOTES)=="")?"0":htmlspecialchars($voice,ENT_QUOTES);
			$action = (htmlspecialchars($action,ENT_QUOTES)=="")?"0":htmlspecialchars($action,ENT_QUOTES);
			$responsibility = (htmlspecialchars($responsibility,ENT_QUOTES)=="")?"0":htmlspecialchars($responsibility,ENT_QUOTES);


			$fields = "com_actions_id, customer_voice, com_action, com_responsibility, complaint_no, updated_by";

			$str = $actions_id.",'".$voice."','".$action."','".$responsibility."',".$comp_no.",'".$updated_by."'";

			$vals = explode(",", $str);
			$cols = explode(",",$fields);
			$compField = "com_actions_id";
			$compCond = "com_actions_id=".$actions_id." and updated_by='".$updated_by."'";


			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);




			// if(singlefield("com_actions_id",$table,"com_actions_id=".$com_actions_id." and updated_by='".$updated_by."'")){

			// 	$cond = "com_actions_id=".$com_actions_id." and updated_by='".$updated_by."'";

			// 	$col_val = "com_actions_id = ".$i_complaint_no.", customer_voice = '".$voice."', com_action = '".$action."', com_responsibility = '".$responsibility."', complaint_no = ".$comp_no.", updated_by = '".$updated_by."'";
				
			// 	if(updaterecs($table,$col_val, $cond)){
			// 	 	$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
			// 	}
			// 	else{
			// 		$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
			// 	}



			// }
			// else{

			// 	$str .= "(".$actions_id.",'".$voice."','".$action."','".$responsibility."',".$comp_no.",'".$updated_by."')";

			// 	$values = $str;

			// 	$fields = "com_actions_id, customer_voice, com_action, com_responsibility, complaint_no, updated_by";


			// 	if(insertrec_multiple($table,$fields,$values)){
			// 		$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
			// 	}
			// 	else{
			// 		$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
			// 	}


			// }

		



			$count++;
		}
		echo json_encode($arr);
	}

	//Error
	function complaint_details(){

		$updated_by			= $_POST['emp_code'];

		$com_ids			= $_POST['com_id'];
		$cat_id				= $_POST['cat_id'];
		$customer_voice_id	= $_POST['customer_voice_id'];
		$complaint_no		= $_POST['complaint_no'];
		$sl_no				= $_POST['sl_no'];

		$count = 0;

		foreach ($com_ids as $com_id) {

			$i_com_id 			= ($com_id=="")?"0":$com_id;
			$i_cat_id 			= ($cat_id[$count]=="")?"0":$cat_id[$count];
			$i_customer_voice_id = ($customer_voice_id[$count]=="")?"0":$customer_voice_id[$count];
			$i_complaint_no 	= ($complaint_no[$count]=="")?"0":$complaint_no[$count];
			$i_up_by 			= ($updated_by=="")?"0":$updated_by;
			$sl_no 				= ($sl_no[$count]=="")?"0":$sl_no[$count];

			$fields = "com_id, cat_id, customer_voice_id, complaint_no, sl_no, updated_by";
			$str = $i_com_id.",".$i_cat_id.",".$i_customer_voice_id.",".$i_complaint_no.",".$sl_no.",'".$i_up_by."'";

			$table = "complaint_details";

			$vals = explode(",", $str);
			$cols = explode(",",$fields);
			$compField = "com_id";
			$compCond = "com_id=".$i_com_id." and updated_by='".$updated_by."'";


			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);

			$count++;
		}


		echo json_encode($arr);
	}

	function complaint_details_others(){

		$updated_by			= $_POST['emp_code'];

		$com_details_other_ids	= $_POST['com_details_other_id'];
		$cat_id					= $_POST['cat_id'];
		$customer_voice_others	= $_POST['customer_voice_others'];
		$complaint_no		= $_POST['complaint_no'];
		$sl_no				= $_POST['sl_no'];

		$count = 0;

		foreach ($com_details_other_ids as $com_details_other_id) {

			$i_com_id 			= ($com_details_other_id=="")?"0":$com_details_other_id;
			$i_cat_id 			= ($cat_id[$count]=="")?"0":$cat_id[$count];
			$i_customer_voice_others = ($customer_voice_others[$count]=="")?"0":$customer_voice_others[$count];
			$i_complaint_no 	= ($complaint_no[$count]=="")?"0":$complaint_no[$count];
			$i_sl_no 			= ($sl_no[$count]=="")?"0":$sl_no[$count];
			

			$str = $i_com_id.",".$i_cat_id.",".$i_customer_voice_others.",".$i_complaint_no.",".$i_sl_no.",'".$updated_by."'";
			$fields = "com_details_other_id, cat_id, customer_voice_others, complaint_no, sl_no, updated_by";
			$values = $str;

			$table = "complaint_details_others";



			$vals = explode(",", $str);
			$cols = explode(",",$fields);
			$compField = "com_details_other_id";
			$compCond = "com_details_other_id=".$i_com_id." and updated_by='".$updated_by."'";

			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);

			$count++;
		}

		echo json_encode($arr);
	}

	//Update Error
	function complaint_pictures(){

		$updated_by			= $_POST['emp_code'];

		$picture_ids = $_POST["picture_id"];
		$picture_url = $_POST["picture_url"];
		$complaint_no = $_POST["complaint_no"];

		$count = 0;

		foreach ($picture_ids as $picture_id) {

			$p_id = ($picture_id=="")?"0":$picture_id;
			$p_url = ($picture_url[$count]=="")?"0":$picture_url[$count];
			$c_no = ($complaint_no[$count]=="")?"0":$complaint_no[$count];


		 	$table = "complaint_pictures";
		 	
		 	$str = $p_id.",'".$p_url."',".$c_no.",'".$i_up_by."'";
		 	$fields = "picture_id, picture_url, complaint_no, updated_by";

			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "picture_id";
			$compCond = "picture_id=".$p_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);



			// if(singlefield("com_details_other_id",$table,"com_details_other_id=".$i_com_id." and updated_by='".$updated_by."'")){

			// 	$cond = "com_details_other_id=".$i_com_id." and updated_by='".$updated_by."'";

			// 	$col_val = "com_details_other_id = ".$i_com_id.", cat_id = '".$i_cat_id."', customer_voice_others = '".$i_customer_voice_others."', complaint_no = '".$i_complaint_no."', sl_no = ".$sl_no.", updated_by = '".$updated_by."'";
				
			// 	if(updaterecs($table,$col_val, $cond)){
			// 	 	$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
			// 	}
			// 	else{
			// 		$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
			// 	}

			// }
			// else{

			// 	$fields = "picture_id, picture_url, complaint_no, updated_by";

			// 	if(insertrec_multiple($table,$fields,$values)){

			// 		$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
					
			// 	}
			// 	else{
			// 		$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
					
			// 	}
			// }

			$count++;
		}

		echo json_encode($arr);
	}

	//Error
	function complaint_audios(){

		$updated_by=$_POST['emp_code'];

		$audio_ids= $_POST['audio_id'];
		$audio_url	= $_POST['audio_url'];
		$complaint_no 	= $_POST['complaint_no'];


		$count = 0;

		foreach ($audio_ids as $audio_id) {

			$i_audio_id = ($audio_id=="")?"0":$audio_id;
			$i_audio_url = (htmlspecialchars($audio_url[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($audio_url[$count],ENT_QUOTES);
			$i_complaint_no = ($complaint_no[$count]=="")?"0":$complaint_no[$count];


			$str = $i_audio_id.",'".$i_audio_url."',".$i_complaint_no.",'".$updated_by."'";

			$values = substr($str,0,-1);

			$table = "complaint_audios";
			$fields = "audio_id, audio_url, complaint_no, updated_by";




			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "audio_id";
			$compCond = "audio_id=".$i_audio_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);






			$count++;
		}
		echo json_encode($arr);
	}


//******************************************* Failure Section Start **************************************************************

	function failure(){

		$updated_by		= $_POST['emp_code'];


		$failure_nos 	= $_POST["failure_no"];
		$date_time 		= $_POST["date_time"];
		$exp_date_time 	= $_POST["exp_date_time"];
		$dealer_code 	= $_POST["dealer_code"];
		$location_id 	= $_POST["location_id"];
		$emp_code 		= $_POST["emp_code"];
		$cust_name 		= $_POST["cust_name"];
		$cust_address 	= $_POST["cust_address"];
		$cust_email 	= $_POST["cust_email"];
		$cust_mobile 	= $_POST["cust_mobile"];
		$model 			= $_POST["model"];
		$veh_reg_no 	= $_POST["veh_reg_no"];
		$frame_vin_no 	= $_POST["frame_vin_no"];
		$engine_no 		= $_POST["engine_no"];
		$date_of_sale 	= $_POST["date_of_sale"];
		$km_reading 	= $_POST["km_reading"];
		$warranty 		= $_POST["warranty"];
		$paid 			= $_POST["paid"];
		$photo_url 		= $_POST["photo_url"];
		$channel_type_id = $_POST["channel_type_id"];
		$channel_name 			= $_POST["channel_name"];
		$status 				= $_POST["status"];
		$dealer_asm_remark 		= $_POST["dealer_asm_remark"];
		$vehicle_delevered_date = $_POST["vehicle_delevered_date"];
		$active 				= $_POST["active"];

		$job_completed_date 	= $_POST["job_complete_date"];

		$count = 0;

			echo "hi". $_POST["job_complete_date"][0];

		foreach ($failure_nos as $failure_no) {

			$i_failure_no 		= ($failure_no=="")?"0":$failure_no;
			$i_date_time 		= ($date_time[$count]=="")?"0":$date_time[$count];
			$i_exp_date_time 	= ($exp_date_time[$count]=="")?"0":$exp_date_time[$count];

			$i_dealer_code 		= ($dealer_code[$count]=="")?"0":$dealer_code[$count];

			$i_location_id 		= ($location_id[$count]=="")?"0":$location_id[$count];
			$i_emp_code 		= $_POST['emp_code'];
			$i_cust_name 		= ($cust_name[$count]=="")?"0":$cust_name[$count];
			$i_cust_address 	= ($cust_address[$count]=="")?"0":$cust_address[$count];
			$i_cust_email 		= ($cust_email[$count]=="")?"0":$cust_email[$count];
			$i_cust_mobile 		= ($cust_mobile[$count]=="")?"0":$cust_mobile[$count];
			$i_model 			= ($model[$count]=="")?"0":$model[$count];
			$i_veh_reg_no 		= ($veh_reg_no[$count]=="")?"0":$veh_reg_no[$count];
			$i_frame_vin_no 	= ($frame_vin_no[$count]=="")?"0":$frame_vin_no[$count];
			$i_engine_no 		= ($engine_no[$count]=="")?"0":$engine_no[$count];
			$i_date_of_sale 	= ($date_of_sale[$count]=="")?"0":$date_of_sale[$count];
			$i_km_reading 		= ($km_reading[$count]=="")?"0":$km_reading[$count];

			$i_warranty 		= ($warranty[$count]=="")?"0":$warranty[$count];
			$i_paid 			= ($paid[$count]=="")?"0":$paid[$count];


			$i_photo_url 		= ($photo_url[$count]=="")?"0":$photo_url[$count];
			$i_channel_type_id 	= ($channel_type_id[$count]=="")?"0":$channel_type_id[$count];
			$i_channel_name 	= ($channel_name[$count]=="")?"0":$channel_name[$count];
			$i_status 			= ($status[$count]=="")?"0":$status[$count];
			$i_dealer_asm_remark = ($dealer_asm_remark[$count]=="")?"0":$dealer_asm_remark[$count];



			$i_job_completed_date= ($job_completed_date[$count]=="")?"0":$job_completed_date[$count];

			$i_vehicle_delevered_date = ($vehicle_delevered_date[$count]=="")?"0":$vehicle_delevered_date[$count];
			$i_active 			= ($active[$count]=="")?"0":$active[$count];
			

			$str = $i_failure_no.",'".$i_date_time."','".$i_exp_date_time."',".$i_dealer_code.",".$i_location_id.",'".$i_emp_code."','".$i_cust_name."','".$i_cust_address."','".$i_cust_email."',".$i_cust_mobile.",'".$i_model."','".$i_veh_reg_no."','".$i_frame_vin_no."','".$i_engine_no."','".$i_date_of_sale."',".$i_km_reading.",".$i_warranty.",".$i_paid.",'".$i_photo_url."',".$i_channel_type_id.",'".$i_channel_name."',".$i_status.",'".$i_dealer_asm_remark."','".$i_job_completed_date."','".$i_vehicle_delevered_date."',".$i_active.",'".$updated_by."'";

			$table = "failure";
			$fields = "failure_no, date_time, exp_date_time, dealer_code, location_id, emp_code, cust_name, cust_address, cust_email, cust_mobile, model, veh_reg_no, frame_vin_no, engine_no, date_of_sale, km_reading, warranty, paid, photo_url, channel_type_id, channel_name, status, dealer_asm_remark, job_completed_date, vehicle_delevered_date, active, updated_by";


			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "failure_no";
			$compCond = "failure_no=".$i_failure_no." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);

			$count++;
		}
		
		//echo "hi";
		echo json_encode($arr);
	}

	function failure_actions_taken(){

		$updated_by=$_POST['emp_code'];

		$failure_action_taken_ids= $_POST['failure_action_taken_id'];
		$failure_action			 = $_POST['failure_action'];
		$failure_id 			 = $_POST['failure_id'];


		$count = 0;

		foreach ($failure_action_taken_ids as $failure_action_taken_id) {

			$i_fa_taken_id = $failure_action_taken_id;
			$i_fa_action = htmlspecialchars($failure_action[$count],ENT_QUOTES);
			$i_fa_id = $failure_id[$count];


			$str = $i_fa_taken_id.",'".$i_fa_action."',".$i_fa_id.",'".$updated_by."'";

			$values = substr($str,0,-1);

			$table = "failure_actions_taken";
			$fields = "failure_action_taken_id, action, failure_id, updated_by";



			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "failure_action_taken_id";
			$compCond = "failure_action_taken_id=".$i_fa_taken_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);


			$count++;
		}
		echo json_encode($arr);
	}

	function failure_details(){

		$updated_by=$_POST['emp_code'];


		$failure_details_ids  = $_POST["failure_details_id"];
		$cat_id  = $_POST["cat_id"];
		$customer_voice_id  = $_POST["customer_voice_id"];
		$failure_actions  = $_POST["failure_actions"];
		$part_no  = $_POST["part_no"];
		$qty  = $_POST["qty"];
		$failure_id  = $_POST["failure_id"];
		$slno  = $_POST["slno"];

		$count = 0;
		foreach ($failure_details_ids as $failure_details_id) {

			$i_failure_details_id  = ($failure_details_id=="")?"0":$failure_details_id;
			$i_cat_id  = ($cat_id[$count]=="")?"0":$cat_id[$count];
			$i_customer_voice_id  = ($customer_voice_id[$count]=="")?"0":$customer_voice_id[$count];
			$i_failure_actions  = (htmlspecialchars($failure_actions[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($failure_actions[$count],ENT_QUOTES);
			$i_part_no  = ($part_no[$count]=="")?"0":$part_no[$count];
			$i_qty  = ($qty[$count]=="")?"0":$qty[$count];
			$i_failure_id  = ($failure_id[$count]=="")?"0":$failure_id[$count];
			$i_slno  = ($slno[$count]=="")?"0":$slno[$count];

			$str = $i_failure_details_id.",".$i_cat_id.",".$i_customer_voice_id.",'".$i_failure_actions."',".$i_part_no.",".$i_qty.",".$i_failure_id.",".$i_slno.",'".$updated_by."'";
			

			$table = "failure_details";

			$fields = "failure_details_id, cat_id, customer_voice_id, actions, part_no, qty, failure_id, slno, updated_by";

			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "failure_details_id";
			$compCond = "failure_details_id=".$i_failure_details_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);

			$count++;
		}


		echo json_encode($arr);
	}

	function failure_details_others(){

		$updated_by=$_POST['emp_code'];


		$failure_details_ids  = $_POST["failure_details_others_id"];
		$cat_id  = $_POST["cat_id"];
		$customer_voice_others  = $_POST["customer_voice_others"];
		$failure_actions  = $_POST["failure_actions"];
		$part_no  = $_POST["part_no"];
		$qty  = $_POST["qty"];
		$failure_id  = $_POST["failure_id"];
		$slno  = $_POST["slno"];

		$count = 0;

		foreach ($failure_details_ids as $failure_details_id) {



			$i_failure_details_id  = ($failure_details_id=="")?"0":$failure_details_id;
			$i_cat_id  = ($cat_id[$count]=="")?"0":$cat_id[$count];
			$i_customer_voice_others  = (htmlspecialchars($customer_voice_others[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($customer_voice_others[$count],ENT_QUOTES);
			$i_failure_actions  = (htmlspecialchars($failure_actions[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($failure_actions[$count],ENT_QUOTES);
			$i_part_no  = ($part_no[$count]=="")?"0":$part_no[$count];
			$i_qty  = ($qty[$count]=="")?"0":$qty[$count];
			$i_failure_id  = ($failure_id[$count]=="")?"0":$failure_id[$count];
			$i_slno  = ($slno[$count]=="")?"0":$slno[$count];

			$values = $i_failure_details_id.",".$i_cat_id.",'".$i_customer_voice_others."','".$i_failure_actions."',".$i_part_no.",".$i_qty.",".$i_failure_id.",".$i_slno.",'".$updated_by."'";

			$table = "failure_details_others";
			$fields = "failure_details_others_id, cat_id, customer_voice_others, actions, part_no, qty, failure_id, slno, updated_by";


			$cols = explode(",", $fields);
			$vals = explode(",", $values);

			$compField = "failure_details_others_id";
			$compCond = "failure_details_others_id=".$i_failure_details_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);

			$count++;
		}

		echo json_encode($arr);
	}

	function failure_pictures(){

		$updated_by=$_POST['emp_code'];

		$picture_ids= $_POST['picture_id'];
		$picture_url	= $_POST['picture_url'];
		$failure_id 	= $_POST['failure_id'];


		$count = 0;

		foreach ($picture_ids as $picture_id) {

			$i_picture_id = ($picture_id=="")?"0":$picture_id;
			$i_picture_url = (htmlspecialchars($picture_url[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($picture_url[$count],ENT_QUOTES);
			$i_fa_id = ($failure_id[$count]=="")?"0":$failure_id[$count];


			$str = $i_picture_id.",'".$i_picture_url."',".$i_fa_id.",'".$updated_by."'";

			$values = substr($str,0,-1);

			$table = "failure_pictures";


			$fields = "picture_id, picture_url, failure_id, updated_by";

			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "picture_id";
			$compCond = "picture_id=".$i_failure_details_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);


			$count++;
		}
		echo json_encode($arr);
	}

	function failure_audios(){

		$updated_by=$_POST['emp_code'];

		$audio_ids= $_POST['audio_id'];
		$audio_url	= $_POST['audio_url'];
		$failure_id 	= $_POST['failure_id'];


		$count = 0;

		foreach ($audio_ids as $audio_id) {

			$i_audio_id = ($audio_id=="")?"0":$audio_id;
			$i_audio_url = (htmlspecialchars($audio_url[$count],ENT_QUOTES)=="")?"0":htmlspecialchars($audio_url[$count],ENT_QUOTES);
			$i_fa_id = ($failure_id[$count]=="")?"0":$failure_id[$count];


			$str = $i_audio_id.",'".$i_audio_url."',".$i_fa_id.",'".$updated_by."'";

			$values = substr($str,0,-1);

			$table = "failure_audios";
			$fields = "audio_id, audio_url, failure_id, updated_by";

			$values = substr($str,0,-1);

			$cols = explode(",", $fields);
			$vals = explode(",", $str);

			$compField = "audio_id";
			$compCond = "audio_id=".$i_audio_id." and updated_by='".$updated_by."'";
			
			$arr = insertUpdate($table,$cols,$vals,$compField,$compCond);



			$count++;
		}

		echo json_encode($arr);
	}

	function upload_files(){

		$requestType = $_POST["request_type"];//Failure or Complaint
		$emp_code = $_POST["emp_code"]; // Employee Code

		$ftype = $_POST["file_type"]; //File Type, Either pic or audio


		$target_path = $ftype."s_upload/".$requestType."/".$emp_code."/";

		if (createPath($target_path)) {
		    mkdir($target_path, 0777, true);
		}




		for($i=0; $i<count($_FILES['files_to_upload']['name']); $i++){

		    $ext = explode('.', basename( $_FILES['files_to_upload']['name'][$i]));
		    
			$target_file = $target_path . basename($_FILES["files_to_upload"]["name"]);

		    if(move_uploaded_file($_FILES['files_to_upload']['tmp_name'][$i], $target_file)) {
		        echo "The file has been uploaded successfully <br />";
		    } else{
		        echo "There was an error uploading the file, please try again! <br />";
		    }
		}
	}


	//Other Functions
	/** 
	 * recursively create a long directory path
	 */
	function createPath($path) {
	    if (is_dir($path)) return true;
	    $prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
	    $return = createPath($prev_path);
	    return ($return && is_writable($prev_path)) ? mkdir($path) : false;
	}


	function insertUpdate($table,$cols,$vals,$compField,$compCond){



			if(singlefield($compField,$table,$compCond)){
				// echo $compField.",".$compCond;

				$col_val = arrayToQuery($cols,$vals);
				
				if(updaterecs($table,$col_val, $compCond))
				 	$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
				else
					$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
				
			}
			else{
				
				$fields = rtrim(implode(',', $cols), ',');
				$vals = rtrim(implode(',', $vals), ',');

				if(insertrec($table,$fields,$vals))
					$arr = array('status' => 1, 'message' => 'Sync Success', 'sync_time' => date("d/m/Y h:i:sa"));
				else
					$arr = array('status' => 0, 'message' => 'Sync Failure. Please try again');
					
			}

			return $arr;
	}

	function arrayToQuery($array_1,$array_2){
		$str="";
		$l=sizeof($array_1);
		for ($x = 0; $x <$l ; $x++) {
			$str.= $array_1[$x]." = ".$array_2[$x].",";
		} 
		$result =rtrim($str,',');
		return $result;
	}


?>