let express=require("express");
//
let router=express.Router();
const mysql=require('mysql');

const pool=mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'03197860616',
	database:'login',
	connectionLimit:15
});//数据库池连接数据库

router.get('/',function(req,res,next){
    res.render("../Head");
})
router.get('/login',function(req,res,next){
    res.render("../login")
})
router.get('/register',function(req,res,next){
    res.render("../register")
})
router.get('/main',function(req,res,next){
    res.render("../main")
})
router.get('/enter',function(req,res,next){
    res.render("../enter")
})
router.get('/reg',function(req,res,next){
    res.render("../reg")
})
router.post("/add",function(req,res,next){
    console.log(req.body);//获取到我们输入数据对象，在控制台中可以得到我们输入的数据
	//pool.query方法中写查询的数据库语句
	pool.query('select * from laptop where user=?',[req.body.username],(err,result)=>{
		if(err){
			next(err);
			return		
		}
			if(result.length===0){
				console.log('用户名错误！')
				return res.send('<h1>用户名错误！<h1>')
			}else{
			if(result[0].password==req.body.password){
			console.log('登录成功！')
			//res.send('<h1>登录成功！</h1><br>'+'欢迎用户：'+result[0].user);
            return res.render("../enter");
			}else if(result[0].password!==req.body.password){
			console.log('密码错误！')
			console.log(result[0].password)
			return res.send('<h1>密码错误！<h1>')
			}}
	})

});//数据库池连接数据库

router.post("/reg",function(req,res,next){
    console.log(req.body);//获取到我们输入数据对象，在控制台中可以得到我们输入的数据
	//pool.query方法中写查询的数据库语句
    pool.query('select * from laptop where user=?',[req.body.username],(err,result)=>{
		if(result.length!=0)
        return res.send('<h1>账号已被注册！<h1>')
	})
	if(req.body.password!=req.body.password2)
    {
        console.log('密码输入不一致');
        return res.send('<h1>密码输入不一致！<h1>');
    }
    var sql = "INSERT INTO laptop(`id`,`user`,`password`) VALUES(?,?,?)";
    var values=[
        ,req.body.username,req.body.password
    ];
    pool.query(sql, values, (err, results, fields) => {
        if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log('insert-succeess');
        return res.render("../reg");
    });
    

});//数据库池连接数据库
module.exports=router;