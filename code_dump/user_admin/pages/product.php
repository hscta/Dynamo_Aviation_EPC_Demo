<style>
form { display: block; margin: 20px auto; border-radius: 10px; padding: 15px }
#progress { position:relative; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
#bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
#percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>

<script src="../js/jquery.form.js"></script>
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Products</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Products</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form method="post" id="addproductForm" action="uploadproduct.php">
                        <input type="hidden" name="action" value="submitnewProduct"/>
                        <h1>Add Product</h1>      
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Product Type</label>
<select name="productType" id="productType">
<option value="">Select Product Type</option>
<?php
include "../inc/dbconn.php";
include "../inc/function.php";


  $rows = selectrec("`product_type_id`,`product_type`","product_types","active=1");


  foreach($rows as $row){ 
?>
   <option value="<?=$row[0]?>"><?=$row[1]?></option>

<?
  }


?>                            
</select>
                          </div> <!-- /field -->
                                      
                          <div class="field">
                            <label for="firstname">Product Name</label>
                            <input type="text" id="txtProductName" name="txtProductName" value="" placeholder="Product Name" class="login" />
                          </div> <!-- /field -->
                
                          <div class="field">
                            <label for="myfile" style="display:block;">Upload Product Image</label>
                            <input type="file" name="myfile" id="myfile" accept="image/*">
                          </div> <!-- /field -->
                                                                       
                         
                          
                        </div> <!-- /login-fields -->
                        
                        <div class="login-actions">
                          
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
                        <tr>
                          <th>#</th>
                          <th>Product Type</th>
                          <th>Product Name</th>
                          <th>Product Image</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="tbodyproducts">



<?php


  $rows = selectrec("`product_id`,`product_type_id`,`product`,`url`","product","active=1");


  foreach($rows as $row){ 
?>
                    <tr>
                      <td width="20%" align="center"><strong><?=$row[0]?></strong></td>
                      <td align="center"><?=singlefield("product_type","product_types","product_type_id=".$row[1])?></td>
                      <td align="center"><?=$row[2]?></td>
                      <td align="center"><?

                      if($row[3]!="")
                        echo "<img src='".$row[3]."' style='max-width:100px;'>";


                      ?></td>
                      <td align="center"><a href='javascript:deleteproduct(<?=$row[0]?>)' class='btn'>Delete</a></td>
                    </tr>
<?
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



var options = { 
    beforeSend: function() 
    {
      $("#progress").show();
      //clear everything
      $("#bar").width('0%');
      $("#message").html("");
      $("#percent").html("0%");
    },
    beforeSubmit: function(){



    if($("#productType").val()==""){
      alert("Please select Product Type");
      $("#productType").focus();
      return false;
    }
    if($("#txtProductName").val()==""){
      alert("Please enter Product Name");
      $("#txtProductName").focus();
      return false;
    }

    showLoading();

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
      hideLoading();
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

     $("#addproductForm").ajaxForm(options);



})
</script>