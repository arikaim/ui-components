'use strict';

arikaim.component.onLoaded(function(component) {

    component.getSelected = function() {
        return component.get('selected','').trim();
    }

    component.init = function() {
        $(component.getElement()).dropdown({
            onChange: function(selected) {
                component.set('selected',selected.trim());
            }
        });
    };

    component.init();

    return component;
});
