let homeScore = 0
let awayScore = 0
let currentPeriod = 0
let gameRunning = false

const periodTimer = 1
let timer = null
let tIntt = null
let minutes = null
let seconds = null

let elHome = document.getElementById("home-score-label")
let elAway = document.getElementById("away-score-label")
let elPeriod = document.getElementById("period-tracker-label")
let elTimer = document.getElementById("primary-timer-label")

function addAwayThree() {
    addToAwayScore(3)
}

function addAwayTwo() {
    addToAwayScore(2)
}

function addAwayOne() {
    addToAwayScore(1)
}

function addHomeThree() {
    addToHomeScore(3)
}

function addHomeTwo() {
    addToHomeScore(2)
}

function addHomeOne() {
    addToHomeScore(1)
}

function addToHomeScore(val) {
    homeScore += val
    refreshHomeScore()
} 

function addToAwayScore(val) {
    awayScore += val
    refreshAwayScore()
}

function refreshAwayScore() {
    elAway.textContent = awayScore.toString().padStart(3, "0")
}

function refreshHomeScore() {
    elHome.textContent = homeScore.toString().padStart(3, "0")
}

function resetGame() {
    awayScore = 0
    homeScore = 0
    refreshAwayScore()
    refreshHomeScore()
    currentPeriod = 0
    elPeriod.textContent = 0
    elHome.classList.remove("scoreboard__leader")
    elAway.classList.remove("scoreboard__leader")

    if (gameRunning) {
        clearInterval(tIntt)
        elTimer.textContent = "START"
        gameRunning = false
    }
}

function startGame() {
    if (!gameRunning) {
        let timerDuration = periodTimer * 60
        currentPeriod++
        startTimer(timerDuration)
        gameRunning = true
        elHome.classList.remove("scoreboard__leader")
        elAway.classList.remove("scoreboard__leader")
    }
}

function startTimer(duration) {
    timer = duration, minutes, seconds
    tIntt = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        elTimer.textContent = minutes + ':' + seconds
        elPeriod.textContent = currentPeriod

        if (homeScore > awayScore) {
            elHome.classList.add("scoreboard__leader")
            elAway.classList.remove("scoreboard__leader")
        } else if (awayScore > homeScore) {
            elAway.classList.add("scoreboard__leader")
            elHome.classList.remove("scoreboard__leader")
        } else if (awayScore === homeScore) {
            elHome.classList.remove("scoreboard__leader")
            elAway.classList.remove("scoreboard__leader")
        }

        if (--timer <= 0) {
            // clearInterval(tIntt)
            if (currentPeriod + 1 <= 4) {
                currentPeriod++ 
                timer = duration, minutes, seconds
            } else {
                clearInterval(tIntt)
                gameRunning = false 
                elTimer.textContent = "GAME END"
            }
        }
    }, 1000)
}
window.startTimer = startTimer
window.startGame = startGame
window.resetGame = resetGame