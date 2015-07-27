
/*
  rts_api_wrapper.js
  26.02.2009 10:10:13
 */
 
var rtsAPI = new (function(){
  
  var _debug = false;
  var _api = null;
  var _noapi = false;
  var _terminated = false;
  var _is_stub = false;
  var _displayErrorInfo = function(code)
  {
    if(_debug)
    {
      alert( "ERROR: " + code + " - " + _api.GetErrorString(code) + "\n" +
             "DIAGNOSTIC: " + _api.GetDiagnostic(code));
    }
  }
  
  this.constructor.prototype.debug = function(flag) { _debug = flag; }
  this.constructor.prototype.isStub = function() { return _is_stub; }
  this.constructor.prototype.getAPI = function() 
  { 
    var _findAPI = function( win )
    {
      var findAPITries = 0;
      
      if(typeof(API_1484_11_STUB) != 'undefined')
      {
        _is_stub = true;
        return API_1484_11_STUB;
      }
      
      while ( (win.API_1484_11 == null) &&
             (win.parent != null) &&
             (win.parent != win) )
      {
        findAPITries++;
        if ( findAPITries > 500 )
        {
          if( _debug )
            alert( "Error finding API -- too deeply nested." );
          return null;
        }
        win = win.parent;
      }
      
      return win.API_1484_11;
    }
    
    if(!_api)
    {
      if ( !_noapi )
      {
         _api = _findAPI( window );
      
         if ( (_api == null) &&
              (window.opener != null) &&
              (typeof(window.opener) != "undefined") )
         {
            _api = _findAPI( window.opener );
         }
      
         if (_noapi = (_api == null))
         {
            if(_debug)
              alert( "Unable to locate the LMS's API Implementation.\n" +
                     "Communication with the LMS will not occur." );
         }
      }
    }
    return _api;
  }


  this.constructor.prototype.initialize = function() 
  { 
    var result = false;
    var api = this.getAPI();
    if( api )
    {
      var result = ( api.Initialize("") == "true" );
      if ( !result )
      {
         _displayErrorInfo( api.GetLastError() );
      }
    }
    return result;
  }

  this.constructor.prototype.terminate = function()
  { 
    var result = false;
    var api = this.getAPI();
    if( api )
    {
      if ( !_terminated )
      {
         result = ( api.Terminate("") == "true" );
    
         if ( !result )
         {
           _displayErrorInfo( api.GetLastError() );
         }
         else  
         {
            terminated = true;
         }
      }
    }
    return result;
  }

  this.constructor.prototype.get = function( name )
  {
     if ( !_terminated )
     {
        var api = this.getAPI();
        if( api )
        {
           var value = api.GetValue( name );
  
           var errCode = api.GetLastError();
  
           if ( errCode != "0" )
           {
              _displayErrorInfo( errCode );
           }
           else
           {
              return value;
           }
        }
     }
     return;
  }

  this.constructor.prototype.set = function( name, value )
  {
    var result = false;
    if ( !_terminated )
    {
      var api = this.getAPI();
      if( api )
      {
         result = ( api.SetValue( name, value ) == "true" );
         if ( !result )
         {
           _displayErrorInfo( api.GetLastError() );
         }
      }
    }
    return result;
  }

  this.constructor.prototype.commit = function()
  {
    var result = false;
    if ( !_terminated )
    {
      var api = this.getAPI();
      if( api )
      {
         result = ( api.Commit() == "true" );
         if ( !result )
         {
           _displayErrorInfo( api.GetLastError() );
         }
      }
    }
    return result;
  }
})();
