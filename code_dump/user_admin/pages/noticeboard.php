<style>
form { display: block; margin: 20px auto; background: #eee; border-radius: 10px; padding: 15px }
#progress { position:relative; width:400px; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
#bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
#percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>

<script src="../js/jquery.form.js"></script>
<form id="addNoticeBoard" action="upload.php" method="post" enctype="multipart/form-data">

  <input type="hidden" name="action" value="addNoticeBoard"/>
  <table class="table table-striped table-bordered">
    <tbody>
      <tr>
        <td>Upload Notice Board Image: </td>
        <td><input type="file" name="myfile" id="myfile" accept="image/*"></td>
        <td rowspan="2">
 <div id="progress">
        <div id="bar"></div>
        <div id="percent">0%</div >
</div>
<div id="message"></div>
        </td>
      </tr>
      <tr>
      <td>Description</td>
      <td><textarea id="notice_desc" name="notice_desc"></textarea></td>
      </tr>
      <tr>
        <td colspan="3" style="text-align:center;"><input type="submit" value="Add Notice Board"/></td>
      </tr>
    </tbody>
  </tbody>
  </table>
</form>


<br/>
    


          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> Available Notice Boards</h3>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">




                </div>
              </div>
            </div>

            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                <div class="widget-content">
                  <br/>


                  <table width="100%" border="0" cellpadding="4">

<?php
include "../inc/dbconn.php";
include "../inc/function.php";


  $rows = selectrec("DATE_FORMAT(date_time, '%D %M %Y'),url, id,notice_desc","noticeboards","active=1 ORDER BY id DESC");


  foreach($rows as $row){ 
?>
                    <tr style="border-bottom:1px solid #000">
                      <td width="20%" align="center"><strong><?=$row[0]?></strong></td>
                      <td align="center"><img src="<?=$row[1]?>" style="max-width:90%;"/><hr/><p style="text-align:left"><?=$row[3]?></td>
                      <td align="center"><a href="javascript:deleteNotices(<?=$row[2]?>)" class="btn">Delete</a></td>
                    </tr>
<?
  }


?>

                  </table>



                 

                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>

<script>
$( document ).ready(function() {
  //showLoading();

var options = { 
    beforeSend: function() 
    {

    	if($("#myfile").val()==""){
    		alert("Please select Notice Board Image")
    		$("#myfile").focus();
    		return false;
    	}


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
      //location.reload();

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

     $("#addNoticeBoard").ajaxForm(options);


})
</script>