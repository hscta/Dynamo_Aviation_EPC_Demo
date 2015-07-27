
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Product Categories</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Product Category</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form action="#" method="post" id="addproductCategoryForm" onsubmit="return submitnewProductCategory(1)">
                        <input type="hidden" name="action" value="submitnewProductCategory"/>
                        <h1>Add Product Category</h1>    
                         <hr/>  
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Product Category</label>
                            <input type="text" id="txtProductCategory" name="txtProductCategory" value="" placeholder="Product Category" class="login" />
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
                          <th>Product Category</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyproductCategory">
                        
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
  showproductCategorys();

})
</script>