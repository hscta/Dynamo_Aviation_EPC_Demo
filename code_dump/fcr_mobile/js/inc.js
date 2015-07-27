//host = "http://192.168.0.101/bajaj/fcr_mobile/be/";
//host = "http://localhost/bajaj/fcr_mobile/be/";
host = "http://www.gladminds.co/bajaj/fcr_mobile/be/";


/*************** Others ***************** */

function ajaxifyForm(formID,redirectPage){
  showLoading("Validating... Please wait");
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
           // alert(data.status)
            if(data.status==1){
                $(".alert").removeClass("alert-danger").addClass("alert-success").html(data.message).css("display","block").delay(500);
                
                if(data.remember=="1"){
                //alert(data.remember)
                //debugger
                	localStorage.setItem('bajaj_name', data.name);
                	localStorage.setItem('bajaj_email', data.email);
                	localStorage.setItem('bajaj_empcode', data.empcode);
                }
                else{
                	localStorage.removeItem('bajaj_name');
                	localStorage.removeItem('bajaj_email');
                	localStorage.removeItem('bajaj_empcode');
                }

                $.mobile.navigate("#"+redirectPage);
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
}

function logout(){
	if(confirm("Are you sure you want to logout?"))
		location.href="logout.html";
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    // alert( pattern.test(emailAddress) );
    return pattern.test(emailAddress);
}; 

function showLoading(loadingTxt){

	$("body").append('<div class="modalWindow"/>');

    var theme = $.mobile.loader.prototype.options.theme,
    msgText = loadingTxt || $.mobile.loader.prototype.options.text,
    textVisible = true || $.mobile.loader.prototype.options.textVisible,
    textonly = "";
    html = "";
    $.mobile.loading( 'show', {
    	text: msgText,
    	textVisible: textVisible,
    	theme: theme,
    	textonly: textonly,
    	html: html
    });
}

function hideLoading(){
	$(".modalWindow").remove();
   	$.mobile.loading( 'hide' );
}

function htmlspecialchars_decode(string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString()
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#039;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}


function capturePicture() {

  alert("function is called"); 
  // if(_.isUndefined(navigator.camera)){

  if(typeof navigator.camera == 'undefined'){

    alert("Camera is not defined");
  }else{
    alert("WTF?!");
  }

    navigator.camera.getPicture(
        app.onCameraSuccess, 
        app.onCaptureError, 
        { quality : 50,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 250,
          targetHeight: 250,
          saveToPhotoAlbum: false 
        }
    );
}
    

function onCameraSuccess( b64EncodedImage ) {


    var imageEncoded = "data:image/jpeg;base64," + b64EncodedImage;

    $('div.accred_pic_preview')
        .fadeOut()
        .css('backgroundImage', 'url("' + imageEncoded + '")')
        .fadeIn()

    // The accred_pic_input is hidden, so I must call trigger event manually

    $("#accred_pic_input").val( imageEncoded ).trigger("change");

    app.goTo("accred"); //  <== I must manually go to jQueryMobile page ID
}

function validateVin(vin) {
  var re = new RegExp("^[a-zA-Z]{2}[0-9]{1}[a-zA-Z]{1}[0-9]{2}[a-zA-Z]{2}[0-9]{1}[a-zA-Z]{3}[0-9]{5}$");
  return vin.match(re);
}

$(function() {

      $("#vin").on("keyup blur", function() {
        if (validateVin($("#vin").val())) {
          $("#result").css('color', 'green').html("Valid VIN");
          $("#vin").removeClass("not-ok").addClass("ok");
        } else {
          $("#result").css('color', 'red').html("Invalid VIN");
          $("#vin").removeClass("ok").addClass("not-ok");
        }
      });
    });
    
 function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
      return pattern.test(emailAddress);
  };

  // Numeric only control handler
jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

//$("#yourTextBoxName").ForceNumericOnly();

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {

  var largeImage = document.getElementById('largeImage');
  largeImage.style.display = 'block';
  largeImage.src = imageURI;
}

function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  //alert("dd")
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onFail(message) {
  alert('Failed because: ' + message);
}
