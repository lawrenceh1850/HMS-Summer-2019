(function(window, $) {
  window.AAAS = window.AAAS || {};

  window.AAAS.social = {
    /**
     * Bootstrap AddThis functionality for custom social share icons.
     * @param context: jQuery selection of content to apply functionality.
     * @param settings: Unused. Only added to match pattern from Drupal.attachBehavior
     */
    attach: function(context, settings) {
      if (window.addthis) {
        window.addthis.user.ready(function(data) {
          setupAddThis(window.addthis, context);
        });
      }
    }
  };

  var supportedSocialNetworks = ['facebook', 'twitter', 'linkedin', 'reddit', 'googleplus', 'pinterest'];

  /**
   * Initialize AddThis social counts on page.
   * @param addthis - Addthis global object. See http://www.addthis.com/academy/addthis-data-api/
   * @param context - DOM element that setup is focused on in page. Useful for AJAX-d content.
   */
  function setupAddThis(addthis, context) {
    var userServices = addthis.user.services().keys(addthis.DESC);
    var displayedServices = ['facebook', 'twitter'];

    userServices.forEach(function(service) {
      if (supportedSocialNetworks.indexOf(service) !== -1
        && displayedServices.indexOf(service) === -1
        && displayedServices.length < 4) {
        displayedServices.push(service);
      }
    });

    if (displayedServices.length < 4) {
      var additionalServices = ['reddit', 'linkedin'];
      additionalServices.forEach(function(service) {
        if (displayedServices.length < 4 && displayedServices.indexOf(service) === -1) {
          displayedServices.push(service);
        }
      });
    }

    $('.socialshares', context).each(function(i) {
      var $el = $(this),
          socialUrl = $el.data('social-url'),
          socialTitle = $el.data('social-title'),
          socialDescription = $el.data('social-description'),
          socialPubId = $el.data('social-pub-id');

      displayedServices.forEach(function(service) {
        var shareUrl = 'http://api.addthis.com/oexchange/0.8/forward/' + service + '/offer?url=' + socialUrl + '&title=' + encodeURIComponent(socialTitle) + '&description=' + encodeURIComponent(socialDescription) + '&pubid=' + socialPubId;
        $el.append(getShareIconMarkup(service, shareUrl));
      });

      addthis.sharecounters.getShareCounts(
        {
          service: ['facebook', 'reddit', 'linkedin'],
          countUrl: socialUrl
        },
        function(data) {
          data.forEach(function(serviceInfo) {
            var service = serviceInfo.service,
              count = serviceInfo.count,
              $countTarget = $el.find('.social__icon--' + service + ' + .social__count');

            if ($.isNumeric(count) && count > 0) {
              $countTarget
                .removeClass('social__count--empty')
                .html(formatCount(count));
            }
          });
        }
      );
    });
  }

  /**
   * Generate an individual share icon based on the service tag and share url.
   * @param service
   * @param url
   * @returns {*|HTMLElement}
   */
  function getShareIconMarkup(service, url) {
    var shareUrl = url;
    var $wrapper = $('<li>');
    var $link = $('<a><i class="fa ' + getFontAwesomeClass(service) + ' fa-lg"></i></a>')
      .attr({
        'href': shareUrl,
        'rel': 'nofollow',
        'class': 'social__icon social__icon--' + service
      });

    $link.find('i').after('<span class="sr-only">Share on ' + service + '</span>');

    $link.click(function(e) {
      e.stopPropagation();
      window.open($(this).attr('href'), 'sharewindow', "width=420,height=350,resizable,scrollbars=yes,status=1");
      return false;
    });

    $wrapper.append($($link));
    $wrapper.append('<span class="social__count social__count--empty">&nbsp;</span>');

    return $wrapper;
  }

  /**
   * Translate Addthis Service tag to font-awesome class name.
   * @param service
   * @returns {string}
   */
  function getFontAwesomeClass(service) {
    return (service === 'pinterest') ? 'fa-pinterest-p' : 'fa-' + service;
  }

  /**
   * Returns a count as a shortened version (10253 -> 10K)
   * @param count - Input count
   * @returns {string} - Formatted count
   */
  function formatCount(count) {
    var formatted = '&nbsp;';

    if ($.isNumeric(count)) {
      formatted = count;

      if (count > 1000000000000) {
        formatted = Math.round(count / 1000000000000) + 'T';
      }
      else if (count > 1000000000) {
        formatted = Math.round(count / 1000000000) + 'B';
      }
      else if (count > 1000000) {
        formatted = Math.round(count / 1000000) + 'M';
      }
      else if (count > 1000) {
        formatted = Math.round(count / 1000) + 'K';
      }
      else if (count <= 0) {
        formatted = '&nbsp;';
      }
    }

    return formatted;
  }

})(window, jQuery);
;/**/
(function ($) {
  Drupal.behaviors.aaasSocial = {
    attach: function (context, settings) {
      AAAS.social.attach(context, settings);
    }
  };
}(jQuery));
;/**/
// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.trigger('sticky-end', [s]).parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.trigger('sticky-start', [s]).parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i];
        if (typeof s.getWidthFrom !== 'undefined' && s.responsiveWidth === true) {
          s.stickyElement.css('width', $(s.getWidthFrom).width());
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom,
            responsiveWidth: o.responsiveWidth
          });
        });
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var unstickyElement = $(this);

          var removeIdx = -1;
          for (var i = 0; i < sticked.length; i++)
          {
            if (sticked[i].stickyElement.get(0) == unstickyElement.get(0))
            {
                removeIdx = i;
            }
          }
          if(removeIdx != -1)
          {
            sticked.splice(removeIdx,1);
            unstickyElement.unwrap();
            unstickyElement.removeAttr('style');
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }

  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);
;/**/
(function($) {

  $.fn.stickyHeader = function( options ) {

    var settings = $.extend({
      triggerElement  : '.contentbody',
      hiddenClass     : 'is-hidden',
      scrollOffset    : null,
      scrollInterval  : 250
    }, options);

    var $this = $(this);

    return this.each( function() {

      var scrolled = false;

      function sciScrollEvents() {
        scrolled = true;
      }

      $this.addClass(settings.hiddenClass);

      window.onscroll = sciScrollEvents;

      setInterval(function() {

        var contentTop = $(settings.triggerElement).offset().top - settings.scrollOffset - $(document).scrollTop();

        if (scrolled && contentTop < 0) {
          scrolled = false;

          $this.removeClass(settings.hiddenClass);
      }

      else if (scrolled && contentTop >= 0) {
        $this.addClass(settings.hiddenClass);
      }
    }, settings.scrollInterval);

    });

  };

}(jQuery));
;/**/
(function($) {
  $('a[href*=#]:not([href=#], [href^=#tab])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var stickyHeight = $('.sticky-header').height();

      if (!stickyHeight) {
        stickyHeight = 70;
      }

      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({scrollTop: target.offset().top - (stickyHeight + 15)}, 1000);
        return false;
      }
    }
  });
})(jQuery);
;/**/
/* Font Face Observer v2.0.13 - © Bram Stein. License: BSD-3-Clause */(function(){'use strict';var f,g=[];function l(a){g.push(a);1==g.length&&f()}function m(){for(;g.length;)g[0](),g.shift()}f=function(){setTimeout(m)};function n(a){this.a=p;this.b=void 0;this.f=[];var b=this;try{a(function(a){q(b,a)},function(a){r(b,a)})}catch(c){r(b,c)}}var p=2;function t(a){return new n(function(b,c){c(a)})}function u(a){return new n(function(b){b(a)})}function q(a,b){if(a.a==p){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d){d.call(b,function(b){c||q(a,b);c=!0},function(b){c||r(a,b);c=!0});return}}catch(e){c||r(a,e);return}a.a=0;a.b=b;v(a)}}
function r(a,b){if(a.a==p){if(b==a)throw new TypeError;a.a=1;a.b=b;v(a)}}function v(a){l(function(){if(a.a!=p)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0==a.a?"function"==typeof c?e(c.call(void 0,a.b)):e(a.b):1==a.a&&("function"==typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}})}n.prototype.g=function(a){return this.c(void 0,a)};n.prototype.c=function(a,b){var c=this;return new n(function(d,e){c.f.push([a,b,d,e]);v(c)})};
function w(a){return new n(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e==a.length&&b(h)}}var e=0,h=[];0==a.length&&b(h);for(var k=0;k<a.length;k+=1)u(a[k]).c(d(k),c)})}function x(a){return new n(function(b,c){for(var d=0;d<a.length;d+=1)u(a[d]).c(b,c)})};window.Promise||(window.Promise=n,window.Promise.resolve=u,window.Promise.reject=t,window.Promise.race=x,window.Promise.all=w,window.Promise.prototype.then=n.prototype.c,window.Promise.prototype["catch"]=n.prototype.g);}());

(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function r(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function t(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function y(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function z(a,b){function c(){var a=k;y(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);y(a)};function A(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var B=null,C=null,E=null,F=null;function G(){if(null===C)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);C=!!a&&603>parseInt(a[1],10)}else C=!1;return C}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
A.prototype.load=function(a,b){var c=this,k=a||"BESbswy",q=0,D=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=D?b():document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),N=new Promise(function(a,c){q=setTimeout(c,D)});Promise.race([N,M]).then(function(){clearTimeout(q);a(c)},function(){b(c)})}else m(function(){function u(){var b;if(b=-1!=
f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===B&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=B&&(f==v&&g==v&&h==v||f==w&&g==w&&h==w||f==x&&g==x&&h==x)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(q),a(c))}function I(){if((new Date).getTime()-H>=D)d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,
g=n.a.offsetWidth,h=p.a.offsetWidth,u();q=setTimeout(I,50)}}var e=new r(k),n=new r(k),p=new r(k),f=-1,g=-1,h=-1,v=-1,w=-1,x=-1,d=document.createElement("div");d.dir="ltr";t(e,L(c,"sans-serif"));t(n,L(c,"serif"));t(p,L(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);v=e.a.offsetWidth;w=n.a.offsetWidth;x=p.a.offsetWidth;I();z(e,function(a){f=a;u()});t(e,L(c,'"'+c.family+'",sans-serif'));z(n,function(a){g=a;u()});t(n,L(c,'"'+c.family+'",serif'));
z(p,function(a){h=a;u()});t(p,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load);}());
;/**/
