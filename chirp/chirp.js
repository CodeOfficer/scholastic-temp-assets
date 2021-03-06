/* This is the Official Chirp Library implemented in Javascript.
 *
 * USAGE:
 *
 * To use chirp, simply instantiate once:
 * var chirp = new Chirp('Math180');  //This will create a Chirp object with default options, for an Application Source named 'Math180'
 *
 * From there, anywhere in your code simply call:
 *
 * chirp.log('SOME_ACTION', 'ACTION_MESSAGE');
 *
 *
 * DESCRIPTION:
 *
 * Here, SOME_ACTION is a tag used to describe the type of log message being created.
 * Examples of a Chirp-Action are:
 *
 * USER_LOGGED_IN
 * USER_LOGGED_OUT
 * USER_LOGIN_FAILED
 * PAGE_TURNED
 *
 * "ACTION_MESSAGE" is for additional information about the action.
 *
 * e.g.
 * chirp.log('USER_LOGGED_IN', 'User logged in. siteID: h00001234.education.scholastic.com, sID: a82613hfnasd71293-4, URL: http://foobar.com')
 *
 *
 * Options:
 * When you instantiate a new Chirp object, you can pass in the following (optional!) options:
 *
 * AUTO_JSON: true|false - Sets whether the ACTION_MESSAGE passed in should be converted to a JSON object (if set to False Chirp assumes ACTION_MESSAGE is a plain string).
 * e.g.  var chirp = new Chirp('Math180', { AUTO_JSON: true })
 *
 * PRODUCTION_MODE: true|false - Sets whether we should be pointing to the Production Chirp endpoint or if we're still in development mode. PRODUCTION_MODE = false by default. (See DEV_URL and PROD_URL options)
 *
 * DEV_URL: "http://some_url:port/foo" - Set what the URL endpoint should be when Chirp is in DEVELOPEMENT mode. A sane default is provided
 *
 * PROD_URL: "http://some_url:port/foo" - Sets what the URL endpoint should be when Chirp is in PRODUCTION mode.
 *
 * IDENTITY:   !!!!!! NB !!!!!!!  This is a field used to uniquely identify this specific instance of the Chirp object.  E.g. if you wanted to identify between two different users sending chirps at the same time,
 * populate this field with some dynamically generated value.  E.g. you may want to use some kind of server issued ID string. As this value.   IF YOU DO NOT SPECIFY AN IDENTITY ONE WILL BE GENERATED AUTOMATICALLY FOR YOU.
 */


/**
 * MD5 Library Thanks to:
 * https://github.com/blueimp/JavaScript-MD5
 */
(function(a){function b(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<a.length*32;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];c[(a.length>>2)-1]=undefined;for(b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<a.length*8;b+=8)c[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;return c}function l(a){return j(i(k(a),a.length*8))}function m(a,b){var c,d=k(a),e=[],f=[],g;e[15]=f[15]=undefined,d.length>16&&(d=i(d,a.length*8));for(c=0;c<16;c+=1)e[c]=d[c]^909522486,f[c]=d[c]^1549556828;return g=i(e.concat(k(b)),512+b.length*8),j(i(f.concat(g),640))}function n(a){var b="0123456789abcdef",c="",d,e;for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"use strict",typeof define=="function"&&define.amd?define(function(){return t}):a.md5=t})(this);

function Chirp (APP_NAME, opts) {
  if ( !(this instanceof Chirp) ) {
    return new Chirp();
  }
  this.opts = {
    AUTO_JSON: true,
    PRODUCTION_MODE: false,
    DEV_URL: "http://devchirp.education.scholastic.com",
    PROD_URL: "http://chirp.education.scholastic.com"
  };

  this.HEADERS = {
    "Chirp-Action": "",
    "Chirp-Message": "",
    "Chirp-Identity": "",
    "Chirp-Source": "",
    "Chirp-GUID": "",
    "Chirp-Timestamp": ""
  };

  this.construct = function(APP_NAME) {
    this.HEADERS["Chirp-Source"] = APP_NAME;
    $.extend(this.opts, opts); //merge the two options into this.opts.
    if (this.opts["IDENTITY"]) {
      this.HEADERS["Chirp-Identity"] = opts.IDENTITY;
    }
    if (!this.HEADERS["Chirp-Identity"]) {
      this.HEADERS["Chirp-Identity"] = autoGenID();
    }
  };
  this.construct(APP_NAME); //Call the constructor immediately.

  /**
   * Returns an Identity string unique to this Chirp instance
   */
  function autoGenID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      var ret = (c === 'x' ? r : (r&0x7|0x8)).toString(16);
      return ret.replace('i','2').replace('1','2').replace('l','2'); //replace i l and 1 with '2' for readability;
    });
    return 'CHIRPID-' + uuid;
  }

  function generateGUID(that) {
    var tstamp = that.HEADERS["Chirp-Timestamp"];
    var identity = that.HEADERS["Chirp-Identity"];
    return md5(identity + tstamp);

  }

  /**
   * Updates the HEADERS object with data
   * that is generated dynamically based on the values
   * of other fields.
   */
  function autoUpdateHeaders(that) {
    that.HEADERS["Chirp-Timestamp"] = (new Date()).getTime();

    if (that.opts["AUTO_JSON"]) {
      //Turn Message string into a JSON dict obj per the spec.
      that.HEADERS["Chirp-Message"] = JSON.stringify(that.HEADERS["Chirp-Message"]);
    } else {
      //Do nothing. Assume you know what's up.
    }

    that.HEADERS["Chirp-GUID"] = generateGUID(that);

  }

  this.log = function(ACTION, MESSAGE, async, testingCallback) { //callback for testing only.
    var url = this.opts.PRODUCTION_MODE ? this.opts.PROD_URL : this.opts.DEV_URL;
    this.HEADERS["Chirp-Action"] = ACTION;
    this.HEADERS["Chirp-Message"] = MESSAGE;

    autoUpdateHeaders(this);
    var _async;
    if (!async) {
      _async = false;
    }

    $.ajax({
      url: url,
      headers: this.HEADERS,
      type: "POST",
      complete: testingCallback,
      async: _async
    });
  };

};
