var testBugMinHeight = function() {
  var doc = document,
      docelement = doc.documentElement,
      testbody = doc.createElement('body'),
      testdiv = doc.createElement('div'),
      height;

    testdiv.style.position = 'absolute';
    testdiv.style.top = '-500px';
    testdiv.style.WebkitBoxSizing = 'border-box';    
       testdiv.style.MozBoxSizing = 'border-box';
         testdiv.style.OBoxSizing = 'border-box';
          testdiv.style.boxSizing = 'border-box';
    testdiv.style.minHeight = '10px';
    testdiv.style.paddingTop = '1px';
    
    testbody.appendChild(testdiv);
    docelement.appendChild(testbody);
    if (testdiv.scrollHeight == 11) docelement.className += ' minHeightBug';  
    testbody.parentNode.removeChild(testbody);
};
testBugMinHeight();