const express = require('express');
const mongoose = require('mongoose');
const Actions = require('./models/actions');
const Users = require('./models/users')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//导入proxy 解决跨域
// const proxy = require('http-proxy-middleware')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('zykee'));
app.use(session({
  secret: "zykee",
  resave: false,
  saveUninitialized: true,
  cookie: {user:"default",maxAge: 60*60*1000}
}));

mongoose.connect('mongodb://localhost:27017/data');

const db = mongoose.connection;
db.on('error',console.log);
db.once('open',()=>{
	console.log("success!");
});

// 跨域中间件
app.all('*',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    next();
});


app.post('/user',(req,res)=>{
	// res.set({
	// 			"Access-Control-Allow-Origin":"http://localhost:3000",
	// 			"Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept",
	// 			"Access-Control-Allow-Methods":"POST"
	// 		});
	console.log('POST /user……');
	const data = req.body;
	Users.findOne(data).then(info =>{
		if(!info){
			Users.create(data, function (err, result) {
				if (err) {
					return res.status(500).json({error: err.message});
				}
				res.json({msg:'first'});
			});
		}
		else{
			res.json({msg:'ok'});
		}
	});
});


app.post('/action',(req,res)=>{
	console.log('post /actions');
	const data = req.body;
	console.log(data);
	Actions.create(data,(err,result)=>{
		if (err) {
			return res.status(500).json({error: err.message});
		}
		res.send(result);
	});
});


app.listen(8080,()=>{
	console.log('running on port 8080');
});