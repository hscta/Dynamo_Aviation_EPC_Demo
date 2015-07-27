/* 
  trn_common.js
  12:35 08.08.2011
 */

Array.prototype.map = function (f) {
  var result = [];
  result.length = this.length;
	for(var i=0; i<this.length; i++)
		result[i] = f(this[i]);
	return result;
}

Array.prototype.mapv = function (f) {
	for(var i=0; i<this.length; i++)
		f(this[i]);
	return this;
}

Array.prototype.or = function () {
	for(var i=0; i<this.length; i++)
	  if(this[i])
	    return true;
	return (this.length == 0);
}

Array.prototype.and = function () {
	for(var i=0; i<this.length; i++)
	  if(!this[i])
	    return false;
	return true;
}

function get_basepath() {
  var path = unescape(location.href.split('?')[0].split('#')[0]).split('/');
  path.pop();
  path.push('');
  path = path.join('/');
  return path;
}

    
function make_fullpath(path, basepath) {
  var result = "";
  if(path) {
    result = path.replace(/\\/g, '/');
    basepath = basepath.replace(/\\/g, '/');
    if(basepath.length > 0 && basepath.charAt(basepath.length-1) != '/')
      basepath += '/'
    result = (result.indexOf(':') == -1 && result.indexOf('//') != 0) ? (basepath + result) : result;
    if(result.indexOf('//') == 0)
      result = result.replace(/\//g, '\\');
  }
  return result;
}

function Parameters() {
  this._params = {};
  
  var a = unescape(self.location.search).substr(1).split('&');
  for(var i=0; i<a.length; i++) {
    var p = a[i].split('=');
    this._params[p[0]] = (p.length > 1) ? p[1] : p[0];
  }
}
Parameters.prototype.get = function(name)
{
  return (typeof(this._params[name]) != "undefined") ? this._params[name] : (arguments.length > 1 ? arguments[1] : null);
}

function _createFieldFromArray(fieldName, a) {
  var f = null;
  try {
    f = cortona.Engine.CreateField(fieldName);
    switch(f.Type) {
      case 211: // SFString
      case 209: // SFNode
        f.Value = a[0];
        break;
      case 215: // SFTime
      case 207: // SFInt32
      case 205: // SFFloat
        f.Value = new Number(a[0]);
        break;
      case 202: // SFBool
        f.Value = new Boolean(a[0]);
        break;
      case 203: // SFColor
        f.Red = new Number(a[0]);
        f.Green = new Number(a[1]);
        f.Blue = new Number(a[2]);
        break;
      case 206: // SFImage
        break;
      case 210: // SFRotation
        f.Angle = new Number(a[3]);
      case 213: // SFVec3f
        f.Z = new Number(a[2]);
      case 212: // SFVec2f
        f.Y = new Number(a[1]);
        f.X = new Number(a[0]);
        break;
    }
  }
  catch(exception) {}
  return f;
}

function _assignValueFromArray(field, a) {
  field.Assign(_createFieldFromArray(field.TypeName, a));
}

function _assignValueFromString(field, s) {
  _assignValueFromArray(field, s.split(' '));
}

var _EA70CCA97DA54EB5913C41693D990A67 = {};

function set_timeout_once(key, code, timeout) {
  if(typeof(_EA70CCA97DA54EB5913C41693D990A67[key]) != 'undefined')
    clearTimeout(_EA70CCA97DA54EB5913C41693D990A67[key]);
  _EA70CCA97DA54EB5913C41693D990A67[key] = setTimeout(code, timeout);
}

function clear_all_timeouts() {
  for(var key in _EA70CCA97DA54EB5913C41693D990A67)
    clearTimeout(_EA70CCA97DA54EB5913C41693D990A67[key]);
}

function clear_timeout(key) {
  if(typeof(_EA70CCA97DA54EB5913C41693D990A67[key]) != 'undefined')
    clearTimeout(_EA70CCA97DA54EB5913C41693D990A67[key]);
}

/*
  Rotation helper
 */

function Rotation(/*oVec3f, angle | oVec3f, oVec3f | x, y, z, angle*/) {
  if(arguments.length == 4) {
    this.x = arguments[0];
    this.y = arguments[1];
    this.z = arguments[2];
    this.angle = arguments[3];
  }
  else
  if(arguments.length == 2) {
    if(typeof(arguments[1]) == 'number') {
      this.setAxis(arguments[0]);
      this.angle = arguments[1];
    }
    else {
      var FLT_EPSILON = 1.192092896e-07;
      var v = arguments[0].normalize();
      var v1 = arguments[1].normalize();
      var axis = v.cross(v1);
			var len = axis.length();
			if (len <= FLT_EPSILON) {
				if (v.dot(v1) < 0.0) {
					axis = v.cross(Vec3f(1, 0, 0));
					this.angle = Math.PI;
					len = axis.length();
					if (len <= FLT_EPSILON)
						axis = v.cross(Vec3f(0, 1, 0));
          axis = axis.normalize();
				}
				else {
          axis = Vec3f(0, 1, 0);
					this.angle = 0.0;
				}
			}
			else {
				this.angle = Math.atan2(len, v.dot(v1));
        axis = axis.normalize();
			}
			this.setAxis(axis);
    }
  }
  else
  if(arguments.length == 1 && arguments[0] && arguments[0].constructor == Array && arguments[0].length == 4) {
    this.x = arguments[0][0];
    this.y = arguments[0][1];
    this.z = arguments[0][2];
    this.angle = arguments[0][3];
  }
  else {
    this.x = 0;
    this.y = 0;
    this.z = 1;
    this.angle = 0;
  }
}
Rotation.prototype.multVec = Rotation_multVec;
Rotation.prototype.inverse = Rotation_inverse;
Rotation.prototype.multiply = Rotation_multiply;
Rotation.prototype.setAxis = Rotation_setAxis;
Rotation.prototype.getAxis = Rotation_getAxis;


function Rotation_multVec(oVec3f) {
	var e = -this.angle;
	var s = Math.sin(e);
	var c = Math.cos(e);
	
	var f = this.x;
	var g = this.y;
	var h = this.z;
	
	var x = oVec3f.x;
	var y = oVec3f.y;
	var z = oVec3f.z;
	
	var p = (f*x+g*y+h*z)*(1-c);
	
	var px = f*p + c*x + s*(h*y-g*z);
	var py = g*p + c*y + s*(f*z-h*x);
	var pz = h*p + c*z + s*(g*x-f*y);
	return new Vec3f(px, py, pz);
}

function Rotation_inverse() {
  return new Rotation(this.x, this.y, this.z, -this.angle);
}

function Rotation_multiply(oRotation) {
    var Sa = Math.sin(oRotation.angle/2);
    var Ca = Math.cos(oRotation.angle/2);
    var As = oRotation.getAxis().multiply(Sa);

    var Sb = Math.sin(angle/2);
    var Cb = Math.cos(angle/2);
    var Bs = this.getAxis().multiply(Sb);

    var Cab = Ca*Cb - As.dot(Bs);

    var ABs = As.multiply(Cb).add(Bs.multiply(Ca)).add(Bs.cross(As));

    var msq = ABs.x*ABs.x + ABs.y*ABs.y + ABs.z*ABs.z;

    var result = new Rotation(0,0,1,0);
    if (msq != 0) {
      var Sab = Math.sqrt(msq);
      result.setAxis(ABs.divide(Sab));
      result.angle = 2*Math.atan2(Sab, Cab);
    }    
    return result;
}

function Rotation_setAxis(oVec3f) {
  this.x = oVec3f.x;
  this.y = oVec3f.y;
  this.z = oVec3f.z;
}

function Rotation_getAxis() {
  return new Vec3f(this.x, this.y, this.z);
}


/*
  Vec3f helper
 */

function Vec3f(/*x, y, z*/) {
  if(arguments.length == 3) {
    this.x = arguments[0];
    this.y = arguments[1];
    this.z = arguments[2];
  }
  else
  if(arguments.length == 1 && arguments[0] && arguments[0].constructor == Array && arguments[0].length == 3) {
    this.x = arguments[0][0];
    this.y = arguments[0][1];
    this.z = arguments[0][2];
  }
  else {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
}
Vec3f.prototype.add = Vec3f_add;
Vec3f.prototype.subtract = Vec3f_subtract;
Vec3f.prototype.dot = Vec3f_dot;
Vec3f.prototype.cross = Vec3f_cross;
Vec3f.prototype.divide = Vec3f_divide;
Vec3f.prototype.multiply = Vec3f_multiply;
Vec3f.prototype.length = Vec3f_length;
Vec3f.prototype.normalize = Vec3f_normalize;
Vec3f.prototype.negate = Vec3f_negate;

function Vec3f_add(oVec3f) {
  return new Vec3f(oVec3f.x + this.x, oVec3f.y + this.y, oVec3f.z + this.z);
}

function Vec3f_subtract(oVec3f) {
  return new Vec3f(this.x - oVec3f.x, this.y - oVec3f.y, this.z - oVec3f.z);
}

function Vec3f_dot(oVec3f) {
  return (oVec3f.x * this.x + oVec3f.y * this.y + oVec3f.z * this.z);
}

function Vec3f_cross(oVec3f) {
  return new Vec3f(this.y * oVec3f.z - oVec3f.y * this.z, this.x * oVec3f.x - oVec3f.z * this.x, this.x * oVec3f.y - oVec3f.x * this.y);
}

function Vec3f_divide(nValue) {
  return new Vec3f(this.x / nValue, this.y / nValue, this.z / nValue);
}

function Vec3f_multiply(nValue) {
  return new Vec3f(this.x * nValue, this.y * nValue, this.z * nValue);
}

function Vec3f_length() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

function Vec3f_normalize() {
  var m = this.x * this.x + this.y * this.y + this.z * this.z;
  return m == 0 ? this : this.divide(m);
}

function Vec3f_negate() {
  return new Vec3f(-this.x, -this.y, -this.z);
}

function round1(x) { return Math.round(x*10)/10; }
function round2(x) { return Math.round(x*100)/100; }
function round5(x) { return Math.round(x*10000)/10000; }

function bool_to_switch(b)              { return b ? 0 : -1; }
function vec2_len(x, y, x1, y1)         { return Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y)); }
function vec3_len(x, y, z, x1, y1, z1)  { return Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y)+(z1-z)*(z1-z)); }
function safe_call_void(name)           { eval('if(typeof('+name+') == "function") '+name+'();') }
function safe_call_method_void(object, name)           { if(object && name in object) object[name](); }
function safe_call_method_1par(object, name, value)           { if(object && name in object) object[name](value); }
function safe_call_method_2par(object, name, value1, value2)           { if(object && name in object) object[name](value1, value2); }
function safe_call_method_3par(object, name, value1, value2, value3)           { if(object && name in object) object[name](value1, value2, value3); }
function safe_call_method_4par(object, name, value1, value2, value3, value4)           { if(object && name in object) object[name](value1, value2, value3, value4); }

//=====================================================================
// vtv_common
//=====================================================================

var ipc = null;
var api = null;
var vte = null;

var OPT_ALERTMSGBOX_ENABLED             = "AlertMsgBoxEnabled";
var OPT_PARTSEXTRAHIGHLIGHTING_ENABLED  = "PartsExtraHighLightingEnabled";
var OPT_CONTINUOUSPLAY_ENABLED          = "ContinuousPlayEnabled";
var OPT_SHOWEXPECTEDOPERATIONS_ENABLED  = "ShowExpectedOperationsEnabled";
var OPT_USEDOCUMENTCOMMONFOLDER_ENABLED = "UseDocumentCommonFolder";
var OPT_USELOGCOMMONFOLDER_ENABLED      = "UseLogCommonFolder";
var OPT_USESCENARIOCOMMONFOLDER_ENABLED = "UseScenarioCommonFolder";
var OPT_DOCUMENTCOMMONFOLDER_PATH       = "DocumentCommonFolder";
var OPT_SCENARIOCOMMONFOLDER_PATH       = "ScenarioCommonFolder";
var OPT_LOGCOMMONFOLDER_PATH            = "LogCommonFolder";
var OPT_PARTSEXTRAHIGHLIGHTING_COLOR    = "PartsExtraHighLightingColor";

var OPT_CURRENT_CONFIGURATION  = "CurrentCfg";
var OPT_CURRENT_CONFIGURATION_FILE  = "CurrentCfgFile";
var OPT_USEUNROLLNAVIGATION = "UseUnrollNavigation";
var OPT_LAST_PUBLISHED_FOLDER = "LastPublishedFolder";

var COPIER_SYNTAX = 'DEF COPIER Script {eventIn SFBool pageSetup eventIn SFBool print field SFString headerText "&bManufacturer Proprietary Commercial Data" field SFString footerText "" field MFString headerStyle ["" "" "" "" "" "solid"] field MFString footerStyle ["" "" "" "" "" "solid"] url "nativescript: libuid=CarbonCopy; scriptid=CopierScript; file-win32-x86=CarbonCopy.dll#version=1,0,0,8" }';

var isStandAlone = true;
var isModeSelectorEnabled = true;
var isAutoStart = false;

/*****************************
  Simulation API event handlers
 *****************************/
var _skin_info = null;

var _isValidConfiguration = false;

function _on_simulation_loaded0(flag){
	setTimeout("_on_simulation_loaded("+flag+")", 0);
}
function _on_simulation_loaded(flag){
	safe_call_method_1par(ipc, 'cortona_on_scene_loaded', flag);
	if(flag) {
		api.set_ui_smoothcontrol(false);
		api.set_ui_axis(true);
		api.set_ui_zoom(false);
		api.set_ui_vcr(false);

		api.set_speed_ratio(1);
    getElement("sp_ratio_2").checked = true;

    api.set_freeze_viewpoint(getElement("chk_freeze").checked);
		
		var e = cortona.Engine;
		
		_skin_info = null;
		try { 
		  _skin_info = e.Nodes.Item("_SKIN_INFO");
		} catch(exception) {}
		
		if(!_skin_info) {
		  var skin_info_proto = e.CreateProtoFromString('PROTO _F1567AC92E3241E98748C882BEC46FC6 [exposedField MFString info []] {Group{}}');
		  e.Protos.Add(skin_info_proto);
		  _skin_info = skin_info_proto.CreateInstance();
		  _skin_info.Name = "_SKIN_INFO";
		  e.RootNodes.Add(_skin_info);
		  recalculateZoomLimits();
		}
	  if(_skin_info.TypeName != 'WorldInfo') {
	    _skin_info.Fields.Item("info").Clear();
		  _skin_info.Fields.Item("info").Add("limits=.001,10000");
		  _skin_info.Fields.Item("info").Add("skip=HUD_Controls,VCR_CONTROL_SCRIPT");
		  _skin_info.Fields.Item("info").Add("fit=true");
		  _skin_info.Fields.Item("info").Add("setcenter=false");
		  _skin_info.Fields.Item("info").Add("pan=true");
		  _skin_info.Fields.Item("info").Add("zoom=true");
		  _skin_info.Fields.Item("info").Add("spin=true");
      var _uuid = cortona.Skin;
      cortona.Skin = "{46BB95BF-8EB4-481A-A1EF-50D43FC32B9D}";
      cortona.Skin = _uuid;
	  }

    try{
    	on_set_vmunroll_skin(getElement("opt_unroll_navigation").checked);
    }catch(exception){}
    setTimeout("_after_simulation_loaded()", 0);

	}
	else {
	  alert("ERROR: Simulation not loaded");
	}
}

function _after_simulation_loaded(){
if(_vp_list.length>0)on_select_viewpoint(_vp_list[0]);
}

/*****************************
  IPC API event handlers
 *****************************/
var _last_over_object = null;

function _on_object_over(object) {
  cortona.Engine.AutoRefresh = false;
  if(_last_over_object != null) {
    on_object_highlight(_last_over_object.node.Name, false);
  }
  cortona.Engine.AutoRefresh = true;
  cortona.Engine.AutoRefresh = false;    
  if(object != null) {
    ipc.tooltipOver3D.setTooltipHTML(getPartName(object.node.Name));
    on_object_highlight(object.node.Name, true);
  }
  
  _last_over_object = object;
  cortona.Engine.AutoRefresh = true;
}

function _on_object_click(chain) {
  if(chain.length > 1)
    showPopupPartSelector(chain);
  else
  if(chain.length == 1)
    on_object_select(chain[0].node.Name, true);
}

function _on_reset() {
  _on_object_over(null);
}

function _on_change_centerpoint(point) {
  var e = cortona.Engine;
  
  var m = e.CameraPosition;
  var mr = e.CreatePosition(null);
  
  var vpo = new Rotation([m.Rotation.X, m.Rotation.Y, m.Rotation.Z, m.Rotation.Angle]);
  var vpp = new Vec3f([m.Translation.X, m.Translation.Y, m.Translation.Z]);
  var dst = new Vec3f(point);
  
  var n = vpo.multVec(new Vec3f(0,0,-1));
  var d = (dst.x * n.x + dst.y * n.y + dst.z * n.z - n.dot(vpp)) / n.length();
  
  vpp = vpo.multVec(new Vec3f(0,0,1)).multiply(d).add(dst);
  
  var a = api.get_viewpoint_data();
  var k = 0.828427;
  var bs = e.BBoxSize;
  var maxZoom = new Vec3f([bs.X, bs.Y, bs.Z]).length()/k;
  api.set_new_viewpoint([dst.x, dst.y, dst.z, vpp.x, vpp.y, vpp.z, vpo.x, vpo.y, vpo.z, vpo.angle, 0.001, maxZoom, a[12]]);
}

/******************************
  UI Handlers
 ******************************/  
function getElement(name) {
  var result = null;
  if(document.getElementById(name))
    result = document.getElementById(name);
  return result;
}

function getFrame(name) {
  if(name=="sum"){
	return window;
  }
  var result = null;
  try {
  	  if(isMSIE){
  	  	  result = frames(name);
  	  }else{
	  	  var frms = document.getElementsByTagName("iframe")
	  	  for(var i=0; i<frms.length; i++){
	  	  	  if(frms[i].id==name)return frms[i]
	  	  }
	  }
  }
  catch(exception) {}
  if(!result) {
  	return document;
  }
  return result;
}

function on_object_highlight(name, bFlag) {
	try{
	  var objectvm = new IPCVrmlNode(cortona.Engine.Nodes.Item(name));
	  if(bFlag)
	    objectvm.setEmissiveColor(0.5, 0.49, 0.4);
	  else
	    objectvm.setEmissiveColor(0, 0, 0);
  }catch(exception_node){
  	alert("Error with node: "+name+".\n"+exception_node.description);
  }

  try {
    var n = doc_all("par", "tprt_"+name).getElementsByTagName("td")[1];
    n.style.backgroundColor = bFlag ? "lemonchiffon" : "";
  }
  catch(exception){}
  
}

function on_object_flash(name, bFlag) {
  if(bFlag) {
    try {
      var n = doc_all("par", "tprt_"+name).getElementsByTagName("td")[1];
      //n.scrollIntoView();
      getFrame("par").window.scrollTo(0, n.offsetTop); 
    }
    catch(exception){}
  }
	try{    	
		if(!getElement("opt_flash_part_in_demo").checked){
			return;
		}
	}catch(e){}
  var c = new Number(getElement("opt_partsextrahighlighting_color").value);
  var r = (c & 255) / 255;
  var g = ((c / 256) & 255) / 255;
  var b = ((c / 65536) & 255) / 255;
  new IPCVrmlNode(cortona.Engine.Nodes.Item(name)).flash([r, g, b]);
  //on_object_highlight(name, false);
}

function on_object_locate(name, bScrollToItem) {
  hideMeta();
  cortona.Engine.AutoRefresh = false;
  on_object_flash(name, bScrollToItem);
  on_object_fit(name);
  cortona.Engine.AutoRefresh = true;
}

function on_object_locate_ex(name) {
  hideMeta();
  cortona.Engine.AutoRefresh = false;
  on_object_flash(name, true);
  if(!on_object_view(name))
    on_object_fit(name);
  cortona.Engine.AutoRefresh = true;
}

function on_object_fit(name) {
var a = new IPCVrmlNode(cortona.Engine.Nodes.Item(name)).getFitViewpointArray(3);
if(a)
  api.set_new_viewpoint(a);
}

function on_object_meta(vrmlref, parent) {
  showMeta(vrmlref, parent);
}

function on_object_view(name) {
  var result = false;
  var part = vte.parts.assoc[name];
  hideMeta();
  for(var key in part.metainfo.assoc) {
    var meta = part.metainfo.assoc[key];
    if(meta.type == 'viewpoint-value') {
      api.set_new_viewpoint(meta.value);
      result = true;
      break;
    }
  }
  return result;
}

function on_odf_procedure(){
	try{
		if(_odf_window!=null)_odf_window.close();
	}catch(e){}
	try{
		if(odfProcedureUrl.length>0){
			if(isMSIE){
				_odf_window = window.showModelessDialog(odfProcedureUrl, "", "dialogWidth:750px; dialogHeight:600px; resizable:Yes; help: No; scroll:yes; status:no;");
			}else{
				_odf_window = window.open(odfProcedureUrl,"","statusbar=no,resizable=yes,scrollbars=yes,width=750,height=600");
			}
		}
	}catch(e){}
}

function on_comments() {
  if(odfProcedureUrl!=""){
  	var syntax = doc_writeline("com", getSumItem("divcomments", "divcomments"));
    if(!isODFWindowVisible())
      _odf_window = open('about:blank', 'odf', 'location=no, fullscreen=no, menubar=no, toolbar=no, resizable=yes, scrollbars=yes, status=yes');
    var odfdoc = _odf_window[frmdoc];
    odfdoc.open();
    odfdoc.writeln(syntax);
    odfdoc.close();
    _odf_window[frmdoc].title = "Comments: " + vte.description;
    _odf_window.focus();
  }
}

function on_skip_animation() {
  api.vcr_pause();
  api.vcr_set_proc_fraction(1);
  _on_finish_animation();
}

function on_select_viewpoint(viewpoint) {
  if(viewpoint.value) {
    api.set_new_viewpoint(viewpoint.value);
  }
  else
  if(viewpoint.substep)
    if(api.state != api.PLAY) {
      api.set_procedure([].concat(viewpoint.substep), 0);
      api.vcr_set_proc_fraction(1);
    }
}

function on_alert(itemid) {
  if(itemid == "")
    return;
  var syntax = getSumItem(itemid, "");
  var w = 500;
  var h = 100;
  if(isMSIE){
  var _alert_body = _alert_window.document.body;
  _alert_body.innerHTML = '<table width="500px" border="0" cellspacing="0" cellpadding="8">'+syntax+'<tr><td align="right"><input type="button" value="'+resUI.get("UI_BTN_CLOSE")+'" onclick="parent.on_alert_ok()"></td></tr></table>';
  var x = 20;
  var y = 20;
  var parent = document.body;
  _alert_window.show( x, y, 0, 0, parent );

  var content = _alert_body.childNodes[0];
  var w = content.offsetWidth;
  var h = Math.min(content.offsetHeight, w);
  
  _alert_window.hide();
  var val = showModalDialog(resFolder+"alert.html", {res:resUI, "title":resUI.get("DLG_TITLE_ALERT"), "syntax":syntax , css:"alert.css", type:0}, "dialogWidth:"+(w+4)+"px; dialogHeight:"+(h+50)+"px; scroll:no; status:no; help:no;" );
  if(val==null){alert(resUI.get("MSG_ON_BLOCK_POPUP_WINDOW"));}
  }else{
  	store_message(syntax, 0, false, "", "")
  }
}


/******************************
  Stuff
 ******************************/

function getText(s) {
  getElement("div_dummy_text")[inrTxt] = s;
  return getElement("div_dummy_text").innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

var _vp_list = [];

function buildVPForm(viewpoints) {
  var syntax = "";
  _vp_list = [];
  if(vte.viewpoints != null)
    _vp_list = _vp_list.concat(vte.viewpoints.array);
  if(viewpoints != null)
    _vp_list = _vp_list.concat(viewpoints.array);
  elementDisplay('location_table', 'none');
  if(_vp_list.length > 0) {
    syntax += '<select size="1" style="width:100%;" onchange="on_select_viewpoint(_vp_list[this.value]);cortona.focus();" onclick="on_select_viewpoint(_vp_list[this.value])">';
    for(i=0; i<_vp_list.length; i++) {
      syntax +='<option value="'+i+'">'+getText(_vp_list[i].description);
    }
    syntax += '</select>';
    elementDisplay('location_table', 'inline');
  }
  getElement("vp").innerHTML = syntax;
}

function elementDisabled(name, flag){
  var n = getElement(name);
  if(n != null) {
    if(typeof(n.length) != 'undefined')
      for(var i=0; i<n.length; i++)
        n[i].disabled = flag;
    else
      n.disabled = flag;
  }
}

function elementDisplay(name, showmode){
  var n = getElement(name);
  if(n != null) {
    if(typeof(n.length) != 'undefined')
      for(var i=0; i<n.length; i++)
        n[i].style.display = showmode;
    else
      n.style.display = showmode;
  }
}

function elementClassName(name, classname){
  var n = getElement(name);
  if(n != null) {
    if(typeof(n.length) != 'undefined')
      for(var i=0; i<n.length; i++)
        n[i].className = classname;
    else
      n.className = classname;
  }
}

function loadODFStep(oStep) {
  doc_clear("doc");
  if(odfProcedureUrl=="" || (oStep.constructor == Step && oStep.odfId == null))
    return false;
  doc_writeline("doc", (typeof(oStep) == 'Step' && oStep.odfId) ? getSumItem(oStep.odfId, "divsteps"): getSumItem("divsteps", "divsteps"));
  return true;
}

function getSumItem(name, bodyname){
	var syntax = "";
	var element = document.getElementById(name);
	if(element){
		if(bodyname==""){
			if(isMSIE){
				syntax = element.outerHTML;
			}else{
				syntax = '<'+element.tagName+' id="'+element.id+'" class="'+element.className+'">'+element.innerHTML+'</'+element.tagName+'>'
			}
		}else{
			syntax = '<html><head><style>'+getSumStyle()+'</style></head><body oncontextmenu="return false;" onselectstart="return false;" id="'+bodyname+'">';
			if(name!=bodyname){
				if(isMSIE){
					syntax +=element.outerHTML;
				}else{
					syntax += '<'+element.tagName+' id="'+element.id+'" class="'+element.className+'">'+element.innerHTML+'</'+element.tagName+'>'
				}
			}else{
				syntax +=element.innerHTML;
			}
			syntax +='</body></html>';
		}
	}else{
		var emptyDiv = '<div id="'+name+'" style="display:none;"></div>';
		syntax = (bodyname=="")? emptyDiv: '<html><head></head><body>'+emptyDiv+'</body></html>';
	}	
	return syntax;	
}

function getSumStyle(){
	return document.getElementById("docstyle").innerHTML;
}

var _highlighted_odf_step = null;

function showODFStep(oStep) {
  var n = doc_all("doc", _highlighted_odf_step);
  if(n != null)
    n.style.border = "";
    
  if(oStep != null) {
    var id = (oStep.constructor == Step) ? oStep.odfId : oStep;
    if(id != null) {
      _highlighted_odf_step = id;
      var n = doc_all("doc", _highlighted_odf_step);
      if(n != null) {
        n.style.border = "red 1px solid";
        n.scrollIntoView();
        return true;
      }
    }
  }
  
  return false;
}

function loadStepComment(oStep) {
  doc_clear("com");
  if(oStep){
   	doc_writeline("com", getSumItem("cmmnt_"+oStep.id, "divcomments"));
  }
}

var _highlighted_odf_item = null;

function showODFItem(oOperation) {
  var n = doc_all("doc", _highlighted_odf_item);
  if(n != null)
  {
    if(typeof(n.length) == 'undefined')
      n.style.backgroundColor = "";
    else
    {
      for(var i=0; i<n.length; i++)
        n[i].style.backgroundColor = "";
    }
  }

  if(oOperation != null) {
    var id = (oOperation.constructor == Operation) ? oOperation.odfId : oOperation;
    if(id != null) {
      _highlighted_odf_item = id;
      var n = doc_all("doc", _highlighted_odf_item);
      if(n != null) {
        if(typeof(n.length) == 'undefined')
          n.style.backgroundColor = "#FFFF80";
        else
        {
          for(var i=0; i<n.length; i++)
            n[i].style.backgroundColor = "#FFFF80";
        }
        return true;
      }
    }
  }
  
  return false;
}

var log_content = "";

function doc_clear(iframe_name) {
	var iframe = getFrame(iframe_name);
	iframe[frmdoc].open();
	iframe[frmdoc].writeln('<html><head><style>body {font-family:tahoma, sans-serif; color:black; background-color:#FFFFFF; font-size:10pt;} td {font-size:10pt;} th {font-size:11pt; text-align:left;} .doctable {} </style></head><body></body></html>');
	iframe[frmdoc].close();
	if(iframe_name=="log")log_content = "";
}

function doc_writeline(iframe_name, s) {
  var iframe = getFrame(iframe_name);
  iframe[frmdoc].open();
  if(s != ''){
  	 var content = '<html><head><style>body {font-family:tahoma, sans-serif; color:black; background-color:#FFFFFF; font-size:10pt;} td {font-size:10pt;} th {font-size:11pt; text-align:left;} .doctable {} </style></head><body>';
  	if(iframe_name=="log"){
  		content += log_content;
  		log_content += s;
	}
    content += s;
    content += '</body></html>';
    iframe[frmdoc].writeln(content);
  }
  iframe[frmdoc].close();
  try {
    if(iframe[frmdoc].body.lastChild.nodeType == 1)
      iframe[frmdoc].body.lastChild.scrollIntoView(false);
  } catch(exception) {}
}

function doc_all(iframe_name, name) {
  if(name==null || name=="")return null;
  var iframe = getFrame(iframe_name);
  return iframe[frmdoc].getElementById(name);
}

function getTime() {
  return new Date().toUTCString();
}

function getPartName(sVrmlNodeDef) {
  var result = sVrmlNodeDef;
  try {
    var part = vte.parts.assoc[sVrmlNodeDef];
    result = part.name;
    if(!result)
      if(typeof(part.metainfo.assoc.name) != 'undefined')
        result = part.metainfo.assoc.name;
  } catch(exception) {}
  return result;  
}

function setProcedureTitle(s) {
  getElement("title").innerHTML = s;
}

function isODFWindowVisible() {
  var result = false;
  try {
    result = (_odf_window != null && !_odf_window.closed);
  } catch(exception) {}
  return result;
}

function _recalculate_max_zoom(kmax) {
  var e = cortona.Engine;
  api.set_ui_axis(false);
  e.Refresh();
  e.Refresh();
  var bb = e.BBoxSize;
  api.set_ui_axis(true);
  var k = 0.828427; // 2*Math.tan(0.785398/2)
  return( Math.sqrt(bb.X*bb.X+bb.Y*bb.Y+bb.Z*bb.Z)*kmax/k );
}

var _max_zoom = null;

function recalculateZoomLimits() {
  try {
    cortona.Engine.AutoRefresh=false;
    var maxZoom = _recalculate_max_zoom(1.5);
    if(maxZoom != _max_zoom) {
      _skin_info.Fields.Item("info").SetValue(0, "limits=" + (maxZoom/200) + "," + maxZoom);
      _max_zoom = maxZoom;
      cortona.Engine.AutoRefresh=true;
    }
  } catch(exception) {}
}

function cortona_trace(s) {
  cortona.trace(s + '\r\n');
}

function translateVariables(text) {
  var result = '';
  var a = text.split('%');
  while(a.length > 0) {
    result += a.shift();
    while(a.length > 0 && typeof(vte.variables[a[0]]) == 'undefined')
      result += '%' + a.shift();
    if(a.length > 0)
      result += vte.variables[a.shift()].value;
  }
  return result;
}


var _alert_window = null;

function showAlert(activity) {
  if(activity.odfId) {
    _alert_activity = activity;
    if(document.getElementById(activity.odfId)){
    	on_alert(activity.odfId);
    }else{
    	on_alert(activity.id);
    }
    on_alert_ok();
  }
}

function showMsgBox(title, syntax, confirmType, onTrue, onFalse) {
var w = 500;
var h = 100;
if(isMSIE){
  var _alert_body = _alert_window.document.body;
  _alert_body.innerHTML = '<table width="500px" border="0" cellspacing="0" cellpadding="8">'+syntax+'<tr><td align="right"><input type="button" value="'+resUI.get("UI_BTN_CLOSE")+'" onclick="parent.on_alert_ok()"></td></tr></table>';
  
  var x = 20;
  var y = 20;
  var parent = document.body;
  _alert_window.show( x, y, 0, 0, parent );

  var content = _alert_body.childNodes[0];
  w = content.offsetWidth;
  h = content.offsetHeight;
  
  _alert_window.hide();
  var val = showModalDialog(resFolder+"alert.html", {res:resUI, "title":title, "syntax":syntax , css:"msgbox.css", type:confirmType}, "dialogWidth:"+(w+4)+"px; dialogHeight:"+(h+50)+"px; scroll:no; status:no; help:no;" );
  if(val==null){
  	alert(resUI.get("MSG_ON_BLOCK_POPUP_WINDOW"));
  	val = true;
  }
  return val;
}else{
store_message(syntax, confirmType, true, onTrue, onFalse)
return false;
}
}

function store_message(syntax, confirmType, isMsg, onTrue, onFalse){
	if(!isMsg){
		on_vcr_pause();
		isContinue=true;
	}
	msgParams.push({sntx:syntax, type:confirmType, msgflag:isMsg, trueCode:onTrue, falseCode:onFalse});
	if(msgParams.length==1)open_message_frame(syntax, confirmType, isMsg);
}
function open_message_frame(syntax, confirmType, isMsg){
	var cnt = document.getElementById("message_container");
	cnt.style.display = "";
	if(cortona)cortona.style.visibility = "hidden";
		
	var winH = document.body.clientHeight;
	var winW = document.body.clientWidth;
	var wH = 150;
	var wW = 500;
	var X = (winW-wW)/2;
	var Y = (winH-wH)/2-30;
	var div = document.getElementById("msgContentDiv");
	div.style.height=wH+"px";
	div.style.width=wW+"px";
	div.style.left=X+"px";
	div.style.top=Y+"px";
	div.className = (isMsg)?"msgDiv" : "alertDiv";
	var iH = wH-2*10-30;
	
	var btns;
	if(confirmType==0){
    	btns='<input id="msgbtn1" type="button" class="btnMsg" value="'+resUI.get("UI_BTN_CLOSE")+'" onclick="parent.close_message_box(true)">';
    }else if(confirmType==1){
    	btns='<input id="msgbtn1" type="button" class="btnMsg" value="'+resUI.get("UI_BTN_YES")+'" onclick="parent.close_message_box(true)">&nbsp;<input type="button" class="btnMsg" value="'+resUI.get("UI_BTN_NO")+'" onclick="parent.close_message_box(false)">';
    }else{
    	btns='<input id="msgbtn1" type="button" class="btnMsg" value="'+resUI.get("UI_BTN_OK")+'" onclick="parent.close_message_box(true)">&nbsp;<input type="button" value="'+resUI.get("UI_BTN_CANCEL")+'" onclick="parent.close_message_box(false)">';
    }
    
    div.innerHTML = '<div style="margin:10px; height:'+iH+'px;overflow-y:auto;"><table id="msgCTbl" width="100%" border="0" cellspacing="0" cellpadding="8">'+syntax+'</table></div><div style="width:100%;position:absolute;bottom:0px;left:0px;text-align:right;"><div style="margin-right:10px; margin-bottom:10px;">'+btns+'</div></div>';
    if(document.getElementById("msgbtn1"))document.getElementById("msgbtn1").focus();
}
function close_message_box(returnValue){
	if(returnValue && msgParams[0].trueCode.length>0){
		eval(msgParams[0].trueCode);
	}else if(!returnValue && msgParams[0].falseCode.length>0){
		eval(msgParams[0].falseCode);
	}
	if(msgParams.length>1){
		msgParams = msgParams.slice(1);
		open_message_frame(msgParams[0].sntx, msgParams[0].type, msgParams[0].msgflag);
	}else{
		msgParams=[];
		var cnt = document.getElementById("message_container");
		cnt.style.display = "none";
		var div = document.getElementById("msgContentDiv");
		div.innerHTML = "";
		if(cortona)cortona.style.visibility = "";
		if(isContinue){
			isContinue=false;
			on_vcr_play();
		}
	}
}

var isMetaActive = false;
function showMeta(vrmlref, parent) {
  var part = vte.parts.assoc[vrmlref];

  var syntax = '<div class="meta_container" style="'+((isMSIE)? "width": "min-width")+':300px;"><table width="100%" border=0 cellspacing=3 cellpadding=3>';
  syntax += '<tr><th align=left colspan=2>'+getPartName(vrmlref)+'</th></tr>';
  var rea = /(\w+):\/{2,}([^/:]+)(:\d*)?([\w%\-/&amp;;\?\+\.=#]*)/;
  for(var key in part.metainfo.assoc) {
    var meta = part.metainfo.assoc[key];
    if(meta.type != 'viewpoint-value' && key.charAt(0) != '$') {
      syntax += '<tr><td>'+getText(key).replace(/ /g, '&nbsp;')+'</td><td width="100%">';
      syntax += (meta.type == 'xref' /*&& rea.test(meta)*/) ? '<a href="#" onclick="on_xref(\''+(meta)+'\')">'+getText(meta)+'</a>' : getText(meta);
      syntax += '</td></tr>';
    }
  }
  syntax += '<tr><td colspan=2 style="background-color:transparent; text-align:center;"><input type="button" class="button" value="'+resUI.get("UI_BTN_CLOSE")+'" onclick="hideMeta();"></td></tr>';
  syntax += '</table></div>';
	function getPosition(element){var left = element.offsetLeft; var top = element.offsetTop; for (var parent = element.offsetParent; parent; parent = parent.offsetParent){left += parent.offsetLeft; top += parent.offsetTop;}return {left: left, top: top};}
	var meta_div = document.getElementById("meta_container");
	var coordElement = document.getElementById("tab_container");
	meta_div.style.width="";
	meta_div.style.height="";
	meta_div.innerHTML=syntax;
	var wW=Math.min(meta_div.clientWidth, coordElement.offsetWidth-15)+5;
	var wH=Math.min(meta_div.clientHeight, coordElement.offsetHeight)+5;
	var pos = getPosition(coordElement);
	meta_div.style.left=(pos.left+5+Math.round(10*Math.random()))+"px";
	meta_div.style.top=Math.round(pos.top+(coordElement.clientHeight-meta_div.clientHeight)/2+3*Math.random())+"px";
	meta_div.innerHTML = '<IFRAME id="ifr_meta_frame" style="Z-INDEX: 1001; VISIBILITY: visible; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; LEFT: 0; TOP: 0;" src="about:blank" frameSpacing="0" frameBorder="no" scrolling="no"></IFRAME><DIV id="innerDiv_meta_info" style="DISPLAY: block; Z-INDEX: 1002; LEFT: 0px; TOP: 0px; VISIBILITY: visible; OVERFLOW: auto; WIDTH: '+wW+'px; HEIGHT: '+wH+'px; POSITION: absolute; border:0;">'+meta_div.innerHTML+'</DIV>';
	isMetaActive = true;
}

function hideMeta(){
	if(isMetaActive){
		isMetaActive = false;
		var meta_div = document.getElementById("meta_container");
		meta_div.innerHTML = "";
		meta_div.style.left="0";
		meta_div.style.top="0";
		meta_div.style.width="0";
		meta_div.style.height="0";
	}
}

var _last_chain_for_cmenu = null;
function showPopupPartSelector(chain) {
  clearTimeout(_tooltip_timeout);
  ipc.tooltipOver3D.hide();
  _last_chain_for_cmenu = chain;
  setTimeout("showPopupPartSelector0();", 0);
}
function showPopupPartSelector0() {
	if(_last_chain_for_cmenu!=null)cMenu.show(_down_x, _down_y, cortona, _last_chain_for_cmenu);
	_last_chain_for_cmenu=null;
}

var _xref_window = null;

function on_xref(href) {
  _xref_window =  open(href, 'xref', 'location=yes, fullscreen=no, menubar=yes, toolbar=yes, resizable=yes, scrollbars=yes, status=yes');
  _xref_window.focus();
}

function isXREFWindowVisible() {
  var result = false;
  try {
    result = (_xref_window != null && !_xref_window.closed);
  } catch(exception) {}
  return result;
}

function showStatus(s) {
  getElement("status_text")[inrTxt] = s;
}

function parseCmdLine() {
  var cmdline = AppID.commandLine.split('"');
  var args = [];
  for(var i=1; i<cmdline.length; i+=2)
    args.push(cmdline[i]);
  return args;
}

function setVariablesFromSet(vte, variables_set) {
  for(var key in variables_set)
    vte.variables[key].setValue(variables_set[key]);
}

function _copier_field(name) {
  var e = cortona.Engine;
  var copier;
  try {
    copier = e.Nodes.Item('COPIER');
  }
  catch(exception) {
  	copier = e.CreateVrmlFromString(COPIER_SYNTAX).GetValue(0);
  	e.RootNodes.Add(copier);
  }
  try {
    copier.Fields.Item(name).Value = true;
  }
  catch(exception) {}
}

function validatePartsExtraHighlightingColor() {
  var c = new Number(getElement("opt_partsextrahighlighting_color").value);
  var r = c & 255;
  var g = (c / 256) & 255;
  var b = (c / 65536) & 255;
  var _ = function(x) { var r = x.toString(16); if(x < 16) r = "0"+r; return r; }
  var color = '#'+_(r)+_(g)+_(b);
  getElement("opt_partsextrahighlighting_color").style.backgroundColor = color;
}

function validatePartsList() {
  try {
    cortona.Engine.AutoRefresh=false;
    for(var vrmlref in vte.parts.assoc) {
      var objectvm = new IPCVrmlNode(cortona.Engine.Nodes.Item(vrmlref));
      var isVisible = objectvm.isVisible();
      doc_all("par", "tprt_"+vrmlref).style.display = isVisible ? "" : "none";
      doc_all("par", "tprt_"+vrmlref+"_disabled").style.display = isVisible ? "none" : "";
    }
    cortona.Engine.AutoRefresh=true;
  }
  catch(exception){}
}

function on_set_vmunroll_skin(flag){
	var _vmunroll = "{0650E9E3-1999-45C1-A24F-50BBE472326B}";
	var _vmroll = "{75B359F4-C1D2-4E21-BC36-F699BD1792BA}";
	if(cortona != null){
		cortona.Skin=(flag)?_vmunroll:_vmroll;
	}
}
