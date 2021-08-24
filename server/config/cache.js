const NodeCache = require("node-cache");
const myCache = new NodeCache();
// ({ stdTTL: 0, checkperiod: 600 });
/**
 * NodeCache
 *
 * @param {Integer} stdTTL=0 모든 캐시 요소에 대한 TTL 0=무제한
 * @param {Integer} checkperiod=600 자동 삭제되는 기간 0=정기점검 없음
 * @param {Boolean} useClones=true 변수의 clone 가능 여부 true:간결함, false:성능
 * @param {Boolean} deleteOnExpire=true 기간 만료시 삭제 여부(삭제/remain)
 * @param {Boolean} enableLegacyCallbacks=false  sync함수 대신 콜백의 재사용 여부 node-cache v6.x부터는 삭제(현재 5.x까지 release)
 * @param {Integer} maxkeys=-1 키의 maximum 개수
 */

const defaultTTL = 60 * 60 * 1; // 60 * 60 * 1; // 1h -> 30s로 가정

/**
 * cache.set
 * 캐시에 key, value 저장
 *
 * @param {String} key
 * @param {*} val
 * @param {Integer} ttl
 * @returns {Boolean} {default: True}
 * ex) obj = { my: "Special", variable: 42 };
 *      success = myCache.set( "myKey", obj, 10000 );
 */
module.exports.set = function (key, val, ttl) {
  return ttl ? myCache.set(key, val, ttl) : myCache.set(key, val, defaultTTL);
};

/**
 * cache.mset
 * 여러 key, value쌍 저장
 *
 * @param {Array} arr ex) [ {key:'a', val: 'aa'}, {key:'b', val: 'bb'} ]
 * @returns {Boolean}
 */
module.exports.mset = function (arr) {
  return myCache.mset(arr);
};

/**
 * cache.get(key)
 * Retrieve key
 *
 * @param {String} key
 * @returns {*} val
 */
module.exports.get = function (key) {
  return myCache.get(key);
};

/**
 * cache.take(key)
 * key의 value 리턴 및 del(key)
 *
 * @param {String} key
 * @returns {*} val
 */
module.exports.take = function (key) {
  return myCache.take(key);
};

/**
 * cache.mget([key1, key2, ..., keyn])
 * get multiple value of keys
 *
 * @param {Array} arr
 * @returns {*} values
 */
module.exports.mget = function (arr) {
  const values = myCache.mget(arr);
  return values;
};

/**
 * cache.del
 * @param {String|Array} keys
 * @returns {*} value : key의 value
 */
module.exports.del = function (keys) {
  return myCache.del(keys);
};

/**
 * set cache.ttl
 * @param {String} key
 * @param {Integer} ttl {Optional}
 * @returns {Boolean} 입력받은 키를 찾은 후 잘 변경되었는지에 대한 여부
 */
module.exports.setTtl = function (key, ttl) {
  return ttl ? myCache.ttl(key, ttl) : myCache.ttl(key, defaultTTL);
};

/**
 * get cache's ttl
 * @param {String} key
 * @returns {Integer}
 */
module.exports.getTtl = function (key) {
  return myCache.getTtl(key);
};

/**
 * 모든 키 리턴
 * @returns {List}
 */
module.exports.keys = function () {
  return myCache.keys();
};

/**
 * 해당 key 존재 여부
 * @param {String} key
 * @returns {Boolean}
 */
module.exports.has = function (key) {
  return myCache.has(key);
};

/**
 * getStats
 * result ex)
 * {
            keys: 0,    // global key count
            hits: 0,    // global hit count
            misses: 0,  // global miss count
            ksize: 0,   // global key size count in approximately bytes
            vsize: 0    // global value size count in approximately bytes
        }
 */
module.exports.getStats = function () {
  return myCache.getStats();
};

/**
 * 모든 데이터 flush
 */
module.exports.flush = function () {
  return myCache.flushAll();
};

/**
 * myCache.flushStats
 */
module.exports.flushStats = function () {
  return myCache.flushStats();
};

/**
 * myCache.close
 */
module.exports.close = function () {
  return myCache.close();
};
