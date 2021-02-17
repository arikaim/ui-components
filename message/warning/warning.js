'use strict';

arikaim.component.onLoaded(function() {
    $('.warning .close').on('click', function() {
        $(this).closest('.message').transition('fade');
    });
});