/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 上午10:26
 * Description:
 */
var request = require('request');
var jsdom = require('jsdom');
var model = require('./taoyitu-model');
var moment = require('moment');
var log4js = require('log4js');
var log = log4js.getLogger("message");
exports.getUserInfoByNickname = function(nickname,callback){
    model.findByNickname(nickname,function(err,result){
        if(err) return callback(err);
        var tmp = result;
        //查询数据库数据是否过期
        if(isNullObj(result) || (result.LastUpdate - moment().valueOf()) > 24 * 60 * 60 * 1000){
            var j = request.jar();
            var uri = "http://www.taoyitu.com";
            request({
                url: uri,
                jar: j
            },function(err,result,body){
                var cookie_string = j.getCookieString(uri);
                //var cookies = j.getCookies(uri);
                if(err) return callback(err);
                jsdom.env(body,function(err,window){
                    var $ = require('jquery')(window);
                    //取出post参数token
                    var token = $('input[type="hidden"]').val();
                    request({
                        method: 'POST',
                        url: 'http://www.taoyitu.com/RateUserInfo',
                        headers: {
                            'User-Agent': 'Mozilla/5.0',
                            'Cookie': cookie_string
                        },
                        form:{
                            nick: nickname,
                            __RequestVerificationToken: token
                        }
                    },function(err,result,body){
                        try{
                            var data = JSON.parse(body);
                            callback(err,body);
                            model.add(data,function(err,result){
                                if(err){
                                    log.info('更新用户' + nickname + '数据失败\t');
                                }else{
                                    log.info('更新用户' + nickname + '数据成功\t');
                                }
                            });
                        }catch(e){
                            callback(err,tmp);
                        }
                    });
                });
            });
        }else{
            log.info('用户' + nickname + '数据未到期');
            callback(err,result);
        }
    });
};

function isNullObj(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}