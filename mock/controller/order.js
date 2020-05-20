const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

const orderTemplate = {
  'id|+1': 1,
  'name|2-5': '工兵铲',
  'price': 99.99,
  'num': 1,
  'createTime': '2020-05-03',
  'userName': '吼哈',
  'status': 'paid'
}

router.get('/list', function(req, res) {
  let page = parseInt(req.query.page || 1);
  let pageSize = parseInt(req.query.pageSize || 10);
  let totalPage = 3;  // 总共的页数
  let key = page === totalPage ? 'data|1-5' : 'data|' + pageSize;
  let template = {
    totalRecodes: 25
  };
  template[key] = [orderTemplate]
  let data = Mock.mock(template)
  res.json(data)
})

module.exports = router;