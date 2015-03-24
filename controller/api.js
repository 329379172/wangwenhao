/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 上午9:48
 * Description:
 */
var api = require('../lib/api');
exports.getUserInfo = function(req, res){
    var nickname = req.query.nick;
   api.getUserInfoByNickname(nickname,function(err,result){
       res.end(JSON.stringify(result));
   });
};