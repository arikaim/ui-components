arikaim.page.onReady(function() {
    $('.message .close').on('click', function() {
        $(this).closest('.message').transition('fade');
    });
});