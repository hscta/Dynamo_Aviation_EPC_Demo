function addCategoryRow(){

	str = '<tr><td><select class="foo" name="txtComplaintCategory[]"><option value="">Select Category</option></select></td><td><input type="text" name="txtCustomerVoice[]"/></td><td align="center"><a href="javascript:void(0)" onclick="removeRow(this)" data-role="button" data-icon="delete" data-iconpos="notext"  data-mini="true" >Remove</a></td></tr>';

	$("#complaintCategoryBody").append(str);
}

function removeRow(obj){
	obj = $(obj).parents("tr").remove();
}

//*******************************Page Loads for ADD ******************************************//

$("#fcrDashboard").on("pageshow",function(){
	showLoading();

	emp_code = localStorage.getItem("bajaj_empcode");

	$('form').each(function() { this.reset() });
	
	$.getJSON( host+"index.php?action=listAllComplaintsOpen&emp_code="+emp_code, function( data ) {
		
		str = "";


		$.each( data, function( key, val ) {
	      str += "<tr><td align='center'><a class='openfcrAction' href='#' rel='"+val.complaint_no+"'>"+val.complaint_no+"</td><td align='center'>"+val.customer_name+"</td><td align='center'>"+val.phone_number+"</td><td align='center'>"+val.frame_VIN+"</td><td align='center'>"+val.veh_reg_no+"</td><td align='center'>"+val.location+"</td><td align='center'>"+val.engine_no+"</td><td align='center' style='vertical-align:middle'><a href='javascript:modifyComplaint("+val.complaint_no+")' class='ui-input-btn ui-btn  ui-btn-inline ui-mini'>Edit</a><a href='#' onclick='deactivateComplaint("+val.complaint_no+",this)' class='ui-input-btn ui-btn  ui-btn-inline ui-mini'>Delete</a></td></tr>";
	    });
		
		$("#fcr_complaintList").html(str);
		$("#fcr_compaintTable").table("refresh");
	    hideLoading();

	    $(".openfcrAction").click(function(){
	    	sessionStorage.complaintID = $(this).attr("rel");
	    	//alert($(this).attr("rel"));
	    	$.mobile.navigate("#cr_action");
	    })
	  });
});

$("#fcrDashboardClosed").on("pageshow",function(){
	showLoading();	
	emp_code = localStorage.getItem("bajaj_empcode");
	
	$.getJSON( host+"index.php?action=listAllComplaintsClosed&emp_code="+emp_code, function( data ) {
		
		str = "";

		$.each( data, function( key, val ) {
	      str += "<tr><td align='center'>"+val.complaint_no+"</td><td align='center'>"+val.customer_name+"</td><td align='center'>"+val.phone_number+"</td><td align='center'>"+val.frame_VIN+"</td><td align='center'>"+val.veh_reg_no+"</td><td align='center'>"+val.location+"</td><td align='center'>"+val.engine_no+"</td><td align='center' style='vertical-align:middle'></td></tr>";
	    });
		
		$("#complaintListClosed").html(str);
		$("#compaintTableClosed").table("refresh");
	    hideLoading();
	  });
});

$("#cr_add_default").on("pageshow",function(){
	showLoading();
	emp_code = localStorage.getItem("bajaj_empcode");
	$.getJSON( host+"index.php?action=listAllLocations&emp_code="+emp_code, function( data ) {

		d = new Date();
		newDate = d.getFullYear()+"/"+(parseInt(d.getMonth())+1)+"/"+d.getDate()+" 17:00";

		$("#cr_txtLocation").find('option').remove();
		$("#cr_txtLocation").append("<option value=''>Select Location</select>");

		$.each( data[0].locations, function( key, val ) {
			sel = (val.selected==1)?"selected":"";
			$("#cr_txtLocation").append("<option value='"+val.location_id+"' "+sel+">"+val.location_name+"</option>")
		});
		$('#cr_txtLocation').selectmenu('refresh');


		$("#cr_txtComplaintNumber").val(sessionStorage.complaintID);
		$("#cr_txtEmpCode").val(emp_code);
		$("#cr_datetime").val(newDate);
		hideLoading();
	});
});

$("#cr_add_customer, #cr_uploadPic").on("pageshow",function(){
	$(".complaintNumber").val(sessionStorage.complaintID);
	$("#cr_txtPhone").ForceNumericOnly()
});

$("#cr_finish").on("pageshow",function(){
	$("#complaintNumber").html(sessionStorage.complaintID);
});

$("#cr_add_vehicle").on("pageshow",function(){
	showLoading("Loading Vehicle Models");
	$(".complaintNumber").val(sessionStorage.complaintID);
	$("#cr_txtEngno").ForceNumericOnly()
	$("#cr_txtKMR").ForceNumericOnly()
	

	emp_code = localStorage.getItem("bajaj_empcode");
	$.getJSON( host+"index.php?action=listAllModels&emp_code="+emp_code, function( data ) {

		$("#cr_txtModel").find('option').remove();
		$("#cr_txtModel").append("<option value=''>Select Vehicle Model</select>");
		$.each( data[0].models, function( key, val ) {
			$("#cr_txtModel").append("<option value='"+val.model_id+"'>"+val.model_name+"</option>")
		});
		$('#cr_txtModel').selectmenu('refresh');


		hideLoading();
	});
});


$("#cr_add_complaint").on("pageshow",function(){
	$("#cr_add_complaint .complaintNumber").val(sessionStorage.complaintID)
	rowCount=0
	//Donot add default row if item is already added
	if(rowCount==0){
        
		showLoading("Loading Categories...");
		addRowComplaint(1);

		$.getJSON( host+"index.php?action=listCategory", function( data ) {
			failureJSON = data;

			$("#cr_txtComplaintCategory"+rowCount).find('option').remove();
			$("#cr_txtComplaintCategory"+rowCount).append("<option value=''>Select Failure Category</select>");

			categoryObj = data[0].categories;
			$.each( categoryObj, function( key, val ) {
				$("#cr_txtComplaintCategory"+rowCount).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
			});

			$('#cr_txtComplaintCategory'+rowCount).selectmenu('refresh');

			hideLoading();
		});
	}
});

//*******************************Page Loads for EDIT ******************************************//

$("#cr_edit_default").on("pageshow",function(){

	//showLoading();
	complaintNumber = sessionStorage.complaintID;
	$("#cr_txtComplaintNumber_edit").val(complaintNumber);

	$.getJSON( host+"index.php?action=listAllLocations_edit1&complaintNumber="+complaintNumber, function( data ) {

		d = new Date();
		newDate = d.getFullYear()+"/"+(parseInt(d.getMonth())+1)+"/"+d.getDate()+" 17:00";

		$("#cr_txtLocation_edit").find('option').remove();
		$("#cr_txtLocation_edit").append("<option value=''>Select Location</select>");

		$.each( data[0].locations, function( key, val ) {
			sel = (val.selected==1)?"selected":"";
			$("#cr_txtLocation_edit").append("<option value='"+val.location_id+"' "+sel+">"+val.location_name+"</option>")
		});
		$('#cr_txtLocation_edit').selectmenu('refresh');
		
		//debugger;

		$("#cr_txtEmpCode_edit").val(data[0].emp_code);

		hideLoading();
	});
});

$("#cr_edit_customer").on("pageshow",function(){

	showLoading();
	complaintNumber = sessionStorage.complaintID;
	$(".complaintNumber").val(complaintNumber);

	$.getJSON( host+"index.php?action=getCustomerDetails1&complaintNumber="+complaintNumber, function( data ) {

		$("#cr_txtName_edit").val(data.cust_name)
		$("#cr_txtEmail_edit").val(data.cust_email)
		$("#cr_txtPhone_edit").val(data.cust_mobile)
		$("#cr_txtAddress_edit").val(data.cust_address)

		hideLoading();
	});
});

$("#cr_edit_vehicle").on("pageshow",function(){

	showLoading();
	complaintNumber = sessionStorage.complaintID;
	$(".complaintNumber").val(complaintNumber);

	$.getJSON( host+"index.php?action=getVehicleDetails1&complaintNumber="+complaintNumber, function( data ) {

		
			hideLoading();
			$("#cr_txtModel_edit").find('option').remove();
			$("#cr_txtModel_edit").append("<option value=''>Select Vehicle Model</select>");
			$.each( data.models, function( key, val ) {
				sel = (val.selected==1)?"selected":"";
				$("#cr_txtModel_edit").append("<option value='"+val.model_id+"'"+sel+">"+val.model_name+"</option>")
			});
			$('#cr_txtModel_edit').selectmenu('refresh');

			$("#cr_txtregno_edit").val(data.veh_reg_no)
			$("#cr_txtVinno_edit").val(data.frame_vin_no)
			$("#cr_txtEngno_edit").val(data.engine_no)
			$("#cr_txtDOP_edit").val(data.date_of_sale)
			$("#cr_txtKMR_edit").val(data.km_reading)

			if(data.warranty=="1")
				$("#cr_txtrtype1_edit").attr("selected","selected");
			else
				$("#cr_txtrtype2_edit").attr("selected","selected");

	});
});

$("#cr_edit_complaint").on("pageshow",function(){

	$("#cr_edit_complaint .complaintNumber").val(sessionStorage.complaintID)
		rowCount=0;        
		showLoading("Loading Categories...");
		$("#complaintCategoryBody1").html("");

		$.getJSON( host+"index.php?action=listComplaints&complaintNumber="+sessionStorage.complaintID, function( data ) {
			categoryObj = data[0].categories;
			complaintsListObj = data[0].complaintsList;

			counter=0
			//debugger;

			$.each( complaintsListObj, function( key, val ) {
				counter++;
				addRowComplaint1(counter);

				$('#cr_txtComplaintCategory'+rowCount+'_edit').val(val.cat_id);
				categoryChange($('#cr_txtComplaintCategory'+rowCount+'_edit'));

				$('#cr_txtCustomerVoice'+rowCount+'_edit').val(val.customer_voice_id);


				if($('#cr_txtCustomerVoice'+rowCount+'_edit').is("select"))
					$('#cr_txtCustomerVoice'+rowCount+'_edit').selectmenu('refresh');

				$('#cr_txtComplaintCategory'+rowCount+'_edit').selectmenu('refresh');

			});

			$('.ui-page').trigger('create');
			hideLoading();
		});
});

$("#cr_action").on("pageshow",function(){

	$("#cr_action .complaintNumber").val(sessionStorage.complaintID)
	$("#cr_action .complaintID").html(sessionStorage.complaintID);

	showLoading("Loading Actions...");
	$.getJSON( host+"index.php?action=listActionsTaken&complaintNumber="+sessionStorage.complaintID, function( data ) {
		//alert(data)
		complaintsObj = data.complaintDetails;
		count = 0;
		str="";
		//debugger

		$.each( complaintsObj, function( key, val ) {
			count++;

			str += addActionsTakenRow(count,val.customer_voice,val.action_taken,val.resposibilty);

		});

		$("#actionsTakenBody").html(str);
		$('.ui-page').trigger('create');
		hideLoading();

	});
});

function addActionsToTable(){
	$("#actionsTakenBody").append(addActionsTakenRow());
	$('.ui-page').trigger('create');

}
function addActionsTakenRow(count,customer_voice,action_taken,resposibilty){


		if(count=="undefined"||count==""||count==null)
			count = $("#actionsTakenBody tr").length+1;
		

		if(customer_voice=="undefined"||customer_voice==""||customer_voice==null)
			customer_voice = "";
		
		if(action_taken=="undefined"||action_taken==""||action_taken==null)
			action_taken = "";
		
		if(resposibilty=="undefined"||resposibilty==""||resposibilty==null)
			resposibilty = "";

			str = '<tr>\
				<td><input type="text" name="cr_txtCustomerVoice[]" id="cr_txtCustomerVoice'+count+'" value="'+customer_voice+'" readonly></td>\
				<td><textarea name="cr_txtActionsTaken[]" id="cr_txtActionsTaken'+count+'" rows="3">'+action_taken+'</textarea></td>\
				<td><input type="text" name="cr_txtResponsibility[]" id="cr_txtResponsibility'+count+'" value="'+resposibilty+'"></td>\
				<td style="width:10%;position:relative;	"><a style="margin:10px;" class="removeClass ui-link" onclick="removeComplaintRow(this)" href="#">X</a></td>\
			</tr>';

			return str;

}

// ******************* Button Clicks ******************************//

$("#addDefaultComplaint").click(function(){

	if($("#fr_datetime").val()==""){
		alert("Please select Date and Time");
		$("#fr_datetime").focus();
		return false;
	}


		showLoading();

		$.post(host+"index.php", $("#add_defaultCustomer").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){
					complaintNumber = $("#cr_txtComplaintNumber").val();
					$(".complaintNumber").val(complaintNumber);
					$.mobile.navigate("#cr_add_customer",{ transition : "slide"});
				}
				else
					alert(data.message);

			}
		);
});

$("#addCustomerComplaint").click(function(){

	if($("#cr_txtPhone").val()==""){
		alert("Please enter mobile number");
		$("#cr_txtPhone").focus();
		return false;
	}
	
	showLoading();

	$.post(host+"index.php", $("#add_customer").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1")
				$.mobile.navigate("#cr_add_vehicle",{ transition : "slide"});
			else
				alert(data.message);

		}
	);
})

$("#addVehicleComplaint").click(function(){

	if($("#cr_txtVinno").val()==""){
		alert("Please enter VIN number");
		$("#cr_txtVinno").focus();
		return false;
	}
	
	if(!validateVin($("#cr_txtVinno").val())){
		alert("Please enter valid VIN Number");
		$("#cr_txtVinno").focus();
		return false;
	}

	if($("#cr_txtEngno").val()==""){
		alert("Please enter Engine number");
		$("#cr_txtEngno").focus();
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#add_vehicleComplaint").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1")
				$.mobile.navigate("#cr_add_complaint",{ transition : "slide"});
			else
				alert(data.message);

		}
	);
});


$("#closeActionsBtn").click(function(){
	
	if(confirm("Are you sure you want to close the ticket?")){
		$("#taskAction").val("addComplaintActions");

		showLoading();

		$.post(host+"index.php", $("#complaintAction").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){
					alert("Your ticket is closed Successfully");
					$.mobile.navigate("#fcrDashboard",{ transition : "slide"});
				}
				else
					alert(data.message);

			}
		);
	}
});

$("#draftActionsBtn").click(function(){
	
		$("#taskAction").val("draftComplaintActions");

		showLoading("Saving...");

		$.post(host+"index.php", $("#complaintAction").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){
					alert("Data Saved Successfully");
				}
				else
					alert(data.message);

			}
		);
	
});

// ******************* Button Clicks Edit page ******************************//

$("#editDefaultComplaint").click(function(){

	if($("#cr_txtLocation_edit").val()==""){
		alert("Please select Location");
		$("#cr_txtLocation_edit").focus();
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#edit_defaultCustomer").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1"){
				complaintNumber = $("#cr_txtComplaintNumber").val();
				$(".complaintNumber").val(complaintNumber);
				$.mobile.navigate("#cr_edit_customer",{ transition : "slide"});
			}	
			else
				alert(data.message);
		}
	);
});

$("#editCustomerComplaint").click(function(){

	if($("#cr_txtPhone_edit").val()==""){
		alert("Please enter Phone Number");
		$("#cr_txtPhone").focus();
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#edit_customer").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1"){
				$.mobile.navigate("#cr_edit_vehicle",{ transition : "slide"});
			}
			else
				alert(data.message);
		}
	);
});


$("#editVehicleComplaint").click(function(){

	if($("#cr_txtVinno_edit").val()==""){
		alert("Please enter VIN Number");
		$("#cr_txtVinno_edit").focus();
		return false;
	}

	//alert($("#cr_txtVinno_edit").val())
	if(!validateVin($("#cr_txtVinno_edit").val())){
		alert("Please enter valid VIN Number");
		$("#cr_txtVinno_edit").focus();
		return false;
	}

	if($("#cr_txtEngno_edit").val()==""){
		alert("Please enter Engine Number");
		$("#cr_txtEngno_edit").focus();
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#edit_vehicleComplaint").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1"){
				$.mobile.navigate("#cr_edit_complaint",{ transition : "slide"});
			}
			else
				alert(data.message);
		}
	);
});

$("#convert2Failure").click(function(){
	if(confirm("Are you sure you want to convert to failure?")){
		showLoading();
		$.getJSON( host+"index.php?action=convert2Failure&complaintNumber="+sessionStorage.complaintID, function( data ) {
			if(data.status=="1"){
				alert("Complaint converted to failure.");
				//$.mobile.navigate("fcr_failure.html#frDashboard",{ transition : "slide"});
				location.href="fcr_failure.html#frDashboard";
			}
			else
				alert(data.message)

			hideLoading();
		});
	}
})
//************************* Others **********************************

function deactivateComplaint(recID,obj){
	if(confirm("Are you sure you want to delete ComplaintID: "+recID+" and all its associated records?")){
		showLoading();
		$.getJSON( host+"index.php?action=deleteComplaint&recID="+recID, function( data ) {
			if(data.status=="1")
				$(obj).parent().parent().remove();
			else
				alert(data.message)

			hideLoading();
		});
	}
}

$(document).ready(function(){

    var logic = function( currentDateTime ){
	if( currentDateTime.getDay()==6 ){
		this.setOptions({
			minTime:'11:00'
		});
	}else
		this.setOptions({
			minTime:'8:00'
		});
	};

	$('#cr_txtDOP, #cr_txtDOP_edit').datetimepicker({
			timepicker:false,
			format:'Y.m.d',
			maxDate:'+1970/01/01'
	});



	$("#addComplaint,#addComplaint1").click(function(){
		showLoading("Generating ID. Please wait.");
		emp_code = localStorage.getItem("bajaj_empcode");
		$.getJSON( host+"index.php?action=generateComplaintID&emp_code="+emp_code, function( data ) {
			//alert(data)
			sessionStorage.complaintID=data.complaintID;


			hideLoading();
			$.mobile.navigate("#cr_add_default");

			//Initialize the rowCount to Zero
			rowCount = 0;
		});
	});
})

$("#addComplaintRow").click(function(){
	addRowComplaint();
});

$("#editComplaintRow").click(function(){
	addRowComplaint1();
});

function addRowComplaint(x,holderID){

	rowCount++;
	str = "";


	if(holderID=="undefined"||holderID==""||holderID==null)
		classID = "1";
	else
		classID = "";

	str += '<tr> \
		<td><select id="cr_txtComplaintCategory'+rowCount+'" class="categoryList" name="cr_txtComplaintCategory[]"  rel="cr_txtCustomerVoice'+rowCount+'" onChange = "categoryChange(this)"><option value="">Select Category</option></select></td> \
		<td><select id="cr_txtCustomerVoice'+rowCount+'" name="cr_txtCustomerVoice[]" class="customerVoice"> \
					    	<option value="">Select Customer Voice</option> \
					    </select></td> \
		<td align="center" style="width:10%;position:relative;">';

	if(x!=1)
		str +='<a href="#" onclick="removeComplaintRow(this)" class="removeClass" style="margin:10px;">X</a>';

	str += '</td> \
		</tr>';


	if(holderID=="undefined"||holderID==""||holderID==null)
		$("#complaintCategoryBody").append(str)
    else
		$("#"+holderID).append(str);


	$("#cr_txtComplaintCategory"+rowCount).selectmenu();
	$("#cr_txtCustomerVoice"+rowCount).selectmenu();

	if(rowCount>1){

		showLoading("Loading Categories");
		$("#cr_txtComplaintCategory"+rowCount).find('option').remove();
		$("#cr_txtComplaintCategory"+rowCount).append("<option value=''>Select Failure Category</select>");

		$.each( categoryObj, function( key, val ) {
			$("#cr_txtComplaintCategory"+rowCount).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
		});

		$('#cr_txtComplaintCategory'+rowCount).selectmenu('refresh');
		
		hideLoading();
	}

	$("html, body").animate({scrollTop: $(document).height()}, 1000);
}

function addRowComplaint1(x,holderID){

	rowCount++;
	str = "";


	if(holderID=="undefined"||holderID==""||holderID==null)
		classID = "1";
	else
		classID = "";

	str += '<tr> \
		<td><select id="cr_txtComplaintCategory'+rowCount+'_edit" class="categoryList1" name="cr_txtComplaintCategory_edit[]"  rel="cr_txtCustomerVoice'+rowCount+'_edit" onChange = "categoryChange(this)"><option value="">Select Category</option></select></td> \
		<td><select id="cr_txtCustomerVoice'+rowCount+'_edit" name="cr_txtCustomerVoice_edit[]" class="customerVoice1"> \
					    	<option value="">Select Customer Voice</option> \
					    </select></td> \
		<td align="center" style="width:10%;position:relative;">';

	if(x!=1)
		str +='<a href="#" onclick="removeComplaintRow(this)" class="removeClass" style="margin:10px;">X</a>';

	str += '</td> \
		</tr>';


	if(holderID=="undefined"||holderID==""||holderID==null)
		$("#complaintCategoryBody1").append(str)
    else
		$("#"+holderID).append(str);

	$("#cr_txtComplaintCategory"+rowCount+"_edit").selectmenu();
	$("#cr_txtCustomerVoice"+rowCount+"_edit").selectmenu();

	if(rowCount>=1){

		showLoading("Loading Categories");
		$("#cr_txtComplaintCategory"+rowCount+"_edit").find('option').remove();
		$("#cr_txtComplaintCategory"+rowCount+"_edit").append("<option value=''>Select Failure Category</select>");

		$.each( categoryObj, function( key, val ) {
			$("#cr_txtComplaintCategory"+rowCount+"_edit").append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
		});

		$('#cr_txtComplaintCategory'+rowCount+"_edit").selectmenu('refresh');
		
		hideLoading();
	}

	$("html, body").animate({scrollTop: $(document).height()}, 1000);
}

function categoryChange(obj){
	selectedId = $(obj).val();
	cVoiceObj = $(obj).attr("rel");
	//debugger;
	if($("#"+cVoiceObj).is("input"))
		divObj = $("#"+cVoiceObj).parent().parent();
	else
		divObj = $("#"+cVoiceObj).parent().parent().parent();

	$("#"+cVoiceObj).remove();
	//alert(selectedId)
	if(selectedId=="9")
		newObj = $("<input type='text' id='"+cVoiceObj+"' class='customerVoice1' name='cr_txtCustomerVoice[]' placeholder='Enter Customer Voice'>");
	else
		newObj = $("<select class='customerVoice1' name='cr_txtCustomerVoice[]' id='"+cVoiceObj+"'><option value='>Select Customer Voice</option></select>");

	$(divObj).append(newObj);
	$('.ui-page').trigger('create');


	if(selectedId!="9"){
		for(i=0;i<categoryObj.length;i++){
			if(categoryObj[i].cat_id==selectedId){
			  $("#"+cVoiceObj).find('option').remove();
			  $("#"+cVoiceObj).append("<option value=''>Select Customer Voice</select>");

			  $.each( categoryObj[i].customer_voices, function( key, val ) {
			    $("#"+cVoiceObj).append("<option value='"+val.customer_voice_id+"'>"+val.customer_voice+"</option>")
			  });
			  continue;
			}
		}
		$("#"+cVoiceObj).selectmenu('refresh').focus();
	}
	else
	$(newObj).focus();
}

function removeComplaintRow(obj){

	if(confirm("Are you sure you want to remove this row?"))
		$(obj).parent().parent().remove();
}


function addComplaintSubmit(){

	str = "";
	rowCount1 = 0;

	$("select.categoryList").each(function(){
		rowCount1++;
		if($(this).val()==""){
			str += "Please select failure Category in row:"+rowCount1+"\n";
			$(this).focus();
			//return false;
		}
	});

	rowCount1 = 0;
	$("select.customerVoice").each(function(){
		rowCount1++;
		if($(this).val()==""){
			str += "Please select Customer Voice in row:"+rowCount1+"\n";
			$(this).focus();
			//return false;
		}
	});

	if(str!=""){
		alert(str);
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#add_vehicleForm").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1")
				$.mobile.navigate("#cr_uploadPic",{ transition : "slide"});
			else
				alert(data.message);

		}
	);
	return false;
}


function editComplaintSubmit(){

	str = "";
	rowCount1 = 0;

	$("select.categoryList1").each(function(){
		rowCount1++;
		if($(this).val()==""){
			str += "Please select failure Category in row:"+rowCount1+"\n";
			$(this).focus();
			//return false;
		}
	});

	rowCount1 = 0;
	$("select.customerVoice1").each(function(){
		rowCount1++;
		if($(this).val()==""){
			str += "Please select Customer Voice in row:"+rowCount1+"\n";
			$(this).focus();
			//return false;
		}
	});

	if(str!=""){
		alert(str);
		return false;
	}

	showLoading();

	$.post(host+"index.php", $("#edit_vehicleForm").serialize(),
		function(data){
			data = JSON.parse(data);
			hideLoading();
			if(data.status=="1")
				$.mobile.navigate("#cr_uploadPic",{ transition : "slide"});
			else
				alert(data.message);

		}
	);
	return false;
}


function modifyComplaint(complaintID){
	//alert(failureId)
	sessionStorage.complaintID = complaintID;
	$.mobile.navigate("#cr_edit_default",{ transition : "slide"});
}
