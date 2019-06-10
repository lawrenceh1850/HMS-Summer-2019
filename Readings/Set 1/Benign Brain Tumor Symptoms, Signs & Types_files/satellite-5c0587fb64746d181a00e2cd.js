_satellite.pushAsyncScript(function(event, target, $variables){
  var ooIbSiteName;
if(typeof window.s_site !== undefined){
  switch(window.s_site) {
    case 'medicinenet':
      ooIbSiteName = 'medicinenet.com';
      break;
    case 'emedicinehealth':
      ooIbSiteName = 'emedicinehealth.com';
      break;
    case 'rxlist':
      ooIbSiteName = 'rxlist.com';
      break;
    case 'onhealth':
      ooIbSiteName = 'onhealth.com';
      break;
    case 'qa00.medicinenet':
      ooIbSiteName = 'staging.medicinenet.com';
      break;
    case 'qa00.emedicinehealth':
      ooIbSiteName = 'staging.emedicinehealth.com';
      break;
    case 'qa00.rxlist':
      ooIbSiteName = 'staging.rxlist.com';
      break;
    case 'qa00.onhealth':
      ooIbSiteName = 'staging.onhealth.com';
      break;
  }
}
(function(src, config) {
  var script = document.createElement('script');
  script.onload = script.onreadystatechange = function(e) {
    var event = e || window.event;
    if (event.type === 'load' || /loaded|complete/.test(script.readyState) && document.documentMode <= 11) {
      script.onload = script.onreadystatechange = script.onerror = null;
      new IBTracker(config);
    }
  };
  script.onerror = function() {
    script.onload = script.onreadystatechange = script.onerror = null;
  };
  script.async = 1;
  script.src = src;
  script.setAttribute('crossorigin', 'anonymous');
  document.getElementsByTagName('head')[0].appendChild(script);
}('https://ibclick.stream/assets/js/track/dist/js/v1/tracker.min.js', {
site: ooIbSiteName,
vertical: 'health consumer',
autoPageViewTracking: true,
autoClickTracking: true,
snippetVersion: '1.2'
}));
});
