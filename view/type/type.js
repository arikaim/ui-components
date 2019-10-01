/**
 *  Arikaim
 *  @version    1.0  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license.html
 *  http://www.arikaim.com
 * 
*/

function ViewType() {
    var self = this;

    this.getViewType = function(namespace, onSuccess, onError) {
        var deferred = new $.Deferred();
        namespace = getDefaultValue(namespace,"");

        arikaim.get('/core/api/ui/paginator/view/type' + namespace,function(result) {
            deferred.resolve(result.view);  
            callFunction(onSuccess,result.view); 
        },function(error) {
            deferred.reject(error);
            callFunction(onError,error);  
        });

        return deferred.promise();
    };

    this.setViewType = function(view_type, namespace, onSuccess, onError) {
        var deferred = new $.Deferred();

        view_type = (isEmpty(view_type) == true) ? 'table' : view_type;
        namespace = getDefaultValue(namespace,"");

        var data = { 
            view: view_type,
            namespace: namespace  
        };
        arikaim.put('/core/api/ui/paginator/view/type',data,function(result) {
            deferred.resolve(result.view);  
            callFunction(onSuccess,result.view);      
        },function(error) {
            deferred.reject(error);
            callFunction(onError,error);  
        });

        return deferred.promise();
    };

    this.init = function() {
        var namespace = $('.view-type').attr('namespace');

        $('.view-type').dropdown({
            onChange: function(value) {                
                self.setViewType(value,namespace,function(result) {
                    arikaim.events.emit('view.type.changed',value); 
                });             
            }
        });  
    };
};

var viewType = new ViewType();

$(document).ready(function() {
    viewType.init();
});