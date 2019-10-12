/**
 *  Arikaim
 *  @version    1.0  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license.html
 *  http://www.arikaim.com
 * 
 */

function Popup() { 
    var self = this;
    this.component = null;
    this.params = null;
    this.conent_id = 'popup_content';

    this.init = function(selector, component, params, content_id) {
        this.conent_id = getDefaultValue(content_id,'popup_content');    
        this.component = component;
        this.params = getDefaultValue(params, null);
    
        $(selector).popup({
            popup : $('.popup'),
            on: 'click',
            onVisible: function(popup) {
                var params = (isEmpty(self.params) == true) ? getElementAttributes(popup,['id','class']) : self.params;
                return arikaim.page.loadContent({
                    id: self.conent_id,
                    params: params,
                    component: self.component
                },function(result) {                  
                    callFunction(onSuccess,result);
                });
            }
        });
    };
}

var popup = new Popup();