/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 下午1:41
 * Description:
 */

var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool(config.mysql);

//查询多条数据
exports.select = function(sql,options,callback){
    options = options || [];
    pool.getConnection(function(err,conn){
        if(err) return callback(err);
        conn.query(sql,options,function(err,result){
            conn.release();
            if(err) return callback(err);
            callback(err,result);
        });
    });
};

//查询一条数据
exports.find = function(sql,options,callback){
    options = options || [];
    pool.getConnection(function(err,conn){
        if(err) return callback(err);
        conn.query(sql,options,function(err,result){
            conn.release();
            if(err) return callback(err);
            if(result && result.length > 0){
                return callback(err,result[0]);
            }else{
                return callback(err,{});
            }
        });
    });
};

/**
 * 执行语句，返回执行结果
 * @param sql
 * @param options
 * @param callback
 * @return
 * { fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
 */
exports.execute = function(sql,options,callback){
    options = options || [];
    pool.getConnection(function(err,conn){
        if(err) return callback(err);
        conn.query(sql,options,function(err,result){
            conn.release();
            if(err) return callback(err);
            callback(err,result);
        });
    });
};