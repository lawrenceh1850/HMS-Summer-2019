_satellite.pushBlockingScript(function(event, target, $variables){
  // Stop Ads!!
webmd.ads2.disableInitialLoad();
// If Ads have alreeady been stopped make sure they
// dont have access to the refresh to bring them back.
// We store it is a new key
webmd.ads2.refreshNew = webmd.ads2.refresh;
// Set current refresh function to empty function
webmd.ads2.refresh = function(){};
// New custom event to bring back Ads
$(window).on('webmd.gdpr.consent', function(){
	// Trigger refesh of Ads
	webmd.ads2.refreshNew();
	// Reset original refresh back to it's original
	// function incase other code is using it.
	webmd.ads2.refresh = webmd.ads2.refreshNew ;
});
});
