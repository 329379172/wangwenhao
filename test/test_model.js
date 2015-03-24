/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 下午2:41
 * Description:
 */
//require("should");

var model = require('../lib/model');

describe("model",function(){
    describe("#execute",function() {
        it("delete row from db", function (done) {
            model.execute('delete from taoyitu where id = ?', 1, function (err, result) {
                console.log(result);
                done();
            })
        });
    });

});