# postcss-units

This is a [postcss](https://www.npmjs.com/package/postcss) plugin of units tranform
### contact
email: xieke76@qq.com


## Usage

### Node

```javascript
var postcss = require('postcss');
var units= require('postcss-units');
var originCssText = '...';
var newCssText = postcss().use(units({remUnit: 64})).process(originCssText).css;
```


### Gulp

```
npm install gulp-postcss
```

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var units = require('postcss-units');

//参数可以传对像数组，可以传json,即  [object,object] 或 object
//多个单位要转换传数组，单个传object
let obj = [
      {
        unit: 'rem', //要转的单位
        divisor: 10, //换算差值，即原要转的数字 n/10
        raw: 'ipx', // 要转换的单位
        accuracy: 6 //精确度，保留的小数位数
      },
      {
        unit:'rem',
        divisor:10,
        raw: 'rpx',
        accuracy:6
      }
  ]



gulp.task('default', function() {
  var processors = [units(obj)];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

### Webpack

```
npm install postcss-loader
```

```javascript
var units = require('postcss-units');

let obj = [
      {
        unit: 'rem', //要转的单位
        divisor: 10, //换算差值，即原要转的数字 n/10
        raw: 'ipx', // 要转换的单位
        accuracy: 6 //精确度，保留的小数位数
      },
      {
        unit:'rem',
        divisor:10,
        raw: 'rpx',
        accuracy:6
      }
  ]

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function() {
    return [units(obj)];
  }
}
```
### postcss.config.js

```
module.exports = {
  parser: 'sugarss',
  "plugins": {
    "postcss-import": {},
    "postcss-cssnext": {},
    "postcss-url": {},
    'postcss-cssnext': {},
    'cssnano': {},
    'postcss-units':{
        unit: 'rem', 
        divisor: 10,
        raw: 'ipx', 
        accuracy: 6 
      },
    "autoprefixer": {}
  }
}

```

