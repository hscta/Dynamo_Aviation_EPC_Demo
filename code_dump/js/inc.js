//host = "http://gladminds.co/bajaj/";

 host = "http://localhost/Demo/code_dump/";



function showLoading(){

    $("#loading").show();

}



function hideLoading(){

    $("#loading").hide();

}



function noRecord(){

    alert("Coming Soon!")

}



function searchParts(xval){



if(xval==1){

    if($("#searchIn").val()==""){

        alert("Please select Search Category");

        $("#searchIn").focus();

        return false;

    }



    if($("#searchCatalogue").val()==""){

        alert("Please select Search Catalogue");

        $("#searchCatalogue").focus();

        return false;

    }

}





    showLoading();

    showSlide1();







    var values = $("#search").serialize();

    testURL = host+"inc.php";







    $.ajax({

        url: testURL,

        type: "post",

        data: values,

        success: function(data){

            data = $.parseJSON(data);

            

            if(data[0].status==1)

            {

                str = "";

                for(i=0;i<data[1].length;i++)

                {

                    //str+='<div class="span3"> <div class="info-box"> <a href="javascript:showSlide2('+data[1][i][0]+')"> <img src="'+data[1][i][2]+'" class="imgInfo"/> <span>'+data[1][i][1]+'</span> </a> </div> </div> </div>';

                    str+='<div class="span3"> <div class="info-box"> <a href="javascript:showSlide2('+data[1][i][3]+',\''+data[1][i][1]+'\','+data[1][i][4]+')"> <img src="'+data[1][i][2]+'" class="imgInfo"/> <span>'+data[1][i][1]+'</span> </a> </div> </div> </div>';

         

                }



                if(xval==1)

                    $("#search_results").html(str);

                else

                    $("#search_results").prepend(str);





            }

            else

            {

                $("#search_results").html('<div class="alert" style="display:block;text-align:center;"><strong>'+data[0].message+'</strong></div>');

            }



               hideLoading();

        },

        error:function(){

            alert("failure");

            hideLoading();

            return false;

        }

    });







    return false;



}



function showSlide1(){

    $("#search_results1,#search_results1a, #sr1a, #sr1, #search_results2").hide();

    $("#search").show()

    $("#search_results").show();

    $("#slide3").hide();

}



function showSlide3(framename,filename){



    if(filename=="Carburator 0.5" || filename=="Cylinder Valve 0.9"){

        $("#search_results1,#search_results1a, #sr1a, #sr1, #search_results2, #search_results").hide();

        $("#search").hide();

        $("#slide3").show(function(){

            $("#bajajFrame").attr('src',framename);

        });

    }



}



function justShowSlide2(){

    $("#search").show();

    $("#slide3").hide();

    $("#search_results").hide();

    $("#search_results1").show();

    sr1();

}



function sr1(){

    $("#sr1aObj").removeClass("active");

    $("#sr1Obj").addClass("active");

    $("#sr1a").fadeOut('slow',function(){$("#sr1").fadeIn();});

    

}





function sr1a(){

    $("#sr1Obj").removeClass("active");

    $("#sr1aObj").addClass("active");

    $("#sr1").fadeOut('slow',function(){$("#sr1a").fadeIn();});

    

}





function showSlide2(id,product_name,ptype_id){

    $("#search").show();

    showLoading();



  $.getJSON( host+"inc.php?action=slide2&id="+id, function(data1) {

    



        if(data1[0].status==1)

        {

            str = "";

            str +="<div class='row-fluid greybg'><div class='span2' style='text-indent:10px;'><a href='javascript:showSlide1()'><i class='icon-large icon-arrow-left'></i> Back</a></div><div class='span8'>"+product_name+"</div><div class='span2' style='text-align:right;'>";



            str +="<a href='javascript:sr1a()' id='sr1aObj'><i class='icon-large icon-reorder'></i></a><a href='javascript:sr1()' class='active' id='sr1Obj'><i class='icon-large icon-th'></i></a></div></div><div class='row' id='sr1'>"

            

            //debugger;



            for(i=0;i<data1[1].length;i++)

            {



                if(ptype_id==1)

                    filename = "frame/Bajaj_Pulsar_NS200_Cylinder_Head_Assembly.htm";

                else

                    filename = "frame1/PUMP-1-11-22-33-0001-000A-0_001-00_en-US.htm";



                if(($("#searchIn").val()!="Vin")) {

                    if((data1[1][i][1]).toLowerCase().indexOf($("#searchCatalogue").val().toLowerCase())!=-1){

                        if(data1[1][i][1]=="Carburator 0.5" || data1[1][i][1]=="Cylinder Valve 0.9")

                            str+='<div class="span2"> <div class="info-box1"> <a href="javascript:showSlide3(\''+filename+'\',\''+data1[1][i][1]+'\')"> <img src="'+data1[1][i][2]+'" class="imgInfo1" title="'+data1[1][i][3]+'"/> <span>'+data1[1][i][1]+'</span> </a> </div> </div>';

                        else

                            str+='<div class="span2"> <div class="info-box1"> <a href="javascript:showSlide3(\''+filename+'\',\''+data1[1][i][1]+'\')" class="noLink"> <span class="cs">Coming Soon</span> <img src="'+data1[1][i][2]+'" class="imgInfo1" title="'+data1[1][i][3]+'"/> <span>'+data1[1][i][1]+'</span> </a> </div> </div>';

                    }

                }

                else{

                    if(data1[1][i][1]=="Carburator 0.5" || data1[1][i][1]=="Cylinder Valve 0.9")

                        str+='<div class="span2"> <div class="info-box1"> <a href="javascript:showSlide3(\''+filename+'\',\''+data1[1][i][1]+'\')"> <img src="'+data1[1][i][2]+'" class="imgInfo1" title="'+data1[1][i][3]+'"/> <span>'+data1[1][i][1]+'</span> </a> </div> </div>';

                    else

                        str+='<div class="span2"> <div class="info-box1"> <a href="javascript:showSlide3(\''+filename+'\',\''+data1[1][i][1]+'\')" class="noLink"> <span class="cs">Coming Soon</span> <img src="'+data1[1][i][2]+'" class="imgInfo1" title="'+data1[1][i][3]+'"/> <span>'+data1[1][i][1]+'</span> </a> </div> </div>';

                }

            }





            str +="</div><div class='row-fluid' id='sr1a' style='display:none;'><ul id='treeList'></ul></div>";



            $("#search_results1").html(str);



            $("#treeList li").remove();

            $("#treeList").append("<li>"+product_name+"<ul id='mainUL'></ul></li>");



            for(i=0;i<data1[1].length;i++)

            {

                 if(($("#searchIn").val()!="Vin")) {

                    if((data1[1][i][1]).toLowerCase().indexOf($("#searchCatalogue").val().toLowerCase())!=-1){

                        $("#mainUL").append("<li><a href='javascript:showSlide3(\""+filename+"\",\""+data1[1][i][1]+"\")'>"+data1[1][i][1]+"</a></li>");

                    }

                }

            }

        }

        else

        {

            $("#search_results1").html('<div class="alert" style="display:block;text-align:center;"><strong>'+data1[0].message+'</strong></div>');

        }



        hideLoading();

       $("#search_results").fadeOut(function(){

            $("#search_results1").fadeIn()

       });



    });

   

}



function changeLanguageAjax(){

    lang = $("#txtLanguage").val();

    if(lang=="")

        $("#tbodyTechnicals tr, .en_ico, .fr_ico, .ka_ico").show();

    else{

        $("#tbodyTechnicals tr, .en_ico, .fr_ico, .ka_ico").hide();

        $("."+lang).show();

        $("."+lang+"_ico").show();

    }

}



function searchTechDetails(str){



if(str==1){

    if($("#groupid").val()=="" && $("#bulletinid").val()==""){

        alert("Please select Group name or Bulletin Type");

        $("#groupid").focus();

        return false;

    }



    // if($("#bulletinid").val()==""){

    //     alert("Please select Bulletin ID");

    //     $("#bulletinid").focus();

    //     return false;

    // }



    var values = $("#searchTechForm").serialize();

    testURL = host+"inc.php";

}

else{

    values = "";

    testURL = host+"inc.php?action=searchTechDetails";

}

    showLoading();





// alert("d")

    $.ajax({

        url: testURL,

        type: "post",

        data: values,

        success: function(data){

            // alert(data)

            data = $.parseJSON(data);

            

            if(data[0].status==1)

            {

                count = 1;

                str='<div class="widget-content"><table class="table"> <thead> <tr class="smalltr"> <th width="30">#</th> <th>Product Type</th> <th>Group Name</th> <th>Bulletin Type</th> <th>Bulletin ID</th> <th>Bulletin Description</th> <th>Plates</th> <th>Date / Time</th> ';



                str +="<th><select name='txtLanguage' id='txtLanguage' style='width:115px;margin:0' onchange='changeLanguageAjax()'><option value='' "+all+">All Languages</option><option value='en' "+en+">English</option><option value='fr' "+fr+">French</option><option value='ka' "+ka+">Kannada</option></select>";





                str+='</th> </tr> </thead> <tbody id="tbodyTechnicals">';

                for(i=0;i<data[1].length;i++)

                {

                   

                     classes = "";



                     if(data[1][i][5]!="")

                        classes += "en ";



                     if(data[1][i][6]!="")

                        classes += "fr ";



                     if(data[1][i][7]!="")

                        classes += "ka ";



                    str+="<tr class='"+classes+" smalltr'>";

                    str+='  <td width="5%" align="center"><strong>'+ count++ +'</strong></td>';

                    str+='  <td align="center">'+data[1][i][0]+'</td>';

                    str+='  <td align="center">'+data[1][i][1]+'</td>';

                    str+='  <td align="center">'+data[1][i][2]+'</td>';

                    str+='  <td align="center">'+data[1][i][3]+'</td>';

                    str+='  <td align="center">'+data[1][i][4]+'</td>';

                    str+='  <td align="center">'+data[1][i][9]+'</td>';

                    str+='  <td align="center">'+data[1][i][8]+'</td>';

                    str+='  <td align="center">';



                    if(data[1][i][5]!="")

                        str+='  <span class="en_ico"><img src="../img/flags/uk.jpg" class="flags"/>[ <a href="'+data[1][i][5]+'" target="_blank" >Open</a> ]<br/></span>';



                    if(data[1][i][6]!="")

                        str+='  <span class="fr_ico"><img src="../img/flags/fr.jpg" class="flags"/>[ <a href="'+data[1][i][6]+'" target="_blank" >Open</a> ]<br/></span>';



                    if(data[1][i][7]!="")

                        str+='  <span class="ka_ico"><img src="../img/flags/ka.jpg" class="flags"/>[ <a href="'+data[1][i][7]+'" target="_blank" >Open</a> ]<br/></span>';



                    str+='  </td>';

                    str+='</tr>';







                

         

                }

                str+="</tbody></table></div>";



                $("#search_results").html(str);



            }

            else

            {

                $("#search_results").html('<div class="alert" style="display:block;text-align:center;"><strong>'+data[0].message+'</strong></div>');

            }



               hideLoading();

        },

        error:function(){

            alert("failure");

            hideLoading();

            return false;

        }

    });







    return false;



}



function prEmail(){

    showLoading();

    var values = $("#addUserForm").serialize();

    testURL = host+"inc.php";



    $.ajax({

        url: testURL,

        type: "post",

        data: values,

        success: function(data){

          //alert(data)

            data = $.parseJSON(data);

            if(data.status==1){

                $(".alert").removeClass("alert-danger").addClass("alert-success").html(data.message).css("display","block").delay(2000).hide();



				$("#forgotPassword").fadeOut(function(){

					$("#divComponent").fadeIn()

				});

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function validator(){

	if($("#username").val()==""){

		alert("Please enter Username");

		$("#username").focus();

		return false;

	}

	if($("#password").val()==""){

		alert("Please enter Password");

		$("#password").focus();

		return false;

	}



   	showLoading();

    var values = $("#loginForm").serialize();

    testURL = host+"inc.php";



    $.ajax({

        url: testURL,

        type: "post",

        data: values,

        success: function(data){

          //alert(data)

            data = $.parseJSON(data);

            if(data.status==1){

                $(".alert").removeClass("alert-danger").addClass("alert-success").html(data.message).css("display","block");



                if(data.adminRole==1)

                	folder = "user_superadmin/index.php";

                else if(data.adminRole==2)

                	folder = "user_admin/index.php?page=addstaff";

                else if(data.adminRole==3)

                    folder = "user_staff/index.php?page=noticeboard";

                else if(data.adminRole==4)

                    folder = "user_dealer/index.php?page=noticeboard";

                else if(data.adminRole==5)

                	folder = "user_dealer/index.php?page=noticeboard";





                location.href=folder;



            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function showAllUsers(){



  $.getJSON( host+"inc.php?action=listAllUsers", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {



        if(val[5]=="1")

            userType = "Super Admin";

        else if(val[5]=="2")

            userType = "Admin";

        else if(val[5]=="3")

            userType = "Staff";

        else if(val[5]=="4")

            userType = "ASC User";





        str += "<tr><td>"+count+"</td><td>"+val[1]+"</td><td>"+val[2]+"</td><td>"+val[3]+"</td><td>"+val[4]+"</td><td>"+userType+"</td><td>";



        if(val[5]=="2")

            str += "<a href='javascript:passwordReset(\""+val[0]+"\")' class='btn'>Reset Password</a></td>";

        else

            str +="&nbsp;";



        str+="</tr>";



        count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function passwordReset(userid){



    $.getJSON( host+"inc.php?action=passwordResetByEmail&userid="+userid, function( data ) {

    

         if(data.status==1){

            alert(data.status)



            hideLoading();

        }

  });

}



function showAllSpares(){



  $.getJSON( host+"inc.php?action=showSpareParts", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {







        str += "<tr><td>"+count+"</td><td>"+val[1]+"</td><td><img src='"+val[2]+"' style='max-width:100px;' class='imgBorder'/></td><td>";





        str += "<a href='javascript:deleteSpares("+val[0]+")' class='btn'>Delete</a></td>";

    

        str+="</tr>";



        count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function listSpares(){



  $.getJSON( host+"inc.php?action=showSpareParts", function( data ) {

    str = "";

    $.each( data, function( key, val ) {

        str += "<option value='"+val[0]+"'>"+val[1]+"</option>";

    });



    $("#spares").append(str);

    hideLoading();

  });

}



function getSparePartsByID(){

    showLoading();

    if($("#txtProductType").val()==""){

        $("#spares option").remove();

    }

    else{

      $.getJSON( host+"inc.php?action=getSpareParts&product_type_id="+$("#txtProductType").val(), function( data ) {

        str = "";

        $.each( data, function( key, val ) {

            str += "<option value='"+val[0]+"'>"+val[1]+"</option>";

        });

        $("#spares option").remove()

        $("#spares").append(str);

      });

    }

    

    hideLoading();

}



var vinArr = [];



function moveVin(){

    txtFromVinNumber    = $("#txtFromVinNumber").val();

    txtToVinNumber      = $("#txtToVinNumber").val();



if(txtFromVinNumber==""){

    alert("Please Enter Vin Number");

    $("#txtFromVinNumber").focus();

    return false;

}



if(txtToVinNumber!=""){

    vinStr = txtFromVinNumber.slice(0,11);

    //alert(vinStr);



    

    fromNum = txtFromVinNumber.slice(11, txtFromVinNumber.length);

    toNum = txtToVinNumber.slice(11, txtToVinNumber.length);



    //alert(fromNum+"-"+toNum)







    for(i=fromNum; i<=toNum;i++){

        optionVal = vinStr+""+i;

        //alert(jQuery.inArray(optionVal, vinArr))

        if((jQuery.inArray(optionVal, vinArr))==-1)

            vinArr.push(optionVal);

    }

  

}

else{

   if((jQuery.inArray(txtFromVinNumber, vinArr))==-1)

       vinArr.push(txtFromVinNumber);

}



    $("#vins option").remove()

    $( vinArr ).each(function( index,optionVal ) {



        option = "<option value='"+optionVal+"'>"+optionVal+"</option>";

        $("#vins").append(option);



    });



    $("#txtFromVinNumber").val("").focus()

    $("#txtToVinNumber").val("")

}



function showAllGroups(){



  $.getJSON( host+"inc.php?action=showGroups", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {







		str += "<tr><td>"+count+"</td><td>"+val[1]+"</td><td><img src='"+val[2]+"' style='max-width:100px;'/></td><td>";





		str += "<a href='javascript:deleteGroup("+val[0]+")' class='btn'>Delete</a></td>";

	

		str+="</tr>";



		count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function moveRight(){

     $('#spares option:selected').appendTo('#selectedSpares');

}



function moveLeft(){

     $('#selectedSpares option:selected').appendTo('#spares');

}



function removeVin(){

     $('#vins option:selected').remove();

}



function showASC(){



  $.getJSON( host+"inc.php?action=showASC", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {



		str += "<tr><td>"+count+"</td><td>"+val[0]+"</td><td>"+val[1]+"</td><td>"+val[2]+"</td><td>"+val[6]+"</td><td>"+val[3]+"</td><td>"+val[4]+"</td><td>"+val[5]+"</td><td>";



			str += "<a href='javascript:deleteASC("+val[0]+")' class='btn'>Delete</a></td>";

	



		str+="</tr>";



		count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function showadminUsers(){



  $.getJSON( host+"inc.php?action=showadminUsers", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {



    	// if(val[5]=="1")

    	// 	userType = "Super Admin";

    	// else if(val[5]=="2")

    	// 	userType = "Admin";

    	// else if(val[5]=="3")

    	// 	userType = "Dealer";

    	// else if(val[5]=="4")

    	// 	userType = "ASC User";





    	// if(val[6]=="1")

    	// 	userRole = "Spares Advisor";

    	// else if(val[6]=="2")

    	// 	userRole = "Spares Staff1";

    	// else if(val[6]=="3")

    	// 	userRole = "ASC Advisor";

    	// else if(val[6]=="4")

    	// 	userRole = "ASC Staff1";

    	// else

    	// 	userRole = val[6];





		str += "<tr><td>"+count+"</td><td>"+val[1]+"</td><td>"+val[2]+"</td><td>"+val[3]+"</td><td>"+val[4]+"</td><td>";

		//+userType+"</td><td>"+userRole+"</td><td>";



		if(val[5]=="2")

			str += "<a href='javascript:passwordReset(this)' class='btn'>Reset Password</a></td>";

		else

			str +="&nbsp;";



		str+="</tr>";



		count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function deleteASC(id){



    if(confirm("Are you sure you want to delete the ASC?")){

        $.getJSON( host+"inc.php?action=deleteASC&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteTech(id){



	if(confirm("Are you sure you want to delete the Technical Details?")){

		$.getJSON( host+"inc.php?action=deleteTech&id="+id, function( data ) {

	    

	    	if(data==1){

	    		location.reload();

	    	}



	  });

	}

}



function deleteGroup(id){



    if(confirm("Are you sure you want to delete the Group?")){

        $.getJSON( host+"inc.php?action=deleteGroup&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteSpares(id){



    if(confirm("Are you sure you want to delete the Spare?")){

        $.getJSON( host+"inc.php?action=deleteSpares&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteDealer(id){



	if(confirm("Are you sure you want to delete the Dealer?")){

		$.getJSON( host+"inc.php?action=deleteDealer&id="+id, function( data ) {

	    

	    	if(data==1){

	    		location.reload();

	    	}



	  });

	}

}



function showproductTypes(){



  $.getJSON( host+"inc.php?action=showproductTypes", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {



        //`dealer_id`,`dealer_name`,`dealer_email`,`dealer_service_advisor_name`,`dealer_service_advisor_mobile`



        str += "<tr><td>"+count+"</td><td align='left'>"+val[1]+"</td><td align='left'>"+val[2]+"</td>";

        //+userType+"</td><td>"+userRole+"</td><td>";



    

        str +="<td><a href='javascript:deleteproductTypes("+val[0]+")' class='btn'>Delete</a></td>";



        str+="</tr>";



        count++;



    });

    $("#tbodyproductType").append(str);

    hideLoading();

  });



}

function showproductCategorys(){



  $.getJSON( host+"inc.php?action=showProductCategory", function( data ) {

    str = "";

    count = 1;

    $.each( data, function( key, val ) {



        //`dealer_id`,`dealer_name`,`dealer_email`,`dealer_service_advisor_name`,`dealer_service_advisor_mobile`



        str += "<tr><td>"+count+"</td><td>"+val[1]+"</td>";

        //+userType+"</td><td>"+userRole+"</td><td>";



    

        str +="<td><a href='javascript:deleteCategoryTypes("+val[0]+")' class='btn'>Delete</a></td>";



        str+="</tr>";



        count++;



    });

    $("#tbodyproductCategory").append(str);

    hideLoading();

  });



}

function showDealers(){



  $.getJSON( host+"inc.php?action=showDealers", function( data ) {

    str = "";

    count = 1;



    $.each( data, function( key, val ) {



        //`dealer_id`,`dealer_name`,`dealer_email`,`dealer_service_advisor_name`,`dealer_service_advisor_mobile`



        str += "<tr><td>"+count+"</td><td>"+val[0]+"</td><td>"+val[1]+"</td><td>"+val[5]+"</td><td>"+val[2]+"</td><td>"+val[3]+"</td><td>"+val[4]+"</td>";

        //+userType+"</td><td>"+userRole+"</td><td>";



    

        str +="<td><a href='javascript:deleteDealer("+val[0]+")' class='btn'>Delete</a></td>";



        str+="</tr>";



        count++;



    });

    $("#tbodyUsers").append(str);

    hideLoading();

  });

}



function submitASC(){



    if($("#txtSelectDealer").val()==""){

        alert("Please select Dealer");

        $("#txtSelectDealer").focus();

        return false;

    }

    if($("#txtascName").val()==""){

        alert("Please enter ASC Name");

        $("#txtascName").focus();

        return false;

    }



    if($("#txtascUserName").val()==""){

        alert("Please enter Dealer Username");

        $("#txtascUserName").focus();

        return false;

    }

    if($("#txtascPassword").val()==""){

        alert("Please enter Dealer Password");

        $("#txtascPassword").focus();

        return false;

    }



    if($("#txtascCPassword").val()!=$("#txtascCPassword").val()){

        alert("Passwords donot match");

        $("#txtascCPassword").focus();

        return false;

    }



    if($("#txtascEmail").val()==""){

        alert("Please enter Dealer Email");

        $("#txtascEmail").focus();

        return false;

    }

    if(!validateEmail($("#txtascEmail").val())){

        alert("Please enter valid Email ID");

        $("#txtascEmail").focus();

        return false;

    }

    if($("#txtPMName").val()==""){

        alert("Please enter Parts Manager Name");

        $("#txtPMName").focus();

        return false;

    }

    if($("#txtPMMobile").val()==""){

        alert("Please enter Parts Manager Mobile Number");

        $("#txtPMMobile").focus();

        return false;

    }













    showLoading();

    var values = $("#submitASC").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=addasc";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function submitnewProduct(){



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

    var values = $("#addproductForm").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=product";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function submitNewUser(x){



	if($("#txtUsername").val()==""){

		alert("Please enter Username");

		$("#txtUsername").focus();

		return false;

	}

	if($("#txtName").val()==""){

		alert("Please enter Name");

		$("#txtName").focus();

		return false;

	}

	if($("#txtPassword").val()==""){

		alert("Please enter Password");

		$("#txtPassword").focus();

		return false;

	}

	if($("#txtEmail").val()==""){

		alert("Please enter Email");

		$("#txtEmail").focus();

		return false;

	}

	if(!validateEmail($("#txtEmail").val())){

		alert("Please enter valid Email ID");

		$("#txtEmail").focus();

		return false;

	}

	if($("#txtMobile").val()==""){

		alert("Please enter Mobile Number");

		$("#txtMobile").focus();

		return false;

	}













    showLoading();

    var values = $("#addUserForm").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function deleteNotices(id){



    if(confirm("Are you sure you want to delete the notice?")){

        $.getJSON( host+"inc.php?action=deleteNotices&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteproductTypes(id){



    if(confirm("Are you sure you want to delete the Product Type?")){

        $.getJSON( host+"inc.php?action=deleteProductType&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteCategoryTypes(id){



    if(confirm("Are you sure you want to delete the Product Category Type?")){

        $.getJSON( host+"inc.php?action=deleteCategoryType&id="+id, function( data ) {

        

            if(data==1){

                location.reload();

            }



      });

    }

}



function deleteproduct(id){



	if(confirm("Are you sure you want to delete the Product?")){

		$.getJSON( host+"inc.php?action=deleteProduct&id="+id, function( data ) {

	    

	    	if(data==1){

	    		location.reload();

	    	}



	  });

	}

}



function submitGroups(){



    if($("#txtProductType").val()==""){

        alert("Please select Product Type");

        $("#txtProductType").focus();

        return false;

    }



    if($("#txtRevision").val()==""){

        alert("Please select Revision");

        $("#txtRevision").focus();

        return false;

    }

    if($("#txtGroupName").val()==""){

        alert("Please enter Group Name");

        $("#txtGroupName").focus();

        return false;

    }

    if($("#txtGroupDesc").val()==""){

        alert("Please enter Group Description");

        $("#txtGroupDesc").focus();

        return false;

    }



    if($('#vins > option').length==0){

        alert("Please enter atlease One Vin Number");

        $("#txtVinNumber").focus();

        return false;

    }



    if($('#selectedSpares > option').length==0){

        alert("Please select atleast one spare part(s)");

        $("#spares").focus();

        return false;

    }





    $('#vins option').prop('selected', true);

    $('#selectedSpares option').prop('selected', true);





    showLoading();

    var values = $("#addGroupParts").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=groupDetails";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function submitnewProductType(x){



    if($("#txtProductType").val()==""){

        alert("Please enter Product Type");

        $("#txtProductType").focus();

        return false;

    }



    if($("#txtProductCategory").val()==""){

        alert("Please Select Product Category");

        $("#txtProductCategory").focus();

        return false;

    }





    showLoading();

    var values = $("#addproductTypeForm").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=productType";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function submitnewProductCategory(x){



    if($("#txtProductCategory").val()==""){

        alert("Please enter Product Category");

        $("#txtProductCategory").focus();

        return false;

    }





    showLoading();

    var values = $("#addproductCategoryForm").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=productCategory";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function submitDealer(x){



	if($("#txtdealerName").val()==""){

		alert("Please enter Dealer Name");

		$("#txtdealerName").focus();

		return false;

	}

    if($("#txtdealerUserName").val()==""){

        alert("Please enter Dealer Username");

        $("#txtdealerUserName").focus();

        return false;

    }

	if($("#txtdealerEmail").val()==""){

		alert("Please enter Dealer Email");

		$("#txtdealerEmail").focus();

		return false;

	}

	if(!validateEmail($("#txtdealerEmail").val())){

		alert("Please enter valid Email ID");

		$("#txtdealerEmail").focus();

		return false;

	}

    

    if($("#txtdealerPassword").val()==""){

        alert("Please enter Password");

        $("#txtdealerPassword").focus();

        return false;

    }

	

    if($("#txtdealerPassword").val()!=$("#txtdealerCPassword").val()){

        alert("Passwords donot match");

        $("#txtdealerCPassword").focus();

        return false;

    }



	if($("#txtdealerSAName").val()==""){

		alert("Please enter Service Advisor Name");

		$("#txtdealerSAName").focus();

		return false;

	}

	if($("#txtdealerSAMobile").val()==""){

		alert("Please enter Service Advisor Mobile Number");

		$("#txtdealerSAMobile").focus();

		return false;

	}





    showLoading();

    var values = $("#addDealer").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=adddealers";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function getUserRoles(obj){



    showLoading();

    var values = $("#addUserForm").serialize();

    testURL = host+"inc.php";

    options ="";



  $.getJSON( host+"inc.php?action=getUserRoles&userTypeID="+$(obj).val(), function( data ) {

    

    str = "";

    count = 1;

    	options +="<option value=''>Select User Role</option>";

    $.each( data, function( key, val ) {

    	options += "<option value="+val[0]+">"+val[1]+"</option>";

    });



    $("#txtuserRole option").remove()

    $("#txtuserRole").append(options).removeAttr("disabled");



    hideLoading();

  });

}



function submitnewStaff(x){



	if($("#txtUsername").val()==""){

		alert("Please enter Username");

		$("#txtUsername").focus();

		return false;

	}

	if($("#txtName").val()==""){

		alert("Please enter Name");

		$("#txtName").focus();

		return false;

	}

	if($("#txtPassword").val()==""){

		alert("Please enter Password");

		$("#txtPassword").focus();

		return false;

	}

	if($("#txtEmail").val()==""){

		alert("Please enter Email");

		$("#txtEmail").focus();

		return false;

	}

	if(!validateEmail($("#txtEmail").val())){

		alert("Please enter valid Email ID");

		$("#txtEmail").focus();

		return false;

	}

	if($("#txtMobile").val()==""){

		alert("Please enter Mobile Number");

		$("#txtMobile").focus();

		return false;

	}



	if($("#txtuserType").val()==""){

		alert("Please select User Type");

		$("#txtuserType").focus();

		return false;

	}



	if($("#txtuserRole").val()==""){

		alert("Please select User Role");

		$("#txtuserRole").focus();

		return false;

	}











    showLoading();

    var values = $("#addStaffForm").serialize();

    testURL = host+"inc.php";



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

                document.location.href="index.php?page=addstaff";

            }

            else

                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");

            

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



function logout(){

	if(confirm("Are you sure you want to Logout?")){

		document.location.href="logout.php";

	}

}



function processPage(){



	if($("#vin").val()==""){

		alert("Please Enter VIN");

		$("#vin").focus();

	}

	else{



		vehicleSelection = $("#vehicleSelection").val();



		downloadLinks = '<li class="sidebar-brand">Downloads</li>';

		imgsrc = "img/vehicle/";

		shortCuts = "";



		if(vehicleSelection==1){

			//Discover

			imgBasePath = imgsrc+"discover/";

			imgsrc = imgBasePath+"discover.png";



			downloadLinks +='<li><a href="download/discover/A-17-Modification on Discover100-Cl & Mag cover with DTS-i decals.pdf" target="_blank">DTSi-Decals</a>';

			downloadLinks +='<li><a href="download/discover/A-18-Introduction of Discover 100 ES with Spoke Wheels.pdf" target="_blank">Spoke Wheels</a>';

			downloadLinks +='<li><a href="download/discover/Discover 125ST_T_100T SPC_REV_04_JAN_14.pdf" target="_blank">Discover 125-REV04</a>';



		}

		if(vehicleSelection==2){

			//Discover

			imgBasePath = imgsrc+"pulsar/";

			imgsrc = imgBasePath+"pulsar.png";



			downloadLinks +='<li><a href="download/pulsar/Pulsar 180 SPC_REV04_ MAY 14.pdf" target="_blank">Pulsar 180 SPC</a>';

			downloadLinks +='<li><a href="download/pulsar/SC 3WH_TI_217-GASKET CYLINDER HEAD-DSL VERSION.pdf" target="_blank">HEAD-DSL VERSION</a>';



		}

		if(vehicleSelection==3){

			//Discover

			imgBasePath = imgsrc+"RE/";

			imgsrc = imgBasePath+"RE.png";



			downloadLinks +='<li><a href="download/RE/RE COMPACT & OPTIMA 4S.pdf" target="_blank">RE COMPACT & OPTIMA 4S</a>';

			downloadLinks +='<li><a href="download/RE/RE COMPACT KS, ES (PETROL,CNG,LPG) 15 VERSION.pdf" target="_blank">RE COMPACT KS</a>';

			downloadLinks +='<li><a href="download/RE/SC 3WH_TI_216-MOD FORK ASSY-SPACER ADDITION-RE 205.pdf" target="_blank">RE SPACER ADDITION</a>';



		}



		if(vehicleSelection==2){

			shortCuts = '<a href="javascript:show2D3D();" class="shortcut" ><img src="'+imgBasePath+'parts/img1.png" height="80"/></a>';

		}

		else{

			shortCuts = '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img1.png" height="80"/></a>';

		}

		

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img2.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img3.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img4.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img5.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img6.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img7.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img8.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img9.png" height="80"/></a>';

		shortCuts += '<a href="javascript:;" class="shortcut"><img src="'+imgBasePath+'parts/img10.png" height="80"/></a>';



		$("#imgVehicle").attr("src",imgsrc);

		$("#downloadLinks").empty().append(downloadLinks);

		$("#shortCuts").empty().append(shortCuts);





		$("#slide1").fadeOut("slow",function(){



			$("#slide2").fadeIn();



		});





    }          

}



function show2D3D(){

	$("#slide2").fadeOut("slow",function(){

			$("#slide3").fadeIn();

			$("#bajajFrame").attr("src","frame/Bajaj_Pulsar_NS200_Cylinder_Head_Assembly.htm");

	});

}



function showdashBoard(){

	$("#slide3").fadeOut("slow",function(){

			$("#slide2").fadeIn();

	});

}



function showHome(obj){

	$("#"+obj).fadeOut("slow",function(){

		$("#slide1").fadeIn();

	})

}





function validateEmail(sEmail){

    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (filter.test(sEmail)) {

        return true;

    }

    else {

        return false;

    }

}





function showhideModal(){

    $("#modalGroup").toggle("slow")

}



function changeLanguage(){

    //url = $(location).attr('href');

    url = removeParam("lang");

    if(!($("#txtLanguage").val()==""))

        url = url+"&lang="+$("#txtLanguage").val();



    location.href = url;

}



function removeParam(parameter){

    var url=document.location.href;

    var urlparts= url.split('?');



    if (urlparts.length>=2)

    {

      var urlBase=urlparts.shift(); 

      var queryString=urlparts.join("?"); 



      var prefix = encodeURIComponent(parameter)+'=';

      var pars = queryString.split(/[&;]/g);

      for (var i= pars.length; i-->0;)               

          if (pars[i].lastIndexOf(prefix, 0)!==-1)   

              pars.splice(i, 1);

      url = urlBase+'?'+pars.join('&');

    }

    return url;

}

