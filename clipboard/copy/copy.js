'use strict';

arikaim.component.onLoaded(function() {
    $('.clipboard-copy').on('click',function() {
        var type = $(this).attr('content-type');
        var selector = $(this).attr('content-selector');
        var escape = $(this).attr('escape-content');

        clipboardCopy(selector,type,escape);
    });

    function clipboardCopy(selector,type, escape) {
        var value = (type == 'element') ? $(selector).html() : $(selector).val();
        var $input = $('<input>');
        $('body').append($input);
        if (escape == true && isEmpty(value) == false) {
            var doc = new DOMParser().parseFromString(value,'text/html');
            value = doc.documentElement.textContent;
        }
        $input.val(value);
        $input.focus();
        $input.select();
        document.execCommand('copy');
        $input.remove();  
        
        $(selector).focus()          
    }
});