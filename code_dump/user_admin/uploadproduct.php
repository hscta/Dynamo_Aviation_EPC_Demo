<?php

include "../inc/dbconn.php";
include "../inc/function.php";


$output_dir = "../img/product/";


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
    

		$productType	= $_POST['productType'];
		$txtProductName	= $_POST['txtProductName'];

		

		$table="product";



	 	$fields = "`product_type_id`,`product`,`url`";

	 	$values = $productType.",'".$txtProductName."','".$fileURL."'";


		if(insertrec($table,$fields,$values))

			$arr = array('status' => 1, 'message' => 'Success');
			
		else
			$arr = array('status' => 0, 'message' => 'Insertion Failure');
			

	   	 	echo "Success. Uploaded File :".$_FILES["myfile"]["name"];
		}

}
else{

		$productType	= $_POST['productType'];
		$txtProductName	= $_POST['txtProductName'];
		$fileURL = "";
		

		$table="product";



	 	$fields = "`product_type_id`,`product`,`url`";

	 	$values = $productType.",'".$txtProductName."','".$fileURL."'";


		if(insertrec($table,$fields,$values))

			$arr = array('status' => 1, 'message' => 'Success');
			
		else
			$arr = array('status' => 0, 'message' => 'Insertion Failure');
			
		
}
echo json_encode($arr);

?>