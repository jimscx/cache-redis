/**
 * Created by xinchen on 16/7/6.
 */
var redis = require('redis');
var redisConf = require('../config/redis_conf.js')

function Cache() {
  this._redis = this._redis ? this._redis : redis.createClient(redisConf.port,redisConf.host);
}

Cache.prototype.keys = function (k,fn) {
  this._redis.keys(k, fn);
};

Cache.prototype.get = function (k, fn) {
  this._redis.get(k, fn);
};

Cache.prototype.set = function (k, v, fn) {
  this._redis.set(k, v, fn);
};

Cache.prototype.expire = function (k, interval) {
  this._redis.expire(k, interval);
};

Cache.prototype.del = function (k, fn) {
  this._redis.del(k, fn);
};

Cache.prototype.hset = function (k, f, v, fn) {
  if (this._redis.hset === undefined) {
    fn(Error(), null);
  } else {
    this._redis.hset(k, f, v, fn);
  }
};

Cache.prototype.hget = function (k, f, fn) {
  if (this._redis.hget === undefined) {
    fn(Error(), null);
  } else {
    this._redis.hget(k, f, fn);
  }
};

Cache.prototype.multiDel = function (k, fn) {
  var multi = this._redis.multi();
  _.each(k, function (row) {
    multi.del(row);
  });
  multi.exec();
};

module.exports = Cache;
