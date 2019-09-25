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
                    if (this.position.x > 0) {
                        this.position.x -= this.speed;
                    }
                } else if (event.keyCode === 39 || event.keyCode === 68) {
                    if (this.position.x < gameWidth - this.width) {
                        this.position.x += this.speed
                    }
                }
                context.clearRect(0, 0, gameWidth, gameHeight) //
                this.draw(context)

            });

        }

    }


    class BallCanvas {
        constructor() {
            this.ball = document.querySelector("img");
        }

        draw(context) {
            context.drawImage(this.ball, 10, 10, 20, 20)
        }
    }


    let paddle = new Paddle(gameWidth, gameHeight);
    let ball = new BallCanvas();

    paddle.draw(context);
    ball.draw(context);
    paddle.move();

});