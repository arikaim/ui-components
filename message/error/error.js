'use strict';

arikaim.component.onLoaded(function() {
    $('.message .close').on('click',function() {
        $(this).closest('.message').transition('fade');
    });
});