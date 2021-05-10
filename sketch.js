//Create variables here

var database
var hdog, ndog, dog
var foodStock, foodS, fedTime
var feed, addFood
var foodObj
var gameState;
var readState
var currentTime
var garden, washroom, bedroom
var lastFed

function preload()
{
	//load images here

  hdog = loadImage("images/dogImg1.png")
  ndog = loadImage("images/dogImg.png")

  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  bedroom = loadImage("images/Bed Room.png")


}

function setup() {
	createCanvas(950, 725);

  database = firebase.database()

  readState = database.ref("gameState")
  readState.on("value", function(data){
    gameState = data.val();
  });

  fedTime=database.ref('feed_time');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

 dog = createSprite(599, 400, 50, 50)

 dog.addImage(ndog)
 dog.scale = 0.35
  
 foodStock = database.ref("Food")
 foodStock.on("value", readStock)

 feed=createButton("Feed the Dog !")
 feed.position(700, 95)
 feed.mousePressed(feedDog);
 
 addFood=createButton("add food")
 addFood.position(900, 95)
 addFood.mousePressed(addFoods);

 foodObj = new food(200, 200, 200, 200)



}


function draw() {  

currentTime = hour();

  currentTime = hour();
  // console.log(currentTime);
  // console.log(lastFed)
  if(currentTime==(lastFed=1)){
    update("playing")
    foodObj.Garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping")
    foodObj.Bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("bathing")
    foodObj.Washroom();
  }else{

  update("hungry")
  foodObj.display();

  }


  
// if(keyWentDown(UP_ARROW)){
//   writeStock(foodS);
//   dog.addImage(hdog);

// }
  

  if(gameState != "hungry"){

    feed.hide();
    addFood.hide();
    dog.remove();

  }else{

    feed.show();
    addFood.show();
    dog.addImage(ndog);

  }


  

// foodObj.updateFoodStock(foodS)

// foodObj.display()




drawSprites();


}

function update(state){

database.ref("/").update({
  gameState:state
});

}

function readStock(data){

  foodS = data.val()

}
function writeStock(x){
  
if(x <=0 ){

x=0;

}else{

x=x-1;

}

database.ref('/').update({
  Food:x
})

}
function addFoods(){

foodS++

database.ref("/").update({

  Food:foodS

})

}
function feedDog(){

  dog.addImage(hdog);

  if(foodS>= 1){

    foodS = foodS - 1

  }
  database.ref("/").update({

    Food:foodS
  
  })

  database.ref("/").update({

    feed_time:hour()

  })

}
