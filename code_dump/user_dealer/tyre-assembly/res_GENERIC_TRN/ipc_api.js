/*
  ipcapi.js 
  13:48 12.11.2010
 */

var _tooltip_timeout, _last_x, _last_y, _last_button, _down_x, _down_y;


var _ipcApi = null;

function IpcAPI(cortona, tooltip) {
// variables
  this.MOUSE_MOVE_SENSITIVITY = 3;
  this.TOOLTIP_DELAY = 500;
  this.ENABLE_TOOLTIPS = true;
  this.FLASH_PROTO_SYNTAX = "PROTO _Flash [ exposedField SFColor diffuseColor .8 .31 0 exposedField SFVec3f translation 0 0 0 exposedField SFTime startTime 1 exposedField SFTime stopTime 0 exposedField SFTime cycleInterval 3 exposedField SFTime flashInterval 0.5 exposedField SFFloat radius 0 exposedField SFNode holder NULL exposedField SFNode object NULL exposedField SFNode self NULL ] { PROTO _ [ exposedField SFFloat radius 0 exposedField SFNode holder NULL exposedField SFNode object NULL exposedField SFNode self NULL ] { Group{} } Group { children [ DEF TSINT TimeSensor { startTime IS startTime stopTime IS stopTime cycleInterval IS cycleInterval loop FALSE } DEF TS TimeSensor { startTime IS startTime cycleInterval IS flashInterval loop TRUE enabled FALSE ROUTE TSINT.isActive TO TS.enabled } DEF SI PositionInterpolator { key [ 0, 0.5, 1 ] keyValue [ 0 0 0, 1 1 1, 0 0 0 ] } DEF CI ColorInterpolator { key [ 0, 0.5, 1 ] keyValue [ 0 0 0, 1 1 0, 0 0 0 ] } DEF SPHERE Transform { translation IS translation scale 0 0 0 children [ Shape { geometry Sphere {radius 1} appearance Appearance { material Material { diffuseColor IS diffuseColor specularColor .5 .5 .5 emissiveColor .1 .1 .1 ambientIntensity 0 transparency .353 } } } ] } DEF S Script { field SFNode face _ { radius IS radius holder IS holder object IS object self IS self } field SFNode ci USE CI field SFNode si USE SI field SFNode tsint USE TSINT field SFNode sphere USE SPHERE field SFBool isExtrusion FALSE eventIn SFFloat set_fraction eventIn SFBool isActive ROUTE TS.fraction_changed TO S.set_fraction ROUTE TSINT.isActive TO S.isActive url\"javascript: function initialize() { if(!face.object.appearance) face.object.appearance = new SFNode('Appearance{}'); if(!face.object.appearance.material) face.object.appearance.material = new SFNode('Material{}'); ci.keyValue[0] = face.object.appearance.material.emissiveColor; ci.keyValue[2] = face.object.appearance.material.emissiveColor; Browser.addRoute(ci, 'value_changed', face.object.appearance.material, 'emissiveColor'); _addRouteToChildren(face.object.children); } function _addRouteToChildren(ch) { for(var i=0; i<ch.length; i++) { var type = ch[i].getType(); if(type == 'ObjectVM') { if(!ch[i].appearance) ch[i].appearance = new SFNode('Appearance{}'); if(!ch[i].appearance.material) ch[i].appearance.material = new SFNode('Material{}'); Browser.addRoute(ci, 'value_changed', ch[i].appearance.material, 'emissiveColor'); _addRouteToChildren(ch[i].children) } } } function isActive(value) { if(!value) { ci.set_fraction = 1; if(!isExtrusion) si.set_fraction = 1; face.holder.removeChildren = new MFNode(face.self); } else { var r = face.radius * 2/3; si.keyValue[1] = new SFVec3f(r, r, r); } } function set_fraction(value) { if(tsint.isActive) { if(!isExtrusion) si.set_fraction = value; ci.set_fraction = value; } } \" } ] } ROUTE SI.value_changed TO SPHERE.scale }";

// properties
  this.tooltipOver3D = (arguments.length > 1 && tooltip!=null)? new TooltipOver3D(tooltip) : new TooltipIn3D();
  this.cortona = cortona;
  this._lastOverObject = null;
  this._skipNodes = new Array();
  this._partNodes = null; // assoc array of strings (key is vrml def names) or null
  
  this.is_loaded = false;
  this.is_enabled = false;

  _ipcApi = this;
  
  this._flash_holder = null;
  this._flash_proto = null;
  
  this.reset();
  
  this.cortona_on_scene_loaded = IpcAPI_cortona_on_scene_loaded;
  this.cortona_on_scene_unloaded = IpcAPI_cortona_on_scene_unloaded;
  this.cortona_mouse_down = IpcAPI_cortona_mouse_down;
  this.cortona_mouse_move = IpcAPI_cortona_mouse_move;
  this.cortona_mouse_up = IpcAPI_cortona_mouse_up;
  this.cortona_mouse_out = IpcAPI_cortona_mouse_out;
}

// methods
//IPCApi.prototype.initialize = IPCApi_initialize;
IpcAPI.prototype.reset = IPCApi_reset;
IpcAPI.prototype.enable = IPCApi_enable;

IpcAPI.prototype._skipAndPick = IPCApi__skipAndPick;
IpcAPI.prototype._onOver = IPCApi__onOver;
IpcAPI.prototype._onClick = IPCApi__onClick;

IpcAPI.prototype.setCenterpoint = IPCApi_setCenterpoint;
IpcAPI.prototype.setPartNodes = IPCApi_setPartNodes;
IpcAPI.prototype.setSkipNodes = IPCApi_setSkipNodes;

function IPCApi_setPartNodes(partNodes) {
  this._partNodes = partNodes;
}

function IPCApi_setSkipNodes(skipNodes) {
  this._skipNodes = skipNodes;
}

/*
function IPCApi_initialize() {
  _ipcApi = this;
  this.reset();
}
*/

function IPCApi_enable(bFlag) {
  this.is_enabled = bFlag;
}

function IPCApi_reset() {
  try {
    clearTimeout(_tooltip_timeout);
    this.tooltipOver3D.hide();
    this.tooltipOver3D.setXY(0, 0);
  } 
  catch(exception) {}
  
  _last_x = 0;
  _last_y = 0;
  _last_button = -1;

  _tooltip_timeout = null;

  safe_call_method_void(this, 'on_reset');
}  

function IPCApi__onOver(chain) {
  if(this.is_enabled) {
    this.cortona.Engine.AutoRefresh = false;
    var part = _getPartVrmlNode(_getVrmlNodeArray(chain));
    if(part != this._lastOverObject) {
      safe_call_method_1par(this, "on_part_over", (part != null) ? new IPCVrmlNode(part) : null);
      this._lastOverObject = part;
  
      clearTimeout(_tooltip_timeout);
      this.tooltipOver3D.hide();
  
      if(part != null) {
        if(this.ENABLE_TOOLTIPS)
          _tooltip_timeout = setTimeout('_ipcApi.tooltipOver3D.show()', this.TOOLTIP_DELAY);
      }
    }
    this.cortona.Engine.AutoRefresh = true;
  }
}

function IPCApi__onClick(chain, button, shift) {
  if(this.is_enabled) {
    this.cortona.Engine.AutoRefresh = false;
    var n = _getVrmlNodeArray(chain);
    if(button == 1 && shift == 0) {
      var parts = _getIPCVrmlNodesChain(n);
      if(parts && parts.length > 0)
        safe_call_method_1par(this, "on_part_click", parts);
    }
    if(button & 4 || ((button & 1) && (shift & 4))) {
    	var pp = this.cortona.Engine.PickedPoint;
    	safe_call_method_1par(this, "on_change_centerpoint", [pp.X, pp.Y, pp.Z]);
    }
    this.cortona.Engine.AutoRefresh = true;
  }
}

function IPCApi_setCenterpoint(point) {
    var e = this.cortona.Engine;
    var f = e.CreateField('MFFloat');
    for(var i=0; i<3; i++)
      f.Add(e.NavigationInfo("avatarSize").GetValue(i));
    for(var i=0; i<3; i++)
      f.Add(point[i]);
    e.NavigationInfo("avatarSize").Assign(f);
    var m = e.CameraPosition;
    
    var mr = e.CreatePosition(null);
    mr.Rotation = m.Rotation;

    var f = _createFieldFromArray("SFVec3f", new Array(0,0,-1));
    var n = mr.MultMatrixVec(f);
    var vpp = m.Translation;
    var zoom = (point[0] * n.X + point[1] * n.Y + point[2] * n.Z - n.X * vpp.X - n.Y * vpp.Y - n.Z * vpp.Z) / Math.sqrt(n.X * n.X + n.Y * n.Y + n.Z * n.Z);
    
    var f = _createFieldFromArray("SFVec3f", point);

    var mc = e.CreatePosition(null);
  	mc.Translation = f;
  	
    _assignValueFromArray(f, new Array(0, 0, zoom));
    var pos = mc.MultVecMatrix(mr.Inverse().MultMatrixVec(f));
    m.Translation = pos;
    
    var f = e.CreateField('MFFloat');
    for(var i=0; i<3; i++)
      f.Add(e.NavigationInfo("avatarSize").GetValue(i));
    for(var i=0; i<3; i++)
      f.Add(point[i]);
    e.NavigationInfo("avatarSize").Assign(f);
    
  e.CameraPosition = m;
}

function IPCApi__skipAndPick(X, Y) {
  var e = this.cortona.Engine;
  this._skipNodes.mapv(new Function('n', '_ipcApi.cortona.Engine.AddSkipNode(n);'));
  //e.AddSkipNode(this.root_switch);
  var chain = e.Pick(X, Y);
  e.ClearSkipNodes();
  return chain;
}

// events
/**
on_part_over(oPart)
on_part_click(oPart)
on_reset()
on_simulation_load(bSuccess)
on_simulation_unload()
on_start_substep(sProcedure, sStep, sSubstep)
on_vcr_state(nState)
on_proc_fraction_changed(fFractionValue)
on_zoom_changed(fZoomValue)
*/

 
/*
 * Object IPCVrmlNode
 */
 
function IPCVrmlNode(node) {
  this.node = node;
}
IPCVrmlNode.prototype.isEqual = IPCVrmlNode_isEqual;
IPCVrmlNode.prototype.getBBox = IPCVrmlNode_getBBox;
IPCVrmlNode.prototype.getFitViewpointArray = IPCVrmlNode_getFitViewpointArray;
IPCVrmlNode.prototype.setEmissiveColor = IPCVrmlNode_setEmissiveColor;
IPCVrmlNode.prototype.setDiffuseColor = IPCVrmlNode_setDiffuseColor;
IPCVrmlNode.prototype.show = IPCVrmlNode_show;
IPCVrmlNode.prototype.setTransparency = IPCVrmlNode_setTransparency;
IPCVrmlNode.prototype.flash = IPCVrmlNode_flash;
IPCVrmlNode.prototype.isVisible = IPCVrmlNode_isVisible;

function IPCVrmlNode_isEqual(oVrmlNode) {
  var ret = false;
  try {
    ret = ((oVrmlNode.constructor == IPCVrmlNode) && (oVrmlNode.node == this.node || (this.node.Name!="" && oVrmlNode.node.Name == this.node.Name)));
  }
  catch(exception) {}
  return ret;
}

function IPCVrmlNode_getBBox() {
  var bc = this.node.BBoxCenter;
  var bs = this.node.BBoxSize;
  var bb = [bc.X, bc.Y, bc.Z, bs.X, bs.Y, bs.Z];;
  
  var e = _ipcApi.cortona.Engine;
  var m = e.CreatePosition(null);
  
  var p1 = _createFieldFromArray("SFVec3f", new Array((bb[0] - bb[3]/2), (bb[1] - bb[4]/2), (bb[2] - bb[5]/2)));
  var p2 = _createFieldFromArray("SFVec3f", new Array((bb[0] + bb[3]/2), (bb[1] + bb[4]/2), (bb[2] + bb[5]/2)));
  
  try {
    for(var n = this.node.Fields.Item("parent").Value; n != null; n = n.Fields.Item("parent").Value) {
      m.SetTransform(n);
      p1 = m.MultVecMatrix(p1);
      p2 = m.MultVecMatrix(p2);
    }
  }
  catch(exception) {}
  bb = new Array((p1.X + p2.X)/2, (p1.Y + p2.Y)/2, (p1.Z + p2.Z)/2, p2.X - p1.X, p2.Y - p1.Y, p2.Z - p1.Z);
  return bb;
}

function IPCVrmlNode_getFitViewpointArray() {
  var result = null;
  
  var fZoomK = arguments.length > 0 ? arguments[0] : 1.2;
  
  var e = _ipcApi.cortona.Engine;
  var bb = this.getBBox();
  if(bb[3]!=0 && bb[4]!=0 && bb[5]!=0 && !bb.map(function _ (n) {return n == 0;}).and()) {
  
    var k = 0.828427; // 2*Math.tan(0.785398/2)
    var bb_diagonal = new Vec3f(bb.slice(3)).length();
  	var zoom = bb_diagonal * fZoomK/k;
  	
    var e = cortona.Engine;
    var m = e.CameraPosition;
    
    var ori = m.Rotation;
    
    var mr = e.CreatePosition(null);
    mr.Rotation = m.Rotation;
    var mc = e.CreatePosition(null);
  	mc.Translation = _createFieldFromArray("SFVec3f", bb);;
  	
  	var f = _createFieldFromArray("SFVec3f", new Array(0, 0, zoom));
    var pos = mc.MultVecMatrix(mr.Inverse().MultMatrixVec(f));
  
  	var minZoom = Math.min(zoom, bb_diagonal * 0.5/k);
  	var bs = e.BBoxSize;
  	var maxZoom = Math.max(zoom, new Vec3f([bs.X, bs.Y, bs.Z]).length()/k);
  	result = new Array(bb[0],bb[1],bb[2], pos.X,pos.Y,pos.Z, ori.X,ori.Y,ori.Z,ori.Angle, minZoom,maxZoom, 0);
  }
	return result;
}

function IPCVrmlNode_setEmissiveColor(fRed, fGreen, fBlue) {
  try {
    _assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("emissiveColor"), arguments);
  } catch(exception) {}
  try {
  var children = this.node.Fields.Item("children");
    for(var i=0; i<children.Count; i++) {
      var type = children.GetValue(i).TypeName;
      if(type == "ObjectVM" || type == "PartVTE")
        new IPCVrmlNode(children.GetValue(i), "").setEmissiveColor(fRed, fGreen, fBlue);
    }
  } catch(exception) {}
}

function IPCVrmlNode_setDiffuseColor(fRed, fGreen, fBlue) {
  _assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("diffuseColor"), arguments);
}

function IPCVrmlNode_setTransparency(fValue) {
  _assignValueFromArray(this.node.Fields.Item("appearance").Value.Fields.Item("material").Value.Fields.Item("transparency"), arguments);
}

function IPCVrmlNode_show(bShow) {
  this.node.Fields.Item("whichChoice").Value = bool_to_switch(bShow);
}

function IPCVrmlNode_isVisible() {
  var result = true;
  var p = this.node;
  while(p && result) {
    result = result && (p.Fields.Item("whichChoice").Value != -1);
    try { p = p.Fields.Item("parent").Value; }
    catch(exception) { p = null; }
  }
  return result;
}

function IPCVrmlNode_flash() {
  var e = _ipcApi.cortona.Engine;
  var ch = _ipcApi._flash_holder.Fields.Item("children");
  for(var i=0; i<ch.Count; i++)
    if(ch.GetValue(i).Fields.Item("object").Value === this.node || (this.node.Name!="" && ch.GetValue(i).Fields.Item("object").Value.Name == this.node.Name)) {
      ch.GetValue(i).Fields.Item("startTime").Value = e.TimeStamp;
      return;
    }
  var n = _ipcApi._flash_proto.CreateInstance();
  n.Fields.Item("self").Value = n;
  n.Fields.Item("object").Value = this.node;
  n.Fields.Item("holder").Value = _ipcApi._flash_holder;
  var bb = this.getBBox();
  n.Fields.Item("radius").Value = new Vec3f(bb.slice(3)).length();
  n.Fields.Item("translation").Assign(_createFieldFromArray("SFVec3f", bb));
  if(arguments.length > 0)
    n.Fields.Item("diffuseColor").Assign(_createFieldFromArray("SFColor", arguments[0]));
  n.Fields.Item("startTime").Value = e.TimeStamp;
  ch.Add(n);
}

/* 
 * Cortona automation event handlers 
 */

function IpcAPI_cortona_on_scene_loaded(success) {
  this.is_loaded = success;
  var e = _ipcApi.cortona.Engine;
  this._flash_proto = e.CreateProtoFromString(this.FLASH_PROTO_SYNTAX);
  e.Protos.Add(this._flash_proto);
  this._flash_holder = e.CreateNodeFromString('Group {}');
  e.RootNodes.Add(this._flash_holder);
}

function IpcAPI_cortona_on_scene_unloaded() {
  this.is_loaded = false;
  this._flash_holder = null;
  this._flash_proto = null;
}

function IpcAPI_cortona_mouse_down(Button, Shift, X, Y) {
  if(!_ipcApi.is_loaded) return;
  _last_button = Button;
  _down_x = X;
  _down_y = Y;
  _ipcApi.tooltipOver3D.hide();
  _ipcApi.tooltipOver3D.setXY(0, 0);
} 

function IpcAPI_cortona_mouse_move(Button, Shift, X, Y) {
  if(!_ipcApi.is_loaded) return;
  if((Button == 0) && vec2_len(X, Y, _last_x, _last_y) > _ipcApi.MOUSE_MOVE_SENSITIVITY) {
    _last_x = X;
    _last_y = Y;
    _ipcApi.tooltipOver3D.setXY(X, Y);
    _ipcApi._onOver(_ipcApi._skipAndPick(X, Y));
  }
} 

function IpcAPI_cortona_mouse_up(Button, Shift, X, Y) {
  if(!_ipcApi.is_loaded) return;
  if(vec2_len(X, Y, _down_x, _down_y) < _ipcApi.MOUSE_MOVE_SENSITIVITY) {
    _ipcApi._onClick(_ipcApi._skipAndPick(X, Y), _last_button, Shift);
  }
} 

function IpcAPI_cortona_mouse_out() {
  if(!_ipcApi.is_loaded) return;
  _ipcApi.reset();
} 


/*
 * tip3dcontrol.js 24.05.2004 12:36
 */

function TooltipOver3D(tooltip) {
  this.tooltip = tooltip;
  this.tooltip.style.display = "none";
  
  this.tooltipHTML = "";
  
  this.tooltipWin = window.createPopup();
  
  this.TOOLTIP_DX = 15;
  this.TOOLTIP_DY = 20;
  
  var pp_win_body = this.tooltipWin.document.body;
  pp_win_body.style.backgroundColor = "#FFFFDD";
  pp_win_body.style.border          = "black solid 1px";
  pp_win_body.style.padding         = "3px 3px 3px 3px";
  pp_win_body.style.fontSize        = "13px";
  pp_win_body.style.fontFamily      = "tahoma, sans-serif";
  pp_win_body.style.textAlign       = "center";
}

TooltipOver3D.prototype.setTooltipHTML = TooltipOver3D_setTooltipHTML;
TooltipOver3D.prototype.setXY = TooltipOver3D_setXY;
TooltipOver3D.prototype.show = TooltipOver3D_show;
TooltipOver3D.prototype.hide = TooltipOver3D_hide;


function TooltipOver3D_show() {
  if(this.tooltipHTML != "") {
    this.tooltip.style.display = "inline";
    this.tooltip.innerHTML = this.tooltipHTML;
    
    var w = cortona.offsetWidth;
    var h = cortona.offsetHeight;
    
    var dx = this.tooltip.offsetWidth;
    var dy = this.tooltip.offsetHeight;
    this.tooltip.style.display = "none";
    
    var x = this.x + this.TOOLTIP_DX;
    var y = this.y + this.TOOLTIP_DY;
    
    if(x+dx > w)  x = w - dx;
    if(y+dy > h)  y = h - dy;
  
    this.tooltipWin.document.body.innerHTML = this.tooltipHTML;
    this.tooltipWin.show(x, y, dx, dy, cortona);
  }
}

function TooltipOver3D_hide() {
	this.tooltipWin.hide();
}

function TooltipOver3D_setTooltipHTML(syntax) {
  this.tooltipHTML = syntax;
}

function TooltipOver3D_setXY(x, y) {
  this.x = x;
  this.y = y;
}

function TooltipIn3D() 
{
  this.tooltipHTML = "";
  this.groupNode = null;
  this.x = 0;
  this.y = 0;
  this.TOOLTIP_DX = 15;
  this.TOOLTIP_DY = 20;

TooltipIn3D.prototype.show =
  function TooltipIn3D_show_tooltip() 
  {
	if(this.tooltipHTML != "" && (this.x!=0 || this.y!=0)) 
    {
    	var e = _ipcApi.cortona.Engine;
    	if(this.groupNode == null){
			this.groupNode = e.CreateVrmlFromString("Group{}").GetValue(0);
			e.RootNodes.Add(this.groupNode);
    		
    	}
    	var w = _ipcApi.cortona.clientWidth;
      	var h = _ipcApi.cortona.clientHeight;      	
      	var syntax = 'Panel{top "-500" left "-500" source HTMLText{body "<font face=\\"tahoma, sans-serif\\" color=\\"#000000\\">'+this.tooltipHTML+'</font>" padding [3, 3, 3, 3]}borderSize 1}';
		var node = e.CreateVrmlFromString(syntax).GetValue(0);
		this.groupNode.Fields.Item("children").Add(node);
		
		var contentSize = node.Fields.Item("contentSize");
		var sX = contentSize.GetValue(0)+2;
		var sY = contentSize.GetValue(1)+2;
		
		this.groupNode.Fields.Item("children").Clear();
		var x = this.x + this.TOOLTIP_DX;
  		var y = this.y + this.TOOLTIP_DY;
  		if(x+sX>w)x = this.x - this.TOOLTIP_DX - sX;
  		if(y+sY>h)y = this.y - this.TOOLTIP_DY - sY;
		var syntax = 'Panel{left "'+x+'" top "'+y+'" width "'+sX+'" height "'+sY+'" source HTMLText{body "<font face=\\"tahoma, sans-serif\\" color=\\"#000000\\">'+this.tooltipHTML+'</font>" padding [3, 3, 3, 3]}backgroundTransparency 0 backgroundColor 1 1 .87 borderColor 0 0 0 borderSize 1}';
		var node = e.CreateVrmlFromString(syntax).GetValue(0);
		this.groupNode.Fields.Item("children").Add(node);
    }
  }

TooltipIn3D.prototype.hide = 
  function TooltipIn3D_hide_tooltip() 
  {
  	  if(this.groupNode != null){
  	  	this.groupNode.Fields.Item("children").Clear();
  	  }
  }

TooltipIn3D.prototype.setTooltipHTML = 
  function TooltipIn3D_setTooltipHTML(syntax) 
  {
  	try{
    	this.tooltipHTML = syntax.replace(/\\/g, '\\\\').replace(/\"/g, "\\\"");
    }catch(e){
    	this.tooltipHTML = "";
    }
  }

TooltipIn3D.prototype.setXY = 
  function TooltipIn3D_setXY(x, y) 
  {
    this.x = x;
    this.y = y;
  }
}

/*
 * common.js 15.06.2004 19:25
 */

function _getIPCVrmlNodesChain(array) {
  var result = new Array();
    if(_ipcApi._partNodes == null) {
      if(array.length > 0)
        result = array;
    }
    else {
      for(var i=0; i<array.length; i++)
        if(typeof(_ipcApi._partNodes[array[i].Name]) != 'undefined')
          result.push(array[i]);
    }
  return result.map(function _ (n) { return new IPCVrmlNode(n);});
}

function _getPartVrmlNode(array) {
  var node = null;
  if(_ipcApi._partNodes == null) {
    if(array.length > 0)
      node = array.pop();
  }
  else
    for(var i=(array.length-1); i>=0; i--) {
      if(typeof(_ipcApi._partNodes[array[i].Name]) != 'undefined') {
        node = array[i];
        break;
      }
    }
  return node;
}

function _getVrmlNodeArray(chain) {
  var n = new Array();
  if(_ipcApi.cortona.Engine.DeviceSensors.Count>0){
	var ds = _ipcApi.cortona.Engine.DeviceSensors;
	for(var i = 0; i < ds.Count; i++){
		if(ds.getValue(i).TypeName=="Panel"){
			try{
				return [ds.getValue(i).Fields.Item("enabled").OutRoutes.Item(1).Node.Fields.Item("parent").Value];
			}catch(err){}
		}
	}
  }
  for(var i=0; i<chain.Count; i++) {
    try {
      if(chain.GetValue(i).TypeName == "ObjectVM")
        n.push(chain.GetValue(i));
      else
      if(chain.GetValue(i).TypeName == "Set_Hose" && chain.GetValue(i).Fields.Item("parent").Value)
        n.push(chain.GetValue(i).Fields.Item("parent").Value);
      else
      if(chain.GetValue(i).TypeName == "Transform2D"){
      	  var ovm = chain.GetValue(1).Fields.Item("children").GetValue(0).Fields.Item("geometry").Value.Fields.Item("_parent_object_").Value;
      	  if(ovm.TypeName == "ObjectVM"){
			n.push(ovm);
			break;
		  }
      }
    } catch(exception) {}
  }
  return n;
}
