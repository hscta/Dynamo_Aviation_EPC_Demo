	$("#draftAction").click(function(){
		showLoading();

		$.post(host+"index.php", $("#failureActions").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){

					alert("Records Saved Successfully.")
					// $.mobile.navigate("#frDashboard",{ transition : "slide"});
					// $("#customerComplaints").html("");
				}
				else
					alert(data.message);

			});	
	})

	$("#closeFailure").click(function(){

		if($("#fr_txtJobCompleteDate").val()=="")
		{
			alert("Please select Job Complete Date");
			return false;
		}

		if($("#fr_DeliveryDatetime").val()=="")
		{
			alert("Please select Vehicle Delivery Date");
			return false;
		}

		if(confirm("Are you sure you want to close the ticket?")){
			showLoading();
			$("#closeTicketFailure").val("1");


			$.post(host+"index.php", $("#failureActions").serialize(),
				function(data){
					data = JSON.parse(data);
					hideLoading();
					if(data.status=="1"){
						alert("Ticket Closed Successfully");
						$.mobile.navigate("#frDashboard",{ transition : "slide"});
						$("#customerComplaints").html("");
					}
					else
						alert(data.message);

				});	


		}
	})

	$("#addFailureActions").click(function(){
		actionCounter++;

		str = '<tr><td><input type="text" value="" name="fr_txtActions[]" id="fr_txtActions'+actionCounter+'" class="frActionsText"></td>';

		if(actionCounter>1)
			str += '<td><a href="javascript:void(0)" id="dd" data-role="button" data-icon="delete" data-iconpos="notext" data-mini="true" class="deleteComplaint">Delete</a></td>';
		else
			str +="<td></td>";

		str += '</tr>';

		$("#customerComplaints").append(str);

		$(".frActionsText").textinput();
		$(".deleteComplaint").button();
	})

//*******************************Submit Buttons for Add******************************************//

	$("#addDefault").click(function(){


		if($("#fr_datetime").val()==""){
			alert("Please select Date and Time");
			$("#fr_datetime").focus();
			return false;
		}
		
		// if($("#fr_channelName").val()==""){
		// 	alert("Please enter Channel Name");
		// 	$("#fr_channelName").focus();
		// 	return false;
		// }

		if($("#fr_txtChannelType").val()==""){
			alert("Please select Channel Type");
			$("#fr_txtChannelType").focus();
			return false;
		}

		if($("#fr_txtLocation").val()==""){
			alert("Please select Location");
			$("#fr_txtLocation").focus();
			return false;
		}
		showLoading();

		$.post(host+"index.php", $("#add_default").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){
					failureNumber = $("#fr_txtFailureNumber").val();
					$(".failureNumber").val(failureNumber);
					$.mobile.navigate("#fr_add_customer",{ transition : "slide"});
				}
				else
					alert(data.message);

			}
		);
	});

	$("#addCustomer").click(function(){

		if($("#fr_txtPhone").val()==""){
			alert("Please enter mobile number");
			$("#fr_txtPhone").focus();
			return false;
		}
		
		showLoading();

		$.post(host+"index.php", $("#add_customer").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1")
					$.mobile.navigate("#fr_add_vehicle",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
	})

	$("#addVehicle").click(function(){

		if($("#fr_txtVinno").val()==""){
			alert("Please enter VIN number");
			$("#fr_txtVinno").focus();
			return false;
		}

		if(!validateVin($("#fr_txtVinno").val())){
			alert("Please enter valid VIN number");
			$("#fr_txtVinno").focus();
			return false;
		}


		if($("#fr_txtEngno").val()==""){
			alert("Please enter Engine number");
			$("#fr_txtEngno").focus();
			return false;
		}

		showLoading();

		$.post(host+"index.php", $("#add_vehicle").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1")
					$.mobile.navigate("#fr_add_failure",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
	});

	rowCount = 0;
	$("#addBtn").click(function(){

		addRow();
	})
	$("#addBtn_edit").click(function(){
		addRow(2,"boxHolder_edit");
	})

//*******************************Submit Buttons for Edit******************************************//

	$("#editDefault").click(function(){


		if($("#fr_datetime_edit").val()==""){
			alert("Please select Date and Time");
			$("#fr_datetime").focus();
			return false;
		}
		
		// if($("#fr_channelName_edit").val()==""){
		// 	alert("Please enter Channel Name");
		// 	$("#fr_channelName").focus();
		// 	return false;
		// }

		if($("#fr_txtChannelType_edit").val()==""){
			alert("Please select Channel Type");
			$("#fr_txtChannelType").focus();
			return false;
		}

		if($("#fr_txtLocation_edit").val()==""){
			alert("Please select Location");
			$("#fr_txtLocation").focus();
			return false;
		}
		showLoading();

		$.post(host+"index.php", $("#edit_default").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1"){
					failureNumber = $("#fr_txtFailureNumber").val();
					$(".failureNumber").val(failureNumber);
					$.mobile.navigate("#fr_edit_customer",{ transition : "slide"});
				}
				else
					alert(data.message);

			}
		);
	});

	$("#editCustomer").click(function(){

		if($("#fr_txtPhone_edit").val()==""){
			alert("Please enter mobile number");
			$("#fr_txtPhone_edit").focus();
			return false;
		}
		
		showLoading();

		$.post(host+"index.php", $("#edit_customer").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1")
					$.mobile.navigate("#fr_edit_vehicle",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
	})

	$("#editVehicle").click(function(){

		if($("#fr_txtVinno_edit").val()==""){
			alert("Please enter VIN number");
			$("#fr_txtVinno_edit").focus();
			return false;
		}

		if(!validateVin($("#fr_txtVinno_edit").val())){
			alert("Please enter valid VIN number");
			$("#fr_txtVinno_edit").focus();
			return false;
		}

		if($("#fr_txtEngno_edit").val()==""){
			alert("Please enter Engine number");
			$("#fr_txtEngno_edit").focus();
			return false;
		}

		showLoading();

		$.post(host+"index.php", $("#edit_vehicle").serialize(),
			function(data){
				data = JSON.parse(data);
				hideLoading();
				if(data.status=="1")
					$.mobile.navigate("#fr_edit_failure",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
	});


	function editFailureSubmit(){
	

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
					$.mobile.navigate("#fr_uploadPic",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
		return false;
	}

// *********************************Other Functions **********************************//

	function addRow(x,holderID){

		rowCount++;

		str ='<div class="ui-body ui-body-a ui-corner-all mt10">';

		if(x!=1)
			str +='<a href="#" onclick="removeFailureRow(this)" class="removeClass">X</a>';

		if(holderID=="undefined"||holderID==""||holderID==null)
			classID = "1";
		else
			classID = "";

		str += '<div class="ui-grid-b"> \
				    <div class="ui-block-a"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Failure Category <span class="red">*</span>:</label> \
						    <select id="fr_txtComplaintCategory'+rowCount+'" name="fr_txtComplaintCategory[]" class="categoryList'+classID+'" rel="fr_txtCustomerVoice'+rowCount+'" onChange = "categoryChange(this)"> \
						    	<option value="">Select Failure Category</option> \
						    </select> \
						</div> \
				    </div> \
				    <div class="ui-block-b"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Customer Voice <span class="red">*</span>:</label> \
						    <select id="fr_txtCustomerVoice'+rowCount+'" name="fr_txtCustomerVoice[]" class="customerVoice'+classID+'"> \
						    	<option value="">Select Customer Voice</option> \
						    </select> \
						</div> \
				    </div> \
				    <div class="ui-block-c"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Actions to be taken:</label> \
						    <textarea id="fr_txtActionstaken'+rowCount+'" name="fr_txtActionstaken[]"></textarea> \
						</div> \
				    </div> \
				    <div class="ui-block-a"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Required Part Number:</label> \
						    <select id="fr_txtPartnumber'+rowCount+'"  data-native-menu="false" class="filterable-select partNumber" name="fr_txtPartnumber[]" onChange = "partChange(this)" rel="fr_txtPartDesc'+rowCount+'"> \
						    	<option value="">Select Part number</option> \
						    </select> \
						</div> \
				    </div> \
				    <div class="ui-block-b"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Part Description:</label> \
						    <textarea id="fr_txtPartDesc'+rowCount+'" name="fr_txtPartDesc[]" readonly></textarea> \
						</div> \
				    </div> \
				    <div class="ui-block-c"> \
						<div class="ui-field-contain"> \
						    <label for="textinput-fc">Required Qty:</label> \
						    <input type="text" id="fr_txtRequiredQty'+rowCount+'" class="rowQty" name="fr_txtRequiredQty[]"> \
						</div> \
				    </div> \
				</div> \
		  	</div>';


       // alert(holderID)
		 if(holderID=="undefined"||holderID==""||holderID==null){
			$("#boxHolder").append(str)
		   // alert(holderID)
        }
        else
			$("#"+holderID).append(str);

		// $("#fr_txtComplaintCategory"+rowCount).selectmenu()
		// $("#fr_txtCustomerVoice"+rowCount).selectmenu()
		// $("#fr_txtActionstaken"+rowCount).textinput()
		// $("#fr_txtPartnumber"+rowCount).selectmenu()
		// $("#fr_txtPartDesc"+rowCount).textinput()
		// $("#fr_txtRequiredQty"+rowCount).textinput()


		if(rowCount>=1){

			showLoading("Loading Categories and Part Numbers...");
			$("#fr_txtComplaintCategory"+rowCount).find('option').remove();
			$("#fr_txtComplaintCategory"+rowCount).append("<option value=''>Select Failure Category</select>");

			$.each( categoryObj, function( key, val ) {
				$("#fr_txtComplaintCategory"+rowCount).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
			});

			$.each( partsObj, function( key1, val1 ) {
				$("#fr_txtPartnumber"+rowCount).append("<option value='"+val1.part_id+"'>"+val1.part_code+" - "+val1.part_desc+"</option>")
			});

			// $('#fr_txtComplaintCategory'+rowCount).selectmenu('refresh');
			// $('#fr_txtPartnumber'+rowCount).selectmenu('refresh');
			
			
		}

		$('.ui-page').trigger('create');

		// The custom select list may show up as either a popup or a dialog,
		// depending how much vertical room there is on the screen. If it shows up
		// as a dialog, then the form containing the filter input field must be
		// transferred to the dialog so that the user can continue to use it for
		// filtering list items.

		var input,
		listbox = $( "#fr_txtPartnumber"+rowCount+"-listbox" ),
		form = listbox.jqmData( "filter-form"+rowCount ),
		listview = $("#fr_txtPartnumber"+rowCount+"-menu");

		// We store the generated form in a variable attached to the popup so we
		// avoid creating a second form/input field when the listview is
		// destroyed/rebuilt during a refresh.
		if ( !form ) {
			input = $( "<input data-type='search'></input>" );
			form = $( "<form></form>" ).append( input );

			input.textinput();

			$( "#fr_txtPartnumber"+rowCount+"-listbox" )
				.prepend( form )
				.jqmData( "filter-form"+rowCount, form );
		}

		// Instantiate a filterable widget on the newly created listview and
		// indicate that the generated input is to be used for the filtering.
		listview.filterable({ input: input });

		$.mobile.document
		// After the dialog is closed, the form containing the filter input is
		// transferred back into the popup.
		.on( "pagebeforeshow pagehide", "#fr_txtPartnumber"+rowCount+"-dialog", function( e ) {
			var form = $( "#fr_txtPartnumber"+rowCount+"-listbox" ).jqmData( "filter-form"+rowCount ),
				placeInDialog = ( e.type === "pagebeforeshow" ),
				destination = placeInDialog ? $( e.target ).find( ".ui-content" ) : $( "#fr_txtPartnumber"+rowCount+"-listbox" );

			form
				.find( "input" )

				// Turn off the "inset" option when the filter input is inside a dialog
				// and turn it back on when it is placed back inside the popup, because
				// it looks better that way.
				.textinput( "option", "inset", !placeInDialog )
				.end()
				.prependTo( destination );
		});



		hideLoading();
		$("html, body").animate({scrollTop: $(document).height()}, 1000);
	}

	function removeFailureRow(obj){

		if(confirm("Are you sure you want to remove this row?"))
			$(obj).parent().remove();
	}

	function addFailureSubmit(){
	

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
		// rowCount1 = 0;
		// $("select.partNumber").each(function(){
		// 	rowCount1++;
		// 	if($(this).val()==""){
		// 		str += "Please select Part Number in row:"+rowCount1+"\n";
		// 		$(this).focus();
		// 		//return false;
		// 	}
		// });
		// rowCount1 = 0;
		// $("input.rowQty").each(function(){
		// 	rowCount1++;
		// 	if($(this).val()==""){
		// 		str += "Please enter required Qty in row:"+rowCount1+"\n";
		// 		$(this).focus();
		// 		//return false;
		// 	}
		// });

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
					$.mobile.navigate("#fr_uploadPic",{ transition : "slide"});
				else
					alert(data.message);

			}
		);
		return false;
	}

	function addRemarks(){
	}

	function deactivateFailure(recID,obj){
		if(confirm("Are you sure you want to delete FailureID: "+recID+" and all its associated records?")){
			showLoading();
			$.getJSON( host+"index.php?action=deleteFailure&recID="+recID, function( data ) {
				if(data.status=="1")
					$(obj).parent().parent().remove();
				else
					alert(data.message)

				hideLoading();
			});
		}
	}

	function modifyFailure(failureId){
		//alert(failureId)
		sessionStorage.failureID = failureId;
		$.mobile.navigate("#fr_edit_default",{ transition : "slide"});
	}

//*******************************Page Loads******************************************//

	$("#frDashboard").on("pageshow",function(){
		showLoading();

		emp_code = localStorage.getItem("bajaj_empcode");

		$('form').each(function() { this.reset() });
		
		$.getJSON( host+"index.php?action=listAllFailuresOpen&emp_code="+emp_code, function( data ) {
			
			str = "";


			$.each( data, function( key, val ) {
		      str += "<tr><td align='center'><a class='openfrAction' href='#' rel='"+val.failure_no+"'>"+val.failure_no+"</td><td align='center'>"+val.customer_name+"</td><td align='center'>"+val.phone_number+"</td><td align='center'>"+val.frame_VIN+"</td><td align='center'>"+val.veh_reg_no+"</td><td align='center'>"+val.location+"</td><td align='center'>"+val.engine_no+"</td><td align='center'>"+val.channel_name+"</td><td align='center' style='vertical-align:middle'><a href='javascript:modifyFailure("+val.failure_no+")' class='ui-input-btn ui-btn  ui-btn-inline ui-mini'>Edit</a><a href='#' onclick='deactivateFailure("+val.failure_no+",this)' class='ui-input-btn ui-btn  ui-btn-inline ui-mini'>Delete</a></td></tr>";
		    });
			
			$("#complaintList").html(str);
			$("#compaintTable").table("refresh");
		    hideLoading();

		    $(".openfrAction").click(function(){
		    	sessionStorage.failureID = $(this).attr("rel");
		    	//alert($(this).attr("rel"));
		    	$.mobile.navigate("#fr_action");
		    })
		  });
	});

	$("#frDashboardClosed").on("pageshow",function(){
		showLoading();	
		emp_code = localStorage.getItem("bajaj_empcode");
		
		$.getJSON( host+"index.php?action=listAllFailuresClosed&emp_code="+emp_code, function( data ) {
			
			str = "";

			$.each( data, function( key, val ) {
		      str += "<tr><td align='center'>"+val.failure_no+"</td><td align='center'>"+val.customer_name+"</td><td align='center'>"+val.phone_number+"</td><td align='center'>"+val.frame_VIN+"</td><td align='center'>"+val.veh_reg_no+"</td><td align='center'>"+val.location+"</td><td align='center'>"+val.engine_no+"</td><td align='center'>"+val.channel_name+"</td><td align='center' style='vertical-align:middle'></td></tr>";
		    });
			
			$("#complaintListClosed").html(str);
			$("#compaintTableClosed").table("refresh");
		    hideLoading();
		  });
	});

	$("#fr_add_default").on("pageshow",function(){
		showLoading();
		emp_code = localStorage.getItem("bajaj_empcode");
		$.getJSON( host+"index.php?action=listAllLocations&emp_code="+emp_code, function( data ) {

			d = new Date();
			newDate = d.getFullYear()+"/"+(parseInt(d.getMonth())+1)+"/"+d.getDate()+" 17:00";

			$("#fr_txtLocation").find('option').remove();
			$("#fr_txtLocation").append("<option value=''>Select Location</select>");

			$.each( data[0].locations, function( key, val ) {
				sel = (val.selected==1)?"selected":"";
				$("#fr_txtLocation").append("<option value='"+val.location_id+"' "+sel+">"+val.location_name+"</option>")
			});
			$('#fr_txtLocation').selectmenu('refresh');


			$("#fr_txtChannelType").find('option').remove();
			$("#fr_txtChannelType").append("<option value=''>Select Channel</select>");
			$.each( data[0].channels, function( key, val ) {
				$("#fr_txtChannelType").append("<option value='"+val.channel_type_id+"'>"+val.channel_type+"</option>")
			});
			$('#fr_txtChannelType').selectmenu('refresh');



			$("#fr_txtFailureNumber").val(sessionStorage.failureID);
			$("#fr_txtEmpCode").val(emp_code);
			$("#fr_datetime").val(newDate);
			hideLoading();
		});
	});

	$("#fr_add_customer").on("pageshow",function(){
		$("#fr_txtPhone").ForceNumericOnly();
	});

	$("#fr_add_vehicle").on("pageshow",function(){
		showLoading("Loading Vehicle Models");


		emp_code = localStorage.getItem("bajaj_empcode");
		$.getJSON( host+"index.php?action=listAllModels&emp_code="+emp_code, function( data ) {

			$("#fr_txtModel").find('option').remove();
			$("#fr_txtModel").append("<option value=''>Select Vehicle Model</select>");
			$.each( data[0].models, function( key, val ) {
				$("#fr_txtModel").append("<option value='"+val.model_id+"'>"+val.model_name+"</option>")
			});
			$('#fr_txtModel').selectmenu('refresh');


			hideLoading();
		});
	});

	failureJSON = ""; categoryObj = ""; partsObj = "";

	$("#fr_add_failure").on("pageinit",function(){
		//alert("in");
		rowCount=0
	});

	$("#fr_add_failure").on("pageshow",function(){
		$("#fr_add_failure .failureNumber").val(sessionStorage.failureID)
		
		//Donot add default row if item is already added
		if(rowCount==0){
            
			showLoading("Loading Categories and Part Numbers...");
			addRow(1);

			$.getJSON( host+"index.php?action=listCategorynParts", function( data ) {
				failureJSON = data;

				$("#fr_txtComplaintCategory"+rowCount).find('option').remove();
				$("#fr_txtComplaintCategory"+rowCount).append("<option value=''>Select Failure Category</select>");

				categoryObj = data[0].categories;
				$.each( categoryObj, function( key, val ) {
					$("#fr_txtComplaintCategory"+rowCount).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
				});

				partsObj = data[0].parts;
				$.each( partsObj, function( key1, val1 ) {
					$("#fr_txtPartnumber"+rowCount).append("<option value='"+val1.part_id+"'>"+val1.part_code+" - "+val1.part_desc+"</option>")
				});

				$('#fr_txtComplaintCategory'+rowCount).selectmenu('refresh');
				$('#fr_txtPartnumber'+rowCount).selectmenu('refresh');

				hideLoading();
			});
		}
	});

	$("#fr_uploadPic").on("pageshow",function(){
	});
	
	$("#fr_finish").on("pageshow",function(){
		showLoading();
		$.getJSON( host+"index.php?action=sendPartsEmail&task=failure&ID="+sessionStorage.failureID, function( data ) {

			$("#failureID.red").html(sessionStorage.failureID);

			if(data.status=="0")
				alert("Parts Email Update Failure");

			hideLoading();
		});
	});

	actionCounter = 0;

	$("#fr_action").on("pageshow",function(){
		$("#customerComplaints").html("");
		$(".failureNumber").val(sessionStorage.failureID);

		showLoading("Loading actions...");
		$.getJSON( host+"index.php?action=listAllActions&failureID="+sessionStorage.failureID, function( data ) {

			comp_date = (data.job_complete_date=="0000-00-00 00:00:00")?"":data.job_complete_date;
			deli_date = (data.vehicle_delevered_date=="0000-00-00 00:00:00")?"":data.vehicle_delevered_date;
			dealer_asm_remark = data.dealer_asm_remark;
					



			$.each( data.actions, function( key, val ) {

				actionCounter++;

				str = '<tr><td><input type="text" value="'+val.action+'" name="fr_txtActions[]" id="fr_txtActions'+actionCounter+'" class="frActionsText"></td>';

				if(actionCounter>1)
					str += '<td><a href="#" id="deleteComplaint_'+actionCounter+'" data-role="button" data-icon="delete" data-iconpos="notext" data-mini="true" class="deleteComplaint">Delete</a></td>';
				else
					str +="<td></td>";

				str += '</tr>';

				$("#customerComplaints").append(str);

				$(".frActionsText").textinput();
				$(".deleteComplaint").button();



					$(".deleteComplaint").bind('click', function(event) {

						if(confirm("Are you sure you want to remove this complaint?"))
							$(obj).parent().parent().remove();

				   });

					$("#deleteComplaint_"+actionCounter).bind('click', function(event) {

						if(confirm("Are you sure you want to remove this complaint?"))
							$(obj).parent().parent().remove();

				   });


					//debugger;



					$("#fr_txtJobCompleteDate").val(comp_date);
					$("#fr_DeliveryDatetime").val(deli_date);
					$("#fr_DealerAsmRemark").val(htmlspecialchars_decode(dealer_asm_remark));





			});
			hideLoading()
		});
	});

//***************************Edit Section Starts **************************** //



	$("#fr_edit_default").on("pageshow",function(){
		showLoading();
		failureNumber = sessionStorage.failureID;
		$.getJSON( host+"index.php?action=listAllLocations_edit&failureNumber="+failureNumber, function( data ) {

			d = new Date();
			newDate = d.getFullYear()+"/"+(parseInt(d.getMonth())+1)+"/"+d.getDate()+" 17:00";

			$("#fr_txtLocation_edit").find('option').remove();
			$("#fr_txtLocation_edit").append("<option value=''>Select Location</select>");

			$.each( data[0].locations, function( key, val ) {
				sel = (val.selected==1)?"selected":"";
				$("#fr_txtLocation_edit").append("<option value='"+val.location_id+"' "+sel+">"+val.location_name+"</option>")
			});
			$('#fr_txtLocation_edit').selectmenu('refresh');


			$("#fr_txtChannelType_edit").find('option').remove();
			$("#fr_txtChannelType_edit").append("<option value=''>Select Channel</select>");
			$.each( data[0].channels, function( key, val ) {
				sel = (val.selected==1)?"selected":"";
				$("#fr_txtChannelType_edit").append("<option value='"+val.channel_type_id+"'"+sel+">"+val.channel_type+"</option>")
			});
			$('#fr_txtChannelType_edit').selectmenu('refresh');



			$("#fr_txtFailureNumber_edit").val(sessionStorage.failureID);
			$("#fr_txtEmpCode_edit").val(localStorage.getItem("bajaj_empcode"));
			$("#fr_datetime_edit").val(data[0].exp_date_time);
			$("#fr_channelName_edit").val(data[0].channel_name);
			hideLoading();
		});
	});

	$("#fr_edit_customer").on("pageshow",function(){
		showLoading();
		failureNumber = sessionStorage.failureID;
		$("#fr_edit_customer .failureNumber").val(failureNumber);

		$("#fr_txtPhone_edit").ForceNumericOnly();

		$.getJSON( host+"index.php?action=getCustomerDetails&failureNumber="+failureNumber, function( data ) {
			$("#fr_txtName_edit").val(data.cust_name);
			$("#fr_txtEmail_edit").val(data.cust_email);
			$("#fr_txtPhone_edit").val(data.cust_mobile);
			$("#fr_txtAddress_edit").val(data.cust_address);
			hideLoading();
		});
	});


	$("#fr_edit_vehicle").on("pageshow",function(){
		showLoading("Loading Vehicle Models");

		failureNumber = sessionStorage.failureID;
		$("#fr_edit_vehicle .failureNumber").val(failureNumber);

		emp_code = localStorage.getItem("bajaj_empcode");
		$.getJSON( host+"index.php?action=getVehicleDetails&failureNumber="+failureNumber, function( data ) {

			hideLoading();
			$("#fr_txtModel_edit").find('option').remove();
			$("#fr_txtModel_edit").append("<option value=''>Select Vehicle Model</select>");
			$.each( data.models, function( key, val ) {
				sel = (val.selected==1)?"selected":"";
				$("#fr_txtModel_edit").append("<option value='"+val.model_id+"'"+sel+">"+val.model_name+"</option>")
			});
			$('#fr_txtModel_edit').selectmenu('refresh');

			$("#fr_txtregno_edit").val(data.veh_reg_no)
			$("#fr_txtVinno_edit").val(data.frame_vin_no)
			$("#fr_txtEngno_edit").val(data.engine_no)
			$("#fr_txtDOP_edit").val(data.date_of_sale)
			$("#fr_txtKMR_edit").val(data.km_reading)

			if(data.warranty=="1")
				$("#fr_txtrtype1_edit").attr("selected","selected");
			else
				$("#fr_txtrtype2_edit").attr("selected","selected");

		});
	});


	failureJSON = ""; categoryObj = ""; partsObj = "";


	$("#fr_edit_failure").on("pageinit",function(){
		//alert("in");
		rowCount=0
	});


	$("#fr_edit_failure").on("pageshow",function(){
		
		failureNumber = sessionStorage.failureID;
		//Donot add default row if item is already added
		$("#edit_vehicleForm .failureNumber").val(failureNumber);
		if(rowCount==0){
			showLoading("Loading Categories and Part Numbers...");

			$.getJSON( host+"index.php?action=listfailures&failureNumber="+failureNumber, function( data ) {
			$("#boxHolder_edit").html("");
				failureJSON = data;
				rowCount = 0;
				//alert(data[0].failuresList.length)
				for(k=1;k<=data[0].failuresList.length;k++){
					//alert(k)

					addRow(k,"boxHolder_edit");

					$("#fr_txtComplaintCategory"+k).find('option').remove();
					$("#fr_txtComplaintCategory"+k).append("<option value=''>Select Failure Category</select>");

					categoryObj = data[0].categories;
					$.each( categoryObj, function( key, val ) {
						$("#fr_txtComplaintCategory"+k).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
					});

					partsObj = data[0].parts;
					$.each( partsObj, function( key1, val1 ) {
						$("#fr_txtPartnumber"+k).append("<option value='"+val1.part_id+"'>"+val1.part_code+" - "+val1.part_desc+"</option>")
					});

					failureObj = data[0].failuresList[k-1];

					$('#fr_txtComplaintCategory'+k).val(failureObj.cat_id);
					categoryChange($('#fr_txtComplaintCategory'+k));

					$("#fr_txtCustomerVoice"+k).val(failureObj.customer_voice_id);

					//alert(failureObj.part_no)
					if(failureObj.part_no==0)
						part_no = "";
					else
						part_no = failureObj.part_no;

					$('#fr_txtPartnumber'+k).val(part_no);
					partChange($('#fr_txtPartnumber'+k))


					$("#fr_txtActionstaken"+k).val(failureObj.actions);
					$("#fr_txtRequiredQty"+k).val(failureObj.qty);

					//alert($('#fr_txtCustomerVoice'+k).is( "select" ))
					if($('#fr_txtCustomerVoice'+k).is("select"))
						$('#fr_txtCustomerVoice'+k).selectmenu('refresh');

					$('#fr_txtComplaintCategory'+k).selectmenu('refresh');
					$('#fr_txtPartnumber'+k).selectmenu('refresh');
					$('.ui-page').trigger('create');
				}
				
				if(data[0].failuresList.length==0){
							//if(rowCount==0){
								showLoading("Loading Categories and Part Numbers...");
								addRow(1);

								//$.getJSON( host+"index.php?action=listCategorynParts", function( data ) {
									//failureJSON = data;

									$("#fr_txtComplaintCategory"+rowCount).find('option').remove();
									$("#fr_txtComplaintCategory"+rowCount).append("<option value=''>Select Failure Category</select>");

									categoryObj = data[0].categories;
									$.each( categoryObj, function( key, val ) {
										$("#fr_txtComplaintCategory"+rowCount).append("<option value='"+val.cat_id+"'>"+val.cat_name+"</option>")
									});

									partsObj = data[0].parts;
									$.each( partsObj, function( key1, val1 ) {
										$("#fr_txtPartnumber"+rowCount).append("<option value='"+val1.part_id+"'>"+val1.part_code+"</option>")
									});

									$('#fr_txtComplaintCategory'+rowCount).selectmenu('refresh');
									$('#fr_txtPartnumber'+rowCount).selectmenu('refresh');

									hideLoading();
								//});
							//}
				}

				hideLoading();
			});
		}

	});

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
			newObj = $("<input type='text' id='"+cVoiceObj+"' class='customerVoice1' name='fr_txtCustomerVoice[]' placeholder='Enter Customer Voice'>");
		else
			newObj = $("<select class='customerVoice1' name='fr_txtCustomerVoice[]' id='"+cVoiceObj+"'><option value='>Select Customer Voice</option></select>");

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

	function partChange(obj){
		selectedId = $(obj).val();
		descObj = $(obj).attr("rel");

		for(i=0;i<partsObj.length;i++){
			if(partsObj[i].part_id==selectedId){
				//alert(partsObj[i].part_desc)
				$("#"+descObj).val(partsObj[i].part_desc);
				if(partsObj[i].part_id=="")
					$("#"+descObj).val("");
				continue;
			}
		}
	}

    function addCategoryRow(){
		str = '<tr><td><select class="foo" name="txtFailureCategory[]"><option value="">Select Category</option></select></td><td><input type="text" name="txtCustomerVoice[]"/></td><td align="center"><a href="javascript:void(0)" onclick="removeRow(this)" data-role="button" data-icon="delete" data-iconpos="notext"  data-mini="true" >Remove</a></td></tr>';

		$("#complaintCategoryBody").append(str);
    }

	$(document).ready(function(){



		$("#addFailure,#addFailure1").click(function(){
			showLoading("Generating ID. Please wait.");
			emp_code = localStorage.getItem("bajaj_empcode");
			$.getJSON( host+"index.php?action=generateFailureID&emp_code="+emp_code, function( data ) {
				//alert(data)
				sessionStorage.failureID=data.failureID;


				hideLoading();
				$.mobile.navigate("#fr_add_default");

				//Initialize the rowCount to Zero
				rowCount = 0;
			});
		});


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

		$('#fr_datetime, #fr_txtJobCompleteDate, #fr_DeliveryDatetime').datetimepicker({
			onChangeDateTime:logic,
			onShow:logic
		});

		$('#fr_txtDOP').datetimepicker({
			timepicker:false,
			format:'Y.m.d',
			maxDate:'+1970/01/01'
		});

		$('#fr_datetime_edit, #fr_txtJobCompleteDate_edit,#fr_txtJobCompleteDate,#fr_DeliveryDatetime, #fr_DeliveryDatetime_edit').datetimepicker({
			onChangeDateTime:logic,
			onShow:logic,
			maxDate:'+1970/01/01'
		});

		$('#fr_txtDOP_edit').datetimepicker({
			timepicker:false,
			format:'Y.m.d',
			maxDate:'+1970/01/01'
		});

	});

    function removeRow(obj){
    	obj = $(obj).parents("tr").remove();
    }
