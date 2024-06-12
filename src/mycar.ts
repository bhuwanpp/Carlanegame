import { ctx, canvas, } from "./main";
import { carX, carY, carWidth, carHeight } from "./util";


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

    DrawCar() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


}

let userCar = new Image(-500, -500);
userCar.src = "./images/Police.png";
userCar.style.border = '10px solid red'


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

export function gameLoop() {
    if (left && carX.carx > 0) {
        carX.carx = carX.carx - 5;
    }
    if (right && carX.carx < canvas.width - myCar.width) {
        carX.carx = carX.carx + 5;
    }
    myCar.x = carX.carx;
}


