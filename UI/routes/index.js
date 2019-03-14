var express = require('express');
var router = express.Router();
var axios= require('axios');
const isOnline = require('is-online');

/* GET home page. */
router.get('/', function(req, res, next) {
  var onlineCheck;
  (async () => {
    onlineCheck = await isOnline();
    var users = [];
  axios.get('http://localhost:8080/api').then((response) => {
    // console.log(response.data)
    res.render('index', { title: 'Nodejs EY Workshop', users: response.data.users, onlineCheck: onlineCheck});
  }).catch((err)=> {
    console.log('Error: ', err);
  })
  })();
});

module.exports = router;
