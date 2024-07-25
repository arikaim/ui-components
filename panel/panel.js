'use strict';

arikaim.component.onLoaded(function(component) {

    component.close = function() {
        if (component.get('show_parent') != true) {
            $(component.getElement()).parent().hide();     
        }
        $(component.getElement()).remove();             
    };
    
    component.remove = function() {
        $(component.getElement()).remove();    
    }

    component.init = function() {
        var closeButtons = $(component.getElement()).find('.panel-close-button');
        arikaim.ui.button(closeButtons,function() { 
            component.close();
        });
        $(component.getElement()).parent().show();
    };
    
    component.init();

    return component;
});