host = "http://localhost/efms/total_new/administrator/be/";
customerURL = "http://localhost/efms/total_new/";

// host = "http://total.gladminds.co/administrator/be/";
// customerURL = "http://total.gladminds.co/customer/";

function selectStatus(id){

  $("#txtStatus").val(id);

  submitForm();
}

function resetAllFeedbacks(){
  if(confirm("This action would reset all registered feedbacks. Confirm Yes to continue.")){
    
    showLoading();
    
    $.getJSON( host+"index.php?action=resetAllFeedbacks", function( data ) {
      
      redirectPage = "dashboard";
      if(data.status==1){
          document.location.href="index.php?page="+redirectPage;
      }
      else
          alert("Reset failure. Please contact Support");
      

      hideLoading();
    });

  }
}

/************* Stores ****************** */

function showAllStores(){

  $.getJSON( host+"index.php?action=listAllStores", function( data ) {
    
    str = "";
    count = 1;
    $.each( data, function( key, val ) {

      str += "<tr><td align='center'>"+val[0]+"</td><td><a href='javascript:modifyStore("+val[0]+")'>"+val[1]+"</a></td><td>"+val[2]+"</td><td>Weekdays - "+val[3]+" to "+ val[4]+"<br/><strong>Weekends</strong> - "+val[5]+" to "+val[6]+"</td><td align='center' style='vertical-align:middle'><a href='javascript:modifyStore("+val[0]+")'>Edit</a> | <a href='javascript:deactivateStore("+val[0]+")'>Delete</a></td></tr>";
      count++;

    });
    $("#tbodyStores").append(str);
    hideLoading();
  });
}

function modifyStore(storeID){

  $.getJSON( host+"index.php?action=fetchStoreById&storeID="+storeID, function( data ) {
    
    str = "";
    count = 1;

    storeID = data[0];
    storename = data[1];
    storeaddress  = data[2];
    wd_fromTime = data[3];
    wd_toTime = data[4];
    we_fromTime = data[5];
    we_toTime = data[6];

    $("#up_storename").html(storename);
    $("#rec_ID").val(storeID);
    $("#edit_storename").val(storename);
    $("#edit_storeaddress").val(storeaddress);
    $("#edit_wd_fromTime").val(wd_fromTime)
    $("#edit_wd_toTime").val(wd_toTime)
    $("#edit_we_fromTime").val(we_fromTime)
    $("#edit_we_toTime").val(we_toTime)


    $('#updateStore').modal();
    hideLoading();
  });
}

function addStore(){

  if(storeCheck("")){
     ajaxifyForm("stores","vStores");
  }
  
  return false;    
}

function updateStore(){

  if(storeCheck("edit_")){
    ajaxifyForm("updateStores","vStores");
  }

  return false;
}

function storeCheck(inpType){

  if($("#"+inpType+"storename").val()==""){
    alert("Please enter Store Name");
    $("#"+inpType+"storename").focus();
    return false;
  }

  if($("#"+inpType+"storeaddress").val()==""){
    alert("Please enter Store Address");
    $("#"+inpType+"storeaddress").focus();
    return false;
  }

  if($("#"+inpType+"wd_fromTime").val()==""){
    alert("Please select Week Day - From Time");
    $("#"+inpType+"wd_fromTime").focus();
    return false;
  }

  if($("#"+inpType+"wd_toTime").val()==""){
    alert("Please select Week Day - To Time");
    $("#"+inpType+"wd_toTime").focus();
    return false;
  }

  var today = new Date();
  d1 = $("#"+inpType+"wd_fromTime").val().split(":");
  d2 = $("#"+inpType+"wd_toTime").val().split(":");


  var d1 = new Date(today.getYear(),today.getMonth(),today.getDate(),d1[0],d1[1],0);
  var d2 = new Date(today.getYear(),today.getMonth(),today.getDate(),d2[0],d2[1],0);


  if(d1>d2){

      alert("Week Day - From Time should be lesser than Week Day - To Time");
      $("#"+inpType+"wd_fromTime").focus();
      return false;
  }


  if($("#"+inpType+"we_fromTime").val()==""){
    alert("Please select Week End - From Time");
    $("#"+inpType+"we_fromTime").focus();
    return false;
  }

  if($("#"+inpType+"we_toTime").val()==""){
    alert("Please select Week End - To Time");
    $("#"+inpType+"we_toTime").focus();
    return false;
  }



  d1 = $("#"+inpType+"we_fromTime").val().split(":");
  d2 = $("#"+inpType+"we_toTime").val().split(":");


  var d1 = new Date(today.getYear(),today.getMonth(),today.getDate(),d1[0],d1[1],0);
  var d2 = new Date(today.getYear(),today.getMonth(),today.getDate(),d2[0],d2[1],0);



  if(d1>d2){

      alert("Week End - From Time should be lesser than Week End - To Time");
      $("#wd_fromTime").focus();
      return false;
  }

  return true;
}

function deactivateStore(id){

  if(confirm("Are you sure you want to delete the Feedback Template?")){
  showLoading();

 $.getJSON( host+"index.php?action=deactivateStore&stat=0&recId="+id, function( data ) {
    hideLoading();
    location.reload();
  });
  }
}

/************* Admins ****************** */

function showAllAdmins(){
  showLoading();
  $.getJSON( host+"index.php?action=listAllAdmins", function( data ) {
    
    str = "";
    count = 1;
    if(data==""){
      str += "<tr><td colspan='6' align='center'>No Records Found</td></tr>";
    }
    else{

      $.each( data, function( key, val ) {
        str += "<tr><td align='center'>"+val[0]+"</td><td><a href='javascript:modifyAdmin("+val[0]+")'>"+val[2]+"</a></td><td>"+val[3]+"</td><td>"+val[4]+"</td><td><ul>";
        strStore = val[5]+"";

        var res = strStore.split(","); 

        $.each(res, function(i)
        {

          str +="<li>"+res[i]+"</li>";

        });


        str += "</ul></td><td class='refresh_icon'><a href='#' onclick='javascript:passwordReset(this,"+val[0]+")'><span class='glyphicon glyphicon-refresh black'></span></a></td><td align='center' style='vertical-align:middle'><a href='javascript:modifyAdmin("+val[0]+")'>Edit</a> | <a href='javascript:deactivateAdmin("+val[0]+")'>Delete</a></td></tr>";
        count++;

      });
    }

    $("#tbodyAdmins").append(str);
    hideLoading();
  });
}

function showAllStaffs(){
  showLoading();
  $.getJSON( host+"index.php?action=listAllStaffs", function( data ) {
    
    str = "";
    count = 1;
    if(data==""){
      str += "<tr><td colspan='6' align='center'>No Records Found</td></tr>";
    }
    else{

      $.each( data, function( key, val ) {
        str += "<tr><td align='center'>"+val[0]+"</td><td><a href='javascript:modifyAdmin("+val[0]+")'>"+val[2]+"</a></td><td>"+val[3]+"</td><td>"+val[4]+"</td><td><ul>";
        strStore = val[5]+"";

        var res = strStore.split(","); 

        $.each(res, function(i)
        {

          str +="<li>"+res[i]+"</li>";

        });


        str += "</ul></td><td class='refresh_icon'><a href='#' onclick='javascript:passwordReset(this,"+val[0]+")'><span class='glyphicon glyphicon-refresh black'></span></a></td><td align='center' style='vertical-align:middle'><a href='javascript:modifyAdmin("+val[0]+")'>Edit</a> | <a href='javascript:deactivateAdmin("+val[0]+")'>Delete</a></td></tr>";
        count++;

      });
    }

    $("#tbodyAdmins").append(str);
    hideLoading();
  });
}

function passwordReset(obj,userid){

  showLoading();
  $(obj).find("span").removeClass("black").addClass("red");
  $.getJSON( host+"index.php?action=passwordReset&id="+userid, function( data ) {
    

    $(obj).find("span").removeClass("red").addClass("black");

    if(data.status==1){
        alert("Password Reset Successful for userid: "+userid);
    }
    else
        alert("Password Reset UN-Successful. Please try again later");
    
    hideLoading();
    return false;

  });
}

function validateAdmin(inpType){

  if($("#"+inpType+"admin_name").val()==""){
    alert("Please enter Admin Name");
    $("#"+inpType+"admin_name").focus()
    return false;
  }

  if($("#"+inpType+"admin_role").val()==""){
    alert("Please enter Admin Role");
    $("#"+inpType+"admin_role").focus()
    return false;
  }

  if($("#"+inpType+"admin_mobile").val()==""){
    alert("Please enter Admin Mobile");
    $("#"+inpType+"admin_mobile").focus()
    return false;
  }

  if($("#"+inpType+"admin_email").val()==""){
    alert("Please enter Admin Email ID");
    $("#"+inpType+"admin_email").focus()
    return false;
  }

  // if(!(isValidEmailAddress($("#"+inpType+"admin_email").val()))){
  //   alert("Please enter Valid Admin Email ID");
  //   $("#"+inpType+"admin_email").focus()
  //   return false;
  // }

  if($("#"+inpType+"PairedSelectBox option").length>=1)
    $("#"+inpType+"PairedSelectBox option").attr('selected', 'selected');
  else{

    alert("Associate atleast one Store");
    $("#"+inpType+"PairedSelectBox").focus()
    return false;

  }

  return true;
}

function addnewAdmin(id){

  if(validateAdmin("")){
    showLoading();

    $.getJSON( host+"index.php?action=checkEmailMobile&email="+$("#admin_email").val()+"&mobile="+$("#admin_mobile").val(), function( data ) {

    if(data.mobile=="1"){
      alert("Mobile number already exists.");
      hideLoading();
      $("#admin_mobile").focus();
      return false;
    }

    if(data.email=="1"){
      alert("Email ID already exists.");
      hideLoading();
      $("#admin_email").focus();
      return false;
    }

    if(id==1)
      ajaxifyForm("addAdmin","admins");
    else
      ajaxifyForm("addAdmin","staffs");


    });

  }
  return false;
}

function modifyAdmin(adminID){

  $.getJSON( host+"index.php?action=fetchAdminById&adminID="+adminID, function( data ) {
    
    str = "";
    count = 1;

    adminID = data[0];
    name = data[1];
    email  = data[2];
    mobile = data[3];
    admin_role_id = data[4];

    ass_stores = data[5];
    $("#edit_MasterSelectBox").append($("#edit_PairedSelectBox option"))
    $("#edit_MasterSelectBox option").each(function(){
      //alert(ass_stores)
      if(ass_stores.indexOf($(this).val())>=0){
        $("#edit_PairedSelectBox").append($(this))
      }
    })


    $("#edit_adminID").val(adminID);
    $("#edit_admin_name").val(name);
    $("#edit_admin_role").val(admin_role_id);
    $("#edit_admin_mobile").val(mobile);
    $("#edit_admin_email").val(email);
    //$("#edit_PairedSelectBox").val(wd_fromTime)


    $('#modifyStore').modal();
    hideLoading();
  });
}

function hideAndShow(id){
  //alert(id)
  $('#myModal').modal('hide');
  setTimeout("loadCustomerFeedback("+id+")",500)
}

function loadCustomerFeedback(id){
    showLoading();

    $.getJSON( host+"index.php?action=loadCustomerFeedback&cFeedbackID="+id, function( data ) {
      
    $("#reopened_from").hide();
    $.each( data, function( key, val ) {
      $("#"+key).html(val);

      if(key=="reopen_id" && val!="0"){

        $("#reopen_id").html("<a href='javascript:void(0)' onclick='hideAndShow("+val+")'>"+val+"</a>")
        $("#reopened_from").show();

      }
    });

    $("#cf_id").val(data.cf_id);
    $("#txtFeedbackStatus").val(data.stat_id)
    
    $( "#txtFeedbackStatus").unbind( "change" );


    if(data.stat_id=="3"){
      //$("#txtFeedbackStatus").on("change", function(event) { 
      $("#txtFeedbackStatus").change(function(event) { 


        if(confirm("Changing the status of this ticket, would start a new ticket with Open Status. Are you sure you want to do this?")){
          $("#txtFeedbackStatus").removeAttr("onchange")
          $.getJSON( host+"index.php?action=reOpenTicket&cFeedbackID="+data.cf_id, function( data ) {

            alert("New Ticket created for Customer: "+data.customerName+" with Ticket ID: "+data.newID);

            $('#myModal').modal('hide');
            $('#txtStatus').val(1);
            showLoading();
            submitForm();

          });

        }
      });
    }
    

    //Scroll to the last of the DIV
    if($(".overflowData")[0]){
      window_height = $(".overflowData")[0].scrollHeight;
      $(".overflowData").animate({ scrollTop: window_height }, 'slow');
    }
      hideLoading();
    });

    $('#myModal').modal()
}

function updateAdmin(id){

  if(validateAdmin("edit_")){
   
    showLoading();

    $.getJSON( host+"index.php?action=checkEditEmailMobile&userid="+$("#edit_adminID").val()+"&email="+$("#edit_admin_email").val()+"&mobile="+$("#edit_admin_mobile").val(), function( data ) {

    if(data.mobile=="1"){
      alert("Mobile number already exists.");
      hideLoading();
      $("#admin_mobile").focus();
      return false;
    }

    if(data.email=="1"){
      alert("Email ID already exists.");
      hideLoading();
      $("#admin_email").focus();
      return false;
    }

    if(id==1)
      ajaxifyForm("editAdmin","admins");
    else
      ajaxifyForm("editAdmin","staffs");


    });


  }

  return false;
}

function deactivateAdmin(id){

  if(confirm("Are you sure you want to delete the Admin?")){
  showLoading();

 $.getJSON( host+"index.php?action=deactivateAdmin&stat=0&recId="+id, function( data ) {
    hideLoading();
    location.reload();
  });
  }
}

/*************** Feedback ***************** */

function showAllFeedbackTypes(){

  $.getJSON( host+"index.php?action=showAllFeedbackTypes", function( data ) {
    
    str = "";
    count = 1;
    $.each( data, function( key, val ) {

      str += "<tr><td align='center'>"+val[0]+"</td><td><a href='javascript:modifyFeedbackType("+val[0]+")'>"+val[1]+"</a></td><td align='center' style='vertical-align:middle'><a href='javascript:modifyFeedbackType("+val[0]+")'>Edit</a> | <a href='javascript:deactivateFeedbackType("+val[0]+")'>Delete</a></td></tr>";
      count++;

    });
    $("#tbodyFeedbackTypes").append(str);
    hideLoading();
  });
}

function addFeedbackType(){

  if(validateFeedbackType("")){
    ajaxifyForm("FeedbackTypeForm","master_feedback");
  }
  return false;
}

function modifyFeedbackType(feedbackTypeID){


  $.getJSON( host+"index.php?action=fetchFeedbackTypeById&feedbackTypeID="+feedbackTypeID, function( data ) {
    
    str = "";
    count = 1;

    feedbackTypeID = data[0];
    feedbackType   = data[1];

    $("#edit_feedbackID").val(feedbackTypeID);
    $("#edit_FeedbackTypename").val(feedbackType);

    //$("#edit_PairedSelectBox").val(wd_fromTime)


    $('#modifyFeedbackType').modal();
    hideLoading();
  });
}

function updateFeedbackType(){

  if(validateFeedbackType("edit_")){
    ajaxifyForm("editFeedbackType","master_feedback");
  }

  return false;
}


function validateFeedbackType(inpType){
  if($("#"+inpType+"FeedbackTypename").val()==""){
    alert("Please enter Feedback Type");
    $("#"+inpType+"FeedbackTypename").focus()
    return false;
  }
  return true;
}

function deactivateFeedbackType(id){

  if(confirm("Are you sure you want to delete the Feedback Type?")){
    showLoading();

     $.getJSON( host+"index.php?action=deactivateFeedbackType&stat=0&recId="+id, function( data ) {

        if(data.status==1){
           location.reload();
        }
        else{
            alert("De-Activate UN-Successful")
            hideLoading();

        }
        
        return false;



      });
      }
}

/*************** Feedback Sub ***************** */

function showAllFeedbackSubTypes(){

  $.getJSON( host+"index.php?action=showAllFeedbackSubTypes", function( data ) {
    
    str = "";
    count = 1;
    $.each( data, function( key, val ) {

      str += "<tr><td align='center'>"+val[0]+"</td><td align='center'>"+val[1]+"</td><td><a href='javascript:modifyFeedbackSubType("+val[0]+")'>"+val[2]+"</a></td><td align='center' style='vertical-align:middle'><a href='javascript:modifyFeedbackSubType("+val[0]+")'>Edit</a> | <a href='javascript:deactivateFeedbackSubType("+val[0]+")'>Delete</a></td></tr>";
      count++;

    });
    $("#tbodyFeedbackSubTypes").append(str);
    hideLoading();
  });
}

function addFeedbackSubType(){

  if(validateFeedbackSubType("")){
    ajaxifyForm("FeedbackSubTypeForm","master_feedbacksub");
  }
  return false;
}

function modifyFeedbackSubType(feedbackSubTypeID){


  $.getJSON( host+"index.php?action=fetchFeedbackSubTypeById&feedbackSubTypeID="+feedbackSubTypeID, function( data ) {
    
    str = "";
    count = 1;

    feedbackSubTypeID = data[0];
    feedbackTypeID = data[1];
    feedbackSubType   = data[2];

    $("#edit_feedbackSubID").val(feedbackSubTypeID);
    $("#edit_feedbackTypeID").val(feedbackTypeID);
    $("#edit_FeedbackSubTypename").val(feedbackSubType);

    //$("#edit_PairedSelectBox").val(wd_fromTime)


    $('#modifyFeedbackSubType').modal();
    hideLoading();
  });
}

function updateFeedbackSubType(){

  if(validateFeedbackSubType("edit_")){
    ajaxifyForm("editFeedbackSubType","master_feedbacksub");
  }

  return false;
}

function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
} 

function validateFeedbackSubType(inpType){

  if($("#"+inpType+"feedbackTypeID").val()==""){
    alert("Select Feedback Type");
    $("#"+inpType+"feedbackTypeID").focus()
    return false;
  }

  if($("#"+inpType+"FeedbackSubTypename").val()==""){
    alert("Please enter Feedback SubType");
    $("#"+inpType+"FeedbackSubTypename").focus()
    return false;
  }

  return true;
}

function deactivateFeedbackSubType(id){

  if(confirm("Are you sure you want to delete the Feedback Type?")){
    showLoading();

     $.getJSON( host+"index.php?action=deactivateFeedbackSubType&stat=0&recId="+id, function( data ) {

        if(data.status==1){
           location.reload();
        }
        else{
            alert("De-Activate UN-Successful")
            hideLoading();

        }
        
        return false;



      });
      }
}

function deactivateFeedback(id,newval){

  if(id==1)
    str = "Are you sure you want to Activate the Feedback?";
  else
    str = "Are you sure you want to De-Activate the Feedback?";



  if(confirm(str)){
    showLoading();

     $.getJSON( host+"index.php?action=deactivateFeedback&newval="+newval+"&recId="+id, function( data ) {

        if(data.status==1){
           window.location.href = window.location.href;
        }
        else{
            alert("De-Activate UN-Successful")
            hideLoading();
        }
        
        return false;



      });
      }
}

/*************** Feedback ***************** */

function showAllFeedbacks(){

  $.getJSON( host+"index.php?action=showAllFeedbacks", function( data ) {
    
    str = "";
    count = 1;

    $.each( data, function( key, val ) {


      str += "<tr><td align='center'>"+val[0]+"</td><td>"+val[1]+"</td><td>";
      
      str+="<ul class='nomargin'>";

      $.each(val[6], function( k, v ) {
        str +="<li>"+v.store_name+"</li>";
      });
      
      str+="</ul>";

      startDate = new Date(val[2]);
      endDate = new Date(val[3]);
      todayDate = new Date();


      str += "</td><td align='center'>"+startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
      str += "</td><td align='center'>"+endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();

      if(val[5]==1){
        valueTxt = 0;
        activeTxt = "Active";
        ancTxt = "De-Activate"
      }
      else{
        valueTxt = 1;
        activeTxt = "De-Active";
        ancTxt = "Activate"
      }

      str += "</td><td>"+val[4]+"</td><td class='statTxt'>"+activeTxt+"</td><td align='center' style='vertical-align:middle'>";
      if(val[5]==1)
        str+="<a href='"+customerURL+"index.php?id="+val[0]+"' target='_blank'>URL</a> | <a href='javascript:deactivateFeedback("+val[0]+","+valueTxt+")'>"+ancTxt+"</a></td></tr>";
      else if(todayDate>endDate)
        str+="Expired</td></tr>"; 
      else
        str+="<a href='javascript:deactivateFeedback("+val[0]+","+valueTxt+")'>"+ancTxt+"</a></td></tr>";
      count++;

    });
    $("#tbodyFeedbacks").append(str);
    hideLoading();
  });
}

function commentPosting(){

  if($("#txtComments").val()==""){
    alert("Please enter your comments");
    $("#txtComments").focus()
    return false;
  }


  showLoading();
  var values = $("#commentPost").serialize();
  testURL = host+"index.php";

  $.ajax({
        url: testURL,
        type: "post",
        data: values,
        success: function(data){
          //alert(data)
            data = $.parseJSON(data);
            //alert(data.isAdmin)
           // alert(data.status)
            if(data.status==1){
                $(".alert").removeClass("alert-danger").addClass("alert-success").html(data.message).css("display","block");


                var myStr = ['<li class="comment even thread-odd thread-alt depth-2" id="staff_comment">',
                              '<article class="comment-body media" id="staff_div-comment-2">',
                              '<a href="#" class="pull-left">',
                              '<img width="50" height="50" class="avatar avatar-50 photo" src="img/staff.png" alt=""></a>',
                              '<div class="media-body">',
                              '<div class="media-body-wrap panel">',
                              '<h5 class="media-heading"><cite class="fn" id="staff_cf_name">'+data.staff_name+'</cite> <span class="says">says:</span></h5>',
                              '<p class="comment-meta">',
                              '<time id="staff_date_opened">'+data.status_date+'</time>',
                              '<p>Status: <em>'+$("#txtFeedbackStatus option:selected").text()+'</em></p>',
                              '</p>',
                              '<div class="comment-content">',
                              '<p id="staff_cf_comments">'+$("#txtComments").val()+'</p>',
                              '</div>',
                              '</div>',
                              '</div>',
                              '</article>',
                              '</li>'].join('\n');

                $("#commentList .children").append(myStr);

                window_height = $(".overflowData")[0].scrollHeight;
                $(".overflowData").animate({ scrollTop: window_height }, 'slow');

                $("#status_id").html($("#txtFeedbackStatus option:selected").text());


                //$("#commentPost")[0].reset();
                $("#txtComments").val("")

            }
            else{
                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");
                alert("Error! Please try later");
            }
            hideLoading();
            return false;

        },
        error:function(){
            alert("failure");
            hideLoading();
            return false;
        }
    });


  return false;
}


/************* Support **************/


function showAllSupport(){

  $.getJSON( host+"index.php?action=listAllSupport", function( data ) {

    str = "";
    data = data.supports;

    $.each( data, function( key, val ) {

      str += "<tr><td align='center'>"+val.id+"</td>";
      str += "<td>"+val.name+"</td>";
      str += "<td>"+val.mobile+"</td>";
      str += "<td>"+val.email+"</td>";
      str += "<td>"+val.support_function+"</td>";
      str += "<td align='center' style='vertical-align:middle'><a href='javascript:modifySupport("+val.id+")'>Edit</a> | <a href='javascript:deactivateSupport("+val.id+")'>Delete</a></td></td></tr>";

    });
    $("#tbodysupports").append(str);
    hideLoading();
  });
}


function addSupport(){

  if(validateSupport("")){
    ajaxifyForm("supportForm","exsupport");
  }
  return false;
}

function isChecked(chkBoxArray){
  var i, chks = $(chkBoxArray);
  for (i = 0; i < chks.length; i++){
    if (chks[i].checked){
        return true;
    }
  }
  return false;
}

function emailContacts(){

  if (!isChecked(".chkBoxArray")){
    alert("Please select atleast one Email ID");
    return false;
  }

  if($("#emailSub").val()==""){
    alert("Please enter the Email Subject");
    $("#emailSub").focus();
    return false;
  }

  if($("#emailMsg").val()==""){
    alert("Please enter the Email Message");
    $("#emailMsg").focus();
    return false;
  }
  showLoading();
  $("#emailSub").focus();


  var status_id = GetURLParameter('status_id');
  var cf_store = GetURLParameter('cf_store');
  str = "";


  if(status_id!="undefined")
    str+="&status_id="+status_id;

  if(cf_store!="undefined")
    str+="&cf_store="+cf_store;


  //ajaxifyForm("externalContacts","cfeedback"+str);
  ajaxifyForm("externalContacts","");

  return false;

}

function selectEmailsDialog(){
  showLoading();
  $.getJSON( host+"index.php?action=listAllSupport", function( data ) {

    str = "";
    data = data.supports;

    $.each( data, function( key, val ) {

      str += "<div><input type='checkbox' class='chkBoxArray' value='"+val.id+"' id='chk_"+val.id+"' name='emailChk[]'> <label for='chk_"+val.id+"'>"+val.name+" - ["+val.email+"]</label></div>";

    });
    $("#emailHolder").append(str);
    hideLoading();
  $("#selectEmails").modal();
  });


}

function modifySupport(supportID){

  showLoading();
  $.getJSON( host+"index.php?action=fetchSupportById&supportID="+supportID, function( data ) {
    //debugger;
    str = "";
    count = 1;


    support_id = data.support_id;
    name = data.name;
    mobile = data.mobile;
    email = data.email;
    address = data.address;
    support_function = data.support_function;

    $("#rec_ID").val(support_id);
    $("#edit_supportname").val(name);
    $("#edit_supportmobile").val(mobile);
    $("#edit_supportemail").val(email);
    $("#edit_supportaddress").val(address);
    $("#edit_supportfunction").val(support_function);

//alert(data.name)

    $('#updatesupport').modal();
    hideLoading();
  });
}

function updateSupport(){

  if(validateSupport("edit_")){
    ajaxifyForm("updatesupports","exsupport");
  }

  return false;
}

function deactivateSupport(id){

  if(confirm("Are you sure you want to delete this External Support?")){
    showLoading();

     $.getJSON( host+"index.php?action=deactivateSupport&recId="+id, function( data ) {

        if(data.status==1){
           location.reload();
        }
        else{
            alert("De-Activate UN-Successful")
            hideLoading();

        }
        
        return false;



      });
      }
}

function validateSupport(inpType){

  if($("#"+inpType+"supportname").val()==""){
    alert("Please enter Support Name");
    $("#"+inpType+"supportname").focus()
    return false;
  }


  if($("#"+inpType+"supportmobile").val()==""){
    alert("Please enter Support Mobile");
    $("#"+inpType+"supportmobile").focus()
    return false;
  }

  if($("#"+inpType+"supportemail").val()==""){
    alert("Please enter Support Email ID");
    $("#"+inpType+"supportemail").focus()
    return false;
  }

  // if(!(isValidEmailAddress($("#"+inpType+"admin_email").val()))){
  //   alert("Please enter Valid Admin Email ID");
  //   $("#"+inpType+"admin_email").focus()
  //   return false;
  // }

  if($("#"+inpType+"supportfunction").val()==""){
    alert("Please enter Support function");
    $("#"+inpType+"supportfunction").focus()
    return false;
  }

  return true;
}
/*************** Others ***************** */

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function hideSelectEmails(){
  $("#selectEmails").modal('hide');
}

function ajaxifyForm(formID,redirectPage){

  showLoading();
  var values = $("#"+formID).serialize();
  testURL = host+"index.php";

  $.ajax({
      url: testURL,
      type: "post",
      data: values,
      success: function(data){
        //alert(data)
          data = $.parseJSON(data);
          //alert(data.isAdmin)
         //alert(data.status)
          if(data.status==1){
              $(".alert").removeClass("alert-danger").addClass("alert-success").html(data.message).css("display","block");
              hideLoading();

              if(redirectPage==""){
                setTimeout(hideSelectEmails,2000);
              }
              else
                document.location.href="index.php?page="+redirectPage;
          }
          else
              $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");
          
          return false;

      },
      error:function(){
          alert("failure");
          hideLoading();
          return false;
      }
  });
}

function logout(){
	if(confirm("Are you sure you want to logout?"))
		location.href="logout.php";
}

function isValidEmailAddress(emailAddress) {
    //var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    // alert( pattern.test(emailAddress) );
    return pattern.test(emailAddress);
};

function showLoading(){
    $("#loading").show();
}

function hideLoading(){
    $("#loading").hide();
}
