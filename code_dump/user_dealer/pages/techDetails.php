<style>

.info-box {
  background:#ffffff;
  border:1px solid #c9c9c9;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 30px;
  padding:10px;
  height: 160px;
}

.stats-box {
  margin:40px 0px;
  color:#5f5f5f;
}
.stats-box-title {
  text-align:center;
  font-weight:bold;
}
.stats-box-all-info {
  text-align:center;
  font-weight:bold;
  font-size:48px;
  margin-top:20px;
  margin-bottom: 40px;
}
.stats-box-all-info i{
  width:60px;
  height:60px;
}

.imgInfo{
    max-width: 150px;
    min-height: 121px;
    padding: 10px;
}

.info-box a{
  display: block;
  text-align: center;
  background: #ededed;
}

.info-box a span{
  display: block;
  background: #00BA8B;
  color:#fff;
  font-weight: bold;
}

.info-box a:hover{
  text-decoration: none;
}
.info-box a:hover span{
  color:#eee;
  text-decoration: none;
}


#slide1{
  background: #fff;
  padding:10px;
  border-radius: 10px;
}

</style>
<h4>Bulletins</h4>
<form name="searchTechForm" id="searchTechForm" method="post" onsubmit="return searchTechDetails(1)">
<input type="hidden" name="action" value="searchTechDetails"/>
<div class="control-group">
  <div class="controls">
     <hr class="hrmargin"/>
        <select id="groupid" name="groupid" class="selMargin">
          <option value="">--Select Group Name--</option>
<?php
include "../inc/dbconn.php";
include "../inc/function.php";


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

        <select id="bulletinid" name="bulletinid" class="selMargin">
          <option value="">--Select Bulletin Type--</option>
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

        <button type="submit" class="btn btn-success">Go!</button><hr class="hrtopmargin"/>
      
    </div>  <!-- /controls -->      
</div>
</form>

<div class="container">        
  <div class="row-fluid" id="search_results">
    
  </div> 
</div>
<script>
$( document ).ready(function() {
  showLoading();
 <?php
    $sel = "selected";
    echo "all = ''; en = ''; fr = '';ka = '';langs='';";

    if(isset($_GET['lang'])){
      $lang = $_GET['lang'];

      if($lang == "en")
        echo"en = '".$sel."';langs='en';";
      if($lang == "fr")
        echo"fr = '".$sel."';langs='fr';";
      if($lang == "ka")
        echo "ka = '".$sel."';langs='ka';";
    }
    else
      echo "all = '".$sel."';langs='all';";

?>



  searchTechDetails(0);

})
</script>