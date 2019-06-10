_satellite.pushAsyncScript(function(event, target, $variables){
  var insertChunk = function(source, target, runValidation) {

  var chunkData      = target + " data chunk",
      chunkTime      = target + " deposit time",
      request        = new XMLHttpRequest(),
      targetElement  = document.querySelector(target);
  
  request.open('GET', source, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400 && targetElement) {

      var responseChunk = request.responseText,
          storedTime    = localStorage.getItem(chunkTime),
          storedChunk   = localStorage.getItem(chunkData),
          timeNow       = (new Date()).getTime(),
          oneDayAgo     = timeNow - (1000 * 60 * 60 * 24);

      if ( storedTime  === null || storedChunk === null || oneDayAgo > storedTime || typeof localStorage.newsInterstitialV0815 === 'undefined') {

        localStorage.setItem(chunkData, responseChunk);
        localStorage.setItem(chunkTime, timeNow);
        localStorage.setItem('newsInterstitialV0815', 1);

        targetElement.insertAdjacentHTML("beforeend", responseChunk);
      } else {
        targetElement.insertAdjacentHTML("beforeend", storedChunk);
      }
			
      // Validation for newsletter form
      if (typeof runValidation !== 'undefined' && runValidation === 'true'){
        /* TF - Code to validate interstitial newsletter sign up form */
        // Global vars
        var editorialConsentId = 'interstitial-newsletter-consent-editorial';
        var editorialConsent = document.getElementById(editorialConsentId);
        var countryList = document.getElementById('interstitial-newsletter-country');
        var emailInput = document.getElementById('interstitial-newsletter-email');
        var submitBtn = document.getElementById('interstitial-newsletter-submit');

        // Function to set date/time for hidden fields for email consent
        function setConsentTime(id, timestamp){
          var hiddenFieldId = id + "-timestamp";
          var hiddenField = document.getElementById(hiddenFieldId);
          hiddenField.value = timestamp;
        }

        // Function to add leading zeros where needed in date/time
        function addLeadingZero(num){
          var ret = num.toString();
          ret = ret.length == 1 ? '0' + ret : ret;
          return ret;
        }

        // Function to get current date in UTC
        function getDate(){
          var currTime = new Date().getTime();

          var now = new Date(currTime);

          var hour = addLeadingZero((now.getUTCHours()).toString());
          var min = addLeadingZero(now.getUTCMinutes().toString());
          var sec = addLeadingZero(now.getUTCSeconds().toString());
          var month = addLeadingZero((now.getUTCMonth() + 1).toString());
          var day = addLeadingZero(now.getUTCDate().toString());

          var date = now.getUTCFullYear().toString() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

          return date;
        }

        // Check if country has been selected
        function checkCountrySelection(){
          if (countryList.value.length){
            return true;
            } else {
            return false;
            }
        }

        // Validate email address input
        function validateEmail(email) {
            var re = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+\.*/;
            return re.test(String(email).toLowerCase());
        }

        // Validate requires fields -- Email address and Country. Enable/disable submit button accordingly
        function validateReqFields(){
          if (!checkCountrySelection() || !validateEmail(emailInput.value)){
            submitBtn.setAttribute("disabled", true);
            } else {
              submitBtn.removeAttribute("disabled");
              // Set timestamp for editorial consent
            setConsentTime(editorialConsentId, getDate());
            }
        }

        // Run validateReqFields on email field keypress
        emailInput.addEventListener('keyup', function(){
          validateReqFields();
        })

        // Run validateReqFields on country select box change
        countryList.addEventListener('change', function(){
          validateReqFields();
        });

        // Disable button on page load since no selections will have been made
        validateReqFields();
        
      }
      
      // Inject Top text in form
			document.getElementById('interstitial-newsletter-text').innerHTML =_satellite.getVar('int_msg');
      
    } else {
      // We reached the server but couldn't find the source file or the target element is missing
      // Consider reporting errors via DTM
    }
  };

  request.onerror = function() {
    // There was a connection error while attempting to reach the server to fetch the source
  }
    request.send();
};

// Determine where to inject form html
var children = document.getElementsByClassName('article__body')[0].children;
var p_count = 1;

for(var i = 0; i < children.length; i++) {
  if(children[i].nodeName === "P") {
    if(p_count >= 3 && typeof p_index === "undefined") {
      if(children[i + 1].nodeName === "P") {
    		var p_index = i;        
      }
    }
    p_count++;
  }
}

if(typeof p_index !== "undefined") {
  var target = children[p_index];
  target.setAttribute("id", "interstitial-container");

  insertChunk("https://subscriptions.sciencemag.org/dtm/footer-newsletter-form/interstitial-news-form_081518_2.html", '#interstitial-container', "true");
}

});
