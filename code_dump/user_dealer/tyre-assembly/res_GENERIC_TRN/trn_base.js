/*
  trn_base.js
  17:18 07.10.2011
 */
var AppID = {APPLICATIONNAME: "Virtual Training Viewer", VERSION: "3.24"};

var MODE_DEMO    = 0;
var MODE_STUDY   = 1;
var MODE_EXAMINE = 2;

var mode = MODE_DEMO;

var isDocLoaded = false;
var isSceneLoaded = false;
var isReady = false;

var isFixedMode = false;

var isMSIE = true;
var isOpera = false;
var isFF = false;
var isChrome = false;
var cortona = null;
var frmdoc = "document";
var inrTxt = "innerText";
var isHTA = false;
var msgParams = [];
var isContinue = false;

function on_doc_load(){
	isMSIE=(navigator.appName=="Microsoft Internet Explorer");
	isHTA = (isMSIE && location.href.split('.').pop().toLowerCase() == 'hta');
	if(!isMSIE){
		isOpera=(navigator.appName.toLowerCase()=="opera");
		if(!isOpera){
			isFF = (navigator.userAgent.toLowerCase().lastIndexOf("firefox")>0);
			if(!isFF){
				isChrome = (navigator.userAgent.toLowerCase().lastIndexOf("chrome")>0);
			}
		}
		frmdoc = "contentDocument";
		inrTxt = "textContent";
		document.body.style.MozUserSelect="none";
		if(!isChrome)document.getElementById("td50r").style.paddingBottom="3px";
		document.getElementById("act").style.width="auto";
	}else{
		_alert_window = window.createPopup();
	}
	on_window_load();
	setTimeout("on_doc_load_continue();", 0);
}
function on_doc_load_continue(){
	if(checkCortona())
	{ 
		if(optEnableDemoMode){mode=MODE_DEMO;}
		else if(optEnableStudyMode){mode=MODE_STUDY;}
		else if(optEnableExamMode){mode=MODE_EXAMINE;}
			
	  AppID.APPLICATIONNAME = resUI.get("APP_TITLE");
	  
	  vte = new Scenario();
	  vte.on_scenario_start = _on_scenario_start;
	  vte.on_scenario_finish = _on_scenario_finish;
	  vte.on_scenario_cancel = _on_scenario_cancel;
	  vte.on_step_start = _on_step_start;
	  vte.on_step_finish = _on_step_finish;
	  vte.on_expected_operations = _on_expected_operations;
	  vte.on_operations = _on_operations;
	  vte.on_step_input_failed = _on_step_input_failed;
	  
	  api = new SimulationAPI(cortona);
	  api.on_simulation_load = _on_simulation_loaded0;
	  api.on_vcr_state = _on_vcr_state_changed0;
	  api.on_proc_fraction_changed = _on_proc_fraction_changed0;
	  api.on_finish_procedure = _on_finish_animation;
	
	  ipc = new IpcAPI(cortona);
	  ipc.on_part_over = _on_object_over;
	  ipc.on_part_click = _on_object_click;
	  ipc.on_reset = _on_reset;
	  ipc.on_change_centerpoint = _on_change_centerpoint;
	 
	  elementDisabled("radio_mode", true); 
	  getElement("radio_mode_"+(mode+1)).checked = true;
	  doc_clear("doc");
	  doc_clear("com");
	  doc_clear("log");
	  doc_clear("par");
	  
	  getElement("opt_use_document_common_folder").checked = true;
	  getElement("opt_use_scenario_common_folder").checked = true;
	  getElement("opt_use_log_common_folder").checked = true;
	  
	  validatePartsExtraHighlightingColor();
	  	
	  Variable.prototype.toString = function() { return getVariableString(this); }
	  Template.prototype.toString = function() { return getTemplateString(this); }
	  Alert.prototype.toString = function() { return getAlertString(this); }
	  
	  sco_loadPage();
	  isDocLoaded = true;
	  checkIsReady();
	}
	else{
		isDocLoaded = false;
		//close();
	}
}

function checkIsReady(){
	if(isDocLoaded && isSceneLoaded && !isReady){
	  isReady = true;
		var isActive = (optEnableDemoMode || optEnableStudyMode || optEnableExamMode);
		getElement("settingsSpeedFreeze").style.display = "inline";
	  showStatus(resUI.get("STATUS_READY"));
	  if(isActive){
	  	if(isFixedMode){
	  		if(mode==MODE_EXAMINE)getElement("btn_cancel").style.visibility = "hidden";
		  	on_scenario_start();
		  }else{
		  	getElement("div_radio_mode").style.display = "inline";
		  	getElement("div_radio_mode").style.visibility = "visible";
		  }
		  if(!isFixedMode || !(mode==MODE_EXAMINE))getElement("btn_start").style.visibility = "visible";
	  }
	}
}

function checkCortona(){
	try{
		cortona.uiAction("revokePropPage:{E5711FD5-464F-11D3-9D7D-00A0247A5F3F}");
		cortona.uiAction("revokePropPage:{EC48A005-4978-11D3-9D7E-00A0247A5F3F}");
		cortona.uiAction("revokePropPage:{E5711FD4-464F-11D3-9D7D-00A0247A5F3F}");
		cortona.uiAction("revokePropPage:{4E98BA8B-91CE-45C3-B62A-1C67CB99EB75}");
		if(!("Version" in cortona)){
	  	  	var wrnText = (typeof(iWarningCortonaOldVersion)!='undefined')? iWarningCortonaOldVersion: "Outdated version of the Cortona3D Viewer is found on your computer. This cannot render 3D scenes. Update Cortona3D Viewer to the latest version.";
	  	  	alert(wrnText);
	  	}
		return true;
	}catch(e){
		//if(isMSIE)alert(resUI.get("WARNING_IE_CORTONA_NOT_INSTALLED"));
		//else alert(resUI.get("WARNING_CORTONA_NOT_INSTALLED"));
		if(isMSIE){
			document.body.style.cursor="";
		}
		var installMessage = "";
		if(typeof(iCaptionCortonaNotFound) != 'undefined')installMessage = (isMSIE)? iCaptionCortonaNotFound: iCaptionEmbedCortonaNotFound;
		else{
			installMessage = (isMSIE)? resUI.get("WARNING_IE_CORTONA_NOT_INSTALLED"): resUI.get("WARNING_CORTONA_NOT_INSTALLED");
			installMessage += "<br><br><a href=\"http://www.cortona3d.com/install/\">Cortona3D Viewer</a>"
		}
		document.body.innerHTML = '<table width="100%" height="100%"><tr><td align="center" valign="middle" class="errorMessage">'+installMessage+'</td></tr></table>';
		
		return false;
	}
}

function on_doc_unload() {
  clear_all_timeouts();
	if(isODFWindowVisible())
	  _odf_window.close();
	if(isXREFWindowVisible())
    _xref_window.close();
     
	sco_unloadPage();
}

function on_cortona_scene_loaded(success){
	on_scene_loaded(success);
}
function on_cortona_scene_unloaded(){}
function on_cortona_mouse_down(Button, Shift, X, Y){
	safe_call_method_4par(ipc, 'cortona_mouse_down', Button, Shift, X, Y);
    CheckNavStyle();
    cortona_bttn_down=Button;
	if(Button==1)SmartCloseContextMenu(X,Y);
	else CloseContextMenu(X,Y);
}
function on_cortona_mouse_up(Button, Shift, X, Y){
	safe_call_method_4par(ipc, 'cortona_mouse_up', Button, Shift, X, Y);
	CheckNavStyle();
	if(cortona_bttn_down==2 && Button==0){ShowCMenu(X,Y)};
}
function on_cortona_mouse_move(Button, Shift, X, Y){
	if(!CheckCMenuOpen()){
    	setTimeout("safe_call_method_4par(ipc, 'cortona_mouse_move', "+Button+", "+Shift+", "+X+", "+Y+");", 0);
	}
    CheckNavStyle();
}
function on_cortona_mouse_out(){
	safe_call_method_void(ipc, 'cortona_mouse_out');
	CheckNavStyle();
}
function on_cortona_mouse_enter(){}
function on_cortona_key_down(key, shift){}

/*****************************
  Simulation API event handlers
 *****************************/
function _on_vcr_state_changed0(state){ 
	setTimeout("_on_vcr_state_changed("+state+");", 0);
}
function _on_vcr_state_changed(state){ 
  var _a = ['', 'btn_play', 'btn_pause'];
  
  for(var i=0; i<_a.length; i++)
    if(_a[i] != ''){
      navControl.Hlight(3+i, (state == i));
  	}
  
  getElement("btn_skip_animation").disabled = (state != api.PLAY);
    
  ipc.enable(vte.isActive() && (state != api.PLAY));
  
  navControl.Disable(5, (state != api.PLAY));
    
  if(state == api.PLAY) {
    showActForm('');  
    _on_object_over(null);
    showStatus(resUI.get("STATUS_ANI_ACTIVATED"));
  }
  else
  if(state == api.STOP) {
    showODFItem(null);
  }
}

var _220D2D6C8F2146c8A84F5D3888BB69CE;
function _on_proc_fraction_changed0(fraction) {
	setTimeout("_on_proc_fraction_changed("+fraction+");", 0);
}

function _on_proc_fraction_changed(fraction) {
  switch(fraction) {
    case 0:
      if(_bSkipBackward) {
        _bSkipBackward = false;
        
        disableAllInput("div_vcr", false);
        refreshPause();
        
        set_timeout_once("165a128c-4c25-45ed-ab9e-4f1cbd312918", "recalculateZoomLimits();", 10);
        if(_oFirstStepAfterSkip != null) {
          _220D2D6C8F2146c8A84F5D3888BB69CE = _oFirstStepAfterSkip;
          set_timeout_once("f146a950-2764-4c59-9038-b6f1f00e8c03", "vte.startStep(_220D2D6C8F2146c8A84F5D3888BB69CE);", 1)
        }
      }
      set_timeout_once("d6799677-dd8c-4d6d-a56d-bd24780d94b4", "validatePartsList();", 1);
      break;
    case 1:
      if(_bSkipForward) {
        _bSkipForward = false;
        set_timeout_once("165a128c-4c25-45ed-ab9e-4f1cbd312918", "recalculateZoomLimits();", 10);
        set_timeout_once("f146a950-2764-4c59-9038-b6f1f00e8c03", "vte.processStep();", 1);
      }
      set_timeout_once("d6799677-dd8c-4d6d-a56d-bd24780d94b4", "validatePartsList();", 1);
      break;
  }
  
  
}

function _on_finish_animation() {
    vte.processStep();
    switch(mode) {
      case MODE_STUDY:
        showODFItem(null);
        break;
      case MODE_EXAMINE:
        _bScenarioPlayMode = api.PAUSE;
        break;
      case MODE_DEMO:
        break;
    }
}

/*****************************
  VTE Simulation API event handlers
 *****************************/
var _bSkipBackward = false;
var _bSkipForward = false;
var _bSkipOperation = false;
var _oFirstStepAfterSkip = null;
var _bScenarioPlayMode = 0;
var _leo = [];

function _on_scenario_start() {
  showStatus(resUI.get("STATUS_SCENARIO_STARTED"));
  getElement("div_mode_display").innerHTML = [resUI.get("MODE_DEMO"), resUI.get("MODE_STUDY"), resUI.get("MODE_EXAM")][mode].replace(/ /g, '&nbsp;');
  getElement("div_mode_display").style.display = "inline";
  
	//doc_clear("log");
	doc_clear("doc");
	doc_clear("com");
	
  getElement("btn_start").style.display = 'none';
  getElement("btn_cancel").style.display = 'inline';
  getElement("btn_odf_procedure").disabled = (mode == MODE_EXAMINE || odfProcedureUrl==""); 
  if((typeof(optMuteAudioInExam)!='undefined') && optMuteAudioInExam)api.set_mute_audio(mode == MODE_EXAMINE);
    
  elementDisabled("radio_mode", true);
  getElement("div_radio_mode").style.display = "none";
  getElement("div_mode_display").style.display = "inline";

	ipc.enable(true);

  _bSkipBackward = false;
  _bSkipForward = false;
  _bSkipOperation = false;
  _oFirstStepAfterSkip = null;
  _bScenarioPlayMode = api.STOP;
  _leo = [];

  _on_vcr_state_changed(api.STOP);
	
	if(mode == MODE_EXAMINE) {
    if(isODFWindowVisible()) {
      _odf_window.close();
      _odf_window = null;
    }
    if(isXREFWindowVisible()) {
      _xref_window.close();
      _xref_window = null;
    }
  }

	var modeString = '';
	switch(mode) {
	  case MODE_DEMO:
      loadODFStep(vte);
	    disableAllInput("div_vcr", false);
	    getElement("div_vcr").style.display = 'inline';
	    modeString = resUI.get("MODE_DEMO");
      getElement("fault_meter_table").style.display = 'none';
      getElement("pos").style.left = '';
      //on_vcr_play();
      showActHelp(resUI.get("MSG_STARTED_DEMO"));
	    break;
	  case MODE_STUDY:
	    on_show_expected_operations(getElement("opt_show_expected_operations").checked);
	    getElement("div_vcr").style.display = 'inline';
	    modeString = resUI.get("MODE_STUDY");
      getElement("fault_meter_table").style.display = 'none';
      getElement("pos").style.left = '';
	    break;
	  case MODE_EXAMINE:
	    on_show_expected_operations(false);
	    getElement("div_vcr").style.display = 'none';
 	    modeString = resUI.get("MODE_EXAM");
      getElement("fault_meter_table").style.display = optEnableFailIndicator ? 'inline' : 'none';
      getElement("pos").style.left = '';
      on_pad('par');
	    break;
	}

	refreshPause();
	
  doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Scenario started in ' + modeString + '</dt></dl>');
  
  sco_scenarioStart();
}

function scenario_end() {
  msgParams = [];
  isContinue = false;
  if(mode == MODE_EXAMINE)
    saveHistory();
  getElement("btn_start").style.display= 'inline';
  getElement("btn_cancel").style.display = 'none';
  getElement("btn_odf_procedure").disabled = (odfProcedureUrl=="");
  elementDisabled("radio_mode", false);
  getElement("div_radio_mode").style.display = "none";
  getElement("div_mode_display").style.display = "inline";
  getElement("fault_meter_table").style.display = "none";
  
  ipc.enable(false);
  
  api.set_procedure(vte.history.drop(), 1);
  api.vcr_set_proc_fraction(0);
  buildVPForm(null);
  getElement("div_vcr").style.display = 'none';
  
  _bSkipForward = false;
  _bSkipOperation = false;
  _bSkipBackward = false;

	doc_clear("doc");
	doc_clear("com");
	showActForm("");  
	
	clear_all_timeouts();
	getElement("msg").innerHTML = '&nbsp;';

    showActHelp([resUI.get("MSG_ON_FINISH_SCENARIO_SCORM_STUDY_DEMO"), resUI.get("MSG_ON_FINISH_SCENARIO_SCORM_STUDY_DEMO"), resUI.get("MSG_ON_FINISH_SCENARIO_SCORM_EXAM")][mode]);
	
	sco_scenarioFinish();
}

function _on_scenario_finish() {
  showStatus(resUI.get("STATUS_SCENARIO_FINISHED"));
  var status = vte.getSuccessStatus();
  var score = round2(vte.getScaledScore());
  doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Scenario finished</dt>' + ((mode != MODE_DEMO) ? '<dd>Status: '+status+'</dd><dd>Score: '+score+'</dd>' : '') + '</dl>');
  if(mode == MODE_EXAMINE) {
    var syntax = '<tr class="head"><th colspan="2">'+resUI.get("MSG_ON_FINISH_SCENARIO_EXAM")+'</th></tr>';
    syntax += '<tr><td width="60">'+resUI.get("UI_TXT_FINISH_EXAM_STATUS")+':</td><td width="100%" style="'+((status != "passed") ? 'color:red;' : 'color:green;')+'">'+resUI.get("UI_TXT_FINISH_EXAM_"+status.toUpperCase())+'</td></tr>';
    if(status == "passed")
      syntax += '<tr><td>'+resUI.get("UI_TXT_FINISH_EXAM_SCORE")+':</td><td style="'+((score < 1) ? 'color:red;' : '')+'">'+Math.floor(score*100)+'% '+resUI.get("UI_TXT_FINISH_EXAM_OF_MAXIMUM_POINTS")+'</td></tr>';
    showMsgBox(AppID.APPLICATIONNAME, syntax, 0, "scenario_end()", "");
    if(isMSIE)scenario_end();
  }else{
  	  var flg = isStandAlone;
  	  if(isStandAlone){
  	  	  flg = showMsgBox(AppID.APPLICATIONNAME, '<tr><th height="60" style="text-align:center;">'+resUI.get("MSG_ON_FINISH_SCENARIO_STUDY_DEMO")+'</th></tr>', 1, "_post_scenario_finish(true)", "_post_scenario_finish(false)");
  	  }
  	  if(isMSIE)_post_scenario_finish(flg);
  }
}

function _post_scenario_finish(flag) {
	if(flag){
		scenario_end();
	}else {
		_leo.length = 0;
		vte.active = true;
		clearSelectedParts();
		getElement("btn_stop").disable = false;
		getElement("btn_step_prev").disable = false;
		showActForm("");
	}
}

function _on_scenario_cancel() {
  showStatus(resUI.get("STATUS_SCENARIO_CANCELED"));
  var status = 'canceled';
  doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Scenario finished</dt><dd>Status: '+status+'</dd></dl>');
  if(mode == MODE_EXAMINE) {
    var syntax = '<tr class="head"><th colspan="2">'+resUI.get("MSG_ON_FINISH_SCENARIO_EXAM")+'</th></tr>';
    syntax += '<tr><td width="60">Status:</td><td width="100%" style="'+((status != "passed") ? 'color:red;' : 'color:green;')+'">'+resUI.get("UI_TXT_FINISH_EXAM_"+status.toUpperCase())+'</td></tr>';
    showMsgBox(AppID.APPLICATIONNAME, syntax, 0, "scenario_end()", "");
    if(isMSIE)scenario_end();
  }else{
  	scenario_end();
  }
}

function _on_step_start(oStep) {
  disableAllInput("div_vcr", false);
  refreshPause();

  buildVPForm(oStep.viewpoints);
  if(mode != MODE_EXAMINE) {
    switch(mode) {
      case MODE_DEMO:
        break;
      case MODE_STUDY:
        loadODFStep(oStep);
        break;
    }
    showODFStep(oStep);
    loadStepComment(oStep);
    doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Step started:</dt><dd>' + getText(oStep.description) + '</dd></dl>');
  }
  getElement("pos").style.left = '';
  sco_stepStarted();
}

function _on_step_finish(oStep) {
  disableAllInput("div_vcr", true);
  refreshPause();
  
  switch(mode) {
    case MODE_DEMO:
      if(!getElement("opt_continuous").checked)
        _bScenarioPlayMode = api.STOP;
      break;
    case MODE_STUDY:
      doc_clear("doc");
      doc_clear("com");
      _bScenarioPlayMode = api.STOP;
      break;
    case MODE_EXAMINE:
      _bScenarioPlayMode = api.STOP;
      break;
  }
  sco_stepFinished();
}

function _on_expected_operations(leo) {
  _leo = leo;

  validateSelectedParts();
  validateVariablesFrame();

  switch(mode) {
    case MODE_DEMO:
      if(leo.length > 0 && (_bScenarioPlayMode == api.PLAY)) {
        set_timeout_once("34c62c5a-3cff-4678-8ac1-fb22ed997069", "executeOperation(_leo[0]);", 1);
        buildActForms();
      }
      break;
    case MODE_STUDY:
      if(leo.length > 0 && (_bScenarioPlayMode == api.PLAY))
        set_timeout_once("34c62c5a-3cff-4678-8ac1-fb22ed997069", "executeOperation(_leo[0]);", 1);
      else
        set_timeout_once("34c62c5a-3cff-4678-8ac1-fb22ed997069", "vte.processInput(null);", 1);
      buildActForms();
      break;
    case MODE_EXAMINE:
      set_timeout_once("34c62c5a-3cff-4678-8ac1-fb22ed997069", "vte.processInput(null);", 1);
      buildActForms();
      break;
  }
}

function _on_operations(operations, oInput) {
  if(oInput) {
    clear_timeout("MSG_TIMEOUT");
    getElement("msg").innerHTML = '&nbsp;';
  }  
  validateVariablesFrame();
  
  if(_bSkipForward)   return;
  
  var bWait = false;

  if(oInput != null)
    doc_writeline("log", '<dl><dt>'+getTime()+' | Operation successful:</dt>');
  
  var substeps = [];
  var initialFraction = 0;
  
  var messages = [];
  
  for(var i=0; i<operations.length; i++) {
    var animation = operations[i].animation;
    if(animation != null) {
      if(animation.constructor == Animation) {
        substeps = substeps.concat(animation.substeps);
        initialFraction = _bSkipOperation ? 1 : animation.initialFraction;
      }
    }
    
    var message = operations[i].message;
    if(message != null)
      messages.push(message);
      
    switch(mode) {
      case MODE_DEMO:
      case MODE_STUDY:
        if(!_bSkipForward && !_bSkipOperation)
          showODFItem(operations[i]);
        break;
      case MODE_EXAMINE:
        break;
    }
    
    if(oInput != null)
      if(operations[i].activity != null) {
        if(operations[i].activity.constructor == RequestVariable)
          doc_writeline("log", '<dd>'+getInputString(oInput)+'</dd>');
        else
          doc_writeline("log", '<dd>'+operations[i].activity.getTemplate()+'</dd>');
        if(operations[i].animation != null)
          doc_writeline("log", '<dd>Operation { description "' + getText(operations[i].description) + '" }</dd>');
        if(operations[i].assignments != null)
          for(var key in operations[i].assignments.assoc)
            doc_writeline("log", '<dd>Assignment { name "' + key + '" value "' + ((isHTA)? xmltext(operations[i].assignments.assoc[key].expression): operations[i].assignments.assoc[key].expression) + '"}</dd>');
      }
  }
    
  if(substeps.length > 0) {
    api.set_procedure(substeps, 0);
/*  
    if(substeps.length == 1)
      api.set_procedure(substeps[0], 0);
    else
      api.set_multithread_procedure(substeps, 0);
*/  
      
    api.vcr_set_proc_fraction(initialFraction);
  
    
  
    _bSkipForward = (initialFraction >= 1)

    if(!_bSkipForward)
      api.vcr_play();
    
    bWait = true;
  }
  
  _bSkipOperation = false;
  
  if(oInput != null)
    doc_writeline("log", '</dl>');

  if(messages.length > 0) {
    var _t = (messages.join(' ').split(' ').length / 2 + 1) * 1000;
    on_message(messages.join('<br>'), _t*5, true);
  }

  if(!bWait)
   vte.processStep();
}

function _on_step_input_failed(oStep, oInput) {
  if(getElement("opt_shake_window_after_failt").checked)
    windowShake();
  if(mode == MODE_STUDY || (mode == MODE_EXAMINE && !optCancelExamAfterFailedStep)) {
    doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Wrong trainee action.</dt></dl>');    
    on_message(resUI.get("MSG_WRONG_ACTION"), 4000, false);
  }
  if(mode == MODE_EXAMINE) {
    if(optCancelExamAfterFailedStep)
    {
      var ra = oStep.getRemainingAttempts();
      ra = (ra < 0) ? 'infinite' : ra;
      on_message(resUI.get("MSG_WRONG_ACTION_ATTEMPTS") + ' ' + ra, 4000, false);
      doc_writeline("log", '<dl style="color:red"><dt>' + getTime() + ' | Wrong trainee action. Remaining attempt(s): ' + ra + '</dt></dl>');
    }
    if(oStep.errorLimits >= 0) {
      sco_stepFailed();
      getElement("pos").style.left = (1 - oStep.getScaledScore()) * 100 + '%';
      if(optCancelExamAfterFailedStep && oStep.errors > oStep.errorLimits)
        vte.fail();
    }
  }
}

/*************************************
  UI handlers
**************************************/

var _odf_window = null;
var _bShowExpectedOperations = false;

function on_browse() {
      var res = vte.loadFromNode(xSc);
      if(res) {
        setProcedureTitle(vte.description);
        if(isMSIE){
        	cortona.Scene = make_fullpath(vte.vrmlUrl, get_basepath());
        }
        buildVPForm(null);
        getElement("btn_start").disabled = false;
        elementDisabled("radio_mode", false);

        if(odfProcedureUrl!="")getElement("btn_odf_procedure").disabled=false;
        
        ipc.setPartNodes(vte.parts.assoc);
        doc_clear("log");
        doc_clear("doc");
        doc_clear("par");
        doc_clear("prm");
        doc_writeline("log", '<dl style="color:red"><dt>'+getTime()+' | Scenario loaded:</dt><dd>' + getText(vte.description) + '</dd></dl>');
        doc_writeline("par", getSumItem("divparts", "divparts"));

        sco_loadScenario();
        on_radio_mode(mode);
        validateVariablesFrame();

    	  getElement("btn_publish").disabled = false;
    	  getElement("btn_publish_content").disabled = false;
    	  
        showStatus(resUI.get("STATUS_READY"));
      }
      else {
        showStatus(resUI.get("STATUS_SCENARIO_NOTLOADED"));
        alert(resUI.get("ERROR_SCENARIO_NOTLOADED"));
  }
}

function on_scenario_start() {
  vte.start();
}

function on_scenario_cancel() {
	var val = showMsgBox(AppID.APPLICATIONNAME, '<tr><th height="60" style="text-align:center;">'+resUI.get("MSG_ON_CANCEL_SCENARIO")+'</th></tr>', 1, "_post_scenario_cancel()", "");
	if(isMSIE && val)_post_scenario_cancel();
}
function _post_scenario_cancel(flag) {
    vte.cancel();
    api.vcr_stop();
    _leo.length = 0;
    clearSelectedParts();
    buildActForms();
}

function on_form_submit(n) {
  disableAllInput("div_vcr", false);
  refreshPause();
  
  ipc.enable(true);
	
  var activity = _leo[n].activity;
  var input = activity.getTemplate();
  input.para = {};
  var l = activity.lists;
  for(var j=0; j<l.length; j++)
    input.para[l[j].text] = getElement("list_"+n+"_"+j).value;

  // reset selected items for _leo
  if(activity.objects.length > 0)
    for(var i=0; i<_leo.length; i++)
      if(i != n)
        _leo[i].initialize();

  doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Action of the trainee:</dt><dd>' + getInputString(input) + '</dd></dl>');
  vte.processInput(input);
}

function on_form_cancel(n) {
  disableAllInput("div_vcr", false);
  refreshPause();

  ipc.enable(true);

  _leo[n].activity.initialize();
  vte.processStep();
  buildActForms();
}

function on_form_skip(n) {
  if(_bScenarioPlayMode != api.PLAY) {
    disableAllInput("div_vcr", false);
    refreshPause();
    
    ipc.enable(true);
    
    _bScenarioPlayMode = api.PAUSE;
    _bSkipOperation = true;
    showActForm('');  
    var input = _leo[n].activity.getTemplate();
    doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Skip:</dt><dd>' + getInputString(input) + '</dd></dl>');
    vte.processInput(input);
  }
}

function on_set_operation_viewpoint(n) {
  if(_bScenarioPlayMode != api.PLAY)
    if(_leo[n].animation) {
      api.set_procedure([].concat(_leo[n].animation.substeps), 1);
      api.vcr_set_proc_fraction(0);
    }
}

function on_submit_var(name, type) {
  var input = new Variable();
  input.name = name;
  input.type = type;
  var value = getElement("var_"+name).value;
  if(input.type == 'number' || input.type == 'numeric')
    if(isNaN(new Number(value))) {
      alert(resUI.get("WARNING_NUMERIC_VALUE"));
      getElement("var_"+name).focus();
      return;
    }
  input.setValue(value);

  doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Action of the trainee:</dt><dd>' + getInputString(input) + '</dd></dl>');
    
  vte.processInput(input);
  buildActForms();
}

function on_message(text, timeout, is_alert) {
  text = getText(translateVariables(text));
  if(!is_alert)
    text = '<span class="msg_alert">' + text + '</span>';
  if(is_alert)
    doc_writeline("log", '<dl style="color:#FF8000"><dt>'+getTime()+' | Message:</dt><dd>' + text + '</dd></dl>');
  getElement("msg").innerHTML = text;
  set_timeout_once("MSG_TIMEOUT", "getElement('msg').innerHTML = '&nbsp;';", timeout)
}

function on_radio_mode(n) {
  mode = n;
  showActHelp([resUI.get("MSG_ACTIVATED_DEMO"), resUI.get("MSG_ACTIVATED_STUDY"), resUI.get("MSG_ACTIVATED_EXAM")][mode]);
}

function on_pad(name) {
  if(!isReady)return;
  hideMeta();
  var padArray = ['doc', 'com', 'log', 'par', 'prm', 'opt', 'hlp'];
  padArray.mapv(function _ (n){elementClassName('tab_'+n, 'tab');elementDisplay(n, 'none');});
  elementDisplay(name, 'block');
  elementClassName('tab_'+name, 'htab');
  try {
    doc_all("doc", _highlighted_odf_step).scrollIntoView();
  } catch(exception) {}
}

function disableAllInput(holder_name, flag) {
  var holder = getElement(holder_name);
  var n = holder.getElementsByTagName('input');
  for(var i=0; i<n.length; i++)
    n[i].disabled = flag;
}

function on_step_previous() {
  _bScenarioPlayMode = api.STOP;
  api.vcr_stop();

  showODFItem(null);
  
  _oFirstStepAfterSkip = null;
  if(!vte.history.isEmpty()) {
  	if(vte.activeStep)
  		doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Skip Step Backward:</dt><dd>' + vte.activeStep.description + '</dd></dl>');
    
    showActForm('');  
    disableAllInput("div_vcr", true);
    _bSkipBackward = true;

    var s;
    var substeps = [];
    _oFirstStepAfterSkip = null;
    
  	if(vte.activeStep) {
      s = vte.history.pop();
      substeps =  s.getSubsteps();
      _oFirstStepAfterSkip = s.step;
      setVariablesFromSet(vte, s.variables_set);
    }
    
    while(!vte.history.isEmpty()) {
      s = vte.history.pop();
      substeps = s.getSubsteps().concat(substeps);
      _oFirstStepAfterSkip = s.step;
      setVariablesFromSet(vte, s.variables_set);
      if(!s.isNotInteractive())
        break;
    }
    
    api.set_procedure(substeps, 1);
    api.vcr_set_proc_fraction(0);
  }
}

function on_step_next() {
  if(vte.activeStep) {
    doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Skip Step Forward:</dt><dd>' + vte.activeStep.description + '</dd></dl>');
    
    showActForm('');  
    _bScenarioPlayMode = api.STOP;
    api.vcr_pause();
    
    showODFItem(null);
    
    _bSkipForward = true;
    
    vte.activeStep.initialize();
    vte.processInput(null);
    
    var operations = vte.activeStep.getOperations();
    var substeps = [];
    for(var i=0; i<operations.length; i++) {
      if(operations[i].animation)
        substeps = substeps.concat(operations[i].animation.substeps);
      executeOperation(operations[i]);
    }
    if(substeps.length > 0) {
      api.set_procedure(substeps, 0);
      api.vcr_set_proc_fraction(1);
    }
    else
      _on_proc_fraction_changed(1);
  }
}

function on_vcr_reset() {
  _bScenarioPlayMode = api.STOP;
  _oFirstStepAfterSkip = null;
  if(!vte.history.isEmpty()) {
    if(vte.activeStep)
      doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Reset Step:</dt><dd>' + vte.activeStep.description + '</dd></dl>');
    disableAllInput("div_vcr", true);
    _bSkipBackward = true;
    var s = vte.history.pop();
    var substeps = s.getSubsteps();
    _oFirstStepAfterSkip = s.step;
    setVariablesFromSet(vte, s.variables_set);
    api.set_procedure(substeps, 1);
    api.vcr_set_proc_fraction(0);
  }
}

function on_vcr_pause() {
  _bScenarioPlayMode = api.PAUSE;
  api.vcr_pause();
  recalculateZoomLimits();
}

function on_vcr_play() {
  if(_bScenarioPlayMode != api.PLAY) {
    _bScenarioPlayMode = api.PLAY;
    if(api.procedure_fraction < 1 && (api.state != api.STOP))
      api.vcr_play();
    else 
      if(_leo.length > 0)
        executeOperation(_leo[0]);
  }
}

function on_show_expected_operations(bFlag) {
  _bShowExpectedOperations = bFlag;
  buildActForms();
}

function on_object_select(name, bFlag) {
  if(ipc.is_enabled) {
    if(mode != MODE_DEMO) {
      doc_writeline("log", '<dl style="color:green"><dt>'+getTime()+' | Action of the trainee:</dt><dd>' + getInputString(name) + '</dd></dl>');
      vte.processInput(name);
      vte.processStep();
      buildActForms();
    }
  }
}

var _alert_activity = null;

function on_alert_ok() {
  doc_writeline("log", '<dl style="color:#FF8000;"><dt>'+getTime()+' | Alert</dt><dd>' + _alert_activity.getTemplate() + '</dd></dl>');
  if(isMSIE)_alert_window.hide();
  vte.processInput(_alert_activity);
}

function on_parameters() {

}

function on_print() {
  _copier_field('print');
}

function on_page_setup() {
  _copier_field('pageSetup');
}

/******************************
  Stuff
*******************************/

function checkOperationConfirmStage() {
  var result = false;
  for(var i=0; i<_leo.length && !result; i++) {
    var activity = _leo[i].activity;
    result = (activity && activity.constructor == Activity && activity.isActive() && activity.objects.length > 0);
  }
  return result;
}

function buildActForms() {
  if(!vte.isActive())
    return;
  
  var locateObjectExamFlag = false;
  
  var syntax = '<table width="100%" border="0" cellspacing="0" cellpadding="5">';
  var bg = ['anormal', 'normal'];
  var counter = 1;
  var alert_activity = null;
  var isOperationConfirmStage = checkOperationConfirmStage();
  var isExam = (mode == MODE_EXAMINE) || (mode == MODE_STUDY && !_bShowExpectedOperations);

  for(var i=0; i<_leo.length; i++) {
    var activity = _leo[i].activity;
    if(activity != null) {
      var bgcolor = bg[counter % 2];
      var isObjectActivity  = (activity.constructor == Activity && activity.objects.length > 0);
      var isSelectActivity  = (activity.constructor == Activity && activity.lists.length > 0);
      var isRequestActivity = (activity.constructor == RequestVariable);
      var isAlertActivity   = (activity.constructor == Alert);
      var isStudyWithExpectedOperations = (mode == MODE_STUDY && _bShowExpectedOperations);
      
      if(isObjectActivity && !activity.isActive() && isExam && !isOperationConfirmStage)
        locateObjectExamFlag = true;
      
      if(activity.isActive() || (isStudyWithExpectedOperations && !isOperationConfirmStage)) {
        if((isObjectActivity || isSelectActivity) && mode != MODE_DEMO) {
          
          if(activity.isActive()) {
            var description = activity.description;
            if(description == "")
              description = _leo[i].description;
            if(description == "")
              description = "<No description>";
            syntax += '<tr class="'+bgcolor+'"><td align="left">'+getText(description)+'</td></tr>\r\n';
            
            if(isSelectActivity)
              syntax += '<tr class="'+bgcolor+'"><td align="left"><div class="act_hlp">'+((isExam) ? resUI.get("MSG_OPTION_ACTIVITY_EXAM") : resUI.get("MSG_OPTION_ACTIVITY_STUDY"))+'</div></td></tr>\r\n';
            
            syntax += '<tr class="'+bgcolor+'"><td align="left"><div class="act_hlp">'+((isObjectActivity) ? resUI.get("MSG_ACTIVITY_CONFIRMATION_OBJECT") : resUI.get("MSG_ACTIVITY_CONFIRMATION_NOOBJECT"))+'</div></td></tr>\r\n';
          }
          else
          if(isStudyWithExpectedOperations && !isOperationConfirmStage) {
            syntax += '<tr class="'+bgcolor+'"><td align="left"><div class="act_hlp">'+(resUI.get("MSG_OBJECT_ACTIVITY_STUDY"))+'</div></td></tr>\r\n';
            syntax += '<tr class="'+bgcolor+'"><td class="tdal">'+getText(_leo[i].description)+'</td></tr>\r\n';
          }
              
          syntax += '<tr class="'+bgcolor+'"><td width="100%"><table width="100%" border="0" cellspacing="0" cellpadding="5">';
          
          if(isObjectActivity && (isStudyWithExpectedOperations && !isOperationConfirmStage)) {
            syntax += '<tr class="'+bgcolor+'"><td colspan="2" style="font-size:13px;line-height:26px;">';

            if(activity.objects.length > 1)
              syntax += (activity.selectionType == 1) ? resUI.get('UI_TXT_SELECT_ANY')+": " : resUI.get('UI_TXT_SELECT_ALL')+": ";
            else
              syntax += resUI.get('UI_TXT_SELECT')+": ";
            
            for(var j=0; j<activity.objects.length; j++)
              syntax += '<a class="'+(activity.selected[j] ? 'hlinkbtn' : 'linkbtn' )+'" href="#" onmouseover="on_object_highlight(\''+activity.objects[j]+'\', true)" onmouseout="on_object_highlight(\''+activity.objects[j]+'\', false)" onclick="on_object_locate_ex(\''+activity.objects[j]+'\')" title="'+resUI.get('UI_TXT_LOCATE_PART')+'">' + getText(getPartName(activity.objects[j])) + '</a> ';
            
            syntax += '</td></tr>';
          }
          
          if(isSelectActivity && activity.isActive()) {
            var l = activity.lists;
            var swd =(isMSIE)? "": 'style="width:100%;"';
            for(var j=0; j<l.length; j++) {
              syntax += '<tr class="'+bgcolor+'"><td colspan="2">' + getText(l[j].text) + ' <select '+swd+' id="list_'+i+'_'+j+'" size="1">';
              var t = [].concat(l[j].items);
              if(!isStudyWithExpectedOperations){
                t = t.sort(randomSort);
              }
              for(var k=0; k<t.length; k++) {
                var v = t[k];
                //if(v.length > 80)
                  //v = v.substring(0, 56) + '...';
                syntax +='<option value="'+t[k].replace(/"/g, '&quot;').replace(/'/g, '&#39;')+'">'+getText(v);
              }
              syntax += '</select></td></tr>';
            }
          }
          
          syntax += '<tr class="'+bgcolor+'"><td align="left">';
          if(activity.isActive()) {
            syntax += '<input type="button" class="button" value="'+resUI.get("UI_BTN_SUBMIT")+'" onclick="on_form_submit('+i+')" title="'+resUI.get("UI_BTN_SUBMIT_TITLE")+'">&nbsp;';
            if(isObjectActivity) {
              syntax += '<input type="button" class="button" value="'+resUI.get("UI_BTN_CANCEL")+'" onclick="on_form_cancel('+i+')" title="'+resUI.get("UI_BTN_CANCEL_TITLE")+'">&nbsp;';
              ipc.enable(false);
              disableAllInput("div_vcr", true);
            }
          }
          syntax += '</td><td class="tdal">';
          if(isStudyWithExpectedOperations && !(isObjectActivity && activity.isActive())) {
            syntax += '<input type="button" class="button" value="'+resUI.get("UI_BTN_SKIP")+'" onclick="on_form_skip('+i+')" title="'+resUI.get("UI_BTN_SKIP_TITLE")+'">&nbsp;';
            syntax += '<input type="button" class="button" value="'+resUI.get("UI_BTN_LOCATION")+'" style="width:65px;" onclick="on_set_operation_viewpoint(' + i + ')" title="'+resUI.get("UI_BTN_LOCATION_TITLE")+'" ' + (_leo[i].animation ? '' : 'disabled') + '>&nbsp;';
          }
          syntax += '</td></tr></table></td></tr>\r\n';
          counter++;
        }
        else
        if(isRequestActivity) {
          syntax += '<tr class="'+bgcolor+'"><td colspan="2" align="left"><div class="act_hlp">'+resUI.get("MSG_PARAM_ACTIVITY")+'</div></td></tr>';
          syntax += '<tr class="'+bgcolor+'"><td colspan="2" class="tdal">' + getText(_leo[i].description) + '</td></tr>';
          syntax += '<tr class="'+bgcolor+'"><td><table border="0" cellspacing="0" cellpadding="5">';
          syntax += '<tr class="'+bgcolor+'"><td colspan="2">' + getText(activity.prompt) + '</td></tr>';
          var name = (activity.name.charAt(0) == '_') ? activity.name.substring(1) : activity.name;
          syntax += '<tr class="'+bgcolor+'"><td>' + getText(name) + '</td><td>';
          var type = vte.variables[activity.name].type;
          switch(type) {
            case 'enumeration':
              var value = new Number(activity.value).valueOf();
              var items = vte.variables[activity.name].items;
              syntax += '<select id="var_'+getText(activity.name)+'" size="1">';
              for(var i=0; i<items.length; i++)
                syntax += '<option value="'+i+'" '+((value == i)?'selected':'')+'>'+getText(items[i]);
              syntax += '</select>';
              break;
            case 'boolean':
              var value = new Boolean(activity.value);
              syntax += '<select id="var_'+getText(activity.name)+'" size="1"><option value="1" '+(value?'selected':'')+'>'+resUI.get("UI_TXT_TRUE")+'<option value="" '+(value?'':'selected')+'>'+resUI.get("UI_TXT_FALSE")+'</select>';
              break;
            default:
              syntax += '<input id="var_'+getText(activity.name)+'" type="text" value="'+getText(activity.value)+'" size="20">';
          }
          syntax += '</td></tr>';
          syntax += '<tr style="class="'+bgcolor+'"><td align="left" colspan="2">';
          syntax += '<input type="button" class="button" value="'+resUI.get("UI_BTN_SUBMIT")+'" onclick="on_submit_var(\''+activity.name+'\', \''+type+'\')" title="'+resUI.get("UI_BTN_SUBMIT_PARA_TITLE")+'">';
          syntax += '</td></tr></table></td></tr>\r\n';
          counter++;
        }
        else
        if(isAlertActivity && alert_activity == null) {
          if(!_bSkipForward && !_bSkipOperation) {
            alert_activity = activity;
          }
        }
      }
    }
  }
  syntax += '</table>';
  showActForm(syntax);

  showActHelp(locateObjectExamFlag ? resUI.get("MSG_OBJECT_ACTIVITY_EXAM") : "");

  if(alert_activity != null)
    if(mode != MODE_EXAMINE && getElement("opt_show_alert_box").checked) {
      if(mode == MODE_STUDY) {
          _alert_activity = alert_activity;
      		set_timeout_once("aef2f8d3-6dd3-4eb5-985c-1ccbd071d39d", "showAlert(_alert_activity);", 1);
      }
    }
    else
      vte.processInput(alert_activity.getTemplate());
  
  validateSelectedParts();
  
}

function randomSort(){return (Math.round(Math.random())-0.5);} 

function executeOperation(operation) {
  var input = null;
  var activity = operation.activity;
  if(activity != null) {
    input = activity.getTemplate();
    switch(activity.constructor) {
      case Activity:
        if(!_bSkipForward && !_bSkipOperation && getElement("opt_flash_part_in_demo").checked) {
          var objects = activity.objects;
          for(var i=0; i<objects.length; i++)
            on_object_flash(objects[i], false);
        }
        break;
      case RequestVariable:
		if(!_bSkipForward && !_bSkipOperation) {
			buildActForms();
			return;
		}
        doc_writeline("log", '<dl style="color:green;"><dt>'+getTime()+' | Set default variable value</dt><dd>' + activity.getTemplate() + '</dd></dl>');
      case Alert:
        if(!_bSkipForward && !_bSkipOperation && getElement("opt_show_alert_box").checked) {
          showAlert(activity);
          return;
        }
    }
  }
  vte.processInput(input);
}

function getInputString(oInput) {
  var inputString = 'Null {}';
  if(oInput != null) {
    inputString = (oInput.constructor == String) ? 'Selected { object "'+getPartName(oInput)+'" }' : oInput.toString();
  }
  return inputString;
}

function getVariableString(oVariable) {
  var syntax = 'Variable { name "'+oVariable.name+'" value "'+getText(oVariable.value)+'" }';
  return syntax;
}

function getTemplateString(oTemplate) {
  var syntax = 'Template { ';
  for(var i=0; i<oTemplate.objects.length; i++)
    syntax += '<br><span style="margin-left:20px;">object "'+getPartName(oTemplate.objects[i])+'"</span>';
  for(key in oTemplate.para) 
    syntax += '<br><span style="margin-left:20px;">option { name "'+key+'" value "'+getText(oTemplate.para[key])+'" }</span>';
  syntax += '<br>}';
  return syntax;
}

function getAlertString(oAlert) {
  var syntax = 'Alert { ';
  if(oAlert.description != "")
    syntax += '<br><span style="margin-left:20px;">description "'+getText(oAlert.description)+'"</span>';
  if(oAlert.odfId)
    syntax += '<br><span style="margin-left:20px;">odf-itemid '+oAlert.odfId+'</span>';
  syntax += '<br>}';
  return syntax;
}

function getVariablesSyntax() {
  var variables = vte.variables;

  var syntax = '<table width="100%" border="0" cellspacing="2" cellpadding="3">';
  syntax += '<tr>';
  syntax += '<th>'+resUI.get("UI_VART_NAME")+'</th>';
  syntax += '<th>'+resUI.get("UI_VART_TYPE")+'</th>';
  syntax += '<th>'+resUI.get("UI_VART_INITV")+'</th>';
  syntax += '<th>'+resUI.get("UI_VART_VALUE")+'</th>';
  syntax += '</tr>';
  for(var key in variables) {
    var name = (key.charAt(0) == '_') ? key.substring(1) : key;
    if(name.charAt(0) != '$') {
      syntax += '<tr title="'+getText(variables[key].description)+'">';
      syntax += '<td class="lefttd">'+getText(name)+'</td>';
      syntax += '<td class="innertd">'+getText(variables[key].type)+'</td>';
      syntax += '<td class="innertd">'+getText(variables[key].defaultValueOf())+'</td>';
      syntax += '<td class="innertd">'+getText(variables[key].valueOf())+'</td>';
      syntax += '</tr>';
    }
  }
  syntax += '</table>';
  return syntax;
}

function validateVariablesFrame() {
  doc_clear("prm");
  doc_writeline("prm", '<html><head><style>td {font-family:tahoma, sans-serif; font-size:13px; vertical-align:top;} th {text-align:left; font-family:tahoma, sans-serif; color:black; background-color:#DDDDEE; font-size:13px;} td.lefttd { border-bottom:1px #DDDDEE dotted; } td.innertd { border-bottom:1px #DDDDEE dotted; border-left:1px #DDDDEE dotted; } </style></head><body>'+getVariablesSyntax()+'</body></html>');
}

function clearSelectedParts() {
	try {
	    for(var name in vte.parts.assoc)
	      doc_all("par", "tprt_"+name).getElementsByTagName("td")[0].innerHTML = '&nbsp;';
    }catch(exception){}
}

function validateSelectedParts() {
 clearSelectedParts();
 try {
    for(var i=0; i<_leo.length; i++) {
      var activity = _leo[i].activity;
      if(activity && activity.constructor == Activity) {
        for(var j=0; j<activity.objects.length; j++) {
          if(activity.selected[j]){
            doc_all("par", "tprt_"+activity.objects[j]).getElementsByTagName("td")[0].innerHTML = '<span style="color:white; background-color:red; padding:0px 2px 0px 2px; font-weight:bold;">&radic;</span>';
          }
          
        }
      }
    }
  }
  catch(exception){}
}

function showActHelp(textHtml) {
  getElement("act_hlp").innerHTML = textHtml;
}

function showActForm(syntax) {
  getElement("act_txt").innerHTML = syntax;
  if(syntax == '')
    showActHelp('');
  showStatus(resUI.get("STATUS_READY"));
}

function showModeHelp(syntax) {
  if(syntax && syntax != "") {
    getElement("mode_hlp").innerHTML = syntax;
    getElement("mode_hlp").style.display = "block";
  }
  else
    getElement("mode_hlp").style.display = "none";
}

function windowShake() {
  try {
    var COUNT = 20;
    var DELTA = 20;
    for(var i=0; i<COUNT; i++) {
      var x = Math.floor(Math.random() * DELTA - DELTA/2);
      var y = Math.floor(Math.random() * DELTA - DELTA/2);
      window.moveBy(x, y);
      window.moveBy(-x, -y);
    }
  } catch(exception) {};
}

//====================================================
// 3D
//====================================================
var cMenu = null;
var navControl = null;
var cortona_bttn_down = 0;
var cntwt = 0;

function on_window_load() 
{
	document.getElementById("opt_show_alert_box").checked = option_show_alert_box;
	document.getElementById("opt_flash_part_in_demo").checked = option_flash_part_in_demo;
	document.getElementById("opt_continuous").checked = option_continuous;
	document.getElementById("opt_show_expected_operations").checked = option_show_expected_operations;
	document.getElementById("opt_unroll_navigation").checked = option_unroll_navigation;
	
  embedCortona(cortona);
  navControl = new NavigationControl();
  cMenu = new ContextMenu(document.getElementById("menu_container"));
  window.document.onkeydown=CloseContextMenu;
  window.onblur = CloseContextMenu;
  window.onresize = onResizeW;
  onResizeW();

}

function embedCortona(cElement){
	if(isMSIE){
		var loadingText = "Loading...";
		try{loadingText = iLoadingMessage;}catch(e){}
		document.body.style.cursor=resFolder+"hourglas.ani";
		document.getElementById('location_table').style.visibility = "hidden";
		document.getElementById('stTd3_0').style.visibility = "hidden";
		document.getElementById('cortonaContainer').innerHTML = '<table id="loading_table" width="100%" height="100%"><tr><td align="center" valign="middle" class="loadingMessage">'+loadingText+'</td></tr></table><object style="display:none;" classid="CLSID:86A88967-7A20-11D2-8EDA-00600818EDB1" type="application/x-oleobject" width="100%" height="100%" id="cortonaControl" border="0"><param name="BackColor" value="&hC0A0A0"><param name="NavigationBar" value="0"><param name="ConsoleMode" value="0"><param name="ContextMenu" value="False"><param name="LoadDroppedScene" value="False"><param name="RendererHints" value="5168"><param name="RendererName" value="DirectX Renderer"><param name="RendererOptimization" value="0"><param name="ShowLogo" value="False"><param name="TravelSpeed" value="2"><param name="viewpoint_transition_mode" value="0"><param name="show_hidden_viewpoints" value="0"><param name="WaitForAllResources" value="True"><param name="MuteSound" value="2"></object>';
	}else{
		document.getElementById('cortonaContainer').innerHTML = '<embed type="application/x-cortona" width="100%" height="100%" id="cortonaControl" src="'+xSc.vrmlUrl+'" consolemode="0" contextmenu="false" vrml_background_color="#A0A0C0" cpuloading="80" loaddroppedscene="false" rendererhints="5168" renderername="DirectX Renderer" rendereroptimization="0" headlight="true" navigationbar="0" pixelbufferaccess="true" skin="{1706B265-E103-4332-9871-7FEE6C37C699}" vrml_splashscreen="true" travel_speed="2" viewpoint_transition_mode="0" WaitForAllResourses="true" MuteSound="2" />';
		
	}
	cortona = document.getElementById('cortonaControl');
}

function cortonaControl_OnSceneLoaded(bSuccess){if(cortona && cortona.Engine){on_cortona_scene_loaded(bSuccess);}else{setTimeout("cortonaControl_OnSceneLoaded("+bSuccess+")", 1000);}}
//function cortonaControl_OnSceneUnloaded(){on_cortona_scene_unloaded();}
function cortonaControl_MouseDown(Button, Shift, X, Y){on_cortona_mouse_down(Button, Shift, X, Y);}
function cortonaControl_MouseUp(Button, Shift, X, Y){on_cortona_mouse_up(Button, Shift, X, Y);}
function cortonaControl_MouseMove(Button, Shift, X, Y){on_cortona_mouse_move(Button, Shift, X, Y);}
function cortonaControl_OnMouseOut(){if(typeof(on_cortona_mouse_out)=="function")on_cortona_mouse_out();}
//function cortonaControl_OnKeyDown (key, shift){on_cortona_key_down(key, shift);}


function on_scene_loaded(bSuccess){
	if(bSuccess && cortona.Engine.RootNodes.Count>0){
		unlock_cortona(bSuccess);
		safe_loaded_call();
	}
	if(!bSuccess){
		unlock_cortona(bSuccess);
		alert(resUI.get("ERROR_SCENE_NOTLOADED"));  
		close();
	}
}

function safe_loaded_call(){
	if(api){
		api.scene_loaded_on_start();
		isSceneLoaded = true;
		setTimeout(checkIsReady, 1);
	}else{
		cntwt++;
		setTimeout("safe_loaded_call()", 100*cntwt);
	}
}

function unlock_cortona(bSuccess){
	if(isMSIE){
		document.body.style.cursor="";
		document.getElementById('loading_table').style.display = "none";
		cortona.style.display = "";
	}
	if(bSuccess){
		document.getElementById('location_table').style.visibility = "visible";
		document.getElementById('stTd3_0').style.visibility = "visible";
	}
}

function CheckNavStyle(){
	if(navControl!=null){
		navControl.checkMode();
	}
}
function CheckCMenuOpen(){
	if(cMenu!=null){
		return cMenu.checkIsOpen();
	}
	return false;
}
function ShowCMenu(X,Y){
	if(cMenu!=null){
		cMenu.show(X, Y, cortona);
	}
}

function showCortonaProperties(){
	this.cortona.uiAction("preferences");
}

function showAbout(){
	var docVersion = optPublisherVersion+"-"+AppID.VERSION;
	alert(document.getElementById("proxyElementAboutDocument").innerHTML+" "+docVersion+"\n"+document.getElementById("proxyElementAboutCortona").innerHTML+" "+cortona.Version);
}

//------
function onResizeW(){
	if(!isMSIE){
		var hght = document.getElementById("tab_container").clientHeight+"px";
		var padArray = ['doc', 'com', 'log', 'par', 'prm', 'opt', 'hlp'];
		for(var i=0; i<padArray.length; i++){
			document.getElementById(padArray[i]).style.height=hght;
		}
		//document.getElementById("act").style.width=document.getElementById("dmsg").clientWidth+"px";
		//document.getElementById("td1btm").style.height=(document.getElementById("td2btm").clientHeight-2)+"px";
	}

	CloseContextMenu();
}
var isWaitMenu = false;
var menuTimeout = null;
function CloseContextMenu(){
	if(cMenu!=null)cMenu.close();
	hideMeta();
}
function SmartCloseContextMenu(X, Y){
	if(cMenu!=null){
		if(!cMenu.checkPoint(X, Y)){
			cMenu.close();
		}
	}
}
function OnContextMenuBlur(){
	if(menuTimeout!=null)clearTimeout(menuTimeout);
	if(!isWaitMenu)menuTimeout = setTimeout("CloseContextMenu()", 0);
}
function ContextMenuNoBlur(isWait){
	isWaitMenu = isWait;
	if(menuTimeout!=null)clearTimeout(menuTimeout);
	document.getElementById('cmenu_anchor').focus();
	return false;
}
function CheckContextMenuOpen(){
	return (cMenu!=null && cMenu.checkIsOpen());
}

//==============================================================================
//  ContextMenu
//==============================================================================
function ContextMenu(contextSpan){
this.oContextHTML = contextSpan;
var cncl = new Function('return false;');
this.oContextHTML.onselectstart = cncl;
this.oContextHTML.oncontextmenu = cncl;
this.oContextHTML.style.MozUserSelect="none";
this.isOpen=false;
this.coords = [0, 0, 0, 0];
}

ContextMenu.prototype.show = ContextMenu_show;
ContextMenu.prototype.close = ContextMenu_close;
ContextMenu.prototype.checkIsOpen = ContextMenu_checkIsOpen;
ContextMenu.prototype.checkPoint = ContextMenu_checkPoint;

function ContextMenu_show(ax, ay, coordElement, chain){
	function getOption(txt, onclick, enabled){
		if(enabled){
			return "<tr><td colspan='2' style='background-color: #c0c0c0; color: #000000; font-family:tahoma, sans-serif; font-size:8pt; padding: 2px 17px 2px 17px; cursor: default; white-space : nowrap; text-align : left;' onmouseover='this.style.color=\"#FFFFFF\"; this.style.backgroundColor=\"#000080\";' onmouseout='this.style.color=\"#000000\"; this.style.backgroundColor=\"#c0c0c0\";' onmousedown='ContextMenuNoBlur(true);' onmouseup='ContextMenuNoBlur(false);' onclick='"+onclick+" cMenu.close();'>" +txt+ "</td></tr>";
		}else{
			return "<tr><td colspan='2' disabled style='background-color: #c0c0c0; color: #000000; font-family:tahoma, sans-serif; font-size:8pt; padding: 2px 17px 2px 17px; cursor: default; white-space : nowrap; text-align : left;'>" +txt+ "</td></tr>";
		}
	}
	function getPosition(element){var left = element.offsetLeft; var top = element.offsetTop; for (var parent = element.offsetParent; parent; parent = parent.offsetParent){left += parent.offsetLeft; top += parent.offsetTop;}return {left: left, top: top};}
	
	var hrOption = "<tr><td colspan='2' style='background-color: #c0c0c0; padding: 0px 2px 0px 2px; cursor: default;'><hr></td></tr>";
	var tableSyntax = "<a id='cmenu_anchor' style='text-decoration: none;cursor: default;' onblur='OnContextMenuBlur();' onmousedown='ContextMenuNoBlur(true);' onmouseup='ContextMenuNoBlur(false);' onclick='return false;' href='#'><div style='border: 1px solid; border-color: #c0c0c0 #000000 #000000 #c0c0c0;'><div style='border: 1px solid; border-color: #FFFFFF #808080 #808080 #FFFFFF; background-color: #c0c0c0; padding: 2px 2px 2px 2px;'><table style='border-collapse:collapse;'>";
	var cmTitle = " ";
	if(arguments.length<4){
		tableSyntax += getOption(document.getElementById("proxyElementCortonaProperties").innerHTML, "showCortonaProperties();", true);
		tableSyntax += hrOption;
		tableSyntax += getOption(document.getElementById("proxyElementAbout").innerHTML, "setTimeout(\"showAbout();\",0);", true);	
	}else{
		for(var i=chain.length-1; i>=0; i--)
			tableSyntax += getOption(getPartName(chain[i].node.Name).replace(/\s/g, '&nbsp;'), "on_object_select(\""+chain[i].node.Name+"\", true);", true);
	}
	tableSyntax += "</table></div></div></a>";
	this.oContextHTML.style.width="";
	this.oContextHTML.style.height="";
	this.oContextHTML.innerHTML=tableSyntax;
	var wW=this.oContextHTML.clientWidth;
	var wH=this.oContextHTML.clientHeight;
	var crtW = coordElement.offsetWidth;
	var crtH = coordElement.offsetHeight;
	var pos = getPosition(coordElement);
	var crtL = pos.left;
	var crtT = pos.top;
	var x = (ax+wW<crtW)? ax+crtL+2: ax+crtL-2-wW;
	var y = (ay+wH<crtH)? ay+crtT+2: ay+crtT-2-wH;
	this.oContextHTML.style.left=x+"px";
	this.oContextHTML.style.top=y+"px";
	this.coords = [x, y, x+wW, y+wH];
	this.oContextHTML.innerHTML = '<IFRAME id="ifr_cmenu" style="Z-INDEX: 1001; VISIBILITY: visible; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; LEFT: 0; TOP: 0;" src="about:blank" frameSpacing="0" frameBorder="no" scrolling="no"></IFRAME><DIV id="innerDiv_cmenu" style="DISPLAY: block; Z-INDEX: 1002; LEFT: 0px; TOP: 0px; VISIBILITY: visible; OVERFLOW: visible; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; border:0;">'+this.oContextHTML.innerHTML+'</DIV>';
	startRefresher();
	document.getElementById('cmenu_anchor').hideFocus = true;
	document.getElementById('cmenu_anchor').focus();
	this.isOpen = true;
}
function ContextMenu_close(){
	if(this.isOpen){
		this.isOpen = false;
		stopRefresher();
		this.oContextHTML.innerHTML = "";
		this.oContextHTML.style.left="0";
		this.oContextHTML.style.top="0";
		this.oContextHTML.style.width="0";
		this.oContextHTML.style.height="0";
	}
}
function ContextMenu_checkIsOpen(){
	return this.isOpen;
}

function ContextMenu_checkPoint(X, Y){
	return(this.isOpen && this.coords[0]>X && this.coords[2]<X && this.coords[1]>Y && this.coords[3]<Y);
}

var iZ = 1001;
var cmenu_interval = null;
function refreshZ(){
	iZ++;
	document.getElementById('ifr_cmenu').style.zIndex = iZ+10;
	document.getElementById('innerDiv_cmenu').style.zIndex = iZ+20;
	if(iZ>90000)iZ=1001;
}
function startRefresher(){
	if(!isMSIE && cmenu_interval==null){
		cortona.InputDevices=0;
		cmenu_interval = window.setInterval("try{refreshZ();}catch(e){}",10);
	}
}
function stopRefresher(){
	if(cmenu_interval!=null){
		window.clearInterval(cmenu_interval);
		cmenu_interval = null;
		cortona.InputDevices=255;
	}
}

//==============================================================================
//  NavigationControl
//==============================================================================
function NavigationControl(){
	this.buttonsNames = ["btnSpin", "btnZoom", "btnPan", "btnFit", "btn_play", "btn_pause", "btn_stop", "btn_step_prev", "btn_step_next"];
	this.bases = [32, 32, 32, 32, 25, 25, 25, 25, 25];
	this.modes = ["spin", "zoom", "pan", "fit"];
	this.btns =new Array();
	for(var i=0; i<this.buttonsNames.length; i++){
		var btn = document.getElementById(this.buttonsNames[i]);
		this.btns.push({span:btn, state:0, pressed:false, over:false});
		btn.onclick = new Function('navControl.onBtnClick( '+i+');');
		btn.onmouseover = new Function('navControl.onBtnOver('+i+');');
		btn.onmouseout = new Function('navControl.onBtnOut('+i+');');
		btn.onmousedown = new Function('navControl.onMouseDown('+i+');');
		btn.onmouseup = new Function('navControl.onMouseUp('+i+');');
	}
	this.currentMode = 0;
	this.btns[0].state=1;
	this.btns[0].span.style.backgroundPosition = "-64px 0";
	this.Disable(5, true);
}

NavigationControl.prototype.onBtnClick = NavigationControl_onBtnClick;
NavigationControl.prototype.onBtnOver = NavigationControl_onBtnOver;
NavigationControl.prototype.onBtnOut = NavigationControl_onBtnOut;
NavigationControl.prototype.checkMode = NavigationControl_checkMode;
NavigationControl.prototype.onMouseDown = NavigationControl_onMouseDown;
NavigationControl.prototype.onMouseUp = NavigationControl_onMouseUp;
NavigationControl.prototype.Disable = NavigationControl_Disable;
NavigationControl.prototype.Hlight = NavigationControl_Hlight;

function NavigationControl_Disable(n, bFlag){
	this.btns[n].state=(bFlag)? 2: 0;
	this.btns[n].span.style.backgroundPosition =(bFlag)? "-75px 0" : "0 0";
}

function NavigationControl_Hlight(n, bFlag){
	if(this.btns[n].state!=2){
		this.btns[n].state=(bFlag)? 3: 0;
		this.btns[n].span.style.backgroundPosition =(bFlag)? "-100px 0" : "0 0";
	}
}

function NavigationControl_onMouseDown(n){
	if(this.btns[n].state>=2)return;
	this.btns[n].pressed = true;
	if(this.btns[n].over){
		this.btns[n].span.style.backgroundPosition = "-"+(this.bases[n]*2)+"px 0";
	}else{
		this.btns[n].span.style.backgroundPosition = "0 0";
	}
}
function NavigationControl_onMouseUp(n){
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = "-"+this.bases[n]+"px 0";
	}	
	this.btns[n].pressed = false;
}

function NavigationControl_onBtnClick(n){	
	if(this.btns[n].state>=2)return;
	if(n<3){
		if(this.btns[n].state==0){
			this.btns[n].state=1;
			this.btns[n].span.style.backgroundPosition = "-"+(this.bases[n]*2)+"px 0";
			setNavigationStyle(this.modes[n]);
			for(var i=0; i<this.modes.length; i++){
				if(n!=i){
					this.btns[i].state=0;
					this.btns[i].span.style.backgroundPosition = "0 0";
				}
			}
		}
	}else if(n==3){
		api.set_ui_axis(false);
		cortona.uiAction("fit");
		api.set_ui_axis(true);
	}else if(n==4){
		on_vcr_play();
	}else if(n==5){
		on_vcr_pause();
	}else if(n==6){
		on_vcr_reset();
	}else if(n==7){
		on_step_previous();
	}else if(n==8){
		on_step_next();
	}
}
function NavigationControl_onBtnOver(n){	
	this.btns[n].over = true;	
	if(this.btns[n].state==0){
		if(this.btns[n].pressed){
			this.btns[n].span.style.backgroundPosition = "-"+(this.bases[n]*2)+"px 0";
		}else{
			this.btns[n].span.style.backgroundPosition = "-"+this.bases[n]+"px 0";
		}
	}
}
function NavigationControl_onBtnOut(n){
	this.btns[n].over = false;
	this.btns[n].pressed = false;
	if(this.btns[n].state==0){
		this.btns[n].span.style.backgroundPosition = "0 0";
	}
}
function NavigationControl_checkMode(){
	if(getNavigationStyle()!=this.modes[3]){
		for(var i=0; i<this.modes.length; i++){
			if(getNavigationStyle()==this.modes[i]){
				this.onBtnClick(i);
				return;
			}
		}
	}
}

function getNavigationStyle(){
	return cortona.NavigationStyle;
}
function setNavigationStyle(sStyle){
	cortona.NavigationStyle = sStyle;	
}

function refreshPause(){
 navControl.Disable(5, (api.state != api.PLAY));
}

var resUI = new(function(){
	this.constructor.prototype.get = function(n) { return (n in uiPackage)? uiPackage[n][0]: ""; }
  this.constructor.prototype.inject = function(d) 
  {
  	for(var key in uiPackage){
  		var ea = uiPackage[key];
  		if(ea.length>1){
  			var n = d.getElementById(ea[1]);
        if(n){
			if(isMSIE || ea[2]!="innerText"){
            	n[ea[2]] = ea[0];
            }else{
            	n.textContent = ea[0];
            }
         }
  		}
  	}    
  }    
})();


function saveHistory() {
  if(isHTA) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var basepath = get_basepath().replace(/file:\/+/, '').replace(/\//g, '\\');
    var logfolder = basepath+'log\\';
    if(!fso.FolderExists(logfolder))
      try {
        fso.CreateFolder(logfolder);
      } catch(exception) { alert("ERROR: Can't create history folder\r\n"+logfolder+"\r\n"+exception.description); }
    try {
      var base_name = logfolder +vte.vrmlUrl.split('.')[0]+"_"+ new Date().toUTCString().replace(/\W/g, '');
      var fn =  base_name+ '.xml';
      var f = fso.CreateTextFile(fn, true, true);
      f.WriteLine(vte.history.toXML());
      f.Close();
      var fn2 =  base_name+ '.html';
      f = fso.CreateTextFile(fn2, true, true);
      var syntax = transform(fn, resFolder+'vte-history-to-html.xsl', {"scenario_url" : "../"+vte.vrmlUrl.replace(/.wrl/, '.training.xml')});
      f.WriteLine(syntax);
      f.Close();
    } catch(exception) { alert("ERROR: History file save error\r\n\n"+exception.description); }
  }
}

function transform(xmlpath, stylesheetpath, param) {
  try {
    var dom = new ActiveXObject('Microsoft.XMLDOM');
    dom.async = false;
    if(dom.load(xmlpath)) {
      var xslt = new ActiveXObject("Msxml2.XSLTemplate.4.0");
      var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.4.0");
      var xslProc;
      xslDoc.async = false;
      if(xslDoc.load(stylesheetpath)) {
        xslt.stylesheet = xslDoc;
        xslProc = xslt.createProcessor();
        xslProc.input = dom;
        for(key in param) 
          xslProc.addParameter(key, param[key]);
        xslProc.transform();
        return xslProc.output;
      }
    }
  }
  catch(exception) {
    alert("ERROR: XML document transformation failed\r\n"+exception.description);
  }
  return '';
}