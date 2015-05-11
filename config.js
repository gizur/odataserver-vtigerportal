(function(moduleSelf, undefined) {

  var util = require('util');

  var c = {};

  // OData server configuration
  // --------------------------
  //

  c.ODATA = {
    // The IP/DNS of the OData server
    HOST: 'localhost',

    // The user that the server should bind to
    USER: 'root',
  
    // Password to connect server 
    PASSWORD: 'dev',

    // DATABASE name
    DATABASE: 'vtiger_5159ff6a'
    
  };
 module.exports = c;

})(this);
