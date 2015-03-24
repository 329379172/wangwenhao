/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 上午9:35
 * Description:
 */

var express = require('express');
var router = express.Router();
var api = require('../controller/api');
router.get('/getUserInfo',api.getUserInfo);
module.exports = router;