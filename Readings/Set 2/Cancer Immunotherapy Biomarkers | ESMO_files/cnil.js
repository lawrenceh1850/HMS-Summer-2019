/*
 * Gestion de l'affichage du message CNIL consernant les cookies
 * template associé : extension/intcnilcookies/design/standard/templates/parts/cnilcookies.tpl
**/

$(document).ready(function() {
    if ( $.cookie( 'cnilCookies' ) == null || $.cookie( 'cnilCookies' ) === 'undefined' )
    {
        $('.cnilCookies').show();
        $('header').css('margin-top', $('.cnilCookies').height() );
    }
    
    $('.cnilCookies .close').click( function(e){
        e.preventDefault();
        $('.cnilCookies').hide();
        $('header').css('margin-top', 0 );
        $.cookie( 'cnilCookies', 'read', { expires: parseInt( $('.cnilCookies').attr('data-expires') ), path: '/' } );
    });
});