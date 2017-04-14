'use strict'
var express = require('express');
var router = express.Router();
var AV = require('leanengine');
const ouput = require('../output.js');
// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Todo = AV.Object.extend('Todo');

/**
 * 定义路由：获取所有 Todo 列表
 */
router.get('/', function (req, res, next) {
  res.render('todos', { title: '天大的小事直报系统' })
  // var status = 0;
  // var errMsg = null;
  // if (req.query) {
  //   status = req.query.status || 0;
  //   errMsg = req.query.errMsg;
  // }
  // var query = new AV.Query(Todo);
  // query.equalTo('status', parseInt(status));
  // query.include('author');
  // query.descending('updatedAt');
  // query.limit(50);
  // query.find({sessionToken: req.sessionToken}).then(function(results) {
  //   res.render('todos', {
  //     title: 'TODO 列表',
  //     user: req.currentUser,
  //     todos: results,
  //     status: status,
  //     errMsg: errMsg
  //   });
  // }, function(err) {
  //   if (err.code === 101) {
  //     // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
  //     // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
  //     res.render('todos', {
  //       title: '天大的小事直报系统',
  //       user: req.currentUser,
  //       todos: [],
  //       status: status,
  //       errMsg: errMsg
  //     });
  //   } else {
  //     throw err;
  //   }
  // }).catch(next);
});

/**
 * 定义路由：创建新的 todo
 */
router.post('/', function (req, res, next) {
  var { content,donetime, forWho, name, type } = req.body;
  ouput.output(...req.body);
  switch (type) {
    case '服务':
      type = 1;
      break;
    case '民生':
      type = 2;
      break;
    case '发展':
      type = 3;
      break;
    case '环境':
      type = 4;
      break;
    case '管理':
      type = 5;
      break;
    default:
      break;
  }
  var todo = new Todo();
  // if (req.currentUser) {
  todo.set('author', req.currentUser);
  todo.set({
    content, donetime, forWho, name, type
    // 'content':content, 
    // 'donetime':donetime, 
    // 'forWho':forWho, 
    // 'name':name, 
    // 'type':type
  })
  // 设置 ACL，可以使该 todo 只允许创建者修改，其他人只读
  // 更多的 ACL 控制详见： https://leancloud.cn/docs/js_guide.html#其他对象的安全
  var acl = new AV.ACL(req.currentUser);
  acl.setPublicReadAccess(true);
  todo.setACL(acl);
  // }


  todo.save(null, { sessionToken: req.sessionToken }).then(function (todo) {
    res.redirect('/todos');
  }).catch(next);

});

/**
 * 定义路由：删除指定 todo
 */
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  var status = req.query.status;
  var todo = AV.Object.createWithoutData('Todo', id);
  todo.destroy({ sessionToken: req.sessionToken }).then(function () {
    res.redirect('/todos?status=' + status);
  }, function (err) {
    res.redirect('/todos?status=' + status + '&errMsg=' + JSON.stringify(err));
  }).catch(next);
})

/**
 * 定义路由：标记指定 todo 状态为「完成」
 */
router.post('/:id/done', function (req, res, next) {
  var id = req.params.id;
  var todo = AV.Object.createWithoutData('Todo', id);
  todo.save({ status: 1 }, { sessionToken: req.sessionToken }).then(function () {
    res.redirect('/todos');
  }, function (err) {
    res.redirect('/todos?errMsg=' + JSON.stringify(err));
  }).catch(next);
})

/**
 * 定义路由：标记指定 todo 状态为「未完成」
 */
router.post('/:id/undone', function (req, res, next) {
  var id = req.params.id;
  var todo = AV.Object.createWithoutData('Todo', id);
  todo.save({ status: 1 }, { sessionToken: req.sessionToken }).then(function () {
    res.redirect('/todos?status=1');
  }, function (err) {
    res.redirect('/todos?status=1&errMsg=' + JSON.stringify(err));
  }).catch(next);
})

module.exports = router;
