/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 上午9:54
 * Description:
 */
require("should");
var api = require('../lib/api');
describe("api",function(){
    it("getUserInfoByNickname", function(done){
        this.timeout(6000);
        api.getUserInfoByNickname('linfeiyang000',function(err,result){
            console.log(result);
            done();
        })
    });
});