/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 下午3:09
 * Description:
 */
var model = require('./model');

exports.add = function(data,callback){
    var sql = 'insert into taoyitu(' +
        'IsSeller,ModelState,MonthRateBad,MonthRateGood,MonthRateNormal,ShopName,ShopTime,' +
        'ShopType,ShopUrl,TotalRateBadCount,TotalRateNormalCount,UserArea,UserBuyerCount,UserBuyerGoodRate,UserBuyerImg,' +
        'UserName,UserRateUrl,UserSellerCount,UserSellerGoodRate,UserSellerImg,UserTime,WeekRateBad,WeekRateGood,' +
        'WeekRateNormal,YearOldRateBad,YearOldRateGood,YearOldRateNormal,YearRateBad,YearRateGood,YearRateNormal,LastUpdate) values(' +
        '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    model.execute(sql,[
        data.IsSeller,
        data.ModelState,
        data.MonthRateBad,
        data.MonthRateGood,
        data.MonthRateNormal,
        data.ShopName,
        data.ShopTime,
        data.ShopType,
        data.ShopUrl,
        data.TotalRateBadCount,
        data.TotalRateNormalCount,
        data.UserArea,
        data.UserBuyerCount,
        data.UserBuyerGoodRate,
        data.UserBuyerImg,
        data.UserName,
        data.UserRateUrl,
        data.UserSellerCount,
        data.UserSellerGoodRate,
        data.UserSellerImg,
        data.UserTime,
        data.WeekRateBad,
        data.WeekRateGood,
        data.WeekRateNormal,
        data.YearOldRateBad,
        data.YearOldRateGood,
        data.YearOldRateNormal,
        data.YearRateBad,
        data.YearRateGood,
        data.YearRateNormal,
        Date.now()
    ],function(err,result){
        if(err) return callback(err);
        return callback(err,result.affectedRows);
    });
};

//根据名字查找
exports.findByNickname = function(nick,callback){
    var sql = 'select * from taoyitu where UserName=?';
    model.find(sql,nick,function(err,result){
        callback(err,result);
    });
};

//保存数据
exports.save = function(data,callback){
    var sql = 'update taoyitu set ' +
        'IsSeller=?,ModelState=?,MonthRateBad=?,MonthRateGood=?,MonthRateNormal=?,ShopName=?,ShopTime=?,' +
        'ShopType=?,ShopUrl=?,TotalRateBadCount=?,TotalRateNormalCount=?,UserArea=?,UserBuyerCount=?,UserBuyerGoodRate=?,UserBuyerImg=?,' +
        'UserName=?,UserRateUrl=?,UserSellerCount=?,UserSellerGoodRate=?,UserSellerImg=?,UserTime=?,WeekRateBad=?,WeekRateGood=?,' +
        'WeekRateNormal=?,YearOldRateBad=?,YearOldRateGood=?,YearOldRateNormal=?,YearRateBad=?,YearRateGood=?,YearRateNormal=?,LastUpdate=? where id=?';
    model.execute(sql,[
        data.IsSeller,
        data.ModelState,
        data.MonthRateBad,
        data.MonthRateGood,
        data.MonthRateNormal,
        data.ShopName,
        data.ShopTime,
        data.ShopType,
        data.ShopUrl,
        data.TotalRateBadCount,
        data.TotalRateNormalCount,
        data.UserArea,
        data.UserBuyerCount,
        data.UserBuyerGoodRate,
        data.UserBuyerImg,
        data.UserName,
        data.UserRateUrl,
        data.UserSellerCount,
        data.UserSellerGoodRate,
        data.UserSellerImg,
        data.UserTime,
        data.WeekRateBad,
        data.WeekRateGood,
        data.WeekRateNormal,
        data.YearOldRateBad,
        data.YearOldRateGood,
        data.YearOldRateNormal,
        data.YearRateBad,
        data.YearRateGood,
        data.YearRateNormal,
        Date.now(),
        data.id
    ],function(err,result){
        if(err) return callback(err);
        return callback(err,result.affectedRows);
    });
};