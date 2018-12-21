var express = require('express');
var router = express.Router();
var axios= require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var users = [];
  axios.get('http://localhost:8080/api').then((response) => {
    // console.log(response.data)
    res.render('index', { title: 'Nodejs EY Workshop', users: response.data.users });
  }).catch((err)=> {
    console.log('Error: ', err);
  })
});

module.exports = router;
