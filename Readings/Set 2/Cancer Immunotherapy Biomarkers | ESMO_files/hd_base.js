/**
 * on ready init listenr functions
 */
$(document).ready( function($){
    // on initialise le listener de select category
    initCreateTicketFrontForm() ;
});
/**
 * @fn handlerHelpDeskCall
 * @brief deal wtih generic ajax helpdesk call 
 * @param string strFunction
 * @param js object params {dataName:dataValue,...}
 * @param jquery element target
 * @return boolean bool_result
 */
var handlerHelpDeskCall = function( strFunction, params, jqTarget, strPost )
{
    if( strPost !== null )
    {
        post_datas = strPost ;
    }
    else
    {
        post_datas = getAjaxPostData( params ) ;
    }
    $.ajax({
        type: 'POST',
        data : post_datas,
        dataType: "html",
        url: "/ezjscore/call/helpdesk::"+ strFunction +"::",
        success: function( data, status )
        {
            // on injecte le contenu de la reponse dans le jqTarget
            if( jqTarget.length > 0 )
            {
                jqTarget.html( data ) ;
                // au chargement du formualire de creation de ticket front on initialise le select category
                switch( strFunction )
                {
                    case'getSubcategories':
                        loadFundationForNewSelect() ;
                        activateSubCategoryListener() ;
                    break;
                    case'getAssignees':
                        loadFundationForNewSelect() ;
                    break;
                    case 'loadContactForm':
                        initCreateTicketFrontForm() ;
                    break;
                    case 'helpdeskLoadList':
                        initListTicketForm() ;
                        initStatsGraph() ;
                        initClearSelect() ;
                        initFilterAccordion() ;
                        initCategoryMultipleSelect();
                        $(document).foundation();
                    break;
                    case 'helpdeskNotificationSearchTicket':
                        iniSearchTicket() ;
                    break;
                }
            }
            if(  $('#context').length > 0 && $('#context').val() === 'back' )
            {
                initCategoryMultipleSelect() ;
                $(document).foundation('forms');
            }
        }
    });
};
/**
 *
 */
var getAjaxPostData = function( params )
{
    strPost = '' ;
    index = 0 ;
    $.each( params, function( key, value ) {
        if( index === 0 )
        {
            strPost +=  key + '=' + value ;
            index++ ;
        }
        else
        {
            strPost += '&' + key + '=' + value ;
        }
    });
    // pour gérer l'ajout de form token afin que le ajax call soit compatible avec ez
    if( $("form input[name=ezxform_token]").length > 0 )
    {
        ezxform_token = $("form input[name=ezxform_token]").val() ;
        strPost += '&ezxform_token=' + ezxform_token ;
    }
    else if( $(".custom_ezxform_token").length > 0 )
    {
        ezxform_token = $(".custom_ezxform_token").text() ;
        strPost += '&ezxform_token=' + ezxform_token ;
    }
    return strPost ;
};
/**
 *
 */
var handlerCategoryChange = function( event )
{
    if( $( '#category_id' ).val() !== '' )
    {
        handlerCommonCategoryChange( event ) ;
    }
    else
    {
        // on switch sur le context
        if( $('#context').val() === 'back' )
        {
            handlerCommonCategoryChange( event ) ;
        }
        else
        {
            // on cache les champs sub category
            $( '#sub_category_container' ).html('') ;
        }
    }
};
/**
 *
 */
var handlerCommonCategoryChange = function( event )
{
    var subCategories = handlerHelpDeskCall( 'getSubcategories', {  main_category: $( '#category_id' ).val(), context: $( '#context' ).val() }, $( '#sub_category_container' ), null ) ;
    
    // on s'assure qu'on est bien en back
    if( $('#context').length > 0 && $('#context').val() === 'back' )
    {
        handlerHelpDeskCall( 'getAssignees', {  main_category: $( '#category_id' ).val(), context: $( '#context' ).val() }, $( '#assignee_from_category' ), null ) ;
    }
};
/**
 *
 */
var handlerSubCategoryChange = function( event )
{
    if( $( '#sub_category_id' ).val() !== '' )
    {
        // on s'assure qu'on est bien en back
        if( $('#context').length > 0 && $('#context').val() === 'back' )
        {
            handlerHelpDeskCall( 'getAssignees', {  main_category: $( '#sub_category_id' ).val(), context: $( '#context' ).val() }, $( '#assignee_from_category' ), null ) ;
        }
    }
    else
    {
        // on recharge la liste de la categorie principale
        $( '#category_id' ).change() ;
    }
};
/**
 *
 */
var loadFundationForNewSelect = function()
{
    // on ne met a jour les input fundation que pour le back
    if( $('#context').length > 0 && $('#context').val() === 'back' )
    {
        $(document).foundation();
    }
};
/**
 *
 */
var activateCategoryListener = function()
{
    if( $( '#category_id' ).length > 0 )
    {
        $( '#category_id' ).on( 'change', null, handlerCategoryChange ) ;
    }
};
/**
 *
 */
var activateSubCategoryListener = function()
{
    // on active le listener sur les sous categories egalement
    if( $( '#sub_category_id' ).length > 0 )
    {
        // on fait en sorte de gérer les listener de maniere a utiliser le bon objet event
        $( '#sub_category_id' ).unbind( 'change' ) ;
        // on (re)initialise le listener sur l'element chargé ou injecté via le on change de la main category
        $( '#sub_category_id' ).on( 'change', null, handlerSubCategoryChange ) ;
    }
};
/**
 *
 */
var initCreateTicketFrontForm = function()
{
    activateCategoryListener() ;
    activateSubCategoryListener() ;
};
/**
 *
 */
var initFormContact = function()
{
    $( "#form_contact" ).on( "submit", function( event ) {
        event.preventDefault();
        handlerHelpDeskCall(    'loadContactForm', null, $( '#contact_form_container' ), $(this).serialize() ) ;
    });
};
/**
 *
 */
var loadContactForm = function()
{
	if( $( '#contact_form_container' ).length > 0 )
	{
		handlerHelpDeskCall(    'loadContactForm', {  url: $( '#contact_form_container' ).attr( 'data-url' ) }, $( '#contact_form_container' ), null ) ;
	}
};

