'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var units = require('..');
var postcss = require('postcss');

var opacity = function (css) {
  css.walkDecls(function (decl) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(decl, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};

describe('postcss-units', function () {

  it('[default] should output right rem file', function () {
    var srcPath = path.join(__dirname, 'source.css');
    var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});

    let obj = {
      unit: 'rem',
      divisor: 10,
      raw: 'ipx',
      accuracy: 6
    };

    var outputText = postcss().use(units(obj)).process(srcText).css;

    var expectedText = fs.readFileSync(path.join(__dirname, 'dest.basic.css'), {encoding: 'utf8'});
    assert.equal(outputText, expectedText);
  });

  it('should get along well with other plugins', function () {

    

    let obj = [
      {
        unit: 'rem',
        divisor: 10,
        raw: 'ipx',
        accuracy: 6
      },
      {
        unit:'rem',
        divisor:10,
        raw: 'rpx',
        accuracy:6
      }
  ]
    var srcPath = path.join(__dirname, 'source.css');
    var srcText = fs.readFileSync(srcPath, {encoding: 'utf8'});
    var outputText = postcss()
      .use(units(obj))
      .process(srcText).css;
    var expectedText = fs.readFileSync(path.join(__dirname, 'dest.multiple.css'), {encoding: 'utf8'});
    assert.equal(outputText, expectedText);
  });
});
