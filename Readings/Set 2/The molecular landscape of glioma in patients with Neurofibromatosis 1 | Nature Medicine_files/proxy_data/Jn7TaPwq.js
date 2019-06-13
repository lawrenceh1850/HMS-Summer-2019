



/* ControlTag Loader for Macmillan bd339c69-af54-4a21-b4f1-654bcfcd83ca */
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

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.41.3","schema_version":3},"confid":"Jn7TaPwq","context_terms":[{"id":"Km_1GEmA","value":"Rat"},{"id":"LfMtZHPp","value":"Adeno-associated virus"},{"id":"Km_1F0CV","value":"Laser spectroscopy"},{"id":"K4WALO1h","value":"Maglignant fibrous hystiocytoma"},{"id":"Km_1F6v1","value":"Microscopy techniques"},{"id":"Km_1GLlo","value":"Single-channel recording"},{"id":"Km_1GWnZ","value":"Zebrafish"},{"id":"Km_1Fw3T","value":"High-throughput screening assays"},{"id":"Km_1FdNA","value":"Caenorhabditis elegans"},{"id":"Km_1FlxO","value":"Electron microscopy"},{"id":"K4WALPje","value":"Liposarcoma"},{"id":"Km_1Frc6","value":"Functional magnetic resonance imaging"},{"id":"Km_1GSuX","value":"Transgenic mice"},{"id":"Kn-4VUxJ","value":"Single molecule biophysics"},{"id":"K4WALStY","value":"chondrosarcoma"},{"id":"Km_1F4TF","value":"Microarray analysis"},{"id":"Km_1Fhvf","value":"Cytokines"},{"id":"Km_1GAuC","value":"Positron-emission tomography"},{"id":"Km_1FbMO","value":"Bioluminescence imaging"},{"id":"K4WALYe1","value":"Gemcitabine sarcomas"},{"id":"Km_1GHr1","value":"RNAi"},{"id":"Km_1FauR","value":"Atomic force microscopy"},{"id":"Km_1F1xV","value":"Mass spectrometry"},{"id":"K4WALXQx","value":"Pax3 / Pax7 & forkhead transcription factor"},{"id":"Km_1Fj43","value":"Electrical measurements"},{"id":"Km_1GNJB","value":"Spectroscopy"},{"id":"Km_1FpxU","value":"Fluorescence resonance energy transfer"},{"id":"K4WALQwH","value":"Hemangiosarcoma"},{"id":"Km_1FyMv","value":"Immunohistochemistry"},{"id":"Km_1Fcuf","value":"Biosensing techniques"},{"id":"Km_1GF1m","value":"Reverse transcription polymerase chain reaction"},{"id":"Km_1Ff_l","value":"Computational chemistry"},{"id":"Km_1GJjr","value":"Scanning transmission electron microscopy"},{"id":"Km_1F9IN","value":"NMR spectroscopy"},{"id":"K4WALVSG","value":"mesenchymal origin malignant tumours"},{"id":"Km_1GPi5","value":"Surface patterning"},{"id":"K4WALPNA","value":"Dermatofibrosarcoma"},{"id":"Km_1Fnn4","value":"Experimental organisms"},{"id":"Km_1Ffe-","value":"Chromatography"},{"id":"Kn-4VV8b","value":"Super resolution microscopy"},{"id":"Km_1FiOf","value":"DNA isolation and purification"},{"id":"Kn-4VVHr","value":"Optical tweezers"},{"id":"Km_1GMhS","value":"Software"},{"id":"Km_1GRjJ","value":"Tissue engineering"},{"id":"Km_1GJ-h","value":"Scanning tunnelling microscopy"},{"id":"Km_1GBdl","value":"Protein array analysis"},{"id":"Km_1FwXt","value":"High-throughput screening"},{"id":"Km_1F2Ze","value":"Materials characterization"},{"id":"Km_1GTOZ","value":"Transmission electron microscopy"},{"id":"Km_1GWJZ","value":"Xenopus"},{"id":"LfMtZGju","value":"﻿AAV"},{"id":"K4WALY2f","value":"Imatinib sarcomas"},{"id":"Km_1FdvJ","value":"Cell/tissue technologies"},{"id":"Km_1FsKf","value":"Gene expression analysis"},{"id":"Km_1F6Ey","value":"Microscopy"},{"id":"Km_1GIR7","value":"Scanning electron microscopy"},{"id":"Km_1Ftwk","value":"Gene targeting"},{"id":"K4WALZN8","value":"CRISPR"},{"id":"Km_1GQ_q","value":"Tissue culture"},{"id":"K4WALR9Y","value":"Synovial sarcoma"},{"id":"Km_1F8dk","value":"Mutagenesis"},{"id":"Km_1FnEl","value":"Ellipsometry"},{"id":"Km_1GO-M","value":"Structural biology"},{"id":"K4WALTII","value":"mesenchymal cell type"},{"id":"K4WALU5D","value":"sarcoma x5"},{"id":"Km_1GD9E","value":"Raman spectroscopy"},{"id":"Km_1FpJu","value":"Fluorescence in situ hybridization"},{"id":"Km_1F_Ev","value":"Patch clamp"},{"id":"Km_1FcHv","value":"Biophysical methods"},{"id":"Km_1Fol2","value":"Flow cytometry"},{"id":"K4WALVpu","value":"angiogenesis sarcomas"},{"id":"Km_1GJAU","value":"Scanning probe microscopy"},{"id":"Km_1FeRj","value":"Cellular imaging"},{"id":"Kn-4VVer","value":"CRISPR – CAS systems"},{"id":"Km_1FuTf","value":"Gene transfer"},{"id":"Km_1F3MR","value":"Mathematical techniques"},{"id":"Km_1GVnF","value":"X-ray photoelectron spectroscopy"},{"id":"Km_1GKaw","value":"Signal transduction"},{"id":"Km_1GB6I","value":"Protein expression"},{"id":"Km_1Fv3_","value":"Genomic analysis"},{"id":"K4WALXo8","value":"PDGF & sarcomas"},{"id":"Km_1Fkoi","value":"Electrocardiography – EKG"},{"id":"K4WALQTF","value":"Leiomyosarcoma"},{"id":"Km_1GTt1","value":"Two-hybrid system"},{"id":"Km_1GDat","value":"Protein techniques"},{"id":"Km_1F1Pc","value":"Magnetic resonance imaging"},{"id":"Km_1FixU","value":"DNA sequencing"},{"id":"Km_1FaPh","value":"Apoptosis"},{"id":"Km_1F_pZ","value":"PCR-based techniques"},{"id":"K4WALRej","value":"Lymphangiosarcoma"},{"id":"Km_1Fbmu","value":"Biomolecular nuclear magnetic resonance"},{"id":"Km_1GHEx","value":"RNA sequencing"},{"id":"Km_1FhHw","value":"Confocal microscopy"},{"id":"Km_1GOab","value":"Stem cells"},{"id":"Km_1F43q","value":"Microfluidics"},{"id":"Km_1FmVy","value":"Electrophoresis"},{"id":"Km_1FzWc","value":"Laboratory automation"},{"id":"K4WALTgz","value":"Gastrointestinal stomal tumors"},{"id":"LfMtZHnC","value":"Adenovirus"},{"id":"Km_1F0y0","value":"Lithography"},{"id":"Km_1F75e","value":"Multiphoton microscopy"},{"id":"Km_1GMBc","value":"Small molecule library"},{"id":"K4WALUbL","value":"soft tissue cancer"},{"id":"Km_1F7VN","value":"Mouse"},{"id":"Km_1FoFy","value":"Field potential recordings"},{"id":"Km_1F3rt","value":"Medical and small animal imaging"},{"id":"Km_1GUTJ","value":"Vacuum and cryogenics"},{"id":"Km_1GU7D","value":"X-ray diffraction"},{"id":"K4WALWVg","value":"tumor-stroma interplays"},{"id":"K4WALOKh","value":"soft-tissue sarcoma Fibrosarcoma"},{"id":"Km_1F-fq","value":"Optical techniques"},{"id":"Km_1FlLX","value":"Electroencephalography – EEG"},{"id":"K4WALP8i","value":"Rhabdomyosarcoma"},{"id":"Km_1Fq4j","value":"Fluorescent proteins"},{"id":"Km_1GK_5","value":"Signal transduction techniques"},{"id":"Km_1GCY5","value":"Protein purification"},{"id":"Km_1Fuy_","value":"Genetic vectors"},{"id":"Km_1FjVo","value":"Drosophila"},{"id":"Km_1GN6k","value":"Statistical techniques"},{"id":"Km_1GQlW","value":"Tissue array analysis"},{"id":"K4WALYBr","value":"Pazopanib sarcomas"},{"id":"K4WALSVo","value":"Neurofibrosarcoma"},{"id":"Km_1FtNU","value":"Gene library"},{"id":"Km_1GC8A","value":"Protein sequencing"},{"id":"Km_1GAJi","value":"Peptide library"},{"id":"Km_1FsnP","value":"Gene expression profiling"},{"id":"Km_1FvWA","value":"Genome-wide association studies"},{"id":"Km_1Fywg","value":"Interference microscopy"},{"id":"K4WALWwG","value":"c-kit mutations sarcomas"},{"id":"Km_1GQJf","value":"Surface plasmon resonance"},{"id":"Km_1Fgdr","value":"Computational techniques"},{"id":"Km_1F99y","value":"Nucleic acid labelling and detection"},{"id":"Km_1GGb-","value":"RNA isolation and purification"},{"id":"Km_1GFNi","value":"Remote sensing"},{"id":"K4WALT7h","value":"sarcoma"},{"id":"Km_1FqYb","value":"Fluorescent dyes"},{"id":"Km_1FZtw","value":"Antibodies"},{"id":"Km_1Fxgt","value":"Imaging techniques"},{"id":"Km_1GSFB","value":"Transfection"},{"id":"K4WALRGZ","value":"Kaposi's sarcoma"},{"id":"Km_1Feyx","value":"Chromatin immunoprecipitation"}],"publisher":{"name":"Macmillan","active":true,"uuid":"bd339c69-af54-4a21-b4f1-654bcfcd83ca","version_bucket":"stable","id":1980},"params":{"first_party_dmp_managed":false,"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"first_party_cookie_enhancements":false,"control_tag_pixel_throttle":100,"fingerprint":true,"optout_button_optout_text":"Browser Opt Out","user_data_timing":"load","consent_active":true,"use_central_usermatch":true,"store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","optout_button_optin_text":"Browser Opt In","first_party_uid":true,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"no_pii":false,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":true,"context_terms":true,"optout_button_id":"kx-optout-button","user_id_cookie":"kppid","dfp_premium":true,"control_tag_namespace":"macmillan"},"prioritized_segments":[],"realtime_segments":[{"id":"sd26mhtm1","test":["and",["and",["or",["intersects","$page_attr_keywords:,",["\"giant panda\""]]]]]}],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"https://connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"https://consumer.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"https://link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"https://usermatch.krxd.net/um/v2","controltag":"//cdn.krxd.net/ctjs/controltag.js.{hash}","loopback":"https://consumer.krxd.net/consumer/tmp_cookie","remove":"https://consumer.krxd.net/consumer/remove/bd339c69-af54-4a21-b4f1-654bcfcd83ca","click":"https://apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","userdataApi":"//cdn.krxd.net/userdata/v1/segments/get","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","consent_get":"https://consumer.krxd.net/consent/get/bd339c69-af54-4a21-b4f1-654bcfcd83ca","consent_set":"https://consumer.krxd.net/consent/set/bd339c69-af54-4a21-b4f1-654bcfcd83ca","is_optout":"https://beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","portability":"https://consumer.krxd.net/consumer/portability/bd339c69-af54-4a21-b4f1-654bcfcd83ca","set_optin":"https://consumer.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"experiments":[],"site":{"name":"Nature","cap":255,"id":1358509,"organization_id":1980,"uid":"Jn7TaPwq"},"tags":[{"id":20636,"name":"Technographic Data provider tag","content":"<script>\r\n// this tag is intentionally blank\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]],"collects_data":true},{"id":20637,"name":"Krux Geographic Data provider tag","content":"","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]],"collects_data":true},{"id":20638,"name":"Acxiom provider tag","content":"","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]],"collects_data":true},{"id":20641,"name":"Nature_DTC-New","content":"<script>\n(function() {\n\n    var pageMetaData = window._pageMetaData;\n    Krux('scrape', {\n        'page_attr_nature_url_path_1': {\n            'url_path': '1'\n        },\n        'page_attr_nature_url_path_2': {\n            'url_path': '2'\n        },\n        'page_attr_nature_url_path_3': {\n            'url_path': '3'\n        },\n        'page_attr_nature_product_name': {\n            'js_global': '_pageMetaData.product_name'\n        },\n        'page_attr_nature_site_id': {\n            'js_global': '_pageMetaData.site_id'\n        },\n        'page_attr_nature_site_id_name': {\n            'js_global': '_pageMetaData.site_id_name'\n        }\n    });\n    if (Krux('get', 'page_attr_nature_site_id') && Krux('get', 'page_attr_nature_site_id').length > 1) {\n        Krux('set', 'user_attr_nature_site_account_user', 'true');\n    } else {\n        Krux('set', 'user_attr_nature_site_account_user', 'false');\n    }\n\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":20647,"name":"Nature Articles","content":"<script>\n(function() {\n\n    Krux('scrape', {\n        'page_attr_Citation_Title': {\n            'js_global': '_pageMetaData.citation_title'\n        },\n        'page_attr_Citation_DOI': {\n            'js_global': '_pageMetaData.citation_doi'\n        },\n        'page_attr_Citation_Publication_Date': {\n            'js_global': '_pageMetaData.citation_publication_date'\n        },\n        'page_attr_Citation_Author': {\n            'js_global': '_pageMetaData.citation_author'\n        }\n    });\n\n    if (window._pageMetaData && window._pageMetaData[\"WT.cg_s\"]) {\n        Krux('set', 'page_attr_Article_Type', _pageMetaData[\"WT.cg_s\"]);\n\n    } else if (window._pageMetaData && window._pageMetaData[\"prism.section\"]) {\n        Krux('set', 'page_attr_Article_Type', _pageMetaData[\"prism.section\"]);\n    }\n\n    if (window._pageMetaData && window._pageMetaData.access === 'No') {\n        Krux('set', 'user_attr_Access_Denied', _pageMetaData.product_name);\n    }\n\n    if (window._pageMetaData && window._pageMetaData[\"WT.z_subject_term\"]) {\n        Krux('set', 'page_attr_Article_Keywords', _pageMetaData[\"WT.z_subject_term\"]);\n    } else if (window._pageMetaData && window._pageMetaData.keywords) {\n        Krux('scrape', {\n            'page_attr_Article_Keywords': {\n                'js_global': '_pageMetaData.keywords'\n            }\n        });\n    } else {\n        Krux('scrape', {\n            'page_attr_Article_Keywords': {\n                meta_name: 'keywords'\n            }\n        });\n    }\n\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":20648,"name":"Nature Jobs","content":"<script>\n(function() {\n\n    // Using Meta DCSext.job_id to produce page attribute dcsext_job_id\n    Krux('scrape', {\n        'page_attr_Job_ID': {\n            meta_name: 'DCSext.job_id'\n        },\n        'page_attr_Employer_ID': {\n            meta_name: 'DCSext.employer_id'\n        },\n        'page_attr_Job_Employer': {\n            meta_name: 'Job Employer'\n        },\n        'page_attr_Job_Type': {\n            meta_name: 'Job Type'\n        }\n    });\n\n    var job_location = Krux('scrape', {\n        'page_attr_Job_Location': {\n            meta_name: 'Job Location'\n        }\n    });\n    // meta attribute Job Location is always in format \"city, country\"; client only wants to ingest country\n    if (job_location && job_location.page_attr_Job_Location && job_location.page_attr_Job_Location.split(',')[1]) Krux('set', 'page_attr_Job_Location', job_location.page_attr_Job_Location.split(',')[1].trim());\n\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":20651,"name":"Krux Track Social","content":"<script type=\"text/javascript\">Krux('social.init');</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":20655,"name":"Nature Jobs Keywords","content":"<script>\n(function(){\n\tvar domain, path1, path2, key1, key2;\n\tvar href = window.location.href;\n\t// pull in domain name\n\tdomain = Krux('get', 'domain');\n\t// pull in path 1 & 2 of domain\n\tpath1 = Krux('scrape.url_path' , '1');\n\tpath2 = Krux('scrape.url_path' , '2');\n\t// only if domain is 'www.naturejobs.com'\n\tif (domain.match(/www\\.nature\\.com/g)){\n\t\t// and if both url path 1 is 'naturejobs' and url path 2 is 'science'\n\t\tif (path1.match(/naturejobs/g) && path2.match(/science/g)){\n\t\t\t// scrape keywords as naturejobs attributes\n\t\t\tKrux('scrape',{\n\t\t\t\t'page_attr_naturejobs_what':{'url_param':'q'},\n\t\t\t\t'page_attr_naturejobs_where':{'url_param':'where'}\n\t\t\t});\n\t\t}\n\t}\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":36836,"name":"Nature (new DL)","content":"<script>\n(function() {\n    /* Selective Attribute DataLayer Library Tag */\n    var _, allAttr, allowedList, attr, attributes, dataLayerIngester, dataObj,\n        isAllowed, keepCase, libUtil, omitKeys, pageAttr, prefix, toSet, trim,\n        userAttr, util, value,\n        hasProp = {}.hasOwnProperty;\n    _ = Krux('require:underscore');\n    util = Krux('require:util');\n    libUtil = Krux('require:util.library-tag');\n    dataLayerIngester = Krux('require:scrape').ingestDataLayer;\n\n    /* Safe copy of dataLayer object */\n    dataObj = Krux('scrape.javascript', 'dataLayer');\n\n    /* String trimming helper function */\n    trim = function(attr) {\n        return (\"\" + attr).replace(/^\\s+|\\s+$/g, '');\n    };\n\n    /* Attribute configs */\n    pageAttr = _.map('content.authorization.status,content.category.legacy.webtrendsSubjectTerms,content.category.contentType,content.contentInfo.authors,content.article.doi,content.contentInfo.publishedAtString,content.contentInfo.title,content.category.journal.title,page.category.pageType,page.attributes.template,window.location.pathname,window.location.pathname,window.location.pathname,content.jobs.jobTitle,content.jobs.jobLocation,content.jobs.employer,content.category.journal.title,content.journal.title'.split(','), trim);\n    userAttr = _.map('user.profile.profileInfo.bpid,segment.registeredUser,gaClientId'.split(','), trim);\n\n    /* Create a array of attributes striping any empty strings */\n    allAttr = _.without(pageAttr.concat(userAttr), '');\n\n    /* Configuration settings */\n    keepCase = 'false' === 'true';\n    omitKeys = 'none'.split(',');\n\n    /* Resolve Prefix */\n    prefix = libUtil.resolvePrefix('text', 'new_dl_',\n        'undefined');\n\n    /* Function to varify if attribute should be used */\n    isAllowed = function(value, whitelist) {\n        var i, len, str, x;\n        str = \"\" + value;\n        if (!((value != null) && str.length > 0)) {\n            return false;\n        }\n        for (i = 0, len = whitelist.length; i < len; i++) {\n            x = whitelist[i];\n            if (value.match(x) != null) {\n                return true;\n            }\n        }\n        return false;\n    };\n\n    /* Get a full list of attributes usting the dataLayer tool */\n    attributes = dataLayerIngester(dataObj, {\n        omitKeys: libUtil.removeFalsyStrings(omitKeys.concat(libUtil.EXCLUDE_KEYS_CONFIG)),\n        omitValues: libUtil.EXCLUDE_VALUES_CONFIG,\n        caseSensitive: keepCase,\n        useFullPath: 'true' === 'true',\n        useLastValue: 'false' === 'true',\n        customDelimited: [/./],\n        altDelimiter: ',',\n        userKeys: _.map(userAttr, function(exp) {\n            return new RegExp(\"(^|\\\\.)\" + exp + \"$\");\n        }),\n        optimizeNames: true\n    });\n\n    /* Only set Attributes in the allowed list */\n    allowedList = _.map(allAttr, function(name) {\n        return new RegExp(\"(_attr_|_attr_\" + prefix + \"|\\\\.)\" + (keepCase ?\n            name : libUtil.normalizeAttrName(name, {\n                removeDot: false\n            })) + \"$\");\n    });\n    toSet = {};\n    for (attr in attributes) {\n        if (!hasProp.call(attributes, attr)) continue;\n        value = attributes[attr];\n        if (isAllowed(attr, allowedList)) {\n            toSet[attr] = value;\n        }\n    }\n    toSet = Krux('prefix:attr', toSet, prefix);\n    Krux('set', toSet);\n}).call();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":true,"internal":true,"criteria":[],"collects_data":true},{"id":38361,"name":"Nature_DTC-Original","content":"<script>\n\n(function() { \n\n\tvar pageMetaData = window._pageMetaData; \n\tKrux('scrape', { \n\t\t'page_attr_url_path_1': { \n\t\t\t'url_path': '1' \n\t\t}, \n\t\t'page_attr_url_path_2': { \n\t\t\t'url_path': '2' \n\t\t}, \n\t\t\t'page_attr_url_path_3': { \n\t\t\t\t'url_path': '3'\n\t\t}, \n\t\t\t'page_attr_product_name': { \n\t\t\t\t'js_global': '_pageMetaData.product_name'\n\t\t}, \n\t\t\t'page_attr_site_id': { \n\t\t\t\t'js_global': '_pageMetaData.site_id'\n\t\t}, \n\t\t\t'page_attr_site_id_name': { \n\t\t\t\t'js_global': '_pageMetaData.site_id_name' \n\t\t}, \n\t\t\t'user_attr_user_id': { 'js_global': '_pageMetaData.user_id' \n\t\t} \n\t}); \n\tif (Krux('get', 'page_attr_site_id') && Krux('get', 'page_attr_site_id').length > 1) \t{ \n\t\tKrux('set', 'user_attr_site_account_user', 'true'); \n\t} else { \n\t\tKrux('set', 'user_attr_site_account_user', 'false'); \n\t} \n})(); \n</script>","target":"","target_action":"append","timing":"onload","method":"document","priority":null,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true}],"usermatch_tags":[{"id":6,"name":"Google User Match","content":"<script>\n(function() {\n  if (Krux('get', 'user') != null) {\n      new Image().src = 'https://usermatch.krxd.net/um/v2?partner=google';\n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":1,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":10,"name":"Rubicon User Match","content":"<script>\r\n(function(){\r\n  if (window.Krux) {\r\n    var kuid = window.Krux('get', 'user');\r\n    if (kuid && typeof kuid != 'undefined') {\r\n       var rubicon_url = 'https://token.rubiconproject.com/token?pid=27384&puid=' + kuid;\r\n       var i = new Image();\r\n       i.src = rubicon_url;\r\n    }\r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":2,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true},{"id":81,"name":"Bombora","content":"<script>\n\n(function () {\n_ml = window._ml || {};\n_ml.pub = '748';\n_ml.redirect = '//beacon.krxd.net/usermatch.gif?partner=madisonlogic&partner_uid=[PersonID]';\nvar s = document.getElementsByTagName('script')[0], cd = new Date(), mltag = document.createElement('script');\nmltag.type = 'text/javascript'; mltag.async = true;\nmltag.src = '//ml314.com/tag.aspx?' + cd.getDate() + cd.getMonth() + cd.getFullYear();\ns.parentNode.insertBefore(mltag, s);\n})();\n\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","priority":3,"template_replacement":false,"internal":true,"criteria":[],"collects_data":true}],"link":{"adslots":{},"bidders":{}}};
  
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