/*
  trn_sco.js
  01.09.2008 15:27
 */

function sco_loadPage() {
  resUI.inject(document);
  var para = new Parameters();
  var tr_mode = para.get('mode');
  if(tr_mode!=null){
  	try{
  		mode = parseInt(tr_mode);
  		isFixedMode = true;
  		on_radio_mode(mode);
  		getElement("radio_mode_"+(mode+1)).checked = true;
  	}catch(e){}
  }
  var opt = para.get('caf');
  if(opt)
  {
    optCancelExamAfterFailedStep = parseInt(opt);
  }
  var opt = para.get('fi');
  if(opt)
  {
    optEnableFailIndicator = parseInt(opt);
  }
  getElement("div_scenario_controls").style.display = "inline";

  var result = rtsAPI.initialize();
  on_browse();
}

function sco_unloadPage() {
  var result = rtsAPI.terminate();
}

function sco_scenarioStart() {
  vte.username = rtsAPI.get("cmi.learner_name");
  //completed, incomplete, not attempted, unknown
  rtsAPI.set( "cmi.completion_status", "incomplete" );
  if(mode == MODE_EXAMINE) {
    rtsAPI.set( "cmi.score.min", "0" );
    rtsAPI.set( "cmi.score.max", "1" );
    rtsAPI.set( "cmi.score.scaled", "0" );
    rtsAPI.set( "cmi.score.raw",  "0");
    rtsAPI.set( "cmi.success_status", "unknown" );
  }
}

function sco_scenarioFinish() {
	var sessionTime = "PT" + _scenario.getSessionTime() + "S";
	rtsAPI.set( "cmi.session_time", sessionTime );
	
  if(mode == MODE_EXAMINE) {
    rtsAPI.set( "cmi.score.raw", new String(round2(vte.getScaledScore())) );
    rtsAPI.set( "cmi.score.scaled", new String(round2(vte.getScaledScore())) );
    
    //passed, failed, unknown
    rtsAPI.set( "cmi.success_status", vte.getSuccessStatus() );
    
    if(vte.getSuccessStatus() == "passed")
      rtsAPI.set( "cmi.completion_status", "completed" );
  }
  else {
    rtsAPI.set( "cmi.completion_status", "completed" );
  } 
  
  if(rtsAPI.isStub())
  {
    if(!isFixedMode)getElement("div_radio_mode").style.display = "inline";
    getElement("div_mode_display").style.display = "none";
    on_radio_mode(mode);
  }
  else
  {
	  getElement("div_mode_display").style.display = "none";
	}
}

function sco_loadScenario() {}

var _stepFailed = false;

function sco_stepStarted() {
  _stepFailed = false;
}

function sco_stepFinished() 
{
  if(mode == MODE_EXAMINE) {
    rtsAPI.set( "cmi.score.raw", new String(round2(vte.getScaledScore())) );
    rtsAPI.set( "cmi.score.scaled", new String(round2(vte.getScaledScore())) );
  }
}

function sco_stepFailed()
{
  if(!_stepFailed)
  {
    _stepFailed = true;
  }
}
