//host = "http://localhost/gm_new/total_new/be/";



function validator(){
	if($("#username").val()==""){
		alert("Please enter Email ID");
		$("#username").focus();
		return false;
	}
	if($("#password").val()==""){
		alert("Please enter Password");
		$("#password").focus();
		return false;
	} 
	// if($("#userType").val()=="0"){
	// 	alert("Please select User Type");
	// 	$("#userType").focus();
	// 	return false;
	// }

	showLoading();
	var values = $("#loginForm").serialize();
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
                document.location.href="index.php?page=dashboard";
            }
            else
                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");
            
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
function storeValidator(){
	if($("#username").val()==""){
		alert("Please enter Email ID");
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
                document.location.href="index.php";
            }
            else
                $(".alert").removeClass("alert-success").addClass("alert-danger").html(data.message).css("display","block");
            
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

function showLoading(){
    $("#loading").show();
}

function hideLoading(){
    $("#loading").hide();
}


