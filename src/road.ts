import { ctx } from "./main";
import { leftRoadX, roadWidth, roadHeight, roadVy, rightRoadX, canvasHeight } from './util'
export class Road {
    x: number;
    y: number;
    w: number;
    h: number;
    vy: number;

    constructor(x: number, y: number, w: number, h: number, vy: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vy = vy;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);

    }

    updateRoad() {
        this.y += this.vy;
    }
}


const roads: Road[] = []
function drawRoad() {
    for (let i = 0; i < 8; i++) {
        let leftRoad = new Road(
            leftRoadX,
            i * 100,
            roadWidth,
            roadHeight,
            roadVy
        )
        roads.push(leftRoad)
        let rightRoad = new Road(
            rightRoadX,
            i * 100,
            roadWidth,
            roadHeight,
            roadVy
        )
        roads.push(rightRoad)
    }
}
drawRoad()

export function updateRoad() {
    ctx.fillStyle = 'white'
    for (let i = 0; i < roads.length; i++) {
        let singleRoad = roads[i]
        singleRoad.draw()
        singleRoad.updateRoad()
        if (singleRoad.y > canvasHeight) {
            singleRoad.y = -105
        }
    }

}
