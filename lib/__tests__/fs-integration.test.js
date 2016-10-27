var assert = require('assert');
var path = require('path');
var os = require('os');
var fs = require('fs');
var fse = require('../');

/* global afterEach, beforeEach, describe, it */

describe('native fs', function () {
  var TEST_DIR;

  beforeEach(function (done) {
    TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'native-fs');
    fse.emptyDir(TEST_DIR, done);
  });

  afterEach(function (done) {
    fse.remove(TEST_DIR, done);
  });

  it('should use native fs methods', function () {
    var file = path.join(TEST_DIR, 'write.txt');
    fse.writeFileSync(file, 'hello');
    var data = fse.readFileSync(file, 'utf8');
    assert.equal(data, 'hello');
  });

  it('should have native fs constants', function () {
    // Node.js v0.12 / IO.js
    if ('F_OK' in fs) {
      assert.equal(fse.F_OK, fs.F_OK);
    }
  });
});
