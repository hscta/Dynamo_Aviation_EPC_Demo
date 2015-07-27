<?php

include "../inc/dbconn.php";
include "../inc/function.php";


$output_dir = "../img/spares/";


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
    	move_uploaded_file($_FILES["myfile"]["tmp_name"],$fileURL);
    

    	$table = "spares";
    	$txtSpareName = $_POST["txtSpareName"];
    	$spare_desc = $_POST["spare_desc"];

	 	$fields = "`spare_name`,`spare_url`,`spare_desc`";

	 	$values = "'".$txtSpareName."','".$fileURL."','".$spare_desc."'";


		if(insertrec($table,$fields,$values))

			$arr = array('status' => 1, 'message' => 'Success');
			
		else
			$arr = array('status' => 0, 'message' => 'Login Failure');
			

		echo json_encode($arr);
   	 	echo "Success. Uploaded File :".$_FILES["myfile"]["name"];
	}

}


?>