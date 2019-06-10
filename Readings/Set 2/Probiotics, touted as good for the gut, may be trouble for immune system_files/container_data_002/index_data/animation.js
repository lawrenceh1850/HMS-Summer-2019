var frameDuration= 3;
var frameDurationLong= 4.5;
var animationDuration= .25;
var animationDurationLong= .5;
var animationSpacing= .25;
var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var text3 = document.getElementById("text3");
var button = document.getElementById("button");

var tl = new TimelineLite({paused:false});

tl.add("firstFrame", "+=" + animationSpacing)
.to(text1, animationDuration, {top:0, opacity:1}, "firstFrame")
.add("firstFrameComplete", "+=" + frameDuration)
.to(text1, animationDuration, {opacity:0}, "firstFrameComplete")
.to(text2, animationDuration, {top:0, opacity:1}, "+=" + animationSpacing)
.to(text2, animationDuration, {opacity:0}, "+=" + frameDurationLong)
.add("lastFrame", "+=" + animationSpacing)
.to(text3, animationDuration, {top:0, opacity:1}, "lastFrame")
.to(button, animationDurationLong, {top:0, left: 0, opacity:1}, "+=.25");

// Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, tl.play());

//plays timeline only when bannerContainer becomes visible
var observer = new MutationObserver(function() {
  tl.play()  
});

var target = document.getElementById('bannerContainer');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });