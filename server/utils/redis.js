const { promisify } = require("util");
const redis = require("redis").createClient();
const catchAsync = require("./catchAsync");

exports.setRedis = catchAsync(async () => {
  try {
    redis.getAsync = promisify(redis.get).bind(redis);
    redis.setAsync = promisify(redis.set).bind(redis);
    redis.setexAsync = promisify(redis.setex).bind(redis);
    redis.lpushAsync = promisify(redis.lpush).bind(redis);
    redis.lrangeAsync = promisify(redis.lrange).bind(redis);
    redis.llenAsync = promisify(redis.llen).bind(redis);
    redis.lremAsync = promisify(redis.lrem).bind(redis);
    redis.lsetAsync = promisify(redis.lset).bind(redis);
    redis.hmsetAsync = promisify(redis.hset).bind(redis);
    redis.hmgetAsync = promisify(redis.hmget).bind(redis);
    redis.hgetallAsync = promisify(redis.hgetall).bind(redis);
    redis.expireAsync = promisify(redis.expire).bind(redis);
    redis.clear = promisify(redis.del).bind(redis);
    redis.ttl = promisify(redis.ttl).bind(redis);

    redis.on("connect", () => {
      console.log("💾 Redis client connected 💾");
    });

    redis.on("error", (err) => {
      console.log("Redis error", err);
    });

    global.redis = redis;
  } catch (error) {
    console.log(error);
  }
});
