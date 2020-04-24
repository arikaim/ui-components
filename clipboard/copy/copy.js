'use strict';

$(document).ready(function() {
    $('.clipboard-copy').on('click',function() {
        var type = $(this).attr('content-type');
        var selector = $(this).attr('content-selector');
        clipboardCopy(selector,type);
    });

    function clipboardCopy(selector, type) {
        var value = (type == 'element') ? $(selector).html() : $(selector).val();
        var $input = $('<input>');
        $('body').append($input);
        $input.val(value);
        $input.focus();
        $input.select();
        document.execCommand('copy');
        $input.remove();            
    }
});
