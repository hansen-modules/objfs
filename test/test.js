'use strict';/*jshint node:true,mocha:true*/

const assert = require('assert');
const fs = require('fs');

const File = require('../index.js'); // jshint ignore:line

describe('File', () => {

  describe('constructor', () => {
    it('should return File on valid file', () => {
      assert.ok(new File('./'));
    });
  });

  describe('#strictFile(str)', () => {

    it('should return File on valid file', () => {
      assert.ok(File.strictFile('./'));
    });

    it('should throw on invalid path characters', () => {
      assert.throws(() => File.strictFile(`‘“"'!#$%&+^<=>\``));
    });

    it('should throw on falsey/non-string paths', () => {
      assert.throws(() => File.strictFile(null));
      assert.throws(() => File.strictFile(undefined));
      assert.throws(() => File.strictFile(false));
      assert.throws(() => File.strictFile(true));
      assert.throws(() => File.strictFile(0));
      assert.throws(() => File.strictFile(1));
      assert.throws(() => File.strictFile({}));
      assert.throws(() => File.strictFile([]));
    });

    it('should NOT throw on empty strings', () => {
      assert.doesNotThrow(() => File.strictFile(''));
    });
  });

  describe('get path', () => {
    it('should return the same path', () => {
      assert.equal('./', new File('./').path);
    });
  });

  describe('get absolutePath', () => {
    it('should convert the path to absolute', () => {
      assert.equal(fs.realpathSync('./'), new File('./').absolutePath);
    });
  });

//  describe('fs-extra methods', () => {
//    it('should have proper results', () => {
//      assert.doesNotThrow(() => require('../lib/test.js'));
//    });
//  });

});

const recursiveReadSync = require('recursive-readdir-sync');
/*
describe('fs-extra', () => {
  it('should cause results', () => {
*/
    const files = recursiveReadSync('./lib');
    
    for (let file of files) {
      if (file.endsWith('.test.js'))
        require('../'+file);
    }
/*
  });
});*/

