import { ctx } from "./main";
import { carWidth, carHeight, gameData, canvasWidth, canvasHeight, score } from "./util";
import { random } from "./main";
import { myCar, Car } from "./mycar";


let enemyCar1 = new Image();
enemyCar1.src = "./images/Audi.png";

let enemyCar2 = new Image();
enemyCar2.src = "./images/Car.png";

let enemyCar3 = new Image();
enemyCar3.src = "./images/taxi.png";

let enemyCar4 = new Image();
enemyCar4.src = "./images/Black_viper.png";


let speedIncrement = 0;

export class OtherCar {
    img: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(img: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawCar() {

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    updateCar() {
        this.y += 5 + speedIncrement
    }
}

const enemyCarImage = [enemyCar1, enemyCar2, enemyCar3, enemyCar4]

let enemyCarArray: OtherCar[] = []
const carposition = [0, 100, 250, 400]

export function DrawEnemyCar() {

    for (let i = 0; i < 7; i++) {
        const randomImage = enemyCarImage[Math.floor(Math.random() * enemyCarImage.length)];
        const randomPositon = carposition[Math.floor(Math.random() * carposition.length)];
        const yposition = random(-800, 200)
        let eCar = new OtherCar(
            randomImage,
            randomPositon,
            yposition,
            carWidth,
            carHeight
        )
        enemyCarArray.push(eCar);
    }
}



DrawEnemyCar()

// highest score 
export let highestScore: number = 0;
const storedHighestScore = localStorage.getItem('highestScore');
if (storedHighestScore) {
    highestScore = parseInt(storedHighestScore, 10);
}


//  enemy car function 
export function EnemyCar() {

    const firstSpeed = 10
    const secondSpeed = 30
    const thirdSpeed = 50
    const fourthSpeed = 100
    const lastSpeed = 200
    if (score.score > firstSpeed) {
        speedIncrement = 2
    }
    if (score.score > secondSpeed) {
        speedIncrement = 3
    }
    if (score.score > thirdSpeed) {
        speedIncrement = 5
    }
    if (score.score > fourthSpeed) {
        speedIncrement = 8
    }
    if (score.score > lastSpeed) {
        speedIncrement = 15
    }
    for (let i = 0; i < enemyCarArray.length; i++) {
        let singleEnemy = enemyCarArray[i]
        const randomPositon = carposition[Math.floor(Math.random() * carposition.length)];
        singleEnemy.drawCar()
        singleEnemy.updateCar()
        if (singleEnemy.y > canvasHeight) {
            singleEnemy.y = random(-600, 0)
            singleEnemy.x = randomPositon
            score.score += 1

            if (score.score > highestScore) {
                highestScore = score.score;
                localStorage.setItem('highestScore', highestScore.toString());
            }

        }
        if (detectCollision(myCar, singleEnemy)) {
            gameData.gameOver = true;
        }
    }
}



// rectangle collision
// a = your car
// b = enemy car

// because image width is more to make perfect collision 
const ignoreNumber: number = 70


function detectCollision(a: Car, b: OtherCar) {
    return a.x < b.x + b.width - ignoreNumber &&
        a.x + a.width - ignoreNumber > b.x &&
        a.y < b.y + b.height - ignoreNumber &&
        a.y + a.height - ignoreNumber > b.y;
}
