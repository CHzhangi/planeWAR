class meplane{
    constructor(x,y,level){
        this.meplane=document.createElement('div');
        this.meplane.className='my1plane';
        this.meplane.style.left = `${x}px`;
        this.meplane.style.top = `${y}px`;
        this.speed=1;
        this.level=1;
        this.health=6;
        document.getElementById("gameenterr").appendChild(this.meplane);
        /*setInterval(() => {
            this.automove();
        }, 15);*/
        this.delplane=setInterval(() => {
            this.ruin();
        }, 500);
        return true;
    }
    bigfire()
    {
        new Bullet(this.meplane.offsetLeft+35,this.meplane.offsetTop,1,this.level);
        new Bullet(this.meplane.offsetLeft-10,this.meplane.offsetTop+80,1,this.level);
        new Bullet(this.meplane.offsetLeft+85,this.meplane.offsetTop+80,1,this.level);
    }
    biggerfire()
    {
        new Bullet(this.meplane.offsetLeft+35,this.meplane.offsetTop,1,this.level);
        new Bullet(this.meplane.offsetLeft+12,this.meplane.offsetTop+40,1,1);
        new Bullet(this.meplane.offsetLeft-10,this.meplane.offsetTop+80,1,this.level);
        new Bullet(this.meplane.offsetLeft+50,this.meplane.offsetTop+40,1,1);
        new Bullet(this.meplane.offsetLeft+85,this.meplane.offsetTop+80,1,this.level);
    }
    fire()
    {
        new Bullet(this.meplane.offsetLeft+35,this.meplane.offsetTop,1,this.level);
    }
    levelup()
    {
        this.level=2;
    }
    levelup2()
    {
        this.level=3;
        this.meplane.className='my2plane';
    }
    levelup3()
    {
        this.level=4;
        this.meplane.className='my2plane';
    }
    befired()
    {
        this.health--;      
        if(this.health<=0)
        {
            this.meplane.className+=" my1plane_down1";
        }
    }
    ruin()
    {
        if(this.health<=0){
            document.getElementById("gameenterr").removeChild(this.meplane);
        }
    }
}