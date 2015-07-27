
          <div class="widget widget-nopad">
            <div class="widget-header"> <i class="icon-list-alt"></i>
              <h3> All Products</h3>

              <button class="btn btn-primary pull-right btn-right" data-toggle="modal" data-target=".bs-example-modal-sm" onclick="showhideModal()">Add Product</button>
            </div>


            <div style="display:none;" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="modalGroup">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <form id="addGroupParts" method="post" onsubmit="return submitGroups()">

                        <input type="hidden" name="action" value="submitnewGroups"/>
                        <h1>Add Products</h1>  <hr/>    
                        <p class="alert"></p>
                        <div class="login-fields">
                          
                          <div class="field">
                            <label for="firstname">Product Type</label>
                            <select name="txtProductType" id="txtProductType" onchange="getSparePartsByID()">
                            <option value="">Select Product Type</option>
                              <?php
                              include "../inc/dbconn.php";
                              include "../inc/function.php";


                                $rows = selectrec("`product_type_id`,`product_type`","product_types","active=1");

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

                          <div class="field">
                            <label for="firstname">Revision Number</label>

                            <select name="txtRevision" id="txtRevision">
                              <option value="">Select Revision</option>
                              <option value="0.9">Revision 0.9</option>
                              <option value="1.0">Revision 1.0</option>
                            </select>

                          </div> <!-- /field -->

                          <div class="field">
                            <label for="firstname">Product Name</label>
                            <input type="text" id="txtGroupName" name="txtGroupName" value="" placeholder="Product Name" class="w100" />
                          </div> <!-- /field -->
                          <div class="field">
                            <label for="firstname">Product Description</label>
                            <textarea id="txtGroupDesc" name="txtGroupDesc" value="" placeholder="Product Description" class="w100" ></textarea>
                          </div> <!-- /field -->
                               
                          <div class="field">

<table width="100%">
  <tr>
    <td width="30%"><label for="firstname">Enter VIN #</label>

      <input type="text" id="txtFromVinNumber" name="txtFromVinNumber" value="" placeholder="From VIN Number" class="login" />
      <input type="text" id="txtToVinNumber" name="txtToVinNumber" value="" placeholder="To VIN Number" class="login" />


    </td>
    <td><input type="button" value=">>" onclick="moveVin()"><br/><input type="button" value="<<"  onclick="removeVin()"></td>
    <td><select multiple name="vins[]" id="vins"></select></td>
</table>


                            
                          </div> <!-- /field -->
                                     
                          <div class="field">

                              <table width="100%" class="insideTable">
                                <tr><td colspan="3"><strong>Select Parts</strong><hr/></td></tr>
                                <tr>
                                  <td width="30%"><select multiple name="spares" id="spares" class="multi"></select></td>
                                  <td align="center"><input type="button" value=">>" onclick="moveRight()"><br/><input type="button" value="<<"  onclick="moveLeft()"></td>
                                  <td><select multiple name="selectedSpares[]" id="selectedSpares" class="multi"></select></td>
                              </table>

                            
                          </div> <!-- /field -->
                               


                        </div> <!-- /login-fields -->
                        
                        <div class="login-actions" style="text-align:center;">
                          <hr/>
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
                          <th>Product Name</th>
                          <th>Product Type</th>
                          <th>Revision Number</th>
                          <th>ECO Number</th>
                          <th>Product Description</th>
                          <th>Plates Parts</th>
                          <th>VINs</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyUsers">



                        <?php

                          $rows = selectrec("`group_id`,`group_name`,`group_desc`,`product_type_id`,`revision`,`eco_num`","groups","active=1");

                          $count=0;
                          foreach($rows as $row){ 
                            $count++;
                        ?>
                            <tr>
                              <td width="5%" align="center" style="vertical-align:top;"><strong><?=$count?></strong></td>
                              <td align="center" style="vertical-align:top;"><?=$row[1]?></td>
                              <td align="center" style="vertical-align:top;"><?=singlefield("product_type","product_types","product_type_id=".$row[3])?></td>
                              <td align="center" style="vertical-align:top;">Revision <?=$row[4]?></td>
                              <td align="center" style="vertical-align:top;"><?=$row[5]?></td>
                              <td align="center" style="vertical-align:top;"><?=$row[2]?></td>
                              <td style="vertical-align:top;"><ul>
                                    <?php
                                      $rows1 = selectrec("`spare_id`","groups_details","active=1 and group_id=".$row[0]);

                                      foreach($rows1 as $row1)
                                        echo "<li>".singlefield("spare_name","spares","spare_id=".$row1[0])."</li>";
                                    ?>
                                  </ul>
                              </td>
                              <td style="vertical-align:top;"><ul>
                                    <?php
                                      $rows2 = selectrec("`vin_num`","groups_vins","active=1 and group_id=".$row[0]);
                                       foreach($rows2 as $row2)
                                        echo "<li>".$row2[0]."</li>";
                                    ?>
                                  </ul>
                              </td>
                              <td align="center"><a href="javascript:deleteGroup(<?=$row[0]?>)" class="btn">Delete</a></td>
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
  //showLoading();
  //listSpares();
})
</script>