let bulletarray_en=[];//子弹队列
let bulletarray_me=[];//己方子弹队列
let planearray=[]; //敌方战机队列
var score=0;
var home_hp=10;
var levell=1;
var unit = 10;
window.onload=function(){
//获取标签元素
    function $(idname)
    {
        return document.getElementById(idname);
    }
    function find(classname)
    {
        return document.querySelector(classname);
    }
    var promise=$("bgm");
    //全局变量
    var game=$("game"), gamebegin = $("Begin"),gamestart=$("gamestart"),gameenter=$("gameenterr"),
    
    myplane=find(".my1plane"),bullets=$("bullet"),enemy=$("oppoentplane"),block= $("block"),hpblock= $("Hpblock"),
    addition=$("addition"),addition2=find(".score"),pp1=find(".pp1"),fenshu=$("fenshu"),level=find(".level"),level_n=$("level_n"),planelevel_n=$("planelevel_n");
    //gameenter.style.background="url(../images/back_2.jpg)";
    var delta_x=0;//水平方向
    var delta_y=0;//竖直方向
    var fire=0;//是否开火
    var speed=50;//控制move函数出现的速率
    var firespeed=200;
    var ifenter=true;//是否成功进入了游戏界面
    var key=[37,38,39,40,65,68,83,87];
    let mep=new meplane(560,700,0);
    myplane=find(".my1plane")

    //控制右侧的得分，难度面板的显示  
    function changescore()
    {
        var fenshu=$("fenshu");
        console.log(score);
        fenshu.innerHTML=score;
        if(levell==1)
        {
            level_n.innerHTML="简单";
            gameenter.style.background="url(public/images/backk.jpg)";
        }
        if(levell==2)
        {
            level_n.innerHTML="困难";
            gameenter.style.background="url(public/images/back_2.jpg)";
        }
        if(levell==3)
        {
            level_n.innerHTML="噩梦";
            gameenter.style.backgroundImage="url(public/images/back.jpg)";
        }
        if(levell==4)
        {
            level_n.innerHTML="地狱";
        }
        if(score>=15)
        {
            mep.levelup();
        }
        if(score>=30)
        {
            mep.levelup2();
        }
        if(score>=50)
        {
            mep.levelup3();
        }
        if(mep.level==1)
        {
            planelevel_n.innerHTML="⭐";
        }
        if(mep.level==2)
        {
            planelevel_n.innerHTML="⭐⭐";
            unit=15;
        }
        if(mep.level==3)
        {
            planelevel_n.innerHTML="⭐⭐⭐";
            unit=20;
        }
        if(mep.level==4)
        {
            planelevel_n.innerHTML="⭐⭐⭐⭐⭐";
            unit=30;
        }
    }
    //监听函数，循环调用
    var auto=setInterval(()=>{
        changescore();}
    ,0);

    //碰撞检测
    var ifin=0;
    function product(x1,y1,x2,y2,x3,y3)
    {
        var x=(x2-x1)*(y3-y1);
        var y=(y2-y1)*(x3-x1);
        return (x-y);
    }
    function iscollosion(x0,y0,x1,y1,x2,y2,x3,y3)
    {
        var x=product(x1,y1,x2,y2,x0,y0);
        var y=product(x2,y2,x3,y3,x0,y0);
        var z=product(x3,y3,x1,y1,x0,y0);
        if(x<0&&y<0&&z<0)
        {
            return true;
        }
    }
    //敌方战机子弹  与   己方战机  碰撞检测
    var needpop=[];
    var judge=setInterval(()=>{
        for(i in bulletarray_en){
            let item=bulletarray_en[i];
            let bullet_x=item.bullet.offsetLeft;
            let bullet_y=item.bullet.offsetTop;
            let myplane_x=myplane.offsetLeft;
            let myplane_y=myplane.offsetTop;
            if(iscollosion(bullet_x+2,bullet_y+10,myplane_x+80,myplane_y+100,myplane_x+40,myplane_y,myplane_x,myplane_y+100))
            {
                //item.ruin();
                item.life=0;
                item.bullet.className='bullet_ruin';
                mep.befired();
                needpop.push(i);
            }               
        }
        for(var i=needpop.length-1;i>=0;i--)
        {

            bulletarray_en.splice(i,1);
        
        }
        needpop=[];

    },0);

    //敌方战机子弹  与   己方子弹  碰撞检测
    var needpop3=[];//己方
    var needpop4=[];//敌方
    var judge=setInterval(()=>{
        for(i in bulletarray_me){
            let item=bulletarray_me[i];
            let bulletme_x=item.bullet.offsetLeft;
            let bulletme_y=item.bullet.offsetTop;
            for(j in bulletarray_en){//敌方子弹数组
                let bulleten_x=bulletarray_en[j].bullet.offsetLeft;
                let bulleten_y=bulletarray_en[j].bullet.offsetTop;
                if(bulletme_x>=bulleten_x-25 && bulletme_x<=bulleten_x+25 && bulletme_y>=bulleten_y-20 && bulletme_y<=bulleten_y+20)
                {
                    item.life=0;
                    bulletarray_en[j].life=0;
                    item.bullet.className='bullet_ruin';
                    bulletarray_en[j].bullet.className='bullet_ruin';
                    needpop3.push(i);
                    needpop4.push(j);
                    break;
                }
            }
        }               
        
        for(var i=needpop3.length-1;i>=0;i--)
        {

            bulletarray_me.splice(i,1);
        
        }
        for(var i=needpop4.length-1;i>=0;i--)
        {

            bulletarray_en.splice(i,1);
        
        }
        
        needpop3=[];
        needpop4=[];

    },0);
    //己方战机子弹   与   敌方战机   碰撞检测
    var needpop2=[];
    var judge=setInterval(()=>{
        for(i in bulletarray_me){
            let item=bulletarray_me[i];
            let bullet_x=item.bullet.offsetLeft;
            let bullet_y=item.bullet.offsetTop;
            for(j in planearray){//敌方战机数组
                let plane_x=planearray[j].plane.offsetLeft;
                let plane_y=planearray[j].plane.offsetTop;
                if(planearray[j].type==3)//类似长方形的敌方战机
                {
                    if(bullet_x+2>=plane_x && bullet_x+2<=(plane_x+planearray[j].width) && bullet_y<(plane_y+planearray[j].height))
                    {
                        //item.ruin();
                        item.life=0;
                        item.bullet.className='bullet_ruin';
                        planearray[j].befired(item.damage);
                        needpop2.push(i);
                        break;
                    }
                }
                if(planearray[j].type==1 || planearray[j].type==2){//类似三角形的敌方战机
                if(iscollosion(bullet_x+2,bullet_y,plane_x+planearray[j].width/2,plane_y+planearray[j].height,plane_x+planearray[j].width,plane_y,plane_x,plane_y))
                {
                    //item.ruin();
                    item.life=0;
                    item.bullet.className='bullet_ruin';
                    //score+=item.type;
                    planearray[j].befired(item.damage);
                    needpop2.push(i);
                    break;
                }
                }
            }               
        }
        for(var i=needpop2.length-1;i>=0;i--)
        {

            bulletarray_me.splice(i,1);
        
        }
        
        needpop2=[];

    },0);

    //控制生成敌方战机  等级分别为简单，困难，地狱
    var enemyfreq=[1,1,1,1,1,1,2,2,2,2,3,3];
    var auto_enemy=setInterval(()=>{
    if(levell==1){
        if(Math.random()>0){
            var enemytype=enemyfreq[Math.floor(Math.random()*12)];
            var left=Math.floor(Math.random()*950);
            var newenemy=new Plane(left,0,enemytype,0);
        }
    }

    },3000);
    var auto_enemy=setInterval(()=>{
        if(levell==2){
            if(Math.random()>0){
                var enemytype=enemyfreq[Math.floor(Math.random()*12)];
                var left=Math.floor(Math.random()*950);
                var newenemy=new Plane(left,0,enemytype,0);
            }
        }
    
    },2000);
    var enemyfreq3=[1,1,1,3,3,1,3,2,2,2,3,3];
    var auto_enemy=setInterval(()=>{
        if(levell==3){
            if(Math.random()>0){
                var enemytype=enemyfreq3[Math.floor(Math.random()*12)];
                var left=Math.floor(Math.random()*950);
                var newenemy=new Plane(left,0,enemytype,0);
            }
        }
    
    },300);
    var enemyfreq3=[1,1,1,1,3,1,3,2,2,2,3,3];
    var auto_enemy=setInterval(()=>{
        if(levell==4){
            if(Math.random()>0){
                var enemytype=enemyfreq3[Math.floor(Math.random()*12)];
                var left=Math.floor(Math.random()*950);
                var newenemy=new Plane(left,0,enemytype,0);
            }
        }
    
    },150);


    //对子弹数列，敌机数列对应的删除
    var a=setInterval(()=>{
        planearray=planearray.filter(function(x){

            return x.life>0;
        });
        bulletarray_en=bulletarray_en.filter(function(x){

            return x.life>0;
        });
        bulletarray_me=bulletarray_me.filter(function(x){

            return x.life>0;
        });


    },10);

    //游戏结束监听
    var a=setInterval(()=>{
        if(mep.health<=0||home_hp<=0)
        {
            //mep.classname+=" my1plane_down1";
            alert("失败！");
            clearInterval(a);
            location.reload();
        }



    },150);


    //己方战机与基地血条显示
    var hp=setInterval(()=>{
    document.getElementById("myhp").value=mep.health;
    document.getElementById("myhp").max=6;
    document.getElementById("myhp").innerHTML=mep.health+"/"+6;
    document.getElementById("jidihp").value=home_hp;
    document.getElementById("jidihp").max=10;
    document.getElementById("jidihp").innerHTML=home_hp+"/"+10;

    },5);

    //对应得分提升游戏难度
    var hp=setInterval(()=>{
        if(score>=20&&levell==1)
        {
            levell++;
        }
        if(score>=40&&levell==2)
        {
            levell++;
        }
        if(score>=100&&levell==3)
        {
            levell++;
        }
    
    },5);
    //增加监听事件keydown，并记录对应的delta_x和delta_y
    document.addEventListener('keydown',(e)=>{
        var ev = e || window.event;
        switch(ev.keyCode){
            case 74:
            fire=1;
            break;
            case 37://左
            delta_x=-1;
            break;
            case 65://左
            delta_x=-1;
            break;
            case 38://上
            delta_y=-1;
            break;
            case 87://上
            delta_y=-1;
            break;
            case 39://右
            delta_x=1;
            break;
            case 68://右
            delta_x=1;
            break;
            case 40://下
            delta_y=1;
            break;
            case 83://下
            delta_y=1;
            break;
            default:
            break;
        }
    },false);
    var key;
    //增加监听事件keyup,delta_x和delta_y归0
    document.addEventListener('keyup',(e)=>{
        var ev = e || window.event;
        promise.play();
        if(ev.keyCode==37||ev.keyCode==65||ev.keyCode==39||ev.keyCode==68)
        {
            delta_x=0;
        }
        if(ev.keyCode==38||ev.keyCode==87||ev.keyCode==40||ev.keyCode==83)
        {
            delta_y=0;
        }
        if(ev.keyCode==74)
        {
            fire=0;
        }
    },false);

    //开火函数
    var timer2 = window.setInterval(()=>{
        if(fire==1&&mep.health>0)
        {
            if(mep.level==1||mep.level==2)
            {
                mep.fire();
            }
            if(mep.level==3)
            {
                mep.bigfire();
            }
            if(mep.level==4)
            {
                mep.bigfire();
            }
            //myplane.className+=" plane";
        }
    },firespeed);

    //移动函数 每speed ms自动执行一次
    var timer = window.setInterval(()=>{
        var left = window.getComputedStyle(myplane,null).left;
        var top = window.getComputedStyle(myplane,null).top;
        left=parseInt(left)+delta_x*unit;
        top=parseInt(top)+delta_y*unit;
        //防止越界
        if(left>=0&&left<=1120){		
        myplane.style.left=left+'px';
        }
        if(top>=0&&top<=700){
        myplane.style.top=top+'px';
        }
    },speed);
   
}