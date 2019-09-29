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
            this.speed={x:10,y:-10};
            this.position={x:gameWidth/2,y:gameHeight+paddle.height}
            this.size=40;
        }

        draw(context) {

            context.drawImage(this.ball, this.position.x, this.position.y, this.size, this.size)
        }
        update(bricks){
            setInterval(()=>{
                context.clearRect(this.position.x, this.position.y, this.size, this.size)
                this.position.x +=this.speed.x;
                this.position.y +=this.speed.y;
                if(this.position.x+this.size>gameWidth||this.position.x<0){
                    this.speed.x=-this.speed.x;
                }
                if(this.position.y+this.size<-10){
                    this.speed.y=-this.speed.y;
                }
                if(this.position.y+this.size>gameHeight){
                    console.log("you lost")
                }
                if(this.position.y+this.size>=paddle.position.y && this.position.x>paddle.position.x && this.position.x<paddle.position.x +paddle.width ){
                    this.speed.y=-this.speed.y;
                    this.position.y=paddle.position.y-this.size
                }
                bricks.forEach((brick,index)=>{
                    if(this.position.y +this.size >=brick.position.y && this.position.y<=brick.position.y + brick.height && this.position.x>= brick.position.x && this.position.x + this.size<=brick.position.x +brick.width){
                        this.speed.y=-this.speed.y;
                        bricks.splice(index,1)
                        context.clearRect(brick.position.x, brick.position.y, brick.width, brick.height)
                        if(bricks.length===0){
                            console.log("Wyyyyyygrana")
                        }
                    }

                })



                ball.draw(context);
            },50)

        }
    }

    class Brick {
        constructor(position) {
            this.brick = document.querySelector(".brick");
            this.width = gameWidth/10;
            this.height=gameHeight/20;
            this.position=position
        }

        draw(context) {
            context.drawImage(this.brick, this.position.x, this.position.y, this.width, this.height)
        }
    }

    let paddle = new Paddle(gameWidth, gameHeight);
    let ball = new BallCanvas();


    const level_1=[
        [0,1,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0],
    ];
    const level_2=[
        [0,1,1,0,0,1,1,0,0,1],
        [1,0,0,1,1,0,0,1,1,0],
        [0,1,1,0,0,1,1,0,0,1],
        [1,0,0,1,1,0,0,1,1,0],
        [0,1,1,0,0,1,1,0,0,1],
        [1,0,0,1,1,0,0,1,1,0],
    ];
    const level_3=[
        [0,1,0,1,0,1,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
    ]

    let bricks =[];
    const buildLevel=(level)=>{
        bricks=[];

        level.forEach((row,rowsItem)=>{
            row.forEach((brick,bricksItem)=>{
                if(brick === 1){
                    let position={
                        x:gameWidth/10* bricksItem,
                        y: gameHeight/20 + gameHeight/20 * rowsItem
                    }
                  bricks.push(new Brick(position))
                }
            })
        })
    }

    buildLevel(level_3)
    paddle.draw(context);
    ball.draw(context);
    ball.update(bricks);
    paddle.move();
    bricks.forEach((e)=>{
        e.draw(context)
    })
});