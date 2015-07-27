<?php

include "../inc/dbconn.php";
include "../inc/function.php";


$output_dir = "../technicals/";


if(isset($_FILES["bulletinAttach1"]))
{
	//Filter the file types , if you want.
	if ($_FILES["bulletinAttach1"]["error"] > 0)
	{
	  echo "Error: " . $_FILES["bulletinAttach1"]["error"] . "<br>";
	}
	else
	{
		//move the uploaded file to uploads folder;
		$fileURL1 = $output_dir. "en_".time()."_".$_FILES["bulletinAttach1"]["name"];
		$fileURL2 = $output_dir. "fr_".time()."_".$_FILES["bulletinAttach2"]["name"];
		$fileURL3 = $output_dir. "ka_".time()."_".$_FILES["bulletinAttach3"]["name"];

    	move_uploaded_file($_FILES["bulletinAttach1"]["tmp_name"],$fileURL1);
    	move_uploaded_file($_FILES["bulletinAttach2"]["tmp_name"],$fileURL2);
    	move_uploaded_file($_FILES["bulletinAttach3"]["tmp_name"],$fileURL3);
    

    	$table = "techfiles";

    	$txtProductType 	= $_POST["txtProductType"];
    	$txtGroupId 		= $_POST["txtGroupId"];
    	$txtBulletinTypeId 	= $_POST["txtBulletinTypeId"];
    	$txtPlates 	= $_POST["txtPlates"];

    	$txtBulletinID 		= $_POST["txtBulletinID"];
    	$txtBulletinDesc 	= $_POST["txtBulletinDesc"];

	 	$fields = "`product_type_id`,`group_id`,`bulletin_type_id`,`service_bulletin_id`,`service_bulletin_desc`,`plates`,`service_document_url`,`service_document_url_french`,`service_document_url_kannada`";

	 	$values = $txtProductType.",".$txtGroupId.",".$txtBulletinTypeId.",'".$txtBulletinID."','".$txtBulletinDesc."','".$txtPlates."','".$fileURL1."','".$fileURL2."','".$fileURL3."'";


		if(insertrec($table,$fields,$values))

			$arr = array('status' => 1, 'message' => 'Success');
			
		else
			$arr = array('status' => 0, 'message' => 'No Data');
			

		echo json_encode($arr);
   	 	//echo "Success. Uploaded File :".$_FILES["bulletinAttach1"]["name"];
	}

}


?>