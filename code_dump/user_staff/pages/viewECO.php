
<div class="widget widget-nopad">
<div class="widget-header"> <i class="icon-list-alt"></i>
  <h3> View ECO</h3>

</div>



<div class="widget-content">
  <div class="widget big-stats-container">
    <div class="widget-content">
    <br/>
    <div id="rowBlock">
    <form name="frmECO" id="frmECO" method="post">
    <select name="viewECOs" id="viewECOs" onchange="setECOID(this)">
    <option value="">Select ECO</option>

 <?php
	include "../inc/dbconn.php";
	include "../inc/function.php";

	$id="";

	if(isset($_POST["viewECOs"]))
		$id = $_POST["viewECOs"];

      $rows = selectrec("`group_id`,`eco_num`","groups","active=1");

      $count=0;
      foreach($rows as $row){ 
       $count++;
       echo "<option value='".$row[0]."' ";

       if($id==$row[0])
       	echo "selected";

       echo">".$row[1]."</option>";
       }
  ?>    	


    </select>
    </form>
    </div>

<?php

	if(isset($_POST["viewECOs"])){
		$id = $_POST["viewECOs"];
	
    if($id!=""){
?>

                    <table class="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Product Type</th>
                          <th>Revision Number</th>
                          <th>ECO Number</th>
                          <th>Product Description</th>
                          <th>Revised Plates Parts</th>
                          <th>Existing Part</th>
                          <th>Revised Part</th>
                          <th>Date of Change</th>
                          <th>VINs</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyUsers">



                        <?php

                          $rows = selectrec("`group_id`,`group_name`,`group_desc`,`product_type_id`,`revision`,`eco_num`","groups","active=1 and group_id=".$id);

                          $count=0;
                          foreach($rows as $row){ 
                            $count++;
                        ?>
                            <tr>
                              <td width="5%" align="center" style="vertical-align:top;"><strong><?=$count?></strong></td>
                              <td align="center" style="vertical-align:top;"><?=$row[1]?></td>
                              <td align="center" style="vertical-align:top;"><?=singlefield("product_type","product_types","product_type_id=".$row[3])?></td>
                              <td align="center" style="vertical-align:top;">Revision <?=$row[4]?></td>
                              <td align="center" style="vertical-align:top;"><?=$row[5]?></td>
                              <td align="center" style="vertical-align:top;"><?=$row[2]?></td>
                              <td style="vertical-align:top;">
                                    <?php
                                      $rows1 = selectrec("`spare_id`,`url`,`existing_part`,`new_part`,`dateofchange`","groups_details","active=1 and changed=1 and group_id=".$row[0]);

                                      foreach($rows1 as $row1){
                                        echo "<a href='".$row1[1]."' target='_blank'>".singlefield("spare_name","spares","spare_id=".$row1[0])."</a>";
                                        $existing_part = $row1[2];
                                        $new_part      = $row1[3];
                                        $dateofchange  = $row1[4];
                                      }
                                    ?>
                                  
                              </td>

                              <td align="center" style="vertical-align:top;"><?=$existing_part?></td>
                              <td align="center" style="vertical-align:top;"><?=$new_part?></td>
                              <td align="center" style="vertical-align:top;"><?=$dateofchange?></td>
                              <td style="vertical-align:top;"><ul>
                                    <?php
                                      $rows2 = selectrec("`vin_num`","groups_vins","active=1 and group_id=".$row[0]);
                                       foreach($rows2 as $row2)
                                        echo "<li>".$row2[0]."</li>";
                                    ?>
                                  </ul>
                              </td>
                            </tr>
                        <?
                          }


                        ?>
                       
                      </tbody>
                    </table>







<?php
}
}
?>

   </div>
</div>
</div>

<script>
function setECOID(obj){
	document.frmECO.submit();
}

</script>