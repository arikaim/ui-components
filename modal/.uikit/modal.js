/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function Modal() { 
    var self = this;
  
    this.confirm = function(options, onApprove, onDeny, elementId) {
        elementId = getDefaultValue(elementId,'confirm_dialog');
        options = getDefaultValue(options,{});
        
        if (isEmpty(options.title) == false) {
            $('#modal_title').html(options.title);
        }
        if (isEmpty(options.description) == false) {
            $('.modal-description').html(options.description);
        }
        if (isEmpty(options.confirm) == false) {
            $('#confirm_button').html(options.confirm);
        }
        if (isEmpty(options.icon) == false) {
            $('#' + elementId + ' .modal-icon').attr('class','icon modal-icon ' + options.icon);           
        }
        if (isEmpty(options.icon_hide) == false) {
            $('#' + elementId + ' .modal-icon').hide();
        }
        if (isEmpty(options.component) == false) {          
            arikaim.page.loadContent({
                id: elementId + '_content',
                component: options.component.name,
                params: getDefaultValue(options.component.params,null)
            });
        }

        var deferred = new $.Deferred();
        var modal = UIkit.modal('#' + elementId);
        
        $('#cancel_button').off();
        $('#cancel_button').on('click',function() {
            modal.hide();
            deferred.reject(options);  
            callFunction(onDeny,options);   
        });

        $('#confirm_button').off();
        $('#confirm_button').on('click',function() {
            modal.hide();
            deferred.resolve(options);  
            callFunction(onApprove,options);   
        });

        modal.show();
       
        return deferred.promise();
    };

    this.confirmDelete = function(options, onApprove, onDeny) {
        return this.confirm(options,onApprove,onDeny);
    }

    this.init = function() {
        arikaim.component.loadContent('components:modal',function(result) {
            $('body').append(result.html);
        }); 
    };
}

var modal = new Modal();
