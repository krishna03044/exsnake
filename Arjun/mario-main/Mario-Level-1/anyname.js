let vari,vari2;

function preload(){

}

function setup() {
    
    vari=new pen();
    vari2=new pen();

}

function draw() {
    background(9);
    vari.show();
    vari.move();
    vari2.show();
    vari2.move();
}
