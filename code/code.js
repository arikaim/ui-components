'use strict';

arikaim.component.onLoaded(function() {
    safeCall('hljs',function(obj) {   
        obj.highlightAll();
    },true);    
});