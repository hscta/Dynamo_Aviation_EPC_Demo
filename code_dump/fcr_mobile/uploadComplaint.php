<?php
session_start();
//mail Settings

include "be/inc/dbconn.php";
include "be/inc/function.php";



// A list of permitted file extensions
$allowed = array('png', 'jpg', 'gif','zip');
$complaintNumber = $_POST["complaintNumber"];

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}
	$timestamp      = time(); //timestamp
	$filename = $timestamp."_".$_FILES['upl']['name'];

	$folderPath = 'be/pics_upload/complaint/'.$complaintNumber;

if (!file_exists($folderPath)) {
    mkdir($folderPath, 0777, true);
}


	if(move_uploaded_file($_FILES['upl']['tmp_name'], $folderPath."/".$filename)){

		$table = "complaint_pictures";
		$fields = "picture_url,complaint_no";
		$values = "'".$filename."',".$complaintNumber;


		if(insertrec($table,$fields,$values))
			echo '{"status":"success"}';
		exit;
	}
}

//echo '{"status":"error"}';
//exit;