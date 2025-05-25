'use strict';

arikaim.component.onLoaded(function(component) {

    component.close = function() {
        if (component.get('show_parent') != true) {
            $(component.getElement()).parent().hide();     
        }
        component.set('close',true);
        component.remove();                
    };
    
    component.remove = function() {
        $(component.getElement()).remove();    
    }

    component.show = function() {
        component.set('show',true);
        $(component.getElement()).parent().show();
    }

    component.init = function() {
        arikaim.ui.button($(component.getElement()).find('.panel-close-button'),
        function() { 
            component.close();
        });
        
        if (component.get('hide') != true) {     
            component.show();
        }
    };
    
    component.init();

    return component;
});