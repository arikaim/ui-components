/**
 *  Arikaim
 *  @copyright  Copyright (c) Konstantin Atanasov <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
*/
"use strict";

function FileUpload(formId, options) {   
    var defaultIdleLabel = "Drag & Drop file or <span class='filepond--label-action'> Browse </span>";

    this.registerPlugin = function(plugIn) {
        if (isEmpty(plugIn) == false && isObject(FilePond) == true) {
            FilePond.registerPlugin(plugIn);
            return true;
        }
        return false;
    };

    this.init = function(formId, options) {
        var maxFiles = getValue('maxFiles',options,1);
        var idleLabel = getValue('idleLabel',options,defaultIdleLabel);
        var acceptedFileTypes = getValue('acceptedFileTypes',options,["*"]);
        var instantUpload = getValue('instantUpload',options,false);
        var url = getValue('url',options,'/api/storage/admin/upload');
        var formFields = getValue('formFields',options,{});
        var filepondId = getValue('filepondId',options,'#file');
        var allowMultiple = getValue('allowMultiple',options,false);

        //File type validatin plugin
        this.registerPlugin(FilePondPluginFileValidateType);
       
        $(filepondId).filepond({          
            maxFiles: maxFiles,
            allowMultiple: allowMultiple,
            labelIdle: idleLabel,
            acceptedFileTypes: acceptedFileTypes,
            instantUpload: instantUpload,
            onremovefile: function(file) {
               $('.errors').hide();
            },
            server: {
                process: {
                    url: arikaim.getBaseUrl() + url,
                    method: 'POST',
                    onload: function(response) {   
                        arikaim.ui.form.enable(formId);                    
                        var response = new ApiResponse(response);                    
                        callFunction(options.onSuccess,response.getResult());
                    },
                    onerror: function(response) {  
                        arikaim.ui.form.enable(formId);   
                        var response = new ApiResponse(response);
                        callFunction(options.onError,response.getErrors());
                    },
                    ondata: (data) => {                           
                        Object.keys(formFields).forEach(function(key) {    
                            var fieldValue = $(formFields[key]).val();  
                            data.append(key,fieldValue);                               
                        });                                    
                        return data;
                    }
                },
                fetch: null,
                revert: null
            }
        });     

        arikaim.ui.form.onSubmit(formId,function() {
            arikaim.ui.form.enable(formId);  
            $(filepondId).filepond('processFiles');
        },function(result) {
            arikaim.ui.form.enable(formId);   
        },function(error) {
            arikaim.ui.form.enable(formId);   
        });
    };

    this.init(formId,options);
}