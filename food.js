class food{

    constructor(){
         this.foodstock, this.lastFed
        this.image = loadImage("images/Food Stock.png")
        

    }
    getFoodStock(x){

        this.foodstock = x;

    }
    updateFoodStock(x){

        this.foodstock = x;

    }

    display(){

        background(46,139,87)

        var x=80, y=100;

        if(this.foodstock!=0 ){
            for(var i=0; i<this.foodstock;i++){
                if(i%10==0){
                    x= 80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }

    }

Bedroom(){
    background(bedroom, 550, 550)
}
Garden(){
    background(garden, 550, 550)
}
Washroom(){
    background(washroom, 550, 550)
}



}