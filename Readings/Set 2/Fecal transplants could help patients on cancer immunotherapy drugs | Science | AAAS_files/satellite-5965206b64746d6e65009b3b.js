//console.log('hello box');
var hello_box = document.createElement("div");
hello_box.classList.add("layout-item", "box--standout");
hello_box.style.marginBottom = "30px";

var p1 = document.createTextNode("Enjoy reading News from ");
hello_box.appendChild(p1);

var c1 = document.createElement("cite");
var c1t = document.createTextNode("Science");
c1.appendChild(c1t);   
hello_box.appendChild(c1);

var p2 = document.createTextNode("? ");
hello_box.appendChild(p2);

var a1 = document.createElement("a");
a1.href = "//www.sciencemag.org/news/subscriptions";
var b1 = document.createElement("b");
var b1t = document.createTextNode("Subscribe today");
b1.appendChild(b1t);             
a1.appendChild(b1);   
hello_box.appendChild(a1);   
       
var div2 = document.createTextNode(". If you have already subscribed, log into your ");
hello_box.appendChild(div2);

var a2 = document.createElement("a");
a2.href = "//www.sciencemag.org/news/my-account" //removed the page element "paywall_hello_url" as it is no longer relevant;
var b2 = document.createElement("b");
var b2t = document.createTextNode("News account.");
b2.appendChild(b2t);             
a2.appendChild(b2);   
hello_box.appendChild(a2);

var paywall_div = document.getElementById('paywall-hello');
paywall_div.appendChild(hello_box); 
