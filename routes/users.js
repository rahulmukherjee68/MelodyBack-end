'use strict';

var User = require('../model/user');
const express = require('express');
const router = express.Router();

async function saveUser(data,res) {
  var new_user = new User(data);
  User.createUser(new_user, (err, doc) => {
    if (err) {
      res.status(200).json({ status: false, message: err });
    }
    else {
      res.status(200).json({ status: true, id: doc })
    }

  });
}

router.post('/', function (req, res, next) {

  User.findUser(req.body.email, (err, doc) => {
    if (err) {
      res.status(200).json({ status: false, message: err });
    }
    else {
      if (doc.length == 0) {
        saveUser(req.body,res);
      }
      else {
        res.status(200).json({ status: true, id: doc[0].id })
      }
    }
  })
});

module.exports = router;
