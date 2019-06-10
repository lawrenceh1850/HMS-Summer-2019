var keepTrying = function(wait, times, func) {

  var interv = function(w, t) {

    return function() {

      if (typeof t === "undefined" || t-- > 0) {
        setTimeout(interv, w);
        try {
          func.call(null);
        }
        catch(e) {
          t = 0;
          throw e.toString();
        }
      }

    };

  } (wait, times);
  
  setTimeout(interv, wait);
};
;/**/
/**
 * Responsive Tables (requires styles)
 *
 * @param {string} selector - Selector to locate tables (probably just `table`)
 */

var respondTable = function(selector) {

  var getLocalIndex = function(node) {
    var i = 1;
    while (node.previousElementSibling) {
      node = node.previousElementSibling;
      if (node.nodeType === 1) {
        i++;
      }
    }
    return i;
  }

  var tables = document.querySelectorAll(selector);

  for (var i = 0; i < tables.length; i++) {
    var currentTable = tables[i];
    var childCells = currentTable.querySelectorAll('td');

    Array.prototype.forEach.call(childCells, function(el, i) {
      var cellContent    = el.innerHTML;
      var contentWrapped = '<span class="cell-content">' + cellContent + '</span>';
      var columnHeader   = selector + ' thead th:nth-child(' + getLocalIndex(el) + ')';
      var headerContent  = currentTable.querySelectorAll(columnHeader)[0].innerHTML;
      var headerWrapped  = '<span class="cell-heading">' + headerContent + '</span>';
      el.innerHTML       = headerWrapped + contentWrapped;
    });
  }
};
;/**/
/**
 * Swaps SVG imgages for PNG with the same relative path. Probably want to detect IE before using
 *
 * @param {string} selector - Will swap images matching these selectors in a nodeList
 * @example  switchPng('.logo, .header img');
 */
var switchPng = function(selector) {
  var targets = document.querySelectorAll(selector),
      dotSVG  = /\.(svg)($|\?)/;

  for (var i = 0; i !== targets.length; i++) {
    targets[i].src = targets[i].src.replace(dotSVG, '.png$2');
  }
};
;/**/
/**
 * Insert analytics content into the page
 *
 * @param {string} source - Path to JSON
 * @param {string} target - Target element to insert the links
 */

(function () {
  'use strict';
}());

var analyticsContent = function(options, callback) {

  var source      = options.source,
      target      = options.target,
      parentElem  = options.parentElem,
      childElem   = options.childElem,
      elemClass   = options.elemClass,
      headerElem  = options.headerElem,
      headerClass = options.headerClass;

  if (typeof parentElem === 'undefined') {
    parentElem = 'ol';
  }

  if (typeof childElem === 'undefined') {
    childElem = 'li';
  }

  if (typeof elemClass === 'undefined') {
    elemClass = ['headline-list', 'headline-list--decimal'];
  }

  if (typeof headerElem === 'undefined') {
    headerElem = 'h2';
  }

  if (document.querySelector("body").contains(document.querySelector(target))) {

    var request  = new XMLHttpRequest(),
        acTarget = document.querySelector(target);

    request.open('GET', source, true);

    request.onload = function() {

      if (request.status >= 200 && request.status < 400 && request.readyState === 4 && acTarget) {

        var acData       = JSON.parse(request.responseText),
            acName       = acData.name,
            acItems      = acData.items,
            acHeader     = document.createElement(headerElem),
            acOutput     = document.createElement(parentElem);

        acHeader.innerText = acName;

        acOutput.setAttribute('id', target.replace(/#/, '') + '__acList');
        DOMTokenList.prototype.add.apply(acOutput.classList, elemClass);

        acTarget.appendChild(acHeader);
        acTarget.appendChild(acOutput);

        Array.prototype.forEach.call(acItems, function(item) {

          var acItem = document.createElement(childElem);

          if (item.url && item.title) {
            acItem.innerHTML = '<h2 class="media__headline media--priority-2"><a href="' + item.url + '">' + item.title + '</a></h2>';
            acOutput.appendChild(acItem);
          }
        });
      }
      else {
      }
    };

    if (callback) {
      callback();
    }

    request.send();
  }
};
;/**/
/**
 * Creates tabs from neighboring elements
 *
 * @param {string} targets - Create tabs from these elements
 * @param {string} groupId - Unique identifier for this group of tabs
 * @param {string} prefix [tabify] - Styling hook, to avoid styling Ids and style tabs differently
 */

(function() {
  'use strict';
}());

var tabify = function(options) {

  var targets = options.targets,
      groupId = options.groupId,
      prefix  = options.prefix;

  if (typeof(prefix) === 'undefined') {
    prefix = 'tabify';
  }

  if (document.querySelector('body').contains(document.querySelector(targets))) {

    var tabTargetsTemp          = document.querySelectorAll(targets),
        tabTargets              = [],
        parentIndex             = 0;
        firstBlock              = tabTargetsTemp[0];
        tabTargets[parentIndex] = [];

    for (var i = 0; i < tabTargetsTemp.length; i++) {

      var currentBlock = tabTargetsTemp[i],
          nextBlock    = tabTargetsTemp[i + 1];

      if (firstBlock.parentNode !== currentBlock.parentNode) {
        firstBlock = currentBlock;
        parentIndex = parentIndex + 1;
        tabTargets[parentIndex] = [];
      }

      tabTargets[parentIndex].push(currentBlock);
    }

    for (var p = 0; p <= parentIndex; p++) {
      if (tabTargets[p].length >= 2) {
        tabifyBuild(tabTargets[p], groupId + '-' + p, prefix);
      }
    }
  }
};

var getSiblings = function(elem) {
  var siblings = [];
  var sibling = elem.parentNode.children[0];
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem && sibling) {
      siblings.push(sibling);
    }
  }
  return siblings;
};

var tabifyBuild = function(tabTargets, groupId, prefix) {

  var outerWrapper   = document.createElement('div'),
      tabWrapper     = document.createElement('div'),
      tabControls    = document.createElement('ul'),
      parentElement  = tabTargets[0].parentNode;

  outerWrapper.appendChild(tabControls);
  outerWrapper.appendChild(tabWrapper, tabTargets[0]);
  outerWrapper.classList.add(prefix + '__outer-wrapper');

  tabWrapper.classList.add(prefix + '__panels');
  tabWrapper.setAttribute('id', prefix + '-' + groupId);

  tabControls.classList.add(prefix + '__controls');
  tabControls.setAttribute('id', prefix + '-controls-' + groupId);
  tabControls.setAttribute('aria-hidden', true);

  parentElement.insertBefore(outerWrapper, tabTargets[0]);

  Array.prototype.forEach.call(tabTargets, function(tab, index) {

    var tabHeading         = tab.querySelectorAll('h1,h2,h3,h4,h5,h6')[0],
        tabHeadingText,
        tabController      = document.createElement('li'),
        tabId              = prefix + '-' + groupId + '-tab-' + index,
        panelClassActive   = prefix + '__panel--active',
        controlClassActive = prefix + '__controller--active';

    if (tabHeading !== undefined) {
      tabHeadingText = tabHeading.innerText;
    } else {
      tabHeading = document.createElement('h2');
      tabHeadingText = tab.innerText.substring(0,20) + '…';
    }

    tab.setAttribute('id', tabId);
    tab.setAttribute('aria-hidden', false);
    tab.classList.add(prefix + '__panel');

    tabHeading.classList.add(prefix + '__heading');
    tabHeading.setAttribute('aria-hidden', false);

    document.getElementById(prefix + '-' + groupId).appendChild(tab);

    tabControls.appendChild(tabController);

    if (index === 0) {
      tabTargets[index].classList.add(panelClassActive);
      tabController.classList.add(controlClassActive);
    }

    tabController.classList.add(prefix + '__controller');
    tabController.innerHTML = '<a href="#' + tabId + '">' + tabHeadingText + '</a>';
    tabController.addEventListener('click', function(event) {

      var controlSiblings = getSiblings(this),
          panelSiblings   = getSiblings(document.getElementById(tabId));

      if (!this.classList.contains(controlClassActive)) {

        this.classList.add(controlClassActive);

        Array.prototype.forEach.call(controlSiblings, function(sibling) {
          sibling.classList.remove(controlClassActive);
        });

        Array.prototype.forEach.call(panelSiblings, function(sibling) {
          document.getElementById(tabId).classList.add(panelClassActive);
          sibling.classList.remove(panelClassActive);
        });

        event.preventDefault();
      }
    }, false);
  });
};
;/**/
/**
 * @file
 * script.js
 */


/**
 * Fix it!
 *
 * This javascript is pure garbage, and I know from garbage when it comes to  javascript.
 * Let's start to clean this up.
 */
(function($, Drupal) {
  Drupal.behaviors.force = {
    attach:function() {

/**
 * Total Hacks
 *
 * Terrible things to fix other terrible things. Let's try to find and fix
 * the root causes of these things one of these days.
 */

$('.collected__social .socialshares').css('margin-bottom', 0);
$('.primary .primary').removeClass('primary');


// Need to use this to keep the helper messages on /user pages.

if (document.location.pathname.indexOf("/user") > 0) {
  $('.not-logged-in .drupal-messages').remove();
}


/**
 * Slightly less gross hacks
 *
 * These things might just be facts of life. Sometimes we have to work
 * with what we've been given. Let's fix them if we can.
 */



/**
* Most Popular and Trending
*
* Get content from Analytics and create tabs from adjacent elements
*/

function acMakeTabs() {

  var acReady = false,
      acMostRead = document.getElementById('force_most_read').innerHTML.length,
      acTrending = document.getElementById('force_trending').innerHTML.length;

  if (acTrending > 0 && acMostRead > 0) {
    clearInterval(acTimer);
    acReady = true;
  }

  if (acReady === true) {
    tabify({
      targets: '.force_trending',
      groupId: 'popular-trending',
      prefix: 'tabify'
    });
  }
}

if (document.querySelector("body").contains(document.querySelector('#force_most_read') && document.querySelector('#force_trending'))) {

  analyticsContent({
    source: '/sites/default/files/science_services/trending_force_awakens/data/most_read.json',
    target: '#force_most_read'
  });

  analyticsContent({
    source: '/sites/default/files/science_services/trending_force_awakens/data/trending.json',
    target: '#force_trending'
  });

  var acTimer = setInterval(acMakeTabs, 250);

}



/**
 * Newsletter and Subscription forms
 *
 * Apply some crappy magic to these forms. A better solution would be to check
 * if they exist and then do this stuff. We're just going to do it on a timer
 * instead for the time being.
 */

 // Un-disables the newsletter submission form when a valid email address is
 // entered. Let's clean up this function to apply to other forms, including the
 // magazine subscribe form.
// var unDisable = function() {
//  var selected = $("#form-footer-newsletters input:checkbox:checked").length;
//  var emailPattern = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+\.*/;
//  var validEmail = emailPattern.test($("#form-footer-newsletters input[type='email']").val());
//
//   if (selected > 0 && validEmail) {
//     $("#form-footer-newsletters button").prop("disabled", false);
//   } else {
//     $("#form-footer-newsletters button").prop("disabled", true);
//   }
// };
//
// // Here's that gross timer. Absolutely vile.
// setTimeout(function() {
//   $("#form-footer-newsletters button").prop("disabled", true);
//
//   $("#form-footer-newsletters input:checkbox").on("change", function () {
//     unDisable();
//   });
//
//   $("#form-footer-newsletters input[type='email']").on("input change keyup", function () {
//     unDisable();
//   });
//  }, 3500);

/**
 * IE-specific
 *
 * Doing terrible things to detect IE.
 */

if (!!(window.navigator.userAgent).match(/MSIE|Trident/)) {
  // IE is predictably terrible at handling SVG images.
  // Give it PNGs instead.
  switchPng('.sticky-header__logo img, .journal-preview img, .footer__header img .logo--science');
}

    }
  };
} (jQuery, Drupal));


(function($) {

  jQuery('.search-toggler__trigger').click(function() {
    jQuery('.search-form-mobile').toggleClass('is-hidden');
  });

  //
  // Toggleable content — Just hide it visually, but keep it readable
  //
  jQuery('.toggleable:not(.is-revealed)').addClass('is-visually-hidden');

  jQuery('[data-click-to-toggle]').click(function(){
    var revealTarget = jQuery(this).data('click-to-toggle');
    jQuery(revealTarget).toggleClass('is-revealed is-visually-hidden');
    return false;
  });


  Drupal.behaviors.science = {
    attach: function(context, settings) {
      respondTable('.datatable');

      Drupal.behaviors.science.sticky(context, settings);
      Drupal.behaviors.science.tabs(context, settings);
      Drupal.behaviors.science.viewsLoadMore(context, settings);
      Drupal.behaviors.science.podcasts(context, settings);
    },
    sticky: function(context, settings) {

      if (window.matchMedia("(min-width: 1025px)").matches) {
        jQuery('.article__social').sticky({
          topSpacing: 0,
          getWidthFrom: '.tertiary'
        });
      }

      $('.sticky-header', context).stickyHeader({
        triggerElement: '.row:not(.row--header)',
        hiddenClass: 'sticky-header-is-hidden',
        scrollOffset: -75
      });
    },

    tabs: function(context, settings) {

      $('.tabbed__panel-wrapper:not(:first-child)', context).addClass('is-vishidden');

      $('.tabbed__list li:first-child', context).addClass('active');

      $('.tabbed__list a', context).click(function(event) {
          var $self = $(this);

          if ($self.parents('.tabbed--drupal, .tabbed--static').length) {
            return;
          }

          event.preventDefault();

          var $li = $(this).closest('li');
          var $tabTarget = $($self.attr('href'));
          var $allTabPanels = $self.closest('.tabbed').find('.tabbed__panel-wrapper');

          $li.addClass('active');
          $li.siblings().removeClass('active');

          $allTabPanels.addClass('is-vishidden');
          $tabTarget.removeClass('is-vishidden');
        });
    },

    viewsLoadMore: function(context, settings) {

      // To use this "load more" pager instead of the default Views output, do
      // this:
      //  * Add 'view-load-more' CSS class to the View display.
      //  * Add 'view-load-more-item' CSS class to the row output.
      //  * Use "More" link and set whatever label you want.
      //  * Set "Paged output, full pager".
      var $link_page = $('.view-load-more .pager li.pager-item a', context);
      var $link_more = $('.view-load-more .more-link a', context);
      if (!$link_page.length || !$link_more.length) {
        return;
      }

      // Set View wrapper selector string.
      var selector = '.' + $('.view-load-more', context)
        .attr('class')
        .split(' ')
        .join('.');

      // Collect all paged href values.
      var history = [];
      $link_page.each(function(ix, e) {
        history
          .push($(e).attr('href'));
      });

      // Remove default Views pager.
      var $pager = $(selector + ' .pager', context)
        .hide();

      // Bind click behavior to More button.
      $link_more
        .addClass('btn btn--block')
        .click(function(evt) {
          evt.preventDefault();

          var $self = $(this);
          var label = $self.html().trim();
          var page = history.shift();
          var $target = $(selector + ' .view-content > ul, ' + selector + ' .view-content > ol', context);
          if (!$target.length) {
            $target = $(selector + ' .view-content', context);
          }

          // AJAX in the next page of View items, store results to hidden pager
          // element, then append the View content.
          $self
            .html(Drupal.t('Loading...'));

          $pager
            .load(page + ' ' + selector + ' .view-content .view-load-more-item', null, function(response, status, xhr) {
              $self
                .html(label);
              $target
                .append($pager.html());
              $pager
                .empty();

              if (history.length === 0) {
                $link_more
                  .addClass('element-invisible');
              }
            });

        });

    },
    podcasts: function(context, settings) {
      // Front page podcast player
      $('.front .view-nodequeue-lists-feat-podcast .file-audio', context).addClass('align-right');
      $('.front .view-nodequeue-lists-feat-podcast .mediaelement-audio', context).addClass('audio').addClass('audio--podcast');
      $('.front .view-nodequeue-lists-feat-podcast', context).parent().css('width', '100%');
      // Mediaelement player embedded into articles or podcast full node view
      $('.article__content .mediaelement-audio', context).addClass('audio');
      // Podcast full node view
      $('.node-type-podcast .article__content .mediaelement-audio', context).addClass('audio--podcast');

      $('.mejs-playpause-button button', context).val("Play/Pause");

    }
  };
})(jQuery);

/**
 * Autoplay detection script for background videos.
 */
(function($) {
  Modernizr.on('videoautoplay', function(result) {
    if (!result) {
      $('.background-video').each(function() {
        addImageFallback(this);
      });
    }
  });

  function addImageFallback(item) {
    // Clear out video tag altogether, add image tag
    var imageUrl = $('img', item).attr('src');

    if (imageUrl) {
      var $img = $('<img>').attr('src', imageUrl);
      var $pict = $('<picture>').append($img);
      $parent = $(item).parent();
      $(item).remove();
      $parent.prepend($pict);
    }
  }
})(jQuery);
;/**/
!function(){function t()

{for(h=[],n=document.getElementsByTagName("iframe"),i=0;i<n.length;i++)n[i].src.match(/^(http[s]?:)?\/\/[^\/]*rumble.com\//)&&h.push(n[i]);e()}
function e()

{var t,n;for(o=0,i=0;i<h.length;i++)h[i].style.width="100%",t=h[i].offsetWidth,0!=t||o||(o=setTimeout(e,100)),t>0&&(n=Math.ceil(t/16*9),h[i].style.height=(360>n?360:n)+"px")}
var n,i,o,a,h=[],c="";(a=window.addEventListener)||(a=window.attachEvent)&&(c="on"),a(c+"load",t),a(c+"resize",e),t()}();;/**/
