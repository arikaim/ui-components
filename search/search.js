/**
 *  Arikaim
 *  @version    1.0  
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license.html
 *  http://www.arikaim.com
 * 
 */

function Search() {
    var self = this;   
    this.options = {};

    this.init = function(options, namespace, onSuccess) {
        this.options = options;
        var form_id = getValue('form_id',options,"#search_form");
        
        $('.search-fields').dropdown({           
            allowAdditions: true
        });   
        $('.search-actions').dropdown();

        arikaim.ui.button(form_id + ' .clear-form',function(element) {
            arikaim.ui.form.clear(form_id);
            return self.clear(namespace,function(result) {                  
                self.loadResult();                       
            });           
        });

        arikaim.ui.form.onSubmit(form_id,function() {
            var items = self.getSearchFields(form_id);
            var data = { search: items };
            return self.setSearch(data,namespace,function(result) {              
                self.loadResult();               
            });
        });
    };

    this.getSearchFields = function(form_id) {
        var items = {};
        $(form_id).find('.search-field').each(function(index) {
            var name = $(this).attr('name');
            var value = $(this).val();
            items[name] = value;
        });   
        return items;
    };
    
    this.clear = function(namespace, onSuccess, onError) {
        namespace = getDefaultValue(namespace,"");
        return arikaim.delete('/core/api/ui/search/' + namespace,onSuccess,onError);          
    };

    this.setSearch = function(search_data, namespace, onSuccess, onError) {
        namespace = getDefaultValue(namespace,"");  
        search_data.namespace = namespace;    
        return arikaim.put('/core/api/ui/search/',search_data,onSuccess,onError);           
    };

    this.loadResult = function(onSuccess, onError) {  
        if (isEmpty(this.options.component) == true) {
            return false;
        }       
        var event = getValue('event',this.options,'search.load');

        return arikaim.page.loadContent({
            id: self.options.id,
            component: self.options.component
        },function(result) {
            arikaim.events.emit(event,result);
            callFunciton(onSuccess,result);
        },onError);
    };
}

if (isEmpty(search) == true) {
    var search = new Search();
}
