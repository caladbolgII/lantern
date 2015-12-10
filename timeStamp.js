module.exports = {
    	getTimeIn : function(){   
            var timein = new Date();  
            return timein;
        },
        
        getTimeOut : function(deadline){
            var timeout = new Date(deadline);
            return timeout;
        }
    
}; 