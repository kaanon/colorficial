!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t){i(this,e);var n,r,s;if("[object String]"===toString.call(t)&&t.length>=6){var a="#"===t.substr(0,1)?t.substr(1):t;n="0x"+a.substr(0,2),r="0x"+a.substr(2,2),s="0x"+a.substr(4,2)}else if(Array.isArray(t)&&3===t.length)n=t[0],r=t[1],s=t[2];else if(3===arguments.length)n=arguments[0],r=arguments[1],s=arguments[2];else if(t.r)n=t.r,r=t.g,s=t.b;else{if(!t.red)throw new TypeError("Invalid Initialization Options");n=t.red,r=t.green,s=t.blue}if(this.red=parseInt(n),this.green=parseInt(r),this.blue=parseInt(s),this.red>255||this.green>255||this.blue>255)throw new TypeError("Invalid Colorspace")}return n(e,[{key:"name",value:function(){var e=this.getColorMap(),t=this.getMatchedColors();if(1===t.length)return t[0];if(t.length>1){var i=this,n=t.map(function(t){return{name:t,distance:i.distance(e[t].reference)}});return n.sort(function(e,t){return e.distance>t.distance?1:e.distance<t.distance?-1:0}),n[0].name}return null}},{key:"names",value:function(){return this.getMatchedColors()}},{key:"getMatchedColors",value:function(){var e=this.getColorMap(),t=[];for(var i in e)this.is(i)&&t.push(i);return t}},{key:"css",value:function(e){var t=this.toArray(),i="rgb(";return e&&(i="rgba(",t.push(e)),i+t.join(", ")+")"}},{key:"cssHSL",value:function(){var e="hsl(",t=[this.hue,this.saturation,this.lightness];return e+t.join(", ")+")"}},{key:"cssHSV",value:function(){var e="hsv(",t=[this.hue,this.saturation,this.value];return e+t.join(", ")+")"}},{key:"distance",value:function(e){var t=this.rgb_to_xyz(this.red,this.green,this.blue),i=this.rgb_to_xyz.apply(this,e),n=this.xyz_to_lab.apply(this,t),r=this.xyz_to_lab.apply(this,i),s=this.de_1994(n,r);return s}},{key:"rgb_to_xyz",value:function(e,t,i){var n,r,s,a=e/255,u=t/255,h=i/255;return a>.04045?(a=(a+.055)/1.055,a=Math.pow(a,2.4)):a/=12.92,u>.04045?(u=(u+.055)/1.055,u=Math.pow(u,2.4)):u/=12.92,h>.04045?(h=(h+.055)/1.055,h=Math.pow(h,2.4)):h/=12.92,a*=100,u*=100,h*=100,n=.4124*a+.3576*u+.1805*h,r=.2126*a+.7152*u+.0722*h,s=.0193*a+.1192*u+.9505*h,[n,r,s]}},{key:"xyz_to_lab",value:function(e,t,i){var n,r,s,a=e/95.047,u=t/100,h=i/108.883;return a=a>.008856?Math.pow(a,1/3):7.787*a+16/116,u=u>.008856?Math.pow(u,1/3):7.787*u+16/116,h=h>.008856?Math.pow(h,1/3):7.787*h+16/116,n=116*u-16,r=500*(a-u),s=200*(u-h),[n,r,s]}},{key:"de_1994",value:function(e,t){var i=Math.sqrt(e[1]*e[1]+e[2]*e[2]),n=Math.sqrt(t[1]*t[1]+t[2]*t[2]),r=i-n,s=e[0]-t[0],a=e[1]-t[1],u=e[2]-t[2],h=Math.sqrt(a*a+u*u-r*r),o=s,l=r/(1+.045*i),c=h/(1+.015*i);return Math.sqrt(o*o+l*l+c*c)}},{key:"toString",value:function(){return this.css()}},{key:"isLight",value:function(){var e=arguments.length<=0||void 0===arguments[0]?45:arguments[0];return this.luminance>=e}},{key:"isDark",value:function(){var e=arguments.length<=0||void 0===arguments[0]?45:arguments[0];return this.luminance<=e}},{key:"isSkinTone",value:function(){var e=arguments.length<=0||void 0===arguments[0]?[139,69,19]:arguments[0];return this.saturation<60&&this.mostlyRed()&&this.distance(e)<35?!0:!1}},{key:"isRed",value:function(e){var t=this.getColorMap(),i=!0;return i=this.hue<=t.red.maxHue||this.hue>t.pink.maxHue,delete t.red.maxHue,i&&this._matchesCriterion(t.red)}},{key:"isGray",value:function(){var e=arguments.length<=0||void 0===arguments[0]?30:arguments[0],t=this.getColorMap(),i=!0;return i=Math.abs(this.red-this.blue)<e&&Math.abs(this.red-this.green)<e&&Math.abs(this.blue-this.green)<e,i&&this._matchesCriterion(t.gray)}},{key:"getColorMap",value:function(){return{red:{reference:[255,0,0],maxHue:10,minSaturation:10},brown:{reference:[112,42,11],minHue:5,maxHue:50},orange:{reference:[253,82,13],minHue:10,maxHue:39,minSaturation:71,minBrightness:40},yellow:{reference:[255,255,0],minHue:40,maxHue:68},green:{reference:[0,255,0],minHue:58.5,maxHue:170,minBrightness:7},blue:{reference:[0,0,255],minHue:167,maxHue:250},indigo:{reference:[0,0,255],minHue:220,maxHue:250,minSaturation:60,maxBrightness:35},violet:{reference:[164,100,223],minHue:220,maxHue:323,minSaturation:13},pink:{reference:[250,50,150],minHue:295,maxHue:334},white:{reference:[255,255,255],maxSaturation:5,minBrightness:95},black:{reference:[0,0,0],maxSaturation:5,maxBrightness:5},gray:{reference:[204,204,204],minBrightness:10,maxBrightness:98}}}},{key:"is",value:function(e){var t=this.getColorMap();if("gray"===e)return this.isGray();if("red"===e)return this.isRed();if(t[e]){var i=t[e];return this._matchesCriterion(i)}return!1}},{key:"_matchesCriterion",value:function(e){var t=!0;return e.minHue&&(t=t&&this.hue>=e.minHue),e.maxHue&&(t=t&&this.hue<=e.maxHue),e.maxValue&&(t=t&&this.value<e.maxValue),e.minValue&&(t=t&&this.value>=e.minValue),e.maxBrightness&&(t=t&&this.brightness<=e.maxBrightness),e.minBrightness&&(t=t&&this.brightness>=e.minBrightness),e.maxSaturation&&(t=t&&this.saturation<=e.maxSaturation),e.minSaturation&&(t=t&&this.saturation>=e.minSaturation),t}},{key:"initializeHSLV",value:function(){var e,t,i=this.red/255,n=this.green/255,r=this.blue/255,s=Math.max(i,n,r),a=Math.min(i,n,r),u=(s+a)/2,h=s;if(s==a)e=t=0;else{var o=s-a;switch(t=u>.5?o/(2-s-a):o/(s+a),s){case i:e=(n-r)/o+(r>n?6:0);break;case n:e=(r-i)/o+2;break;case r:e=(i-n)/o+4}e/=6,e*=3.6}this._hue=parseFloat((100*e).toFixed(2)),this._saturation=parseFloat((100*t).toFixed(2)),this._lightness=parseFloat((100*u).toFixed(2)),this._brightness=parseFloat((299*this.red+587*this.green+114*this.blue)/1e3),this._value=parseFloat(h)}},{key:"toJSON",value:function(){return{red:this.red,green:this.green,blue:this.blue}}},{key:"toArray",value:function(){return[this.red,this.green,this.blue]}},{key:"toString",value:function(){return"["+[this.red,this.green,this.blue].join(", ")+"]"}},{key:"hue",get:function(){return this._hue||this.initializeHSLV(),this._hue}},{key:"saturation",get:function(){return this._saturation||this.initializeHSLV(),this._saturation}},{key:"lightness",get:function(){return this._lightness||this.initializeHSLV(),this._lightness}},{key:"brightness",get:function(){return this.lightness}},{key:"value",get:function(){return this._value||this.initializeHSLV(),this._value}},{key:"initializeXYZ",value:function(){var e=this.rgb_to_xyz(this.red,this.green,this.blue);this._x=e[0],this._y=e[1],this._z=e[2]}},{key:"X",get:function(){return this._x||this.initializeXYZ(),this._x}},{key:"Y",get:function(){return this._y||this.initializeXYZ(),this._y}},{key:"Z",get:function(){return this._z||this.initializeXYZ(),this._z}},{key:"luminance",get:function(){return this.Y}}]),e}();e.exports=r,window.Color=r}])});
//# sourceMappingURL=colorficial-color.map?_v=0165ec17d82df7709a45