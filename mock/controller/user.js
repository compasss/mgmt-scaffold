const express = require('express');
const router = express.Router();
const Mock = require('mockjs');//mockjs 导入依赖模块

router.post('/login', function(req, res) {
  let json = {
    access_token: 'abc',
    user_id: 150,
    roles: ['path1', 'path3']
  }
  res.json(Mock.mock(json))
})

router.get('/userinfo', function (req, res) {
  let json = {
    id: 150,
    roles: ['path1', 'path3']
  }
  //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
  res.json(Mock.mock(json));
});

module.exports = router;