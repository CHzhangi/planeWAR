let express=require("express");
let app=express();
let ejs=require("ejs");
const bodyparser =require("body-parser");
app.use(bodyparser.urlencoded({extended:false}));
 app.set("views",'./view');
 app.engine("html",ejs.__express);
 app.set("view engine","html");

 let indexrouter=require("./routers/head");
 app.use('/',indexrouter);
//静态资源访问



app.use("/public",express.static(__dirname+"/public"));

// app.get('/',function(req,res,next){

//    // res.send("我是项目首页");
//     res.render("../Head");
// });

app.listen(8000,function(){
    console.log("f服务器启动！");
})