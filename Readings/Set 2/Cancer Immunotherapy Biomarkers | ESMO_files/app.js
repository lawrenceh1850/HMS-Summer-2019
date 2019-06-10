;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
  $.fn.foundationButtons          ? $doc.foundationButtons() : null;
  //$.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
  //$.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
  $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
  $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
  $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
  $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
  if($("html").hasClass("no-touch") && $.fn.foundationTooltips ) { $doc.foundationTooltips(); }

  $('input, textarea').placeholder();

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }



})(jQuery, this);

$(document).ready( function($){
    addSpanFirstWord( $( 'h2.outboxedtitle, aside h2').not('.content-search h2') );
    showMenuIntro();
    mobileMenuScroll();
    scrollUp();
    stylizeMyOL();
    filterToViewParameters();
    fancyBox();
    searchFacets();
    searchSort();
    searchSite();
    externalLinks();
    quickLinks();
    emailDemunger();
    filterToViewParameters();
    init_generic_form() ;
    removeIESVGTags();
    init_send_message_form() ;
    init_search_member_result() ;
    init_link_redirect() ;
    init_glossary_load() ;// chargement glossaire par paquet
    removeDbClick(); //supprime le double clic sur un ipad pour le menu top

    rssRead();
    twitterRead();

    checkLoginSite();
    fullscreenVideo();
    usertoolbar();
    qaToggle();

    handleLastAccessURI() ;

    election() ;
});

$(window).resize( function() {
    resizeBoxHeight();
    navigationFunctions();
    responsiveTables();
    contentSlider();
//    searchFacets();
   // $.fn.foundationAccordion        ? $(document).foundationAccordion() : null; /* nice for mobile version */
   var mediaQuerieValues = getMediaQuerieValues();

   if ( mediaQuerieValues['media'] != "medium" ) {
        $.fn.foundationNavigation       ? $(document).foundationNavigation() : null; /* nice for mobile version */
    }
});

$(window).load( function() {
    resizeBoxHeight();
    navigationFunctions();
    responsiveTables();
    mediaSlider();
    bannerSlider();
    contentSlider();
    figureCaption();
    $.fn.foundationAccordion        ? $(document).foundationAccordion() : null; /* nice for mobile version */
    $.fn.foundationNavigation       ? $(document).foundationNavigation() : null; /* nice for mobile version */
});
/**
 *
 */
var init_glossary_load = function()
{
    // si le glossaire est détecté dans la page on lance le chargement par paquet
    if( $('#glossary-list' ).length > 0 )
    {
        boolGlossary = handlerGlossaryLoad() ;
        if( boolGlossary == true )
        {
            // on initialise le fonctionnel glossary
            glossary() ;
        }
    }
};
/**
 *
 */
var callProgressBar = function()
{
    $( "#progressbar" ).show() ;
    $('.progress-label').show() ;
    // on initialise la progress bar
    $(function() {
        var progressbar = $( "#progressbar" ),
        progressLabel = $( ".progress-label" );
        progressbar.progressbar({
            value: false,
            change: function() {
                progressLabel.text( progressbar.progressbar( "value" ) + "%" );
            },
            complete: function() {
                progressLabel.text( 'Complete!' );
            }
        });
    });
};
 /**
 * @fn handlerGlossaryLoad( event )
 */
var handlerGlossaryLoad = function()
{
    boolhandlerGlossaryLoad = false ;
    // on recupere les données du form glossary-list-ajax-form
    post_datas = $( '#glossary-list-ajax-form' ).serialize() ;
    // on appelle la fonction de comptage des objets a remonter
    $.ajax({
        type: 'POST',
        data : post_datas,
        dataType: "html",
        url: "/ezjscore/call/esmo::glossaryCount::",
        beforeSend: function( jqXHR )
        {
            // on active le listener cancel
            callProgressBar() ;
        },
        success: function( data, status )
        {
            obj = $.parseJSON( data ) ;
            $( "#progressbar" ).progressbar( {value:0} );
            // on load les datas par paquet de 10
            handlerGlossaryLoad = loadGlossary( post_datas, 0, 10, obj.standard_fields_count ) ;
        }
    });
    return handlerGlossaryLoad ;
};
/**
 *
 */
var loadGlossary = function( post_datas, offset, limit, objectCount )
{
    lastLoop = false ;
    if( offset + limit > objectCount )
    {
        limit = objectCount - offset ;
        lastLoop = true ;
    }
    $.ajax({
        type: 'POST',
        data : post_datas + '&offset=' + offset + '&limit=' + limit + '&count=' + objectCount,
        dataType: "html",
        url: "/ezjscore/call/esmo::glossaryLoad::",
        success: function( data, status )
        {
            obj = $.parseJSON( data ) ;
            // on injecte les datas directement dans le conteneur  #glossary-list .innercontent
            $( '#glossary-list .innercontent').append( obj.glossary ) ;
            // on enleve le fonctionnel natif des liens sous #glossary-list .innercontent
            $( '#glossary-list .innercontent a.glossary_link').click(function(e) { e.preventDefault(); });
            percent = Math.floor( ( offset + limit)  / objectCount * 100 ) ;
            // on envoie la progress bar
            $( "#progressbar" ).progressbar( {value:percent} );

            if( lastLoop == true )
            {
                // on rétablit le fonctionnel natif des liens sous #glossary-list .innercontent
                $( '#glossary-list .innercontent a.glossary_link').unbind('click') ;
                // on affiche la quick search
                $('.quicksearch_container').show() ;
                // on charge le fonctionnel pour chaque lien injecté
                glossary() ;
                // on injecte les data dans le menu glossary
                $( '#glossary_menu').html( obj.menu ) ;
                return lastLoop ;
            }
            else
            {
                loadGlossary( post_datas, offset + limit, limit, objectCount ) ;
            }
        }
    });
};

var glossary = function(){
    if( $('div#glossary-list').length > 0 )
    {
      $('input#qs').quicksearch('div#glossary-list div.search', {
        'delay': 100,
        'onAfter': function () {
          $('#glossary-list .innercontent h2').hide();
          $('div#glossary-list div.search:visible').each(function() {
            $(this).prevAll( "h2" ).first().show();
          });
        }
      });
    	$("div#glossary-list div.search  > a").click(function () {
            $(this).next().toggle();
            return false;
    	});

	}
}

var scrollUp = function(){

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
}

var removeIESVGTags = function(){
    if(!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function() {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }
}

var emailDemunger = function emailDemunger () {
    $('.email-address').demunge({
        mailTo : true,
        munging : [{ type: "traditional", param: "()"  }, { type: "keyword", param: "SPAMFILTER" }],
        emailText: 'E-mail'
    })

    $('.email-attribute').demunge({
        mailTo : true,
        munging : [{ type: "traditional", param: "()"  }, { type: "keyword", param: "SPAMFILTER" }]
    })
}

var searchFacets = function searchFacets () {
    var $facetList = $('#facet-list');
    if ($facetList.length) {
        $facetList.find('.facet').each(function () {
            var $this = $(this);
            $this.on('click', function () {
                $facetList.find('.facet').not($this).removeClass('active').find('ul').slideUp();
                $(this).toggleClass('active').find('ul').slideToggle();
            });
        });

        /*if ( getMediaQuerieValues().media == "small" ){
            $('#header .searchbox').hide();
            $('#search_controls').on('click', 'h2', function () {
                $facetList.slideToggle();
                $(this).toggleClass('open');
            });
        }*/
    }
};

var searchSort = function searchSort () {
    var get = new Object();

    if( location.search != "" ) {
      location.search.replace('?', '').split('&').forEach(function (val) {
          split = val.split("=", 2);
          get[split[0]] = split[1];
      });
    }

    //console.log( get );
    //console.log( _.size(get) );

    var $sort = $('#sort');

    if ($sort.length) {
        $sort.on('change', function () {
            var varname = '?sort=';

            if ( _.size(get) ) {
                varname = '&sort=';
            }

            window.location = window.location + varname + $(this).val();
        });
    }
};

var searchSite = function searchSite () {
    var $searchSite = $('#searchSite');

    $searchSite.on('change', function () {

        var $searchText = "";

        if ( url('?searchText') == ""){
            var $searchText = "*";
        }

        if ( url('?searchSite') != ""){
            $searchChain =  window.location.search.replace( url( '?searchSite' ), $( this ).val() );
        }
        else{
            $searchChain = window.location.search + '&searchSite=' + $(this).val();
        }

        window.location.search = $searchChain;
    });
};

var search = function search(){
    var $search = $('#searchButton');
    if ( url('?searchText') == ""){
        window.location.search = window.location.search.replace( url( '?searchText' ), '*' ) + $searchText;
    }
}

var fancyBox = function(){
    var mediaQuerieValues = getMediaQuerieValues();

    var fancyMargin = [0, 0, 0, 0];

    if ( mediaQuerieValues['media'] != "small" ) {
        fancyMargin = [20,60,20,60];
    }
    var fancybox = $(".fancybox").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        nextEffect  : 'none',
        prevEffect  : 'none',
        padding     : 0,
        margin      : fancyMargin, // Increase left/right margin
        afterShow  : function(){ fancyBoxSwipe(); }
    });
}

var fancyBoxSwipe = function(){
    $(".fancybox-wrap").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount) {$.fancybox.next();},
        swipeRight:function(event, direction, distance, duration, fingerCount) {$.fancybox.prev();}
    });
}

var addSpanFirstWord = function( elmt ){

    elmt.each(function(){
        var me = $(this),
            t = me.text().split(' ');

        if ( me.children( 'span.firstWord' ).length == 0 ) me.html( '<span class="firstWord">'+t.shift()+'</span> '+t.join(' ') );
    });

}

var showMenuIntro = function(){

    var mediaQuerieValues = getMediaQuerieValues();

    if ( mediaQuerieValues['media'] != "small" ) {

        $( '.submenu li' ).mouseover( function(){
            var $id = $(this).attr( 'id' );
            $( '.submenu .intro:visible' ).hide();
            $( '.submenu .intro.' + $id + ':not(:animated)' ).fadeIn('fast');
        }).mouseout( function(){
            $( '.submenu .intro' ).hide();
        });
    }

    $navbarLinkHoverSeparatorStyle = 'border-left : 1px solid transparent !important';

    $('nav .nav-bar > li').hover(
        function(){
            //console.log( $(this).parent().filter(':not(:first-child)') );
            $(this).next( 'li' ).children( 'a' )
                   .attr( 'style', $navbarLinkHoverSeparatorStyle );

            $(this).not(':first-child').find( 'a' ).attr( 'style', $navbarLinkHoverSeparatorStyle );
        },
        function(){
            $(this).next( 'li' ).children( 'a' ).removeAttr( 'style' );
            $(this).not(':first-child').find( 'a' ).removeAttr( 'style' );
            $('nav .nav-bar > li.selected').next( 'li' ).children( 'a' ).attr( 'style', $navbarLinkHoverSeparatorStyle );
        }
    );

    $('nav .nav-bar > li.selected > a.flyout-toggle').attr( 'style', $navbarLinkHoverSeparatorStyle );
    $('nav .nav-bar > li.selected').next( 'li' ).children( 'a' ).attr( 'style', $navbarLinkHoverSeparatorStyle );
}

var mobileMenuScroll = function(){
    $( '.showmenu' ).click( function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('nav.menu').offset().top
         }, 500);
    });
}

var resizeBoxHeight = function(){
    var mediaQuerieValues = getMediaQuerieValues();

    if ( mediaQuerieValues['media'] != "small" ) {

        $('.row').each( function(){
            var heighest = 0;

            if ( $(this).find( '.box .innerbox' ) && $(this).find( '.row' ).length == 0 ){

                var $innerbox = $(this).find( '.box .innerbox' );

                if ( $innerbox.length > 1 && $innerbox.parents( '#sidebar' ).length == 0 ){

                    $innerbox.each( function(){

                        $(this).css( 'height', '');

                        if ( $(this).outerHeight() > heighest ){
                            heighest = $(this).outerHeight();
                        }
                    });

                    $innerbox.css( 'height', heighest + 'px' );
                }

            }
        });
    }
    else {

        $('.row').each( function(){
            var heighest = 0;

            if ( $(this).find( '.box .innerbox' ) && $(this).find( '.row' ).length == 0 ){

                var $innerbox = $(this).find( '.box .innerbox' );

                if ( $innerbox.length > 1 ) {

                    $innerbox.each( function(){

                        $(this).css( 'height', '');

                    });

                }

            }
        });

    }
}

var getMediaQuerieValues = function(){

    var $media = "",
        $display = "",
        $touch = "notouch";

    if ( $( ".mediaQuerieValues" ).length == 0 ){
        $('body').prepend('<div class="hide mediaQuerieValues"><span class="media show-for-xlarge">extralarge</span><span class="media show-for-large">large</span><span class="media show-for-medium">medium</span><span class="media show-for-small">small</span><span class="display show-for-landscape">landscape</span><span class="display show-for-portrait">portrait</span><span class="touch show-for-touch">touch</span></div>');
    }

    $( ".mediaQuerieValues .media" ).each( function(){
        if ( $(this).css( 'display') == "block" ){
            $media = $(this).text();
        }
    });

    $( ".mediaQuerieValues .display" ).each( function(){
        if ( $(this).css( 'display') == "block" ){
            $display = $(this).text();
        }
    });

    $( ".mediaQuerieValues .touch" ).each( function(){
        if ( $(this).css( 'display') == "block" ){
            $touch = $(this).text();
        }
    });
    return { media : $media, display : $display, touch : $touch }
}

var navigationFunctions = function(){
    var mediaQuerieValues = getMediaQuerieValues();

    //alert( mediaQuerieValues['media'] );

    if ( mediaQuerieValues['media'] == "small" ){
        if( !$('html').hasClass('ie8') ){
            $('body > footer').before( $( 'nav' ) );
            $( 'nav' ).show();

            $('nav .nav-bar').addClass('accordion');
            $('nav .nav-bar > li > a').removeClass( 'flyout-toggle' );
            /*$('nav .nav-bar > li > a').click( function(e){
                e.preventDefault();
            });*/
            $('nav .nav-bar li.has-flyout div.submenu').removeClass('flyout').addClass('content');
        }
    } else {
        if( !$('html').hasClass('ie8') ){
            $('header').after( $( 'nav' ) );

            $('nav .nav-bar').removeClass('accordion');
            $('nav .nav-bar > li > a').addClass('flyout-toggle').parent().removeClass( 'active' );
            $('nav .nav-bar li div.submenu').addClass('flyout').removeClass('content').hide();
        }
    }

}

var mediaSlider = function(){

    var mediaQuerieValues = getMediaQuerieValues();

    var fancyMargin = [0, 0, 0, 0];

    if( $(".media-gallery").length > 0 ){

        $(".media-gallery").carouFredSel({
            prev: '.carousel-nav .nav-previous',
            next: '.carousel-nav .nav-next',
            width   : "100%",
            scroll : {
                items        : 1,
                pauseOnHover : true
            },
            swipe : {
                items : 4,
                onTouch : true,
                onMouse :true
            },
            pagination : {
                container    : ".carousel-nav .pager",
                pauseOnHover : true
            },
            items : {
                height: 100
            }
        });

        $(".media-gallery img").each( function(){
            $(this).parent( 'li' ).css( 'height', $(this).height() );
        })
     }
}

var bannerSlider = function(){
    if ( $(".topbanner > div").length > 0 ){

        $(".topbanner > div .caption").show();

        $(".topbanner > div").carouFredSel({
            auto: 5000,
            scroll: {
                fx: "uncover-fade",
                pauseOnHover: true
            },
            items       : {
                height      : "auto"
            },
            responsive  : true,
            pagination: "#carousel-pag"

        });
    }
}

var contentSlider = function(){
    if ( $(".contentslider").length > 0 ){

        $(".contentslider").carouFredSel({
            auto: 5000,
            scroll: {
                items: 1,
                fx: "scroll",
                pauseOnHover: true
            },
            items: {
                visible: {
                    min: 1,
                    max: 4
                }
            },
            prev: '#contentslider-prev',
            next: '#contentslider-next',
            responsive: true,
            pagination: {
                container: "#contentslider-pag",
                items: 1,
                anchorBuilder: function( i ) {
                    return '<a class="p' + i + '" href="#"></a>';
                }
            }
        });
    }
}

var figureCaption = function(){
    $("figure.bottom, figure.top").each( function(){
        $(this).width( $(this).find( 'img' ).width() );
    });
}

var stylizeMyOL = function(){
    $(".page ol li").wrapInner( '<span />' );
}

var responsiveTables = function(){
    if ( !$("table").hasClass( 'mobile' ) ){
        $("table").each( function(){
            var mod = 0
            $(this).find("tbody tr").children().each( function( index ){

                var parentTHCount = $(this).parents( 'tbody' ).prev( 'thead' ).find( 'tr' ).children( 'th' ).length;
                mod = index % parentTHCount;
                var parentTH = $(this).parents( 'tbody' ).prev( 'thead' ).find( 'tr' ).children().get( mod );

                if ( parentTH ){
                    $(this).attr( 'data-title', parentTH.textContent );
                }
            });
         });
     }
}

var filterToViewParameters = function filterToViewParameters(){
    if( $(".searchfilter form").length ){

        /*var getViewParameters = function(){
            var datastring = $(".searchfilter form").serialize();

            var viewParams = datastring.replace( /=/g, ')/' );
            viewParams = viewParams.split( '&' );
            viewParams = viewParams.join( '/(' );
            viewParams = '/('+viewParams;

            var currentLocation = $(".searchfilter form").attr('action');
            var newLocation = currentLocation + viewParams;

            window.location.href = newLocation;
        };*/

        $(".searchfilter form select").change( function(){
            //getViewParameters();
            window.location.href = $(this).val();
        });
    }
};

var find_container = function(input) {
    return input.parents('.form-field');
};

var remove_validation_markup = function(input) {
    var cont = find_container(input);

    cont.removeClass('error');
    $('small',
        cont).remove();
    //$( 'span.tooltip' ).remove();
    $(document).tooltips();

};

var add_validation_markup = function(input, cls, caption) {
    var cont = find_container(input);
    cont.addClass(cls);

    var msg = $('<small/>');
        msg.text(caption);
        if( input.get(0).tagName.toLowerCase() == 'select' ) {
            $(input).next().after(msg);
        }
        else {
            input.after(msg);
        }
        //$( 'span.tooltip' ).remove();
        $(document).tooltips();
        return false;

};

var remove_all_validation_markup = function(form) {
    $('small',
        form).remove();
    $('.error', form);
    //$( 'span.tooltip' ).remove();
    $(document).tooltips();
};

var inlineFormValidation = function () {
    $('form').each(function () {
        var form = $(this);

        form
            .validator({
                lang: 'fr'
            })
            .bind('reset.validator', function () {
                remove_all_validation_markup(form);
            })
            .bind('onSuccess', function (e, ok) {
                $.each(ok, function() {
                    var input = $(this);
                    remove_validation_markup(input);
                    // uncomment next line to highlight successfully
                    // validated fields in green
                    //add_validation_markup(input, 'success');
                });
            })
            .bind('onFail', function (e, errors) {
                $.each(errors, function() {
                    var err = this;
                    var input = $(err.input);

                    remove_validation_markup(input);
                    add_validation_markup(input, 'error',
                        err.messages.join(' '));
                });
                return false;
            });

        $( "input[name='CancelButton']").click(function(){
            form.data("validator").destroy();
        });

        $( "input[name='DiscardButton']").click(function(){
            form.data("validator").destroy();
        });
    });
};

var externalLinks = function(externalLinks) {
    $('a[rel*="external"]').click(function() {
        window.open($(this).attr('href'));
        return false;
    });
};

var quickLinks = function(){
    $("select.quicklinks").change( function() {
        if ( $(this).val() != '' ) {
            window.location.href = $(this).val();
        }
    });
}

/**
 *
 */
var global_country_code = 'FR' ;
var global_city = '' ;
/**
 *  @fn void init_generic_form()
 */
var init_generic_form = function()
{
    /**
     * @fn array get_native_soap_error_array_key
     */
    var get_native_soap_error_array_key = function()
    {
        return new Array( 'error', 'fault', 'silent_service' ) ;
    };
    /**
     * @fn array get_specific_soap_error_array_key( str_operation )
     * @param string str_operation
     */
    var get_specific_soap_error_array_key = function( str_operation )
    {
        array_result = null ;
        switch( str_operation )
        {
            case 'checkUniqueMail':
                array_result = new Array( 'unvalid', 'wrong_account', 'wrong_format' ) ;
            break ;
            case 'institutionCountry':
                array_result = new Array( 'unvalid' ) ;
            break;
            case 'institutionCity':
                array_result = new Array( 'unvalid', 'wrong_country' ) ;
            break;
            case 'institutionSearch':
                array_result = new Array( 'unvalid', 'wrong_token', 'wrong_update_right', 'wrong_account', 'wrong_search_right' ) ;
            break;
        }
        return array_result ;
    };
    /**
     * @fn string get_post_adata( jq_object, str_operation )
     * @param jQuery jq_object
     * @param string str_operation
     */
    var get_post_data = function( jq_object, str_operation )
    {
        post_datas = null ;
        switch( str_operation )
        {
            case 'checkUniqueMail':
                current_input_val = jq_object.val() ;
                post_datas = "operation=" + str_operation + "&data=" + current_input_val ;
            break ;
            case 'institutionCountry':
                post_datas = "operation=" + str_operation ;
            break;
            case 'institutionCity':
                current_input_val = jq_object.val() ;
                post_datas = "operation=" + str_operation + "&data=" + current_input_val ;
            break;
            case 'institutionSearch':
                if( global_city !== '' )
                {
                    current_input_val = global_city ;
                }
                else
                {
                    current_input_val = jq_object.val() ;
                }
                post_datas = "operation=" + str_operation + "&data=" + current_input_val + "&country=" + global_country_code ;
            break ;
        }
        // on ajout la post data token pour etre compatible avec l'extension ezformtoken
        if( $( 'input[name="ezxform_token"]' ).length > 0 )
        {
            post_datas += '&ezxform_token=' + $( 'input[name="ezxform_token"]' ).val() ;
        }
        return post_datas ;
    };
    /**
     * @fn boolean ws_call( jq_object, str_operation )
     * @param jQuery jq_object
     * @param string str_operation
     */
    var ws_call = function( output, input, str_operation )
    {
        bool_result = false ;
        // on affiche le loader
        input.parent().parent('.row').next('.loader').show() ;
        array_native_error = get_native_soap_error_array_key() ;
        array_specific_error = get_specific_soap_error_array_key( str_operation ) ;
        post_datas = get_post_data( input, str_operation ) ;
        $.ajax({
            type: 'POST',
            data : post_datas,
            dataType: "html",
            url: "/ezjscore/call/esmo::webservice::",
            success: function( data, status )
            {
                var obj = parseJson(data) ;
                // on s'assure que la reponse obtenu est bien un objet json
                if( typeof obj === 'object' )
                {
                    $.map( obj, function( msg, key )
                    {
                        if( key === 'success' && msg !== null && msg !== 'null' )
                        {
                            bool_result = handlerSuccessWsResponse( input, output, str_operation, key, msg ) ;
                        }
                        else if( inArray( key, array_native_error ) || inArray( key, array_specific_error ) )
                        {
                            bool_result = handlerErrorWsResponse( input, str_operation, key, msg ) ;
                        }
                        else
                        {
                            // cas ou la reponse est null => on cache la(es) cible(s)
                            bool_result = handlerNullWsResponse( output, str_operation, key, msg ) ;
                        }
                    });
                }
                // on cache le loader
                input.parent().parent('.row').next('.loader').hide() ;
            }
        });
        return bool_result ;
    };
    /**
     * @fn boolean inArray( value, array )
     * @param string value
     * @param array array
     */
    var inArray = function( value, array )
    {
        boolResult = false ;
        for( var i=0; i < array.length; i++ )
        {
            if( array[i] == value )
            {
                boolResult = true ;
                break ;
            }
        }
        return boolResult ;
    };
    /**
     * @fn boolean handlerErrorWsResponse( jq_object, str_operation, key, msg )
     * @param jQuery jq_object
     * @param string str_operation
     * @param string key
     * @param mixed msg
     */
    var handlerErrorWsResponse = function( jq_object, str_operation, key, msg )
    {
        return injectError( jq_object, msg, str_operation ) ;
    };
    /**
     *
     */
    var call_phone = function( country_code )
    {
        var obj = null ;
        var ezxform_token = '' ;
        var post_datas = 'country_code=' + country_code ;
        if( $("input[name=ezxform_token]").length > 0 )
        {
            ezxform_token = $("input[name=ezxform_token]").val() ;
            post_datas += '&ezxform_token=' + ezxform_token ;
        }
        $.ajax({
            type: 'POST',
            data : post_datas,
            dataType: "html",
            url: "/ezjscore/call/esmo::phone::",
            success: function( data, status )
            {
                obj = parseJson(data) ;
                inject_phone_prefix( obj ) ;
            }
        });
    };
    /**
     *
     */
    var inject_phone_prefix = function( phone_obj )
    {
        if( phone_obj != null )
        {
            $('#addressPhone-1').val( phone_obj.phone_code ) ;
            $('#addressMobile-1').val( phone_obj.phone_code ) ;
            $('#addressFax-1').val( phone_obj.phone_code ) ;
        }
        else
        {
            //console.log( phone_obj ) ;
        }
    };
    /**
     * @fn boolean handlerSuccessWsResponse( jq_object, str_operation, key, msg )
     * @param jQuery jq_object
     * @param string str_operation
     * @param string key
     * @param mixed msg
     */
    var handlerSuccessWsResponse = function( input, jq_object, str_operation, key, msg )
    {
        boolResponse = false ;
        // on s'assure que la sortie est disponible
        if( typeof jq_object.attr( 'disabled' )  !== 'undefined' && jq_object.attr( 'disabled' )  !== false )
        {
            // sinon on la rend disponible ( cf valeur null => fn handlerNullWsResponse )
            jq_object.removeAttr( 'disabled' ) ;
        }
        value = label = text = '' ;
        switch( str_operation )
        {
            case 'checkUniqueMail':
                boolResponse = true ;
                jq_small_error = jq_object.parent().children('small.error') ;
                jq_small_error.each(function(){
                    hide( $( this ) ) ;
                });
            break ;
            case 'institutionCountry':
                // on injecte les données recues dans le select du country;
                boolResponse = injectElement( jq_object, msg, str_operation, 'name', 'code', jq_object.prop("tagName").toLowerCase(), input, text ) ;
            break;
            case 'institutionCity':
                // on appelle via ajax la fonction qui récupère les indicatif telephonique et le distribue dans les champ prefixes tel
                call_phone( $('#institutionCountry option:selected').val() ) ;
                // on injecte les données recues dans le select du city
                boolResponse = injectElement( jq_object, msg, str_operation, 'name', 'code', jq_object.prop("tagName").toLowerCase(), input, text ) ;
                // on selectionne la donnée pays dans le select country disabled
                $( '#addressCountry option[value="'+ global_country_code +'"]' ).attr( 'selected', 'selected' ) ;
            break ;
            case 'institutionSearch':
                if( jq_object.prop("tagName") )
                {
                    output_tag_name = jq_object.prop("tagName").toLowerCase() ;
                    // suivant le type a remplir on definit les données en provenance de l'operation institutionSearch
                    switch( output_tag_name )
                    {
                        case 'select':
                            // pour un type select on remplit le select du code et du nom de l'institution
                            value = 'id' ;
                            label = 'name' ;
                        break;
                        case 'input':
                            // pour un type text on a besoin de déterminer quelle données va dans wuel champ, on se sert de l'objet msg transmis et on map
                            text = handlerInstitutionFillTextField( str_operation, jq_object, msg, input ) ;
                        break;
                    }
                    // on injecte les données recues dans l'element institution
                    boolResponse = injectElement( jq_object, msg, str_operation, value, label, jq_object.prop("tagName").toLowerCase(), input, text ) ;
                }
                break;
        }
        return boolResponse ;
    };
    /**
     * @fn string handlerInstitutionFillTextField( str_operation, jq_object, msg, input )
     * @param string str_operation
     * @param jq_object jq_object
     * @param json msg
     * @param jq_object input
     */
    var handlerInstitutionFillTextField = function( str_operation, jq_object, msg, input )
    {
        text = '' ;
        selected_option = input.find( 'option:selected') ;
        selected_option.each(function(){
            selected_option_text = $( this ).text() ;
        });
        if( str_operation == 'institutionSearch' &&
            jq_object.attr('type') === 'text' )
        {
            switch( jq_object.attr('id') )
            {
                case 'addressStreet':
                    $.map( msg, function( institution, key )
                    {
                        if( institution.name === selected_option_text )
                        {
                            text = institution.street1 ;
                        }
                    }) ;
                break;
                case 'addressStreet2':
                    $.map( msg, function( institution, key )
                    {
                        if( institution.name === selected_option_text )
                        {
                            text = institution.street2 ;
                        }
                    }) ;
                break;
                case 'addressZipCode':
                    $.map( msg, function( institution, key )
                    {
                        if( institution.name === selected_option_text )
                        {
                            text = institution.zip ;
                        }
                    }) ;
                break;
                case 'addressCity':
                    $.map( msg, function( institution, key )
                    {
                        if( institution.name === selected_option_text )
                        {
                            text = institution.city ;
                        }
                    }) ;
                break;
                case 'addressState':
                    $.map( msg, function( institution, key )
                    {
                        if( institution.name === selected_option_text )
                        {
                            text = institution.countryCode ;
                        }
                    }) ;
                break;
            }
        }
        return text ;
    };
    /**
     * @param jQuery output
     * @param string str_operation
     * @param string key
     * @param mixed msg
     */
    var handlerNullWsResponse = function( output, str_operation, key, msg )
    {
        boolResponse = false ;
        output.attr( 'disabled', 'disabled') ;
        if( typeof output.attr( 'disabled' )  !== 'undefined' && output.attr( 'disabled' )  !== false )
        {
            boolResponse = true ;
        }
        return boolResponse ;
    };
    /**
     * @fn array getArrayElementVal(input_id)
     * @param string input_id
     */
    var getArrayElementVal = function( input_id )
    {
        array_val = [] ;
        jq_obj = $( "#" + input_id ) ;
        tag_name = jq_obj.prop("tagName").toLowerCase() ;
        switch( tag_name )
        {
            case 'select':
                jq_obj.each(function(){
                    array_val.push( jq_obj.val() ) ;
                });
            break;
            case 'input':
                current_type = jq_obj.prop("type") ;
                switch( current_type )
                {
                    case 'checkbox':
                        jq_obj = $( "#" + input_id + ':checked' ) ;
                        jq_obj.each(function(){
                            array_val.push( jq_obj.val() ) ;
                        });
                    break;
                    default:
                        array_val.push( jq_obj.val() ) ;
                    break;
                }
            break ;
            default:
                array_val.push( jq_obj.val() ) ;
            break;
        }
        return array_val ;
    };
    /**
     * @fn void handlerCall( input_id, call_function, object )
     * @param string  input_id
     * @param string call_function
     * @param jQuery object
     */
    var handlerCall = function( input_id, call_function, output_id, trigger_value, operation )
    {
        bool_execute_function = false ;
        // on remonte le tableau de value en cours
        current_array_input_val = getArrayElementVal( input_id ) ;
        isEventValueInValueArray = inArray( trigger_value, current_array_input_val ) ;
        if( isEventValueInValueArray === true || trigger_value === '*' )
        {
            bool_execute_function = true ;
        }
        // on execute l'appel de fontion ssi la valeur conditionnelle ( trigger_value ) vaut la valeur de l'input en cours
        if( bool_execute_function === true )
        {
            switch( call_function )
            {
                case 'webservice':
                    switch( operation )
                    {
                        case 'institutionCity':
                            global_country_code = $( '#' + input_id ).val() ;
                        break ;
                        case 'institutionSearch':
                            if( input_id === 'institutionCity')
                            {
                                global_country_code = $( '#institutionCountry option:selected' ).val() ;
                                global_city = $( '#' + input_id ).val() ;
                            }
                            if( input_id === 'institutionInstitutions' )
                            {
                                global_city = $( '#institutionCity option:selected' ).val() ;
                                global_country_code = $( '#institutionCountry option:selected' ).val() ;
                            }
                        break ;
                    }
                    webservice( $( "#" + output_id ), $( "#" + input_id ), operation ) ;
                break;
                case 'show':
                    show( $( "#" + output_id ) ) ;
                break;
                case 'hide':
                    hide( $( "#" + output_id ) ) ;
                break;
                case 'disable':
                    disable( $( "#" + output_id ) ) ;
                break ;
                case 'enable':
                    enable( $( "#" + output_id ) ) ;
                break;
            }
        }
    };

    /**
     * @fn boolean injectInstition( jq_object, obj )
     * @param jQuery jq_object
     * @param object obj
     */
    var injectElement = function( jq_object, obj, str_operation, value, label, type, input, text )
    {
        jq_object.html("") ;
        if( type === 'select' )
        {
            jq_object.append( '<option value="">Please select</option>' ) ;
        }
        boolResponse = false ;
        if( text === '' )
        {
            $.map( obj, function( values, key )
            {
                boolResponse = true ;
                option_value = option_label = '' ;
                if( $.isNumeric( key ) )
                {
                    $.map( values, function( institution_data, key_info )
                    {
                        switch( key_info )
                        {
                            case label:
                                option_label = $.trim( institution_data ) ;
                            break ;
                            case value:
                                option_value = $.trim( institution_data ) ;
                            break;
                        }
                    });
                }
                else
                {
                    switch( key )
                    {
                        case label:
                            option_label = $.trim( values ) ;
                        break ;
                        case value:
                            option_value = $.trim( values ) ;
                        break;
                    }
                }
                // on s'assure que l'objet dans lequel injecté existe bien , et que les données à injectées sont correctes
                if( jq_object.length > 0 && option_label !== '' && option_label !== null && option_label !== 'null' )
                {
                    switch( type )
                    {
                        case 'select':
                            jq_object.append( '<option value="' + option_value + '">' + option_label + '</option>' ) ;
                        break ;
                    }
                }

            });
        }
        else
        {
            jq_object.val( text ) ;
            jq_object.attr( 'disabled', 'disabled' ) ;
        }
        return boolResponse ;
    };
    /**
     * @fn boolean injectError( jq_object, msg, str_operation )
     * @param jQuery object jq_object
     * @param string msg
     * @param string str_operation
     */
    var injectError = function( jq_object, msg, str_operation )
    {
        boolResult = false ;
        errors = jq_object.siblings('.error') ;
        // on s'assure qu'il n'y ait pas une erreur en cours
        if( errors.length === 0 )
        {
            jq_object.parent().append( '<small class="error">'+ msg +'</small>' ) ;
            boolResult = true ;
        }
        else
        {
            // sinon on remplace par l'erreur interceptée
            errors.html( msg ) ;
            boolResult = true ;
        }
        return boolResult ;
    };
    /**
     * @fn integer objectSize( obj )
     * @brief return the object size
     * @param js object obj
     */
    var objectSize = function ( obj )
    {
        var count = 0;
        for( var i in obj )
        {
            if ( obj.hasOwnProperty( i ) )
            {
                count++;
            }
        }
        return count ;
    };
    /**
     * @fn void webservice( jq_object, str_operation )
     * @param jQuery jq_object
     * @param string str_operation
     */
    var webservice = function( output, input, str_operation )
    {
        ws_call( output, input, str_operation ) ;
    };
    /**
     * @fn void show( jq_object )
     * @param jQuery jq_object
     */
    var show = function( jq_object )
    {
        // on montre le champ cible
        if( jq_object.hasClass( 'hide' ) )
        {
            jq_object.removeClass( 'hide' ) ;
        }
        jq_object.show() ;
        // on montre son label
        first_parent_row = null ;
        parents = jq_object.parents('.row') ;
        parents.each(function( index ) {
            // on définit le div contenant le label
            if( index === 0 )
            {
                first_parent_row = $( this ) ;
            }
        });
        if( first_parent_row.length > 0 )
        {
            labels = first_parent_row.find('label.hide,div.hide') ;
            labels.each(function(){
                $(this).removeClass( 'hide' ) ;
                $( this ).show() ;
            });
        }
    };
    /**
     * @fn void hide( jq_object )
     * @param jQuery jq_object
     */
    var hide = function( jq_object )
    {
        // on cache le champ cible
        jq_object.hide() ;
        // on cache son label
        first_parent_row = null ;
        parents = jq_object.parents('.row') ;
        parents.each(function( index ) {
            if( index === 0 )
            {
                first_parent_row = $( this ) ;
            }
        });
        if( first_parent_row.length > 0 )
        {
            children = first_parent_row.find('label') ;
            children.each(function(){
                $( this ).addClass( 'hide' ) ;
                $( this ).hide() ;
            });
        }
    };
    /**
     * @fn void disable( jq_object )
     * @param jQuery jq_object
     */
    var disable = function( jq_object )
    {
        jq_object.attr('disabled', 'disabled') ;
    };
    /**
     * @fn void enable( jq_object )
     * @param jQuery jq_object
     */
    var enable = function( jq_object )
    {
        jq_object.removeAttr('disabled');
    };
    /**
     * @fn js object parseJson( attr )
     * @param json attr
     */
    var parseJson = function( attr )
    {
        return $.parseJSON( attr ) ;
    };
    /**
     * @fn void handlerActions( input_id, actions )
     * @param string input_id
     * @param js object actions
     */
    var handlerActions = function( input_id, actions )
    {
        $.each( actions, function( key, targets )
        {
            call_function = key ;
            $.each( targets, function(key, field)
            {
                trigger_value = field.event_value ;
                target = field.target ;
                operation = field.operation ;
                if( call_function == 'webservice' )
                {
                    // 2 cas de figure se presentent:
                    if( target === null )
                    {
                        // CAS 1 : on a une operation dans operation mais pas de target => on applique l'operation au champ en cours
                        handlerCall( input_id, call_function, input_id, trigger_value, operation ) ;
                    }
                    else
                    {
                        // CAS 2 : on a une operation dans operation et une target dans target => on applique l'operation à target
                        handlerCall( input_id, call_function, target, trigger_value, operation ) ;
                    }
                }
                else
                {
                    // on compose le tableau d'id contenu dans operation
                    if( operation.match( /,/g) !== null )
                    {
                        target_id_array = operation.split(',') ;
                    }
                    else
                    {
                        target_id_array = new Array( operation ) ;
                    }
                    // on parcourt le tableau d'id
                    for( var i = 0; i< target_id_array.length; i++ )
                    {
                        handlerCall( input_id, call_function, target_id_array[i], trigger_value, operation ) ;
                    }
                }

            });
        });
    };
    /**
     * @fn void handlerChange( event )
     * @param event event
     */
    var handlerChange = function( event )
    {
        if( event.data !== null && $.isEmptyObject( event.data ) === false )
        {
            event.preventDefault() ;
            $.each(event.data, function(key, val)
            {
                input_id = key ;
                if( input_id == event.currentTarget.id )
                {
                    event_obj = val ;
                    $.each( event_obj, function(key, val)
                    {
                        actions = val ;
                        if( key == 'change' )
                        {
                            handlerActions( input_id, actions ) ;
                        }
                    });
                }
            });
        }
    };
    /**
     * @fn void handlerBlur( event )
     * @param event event
     */
    var handlerBlur = function( event )
    {
        if( event.data !== null && $.isEmptyObject( event.data ) === false )
        {
            event.preventDefault();
            $.each(event.data, function(key, val)
            {
                input_id = key ;
                if( input_id == event.currentTarget.id )
                {
                    event_obj = val ;
                    $.each( event_obj, function(key, val)
                    {
                        actions = val ;
                        if( key == 'blur' )
                        {
                            handlerActions( input_id, actions ) ;
                        }
                    });
                }
            });
        }
    };
    /**
     * @fn void handlerBlur( event )
     * @param event event
     */
    var handlerClick = function( event )
    {
        //event.preventDefault();
        if( event.data !== null && $.isEmptyObject( event.data ) === false )
        {
            $.each(event.data, function(key, val)
            {
                input_id = key ;
                if( input_id == event.currentTarget.id )
                {
                    event_obj = val ;
                    $.each( event_obj, function(key, val)
                    {
                        actions = val ;
                        if( key == 'click' )
                        {
                            handlerActions( input_id, actions ) ;
                        }
                    });
                }
            });
        }
    };
    /**
     * @fn handlerCancel = function( event )
     * @param event event
     */
    var handlerCancel = function( event )
    {
        // on ajoute un novalidate au form
        $('#generic').attr( 'novalidate', 'novalidate' ) ;
        // on kill le listener sur le click car on force le clcik submit apres
        $( '#' + event.currentTarget.id ).die( event ) ;
        // on click pour envoyer le submit adequat
        $( '#' + event.currentTarget.id ).click() ;
    };
    /**
     * @fn handlerCancel = function( event )
     * @param event event
     */
    var handlerSubmit = function( event )
    {
        // on remonte tous les input
        inputs = $( '#generic' ).find( 'input[type="text"]' ) ;
        // on s'assure que les input avec class hide n'ait pas d'attribut required
        inputs.each(function(){
            attr_required = $( this ).attr( 'required' ) ;
            // on traite la validation via required, certain champs sont disabled ou caché pourtant ils sont required, le scope ci dessous pallie cette incohérence
            if( typeof attr_required !== 'undefined' &&
                attr_required !== false &&
                $( this ).hasClass( 'hide' ) )
            {
                // on supprime l'attribut required afin de passer la validatioin html5
                $( this ).removeAttr( 'required' ) ;
            }
        });
        // on kill le listener sur le click car on force le clik submit apres
        $( '#submit_form' ).die( event ) ;
    };
    /**
     * @fn void activateListener( jq_object )
     * @param jQuery jq_object
     */
    var activateListener = function( jq_object )
    {
        jq_object.on( "change", parseJson( jq_object.attr( 'data-event' ) ), handlerChange ) ;
        jq_object.on( "blur", parseJson( jq_object.attr( 'data-event' ) ), handlerBlur ) ;
        jq_object.on( "click", parseJson( jq_object.attr( 'data-event' ) ), handlerClick ) ;
    };
    /**
     * @fn void activateButtonListener()
     */
    var activateButtonListener = function()
    {
        // activation du listener bouton cancel
        if(  $('#cancel_generic_form').length > 0 )
        {
            $('#cancel_generic_form').on( "click", null, handlerCancel ) ;
        }
        // activation du bouton back
        if( $( '#back_button' ).length > 0 )
        {
            $( '#back_button' ).on( "click", null, handlerCancel ) ;
        }
        // activation du listener bouton name submit_form
        if( $('#submit_form').length > 0 )
        {
            $('#submit_form').on( "click", null, handlerSubmit ) ;
        }
    };
    // on s'assure que l'on est bien dans le formulaire générique
    if( $("#generic").length > 0 )
    {
        //ACTIVATION LISTENERS
        $.map( ['.text','.select_multiple','.select','.radio','.password','.mail','.integer','.file','.date','.country','.checkbox','.captcha', '.phone', '.button-field'], function( selector )
        {
            $( selector ).each(function( index ) {
                activateListener( $(this) ) ;
            });
        });
        activateButtonListener() ;
    }
};
/**
 * @fn void init_send_message_form
 */
var init_send_message_form = function()
{
    if( $('#form_send_message').length > 0 )
    {
        /**
         * @fn handlerCancelSendMessage = function( event )
         * @param event event
         */
        var handlerCancelSendMessage = function( event )
        {
            // on ajoute un novalidate au form
            $('#form_send_message').attr( 'novalidate', 'novalidate' ) ;
            // on kill le listener sur le click car on force le clcik submit apres
            $( '#' + event.currentTarget.id ).die( event ) ;
            // on click pour envoyer le submit adequat
            $( '#' + event.currentTarget.id ).click() ;
        };
        // activation du listener bouton cancel
        if(  $('#cancel_send_message').length > 0 )
        {
            $('#cancel_send_message').on( "click", null, handlerCancelSendMessage ) ;
        }
    }
};
/**
 * @fn init_search_member_result()
 */
var init_search_member_result = function()
{
    if( $('.searchResult').length > 0 )
    {
        if( $( '.active' ).length > 0 )
        {
            $li_active = $( '.active' ) ;
            $li_active.removeClass( 'active' ) ;
        }
    }
};
/**
 * @fn init_link_redirect()
 */
var init_link_redirect = function()
{
    // activation du listener bouton cancel
    if(  $('.redirect_button').length > 0 )
    {
        $('.redirect_button').on( "click", null, handlerSessionRedirect ) ;
    }
};
/**
 * @fn handlerSessionRedirect( event )
 */
var handlerSessionRedirect = function( event )
{
    // on extrait la donnée depuis l'element appelant
    post_datas = 'link=' + event.currentTarget.href ;
    // on appelle le controleur de redirect session
    $.ajax({
        type: 'POST',
        data : post_datas,
        dataType: "html",
        url: "/ezjscore/call/esmo::redirect::",
        success: function( data, status )
        {
            $( '#' + event.currentTarget.id ).die( event ) ;
            // on click pour envoyer le submit adequat
            $( '#' + event.currentTarget.id ).click() ;
        }
    });
};

var removeDbClick = function()
{
    $('nav.menu .mobile li a').on('click touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        window.location = link;
    });
};

function checkLoginSite() {
  var hostArray = location.host.split('.');
  var currentSite = hostArray.shift();
  currentSite = currentSite === 'www' ? 'esmo' : currentSite;
  //var currentSite = location.host.split('.')[0] === 'www' ? 'esmo' : location.host.split('.')[0];
  var host = hostArray.join('.');

  //déĵa loggé ?
  if ($.cookie('is_logged_in')) {
    //console.log('logged',$.cookie('logged_in_site'), currentSite );

    //just logged in ?
    if (typeof $.cookie('logged_in_site') === 'undefined') {
      //console.log('just now');

      // création des cookies
      $.cookie('logged_in_site', logged_in_site, { path: '/', domain: host });
      //console.log($.cookie('logged_in_site'));
      $.cookie('connected_sites', currentSite, { path: '/', domain: host });
    }
    //not from this site?
    else if ($.cookie('logged_in_site') !== currentSite) {
      var connectedSites = $.cookie('connected_sites').split(';');
      //console.log('connected',connectedSites );
      if (connectedSites.indexOf(currentSite) < 0) {
        //ping webges
        //console.log('ping webges');
        var post_datas = {
          ezxform_token: $( '#ezxform_token_js' ).attr('title'),
          operation:'logSiteChange',
          user_id: user_id,
          logged_in_site: logged_in_site
        };
        $.ajax({
            type: 'POST',
            data : post_datas,
            dataType: "json",
            url: "/ezjscore/call/esmo::webservice::",
            success: function( data, status )
            {
                //console.log(data, status);
                //store connected site
                connectedSites.push(currentSite);
                $.cookie('connected_sites', connectedSites.join(';'), { path: '/', domain: host } );
            }
        });
      }
    }

  }
  else {
    //console.log('pas loggé');

    //destruction du cookie
    $.removeCookie('logged_in_site', { path: '/', domain: host });
    $.removeCookie('connected_sites', { path: '/', domain: host } );
  }
}

var handleLastAccessURI = function(){
    if( $('#last_access_uri_for_login_with_esmo_account' ).length > 0 ){
        var host = location.host;
        //console.log( host ) ;

        if( $.cookie('logged_in_site') !== host ){
            //console.log( 'write cookie last_access_uri:' + $('#last_access_uri_for_login_with_esmo_account' ).val() + ' on domain path:' + host ) ;
            $.cookie('last_access_uri', location.href, { path: '/', domain: host } );
        }else{
            //console.log( 'remove cookie last_access_uri: on domain path:' + host ) ;
            $.removeCookie('last_access_uri', { path: '/', domain: host } );
        }
    }
};

function pingSiteChange(id){
  var post_datas = {
    ezxform_token: $( '#ezxform_token_js' ).attr('title'),
    operation:'logSiteChange',
    user_id: id,
    logged_in_site: logged_in_site
  };
  $.ajax({
    type: 'POST',
    data : post_datas,
    dataType: "json",
    url: "/ezjscore/call/esmo::webservice::",
    success: function( data, status )
    {
      //console.log(data, status);
    }
  });
}

var initCandidateVote = function (){

}

// FULLSCREEN VIDEO PLAYER

function fullscreenVideo(){

  if ( $('.fullscreen--video').length > 0 ){

    var fullscreenVideoClose = $('.fullscreen__close');
    var fullscreenContainer = $('.fullscreen--video');

    fullscreenVideoClose.click( function(e){
      e.preventDefault();
      closeFullscreen();
    })

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    window.onYouTubeIframeAPIReady = function() {
      console.log('onYouTubeIframeAPIReady');
      player = new YT.Player('player', {
        height: '560',
        width: '315',
        videoId: 'uLp5vXTberQ',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        closeFullscreen();
      }
    }

    function closeFullscreen(){
      fullscreenContainer.remove();
    }

  }

}

function rssRead(){
    if ( $('.social-feed-rss').length > 0 ) {
        $('.social-feed-rss').each(function(){
            $(this).socialfeed({
                rss:{
                    urls: [$(this).data('feed')],
                    limit: $(this).data('limit')
                },
                show_media:true,
                date_format: "DD MMM YYYY",
                template_html:
                '<article class="twitter-post"> \
                    <div class="line"> \
                        <span class="infos infos--feed-date">{{=it.date}}</span> \
                    </div> \
                    <p> <a href="{{=it.link}}" target="_blank">{{=it.text}}</a> </p> \
                </article><br/>',
            });
        });
    }
}
function twitterRead(){
    if ( $('.social-feed-twitter').length > 0 ) {
        $('.social-feed-twitter').each(function(){
            $(this).socialfeed({
                twitter:{
                    accounts: ['@' + $( this ).data( 'twitter_identifier' )],              //Array: Specify a list of accounts from which to pull tweets
                    limit: $(this).data('limit'),                                   //Integer: max number of tweets to load
                    consumer_key: 'UQtO1Be0TuUhIiIIZt0W88HRQ',          //String: consumer key. make sure to have your app read-only
                    consumer_secret: 'z1KkhDjGEWL5IQZgdMt4QtSZCAiYGFp9hTazRw3JKcQAqWIBCN',//String: consumer secret key. make sure to have your app read-only
                 },
                show_media:true,
                template_html: '<article class="twitter-post"> {{? it.retweeted_account }} <span class="infos--feed-retweet"><b>{{=it.author_name}}</b> Retweeted</span> {{?}} <br/> \
                {{? it.retweeted_account }}<div class="line"> \
                    <a href="{{=it.retweeted_account_link}}"> <span class="infos__feed-author"> {{=it.retweeted_account_name}} </span> - <span class="infos infos__feed-date infos__feed-date--minimalize"> @{{=it.retweeted_account}}</a> &middot; {{=it.time_ago}} </span> \
                </div> {{??}} \
                <div class="line"> \
                    <a href="{{=it.author_link}}" target="_blank"><span class="infos__feed-author">{{=it.author_name}}</span></a> - <span class="infos infos__feed-date infos__feed-date--minimalize">{{=it.time_ago}}</span> </div> \
                {{?}} \
                <p>{{=it.text}} <a href="{{=it.link}}" target="_blank">read more</a> </p> </article>',
                callback: function() {                          //Function: This is a callback function which is evoked when all the posts are collected and displayed
                    resizeBoxHeight();
                }
            });

        });
    }
}


// Gestion de l'affichage du sous-menu
function usertoolbar() {
  $(document).bind( 'touchstart click', function(e){
    var container = $(".usertoolbar__menu");
    if (container.has(e.target).length === 0)
      $(".usertoolbar__submenu").hide();
  });

  $('.usertoolbar__menu').click( function(e){
    $('.usertoolbar__submenu').toggle();
  });
}


// Gestion de l'affichage des questions/reponses
function qaToggle() {
  $('.qaToggle__question').click( function(){
    $(this).toggleClass('active').next('.qaToggle__answer').toggle();
  });
}



// Election V2
function election() {
    if ( $('.form-election').length > 0 ) {

        // Disabled Vote Button if not select A Candidate on each position
        $('.form-election .button.vote').attr('disabled', 'disabled');

        $('.form-election input.input-check').click( function() {
            var enabledButton = true;
            $('.position').each(function () {
                if ( $( this ).find("input:checked").length === 0 ){
                    enabledButton = false;
                    return false;
                }
            });

            if ( enabledButton === true ) {
                $('.form-election .button.vote').removeAttr('disabled');
            } else {
                $('.form-election .button.vote').attr('disabled', 'disabled');
            }
        });

        // Confirm vote
        var askConfirmation = true;
        $('.form-election .button.vote').click(function (e) {
            if (askConfirmation) {
                e.preventDefault();
                $.confirm({
                    title: 'Once submitted, your vote can not be changed.',
                    content: 'Do you confirm?',
                    animation: 'scale',
                    closeAnimation: 'scale',
                    buttons: {
                        confirm: {
                            text: 'Confirm submission',
                            btnClass: 'btn-blue',
                            action: function () {
                                askConfirmation = false;
                                $('.form-election .button.vote').trigger('click');
                            }
                        },
                        cancel: {
                            text: 'Go back',
                            btnClass: 'btn-orange'
                        },
                    },
                    boxWidth: '30%',
                    useBootstrap: false,
                    bootstrapClasses: {
                        container: 'confirm-container',
                        containerFluid: 'confirm-container-fluid',
                        row: 'confirm-row',
                    },
                });
            }
        });

    }
}

