'use strict';

arikaim.component.onLoaded(function(component) {
    $('.checkbox-field').checkbox({
        onChecked: function() {   
           var fieldId = $(this).attr('data-field-id');  
           $('#' + fieldId).val(1);
        },
        onUnchecked: function() { 
            var fieldId = $(this).attr('data-field-id');  
            $('#' + fieldId).val(0);
        }
    });
});