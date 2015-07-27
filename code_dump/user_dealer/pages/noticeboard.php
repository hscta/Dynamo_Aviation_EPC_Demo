<style>
form { display: block; margin: 20px auto; background: #eee; border-radius: 10px; padding: 15px }
#progress { position:relative; width:400px; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
#bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
#percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>

<script src="../js/jquery.form.js"></script>



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
                      <td align="center"><img src="<?=$row[1]?>" style="max-width:90%;"/><hr/><p style="text-align:left"><?=$row[3]?></p></td>
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
  
</script>