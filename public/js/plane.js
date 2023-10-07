class Plane{
    constructor(x,y,type,level){
        this.plane=document.createElement('div');
        switch(type){
            case 1:
                this.plane.className='plane';
                this.speed=4;
                this.height=43;
                this.width=57;
                this.life=1;
                break;
            case 2:
                this.plane.className='bigplane';
                this.speed=3.0;
                this.height=99;
                this.width=69;
                this.life=4;
                break;
            case 3:
                this.plane.className='bossplane';
                this.speed=1.5;
                this.height=258;
                this.width=169;
                this.life=10;
                break;
            default:
                break;
        }
        this.plane.style.left = `${x}px`;
        this.plane.style.top = `${y}px`;
        this.sendbullet;
        this.type=type;
        this.dietype=0;
        document.getElementById("gameenterr").appendChild(this.plane);
        planearray.push(this);
        this.autom=setInterval(() => {
            this.automove();
        }, 50);
        this.sendbullet=setInterval(() => {
            this.autofire();
        }, 1500);
        this.delplane=setInterval(() => {
            this.ruin();
        }, 500);
        return true;
    }
    
    automove()
    {
        var top=this.plane.offsetTop;
        if(this.life>0)
        {this.plane.style.top=`${top+this.speed}px`;}
        if(top>(800-this.height))
        {
            this.dietype=1;
            if(this.life>=1)
            {home_hp--;
            }
            this.life=0;
            if(this.type==1)
            {
            this.plane.className+=" enemy1_down4";
            }
            if(this.type==2)
            {
            this.plane.className+=" enemy2_down4";
            }
            if(this.type==3)
            {
            this.plane.className+=" enemy3_down4";
            }
        }
    }

    autofire()
    {
        var a=Math.random();
        if(a>0.6)
        {
            if(this.plane.offsetTop<30)
            {
                return false;
            }
            console.log(this.plane.offsetLeft,this.plane.offsetTop);
            new Bullet(this.plane.offsetLeft+this.width/2,this.plane.offsetTop+this.height,2,this.type);
        }
        return false;
    }
    befired(damage)
    {
        this.life-=damage;
    if(this.life<=0)
    {
        if(this.type==1)
        {
            this.plane.className+=" enemy1_down1";
        }
        if(this.type==2)
        {
            this.plane.className+=" enemy2_down1";
        }
        if(this.type==3)
        {
            this.plane.className+=" enemy3_down1";
        }
    }
    }
    ruin()
    {
        if(this.life<=0)
        {
        document.getElementById("gameenterr").removeChild(this.plane);
        if(this.dietype==0)
        {
            score+=this.type;
        }
        clearInterval(this.sendbullet);
        clearInterval(this.delplane);
        clearInterval(this.autom);
        }
    }
}