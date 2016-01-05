# colorficial
Javascript Class for determining color names

Color utility. Provides functionality to determine the name of a color.
Also provides hue, saturation, value, lightness (or brightness) and can be exported as a css declaration.

## Installation

TBD

## Usage

### Instantiation
```javascript
var c = new Color(255,100,100);
var c = new Color([255,100,100]);
var c = new Color('#FF9922');
var c = new Color({r: 255, g: 100, b: 100});
var c = new Color({red: 255, green: 100, blue: 100});
```
### "is" Methods
```javascript
var c = new Color([11, 170, 181]);

c.name();
// blue

c.is('red');
// false
c.is('blue');
// true

c.isLight();
// true (if brightness > 200)
c.isLight(100);
// true (if brightness > 100);

c.isDark();
// true (if brightness < 85)
c.isDark(100);
// true (if brightness < 100);

```


### Color Attributes
```javascript
var c = new Color([11, 170, 181]);
c.red;
// 11
c.green;
// 170
c.blue
// 181
c.hue
// 183.88  (measured between 0&deg; and 360&deg;)
c.brightness
// 37.65 (measured between 0 and 100)
c.lightness
// 37.65 (synonym of brightness)
c.saturation
// 88.54 (measured between 0 and 100)
c.value
// 88.54 (measured between 0 and 100)
```

### Utility Methods
```javascript
var c = new Color([11, 170, 181]);

c.css();
// "rgb(11,170,181)"
c.css(0.5);
// "rgba(11,170,181,0.5)"
c.cssHSL();
// "hsl(11,170,181,0.5)"
c.cssHSV();
// "hsv(11,170,181,0.5)"
c.toJSON();
// { red: 11, green: 170, blue: 181 }
c.toArray();
// [ 11, 170, 181 ]
c.toString()
// "[11, 170, 181]"
```

## Supported Colors
- red
- orange
- brown
- yellow
- green
- blue
- indigo
- violet
- pink
- gray
- black
- white

## TODO
- bower support
- npm support
- more color names

## License

[MIT](http://opensource.org/licenses/MIT) © [Kaanon MacFarlane](http://kaanon.com)
