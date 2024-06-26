import { ctx, canvas, } from "./main";
import { carX, carY, carWidth, carHeight } from "./util";

let userCar = new Image();
userCar.src = "./images/Police.png";
userCar.style.border = '10px solid red'

export class Car {
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


}

export let myCar = new Car(userCar, carX.carx, carY, carWidth, carHeight)

let left: boolean, right: boolean = false;


document.addEventListener('keydown', press);
document.addEventListener('keyup', release);

function press(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
        left = true;
    }
    if (e.key === 'ArrowRight') {
        right = true;
    }
}

function release(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
        left = false;
    }
    if (e.key === 'ArrowRight') {
        right = false;
    }
}

const sideNumber = 40
export function gameLoop() {
    if (left && carX.carx > - sideNumber) {
        carX.carx = carX.carx - 4;
    }
    if (right && carX.carx < canvas.width - myCar.width + sideNumber) {
        carX.carx = carX.carx + 4
    }
    myCar.x = carX.carx;
}


