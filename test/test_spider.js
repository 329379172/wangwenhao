/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 下午2:41
 * Description:
 */
//require("should");
var api = require('../lib/api');
var model = require('../lib/taoyitu-model');

describe("model",function(){
    it("get data and insert to db", function (done) {
        this.timeout(6000);
        api.getUserInfoByNickname('linfeiyang123456',function(err,result){
            console.log(result);
            /*model.add(JSON.parse(result),function (err, result) {
                console.log(result);
                done();
            })*/
            done();
        })

    });

});