/**
 *  Arikaim  
 *  @copyright  Copyright (c) Konstantin Atanasov   <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function TaskProgress() {
    
    this.post = function(url, data, onProgress, onSuccess, onError) {
        return this.request('POST',url,data,onProgress,onSuccess,onError);    
    };

    this.put = function(url, data, onProgress, onSuccess, onError) {
        return this.request('PUT',url,data,onProgress,onSuccess,onError);       
    };

    this.get = function(url, onProgress, onSuccess, onError, data) {
        return this.request('GET',url,data,onProgress,onSuccess,onError);       
    };

    this.request = function(method, url, data, onProgress, onSuccess, onError) {

        var handleProgress = (isEmpty(onProgress) == false) ? this.getHandleProgress(onProgress,onError) : null
        var handleSuccess = (isEmpty(onSuccess) == false) ? this.getHandleSuccess(onSuccess) : null

        switch (method) {
            case "GET": {              
                return arikaim.get(url,handleSuccess,onError,data,null,handleProgress);
            }
            case 'POST': 
                return arikaim.post(url,data,handleSuccess,onError,null,handleProgress);
            case 'PUT': 
                return arikaim.put(url,data,handleSuccess,onError,null,handleProgress)
        }
        
        return false;
    };

    this.getHandleSuccess = function(onSuccess) { 
         
        return function(result) {            
            if (isJSON(result) == true) {
                var dataItems = JSON.parse(result);                     
                var lastItem = dataItems[dataItems.length - 1];            
                var response = new ApiResponse(lastItem);  
                callFunction(onSuccess,response.getResult())
            } else {
                callFunction(onSuccess,result);
            }
        };                                                                                
    };

    this.getHandleProgress = function(onProgress,onError) { 
         
        return function(event) {
            var data = event.currentTarget.responseText; 
            if (isEmpty(data) == true) {
                return;
            }
            data = data.trim() + ']';
         
            if (isJSON(data) == true) {
                var dataItems = JSON.parse(data);                     
                var lastItem = dataItems[dataItems.length - 1];
            
                var response = new ApiResponse(lastItem);  
               
                if (response.hasError() == true) {                                             
                    callFunction(onError,response.getErrors());                        
                } else {
                    callFunction(onProgress,response.getResult());        
                }     
            }         
        };                                                                                       
    }; 
}

var taskProgress = new TaskProgress();
