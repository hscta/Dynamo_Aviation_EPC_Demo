
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Product Types</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Product Type</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form action="#" method="post" id="addproductTypeForm" onsubmit="return submitnewProductType(1)">
                        <input type="hidden" name="action" value="submitnewProductType"/>
                        <h1>Add Product Type</h1>  
                         <hr/>    
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Product Type</label>
                            <input type="text" id="txtProductType" name="txtProductType" value="" placeholder="Product Type" class="login" />
                          </div> <!-- /field -->
                                      
                             
 <div class="field">
                            <label for="firstname">Product Category</label>
                            <select name="txtProductCategory" id="txtProductCategory">
                            <option value="">Select Product Category</option>
<?php
include "../inc/dbconn.php";
include "../inc/function.php";


  $rows = selectrec("`product_category_id`,`product_category`","product_categories","active=1");

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
                         
                          
                        </div> <!-- /login-fields -->
                        
                        <div class="login-actions">
                          
                          <input type="submit"  class="button btn btn-primary btn-large" id="registerBtn" value="Add">
                          
                        </div> <!-- .actions -->
                        
                      </form>



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
                          <th>Product Category</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyproductType">
                        
                      </tbody>
                    </table>


                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>

<script>
$( document ).ready(function() {
  showLoading();
  showproductTypes();

})
</script>