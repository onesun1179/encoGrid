
(function() {
	
	window.Enco = {};
	Enco.productBy = "ENCO C&S";
	
	Enco.namespace = function(ns_str) {
		var parts  = ns_str.split('.'),
	      	parent = Enco,
	      	i;

		if (parts[0] === "Enco") {
			parts = parts.slice(1);
		}

		for (i = 0, pl = parts.length; i < pl; i++) {
			if (typeof parent[parts[i]] === "undefined") 
				parent[parts[i]] = {};

			parent = parent[parts[i]];
		}

		return parent;
	}
	
	
	
	
	Enco.util = function() {
		/**
         * get arguments[0] type
         * @method enco.util.getType
         * @param {Object|Array|String|Number|Element|Etc} O
         * @returns {String} window|element|object|array|function|string|number|undefined|nodelist
         */
		function f_getType(O) {
			var _toString = Object.prototype.toString;
			
            if (O != null && O == O.window) {
                return "window";
            } else if (!!(O && O.nodeType == 1)) {
                return "element";
            } else if (!!(O && O.nodeType == 11)) {
                return "fragment";
            } else if (O === null) {
                return "null";
            } else if (typeof O === "undefined") {
                return "undefined";
            } else if (_toString.call(O) == "[object Object]") {
                return "object";
            } else if (_toString.call(O) == "[object Array]") {
                return "array";
            } else if (_toString.call(O) == "[object String]") {
                return "string";
            } else if (_toString.call(O) == "[object Number]") {
                return "number";
            } else if (_toString.call(O) == "[object NodeList]") {
                return "nodelist";
            } else if (typeof O === "function") {
                return "function";
            }
            console.error(O + "is none type")
            return;
		}
		
		function f_isNull(chkVal, ifNullVal) {
			if(!chkVal) return ifNullVal
			else return chkVal;
			
		}
		
		/**
		 * @Method : enco.util.isEnableType
		 * @작성일 : 2020. 5. 2.
		 * @작성자 : 이동원
		 * @Desc : 배열 내 요소들이 arguments에 해당하는지 검사
		 * @param : {array} enableTypes
		 * 		  , {array} objs
		 * @return : {boolean}
		 */
		function f_isEnableTypes(enableTypes, objs) {
			if(this.getType(enableTypes) != "array"
			|| this.getType(objs) != "array") {
				console.error("{enableTypes, objs} must be 'array'");
				throw '';
			} 
			
			if(objs.some(function(o) {
				return enableTypes.indexOf(Enco.util.getType(o)) == -1
			})) {
				throw {
					"types" : Enco.util.getType(o),
					"objs"  : objs
				}
			}
		}
		
		function f_getClone(obj) {
            if (typeof obj == 'object') {
                return JSON.parse(JSON.stringify(obj))
            }
            return obj;
		}
		
		
		return {
			getClone : f_getClone,
			getType : f_getType,
			isNull  : f_isNull,
			isEnableTypes : f_isEnableTypes 
		}
	}();
})();



