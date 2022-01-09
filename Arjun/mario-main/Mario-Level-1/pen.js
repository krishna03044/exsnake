class pen{
    constructor(_x=25,_y=125){
        this.x=_x;
        this.y=_y;
    }
    show(){
        strokeWeight(4);
        stroke(51);
        ellipse(this.x, this.y, 60, 60);
    }
    move(){
        this.x+=random(-5,+5);
        this.y+=random(-5,+5);
    }
}