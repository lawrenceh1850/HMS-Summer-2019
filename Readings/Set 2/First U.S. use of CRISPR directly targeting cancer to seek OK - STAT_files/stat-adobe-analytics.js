(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{0:function(e,t){e.exports=jQuery},84:function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),a=n.n(t),r=n(32),i=n.n(r),s=n(8),o=n.n(s);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){if(function(e){return void 0!==e.linkType&&"e"===e.linkType}(e))return e.linkTrackVars="None",e.linkTrackEvents="None",void function(e){!function(e){var t=a()(e.linkObject);if(!function(e,t){return"e"===e.linkType&&t.parent().parent().parent().hasClass("share")}(e,t))return;e.linkTrackVars="events,eVar15",e.linkTrackEvents="event25",e.events="event25",e.eVar15=v(t,!0)}(e)}(e);(function(e){return void 0!==e.linkType&&"o"===e.linkType})(e)||(function(e){if(!statGlobal.user||!statGlobal.user.getOrg())return;e.eVar26=e.prop7=statGlobal.user.getOrg()}(e),function(e){e.campaign||(e.campaign=e.Util.getQueryParam("camp"));e.campaign||(e.campaign=e.Util.getQueryParam("s_campaign"));e.campaign||(e.campaign=e.Util.getQueryParam("sms_cid"));e.campaign||(e.campaign=function(e){var t=e.Util.getQueryParam("utm_source"),n=e.Util.getQueryParam("utm_campaign"),a=e.Util.getQueryParam("utm_medium");if(t&&n&&a)return t+" | "+n+" | "+a;if(t&&n)return t+" | "+n;if(n)return n;return""}(e))}(e),function(e){e.prop37=e.getPreviousValue(e.pageName,"s_pv")}(e),function(e){e.prop37&&(e.prop36=e.getPercentPageViewed())}(e),function(e){e.prop43="D=g"}(e),function(e){e.prop10=e.getNewRepeat()}(e),function(e){e.eVar10=e.getNewRepeat()}(e),function(e){e.events=e.apl(e.events,"event2",",",1)}(e),function(e){"string"==typeof statGlobal.restricted&&(e.prop2=statGlobal.restricted?"y":"n")}(e),function(e){if(!statGlobal.user)return;e.prop4=statGlobal.user.getId()}(e),function(e){if(!statGlobal.user)return;e.eVar21=statGlobal.user.getId()}(e),function(e){if(!document.referrer||(t=document.referrer,n=new o.a(t),window.location.host===n.host()))return;var t,n;e.eVar25=document.referrer}(e),function(e){if(!statGlobal.user)return;var t=statGlobal.user.getIdToken(),n=t&&t.stat&&t.stat.subscription_status?t.stat.subscription_status:"";e.prop5=n}(e),function(e){e.pte="event91,event92,event93,event94,event95,event96,event97,event98,event99,event100",e.ptc=!1,e.prop37&&(e.eVar9=e.prop37,e.performanceTiming())}(e),function(e){if(!statGlobal.user||!statGlobal.user.getIdToken())return;var t=statGlobal.user.getIdToken();if(void 0===t.stat.customer_created)return;var n=i()(),a=i.a.unix(t.stat.customer_created),r=n.diff(a,"days");e.eVar23=r,e.eVar22=Math.floor(r/7)}(e))}function p(e){"undefined"!=typeof mc4wp&&mc4wp.forms.on("subscribed",function(t,n){!function(e,t,n){var r;e.linkTrackVars="events,eVar3,eVar4",void 0!==n.STAT_STEP_2_CONFIRMATION&&"1"===n.STAT_STEP_2_CONFIRMATION?(e.linkTrackEvents="event4",e.events="event4"):(e.linkTrackEvents="event3",e.events="event3");e.eVar3=t.name.toLowerCase(),e.eVar4=null,parseInt(statGlobal.mc4wpDefaultFormId,10)===t.id&&(r=a()(t.element).parent().parent().parent().attr("class"))&&(e.eVar4=r.split(" ")[0]);e.tl(!0,"o",e.pageName+" | newsletter signup | "+e.eVar3)}(e,t,n)}),a()(".read-more [data-post-id]").on("click",function(){return function(e,t){e.linkTrackVars="events,eVar5,eVar6",e.linkTrackEvents="event5",e.events="event5",e.eVar5=f(t.attr("href")),e.eVar6=function(e){var t=a()(".read-more [data-post-id]"),n=null;if(t.each(function(t,r){return e.data("post-id")!==a()(r).data("post-id")||(n=t,!1)}),null!==n)return n+1+" of "+t.length;return null}(t),u(e,t,e.pageName+" | read more | "+e.eVar5)}(e,a()(this)),!1}),a()(".teaser-wrap a.teaser").on("click",function(){return function(e,t){var n,r,i=a()("a.teaser").length;r=a()(".recirculation-trending").hasClass("is-active")?1:4;n=t.index()+r,e.linkTrackVars="events,eVar11,eVar12",e.linkTrackEvents="event8",e.events="event8",e.eVar11=f(t.attr("href")),e.eVar12=n+" of "+i,u(e,t,e.pageName+" | recirculation bar | "+e.eVar11)}(e,a()(this)),!1}),a()(".content-sidebar .post-widgets").on("click",".trending-posts a.article-list-link",function(){return function(e,t){var n,a,r;e.linkTrackVars="events,eVar13,eVar14",e.linkTrackEvents="event9",e.events="event9",e.eVar13=f(t.attr("href")),n=t.parent().parent().children().not(".sponsored"),a=n.index(t.parent())+1,r=n.length,e.eVar14=a+" of "+r,u(e,t,e.pageName+" | most popular widget | "+e.eVar13)}(e,a()(this)),!1}),a()("body").on("stat-modal-impression",function(t){!function(e,t){e.linkTrackVars="events,eVar16",e.linkTrackEvents="event10",e.events="event10",e.eVar16=t.modalCampaign,e.tl(!0,"o",e.pageName+" | modal impression | "+e.eVar16)}(e,t)}),a()("body").on("stat-paywall-modal-impression",function(t,n){!function(e,t,n){if(!n)return;e.linkTrackVars="events",e.linkTrackEvents="scOpen",e.events="scOpen",e.tl(!0,"o",e.pageName+" | paywall modal impression")}(e,0,n)}),a()("body").on("click","[data-stat-paywall-cta]",function(){return function(e,t){var n=function(e){var t=e.attr("data-stat-paywall-cta");t||(t=e.text().trim());return t}(t),r="modal"===t.attr("data-stat-login")||"modal"===t.attr("data-stat-subscribe");if(!n)return!0;if(e.linkTrackVars="events,eVar17",e.linkTrackEvents="event11",e.events="event11",e.eVar17=n,t.get(0)instanceof window.HTMLInputElement){var i=function(e){var t=e.parents("form").first(),n=document.createElement("a");if(!t.length||"GET"!==t.attr("method")||!t.attr("action"))return[];return n.href=t.attr("action")+"?"+t.serialize(),a()(n)}(t);i.length&&(t=i)}r?e.tl(!0,"o",e.pageName+" | paywall cta modal | "+e.eVar17.toLowerCase()):u(e,t,e.pageName+" | paywall cta | "+e.eVar17.toLowerCase());return!1}(e,a()(this))}),a()(".header-main").on("click","a.nav-item-content, a.cta-item-content",function(){return function(e,t){var n=t.parent(),a=v(t,!1);if(e.linkTrackVars="events,eVar7",e.linkTrackEvents="event6",e.events="event6",e.eVar7=a,n.hasClass("nav-parent")||n.hasClass("modal"))return e.tl(!0,"o",e.pageName+" | header menu click | "+e.eVar7),!0;return u(e,t,e.pageName+" | header menu click | "+e.eVar7),!1}(e,a()(this))}),a()(".footer").on("click","a.nav-item-content",function(){return function(e,t){var n=v(t,!1);return e.linkTrackVars="events,eVar8",e.linkTrackEvents="event7",e.events="event7",e.eVar8=n,u(e,t,e.pageName+" | footer menu click | "+e.eVar8),!1}(e,a()(this))}),a()(".content-sidebar .post-widgets").on("click",".evcal_list_a",function(){return function(e,t){e.linkTrackVars="events,eVar20",e.linkTrackEvents="event12",e.events="event12",e.eVar20=f(t.attr("href")),u(e,t,e.pageName+" | events widget | "+e.eVar20)}(e,a()(this)),!1})}function u(e,t,n){e.tl(t.get(0),"o",n,null,!0,1e3,"navigate")}function v(e,t){var n=e.text();return n||(n=e.attr("title")),n||(n=e.attr("href")),t&&(n=n.toLowerCase()),n.trim()}function f(e){var t;return e?(t=e.split("/"))[t.length-2]:""}window.statGlobal=window.statGlobal||{},window.statGlobal.analytics=window.statGlobal.analytics||{},statGlobal.analytics.initSCode=function(){var e;try{e=window.s_gi("nytstat,nytbgglobal")}catch(e){return!1}return"object"===c(e)&&(e.charSet="UTF-8",e.currencyCode="USD",e.trackDownloadLinks=!0,e.trackExternalLinks=!0,e.trackInlineStats=!0,e.linkDownloadFileTypes="exe,zip,wav,mp3,mp4,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx",e.linkInternalFilters="www.statnews.com,wordpress.boston.com,wp.stat.local,www-dev.statnews.com,www-qa.statnews.com",e.linkLeaveQueryString=!1,e.trackingServer="metrics.boston.com",e.trackingServerSecure="smetrics.boston.com",function(e){e.usePlugins=!0,e.doPlugins=l,e.getPreviousValue=new Function("v","c","el","var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}"),e.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a"),e.getPercentPageViewed=new Function("n","var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load','unload','scroll','resize','zoom','keyup','mouseup','touchend','orientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s.pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){var k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.split(',',10):[''],l=a.length,i;a[0]=unescape(a[0]);r=r||(n&&n!=a[0])||0;a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<10;i++)a[i]=!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a[9]='';if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=function(e){var W=window,D=document,B=D.body,E=D.documentElement,S=window.screen||0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWidth',Hc='clientHeight',C=100,M=Math,J='object',N='number',s=W.s_Obj||W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e=e.substring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.max(B[Hs]||E[Hs],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B[Wc]||0,Y=W.innerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height:0,r=M.round(C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)?M.abs(o)%180:Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),V=function(i,v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')||0;v=typeof v!=N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|iPad|iPhone)').exec(navigator.userAgent||'')&&o){o=x;x=y;y=o}o=o?'P':'L';a[9]=L?'':a[9].substring(0,1);s.c_w('s_ppv',escape(W.s_PPVid)+','+V(1,p,L)+','+(L||!V(2)?p:V(2))+','+V(3,b,L,1)+','+X+','+Y+','+x+','+y+','+r+','+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s_PPVt=setTimeout(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E.length;i++)if(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};var a=s.s_PPVg();return!n||n=='-'?a[1]:a"),e.getNewRepeat=new Function("d","cn","var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length==0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'New';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}"),e.apl=new Function("l","v","d","u","var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)l=l?l+d+v:v;return l"),e.performanceTiming=new Function("v","var s=this;if(v)s.ptv=v;if(typeof performance!='undefined'){if(performance.timing.loadEventEnd==0){s.pi=setInterval(function(){s.performanceWrite()},250);}if(!s.ptc||s.linkType=='e'){s.performanceRead();}else{s.rfe();s[s.ptv]='';}}"),e.performanceWrite=new Function("","var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi);try{if(s.c_r('s_ptc')==''&&performance.timing.loadEventEnd>0){try{var pt=performance.timing;var pta='';pta=s.performanceCheck(pt.fetchStart,pt.navigationStart);pta+='^^'+s.performanceCheck(pt.domainLookupStart,pt.fetchStart);pta+='^^'+s.performanceCheck(pt.domainLookupEnd,pt.domainLookupStart);pta+='^^'+s.performanceCheck(pt.connectEnd,pt.connectStart);pta+='^^'+s.performanceCheck(pt.responseStart,pt.connectEnd);pta+='^^'+s.performanceCheck(pt.responseEnd,pt.responseStart);pta+='^^'+s.performanceCheck(pt.loadEventStart,pt.domLoading);pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.loadEventStart);pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.navigationStart);s.c_w('s_ptc',pta);if(sessionStorage&&navigator.cookieEnabled&&s.ptv!='undefined'){var pe=performance.getEntries();var tempPe='';for(var i=0;i<pe.length;i++){tempPe+='!';tempPe+=pe[i].name.indexOf('?')>-1?pe[i].name.split('?')[0]:pe[i].name;tempPe+='|'+(Math.round(pe[i].startTime)/1000).toFixed(1)+'|'+(Math.round(pe[i].duration)/1000).toFixed(1)+'|'+pe[i].initiatorType;}sessionStorage.setItem('s_pec',tempPe);}}catch(err){return;}}}catch(err){return;}"),e.performanceCheck=new Function("a","b","if(a>=0&&b>=0){if((a-b)<60000&&((a-b)>=0)){return((a-b)/1000).toFixed(2);}else{return 600;}}"),e.performanceRead=new Function("","var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi);var cv=s.c_r('s_ptc');if(s.pte){var ela=s.pte.split(',');}if(cv!=''){var cva=s.split(cv,'^^');if(cva[1]!=''){for(var x=0;x<(ela.length-1);x++){s.events=s.apl(s.events,ela[x]+'='+cva[x],',',2);}}s.events=s.apl(s.events,ela[ela.length-1],',',2);}s.linkTrackEvents=s.apl(s.linkTrackEvents,s.pte,',',2);s.c_w('s_ptc','',0);if(sessionStorage&&navigator.cookieEnabled&&s.ptv!='undefined'){s[s.ptv]=sessionStorage.getItem('s_pec');sessionStorage.setItem('s_pec','',0);}else{s[s.ptv]='sessionStorage Unavailable';}s.ptc=true;"),e.rfe=new Function("","var s=this;var ea=s.split(s.events,',');var pta=s.split(s.pte,',');try{for(x in pta){s.events=s.rfl(s.events,pta[x]);s.contextData['events']=s.events;}}catch(e){return;}"),e.rfl=new Function("l","v","d1","d2","ku","var s=this,R=new Array(),C='',d1=!d1?',':d1,d2=!d2?',':d2,ku=!ku?0:1;if(!l)return'';L=l.split(d1);for(i=0;i<L.length;i++){if(L[i].indexOf(':')>-1){C=L[i].split(':');C[1]=C[0]+':'+C[1];L[i]=C[0];}if(L[i].indexOf('=')>-1){C=L[i].split('=');C[1]=C[0]+'='+C[1];L[i]=C[0];}if(L[i]!=v&&C)R.push(C[1]);else if(L[i]!=v)R.push(L[i]);else if(L[i]==v&&ku){ku=0;if(C)R.push(C[1]);else R.push(L[i]);}C='';}return s.join(R,{delim:d2})")}(e),e)},statGlobal.analytics.trackPurchases=function(t,n,a){return new e(function(e,r){try{var i=window.s;i.linkTrackVars="events,products,eVar18,eVar19",i.linkTrackEvents="purchase",i.events="purchase",i.products="Subscriptions;STAT Plus;1;"+n,i.eVar18=t,i.eVar19=(s=new Date(1e3*a)).getUTCMonth()+1+"/"+s.getUTCDate()+"/"+s.getUTCFullYear(),i.tl(!0,"o",i.pageName+" | purchase | "+i.eVar18,null,e)}catch(t){e()}var s})},statGlobal.analytics.trackNewsletterUpdate=function(){return new e(function(e,t){try{var n=window.s;n.linkTrackVars="events",n.linkTrackEvents="event14",n.events="event14",n.tl(!0,"o",n.pageName+" | newsletters updated",null,e)}catch(t){e()}})},document.addEventListener("DOMContentLoaded",function(){"object"===c(window.s)&&p(window.s)})}.call(this,n(19))}},[[84,0]]]);