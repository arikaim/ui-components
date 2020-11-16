"use strict";
$(document).ready(function() {
    var slugSource = $('#slug').attr('slug-source');
    var value = $('#' + slugSource).val();
    $('#slug').html(arikaim.text.createSlug(value));  

    $('#' + slugSource).keyup(function() {
        var text = $(this).val();   
        var slug = arikaim.text.createSlug(text);
        slug = (slug.trim() == '') ? '&nbsp;' : slug;
            
        $('#slug').html(slug);      
    });
});