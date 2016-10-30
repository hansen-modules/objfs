'use strict';
/* jshint node:true */

const fs = require('fs');
const vacuum = require("fs-vacuum");
const diveSync = require("diveSync");
const dive = require("dive");
const readlSync = require("readl");
const Readl = require('readl-async');
const crs = require('create-readdir-stream');
const xml2js = require('xml2js');

const copy = require('./lib/copy');
const copySync = require('./lib/copy-sync');
const empty = require('./lib/empty');
const ensure = require('./lib/ensure');
const json = require('./lib/json');
const mkdirs = require('./lib/mkdirs');
const move = require('./lib/move');
const output = require('./lib/output');
const remove = require('./lib/remove');
const walk = require('./lib/walk');

class File {
  constructor(path) {
    this.path = path;
  }

  get path() {
    return this.path;
  }

  get absolutePath() {
    return fs.realpathSync(this.path);
  }

  equals(file) {
    return this.path === file.path;
  }

  deepEquals(file) {
    return this.absolutePath === file.absolutePath;
  }

  // async fs exists
  exists(callback) {
    fs.stat(this.path, function(err) {
      if (err === null) {
        callback(true); // file exists
      } else if (err.code == 'ENOENT') {
        callback(false); // file does not exist
      } else {
        callback(err); // unknown error
      }
    });
  }
  
  // get a child file of this file
  resolve(child) {
    const stat = fs.lstatSync(this.path);
    if (stat.isDirectory()) {
      let f;
      if (this.path.endsWith('/') || this.path.endsWith('\\')) {
        f = this.path + child;
      } else if (this.path.indexOf('/') > -1) {
        f = this.path + '/' + child;
      } else if (this.path.indexOf('\\') > -1) {
        f = this.path + '\\' + child;
      } else {
        f = this.path + '/' + child;
      }
      return new File(f);
    }
  }
  
  // forEachChild(function(file), options])
  forEachChildSync(func, options) {
    const children = fs.readdirSync(this.path, options);
    for (let i = 0, len = children.length; i < len; i++) {
      func(children[i]);
    }
  }

  // forEachChild(function(error, fileArray)[, options], callback)
  forEachChild(func, options) {
    fs.readdir(this.path, options, function(err, children) {
      if (err) {
        func(err);
      } else {
        for (let i = 0, len = children.length; i < len; i++) {
          func(null, children[i]);
        }
      }
    });
  }

  // vacuum(directory, options, callback)
  vacuum(options, callback) {
    return vacuum(this.path, options, callback);
  }

  // dive(directory[, options], action[, complete]);
  dive(options, action, complete) {
    return dive(this.path, options, action, complete);
  }

  // diveSync(dir[, opt], action)
  diveSync(opt) {
    let files = [];
    function action(err, file) {
      if (err) throw err;
      files.push(file);
    }
    diveSync(this.path, opt || action, opt ? action : undefined);
    return files;
  }

  // readl(file, options, callback)
  readlSync(options, callback) {
    return readlSync(this.path, options, callback);
  }

  readl(options) {
    return new Readl(this.path, options);
  }

  // createReaddirStream(dir[, options])
  createReaddirStream(options) {
    return crs.createReaddirStream(this.path, options);
  }

  // readXML(function(err, parsedObject))
  readXML(callback) {
    fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) {
        callback(err);
      } else {
        xml2js.parseString(data, { async: true }, callback); 
      }
    });
  }

  // readXMLSync()
  readXMLSync() {
    const fdata = fs.readFileSync(this.path, 'utf8');
    let err = null;
    let data;

    xml2js.parseString(fdata, { async: false }, (aerr, adata) => {
      err = aerr;
      data = adata;
    });

    if (err) throw err;
    return data;
  }

  // readLinesSync([encoding])
  readLinesSync(encoding = 'utf8') {
    const data = fs.readFileSync(this.path, encoding);
    if (data.indexOf('\r\n') > -1) {
      return data.split('\r\n');
    } else if (data.indexOf('\n') > -1) {
      return data.split('\n');
    } else {
      return [data];
    }
  }

  readSync(encoding = 'utf8') {
    return fs.readFileSync(this.path, encoding);
  }

  // ALL CODE BELOW THIS POINT IS MACHINE-GENERATED. DO NOT MODIFY BY HAND.

  // fs-extra methods

  copy() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return copy.copy.apply(null, args);
  }
  copySync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return copySync.copySync.apply(null, args);
  }
  emptyDir() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return empty.emptyDir.apply(null, args);
  }
  emptyDirSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return empty.emptyDirSync.apply(null, args);
  }
  ensureFile() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureFile.apply(null, args);
  }
  ensureFileSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureFileSync.apply(null, args);
  }
  ensureDir() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureDir.apply(null, args);
  }
  ensureDirSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureDirSync.apply(null, args);
  }
  ensureLink() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureLink.apply(null, args);
  }
  ensureLinkSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureLinkSync.apply(null, args);
  }
  ensureSymlink() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureSymlink.apply(null, args);
  }
  ensureSymlinkSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return ensure.ensureSymlinkSync.apply(null, args);
  }
  mkdirs() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return mkdirs.mkdirs.apply(null, args);
  }
  mkdirsSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return mkdirs.mkdirsSync.apply(null, args);
  }
  move() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return move.move.apply(null, args);
  }
  outputFile() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return output.outputFile.apply(null, args);
  }
  outputFileSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return output.outputFileSync.apply(null, args);
  }
  outputJson() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return output.outputJson.apply(null, args);
  }
  outputJsonSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return output.outputJsonSync.apply(null, args);
  }
  readJson() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return json.readJson.apply(null, args);
  }
  readJsonSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return json.readJsonSync.apply(null, args);
  }
  writeJson() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return json.writeJson.apply(null, args);
  }
  writeJsonSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return json.writeJsonSync.apply(null, args);
  }
  remove() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return remove.remove.apply(null, args);
  }
  removeSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return remove.removeSync.apply(null, args);
  }
  walk() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return walk.walk.apply(null, args);
  }

  // `fs` methods

  // find/replace regex to apply. remember to remove fs.exists()!
  // fs\.(.*)\((.*)\r\n
  //   // fs\.\1\(\2\r\n  \1\(\) \{\r\n    var args = \(arguments.length === 1 ? \[arguments\[0]] : Array.apply\(null, arguments\)\);\r\n    args\.unshift\(this.path\);\r\n    fs\.\1\.apply\(null, args\);\r\n  \}\r\n\r\n

  // then fix my autism: (note: not actually autist)
  // fs\.(.*?)\.apply
  // return fs\.\1\.apply

  // then make it const:
  // ^    var  
  //     const  

  // fs.access(path[, mode], callback)
  access() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.access.apply(null, args);
  }

  // fs.accessSync(path[, mode])
  accessSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.accessSync.apply(null, args);
  }

  // fs.chmod(path, mode, callback)
  chmod() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.chmod.apply(null, args);
  }

  // fs.chmodSync(path, mode)
  chmodSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.chmodSync.apply(null, args);
  }

  // fs.chown(path, uid, gid, callback)
  chown() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.chown.apply(null, args);
  }

  // fs.chownSync(path, uid, gid)
  chownSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.chownSync.apply(null, args);
  }

  // fs.createReadStream(path[, options])
  createReadStream() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.createReadStream.apply(null, args);
  }

  // fs.createWriteStream(path[, options])
  createWriteStream() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.createWriteStream.apply(null, args);
  }

  // fs.existsSync(path) // isnt deprecated
  existsSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.existsSync.apply(null, args);
  }

  // fs.lchmod(path, mode, callback)
  lchmod() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lchmod.apply(null, args);
  }

  // fs.lchmodSync(path, mode)
  lchmodSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lchmodSync.apply(null, args);
  }

  // fs.lchown(path, uid, gid, callback)
  lchown() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lchown.apply(null, args);
  }

  // fs.lchownSync(path, uid, gid)
  lchownSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lchownSync.apply(null, args);
  }

  // fs.lstat(path, callback)
  lstat() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lstat.apply(null, args);
  }

  // fs.lstatSync(path)
  lstatSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.lstatSync.apply(null, args);
  }

  // fs.mkdir(path[, mode], callback)
  mkdir() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.mkdir.apply(null, args);
  }

  // fs.mkdirSync(path[, mode])
  mkdirSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.mkdirSync.apply(null, args);
  }

  // fs.open(path, flags[, mode], callback)
  open() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.open.apply(null, args);
  }

  // fs.openSync(path, flags[, mode])
  openSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.openSync.apply(null, args);
  }

  // fs.readdir(path[, options], callback)
  readdir() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readdir.apply(null, args);
  }

  // fs.readdirSync(path[, options])
  readdirSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readdirSync.apply(null, args);
  }

  // fs.readlink(path[, options], callback)
  readlink() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readlink.apply(null, args);
  }

  // fs.readlinkSync(path[, options])
  readlinkSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readlinkSync.apply(null, args);
  }

  // fs.realpath(path[, options], callback)
  realpath() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.realpath.apply(null, args);
  }

  // fs.realpathSync(path[, options])
  realpathSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.realpathSync.apply(null, args);
  }

  // fs.rmdir(path, callback)
  rmdir() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.rmdir.apply(null, args);
  }

  // fs.rmdirSync(path)
  rmdirSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.rmdirSync.apply(null, args);
  }

  // fs.stat(path, callback)
  stat() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.stat.apply(null, args);
  }

  // fs.statSync(path)
  statSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.statSync.apply(null, args);
  }

  // fs.truncate(path, len, callback)
  truncate() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.truncate.apply(null, args);
  }

  // fs.truncateSync(path, len)
  truncateSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.truncateSync.apply(null, args);
  }

  // fs.unlink(path, callback)
  unlink() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.unlink.apply(null, args);
  }

  // fs.unlinkSync(path)
  unlinkSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.unlinkSync.apply(null, args);
  }

  // fs.utimes(path, atime, mtime, callback)
  utimes() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.utimes.apply(null, args);
  }

  // fs.utimesSync(path, atime, mtime)
  utimesSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.utimesSync.apply(null, args);
  }

  // fs.writeFile(file, data[, options], callback)
  writeFile() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.writeFile.apply(null, args);
  }

  // fs.writeFileSync(file, data[, options])
  writeFileSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.writeFileSync.apply(null, args);
  }

  // fs.readFile(file[, options], callback)
  readFile() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readFile.apply(null, args);
  }

  // fs.readFileSync(file[, options])
  readFileSync() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    args.unshift(this.path);
    return fs.readFileSync.apply(null, args);
  }

}

module.exports = File;