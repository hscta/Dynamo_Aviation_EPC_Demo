
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All ASCs</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add ASCs</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">


                  <form action="#" method="post" id="submitASC" onsubmit="return submitASC(1)">
                        <input type="hidden" name="action" value="submitASC"/>
                        <h1>Add ASCs</h1>      
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Select Dealer</label>
                            <select name="txtSelectDealer">
                              <option value="">Select Dealer</option>

                              <?php
                            include "../inc/dbconn.php";
                            include "../inc/function.php";

                            $rows = selectrec("dealer_id, dealer_name","dealers","active=1");


                              foreach($rows as $row){
                            ?>
                            <option value="<?=$row[0]?>"><?=$row[1]?></option>
                            <?
                              } 
                            ?>
                            </select>                           

                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtascName">ASC Name</label>
                            <input type="text" id="txtascName" name="txtascName" value="" placeholder="ASC Name" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtascUserName">ASC User Name</label>
                            <input type="text" id="txtascUserName" name="txtascUserName" value="" placeholder="ASC User Name" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtascPassword">ASC Password</label>  
                            <input type="password" id="txtascPassword" name="txtascPassword" value="" placeholder="ASC Password" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtascCPassword">ASC Confirm Password</label>  
                            <input type="password" id="txtascCPassword" name="txtascCPassword" value="" placeholder="ASC Confirm Password" class="login" />
                          </div> <!-- /field -->

                          <div class="field">
                            <label for="txtascEmail">ASC Email</label>  
                            <input type="text" id="txtascEmail" name="txtascEmail" value="" placeholder="ASC Email" class="login" />
                          </div> <!-- /field -->
                          
                          <div class="field">
                            <label for="txtPMName">Parts Manager Name</label>
                            <input type="text" id="txtPMName" name="txtPMName" value="" placeholder="Parts Manager Name" class="login"/>
                          </div> <!-- /field -->
                          
                          
                          <div class="field">
                            <label for="txtPMMobile">Parts Manager Mobile Number</label>
                            <input type="tel" id="txtPMMobile" name="txtPMMobile" value="" placeholder="Parts Manager Mobile Number" class="login"/>
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
                          <th>ASC ID</th>
                          <th>Dealer</th>
                          <th>ASC Name</th>
                          <th>ASC Username</th>
                          <th>ASC Email</th>
                          <th>Parts Manager Name</th>
                          <th>Parts Manager Mobile Number</th>
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
  showASC();

})
</script>