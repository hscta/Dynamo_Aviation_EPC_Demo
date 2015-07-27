
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Dealers</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Dealer</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form action="#" method="post" id="addDealer" onsubmit="return submitDealer(1)">
                        <input type="hidden" name="action" value="submitnewDealer"/>
                        <h1>Add Dealer</h1>      
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="txtdealerName">Dealer Name</label>
                            <input type="text" id="txtdealerName" name="txtdealerName" value="" placeholder="Dealer Name" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtdealerName">Dealer username</label>
                            <input type="text" id="txtdealerUserName" name="txtdealerUserName" value="" placeholder="Dealer User Name" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtdealerEmail">Dealer Email</label>  
                            <input type="text" id="txtdealerEmail" name="txtdealerEmail" value="" placeholder="Dealer Email" class="login" />
                          </div> <!-- /field -->
                          
                          <div class="field">
                            <label for="txtdealerPassword">Dealer Password</label>  
                            <input type="password" id="txtdealerPassword" name="txtdealerPassword" value="" placeholder="Dealer Account Password" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtdealerCPassword">Dealer Confirm Password</label>  
                            <input type="password" id="txtdealerCPassword" name="txtdealerCPassword" value="" placeholder="Confirm Password" class="login" />
                          </div> <!-- /field -->
                          
                          <div class="field">
                            <label for="txtdealerSAName">Service Advisor Name</label>
                            <input type="text" id="txtdealerSAName" name="txtdealerSAName" value="" placeholder="Service Advisor Name" class="login"/>
                          </div> <!-- /field -->
                          
                          
                          <div class="field">
                            <label for="txtdealerSAMobile">Service Advisor Mobile Number</label>
                            <input type="text" id="txtdealerSAMobile" name="txtdealerSAMobile" value="" placeholder="Service Advisor Mobile Number" class="login"/>
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
                          <th>Dealer ID</th>
                          <th>Dealer Name</th>
                          <th>Dealer Username</th>
                          <th>Dealer Email</th>
                          <th>Service Advisor Name</th>
                          <th>Service Advisor Mobile Number</th>
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
  showDealers();

})
</script>