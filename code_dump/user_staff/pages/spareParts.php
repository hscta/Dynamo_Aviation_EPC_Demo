<style>
form { display: block; margin: 20px auto; border-radius: 10px; padding: 15px }
#progress { position:relative; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
#bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
#percent { position:absolute; display:inline-block; top:3px; left:48%; }
</style>

<script src="../js/jquery.form.js"></script>
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Spare Parts</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm">Add Spares</button>
            </div>


            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <form id="addSpareParts" action="upload.php" method="post" enctype="multipart/form-data">

                        <input type="hidden" name="action" value="submitnewSpares"/>
                        <h1>Add Parts</h1>      
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Spare Part Name</label>
                            <input type="text" id="txtSpareName" name="txtSpareName" value="" placeholder="Spare Part Name" class="login" />
                          </div> <!-- /field -->
                                                    
                          <div class="field">
                            <label for="myfile" style="display:block;">Attach Spare Image</label>
                            <input type="file" name="myfile" id="myfile" accept="image/*">
                          </div> <!-- /field -->
                                 
                          <div class="field">
                            <label for="spare_desc">Parts Description:</label>  
                            <textarea name="spare_desc"  id="spare_desc" placeholder="Parts Description" ></textarea>
                          </div> <!-- /field -->
                          
                          <div id="progress">
                                  <div id="bar"></div>
                                  <div id="percent">0%</div >
                          </div>


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
                          <th>Spare Name</th>
                          <th>Spare Image</th>
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
  showAllSpares();

var options = { 
    beforeSubmit:function(){

      if($("#txtSpareName").val()==""){
        alert("Please enter Spare Part Name");
        $("#txtSpareName").focus();
        return false;
      }
      if($("#myfile").val()==""){
        alert("Please upload Spare Part Image");
        $("#myfile").focus();
        return false;
      }

    },
    beforeSend: function() 
    {
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

     $("#addSpareParts").ajaxForm(options);



})
</script>