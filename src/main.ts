import './style.css'
import { gameData, score } from './util'
import { gameLoop, myCar } from './mycar'
import { updateRoad } from './road'
import { EnemyCar, highestScore } from './enemycar'

// audio 
import audio from '/sound/audio.mp3'
const gameStartAudio = new Audio(audio) as HTMLAudioElement

export const canvas = document.getElementById('canvas') as HTMLCanvasElement
export const ctx = canvas.getContext('2d')!

export function random(max: number, min: number): number {
    let num: number = Math.floor(Math.random() * (max - min) + min)
    return num
}

let animationId: number;

function allUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // if gameOver : false only works 
    if (!gameData.gameOver) {
        requestAnimationFrame(allUpdate);
    }

    ctx.font = '20px serif'
    ctx.fillText(`${score.score}`, 10, 20)

    updateRoad()
    myCar.DrawCar()
    EnemyCar()
    gameLoop()

    if (gameData.gameOver) {
        cancelAnimationFrame(animationId)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameStartAudio.pause()
        gameOverText()
        console.log('game over')
        document.addEventListener('keypress', (event) => {
            if (event.key === ' ') {
                location.reload()
            }
        })


    }

}


function gameOverText() {
    if (gameData.gameOver) {
        myCar.y = 100
        ctx.fillStyle = 'red'
        ctx.font = '50px serif'
        ctx.fillText('GAME OVER', 100, canvas.height / 2)
        ctx.font = '20px serif'
        ctx.fillText(`your Score ${score.score} `, 100, canvas.height / 2 + 40)
        ctx.fillText(`highest Score ${highestScore} `, 100, canvas.height / 2 + 60)
        ctx.fillText(`press space to play again `, 100, canvas.height / 2 + 90)
    }

}


function StartGame() {
    ctx.fillStyle = 'red'
    ctx.font = '30px serif'
    ctx.fillText('Start Your game', 100, canvas.height / 2)
    ctx.fillText('Press Enter to Start', 100, canvas.height / 2 + 50)

    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            animationId = requestAnimationFrame(allUpdate)
            gameStartAudio.play();
            gameStartAudio.addEventListener("ended", function () {
                gameStartAudio.play()

            });
        }
    })

}
StartGame()








