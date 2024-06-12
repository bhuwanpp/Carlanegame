
// canvas 
export const canvasWidth: number = 500;
export const canvasHeight: number = 700;

// car 
export let carWidth: number = 120;
export let carHeight: number = 120;

export let carX = {
    carx: canvasWidth / 2 - carWidth
}
export let carY: number = canvasHeight - carHeight;

// road 
export let leftRoadX: number = canvasWidth / 3;
export let rightRoadX: number = (canvasWidth * 2) / 3 + 10;
export let roadY: number = -50;
export let roadWidth: number = 20;
export let roadHeight: number = 50;
export let roadVy: number = 3;


// export let gameOver: boolean = false
export const gameData = {
    gameOver: false
};

export const score = {
    score: 0
}

export const ignoreNumber: number = 68