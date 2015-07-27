/********************************
  VTE Simulation JS wrapper API
  11.11.2008 16:00
*********************************/

function node_value(value){
	return (value=="")? null: value;
}


var _CONSTRUCTORS = {
  "scenario"    : "Scenario",
  "variable"	  : "Variable",
  "operation"	  : "Operation",
  "seq-group"	  : "Sequence",
  "and-group"	  : "SequenceAND",
  "or-group"	  : "SequenceOR",
  "next-step"		: "Next",
  "jump"		    : "Jump",
  "step"		    : "Step",
  "alert"       : "Alert",
  "activity"	  : "Activity",
  "animation"	  : "Animation",
  "viewpoint"	  : "Viewpoint",
  "viewpoints"	: "Viewpoints",
  "objects"     : "Parts",
  "object"      : "Part",
  "metainfo"    : "Meta",
  "assignment"  : "Assignment",
  "assignments" : "Assignments",
  "question"    : "Question",
  "list"        : "List",
  "request-variable"	: "RequestVariable"
};

function parse_node(node, name) {
  var result = null;
  if(node != null)
    eval("result = new " + _CONSTRUCTORS[name] + "().loadFromNode(node);");
  return result;
}

/* 
  Scenario object
 */

var _scenario = null;

function Scenario() {
  // properties
  this.id = null;
  this.steps = {}; // Step objects, assoc array
  this.variables = {}; // Global variables, assoc array
  this.parts = null; // Parts object
  this.viewpoints = null; // Viewpoints object
  this.description = "";
  this.comments = null;
  this.url = "";
  this.vrmlUrl = "";
  this.odfUrl = "";
  this.odfId = null;
  this.version = null;
  this.username = null;
  
  this.initialStep = null;
  this.history = new History(this);
  
  this.activeStep = null;
  this.active = false;

  this.score_accumulator = 0;
  this.steps_count = 0;
  this.successStatus = "unknown";

  this.startTime = 0;
  
  _scenario = this;
}
// methods
Scenario.prototype.initialize = Scenario_initialize;
Scenario.prototype.loadFromNode = Scenario_loadFromNode;
Scenario.prototype.isLoaded = Scenario_isLoaded;
Scenario.prototype.isActive = Scenario_isActive;
Scenario.prototype.start = Scenario_start; 
Scenario.prototype.cancel = Scenario_cancel; 
Scenario.prototype.fail = Scenario_fail; 
Scenario.prototype.getScaledScore = Scenario_getScaledScore;
Scenario.prototype.getSuccessStatus = Scenario_getSuccessStatus;
Scenario.prototype.getSessionTime = Scenario_getSessionTime;

Scenario.prototype.getVar = Scenario_getVar;
Scenario.prototype.setVar = Scenario_setVar;

Scenario.prototype.startStep = Scenario_startStep;  // start process new step
Scenario.prototype.processStep = Scenario_processStep;  // process current step
Scenario.prototype.processInput = Scenario_processInput; // process user interactivity

function Scenario_getVar(name)
{
  var n = '_'+name;
   var nh = '_$'+name;
  if(!(n in this.variables) && !(nh in this.variables))
    throw new Error(404, "Variable '"+name+"' not defined.");
  if(nh in this.variables)
    return this.variables[nh].valueOf();
  return this.variables[n].valueOf();
}

function Scenario_setVar(name, value)
{
  var n = '_'+name;
  var nh = '_$'+name;
  if(!(n in this.variables) && !(nh in this.variables))
    throw new Error(404, "Variable '"+name+"' not defined.");
  if(nh in this.variables)
    this.variables[nh].setValue(value);
  else
    this.variables[n].setValue(value);
}

function Scenario_getSessionTime() {
  return Math.round((new Date().valueOf() - this.startTime.valueOf())/10)/100;
}

function Scenario_getSuccessStatus() {
  return this.successStatus;
}

function Scenario_getScaledScore() {
  return (this.steps_count == 0) ? 1 : this.score_accumulator/this.steps_count;
}

function Scenario_initialize() {
  this.active = false;
  this.activeStep = null;
  this.score_accumulator = 0;
  this.steps_count = 0;
  this.successStatus = "unknown";
  for(var key in this.variables)
    this.variables[key].initialize();
}

function Scenario_loadFromNode(node) {
    this.description = node.description;
    this.comments = node_value(node.comments);
    this.vrmlUrl = node_value(node.vrmlUrl);
    this.odfUrl = node_value(node.odfUrl);
    this.id = node_value(node.id);
    this.odfId =  (node.odfId!="")? node.odfId : (this.odfUrl ? null : this.id);
    this.version = node_value(node.version);
    
    this.initialStep = null;
    this.activeStep = null;
    
    this.initialize();
  
    // parse variables
    this.variables = {};
    var n = node.variables;
    for(var i=0; i<n.length; i++) {
      var v = parse_node(n[i], "variable");
      this.variables[v.name] = v;
    }
    
    // parse viewpoints
    this.viewpoints = parse_node(node.viewpoints, "viewpoints");
    
    // parse parts
    this.parts = parse_node(node.parts, "objects");

    // parse steps
    this.steps = {};
    var n = node.steps;
    for(var i=0; i<n.length; i++) {
      var s = parse_node(n[i], "step");
      this.steps[s.id] = s;
      if(i == 0)
        this.initialStep = s;
    }
    return this;
}

function Scenario_isLoaded() {
  return( this.initialStep != null);
}

function Scenario_isActive() {
  return( this.active );
}

function Scenario_start() {
  if(this.isLoaded() && !this.active) {
    this.startTime = new Date();
    this.initialize();
    this.active = true;
    this.successStatus = "passed";
    this.history.initialize();
    this.history.push(new HistoryStartScenario(this.variables));
    safe_call_method_void(this, "on_scenario_start");
    this.startStep(this.initialStep);
  }
}

function Scenario_cancel() {
  if(this.active) {
    this.active = false;
    this.successStatus = "failed";
    this.history.push(new HistoryFinishScenario(this.getSuccessStatus(), this.getScaledScore(), this.variables));
    safe_call_method_void(this, "on_scenario_cancel");
    this.initialize();
  }
}

function Scenario_fail() {
  if(this.active) {
    vte.successStatus = "failed";
    vte.startStep(null);
  }
}

function Scenario_startStep(step) {
  if(this.active) {
    if(this.activeStep != null) {
      this.steps_count += Math.abs(this.activeStep.weight);
      this.score_accumulator += this.activeStep.getScaledScore() * this.activeStep.weight;
      safe_call_method_1par(this, "on_step_finish", this.activeStep);
      if(this.history.steps.length>0)
        this.history.steps[this.history.steps.length-1].score = this.activeStep.getScaledScore();
    }
    this.activeStep = step;
    if(this.activeStep != null) {
      this.activeStep.initialize();
      this.history.push(new HistoryStep(this.activeStep, this.variables));
      safe_call_method_1par(this, "on_step_start", this.activeStep);
      this.processStep();
    }
    else {
      this.active = false;
      this.history.push(new HistoryFinishScenario(this.getSuccessStatus(), this.getScaledScore(), this.variables));
      safe_call_method_void(this, "on_scenario_finish");
    }
  }
}

function Scenario_processStep() {
  if(this.active) {
    if(this.activeStep != null) {
      var leo = this.activeStep.getExpectedOperations();
      if(leo.length > 0) {
        safe_call_method_1par(this, "on_expected_operations", leo);
      }
      else
        this.startStep(this.activeStep.nextStep());
    }
  }
}

function Scenario_processInput(oInput) {
  if(this.active && this.activeStep) {
    var leo = this.activeStep.getExpectedOperations();
    var aOperations = new Array();
    var bError = (oInput != null);
    this.history.push(new HistoryInput(oInput));
    for(var i=0; i<leo.length; i++)
      if(leo[i].checkPattern(oInput)) {
        if(oInput != null && oInput.constructor == Variable) {
          this.variables[oInput.name].value = oInput.value;
          bError = false;
        }
        if(oInput == null || oInput.constructor != String) {
          aOperations.push(leo[i]);
          this.history.push(new HistoryOperation(leo[i], this.variables));
          
          if(leo[i].assignments)
            leo[i].assignments.array.mapv(function _ (n) {n.proceed();});
            
          try {
            eval(leo[i].script);
          } catch(exception) {alert('ERROR: '+exception.description+'\r\n\n'+leo[i].script);}
          
          bError = false;
        }
        if(oInput != null && oInput.constructor == String) {
/*          
          var activity = leo[i].activity;
          if(activity.isActive() && leo[i].checkPattern(new Template(activity.objects, {}))) {
            aOperations.push(leo[i]);
            this.history.push(new HistoryOperation(leo[i]));
          }
*/          
          bError = false;
        }
      }
    if(aOperations.length > 0)
      safe_call_method_2par(this, "on_operations", aOperations, oInput);
    else
      if(bError) {
        this.activeStep.errors++;
        this.history.push(new HistoryFault(this.activeStep.errorLimits - this.activeStep.errors + 1));
        safe_call_method_2par(this, "on_step_input_failed", this.activeStep, oInput);
      }
  }
}

/* events:
on_load()
on_unload()
on_step_start(oStep)
on_step_finish(oStep)
on_scenario_start()
on_scenario_finish()
*/

/* 
  Variable object
 */

function Variable() {
    this.cmi = "";
    this.name = "";
    this.value = null;
    this.type = "string";
    this.defaultValue = null;
    this.description = "";
    this.comments = null;
    this.items = new Array();
}
Variable.prototype.equal = Variable_equal;
Variable.prototype.defaultValueOf = Variable_defaultValueOf;
Variable.prototype.valueOf = Variable_valueOf;
Variable.prototype.setValue = Variable_setValue;
Variable.prototype.getValueString = Variable_getValueString;
Variable.prototype.loadFromNode = Variable_loadFromNode;
Variable.prototype.initialize = Variable_initialize;
Variable.prototype.toString = Variable_toString;
Variable.prototype.toXML = Variable_toXML;

function Variable_initialize() {
  if(this.cmi)
  {
    // initialize stub rts variables
    if(rtsAPI.isStub())
    {
      rtsAPI.getAPI().SetValue(this.cmi, this.defaultValue, true);
    }
  }
  this.value = this.defaultValue;
}

function Variable_valueOf() {
  var result = '';
  if(this.cmi)
  {
    var value = rtsAPI.get(this.cmi);
    if(typeof(value) != 'undefined')
    {
      if(this.type != "enumeration")
      {
        this.value = value;
      }
      else
      {
        for(var i=0; i<this.items.length && this.items[i]!=value; i++);
        if(i<this.items.length)
        {
          this.value = i;
        }
      }
    }
  }
  switch(this.type) {
    case "enumeration":
      if(this.items && this.value >= 0 && this.value < this.items.length)
        result = this.items[this.value].valueOf();
      break;
    default:
      result = this.value.valueOf();
  }  
  return result;
}

function Variable_defaultValueOf() {
  var result = '';
  switch(this.type) {
    case "enumeration":
      if(this.items && this.value >= 0 && this.value < this.items.length)
        result = this.items[this.defaultValue].valueOf();
      break;
    default:
      result = this.defaultValue.valueOf();
  }  
  return result;
}

function Variable_equal(activity) {
  return (activity.name == this.name);
}

function Variable_setValue(value) {
  if(this.cmi)
  {
    if(this.type == "enumeration")
    {
      if(this.items && value >= 0 && value < this.items.length)
        rtsAPI.set(this.cmi, this.items[value]);
    }
    else
    {
      rtsAPI.set(this.cmi, value);
    }
  }
  switch(this.type) 
  {
    case "enumeration":
    case "numeric":
    case "number":
      this.value = new Number(value);
      break;
    case "boolean":
      this.value = new Boolean(new Number(value).valueOf());
      break;
    case "string":
      if(/^\{[\s\S\n]*\}$/.test(value))
      {
        // evaluate
        try {
          this.value = new String(eval('(function()'+value+')();'));
        }
        catch(exception)
        {
          alert('EVALUATE EXCEPTION: ' + exception.description);
          this.value = '';
        }
        break;
      }
    default:
      this.value = new String(value);
  }
}

function Variable_getValueString() {
  var result;
  if(this.cmi)
  {
    var value = rtsAPI.get(this.cmi);
    if(typeof(value) != 'undefined')
    {
      if(this.type != "enumeration")
      {
        this.value = value;
      }
      else
      {
        for(var i=0; i<this.items.length && this.items[i]!=value; i++);
        if(i<this.items.length)
        {
          this.value = i;
        }
      }
    }
  }
  switch(this.type) {
    case "numeric":
    case "number":
    case "boolean":
    case "enumeration":
      result = this.value.toString();
      break;
    case "string":
      result = '"' + this.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
      break;
    default:
      result = this.value;
  }
  return result;
}

function Variable_loadFromNode(node) {
  if(node != null) {
    this.name = node_value(node.name);
    this.type = node_value(node.type);
    this.setValue(node.startvalue);
    this.defaultValue = this.value;
    this.description = node.description;
    this.comments = node_value(node.comments);
    this.items = parse_node(node.list, "list");
    if(this.name.indexOf('_cmi.')==0)
      this.cmi = this.name.substring(1);
    return this;
  }
  return null;
}

function Variable_toString() {
  var syntax = 'Variable { name "'+this.name+'" value "'+this.valueOf()+'" }';
  return syntax;
}

function Variable_toXML() {
  var syntax = '<variable name="'+this.name+'">'+xmltext(this.value)+'</variable>\r\n';
  return syntax;
}

/* 
  Step object
 */

function Step() {
  this.id = null;
  this.odfId = null;

  this.sequence = null; // Sequence object, graph
  this.nextstep = null; // Next Step object
  this.description = "";
  this.comments = null;
  this.viewpoints = null; // Viewpoints object
  
  this.errorLimits = 3;
  this.weight = 1;

  this.errors = 0;
  this.completed = false;
}
Step.prototype.initialize = Step_initialize;
Step.prototype.getExpectedOperations = Step_getExpectedOperations;
Step.prototype.getOperations = Step_getOperations;
Step.prototype.nextStep = Step_nextStep;
Step.prototype.loadFromNode = Step_loadFromNode;
Step.prototype.getScaledScore = Step_getScaledScore;
Step.prototype.getSuccessStatus = Step_getSuccessStatus;
Step.prototype.getRemainingAttempts = Step_getRemainingAttempts;

function Step_getRemainingAttempts() {
  var ret = -1;
  if(this.errorLimits >= 0)
    ret = this.errorLimits-this.errors+1;
  return ret;
}

function Step_getSuccessStatus() {
  if(!this.completed)
    return 'unknown';
  return ((this.errors < this.errorLimits) ? "passed" : "failed");
}

function Step_getScaledScore() {
  var score = 1;
  if(this.errorLimits > 0)
    score = Math.max(0, 1 - this.errors / this.errorLimits);
  else
  if(this.errorLimits == 0)
    score = (this.errors == 0) ? 1 : 0;
  return score;
}

function Step_initialize() {
  this.succesStatus = 'unknown';
  this.errors = 0;
  this.completed = false;
  if(this.sequence != null)
    this.sequence.initialize();
}

function Step_getExpectedOperations() {
  var a = new Array();
  if(this.sequence != null)
    a = this.sequence.getExpectedOperations();
  return a;
}

function Step_nextStep() {
  var step = null;
  if(this.nextstep != null)
    step = this.nextstep.proceed();
  return step;
}

function Step_loadFromNode(node) {
  if(node != null) {
    this.id = node_value(node.id);
    this.odfId = node.odfId;
    if(this.odfId=="")this.odfId=this.id;
    try{
    	this.errorLimits = new Number(node.errorLimits).valueOf();
    }catch(e){}
    try{
    	this.weight = new Number(node.weight).valueOf();
    }catch(e){}
    this.description = node.description
    this.comments = node_value(node.comments);
    if(node.sequence.length>0)this.sequence = parse_node(node.sequence[0], node.sequence[0].type);
    this.nextstep = parse_node(node.nextstep, "next-step");
    this.viewpoints = parse_node(node.viewpoints, "viewpoints");

    return this;
  }
  return null;
}

function Step_getOperations() {
  var result = new Array();
  if(this.sequence)
    result = result.concat(this.sequence.getOperations());
  return result;
}

/* events:
on_start()
on_finish()
on_operaton(success, operation, pattern)
*/

/* 
  Sequence object
 */

function Sequence() {
  this.children = new Array(); // Sequence[AND|OR] | Operation object
  this.current = 0;
  this.description = "";
  this.comments = null;
}
Sequence.prototype.initialize = Sequence_initialize;
Sequence.prototype.isCompleted = Sequence_isCompleted;
Sequence.prototype.isActive = Sequence_isActive;
Sequence.prototype.getExpectedOperations = Sequence_getExpectedOperations;
Sequence.prototype.loadFromNode = Sequence_loadFromNode;
Sequence.prototype.getOperations = Sequence_getOperations;
Sequence.prototype.isInteractivity = Sequence_isInteractivity;


function Sequence_initialize() {
  this.current = 0;
  this.children.mapv(new Function('n', 'n.initialize()'));
}

function Sequence_isCompleted() {
  while(this.current<this.children.length && this.children[this.current].isCompleted()) 
    this.current++;
  return (this.children.length == this.current);
}

function Sequence_isActive() {
  if(this.isCompleted()) return true;
  var active_count = 0;
  for(var i=0; i<=this.current; i++)
      if(this.children[i].isActive())
        active_count++;
  return (active_count > 0);
}

function Sequence_getExpectedOperations() {
  var a = new Array();
  if(!this.isCompleted()) {
    a = this.children[this.current].getExpectedOperations();
  }
  return a;
}

function Sequence_loadFromNode(node) {
  if(node != null) {
    this.description = node.description;
    this.comments = node_value(node.comments);
    this.children = new Array(); 
    var n = node.sequence;
    for(var i=0; i<n.length; i++)
        this.children.push(parse_node(n[i], n[i].type));
    return this;
  }
  return null;
}

function Sequence_getOperations() {
  var result = new Array();
  for(var i=0; i<this.children.length; i++)
    result = result.concat(this.children[i].getOperations());
  return result;
}

function Sequence_isInteractivity() {
//  for(var i=0; i<this.children.length; i++)
//    if(this.children[i].isInteractivity())
      return true;
//  return false;
}

/* 
  SequenceAND object
 */

function SequenceAND() {
  this.children = new Array(); // Sequence[AND|OR] | Operation object
  this.description = "";
  this.comments = null;
}
SequenceAND.prototype.initialize = SequenceAND_initialize;
SequenceAND.prototype.isCompleted = SequenceAND_isCompleted;
SequenceAND.prototype.isActive = SequenceAND_isActive;
SequenceAND.prototype.getExpectedOperations = SequenceAND_getExpectedOperations;
SequenceAND.prototype.loadFromNode = Sequence_loadFromNode;
SequenceAND.prototype.getOperations = Sequence_getOperations;
SequenceAND.prototype.isInteractivity = Sequence_isInteractivity;

function SequenceAND_initialize() {
  this.children.mapv(new Function('n', 'n.initialize()'));
}

function SequenceAND_isCompleted() {
  var completed_count = 0;
  for(var i=0; i<this.children.length; i++)
      if(this.children[i].isCompleted())
        completed_count++;
  return (completed_count == this.children.length);
}
function SequenceAND_isActive() {
  if(this.isCompleted()) return true;
  var active_count = 0;
  for(var i=0; i<this.children.length; i++)
      if(this.children[i].isActive())
        active_count++;
  return (active_count > 0);
}

function SequenceAND_getExpectedOperations() {
  var a = new Array();
  if(!this.isCompleted()) {
    for(var i=0; i<this.children.length; i++) {
      if(!this.children[i].isCompleted()) {
        a = a.concat(this.children[i].getExpectedOperations());
      }
    }
  }
  return a;
}

/* 
  SequenceOR object
 */

function SequenceOR() {
  this.children = new Array(); // Sequence[AND|OR] | Operation object
  this.description = "";
  this.comments = null;
}
SequenceOR.prototype.initialize = SequenceOR_initialize;
SequenceOR.prototype.isCompleted = SequenceOR_isCompleted;
SequenceOR.prototype.isActive = SequenceAND_isActive;
SequenceOR.prototype.getExpectedOperations = SequenceOR_getExpectedOperations;
SequenceOR.prototype.loadFromNode = Sequence_loadFromNode;
SequenceOR.prototype.getOperations = SequenceOR_getOperations;
SequenceOR.prototype.isInteractivity = Sequence_isInteractivity;

function SequenceOR_initialize() {
  this.children.mapv(new Function('n', 'n.initialize()'));
}

function SequenceOR_isCompleted() {
  var completed_count = 0;
  for(var i=0; i<this.children.length; i++)
      if(this.children[i].isCompleted())
        completed_count++;
  return (completed_count > 0);
}

function SequenceOR_getExpectedOperations() {
  var a = new Array();
  if(!this.isCompleted()) {
    var active = null;
    for(var i=0; i<this.children.length; i++) {
      a = a.concat(this.children[i].getExpectedOperations());
      if(this.children[i].isActive()) {
        active = this.children[i];
        break;
      }
    }
    if(active)
      a = active.getExpectedOperations();
  }
  return a;
}

function SequenceOR_getOperations() {
  var result = new Array();
  if(this.children.length > 0)
    result = result.concat(this.children[0].getOperations());
  return result;
}

/* 
  Operation object
 */

function Operation() {
  this.id = null;
  this.activity = null; // Activity | RequestVariable | Alert object
  this.animation = null; // Animation object
  this.message = null; // String object
  this.description = "";
  this.comments = null;
  this.odfId = null;
  this.assignments = null; // Asignments object
  this.script = "";

  this.completed = false;
}
Operation.prototype.initialize = Operation_initialize;
Operation.prototype.isCompleted = Operation_isCompleted;
Operation.prototype.isActive = Operation_isActive;
Operation.prototype.checkPattern = Operation_checkPattern;
Operation.prototype.getExpectedOperations = Operation_getExpectedOperations;
Operation.prototype.loadFromNode = Operation_loadFromNode;
Operation.prototype.getOperations = Operation_getOperations;
Operation.prototype.isInteractivity = Operation_isInteractivity;
Operation.prototype.toXML = Operation_toXML;

function Operation_toXML() {
  var syntax = '<operation  ref="'+this.id+'" document-ref="'+((this.odfId) ? this.odfId : '')+'">';
  syntax += '<description>'+this.description+'</description>';
  if(this.activity != null) {
    var template = this.activity.getTemplate();
    if(template != null)
      syntax += template.toXML();
  }
  if(this.message != null)
    syntax += '<message>'+this.message+'</message>';
  if(this.assignments)
	for(var key in this.assignments.assoc)
	  syntax += this.assignments.assoc[key].toXML()
  syntax += '</operation>\r\n';
  return syntax;
}

function Operation_initialize() {
  this.completed = false;
  if(this.activity != null)
    this.activity.initialize();
}

function Operation_isCompleted() {
  return this.completed;
}

function Operation_isActive() {
  if(this.activity && this.activity.constructor == Activity)
    return this.activity.selected.or();
  return false;
}

function Operation_checkPattern(oInput) {
  if(this.activity != null) {
    if(this.activity.equal(oInput)) {
      this.completed = (oInput.constructor != String);
      return this;
    }
  }
  else if (this.activity == oInput) {
    this.completed = true;
    return this;
  }
  return null;
}

function Operation_getExpectedOperations() {
  var a = new Array();
  if(!this.isCompleted())
    a.push(this);
  return a;
}

function Operation_loadFromNode(node) {
  if(node != null) {
    this.description = node.description;
    this.comments = node_value(node.comments);
    this.animation = parse_node(node.animation, "animation");
    this.message = node_value(node.message);
    if(node.alert_type!=""){
    	this.activity = parse_node(node, "alert");
    }else if(node.request_variable_name!=""){
    	this.activity = parse_node(node, "request-variable");
    }else if("type" in node.activity){
    	this.activity = parse_node(node.activity, "activity");
    }
    this.script = ('script' in node) ? node.script : "";
    
    this.id = node_value(node.id);
    this.odfId = node.odfId;
    if(this.odfId=="")this.odfId=this.id;
    this.assignments = parse_node(node.assignments, "assignments");
    
    try {
      this.activity.setOperation(this);
    } catch(exception) {}

    return this;
  }
  return null;
}

function Operation_getOperations() {
  var result = new Array();
  result.push(this);
  return result;
}

function Operation_isInteractivity() {
  var activity = this.activity;
  if(activity) {
    if(activity.constructor == Activity) {
      if(activity.objects.length > 0)
        return true;
      if(activity.lists.length > 0 && activity.lists[0].items.length > 0)
        return true;
    }
    if(activity.constructor == RequestVariable) {
      return true;
    }
  }
  return false;
}

/*
  Animation object
 */
function Animation() {
  this.substeps = new Array();
  this.initialFraction = 0;
} 
Animation.prototype.loadFromNode = Animation_loadFromNode;

function Animation_loadFromNode(nodes) {
  if(nodes.length>0) {
    this.substeps = new Array();
    var n = nodes;
    for(var i=0; i<n.length; i++) {
      var id = n[i];
      if(id != null && id != "")
        this.substeps.push(id);
    }
    if(this.substeps.length > 0) {
      try{
      	if(node.animation_fraction != ""){
      		this.initialFraction = new Number(node.animation_fraction);
      	}
      }catch(e){};
      return this;
    }
  }
  return null;
}

/* 
  Alert object
 */
 
function Alert() {
  this.type = "note";
  this.odfId = null;
  this.description = "";
}
Alert.prototype.setOperation = Alert_setOperation;
Alert.prototype.equal = Alert_equal;
Alert.prototype.loadFromNode = Alert_loadFromNode;
Alert.prototype.isActive = Alert_isActive;
Alert.prototype.initialize = Alert_initialize;
Alert.prototype.getTemplate = Alert_getTemplate;
Alert.prototype.toXML = Alert_toXML;

function Alert_toXML() {
  var syntax = '<alert document-ref="'+((this.odfId) ? this.odfId : '')+'">';
  syntax += '<description>'+this.description+'</description>';
  syntax += '</alert>\r\n';
  return syntax;
}

function Alert_setOperation(oOperation) {
  this.odfId = oOperation.odfId;
  this.description = oOperation.description;
}

function Alert_equal(pattern) {
  return (pattern == this);
}

function Alert_loadFromNode(node) {
  if(node != null) {
    if(node.alert_type!="")this.type = node.alert_type;
    return this;
  }
  return null;
}

function Alert_isActive() {
  return true;
}

function Alert_initialize() {
}

function Alert_getTemplate() {
  return this;
}

/* 
  RequestVariable object
 */
 
function RequestVariable() {
  this.prompt = "";
  this.name = "";
  this.value = null;
}
RequestVariable.prototype.equal = RequestVariable_equal;
RequestVariable.prototype.loadFromNode = RequestVariable_loadFromNode;
RequestVariable.prototype.isActive = RequestVariable_isActive;
RequestVariable.prototype.initialize = RequestVariable_initialize;
RequestVariable.prototype.getTemplate = RequestVariable_getTemplate;

function RequestVariable_isActive() {
  return true;
}

function RequestVariable_initialize() {}

function RequestVariable_equal(pattern) {
  var result = false;
  if(pattern != null)
    if(pattern.constructor == Variable)
      if(pattern.name == this.name)
        result = true;
  return result;
}

function RequestVariable_loadFromNode(node) {
  if(node != null) {
    this.prompt = node.request_variable_value;
    this.name = node_value(node.request_variable_name);
    this.value = node.request_default_value;
    return this;
  }
  return null;
}

function RequestVariable_getTemplate() {
   var variable = new Variable();
   variable.name = this.name;
   variable.value = (arguments.length > 0) ? arguments[0][this.name] : this.value;
   return variable;
}

/* 
  Activity object
 */
 
function Activity() {
  this.description = "";
  this.comments = null;
  this.objects = new Array(); // array of String, DEF node name
  this.lists = new Array(); // array of Question objects
  this.selected = new Array(); // array of Boolean
  this.selectionType = 0; // 0 - and, 1 - or
}
Activity.prototype.equal = Activity_equal;
Activity.prototype.loadFromNode = Activity_loadFromNode;
Activity.prototype.isActive = Activity_isActive;
Activity.prototype.initialize = Activity_initialize;
Activity.prototype.getTemplate = Activity_getTemplate;

function Activity_initialize() {
  this.selected.length = this.objects.length;
  for(var i=0; i<this.selected.length; i++)
    this.selected[i] = false;
}

function Activity_isActive() {
  return (this.selectionType == 0) ? this.selected.and() : this.selected.or();
}

function Activity_equal(pattern) {
  var result = false;
  if(pattern != null) {
    switch(pattern.constructor) {
      case Template:
        var template = this.getTemplate();
        var objects = template.objects;
        result = (objects.length == pattern.objects.length);
        for(var i=0; i<objects.length && result; i++)
          result = result && (objects[i] == pattern.objects[i]);
        for(var i=0; i<this.lists.length && result; i++)
          result = result && (pattern.para[this.lists[i].text] == this.lists[i].items[0]);
        break;
      case String:
        for(var i=0; i<this.objects.length; i++)
          if(this.objects[i] == pattern) {
            this.selected[i] = true;
            result = true;
            break;
          }
        break;
    }
  }
  else 
    result = (this.objects.length == 0 && this.lists.length == 0);
  return result;
}

function Activity_loadFromNode(node) {
  if(node != null) {
  	var most = node.type.toLowerCase();
    if(most=="")most = "and";
    this.description = node.description;
    this.comments = node_value(node.comments);
    this.selectionType = (most == "or") ? 1 : 0;
    this.objects = node.refs;
    this.lists = new Array();
    var n = node.questions;
    for(var i=0; i<n.length; i++)
      this.lists.push(parse_node(n[i], "question"));
    if((this.objects.length + this.lists.length) == 0)
      return null;
    return this;
  }
  return null;
}

function Activity_getTemplate() {
    var lists = {};
    for(var i=0; i<this.lists.length; i++)
      lists[this.lists[i].text] = this.lists[i].items[0];

    var objects = new Array();

    if(!this.isActive() && this.objects.length > 0)
    {
      if(this.selectionType == 0)
        objects = this.objects;
      else
        objects.push(this.objects[0])
    }
    else
      for(var i=0; i<this.objects.length; i++)
        if(this.selected[i])
          objects.push(this.objects[i]);
        
    return new Template(objects, lists);
}


/* 
  Template object
 */
 
function Template(objects, para_assoc) {
  this.objects = objects; // array od String
  this.para = para_assoc; // assoc array of named para
}
Template.prototype.equal = Template_equal;
Template.prototype.toString = Template_toString;
Template.prototype.toXML = Template_toXML;

function Template_toXML() {
  var syntax = '<template>';
  for(var i=0; i<this.objects.length; i++)
    syntax += '<object>'+xmltext(this.objects[i])+'</object>';
  for(key in this.para) 
    syntax += '<para name="'+key+'">'+xmltext(this.para[key])+'</para>';
  syntax += '</template>\r\n';
  return syntax;
}

function Template_equal(activity) {
  var result = (activity.objects.length == this.objects.length);
  for(var i=0; i<this.objects.length && result; i++)
    result = result && (this.objects[i] == activity.objects[i]);
  for(var i=0; i<activity.lists.length && result; i++)
    result = result && (this.para[activity.lists[i].text] == activity.lists[i].items[0]);
  return result;
}

function Template_toString() {
  var syntax = 'Template { ';
  for(var i=0; i<this.objects.length; i++)
    syntax += 'object "'+this.objects[i]+'" ';
  for(key in this.para) 
    syntax += 'option { name "'+key+'" value "'+this.para[key]+'" } ';
  syntax += '}';
  return syntax;
}

/*
  Question object
 */
 
function Question() {
  this.text = "";
  this.items = new Array(); // array of Strings
}
Question.prototype.loadFromNode = Question_loadFromNode;

function Question_loadFromNode(node) {
  if(node != null) {
    this.text = node.text;
    this.items = parse_node(node.list, "list");    
    var ra = 0;
    try{
    	if(node.answer!=""){
    		ra = new Number(node.answer).valueOf();
    	}
  	}catch(e){}
    if(!isNaN(ra) && ra > 0 && ra < this.items.length) {
      var tmp = this.items[0];
      this.items[0] = this.items[ra];
      this.items[ra] = tmp;
    }
    
    if(!this.items)
      this.items = new Array();
    return this;
  }
  return null;
}

/*
  List object
 */
 
function List() {}
List.prototype.loadFromNode = List_loadFromNode;

function List_loadFromNode(nodes) {
  return nodes;
}


/*
  Next object
 */
 
function Next() {
  this.description = "";
  this.comments = null;
  this.children = new Array(); // array of Jump object
}
Next.prototype.loadFromNode = Next_loadFromNode;
Next.prototype.proceed = Next_proceed;

function Next_loadFromNode(nodes) {
  if(nodes.length>0) {
    this.children = new Array(); 
    var n = nodes;
    for(var i=0; i<n.length; i++)
        this.children.push(parse_node(n[i], "jump"));
    return this;
  }
  return null;
}

function Next_proceed() {
  var step = null;
  var var_syntax = "";
  for(var key in  _scenario.variables)
    if(!_scenario.variables[key].cmi)
      var_syntax += "var " + key + " = " +  _scenario.variables[key].getValueString() + ";";
  for(var i=0; i<this.children.length; i++) {
    var result = true;
    if(this.children[i].condition != null) {
      result = false;
      var cond = this.children[i].condition.replace(/_(cmi\.[\w\d\.]+)/g, 'rtsAPI.get("$1")');
      var syntax = var_syntax + "return (" + cond + ");";
      try {
        result = eval('(function(){'+syntax+'})();');
      }
      catch(exception) {alert('CONDITION WARNING: '+exception.description+'\r\n\n'+syntax);}
    }
    if(result) {
      var next_step_id = this.children[i].step_id;
      if(next_step_id && typeof(_scenario.steps[next_step_id]) != 'undefined')
        step = _scenario.steps[next_step_id];
      break;
    }
  }
  return step;
}

/*
  Jump object
 */
 
function Jump() {
  this.condition = null;
  this.step_id = null;
}
Jump.prototype.loadFromNode = Jump_loadFromNode;

function Jump_loadFromNode(node) {
  if(node != null) {
    this.step_id = node_value(node.step);
    this.condition = node_value(node.condition);
    return this;
  }
  return null;
}

/*
  Viewpoint object
 */
function Viewpoint() {
  this.substep = null;
  this.value = null;
  this.description = "";
  this.comments = null;
} 
Viewpoint.prototype.loadFromNode = Viewpoint_loadFromNode;

function Viewpoint_loadFromNode(node) {
  if(node != null) {
    this.substep = node_value(node.substep);
    this.value = node_value(node.value);
    if(this.value) {
      this.value = this.value.replace(/^\s+|\s+$/, '').split(' ');
      if(this.value.length == 13)
        this.value[12] = 0;
      else
        this.value = null;
    }
    this.description = node.description;
    this.comments = node_value(node.comments);
    return this;
  }
  return null;
}

/*
  Viewpoints object
 */
function Viewpoints() {
  this._CHILD_NODE_NAME = "viewpoint";
  this._KEY_NAME = "description";
  this.array = new Array();
  this.assoc = {};
}
Viewpoints.prototype.loadFromNode = _AbstractHolder_loadFromNode;

function _AbstractHolder_loadFromNode(nodes) {
  this.array = new Array();
  this.assoc = {};
  for(var i=0; i<nodes.length; i++) {
    var object = parse_node(nodes[i], this._CHILD_NODE_NAME);
    this.array.push(object);
    this.assoc[object[this._KEY_NAME]] = object;
  }
  return this;
}

function _AbstractHolder_getAssocArray() {
  return result;
}

/*
  Part object
 */
function Part() {
  this.vrmlref = null;
  this.name = null;
  this.metainfo = null; // Metainfo object
} 
Part.prototype.loadFromNode = Part_loadFromNode;

function Part_loadFromNode(node) {
  if(node != null) {
    this.vrmlref = node_value(node.id);
    this.name = node_value(node.name);
    
    // parse metainfo
    this.metainfo = new Metainfo().loadFromNode(node.metainfo);
      
    return this;
  }
  return null;
}

/*
  Parts object
 */
function Parts() {
  this._CHILD_NODE_NAME = "object";
  this._KEY_NAME = "vrmlref";
  this.array = new Array();
  this.assoc = {};
}
Parts.prototype.loadFromNode = _AbstractHolder_loadFromNode;

/*
  Meta object
 */
function Meta() {
  this.name = "";
  this.type = "string"; // string | xref | viewpoint-value
  this.value = "";
} 
Meta.prototype.loadFromNode = Meta_loadFromNode;
Meta.prototype.toString = Meta_toString;
Meta.prototype.valueOf = Meta_toString;

function Meta_loadFromNode(node) {
  if(node != null) {
    this.name = node.name;
    this.type = node.type.toLowerCase();
    if(this.type=="")this.type="string";
    this.value = node_value(node.value);
    if(this.type == 'viewpoint-value')
      this.value = this.value.replace(/^\s+/, '').replace(/\s+$/, '').split(' ');
    return this;
  }
  return null;
}

function Meta_toString() {
  return this.value;
}

/*
  Metainfo object
 */
function Metainfo() {
  this._CHILD_NODE_NAME = "metainfo";
  this._KEY_NAME = "name";
  this.array = new Array();
  this.assoc = {};
}
Metainfo.prototype.loadFromNode = _AbstractHolder_loadFromNode;

/*
  Assignments object
 */
 
function Assignments() {
  this._CHILD_NODE_NAME = "assignment";
  this._KEY_NAME = "name";
  this.array = new Array();
  this.assoc = {};
}
Assignments.prototype.loadFromNode = _AbstractHolder_loadFromNode;

/*
  Assignment object
  */

function Assignment() {
  this.name = "";
  this.expression = "";
}
Assignment.prototype.loadFromNode = Assignment_loadFromNode;
Assignment.prototype.proceed = Assignment_proceed;
Assignment.prototype.toXML = Assignment_toXML;

function Assignment_toXML() {
  var syntax = '<assignment name="'+this.name+'">'+xmltext(this.expression)+'</assignment>\r\n';
  return syntax;
}

function Assignment_loadFromNode(node) {
  if(node) {
    this.name = node.name;
    this.expression = node.value;
    return this;
  }
  return null;
}

function Assignment_proceed() {
 _scenario.variables[this.name].setValue(this.expression);
/* 
  var var_syntax = "";
  for(var key in  _scenario.variables)
    var_syntax += "var " + key + " = " +  _scenario.variables[key].getValueString() + ";";
  eval("try{" + var_syntax + " _scenario.variables['" + this.name + "'].value = (" + this.expression + ");}catch(e){alert('ASSIGNMENT WARNING: '+e.description);}");
*/  
}

/* 
  History object
 */

function History(scenario) {
  this.XMLNS = "http://services.parallelgraphics.com/vm/mmr/vm-training-history-xml/all";
  this.scenario = scenario;
  this.steps = new Array(); // array of HistoryStep objects
  this.start = null;
  this.finish = null;
}  
History.prototype.initialize = History_initialize;
History.prototype.isEmpty = History_isEmpty;
History.prototype.drop = History_drop;
History.prototype.pop = History_pop;
History.prototype.push = History_push;
History.prototype.toXML = History_toXML;

function History_toXML() {
  function _a(name, value) { return (' '+name+'="'+value+'"');}
  var syntax = '<scenario-history ' + 
    _a('xmlns', this.XMLNS) + 
    _a('ref', this.scenario.id) + 
    (this.scenario.odfId ? _a('document-ref', this.scenario.odfId) : '') +
    (this.scenario.version ? _a('version', this.scenario.version) : '') +
    (this.scenario.username ? _a('user', this.scenario.username) : '') +
    '>\r\n';
  syntax += '<description>'+xmltext(this.scenario.description)+'</description>\r\n';
  syntax += '<scenario-file src="'+this.scenario.vrmlUrl.replace(/.wrl/, '.training.xml')+'" />\r\n';
  syntax += this.start.toXML();
  syntax += '<steps>\r\n';
  for(var i=0; i<this.steps.length; syntax += this.steps[i++].toXML());
  syntax += '</steps>\r\n';
  syntax += this.finish.toXML();
  syntax += '</scenario-history>\r\n';
  
  return syntax;
}


function History_initialize() {
  this.steps = new Array();
}

function History_isEmpty() {
  return (this.steps.length == 0);
}

function History_drop() {
  var result = new Array();
  for(var i=0; i<this.steps.length; i++)
    result = result.concat(this.steps[i].getSubsteps());
  return result;
}

function History_pop() {
  return this.steps.pop();
}

function History_push(object) {
  switch(object.constructor) {
    case HistoryStartScenario:
      this.start = object;
      break;
    case HistoryFinishScenario:
      this.finish = object;
      break;
    case HistoryStep:
      this.steps.push(object);
      break;
    case HistoryOperation:
    case HistoryInput:
    case HistoryFault:
      if(this.steps.length>0)
        this.steps[this.steps.length-1].history.push(object);
      break;
  }
}

/* 
  HistoryStep object
 */

function HistoryStep(oStep, variables_set) {
  this.step = oStep;
  this.history = new Array(); // array of History{*} objects
  this.variables_set = {};
  this.score = 0;
  this.weight = oStep.weight;
  this.faultsLimit = oStep.errorLimits;
  for(var key in variables_set) 
    this.variables_set[key] = variables_set[key].valueOf();
}
HistoryStep.prototype.getSubsteps = HistoryStep_getSubsteps;
HistoryStep.prototype.isNotInteractive = HistoryStep_isNotInteractive;
HistoryStep.prototype.toXML = HistoryStep_toXML;

function HistoryStep_toXML() {
  var syntax = '<step ref="'+this.step.id+'" document-ref="'+((this.step.odfId) ? this.step.odfId : '')+'" score="'+this.score+'" weight="'+this.weight+'" faultsLimit="'+this.faultsLimit+'">';
  syntax += '<description>'+xmltext(this.step.description)+'</description>';
  syntax += '<variables-set>';
  for(var key in this.variables_set)
    syntax += '<variable name="'+key+'">'+xmltext(this.variables_set[key])+'</variable>';
  syntax += '</variables-set>';
  syntax += '<history>';
  for(var i=0; i<this.history.length; syntax += this.history[i++].toXML());
  syntax += '</history>';
  syntax += '</step>\r\n';
  return syntax;
}

function HistoryStep_getSubsteps() {
  var result = new Array();
  for(var i=0; i<this.history.length; i++) {
    if(this.history[i].constructor == HistoryOperation) {
      var animation = this.history[i].value.animation;
      if(animation != null)
        result = result.concat(animation.substeps);
    }
  }
  return result;
}

function HistoryStep_isNotInteractive() {
  var result = true;
  for(var i=0; i<this.history.length && result; i++)
    if(this.history[i].constructor == HistoryInput)
      result  = result && ((this.history[i].value == null) || (this.history[i].value.constructor == Alert));
  return result;
}


/* 
  HistoryInput object
 */

function HistoryInput(oInput) {
  this.value = oInput; // Template|Variable|String|null object
  this.timestamp = new Date();
  this.location = new Array();
  try {
    this.location = api.get_viewpoint_data();
  } catch(exception) {}
}

HistoryInput.prototype.toXML = HistoryInput_toXML;

function HistoryInput_toXML() {
  var syntax = '<history-item timestamp="'+this.timestamp.toUTCString()+'" type="input">';
  if(this.location.length == 13)
    syntax += '<viewpoint-value>'+ this.location.join(' ') +'</viewpoint-value>';
  if(this.value == null)
    syntax += '<null/>';
  else
  if(this.value.constructor == String)
    syntax += '<select><object>'+xmltext(this.value)+'</object></select>';
  else
    syntax += this.value.toXML();
  syntax += '</history-item>\r\n';
  return syntax;
}

/* 
  HistoryOperation object
 */

function HistoryOperation(oOperation, variables_set) {
  this.value = oOperation; // Operation object
  this.timestamp = new Date();
  this.variables_set = {};
  for(var key in variables_set) 
    this.variables_set[key] = variables_set[key].valueOf();
}
HistoryOperation.prototype.toXML = HistoryOperation_toXML;

function HistoryOperation_toXML() {
  var syntax = '<history-item timestamp="'+this.timestamp.toUTCString()+'" type="operation">';
  syntax += '<variables-set>';
  for(var key in this.variables_set)
    syntax += '<variable name="'+key+'">'+xmltext(this.variables_set[key])+'</variable>';
  syntax += '</variables-set>';
  syntax += this.value.toXML(this.variables_set);
  syntax += '</history-item>\r\n';
  return syntax;
}

/* 
  HistoryFault object
 */

function HistoryFault(n) {
  this.value = n; // number of available try
  this.timestamp = new Date();
}
HistoryFault.prototype.toXML = HistoryFault_toXML;

function HistoryFault_toXML() {
  var syntax = '<history-item timestamp="'+this.timestamp.toUTCString()+'" type="fault">';
  syntax += '<fault>'+this.value+'</fault>';
  syntax += '</history-item>\r\n';
  return syntax;
}

/* 
  HistoryStartScenario object
 */

function HistoryStartScenario(variables_set) {
  this.timestamp = new Date();
  this.variables_set = {};
  for(var key in variables_set) 
    this.variables_set[key] = variables_set[key].valueOf();
}

HistoryStartScenario.prototype.toXML = HistoryStartScenario_toXML;

function HistoryStartScenario_toXML() {
  var syntax = '<start timestamp="'+this.timestamp.toUTCString()+'">';
  syntax += '<variables-set>';
  for(var key in this.variables_set)
    syntax += '<variable name="'+key+'">'+xmltext(this.variables_set[key])+'</variable>';
  syntax += '</variables-set>';
  syntax += '</start>\r\n';
  return syntax;
}

/* 
 HistoryFinishScenario object
 */

function HistoryFinishScenario(status, score, variables_set) {
  this.status = status; 
  this.score = score; 
  this.timestamp = new Date();
  this.variables_set = {};
  for(var key in variables_set) 
    this.variables_set[key] = variables_set[key].valueOf();
}

HistoryFinishScenario.prototype.toXML = HistoryFinishScenario_toXML;

function HistoryFinishScenario_toXML() {
  var syntax = '<finish timestamp="'+this.timestamp.toUTCString()+'">';
  syntax += '<variables-set>';
  for(var key in this.variables_set)
    syntax += '<variable name="'+key+'">'+xmltext(this.variables_set[key])+'</variable>';
  syntax += '</variables-set>';
  syntax += '<status>'+this.status+'</status>';
  syntax += '<score>'+Math.floor(this.score*100)/100+'</score>';
  syntax += '</finish>\r\n';
  return syntax;
}

function xmltext(text) {
  var dom = new ActiveXObject('Microsoft.XMLDOM');
  var fragment = dom.createDocumentFragment();
  fragment.appendChild(dom.createTextNode(text));
  return fragment.xml;
}