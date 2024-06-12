import { ctx } from "./main";
import { carWidth, gameData, carHeight, ignoreNumber, canvasHeight, score } from "./util";
import { Car, myCar } from "./mycar";

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
const carposition = [-30, 70, 140, 200, 290, 380]
const carYposition = [-600, -480, -360, -180, -60]


// to  shuffleArray
function shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function drawEnemyCar() {

    const shuffledYPositions = shuffleArray(carYposition.slice());
    console.log(shuffledYPositions)

    const numLanes = carposition.length;

    for (let i = 0; i < numLanes; i++) {
        const randomImage = enemyCarImage[Math.floor(Math.random() * enemyCarImage.length)];
        const randomPositon = carposition[i];
        const randomYPositon = shuffledYPositions[i % shuffledYPositions.length];

        let eCar = new OtherCar(
            randomImage,
            randomPositon,
            randomYPositon,
            carWidth,
            carHeight
        );
        enemyCarArray.push(eCar);
    }
}


drawEnemyCar()

// highest score 
export let highestScore: number = 0;
const storedHighestScore = localStorage.getItem('highestScore');
if (storedHighestScore) {
    highestScore = parseInt(storedHighestScore, 10);
}

//  enemy car function 
export function enemyCar() {

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

        const shuffledYPositions = shuffleArray(carYposition.slice());
        const numLanes = carposition.length;
        const numYPositions = shuffledYPositions.length;

        const randomPositon = carposition[i % numLanes];
        const randomYPositon = shuffledYPositions[i % numYPositions];
        singleEnemy.drawCar()
        singleEnemy.updateCar()

        if (singleEnemy.y > canvasHeight) {
            singleEnemy.y = randomYPositon
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
// a is my car
// b is enemy car

function detectCollision(a: Car, b: OtherCar) {
    return a.x < b.x + b.width - ignoreNumber &&
        a.x + a.width - ignoreNumber > b.x &&
        a.y < b.y + b.height - ignoreNumber &&
        a.y + a.height - ignoreNumber > b.y;
}

