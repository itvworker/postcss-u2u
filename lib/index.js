'use strict';

var postcss = require('postcss');

let defualt_con = {
    unit: 'rem',
    divisor: 37.5,
    raw: 'ipx',
    accuracy: 6
}

module.exports = postcss.plugin('postcss-u2u', function (options={}) {
  return function (css, result) {
    let cssText = css.toString();

    if(typeof options === 'object' && !Array.isArray(options)) {
        
        let change = JSON.parse(JSON.stringify(defualt_con));
        if(options){
            for(let i in options) {
                change[i] = options[i]
            }
        }
        let byte = 1;
        for(let i =0, l = change.accuracy; i < l; i++) {
            byte +='0';
        }
        byte = parseInt(byte);
        let reg = new RegExp(`([0-9]+${change.raw})|([0-9]+\\.[0-9]*${change.raw})`,'g')
        cssText= cssText.replace(reg, function(word){
           return parseInt(parseFloat(word.slice(0,-change.raw.length))/change.divisor*byte)/byte+change.unit
        })
        
    }
    

    if(Array.isArray(options)) {
        let arr = options;
        arr.forEach((item,index)=>{
            let change = JSON.parse(JSON.stringify(defualt_con));
            for(let i in item) {
                change[i] = item[i]
            }
            let byte = 1;
            for(let i =0, l = change.accuracy; i < l; i++) {
                byte +='0';
            }
            byte = parseInt(byte);
            let reg = new RegExp(`([0-9]+${change.raw})|([0-9]+\\.[0-9]*${change.raw})`,'ig')
          
            cssText = cssText.replace(reg, function(word){
                return parseInt(parseFloat(word.slice(0,-change.raw.length))/change.divisor*byte)/byte+change.unit
            })
        })
        

    }
    let newCssObj = postcss.parse(cssText);
    result.root = newCssObj;
  };
});
