//Create variables here
var dog,sadDog,happyDog,database;

var fedTime,lastFed,feed,addFood;

var food,foodStock;

var foods;

function preload(){

	sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")



}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  food = new Food();

 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  
}


function draw() {  
  background(45,140,85)
food.display();

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(happyDog);
}

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foods,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);


}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}


