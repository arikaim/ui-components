/**
 *  Arikaim
 *  @version    1.0  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license.html
 *  http://www.arikaim.com
 * 
 */

function CookieModal() { 
    var self = this;
    this.days = 7;

    this.init = function() {     
        this.days = $('#cookie_policy_modal').attr('interval');

        if (this.isApproved() == false) {
            $('#cookie_policy_modal').modal({           
                closable: true,
                onVisible: function() {               
                    self.setApproved();
                },
                onHidden: function() {               
                    self.setApproved();
                }
            }).modal('show');
        }       
    };

    this.setApproved = function(interval) {
        interval = getDefaultValue(interval,this.days);
        arikaim.storage.setCookie('privacy-policy',1,interval);
    };

    this.isApproved = function() {
        var show = arikaim.storage.getCookie('privacy-policy'); 
        return (show == 1 || show == '1') ? true : false;   
    };
}

var cookieModal = new CookieModal();

$(document).ready(function() {  
    cookieModal.init();
});
