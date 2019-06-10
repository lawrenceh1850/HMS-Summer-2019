



/* ControlTag Loader for Boston Globe 85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd */
(function(w, cs) {
  
  if (/Twitter for iPhone/.test(w.navigator.userAgent || '')) {
    return;
  }

  var debugging = /kxdebug/.test(w.location);
  var log = function() {
    
    debugging && w.console && w.console.log([].slice.call(arguments).join(' '));
  };

  var load = function(url, callback) {
    log('Loading script from:', url);
    var node = w.document.createElement('script');
    node.async = true;  
    node.src = url;

    
    node.onload = node.onreadystatechange = function () {
      var state = node.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        log('Script loaded from:', url);
        callback.done = true;  
        callback();
      }
    };

    
    var sibling = w.document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(node, sibling);
  };

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.41.3","schema_version":3},"confid":"snn57lx3a","context_terms":[{"id":"MDKWl6-h","value":"investor"},{"id":"MDKWmB1P","value":"amazon"},{"id":"MDKWmGeJ","value":"household"},{"id":"MDKWl-Wk","value":"property"},{"id":"MDKWmExD","value":"travel"},{"id":"MDKWl5q9","value":"DOW"},{"id":"MDKWl_u0","value":"assisted living"},{"id":"MDKWmGIZ","value":"moms"},{"id":"MDKWmD6y","value":"vacation"},{"id":"MDKWl8rN","value":"finance"},{"id":"MDKWmIHQ","value":"home care"},{"id":"MDKWl6pt","value":"invest"},{"id":"MDKWmHxy","value":"staycation"},{"id":"MDKWmDOl","value":"mall"},{"id":"MDKWl5_r","value":"home improvement"},{"id":"MDKWmFcN","value":"things to do"},{"id":"MDKWl-rb","value":"alzheimer’s"},{"id":"MDKWmFHK","value":"activities"},{"id":"MDKWmAEC","value":"boomers"},{"id":"MDKWmBcM","value":"gifts"},{"id":"MDKWl8Vp","value":"economics"},{"id":"MDKWmCzB","value":"shopping"},{"id":"MDKWl8AX","value":"economy"},{"id":"MDKWmAuF","value":"fashion"},{"id":"MDKWl9V9","value":"Real estate"},{"id":"MDKWl5Ab","value":"NYSE"},{"id":"MDKWl_C1","value":"dementia"},{"id":"MDKWmBEJ","value":"style"},{"id":"MDKWmHct","value":"stay at home"},{"id":"MDKWl9qq","value":"DIY"},{"id":"MDKWmGzH","value":"childcare"},{"id":"MDKWmCOf","value":"retail"},{"id":"MDKWl7qu","value":"luxury"},{"id":"MDKWl7Tp","value":"asset"},{"id":"MDKWl9AI","value":"merger"},{"id":"MDKWmEZ2","value":"destination"},{"id":"MDKWmAZM","value":"savings"},{"id":"MDKWl_Yo","value":"elder care"},{"id":"MDKWl5WH","value":"Wealth management"},{"id":"MDKWl-Ao","value":"interior design"},{"id":"MDKWmFyB","value":"mom"},{"id":"MDKWl6Un","value":"billionaire"},{"id":"MDKWmDkb","value":"shop"},{"id":"MDKWmHIF","value":"child care"}],"publisher":{"name":"Boston Globe","active":true,"uuid":"85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd","version_bucket":"stable","id":3125},"params":{"first_party_dmp_managed":false,"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"first_party_cookie_enhancements":false,"control_tag_pixel_throttle":100,"fingerprint":false,"optout_button_optout_text":"Browser Opt Out","user_data_timing":"load","consent_active":true,"use_central_usermatch":true,"store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","optout_button_optin_text":"Browser Opt In","first_party_uid":false,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":false,"context_terms":true,"optout_button_id":"kx-optout-button","dfp_premium":true,"control_tag_namespace":"bostonglobe"},"prioritized_segments":[],"realtime_segments":[],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"https://connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"https://consumer.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"https://link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"https://usermatch.krxd.net/um/v2","controltag":"//cdn.krxd.net/ctjs/controltag.js.{hash}","loopback":"https://consumer.krxd.net/consumer/tmp_cookie","remove":"https://consumer.krxd.net/consumer/remove/85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd","click":"https://apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","userdataApi":"//cdn.krxd.net/userdata/v1/segments/get","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","consent_get":"https://consumer.krxd.net/consent/get/85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd","consent_set":"https://consumer.krxd.net/consent/set/85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd","is_optout":"https://beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","portability":"https://consumer.krxd.net/consumer/portability/85fe7d9b-e39e-4dc7-95ff-4060f3ac76bd","set_optin":"https://consumer.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"experiments":[],"site":{"name":"Stat News","cap":255,"id":1660584,"organization_id":3125,"uid":"snn57lx3a"},"tags":[{"id":36427,"name":"StatNews DTC","content":"<script>\n(function() {\n    /* Selective Attribute DataLayer Library Tag */\n    var _, allAttr, allowedList, attr, attributes, dataLayerIngester, dataObj,\n        isAllowed, keepCase, libUtil, omitKeys, pageAttr, prefix, toSet, trim,\n        userAttr, util, value,\n        hasProp = {}.hasOwnProperty;\n    _ = Krux('require:underscore');\n    util = Krux('require:util');\n    libUtil = Krux('require:util.library-tag');\n    dataLayerIngester = Krux('require:scrape').ingestDataLayer;\n\n    /* Safe copy of dataLayer object */\n    dataObj = Krux('scrape.javascript', 'window.s');\n\n    /* String trimming helper function */\n    trim = function(attr) {\n        return (\"\" + attr).replace(/^\\s+|\\s+$/g, '');\n    };\n\n    /* Attribute configs */\n    pageAttr = _.map('prop7,evar18'.split(','), trim);\n    userAttr = _.map('prop10,prop4,prop5'.split(','), trim);\n\n    /* Create a array of attributes striping any empty strings */\n    allAttr = _.without(pageAttr.concat(userAttr), '');\n\n    /* Configuration settings */\n    keepCase = 'undefined' === 'true';\n    omitKeys = 'undefined'.split(',');\n\n    /* Resolve Prefix */\n    prefix = libUtil.resolvePrefix('text', 'statnews',\n        'undefined');\n\n    /* Function to varify if attribute should be used */\n    isAllowed = function(value, whitelist) {\n        var i, len, str, x;\n        str = \"\" + value;\n        if (!((value != null) && str.length > 0)) {\n            return false;\n        }\n        for (i = 0, len = whitelist.length; i < len; i++) {\n            x = whitelist[i];\n            if (value.match(x) != null) {\n                return true;\n            }\n        }\n        return false;\n    };\n\n    /* Get a full list of attributes usting the dataLayer tool */\n    attributes = dataLayerIngester(dataObj, {\n        omitKeys: libUtil.removeFalsyStrings(omitKeys.concat(libUtil.EXCLUDE_KEYS_CONFIG)),\n        omitValues: libUtil.EXCLUDE_VALUES_CONFIG,\n        caseSensitive: keepCase,\n        useFullPath: 'undefined' === 'true',\n        useLastValue: 'undefined' === 'true',\n        customDelimited: [/./],\n        altDelimiter: ',',\n        userKeys: _.map(userAttr, function(exp) {\n            return new RegExp(\"(^|\\\\.)\" + exp + \"$\");\n        }),\n        optimizeNames: true\n    });\n\n    /* Only set Attributes in the allowed list */\n    allowedList = _.map(allAttr, function(name) {\n        return new RegExp(\"(_attr_|_attr_\" + prefix + \"|\\\\.)\" + (keepCase ?\n            name : libUtil.normalizeAttrName(name, {\n                removeDot: false\n            })) + \"$\");\n    });\n    toSet = {};\n    for (attr in attributes) {\n        if (!hasProp.call(attributes, attr)) continue;\n        value = attributes[attr];\n        if (isAllowed(attr, allowedList)) {\n            toSet[attr] = value;\n        }\n    }\n    toSet = Krux('prefix:attr', toSet, prefix);\n    Krux('set', toSet);\n}).call();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true}],"usermatch_tags":[{"id":6,"name":"Google User Match","content":"<script>\n(function() {\n  if (Krux('get', 'user') != null) {\n      new Image().src = 'https://usermatch.krxd.net/um/v2?partner=google';\n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":21,"name":"Acxiom","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;      \n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":23,"name":"BlueKai S2S","content":"<script>\r\n    (function() {\r\n        var kuid = Krux('get', 'user');\r\n        if (kuid) {\r\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\r\n            var bk_prefix = location.protocol == 'https:' ? \"stags\" : \"tags\";\r\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&partner=bluekai&bk_uuid=$_BK_UUID\");\r\n            var kurl = prefix + \"//beacon.krxd.net/usermatch.gif?\" + kurl_params;\r\n            var bk_params = 'id=' + kuid;\r\n            var bk_url = '//' + bk_prefix + '.bluekai.com/site/26357?' + bk_params + '&redir=' + kurl;\r\n            var i = new Image();\r\n            i.src = bk_url;\r\n        }\r\n    })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":34,"name":"Comscore Data Tag","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  var cbust = Math.round(new Date().getTime() / 1000);\r\n  var prefix = location.protocol == 'https:' ? \"https:\" :\"http:\";\r\n  var url = prefix == 'https:' ? '//sb.scorecardresearch.com/p' : '//b.scorecardresearch.com/p';\r\n  if (kuid) {\r\n    Krux('require:http').pixel({\r\n      url: url,\r\n      data: {\r\n          c1: '9',\r\n          c2: '8188709',\r\n          cs_xi: kuid,\r\n          rn: cbust\r\n      }});\r\n  }\r\n  })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":71,"name":"AppNexus Connect","content":"<script>\r\n(function(){\r\n        var kuid = Krux('get', 'user');\r\n        if (kuid) {\r\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\r\n            var kurl = prefix + '//beacon.krxd.net/usermatch.gif?adnxs_uid=$UID';\r\n            var appnexus_url = '//ib.adnxs.com/getuid?' + kurl\r\n            var i = new Image();\r\n            i.src = appnexus_url;\r\n        }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":76,"name":"LiveRamp User Matching","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\r\n      var i = new Image();\r\n      i.src = liveramp_url;     \r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":7,"name":"OpenX User Match","content":"<script>\n\n(function(){\n    var prefix = location.protocol == 'https:' ? 'https:' : 'http:' ;\n    var match_pixel = prefix + '//u.openx.net/w/1.0/cm?id=b53b3de0-a5e8-47e3-a78f-ca218d037abe&r=' + prefix + '//beacon.krxd.net/usermatch.gif?partner=openx&partner_uid=';\n    (new Image()).src = match_pixel;\n})();\n\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":2,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":10,"name":"Rubicon User Match","content":"<script>\r\n(function(){\r\n  if (window.Krux) {\r\n    var kuid = window.Krux('get', 'user');\r\n    if (kuid && typeof kuid != 'undefined') {\r\n       var rubicon_url = 'https://token.rubiconproject.com/token?pid=27384&puid=' + kuid;\r\n       var i = new Image();\r\n       i.src = rubicon_url;\r\n    }\r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":2,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":31,"name":"Simpli.fi user match","content":"<script>\n(function(){\n\n   var kuid = Krux('get', 'user');\n   if (kuid) {\n      new Image().src = 'https://um.simpli.fi/match_redirect?sifi_redir=%2F%2Fbeacon.krxd.net%2Fusermatch.gif%3Fpartner%3Dsimplifi%26partner_uid%3D%24UID';\n   }\n\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":55,"name":"Acxiom APAC Usermatch","content":"<script>\r\n(function(){\r\n\tvar liveramp_url = '//s.acxiomapac.com/sci',\r\n\tdata = {\r\n\t\tpid: 90010,\r\n\t\tuid: Krux('get','user')\r\n\t};\r\n\tif(data.uid){\r\n\t\tKrux('require:http').pixel({\r\n\t\t\turl: liveramp_url,\r\n\t\t\tdata: data\r\n\t\t});\r\n\t}\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true}],"link":{"adslots":{},"bidders":{}}};
  
  for (var i = 0, tags = config.tags, len = tags.length, tag; (tag = tags[i]); ++i) {
    if (String(tag.id) in cs) {
      tag.content = cs[tag.id];
    }
  }

  
  var esiGeo = String(function(){/*
   <esi:include src="/geoip_esi"/>
  */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

  if (esiGeo) {
    log('Got a request for:', esiGeo, 'adding geo to config.');
    try {
      config.geo = w.JSON.parse(esiGeo);
    } catch (__) {
      
      log('Unable to parse geo from:', config.geo);
      config.geo = {};
    }
  }



  var proxy = (window.Krux && window.Krux.q && window.Krux.q[0] && window.Krux.q[0][0] === 'proxy');

  if (!proxy || true) {
    

  load('//cdn.krxd.net/ctjs/controltag.js.f0b61617fbc713883207cc130147aee2', function() {
    log('Loaded stable controltag resource');
    Krux('config', config);
  });

  }

})(window, (function() {
  var obj = {};
  
  return obj;
})());
