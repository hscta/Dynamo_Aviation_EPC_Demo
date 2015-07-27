<style>
form { display: block; margin: 20px auto; border-radius: 10px; padding: 15px }
#progress { position:relative; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
#bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
#percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>

<script src="../js/jquery.form.js"></script>

          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> Technical Files</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm" onclick="showhideModal()">Add Technical Files</button>
            </div>


            <div style="display:none;" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <form id="addTechnicalFiles" method="post" onsubmit="return submitTechnicalFiles()" action="uploadtechnicals.php">

                        <input type="hidden" name="action" value="submitTechnicalFiles"/>
                        <h1>Add Technical Files</h1>  <hr/>    
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Product Type</label>
                            <select name="txtProductType" id="txtProductType">
                            <option value="">Select Product Type</option>
<?php
include "../inc/dbconn.php";
include "../inc/function.php";


  $rows = selectrec("`product_type_id`,`product_type`","product_types","active=1");

  $count=0;
  foreach($rows as $row){ 
    $count++;
?>
<option value="<?=$row[0]?>"><?=$row[1]?></option>

<?php
}
?>
                            </select>
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="firstname">Group Name</label>
                            <select name="txtGroupId" id="txtGroupId">
                            <option value="">Select Group Name</option>
<?php
  $rows = selectrec("`group_id`,`group_name`","groups","active=1");

  $count=0;
  foreach($rows as $row){ 
    $count++;
?>
<option value="<?=$row[0]?>"><?=$row[1]?></option>

<?php
}
?>
</select>

                          </div> <!-- /field -->
                          <div class="field">
                            <label for="firstname">Bulletin Type</label>
                            <select name="txtBulletinTypeId" id="txtBulletinTypeId">
                            <option value="">Select Bulletin Type</option>
                            <?php
                              $rows = selectrec("`bulletin_type_id`,`bulletin_type_name`","bulletin","active=1");

                              $count=0;
                              foreach($rows as $row){ 
                                $count++;
                            ?>
                            <option value="<?=$row[0]?>"><?=$row[1]?></option>

                            <?php
                            }
                            ?>
                            </select>

                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtBulletinID">Bulletin ID</label>
                            <input type="text" id="txtBulletinID" name="txtBulletinID" value="" placeholder="Enter Bulletin ID" class="login" />
                          </div> <!-- /field -->
                                   
      
                          <div class="field">
                            <label for="txtBulletinID">Bulletin Description</label>
                            <input type="text" id="txtBulletinDesc" name="txtBulletinDesc" value="" placeholder="Bulletin Description" class="login" />
                          </div> <!-- /field -->
      
                          <div class="field">
                            <label for="txtBulletinID">Plates</label>
                            <input type="text" id="txtPlates" name="txtPlates" value="" placeholder="Enter Plates" class="login" />
                          </div> <!-- /field -->
                                   
          
                          <div class="field">
                            <label for="txtBulletinID" style="display:block;">Attach Document (UK-English)</label>
                            <input type="file" id="bulletinAttach1" name="bulletinAttach1" value="" placeholder="Attach Bulletin Document" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtBulletinID" style="display:block;">Attach Document (French)</label>
                            <input type="file" id="bulletinAttach2" name="bulletinAttach2" value="" placeholder="Attach Bulletin Document" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtBulletinID" style="display:block;">Attach Document (Kannada)</label>
                            <input type="file" id="bulletinAttach3" name="bulletinAttach3" value="" placeholder="Attach Bulletin Document" class="login" />
                          </div> <!-- /field -->
                                   
      


                        </div> <!-- /login-fields -->
                        
                        <div class="login-actions" style="text-align:center;">
                          <hr/>
                          <input type="submit"  class="button btn btn-primary btn-large" id="registerBtn" value="Add">
                          
                        </div> <!-- .actions -->
                        
                      </form>
 <div id="progress">
        <div id="bar"></div>
        <div id="percent">0%</div >
</div>
<div id="message"></div>


                </div>
              </div>
            </div>

            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                <div class="widget-content">
                  <br/>
                  
                    <table class="table">
                      <thead>
                        <tr class="smalltr">
                          <th>#</th>
                          <th>Product Type</th>
                          <th>Group Name</th>
                          <th>Bulletin Type</th>
                          <th>Bulletin ID</th>
                          <th>Bulletin Description</th>
                          <th>Plates</th>
                          <th>Date/Time</th>
                          <th>

                          <?php
    $sel = "selected";
    $all = $en = $fr = $ka = "";
    if(isset($_GET['lang'])){
      $lang = $_GET['lang'];
      if($lang == "en")
        $en = $sel;
      if($lang == "fr")
        $fr = $sel;
      if($lang == "ka")
        $ka = $sel;
    }
    else
      $all = $sel;
                          ?>
<select name="txtLanguage" id="txtLanguage" style="width:115px;margin:0" onchange="changeLanguage()">
<option value="" <?=$all?>>All Languages</option>
<option value="en" <?=$en?>>English</option>
<option value="fr" <?=$fr?>>French</option>
<option value="ka" <?=$ka?>>Kannada</option>
</select>


                          </th>
                        </tr>
                      </thead>
                      <tbody id="tbodyTechnicals">



<?php
$fields = "`techfiles_id`,`product_type_id`,`group_id`,`bulletin_type_id`,`service_bulletin_id`,`service_bulletin_desc`,`service_document_url`,`service_document_url_french`,`service_document_url_kannada`,DATE_FORMAT(date_time, '%d-%m-%Y'),`plates`";
$table = "techfiles";


  $rows = selectrec($fields,$table,"active=1");

  $count=0;


  foreach($rows as $row){ 

    if(isset($_GET['lang'])){
      if($lang == "en")
        $cond = ($row[6]!="");
      if($lang == "fr")
        $cond = ($row[7]!="");
      if($lang == "ka")
        $cond = ($row[8]!="");
    }
    else{
      $lang=true;
      $cond = (($row[6]!="") ||  ($row[7]!="") ||  ($row[8]!=""));
    }    

    $count++;
    if( $cond ){ 
?>
    <tr class="smalltr">
      <td width="5%" align="center"><strong><?=$count?></strong></td>
      <td align="center"><?=singlefield("product_type","product_types","product_type_id=".$row[1])?></td>
      <td align="center"><?=singlefield("group_name","groups","group_id=".$row[2])?></td>
      <td align="center"><?=singlefield("bulletin_type_name","bulletin","bulletin_type_id=".$row[3])?></td>
      <td align="center"><?=$row[4]?></td>
      <td align="center"><?=$row[5]?></td>
      <td align="center"><?=$row[10]?></td>
      <td align="center"><?=$row[9]?></td>
      <td align="center">
      <?php
        if($row[6]!="" && $lang=="en")
          echo '<img src="../img/flags/uk.jpg" class="flags"/>[ <a href="'.$row[6].'" target="_blank">Open</a> ]<br/>';

        if($row[7]!="" && $lang=="fr")
          echo '<img src="../img/flags/fr.jpg" class="flags"/>[ <a href="'.$row[7].'" target="_blank">Open</a> ]<br/>';

        if($row[8]!="" && $lang=="ka")
          echo '<img src="../img/flags/ka.jpg" class="flags"/>[ <a href="'.$row[8].'" target="_blank">Open</a> ]<br/>';



      ?>
      </td>



      <td align="center"><a href="javascript:deleteTech(<?=$row[0]?>)" class="btn">Delete</a></td>
    </tr>
<?
    }
  }


?>
                       
                      </tbody>
                    </table>


                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>

<script>
$( document ).ready(function() {
 // showLoading();

var options = { 
    beforeSend: function() 
    {
      $("#progress").show();
      //clear everything
      $("#bar").width('0%');
      $("#message").html("");
    $("#percent").html("0%");
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
      $("#bar").width(percentComplete+'%');
      $("#percent").html(percentComplete+'%');

    
    },
    success: function() 
    {
        $("#bar").width('100%');
      $("#percent").html('100%');
      location.reload();

    },
  complete: function(response) 
  {
    $("#message").html("<font color='green'>"+response.responseText+"</font>");
  },
  error: function()
  {
    $("#message").html("<font color='red'> ERROR: unable to upload files</font>");

  }
     
}; 

     $("#addTechnicalFiles").ajaxForm(options);


})
</script>