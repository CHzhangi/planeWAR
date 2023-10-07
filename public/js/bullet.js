class Bullet{
    constructor(x,y,type,level)//1:myplane 2:enemy  |||  level grade
    {
        this.bullet=document.createElement('div');
        this.bullet.className='bullet';
        this.type=type;
        this.bullet.style.left = `${x}px`;
        this.bullet.style.top = `${y}px`;
        this.life=1;
        this.damage=1;
        if(type==1)
        {
            if(level==1)
            {
            this.speed=8;
            bulletarray_me.push(this);
            this.bullet.className="bullet_pro";
            }
            if(level==2)
            {
            this.speed=10;
            bulletarray_me.push(this);
            this.bullet.className='bullet_pro2';
            this.damage=2;
            }
            if(level==3||level==4)
            {
            this.speed=10;
            bulletarray_me.push(this);
            this.bullet.className='bullet_pro2';
            this.damage=2;
            }
        }
        if(type==2)
        {
            if(level==3)
            {
                
                this.bullet.className='bullet_bomb2';
            }
            this.speed=3;
            bulletarray_en.push(this);
        }
        
        document.getElementById("gameenterr").appendChild(this.bullet);
        this.a=setInterval(() => {
            this.move();
        }, 15);
        this.b=setInterval(() => {
            this.ruin();
        }, 500);
    }

    move()
    {
        if(this.life>0)
        {let top = this.bullet.offsetTop;
        if(this.type==2)        
        {
            this.bullet.style.top=`${top+this.speed}px`;
        }
        if(this.type==1)  
        {
            this.bullet.style.top=`${top-this.speed}px`;
        }
        if(top>789)
        {   
            this.life=0;
            //this.ruin();
        }
        if(top<-10)
        {   
            this.life=0;
            //this.ruin();
        }
        if(this.life<=0)
        {
            this.bullet.className='bullet_ruin';
        }
    }
    }
    ruin()
    {
        if(this.life<=0){
            document.getElementById("gameenterr").removeChild(this.bullet);
            clearInterval(this.a);
            clearInterval(this.b);
        }
    }  
}