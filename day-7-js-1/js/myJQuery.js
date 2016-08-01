function $(param) {
    var strparam = param;
    var length = strparam.length;
    var index = 0;
    var retVal = [];
    var retType = [];
    // var task = {};

    function isSelector() {
        ch = strparam[index];
        if (ch == ' ' || ch == ',' || ch == '>') {
            return 3;
        }
        if (ch == '#' || ch == '.') {
            return 2;
        }
        return 1;

    }
    var elemType = function() {
        var retType = '';
        while (index < length && isSelector() == 2) {
            retType += strparam[index++];

        }
        console.log(retType);
        return retType;
    }

    var name = function() {
        var retVal = '';
        while (index < length && isSelector() == 1) {
            retVal += strparam[index++];
        }
        console.log("result: " + retVal);
        return retVal;
    }

    function filterFun() {
        if (elemType() == '#') {
            return document.getElementById(name());
        }
    }

    var obj = filterFun();
    console.log(obj);
    obj.html = function() {
      if(arguments.length == 0 ){
        return this.innerHTML;
      } else {
        this.innerHTML=arguments[0];
      }
    }
    return obj;
}
