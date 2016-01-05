'use strict';
/**
 * Color Manipulation class
 * @author Kaanon MacFarlane <kaanonm@gmail.com>
 * @class Color
 * @description Find out information about a particular color
 * @example var c = new Color([100,200,150]); 
 *
 *
 * TODO: compare color objects
 * TODO: support hex in constructor
 */
class Color {

    /**
     * Create the object
     * @param  {varies} opts description on color
     * var c = new Color(255,100,100);
     * var c = new Color([255,100,100]);
     * var c = new Color('#FF9922');
     * var c = new Color({r: 255, g: 100, b: 100})
     * var c = new Color({red: 255, green: 100, blue: 100})
     */
    constructor(opts) {
        var red, green, blue;

        // If passing in a hex string
        if(toString.call(opts) === "[object String]" && opts.length >= 6){
            var hex =  opts.substr(0,1) === '#' ? opts.substr(1) : opts;
            red   = "0x" + hex.substr(0,2);
            green = "0x" + hex.substr(2,2);
            blue  = "0x" + hex.substr(4,2);
        }
        // If passing in an array: 
        else if(Array.isArray(opts) && opts.length === 3){
            red    = opts[0];
            green  = opts[1];
            blue   = opts[2];
        }
        // if passing in 
        else if (arguments.length === 3){
            red    = arguments[0];
            green  = arguments[1];
            blue   = arguments[2];
        }
        else if (opts.r){
            red   = opts.r;
            green = opts.g;
            blue  = opts.b;
        }
        else if (opts.red){
            red   = opts.red;
            green = opts.green;
            blue  = opts.blue;
        }
        else {
            throw new TypeError('Invalid Initialization Options');
        }

        this.red = parseInt(red);
        this.green = parseInt(green);
        this.blue = parseInt(blue);

        // Make sure we are within the known color space
        if(this.red > 255 || this.green > 255 || this.blue > 255){
            throw new TypeError('Invalid Colorspace');   
        }
    }

    get hue(){
        if(!this._hue){
            this.initializeHSLV();
        }
        return this._hue;
    }

    get saturation(){
        if(!this._saturation){
            this.initializeHSLV();
        }
        return this._saturation;
    }

    get lightness(){
        if(!this._lightness){
            this.initializeHSLV();
        }
        return this._lightness;
    }

    get brightness(){
        return this.lightness;
    }

    get value(){
        if(!this._value){
            this.initializeHSLV();
        }
        return this._value;
    }

    name(){
        var colorMap = this.getColorMap(),
            matchedColors = this.getMatchedColors();
        
        if(matchedColors.length === 1){
            return matchedColors[0];
        }
        else if(matchedColors.length > 1){
            // If more than one color matches, sort by the distance from the reference
            // Return the color name that is closest to the reference color
            var that = this;
            var distances = matchedColors.map(function(name){
                return {
                    name: name,
                    distance: that.distance(colorMap[name].reference)
                }
            });
            distances.sort(function(a,b){
                if (a.distance > b.distance) {
                    return 1;
                }
                if (a.distance < b.distance) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            return distances[0].name;
        }
        return null;
    }
    names(){
        return this.getMatchedColors();
    }

    getMatchedColors(){
        var colorMap = this.getColorMap(),
            matchedColors = [];
        for(var colorName in colorMap){
            if( this.is(colorName)){
                matchedColors.push(colorName);
            }
        }
        return matchedColors;
    }
    /**
     * Returns the value to be used in a css declaration
     * @method css
     * @param  {float} opacity From 0 - 1
     * @return {string}
     */
    css(opacity){
        var values =  this.toArray(),
            name = 'rgb(';

        if(opacity){
            name = 'rgba(';
            values.push(opacity);
        } 
        return name + values.join(', ') + ')';
    }

    /**
     * Returns the value to be used in a css declaration
     * @method cssHSL
     * @return {string}
     */
    cssHSL(){
        var name = 'hsl(',
            values = [this.hue, this.saturation, this.lightness];
        return name + values.join(', ') + ')';
    }

    /**
     * Returns the value to be used in a css declaration
     * @method cssHSV
     * @return {string}
     */
    cssHSV(){
        var name = 'hsv(',
            values = [this.hue, this.saturation, this.value];
        return name + values.join(', ') + ')';
    }

    /**
     * Distance between this color and another color
     * @method distance
     * @param  {array} rgb [red, green, blue]
     * @return {number}
     */
    distance(rgb){
        var xyz1 = this.rgb_to_xyz(this.red, this.green, this.blue),
            xyz2 = this.rgb_to_xyz.apply(this,rgb),
            lab1 = this.xyz_to_lab.apply(this, xyz1),
            lab2 = this.xyz_to_lab.apply(this, xyz2),
            difference = this.de_1994(lab1, lab2);
        return difference;
    }

    /**
     * http://www.emanueleferonato.com/2009/08/28/color-differences-algorithm/
     * http://www.emanueleferonato.com/2009/09/08/color-difference-algorithm-part-2/
     * @method rgb_to_xyz
     * @param  {[type]}   red   [description]
     * @param  {[type]}   green [description]
     * @param  {[type]}   blue  [description]
     * @return {[type]}
     */
    rgb_to_xyz(r, g, b){
        var _red = r/255,
           _green = g/255,
           _blue = b/255,
           x,y,z;

        if(_red>0.04045){
             _red = (_red+0.055)/1.055;
             _red = Math.pow(_red,2.4);
        }
        else{
             _red = _red/12.92;
        }
        if(_green>0.04045){
             _green = (_green+0.055)/1.055;
             _green = Math.pow(_green,2.4);     
        }
        else{
             _green = _green/12.92;
        }
        if(_blue>0.04045){
             _blue = (_blue+0.055)/1.055;
             _blue = Math.pow(_blue,2.4);     
        }
        else{
             _blue = _blue/12.92;
        }
        _red *= 100;
        _green *= 100;
        _blue *= 100;
        x = _red * 0.4124 + _green * 0.3576 + _blue * 0.1805;
        y = _red * 0.2126 + _green * 0.7152 + _blue * 0.0722;
        z = _red * 0.0193 + _green * 0.1192 + _blue * 0.9505;
        return [x,y,z];
    }

    xyz_to_lab(x, y, z){
        var _x = x/95.047,
            _y = y/100,
            _z = z/108.883,
            l, a, b;
        
        if(_x>0.008856){
             _x = Math.pow(_x,1/3);
        }
        else{
             _x = 7.787*_x + 16/116;
        }
        if(_y>0.008856){
             _y = Math.pow(_y,1/3);
        }
        else{
             _y = (7.787*_y) + (16/116);
        }
        if(_z>0.008856){
             _z = Math.pow(_z,1/3);
        }
        else{
             _z = 7.787*_z + 16/116;
        }
        l= 116*_y -16;
        a= 500*(_x-_y);
        b= 200*(_y-_z);
        return [l, a, b];
    }

    de_1994( lab1, lab2){
        var c1 = Math.sqrt(lab1[1]*lab1[1]+lab1[2]*lab1[2]),
            c2 = Math.sqrt(lab2[1]*lab2[1]+lab2[2]*lab2[2]),
            dc = c1-c2,
            dl = lab1[0]-lab2[0],
            da = lab1[1]-lab2[1],
            db = lab1[2]-lab2[2],
            dh = Math.sqrt((da*da)+(db*db)-(dc*dc)),
            first = dl,
            second = dc/(1+0.045*c1),
            third = dh/(1+0.015*c1);
        return Math.sqrt(first*first+second*second+third*third);
    }

    toString() {
        return this.css();
    }

    isLight(divider = 200){
        return (this.brightness >= divider);
    };

    isDark(divider = 50){
        return (this.brightness <= divider);
    };

    isSkinTone(brown = [139,69,19]){
        if (this.saturation < 60 && 
            this.mostlyRed() && 
            this.distance(brown) < 35
        ){
            return true;
        }
        return false;
    }

    isRed(variance){
        var colorMap = this.getColorMap(),
            ret = true;

        ret = (this.hue <= colorMap.red.maxHue || this.hue > colorMap.pink.maxHue );
        delete(colorMap.red.maxHue);
        return ret && this._matchesCriterion(colorMap.red);
    }


    isGray(variance = 30){
        var colorMap = this.getColorMap(),
            ret = true;

        ret = (
            ( Math.abs(this.red - this.blue) < variance) &&
            ( Math.abs(this.red - this.green) < variance) &&
            ( Math.abs(this.blue - this.green) < variance)
        );
        return ret && this._matchesCriterion(colorMap.gray);
    }


    getColorMap(){
        return {
            red: {
                reference: [255,0,0],
                maxHue: 10,
                // minBrightness: 30,
                minSaturation: 10
            },
            brown: {
                reference: [112, 42, 11],
                minHue: 5,
                maxHue: 50,
                // maxSaturation: 84,
                // minBrightness: 18
            },
            orange: {
                reference: [253, 82, 13],
                minHue: 10,
                maxHue: 39,
                minSaturation: 71,
                minBrightness: 40
            },
            yellow: {
                reference: [255,255,0],
                minHue: 40,
                maxHue: 68,
                // minSaturation: 50,
                // minBrightness: 45
            },
            green: {
                reference: [0,255,0],
                minHue: 58.5,
                maxHue: 170,
                // minSaturation: 10,
                minBrightness: 7
            },
            blue: {
                reference: [0,0,255],
                minHue: 167,
                maxHue: 250
            },
            indigo: {
                reference: [0,0,255],
                minHue: 220,
                maxHue: 250,
                minSaturation: 60,
                maxBrightness: 35
            },
            violet: {
                reference: [164, 100, 223],
                minHue: 220,
                maxHue: 323,
                minSaturation: 13,
                // minBrightness: 10
            },
            
            pink: {
                reference: [250,50,150],
                minHue: 295,
                maxHue: 334,
                // minSaturation: 80
            },
            white: {
                reference: [255,255,255],
                maxSaturation: 5,
                minBrightness: 95
            },
            black: {
                reference: [0,0,0],
                maxSaturation: 5,
                maxBrightness: 5
            },
            gray: {
                reference: [204,204,204],
                minBrightness: 10,
                maxBrightness: 98
            }
        };
    }
    is(compare){
        var colorMap = this.getColorMap();
        if(compare === 'gray'){
            return this.isGray();
        }
        if(compare === 'red'){
            return this.isRed();
        }
        if(colorMap[compare]){
            var criterion = colorMap[compare];
            return this._matchesCriterion(criterion);
        }
        // TODO: make this work
        // else if (typeof compare === 'Color'){
        //     return this.distance(compare) < variance;   
        // }
        return false;
    }

    _matchesCriterion(criterion){
        var ret = true;

        if(criterion.minHue){
            ret = ret && this.hue >= criterion.minHue;
        }
        if(criterion.maxHue){
            ret = ret && this.hue <= criterion.maxHue;
        }
        if(criterion.maxValue){
            ret = ret && this.value < criterion.maxValue;
        }
        if(criterion.minValue){
            ret = ret && this.value >= criterion.minValue;
        }
        if(criterion.maxBrightness){
            ret = ret && this.brightness <= criterion.maxBrightness;
        }
        if(criterion.minBrightness){
            ret = ret && this.brightness >= criterion.minBrightness;
        }
        if(criterion.maxSaturation){
            ret = ret && this.saturation <= criterion.maxSaturation;
        }
        if(criterion.minSaturation){
            ret = ret && this.saturation >= criterion.minSaturation;
        }
        return ret;
    }

    //Reference: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
    initializeHSLV(){
        var r = this.red / 255, 
            g = this.green / 255, 
            b = this.blue /255;
        
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        var v = max;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
            h *= 3.6;
        }
        this._hue        = parseFloat( (h * 100).toFixed(2) );
        this._saturation = parseFloat( (s * 100).toFixed(2) );
        this._lightness  = parseFloat( (l * 100).toFixed(2) );
        this._brightness = parseFloat( ((this.red*299)+(this.green*587)+(this.blue*114))/1000 );
        this._value      = parseFloat( v );
    }

    toJSON(){
        return { red: this.red,  green:this.green, blue: this.blue,};
    }
    toArray(){
        return [this.red,this.green,this.blue];
    }
    toString(){
        return '[' + [this.red,this.green,this.blue].join(', ') + ']';
    }
};
module.exports = Color;
window.Color = Color;
