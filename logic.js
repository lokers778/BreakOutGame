document.addEventListener("DOMContentLoaded", function () {

    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    let gameWidth = window.innerWidth;
    let gameHeight = window.innerHeight;
    canvas.setAttribute("width", `${gameWidth}`)
    canvas.setAttribute("height", `${gameHeight}`)

    class Paddle {
        constructor(gameWidth, gameHeight) {
            this.width = gameWidth / 7.1;
            this.height = gameHeight / 40;
            this.positionFromBottom = 10;
            this.color = "green";
            this.speed = 15;
            this.position = {
                x: (gameWidth - this.width) / 2,
                y: gameHeight - this.height - this.positionFromBottom,
            }
        }

        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        move() {

            document.addEventListener("keydown", (event) => {

                if (event.keyCode === 37 || event.keyCode === 65) {
                    context.clearRect(this.position.x+5, this.position.y-0.5, this.width, this.height) //
                    if (this.position.x > 0) {
                        this.position.x -= this.speed;
                    }
                } else if (event.keyCode === 39 || event.keyCode === 68) {
                    context.clearRect(this.position.x-5, this.position.y-0.5, this.width, this.height) //
                    if (this.position.x < gameWidth - this.width) {
                        this.position.x += this.speed
                    }
                }

                this.draw(context)

            });

        }

    }


    class BallCanvas {
        constructor() {
            this.ball = document.querySelector(".ball");
            this.speed={x:10,y:10};
            this.position={x:10,y:10}
            this.size=20;
        }

        draw(context) {

            context.drawImage(this.ball, this.position.x, this.position.y, this.size, this.size)
        }
        update(){
            setInterval(()=>{
                context.clearRect(this.position.x, this.position.y, this.size, this.size)
                this.position.x +=this.speed.x;
                this.position.y +=this.speed.y;
                if(this.position.x+this.size>gameWidth||this.position.x<0){
                    this.speed.x=-this.speed.x;
                }
                if(this.position.y<0){
                    this.speed.y=-this.speed.y;
                }
                if(this.position.y+this.size>gameHeight){
                }
                if(this.position.y+this.size>=paddle.position.y && this.position.x>paddle.position.x && this.position.x<paddle.position.x +paddle.width ){
                    this.speed.y=-this.speed.y;
                    this.position.y=paddle.position.y-this.size
                }

                ball.draw(context);
            },50)

        }
    }
    class Brick {
        constructor(position) {
            this.brick = document.querySelector(".brick");
            this.width = 52;
            this.height=24;
            this.position=position
        }

        draw(context) {
console.log(this.brick)
            context.drawImage(this.brick, this.position.x, this.position.y, this.width, this.height)
        }
    }

    let paddle = new Paddle(gameWidth, gameHeight);
    let ball = new BallCanvas();
    let bricks=[];

    for(let i=0; i<10 ;i++){
        bricks.push(new Brick({x:i*52,y:i*24}));
    }

    paddle.draw(context);
    ball.draw(context);
    ball.update();
    paddle.move();
    bricks.forEach((e)=>{
        e.draw(context)
    })
});