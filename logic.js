document.addEventListener("DOMContentLoaded", function () {

    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    context.fillStyle = "red"; //change style for drawing
    context.fillRect(20, 20, 10, 10); //drawing rectangle
    context.fillStyle = "blue";
    context.fillRect(100, 100, 10, 10);
    context.clearRect(0,0,800,800) // czyszczenie
    let gameWidth=1000
    let gameHeight=800;


    class Paddle{
        constructor(gameWidth, gameHeight){
            this.width=200;
            this.height=20;
            this.positionFromBottom=10
            this.position ={
                x:(gameWidth -this.width)/2,
                y:gameHeight -this.height - this.positionFromBottom,
            }
        }
        draw(context){
            context.fillRect(this.position.x, this.position.y, this.width,this.height)
        }

    }
let paddle =new Paddle(gameWidth,gameHeight);

    paddle.draw(context)

});