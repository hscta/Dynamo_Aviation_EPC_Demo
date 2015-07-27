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
  overflow: hidden;
}

.info-box1 {
    background: none repeat scroll 0 0 #FFFFFF;
    border: 1px solid #C9C9C9;
    border-radius: 3px 3px 3px 3px;
    height: 110px;
    margin-bottom: 30px;
    padding: 10px;
    text-align: center;
    overflow: hidden;
}

.info-box1 .cs{

    left: -32px !important;
    padding: 0 15px !important;
    top: 11px !important;
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
    max-height: 95px;
    min-height: 63px;
    padding: 10px;
}
.imgInfo1{
    max-height: 75px;
    max-width: 70px;
    min-height: 71px;
    padding: 10px;
}

.info-box a,.info-box1 a{
  display: block;
  text-align: center;
  background: #ededed;
  position: relative;
}

.info-box1 a span{
  font-size: 11px;
    overflow: hidden;
    padding: 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.info-box a span,.info-box1 a span{
  display: block;
  background: #00BA8B;
  color:#fff;
  font-weight: bold;
}

.info-box a:hover, .info-box1 a:hover{
  text-decoration: none;
}
.info-box a:hover span, .info-box1 a:hover span{
  color:#eee;
  text-decoration: none;
}

</style>

<form name="search" id="search" method="post" onsubmit="return searchParts(1)">
<input type="hidden" name="action" value="search"/>
<div class="control-group">
  <div class="controls">
     <div class="input-append"><hr class="hrmargin"/>
        <span class="span3"><h4>Electronic Parts Catalogue</h4></span>
        <select id="searchIn" name="searchIn" class="selMargin" class="span4">
          <option value="">Select Search Category</option>
          <option value="Vin">Vin</option>
          <option value="Part_Assembly">Part Assembly</option>
          <option value="Part_Description">Part Description</option>
        </select><input type="text" id="searchCatalogue" name="searchCatalogue" class="span5 m-wrap" placeholder="Search Catalogue">
        <button type="submit" class="btn btn-success">Go!</button><hr class="hrtopmargin"/>
      </div>
    </div>  <!-- /controls -->      
</div>
</form>

<div class="container">        
  <div class="row" id="search_results">
    <?php

include "../inc/dbconn.php";
include "../inc/function.php";

  $fields = "`product_id`,`product`,`url`";
  $table = "product";
  $cond = "product_id>4 and active=1";

  $rows = selectrec($fields,$table,$cond);
  foreach($rows as $row){ 
  ?>
    <div class="span3"> <div class="info-box"> <a href="javascript:noRecord()"><span class="cs">Coming Soon</span> <img class="imgInfo" src="<?=$row[2]?>"> <span><?=$row[1]?></span> </a> </div> </div>

<?php

  }

    ?>
  </div>

     
  <div class="row-fluid" id="search_results1" style="display:none;">
    
  </div>





  <div id="slide3" class="span12" style="display: none;">
    <div class="widget widget-nopad">
      <div class="widget-header"> <i class="icon-list-alt"></i>
        <h3> View 2D / 3D Diagram</h3>
        <div style="padding-right:20px;" class="pull-right">Goto : <a href="javascript:showSlide1()">Home</a> | <a href="javascript:justShowSlide2()">DashBoard</a></div>
      </div>
      <!-- /widget-header -->
      <div class="widget-content">
        <div class="widget big-stats-container">
          <div class="widget-content">
            <iframe width="100%" height="500" frameborder="0" id="bajajFrame" src=""></iframe>
          </div>
          <!-- /widget-content --> 
          
        </div>
      </div>
    </div>
  </div>


</div>
<script>
$( document ).ready(function() {
  showLoading();
  searchParts();

})
</script>