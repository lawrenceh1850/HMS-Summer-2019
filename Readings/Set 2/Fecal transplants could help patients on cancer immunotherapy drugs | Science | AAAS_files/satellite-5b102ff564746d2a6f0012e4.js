_satellite.pushAsyncScript(function(event, target, $variables){
  tp = window.tp || []
tp.push(['init', function() {
  
  	tp.myaccount.show({
        displayMode: "inline",
        containerSelector: "#piano-my-account"
   })
  
    // Password can be reset only if user is anonymous
    if (!tp.user.isUserValid()) {
        // If URL has reset_token parameter
        var tokenMatch = location.search.match(/reset_token=([A-Za-z0-9]+)/);
        if (tokenMatch) {
            // Get value of the token
            var token = tokenMatch[1];
            // Present password reset form with the found token
            tp.pianoId.show({
                'resetPasswordToken': token, loggedIn: function () {
                    // Once user logs in - refresh the page
                    location.reload();
                }
            });
        }
    }
}])

});
