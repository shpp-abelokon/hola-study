
function $(param){
  var strparam = param;

  function isstr(strparam) {
  	    return typeof(strparam) == 'string';
  	}
  var obj = isstr(strparam) ? document.querySelectorAll(strparam) : strparam;

  
  obj.html = function(){
    console.log(this.length);
        if(arguments.length == 0 ){
          for (var i = 0; i < this.length; i++) {
	    return this[i].innerHTML;
          }
        } else {
          for (var i = 0; i < this.length; i++) {
            return this[i].innerHTML = arguments[0];
          }
        }
  }
 
   return obj;
};

