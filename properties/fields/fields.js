'use strict';

arikaim.component.onLoaded(function() {
    $('.property-group').accordion();
    $('.property-language-dropdown').dropdown();
    arikaim.ui.viewPasswordButton('.view-password','#password');
});