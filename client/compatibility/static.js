var _27 = _27 || {};

_27.getDataByCode = function(wordsIn) {
	if (!wordsIn || wordsIn.length < 1) {
		return false;
	}
	var whitespace1 = '\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000', //换行符
		whitespace2 = '|', //字段分割
		cOut = [],
		starIndex = 0,
		soapIndex = 0,
		wordsLen = wordsIn.length;

	for (var i = 0, len = wordsLen; i < len; i++) {
		var it = wordsIn.charAt(i),
			cIndex = whitespace2.indexOf(it);
		nIndex = whitespace1.indexOf(it);

		//如果找到逗号
		if (cIndex != -1 || nIndex != -1) {
			var str = wordsIn.substring(starIndex, i);
			if (!cOut[soapIndex]) {
				cOut[soapIndex] = [];
			}
			cOut[soapIndex].push(str);
			starIndex = i + 1;
		}

		//如果找到了换行符	
		if (nIndex != -1) {
			soapIndex++;
		}
	}
	//遍历完之后，因为最后一个符号可能不是换行符，所以需要单独处理
	var str = wordsIn.substring(starIndex, wordsLen);
	cOut[soapIndex].push(str);

	return cOut;
};

_27.getTempInfo=function(key,val){
	var id=Session.get(key),
		d=Session.get("tempInfo");
	return d[id][val];
};

_27.getDataById=function(db,it,id){
    return db.findOne(id)[it];
};

_27.setTempInfo=function(id,d){
    var get=Session.get("tempInfo");

    if(!get){
      get={};
    }
    
    if(!get[id]){
      get[id]={};
    } 

    for(var i in d){ 
      get[id][i]=d[i];      
    }    

    Session.set("tempInfo", get);  
};