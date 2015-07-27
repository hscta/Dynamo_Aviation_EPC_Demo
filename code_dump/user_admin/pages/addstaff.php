
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Users</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Staff</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form action="#" method="post" id="addStaffForm" onsubmit="return submitnewStaff(1)">
                        <input type="hidden" name="action" value="submitnewStaff"/>
                        <h1>Add DesignStaff</h1>      
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Username</label>
                            <input type="text" id="txtUsername" name="txtUsername" value="" placeholder="Username" class="login" />
                          </div> <!-- /field -->
                                                    
                          <div class="field">
                            <label for="lastname">Name:</label>  
                            <input type="text" id="txtName" name="txtName" value="" placeholder="Enter Name" class="login" />
                          </div> <!-- /field -->
                          
                          <div class="field">
                            <label for="password">Password:</label>
                            <input type="password" id="txtPassword" name="txtPassword" value="" placeholder="Enter Password" class="login"/>
                          </div> <!-- /field -->
                          
                          
                          <div class="field">
                            <label for="email">Email Address:</label>
                            <input type="text" id="txtEmail" name="txtEmail" value="" placeholder="Email ID" class="login"/>
                          </div> <!-- /field -->
                          
                          <div class="field">
                            <label for="email">Mobile:</label>
                            <input type="tel" id="txtMobile" name="txtMobile" value="" placeholder="Mobile Number" class="login"/>
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
                          <th>Username</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyUsers">
                        
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
  showadminUsers();

})
</script>