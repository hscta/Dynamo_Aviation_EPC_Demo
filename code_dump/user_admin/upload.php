<?php


// $allowedExts = array("gif", "jpeg", "jpg", "png");

// echo "dd". $_FILES["myfile"]["type"];

// $temp = explode(".", $_FILES["myfile"]["name"]);
// $extension = end($temp);

// if (($_FILES["myfile"]["type"] == "image/gif") || ($_FILES["myfile"]["type"] == "image/jpeg") 
// 	|| ($_FILES["myfile"]["type"] == "image/jpg") || ($_FILES["myfile"]["type"] == "image/pjpeg") 
// 	|| ($_FILES["myfile"]["type"] == "image/x-png") || ($_FILES["myfile"]["type"] == "image/png"))
// {   
// 	if ($_FILES["myfile"]["error"] > 0) {
//     	echo "Return Code: " . $_FILES["myfile"]["error"] . "<br>";
//   	} else {
// 	    echo "Upload: " . $_FILES["myfile"]["name"] . "<br>";
// 	    echo "Type: " . $_FILES["myfile"]["type"] . "<br>";
// 	    echo "Size: " . ($_FILES["myfile"]["size"] / 1024) . " kB<br>";
// 	    echo "Temp file: " . $_FILES["myfile"]["tmp_name"] . "<br>";
// 	    if (file_exists("../img/notice_board/" . $_FILES["myfile"]["name"])) {
// 	      echo $_FILES["myfile"]["name"] . " already exists. ";
// 	    } else {
// 	      move_uploaded_file($_FILES["myfile"]["tmp_name"],
// 	      "../img/notice_board/" . $_FILES["myfile"]["name"]);
// 	      echo "Stored in: " . "../img/notice_board/" . $_FILES["myfile"]["name"];
// 	    }
//   	}
// } else {
//   	echo "Invalid file";
// }

include "../inc/dbconn.php";
include "../inc/function.php";


$output_dir = "../img/notice_board/";


if(isset($_FILES["myfile"]))
{
	//Filter the file types , if you want.
	if ($_FILES["myfile"]["error"] > 0)
	{
	  echo "Error: " . $_FILES["myfile"]["error"] . "<br>";
	}
	else
	{
		//move the uploaded file to uploads folder;
		$fileURL = $output_dir. time()."_".$_FILES["myfile"]["name"];
		$notice_desc = htmlspecialchars($_POST["notice_desc"],ENT_QUOTES);
    	move_uploaded_file($_FILES["myfile"]["tmp_name"],$fileURL);
    

    	$table = "noticeboards";

	 	$fields = "`url`,`notice_desc`";

	 	$values = "'".$fileURL."','".$notice_desc."'";


		if(insertrec($table,$fields,$values))

			$arr = array('status' => 1, 'message' => 'Success');
			
		else
			$arr = array('status' => 0, 'message' => 'Upload Failure');
			

		//echo json_encode($arr);
   	 	echo "Success. Uploaded File :".$_FILES["myfile"]["name"];
	}

}


?>